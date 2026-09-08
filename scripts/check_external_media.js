const fs = require('node:fs'), path = require('node:path');

// Each origin is checked sequentially. A rate limit stops that origin for the
// entire run; other providers remain independently checkable.
async function checkMedia(urls, { request = fetch, onResult = () => {} } = {}) {
    const origins = new Map(), results = [];
    for (const url of new Set(urls)) {
        const origin = new URL(url).origin;
        if (!origins.has(origin)) origins.set(origin, []);
        origins.get(origin).push(url);
    }
    const groups = [...origins.values()];
    let cursor = 0;
    async function check(url) {
        try {
            let method = 'HEAD';
            let response = await request(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000) });
            if ([404, 410, 405].includes(response.status)) {
                method = 'GET';
                response = await request(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000) });
            }
            const type = response.headers.get('content-type') || '';
            if (method === 'GET') await response.body?.cancel();
            const outcome = response.status === 429 ? 'rate-limited'
                : response.ok && type.startsWith('image/') ? 'image-reachable'
                : [404, 410].includes(response.status) ? 'reported-missing'
                : response.ok ? 'unexpected-content-type' : 'unverified-http-error';
            return { url, status: response.status, type, method, finalUrl: response.url, outcome,
                ...(response.status === 429 ? { retryAfter: response.headers.get('retry-after') } : {}) };
        } catch (error) {
            return { url, outcome: 'unverified-network-error', error: error.message };
        }
    }
    async function worker() {
        while (cursor < groups.length) {
            const group = groups[cursor++];
            let rateLimit = null;
            for (const url of group) {
                const result = rateLimit
                    ? { url, outcome: 'skipped-rate-limit', blockedBy: rateLimit.url, retryAfter: rateLimit.retryAfter }
                    : await check(url);
                if (result.outcome === 'rate-limited') rateLimit = result;
                results.push(result);
                onResult(result, results);
            }
        }
    }
    await Promise.all(Array.from({ length: Math.min(4, groups.length) }, worker));
    return results;
}

if (require.main === module) {
    const reportPath = path.join(__dirname, '..', '..', 'external-media-check.json');
    const audit = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'chapter-media-audit.json'), 'utf8'));
    const urls = [...new Set(audit.records.filter(r => r.status === 'external-unverified').map(r => r.src))];
    checkMedia(urls, { onResult(result, results) {
        console.log(result.outcome + ' ' + result.url);
        fs.writeFileSync(reportPath, JSON.stringify({ createdAt: new Date().toISOString(), total: urls.length,
            processed: results.length, checked: results.filter(r => r.outcome !== 'skipped-rate-limit').length, results }, null, 2) + '\n');
    } }).then(results => console.log(JSON.stringify(results.reduce((counts, r) => {
        counts[r.outcome] = (counts[r.outcome] || 0) + 1; return counts;
    }, {})))).catch(error => { console.error(error); process.exitCode = 1; });
}
module.exports = { checkMedia };

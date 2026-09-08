const assert = require('node:assert/strict');
const { checkMedia } = require('./check_external_media');
(async () => {
    const calls = [], cancelled = [];
    const request = async (url, { method }) => {
        calls.push([url, method]);
        const name = new URL(url).pathname;
        if (name === '/network') throw new Error('Connection failed');
        const status = name === '/limited' ? 429 : name === '/missing' ? 404
            : name === '/head-unsupported' && method === 'HEAD' ? 405 : 200;
        return { status, ok: status === 200, url, headers: new Headers({
            'content-type': name === '/html' ? 'text/html' : 'image/png', 'retry-after': '120'
        }), body: { cancel: async () => cancelled.push(url) } };
    };
    const urls = ['https://limited.test/limited', 'https://limited.test/never-request',
        'https://healthy.test/image', 'https://healthy.test/image', 'https://healthy.test/head-unsupported',
        'https://healthy.test/missing', 'https://healthy.test/html', 'https://healthy.test/network'];
    const rows = await checkMedia(urls, { request });
    const row = url => rows.find(r => r.url.endsWith('/' + url));
    assert.equal(rows.length, 7);
    assert.equal(row('limited').outcome, 'rate-limited');
    assert.equal(row('limited').retryAfter, '120');
    assert.equal(row('never-request').outcome, 'skipped-rate-limit');
    assert.equal(row('never-request').blockedBy, 'https://limited.test/limited');
    assert.ok(!calls.some(([url]) => url.endsWith('/never-request')));
    assert.equal(calls.filter(([url]) => url.endsWith('/limited')).length, 1);
    assert.equal(row('image').outcome, 'image-reachable');
    assert.equal(calls.filter(([url]) => url.endsWith('/image')).length, 1);
    assert.equal(row('head-unsupported').outcome, 'image-reachable');
    assert.equal(row('head-unsupported').method, 'GET');
    assert.equal(row('missing').outcome, 'reported-missing');
    assert.deepEqual(calls.filter(([url]) => url.endsWith('/missing')).map(r => r[1]), ['HEAD', 'GET']);
    assert.equal(cancelled.length, 2);
    assert.equal(row('html').outcome, 'unexpected-content-type');
    assert.equal(row('network').outcome, 'unverified-network-error');
    assert.deepEqual(await checkMedia([], { request }), []);
    console.log('PASS: external media audit stops a rate-limited origin, checks other origins, deduplicates URLs, confirms missing resources with GET and distinguishes network/content errors.');
})().catch(error => { console.error(error); process.exitCode = 1; });

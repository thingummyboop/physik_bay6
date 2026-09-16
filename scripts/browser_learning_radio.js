// Uses an isolated browser. Media is stubbed to test controls without streaming music.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const base = process.env.SCIVERSE_PREVIEW_URL || 'http://127.0.0.1:4173';
const out = path.resolve(__dirname, '../../browser-qa/learning-radio');
const topics = ['sieinheiten', 'math1_8_brueche', 'chemie_teilchenmodell', 'bio_2_pflanzenvermehrung', 'dgb7_produktion'];

async function checkDialog(page) {
    const settings = page.locator('.learning-radio-settings');
    await settings.focus();
    await page.keyboard.press('Enter');
    const dialog = page.locator('dialog.learning-radio-dialog-backdrop');
    assert.equal(await dialog.evaluate(e => e.open), true);
    assert.equal(await dialog.evaluate(e => e.contains(document.activeElement)), true);
    const choices = dialog.locator('input[type=checkbox]');
    const count = await choices.count();
    await choices.first().focus();
    await page.keyboard.press('Space');
    assert.equal(await choices.first().isChecked(), false);
    assert.equal(await choices.first().evaluate(e => e === document.activeElement), true);
    await page.keyboard.press('Space');
    assert.equal(await choices.first().isChecked(), true);
    for (let i = 0; i < count + 3; i++) {
        await page.keyboard.press('Tab');
        // Native dialogs may let Tab visit browser chrome; no background page control may receive focus.
        assert.equal(await dialog.evaluate(e => e.contains(document.activeElement) ||
            (!document.hasFocus() && document.activeElement === document.body)), true);
    }
    await dialog.screenshot({ path: path.join(out, 'track-dialog.png') });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog.learning-radio-dialog-backdrop').open);
    assert.equal(await settings.evaluate(e => e === document.activeElement), true);
}

(async () => {
    fs.mkdirSync(out, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    const errors = [], states = [], auxiliary = [];
    try {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
        await context.addInitScript(() => {
            window.radioTestPlaying = false;
            HTMLMediaElement.prototype.play = function () { window.radioTestPlaying = true; return Promise.resolve(); };
            HTMLMediaElement.prototype.pause = function () { window.radioTestPlaying = false; };
            HTMLMediaElement.prototype.load = function () {};
            Object.defineProperty(HTMLMediaElement.prototype, 'paused', { get() { return !window.radioTestPlaying; } });
        });
        const page = await context.newPage();
        page.on('pageerror', e => errors.push(e.message));
        for (const topic of topics) {
            await page.goto(base + '/topics/template.html?topic=' + topic);
            await page.locator('.learning-radio-dock > summary').waitFor();
            await page.locator('#sections-container .card').first().waitFor();
            for (const width of [320, 390, 1280]) for (const theme of ['light', 'dark']) {
                await page.setViewportSize({ width, height: 844 });
                await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
                const dock = page.locator('.learning-radio-dock'), summary = dock.locator('summary');
                assert.equal(await dock.evaluate(e => e.open), false);
                assert.equal(await page.locator('.learning-radio').isVisible(), false);
                await summary.focus();
                await page.keyboard.press('Enter');
                const geometry = await dock.evaluate(e => {
                    const r = e.getBoundingClientRect(), radio = e.querySelector('.learning-radio').getBoundingClientRect();
                    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom,
                        radioInside: radio.left >= r.left && radio.right <= r.right && radio.top >= r.top && radio.bottom <= r.bottom,
                        position: getComputedStyle(e.querySelector('.learning-radio')).position,
                        panelPosition: getComputedStyle(e.querySelector('.learning-radio-panel')).position };
                });
                assert.ok(geometry.left >= 0 && geometry.right <= width + 1 && geometry.radioInside);
                assert.equal(geometry.position, 'static');
                assert.equal(geometry.panelPosition, 'static');
                const card = await page.locator('#sections-container .card').first().boundingBox();
                assert.ok(card.y >= geometry.bottom, 'The open radio must occupy its own space before the lessons');
                for (const selector of ['.learning-radio', '.learning-radio-settings', '.learning-radio-volume']) {
                    const b = await page.locator(selector).boundingBox();
                    assert.ok(b.width >= 44 && b.height >= 44, selector);
                }
                if (topic === topics[0] && width === 390) await dock.screenshot({ path: path.join(out, 'radio-' + theme + '.png') });
                await summary.focus();
                await page.keyboard.press('Enter');
                await page.keyboard.press('Tab');
                assert.equal(await dock.evaluate(e => e.contains(document.activeElement)), false, 'Closed controls are skipped');
                states.push({ topic, width, theme, geometry });
            }
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('.learning-radio-dock > summary').click();
        assert.equal(await page.evaluate(() => window.radioTestPlaying), false);
        await page.locator('.learning-radio').focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('.learning-radio').getAttribute('aria-pressed'), 'true');
        assert.equal(await page.evaluate(() => window.radioTestPlaying), true);
        await page.locator('.learning-radio-volume').focus();
        await page.keyboard.press('Home');
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.evaluate(() => document.querySelector('audio').volume), .01);
        assert.equal(await page.evaluate(() => localStorage.getItem('sciverse_learning_radio_volume')), '0.01');
        await checkDialog(page);
        await page.locator('.learning-radio-dock > summary').click();
        assert.equal(await page.evaluate(() => window.radioTestPlaying), true, 'Collapsing controls does not stop playback');
        await page.reload();
        await page.locator('.learning-radio-dock > summary').click();
        assert.equal(await page.evaluate(() => window.radioTestPlaying), false, 'Reload does not autoplay');
        assert.equal(await page.locator('.learning-radio-volume').inputValue(), '1');
        await page.emulateMedia({ media: 'print' });
        assert.equal(await page.locator('.learning-radio-dock').isVisible(), false);
        await page.emulateMedia({ media: 'screen' });

        await page.goto(base + '/#bio_2_pflanzenvermehrung');
        await page.frameLocator('#game-frame').locator('[data-germination-timeline]').waitFor();
        assert.equal(await page.locator('#sidebar .learning-radio-dock').count(), 1);
        assert.equal(await page.frameLocator('#game-frame').locator('.learning-radio-dock').count(), 0);
        await page.locator('#menu-toggle').click();
        await page.locator('.learning-radio-dock > summary').click();
        await checkDialog(page);
        assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'true', 'Dialog Escape must not close navigation');
        await page.locator('.learning-radio').click();
        await page.locator('#menu-toggle').click();
        await page.waitForFunction(() => document.getElementById('sidebar').getBoundingClientRect().right <= 0);
        assert.equal(await page.locator('#sidebar').getAttribute('inert'), '');
        assert.equal(await page.evaluate(() => window.radioTestPlaying), true);
        const timeline = page.frameLocator('#game-frame').locator('[data-germination-timeline]');
        for (const width of [320, 390, 1280]) {
            await page.setViewportSize({ width, height: 844 });
            const frameBounds = await page.locator('#game-frame').boundingBox();
            for (const selector of ['#menu-toggle', '#zeugnis-btn']) {
                const bounds = await page.locator(selector).boundingBox();
                assert.ok(bounds.width >= 44 && bounds.height >= 44, selector + ' touch target');
                assert.ok(bounds.y + bounds.height <= frameBounds.y, selector + ' must not overlap the learning frame: ' + JSON.stringify({ width, bounds, frameBounds }));
            }
            assert.ok(frameBounds.y + frameBounds.height <= 845, 'Frame fits available height');
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForFunction(() => document.getElementById('sidebar').getBoundingClientRect().right <= 0);
        await timeline.screenshot({ path: path.join(out, 'lesson-clear.png') });
        await page.screenshot({ path: path.join(out, 'shell-mobile.png') });
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.locator('#menu-toggle').click();
        await page.locator('.learning-radio-dock').scrollIntoViewIfNeeded();
        const dock = await page.locator('.learning-radio-dock').boundingBox();
        const frame = await page.locator('#game-frame').boundingBox();
        assert.ok(dock.x + dock.width <= frame.x + 1, 'Radio stays beside the learning frame');
        for (const name of ['start', 'dashboard', 'glossar', 'placeholder', 'space_program']) {
            await page.goto(base + '/topics/' + name + '.html');
            await page.locator('.learning-radio-dock > summary').click();
            for (const width of [320, 1280]) {
                await page.setViewportSize({ width, height: 844 });
                const bounds = await page.locator('.learning-radio-dock').boundingBox();
                const heading = await page.locator('h1').first().boundingBox();
                assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1, name);
                assert.ok(heading.y >= bounds.y + bounds.height, name + ' heading after radio');
                auxiliary.push({ name, width });
            }
        }
        assert.deepEqual(errors, []);
        fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ createdAt: new Date().toISOString(), browser: browser.version(), states, auxiliary, errors,
            scope: '30 chapter/width/theme states, 10 auxiliary page layouts, keyboard disclosure, control sizing, media control stub, volume persistence, no autoplay, native modal focus/escape, shell and standalone placement, toolbar outside learning frame, print hiding. Does not test remote audio availability.' }, null, 2) + '\n');
        console.log('PASS: 30 chapter/width/theme layouts, 10 auxiliary layouts, keyboard disclosure, modal focus and Escape, volume/storage, no autoplay, toolbar/navigation placement and print hiding. Audio playback stubbed.');
        await context.close();
    } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

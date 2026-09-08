const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let JSDOM; try { ({ JSDOM } = require('jsdom')); } catch { ({ JSDOM } = require('../../qa/node_modules/jsdom')); }
const script = fs.readFileSync(path.join(__dirname, '../js/media-fallback.js'), 'utf8');
for (const language of ['de', 'en', 'ar', 'uk', 'sr', 'tr']) {
    const dom = new JSDOM(`<html lang="en"><body><img id="outside" src="missing.png"><div id="sections-container" lang="${language}"><figure><img id="image" src="missing.png" alt="A &lt; B"><figcaption>Quelle</figcaption></figure></div></body></html>`, { runScripts: 'outside-only' });
    const w = dom.window, d = w.document, img = d.querySelector('#image');
    w.eval(script);
    const error = target => target.dispatchEvent(new w.Event('error'));
    error(img); error(img);
    let note = d.querySelector('.media-load-notice');
    assert.equal(d.querySelectorAll('.media-load-notice').length, 1);
    assert.equal(note.lang, language);
    assert.equal(note.dir, language === 'ar' ? 'rtl' : 'ltr');
    assert.ok(note.textContent.includes('A < B'));
    assert.equal(note.children.length, 0);
    assert.equal(d.querySelector('figcaption').textContent, 'Quelle');
    assert.equal(img.getAttribute('alt'), 'A < B');
    assert.equal(img.dataset.mediaFailed, 'true');
    img.dispatchEvent(new w.Event('load'));
    assert.equal(d.querySelector('.media-load-notice'), null);
    assert.equal(img.hasAttribute('data-media-failed'), false);
    error(img);
    assert.equal(d.querySelectorAll('.media-load-notice').length, 1);
    error(d.querySelector('#outside'));
    const decoration = d.createElement('img'); decoration.alt = '';
    d.querySelector('#sections-container').append(decoration); error(decoration);
    assert.equal(d.querySelectorAll('.media-load-notice').length, 1);
    const dynamic = d.createElement('img'); dynamic.alt = 'New activity image';
    d.querySelector('#sections-container').append(dynamic); error(dynamic);
    assert.equal(d.querySelectorAll('.media-load-notice').length, 2);
    assert.equal(dynamic.nextSibling.lang, language);
    dom.window.close();
}
const template = fs.readFileSync(path.join(__dirname, '../topics/template.html'), 'utf8');
assert.ok(template.indexOf('js/media-fallback.js') < template.indexOf('js/renderer.js'));
console.log('PASS: image failure notices in six content languages, safe descriptions, dynamic images, successful recovery, no duplicates or decorative-image noise.');

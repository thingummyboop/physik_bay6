const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const chapter=require('../lang/de.json').kunst_1_wahrnehmen;
const section=chapter.sections.find(s=>s.id==='section2');
const dom=new JSDOM(section.content,{runScripts:'outside-only'}),w=dom.window,d=w.document;
w.eval(fs.readFileSync(require('path').join(__dirname,'../js/art-workshop.js'),'utf8'));w.initArtWorkshops();w.initArtWorkshops();
const zone=d.querySelector('[data-art-story]'),list=zone.querySelector('[data-story-list]'),preview=zone.querySelector('[data-story-preview]');
const order=()=>[...list.children].map(el=>el.dataset.storyFrame).join('');
const pictures=[...list.querySelectorAll('svg')].map(el=>el.outerHTML).sort();
assert.equal(order(),'ABC');list.querySelector('[data-story-move="-1"]').click();assert.equal(order(),'ABC');
zone.querySelector('[data-story-remember]').click();const saved=preview.innerHTML;assert.equal(preview.querySelectorAll('button').length,0);
const sequences=['BAC','BCA','CBA','CAB','ACB','ABC'];
for(let i=0;i<sequences.length;i++){
 const index=i%2===0?0:1;const button=list.children[index].querySelector('[data-story-move="1"]');button.focus();button.click();
 assert.equal(order(),sequences[i]);assert.equal(d.activeElement,button);assert.equal(preview.innerHTML,saved);
 assert.deepEqual([...list.querySelectorAll('svg')].map(el=>el.outerHTML).sort(),pictures);
 assert.equal(list.firstElementChild.querySelector('[data-story-move="-1"]').getAttribute('aria-disabled'),'true');
 assert.equal(list.lastElementChild.querySelector('[data-story-move="1"]').getAttribute('aria-disabled'),'true');
}
list.children[0].querySelector('[data-story-move="1"]').click();zone.querySelector('[data-story-remember]').click();assert.match(preview.textContent,/B – A – C/);assert.equal(preview.querySelectorAll('ol').length,1);
zone.querySelector('[data-story-reset]').click();assert.equal(order(),'ABC');assert.equal(preview.hidden,true);assert.equal(preview.children.length,0);
assert.match(zone.textContent,/keine einzig richtige Reihenfolge/);assert.match(zone.textContent,/Auf Papier/);dom.window.close();console.log('PASS: all six picture orders, fixed saved comparison, boundary controls, focus, unchanged drawings, overwrite and reset.');

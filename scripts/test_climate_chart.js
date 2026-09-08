const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),d=JSON.parse(fs.readFileSync(path.join(root,'lang/de.json'),'utf8'));
const dom=new JSDOM(d.klima.sections[3].content,{runScripts:'outside-only'}),w=dom.window,doc=w.document;
w.eval(fs.readFileSync(path.join(root,'js/topics/klima.js'),'utf8'));w.renderClimateChart();
const rows=[...doc.querySelectorAll('#climateChartData tbody tr')];assert.equal(rows.length,12);assert.deepEqual(rows.filter(r=>r.cells[3].textContent==='Ja').map(r=>r.cells[0].textContent),['Juni','Juli','August']);
const select=doc.querySelector('#climateChartData select');select.value='6';select.dispatchEvent(new w.Event('change'));assert.match(doc.getElementById('chartTooltip').textContent,/Juli: 23,8 °C; 15 mm.*15 < 47,6/);
select.value='0';select.dispatchEvent(new w.Event('change'));assert.match(doc.getElementById('chartTooltip').textContent,/Jänner.*kein arider/);
doc.querySelectorAll('rect[fill="transparent"]')[7].click?.();doc.querySelectorAll('rect[fill="transparent"]')[7].dispatchEvent(new w.Event('click'));assert.equal(select.value,'7');assert.match(doc.getElementById('chartTooltip').textContent,/August/);
assert.match(doc.querySelector('svg').getAttribute('aria-label'),/10 Grad Celsius.*20 Millimeter/);
w.renderClimateChart();assert.equal(doc.querySelectorAll('#climateChartData').length,1);assert.equal(doc.querySelectorAll('#climateChartData tbody tr').length,12);
assert.ok(d.klima.sections[3].content.includes('keine Messung der tatsächlichen Verdunstung'));assert.ok(!d.klima.sections[3].content.includes('Beispiel: Rom'));dom.window.close();
console.log('PASS: 12 climate data rows, three arid model months, paired axes, keyboard-select and click results, numeric comparison, idempotent rendering and explicit model limitations.');

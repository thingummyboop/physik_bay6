'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../lang/de.json'),'utf8'));
const doc=new JSDOM(data.math2_7_geometrie.sections.find(s=>s.id==='sec_prismen').content).window.document;
const points=el=>el.getAttribute('points').trim().split(/\s+/).map(p=>p.split(',').map(Number));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-5,`${a} != ${b}`);
// Opposite faces of an oblique prism drawing must be exact translations.
for(const [name,n] of [['box',4],['tri',3],['pent',5]]){
 const scene=doc.querySelector(`[data-prism-scene="${name}"]`),polygons=[...scene.querySelectorAll('polygon')];
 const faces=name==='box'?[polygons[0],polygons[3]]:polygons.filter(p=>points(p).length===n);
 assert.equal(faces.length,2);const a=points(faces[0]),b=points(faces[1]);
 const dx=b[0][0]-a[0][0],dy=b[0][1]-a[0][1];
 a.forEach(([x,y],i)=>{near(b[i][0]-x,dx);near(b[i][1]-y,dy);});
}
const net=doc.querySelector('[data-prism-scene="net"]');
const triangles=[...net.querySelectorAll('polygon')].map(points),rectangles=[...net.querySelectorAll('rect')];
assert.equal(triangles.length,2);assert.equal(rectangles.length,3);
const widths=rectangles.map(r=>Number(r.getAttribute('width')));
for(const triangle of triangles)triangle.forEach((p,i)=>near(Math.hypot(p[0]-triangle[(i+1)%3][0],p[1]-triangle[(i+1)%3][1]),widths[i]));
rectangles.forEach((r,i)=>{near(Number(r.getAttribute('height')),Number(rectangles[0].getAttribute('height')));if(i)near(Number(r.getAttribute('x')),Number(rectangles[i-1].getAttribute('x'))+widths[i-1]);});
// Both triangles are attached to the middle rectangle, outside its interior.
const middle=rectangles[1],x=Number(middle.getAttribute('x')),y=Number(middle.getAttribute('y')),h=Number(middle.getAttribute('height'));
for(let i=0;i<2;i++){near(triangles[i][0][0],x);near(triangles[i][1][0],x+widths[1]);near(triangles[i][0][1],y+i*h);near(triangles[i][1][1],y+i*h);}
assert.ok(triangles[0][2][1]<y);assert.ok(triangles[1][2][1]>y+h);
console.log('Prism geometry: translated congruent faces and matching, attached net edges passed.');

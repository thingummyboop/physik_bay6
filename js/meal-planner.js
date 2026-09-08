'use strict';
const MEAL_INGREDIENTS=[['Verzehrfertige Bohnen, abgetropft',200,'g',5],['Gewaschenes Gemüse',300,'g',3],['Vollkornbrot',100,'g',3],['Pflanzenöl',10,'ml',8],['Zitronensaft',15,'ml',2]];
function mealAmounts(portions){return MEAL_INGREDIENTS.map(([name,base,unit,price])=>({name,amount:base*portions/2,unit,price,cost:base*portions/2/1000*price}));}
function initMealPlanners(){document.querySelectorAll('[data-meal-planner]').forEach(zone=>{
 if(zone.dataset.initialized)return;zone.dataset.initialized='true';
 const input=zone.querySelector('[data-portions]'),body=zone.querySelector('tbody'),status=zone.querySelector('[data-status]');
 const fmt=n=>new Intl.NumberFormat('de-AT',{maximumFractionDigits:2}).format(n),money=n=>new Intl.NumberFormat('de-AT',{style:'currency',currency:'EUR'}).format(n);
 const update=()=>{const n=Number(input.value);if(!Number.isInteger(n)||n<1||n>8){body.replaceChildren();status.textContent='Wähle eine ganze Anzahl von 1 bis 8 Rezeptportionen.';return;}
  const amounts=mealAmounts(n);body.replaceChildren();amounts.forEach(item=>{const tr=document.createElement('tr');[item.name,fmt(item.amount)+' '+item.unit,money(item.price)+'/'+(item.unit==='g'?'kg':'l'),money(item.cost)].forEach((text,i)=>{const cell=document.createElement(i===0?'th':'td');if(i===0)cell.scope='row';cell.textContent=text;tr.append(cell);});body.append(tr);});
  const total=amounts.reduce((sum,item)=>sum+item.cost,0);status.textContent=n+' Rezeptportionen: '+money(total)+' Verbrauchskosten insgesamt. '+money(total/n)+' je Rezeptportion (gerundet). Die Einkaufssumme ganzer Packungen kann höher sein.';
 };input.addEventListener('input',update);update();
});}
window.mealAmounts=mealAmounts;window.initMealPlanners=initMealPlanners;

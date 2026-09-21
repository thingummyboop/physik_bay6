function check_m39() {
 const input=document.getElementById('ans_m39_1'),result=document.getElementById('res_m39_1');
 const value=input.value.trim().toLowerCase().replace(/\s/g,'');
 result.textContent=!value?'Gib zuerst 2D oder 3D ein.':value==='3d'?'Richtig: Ein echtes Handy hat Länge, Breite und eine Dicke. Es ist dreidimensional.':value==='2d'?'Ein echtes Handy hat auch eine Dicke. Zweidimensional wäre zum Beispiel ein Modell seiner Bildschirmfläche ohne Dicke.':'Bitte gib 2D oder 3D ein.';
}
function topicInit() {
 initPrismNets();
 initSolidMass();
 const modelInput=document.getElementById('ans_m39_1');
 if(modelInput&&!modelInput.dataset.ready){modelInput.dataset.ready='true';modelInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check_m39();}});modelInput.addEventListener('input',()=>{document.getElementById('res_m39_1').textContent='';});}
 document.querySelectorAll('[data-solid-lab]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  const base=zone.querySelector('[data-solid-base]'),height=zone.querySelector('[data-solid-height]'),status=zone.querySelector('[data-solid-status]');
  const update=()=>{const g=Number(base.value),h=Number(height.value),v=g*h;status.textContent=`G = ${g} cm²; h = ${h} cm. Prisma: V = ${v.toLocaleString('de-AT')} cm³. Pyramide: V = ${(v/3).toLocaleString('de-AT')} cm³. Das Prisma hat das dreifache Volumen der Pyramide.`;};
  base.addEventListener('input',update);height.addEventListener('input',update);
  zone.querySelector('[data-solid-reset]').addEventListener('click',()=>{base.value=12;height.value=10;update();base.focus();});update();
 });
}
function initSolidMass(){
 document.querySelectorAll('[data-solid-mass]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  const body=zone.querySelector('#solid-mass-body'),height=zone.querySelector('#solid-mass-height'),material=zone.querySelector('#solid-mass-material'),input=zone.querySelector('#solid-mass-value'),result=zone.querySelector('[data-solid-mass-result]'),givens=zone.querySelector('[data-solid-mass-givens]');
  const shapes={box:{base:12,description:'Quader mit rechteckiger Grundfläche 4 cm × 3 cm',formula:'4 · 3'},tri:{base:6,description:'Gerades Dreiecksprisma mit rechtwinkliger Grundfläche, Katheten 3 cm und 4 cm',formula:'3 · 4 / 2'},pyramid:{base:16,description:'Quadratische Pyramide mit Grundkante 4 cm',formula:'4 · 4'}};
  const format=n=>n.toLocaleString('de-AT',{maximumFractionDigits:3});
  const clear=()=>{result.textContent='';delete result.dataset.correct;input.removeAttribute('aria-invalid');};
  const show=()=>{const shape=shapes[body.value];givens.textContent=shape.description+'. Senkrechte Körperhöhe h = '+height.value+' cm. Dichte ρ = '+format(Number(material.value))+' g/cm³. Gesucht ist die Masse m in Gramm.';input.value='';clear();};
  const check=()=>{
   clear();const text=input.value.trim(),answer=Number(text.replace(',','.'));
   if(!/^\d+(?:[.,]\d+)?$/.test(text)||!Number.isFinite(answer)||answer<=0){result.textContent='Gib eine positive Masse als Zahl ein, zum Beispiel 43,2. Die Einheit steht bereits am Feld.';input.setAttribute('aria-invalid','true');input.focus();return;}
   const shape=shapes[body.value],h=Number(height.value),density=Number(material.value),volume=shape.base*h/(body.value==='pyramid'?3:1),mass=volume*density,correct=Math.abs(answer-mass)<1e-8;
   result.dataset.correct=String(correct);
   result.textContent=correct?'Der Zahlenwert passt. G = '+shape.formula+' = '+shape.base+' cm². V = '+shape.base+' · '+h+(body.value==='pyramid'?' / 3':'')+' = '+format(volume)+' cm³. m = '+format(density)+' · '+format(volume)+' = '+format(mass)+' g. Vergleiche auch deinen Rechenweg.':'Prüfe zuerst G und dann V = G · h'+(body.value==='pyramid'?' / 3':'')+'. Multipliziere erst danach mit der Dichte. Achte auf zusammenpassende Einheiten.';
   result.focus();
  };
  [body,height,material].forEach(el=>el.addEventListener('change',show));input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
  zone.querySelector('[data-solid-mass-check]').addEventListener('click',check);
  zone.querySelector('[data-solid-mass-reset]').addEventListener('click',()=>{body.value='box';height.value='6';material.value='1.2';show();body.focus();});show();
 });
}
function initPrismNets() {
 document.querySelectorAll('[data-prism-net]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  let view='solid',part='all';
  const faces={
   net:[['base','40,150 100,150 100,70'],['base','40,270 100,270 100,350'],['mantle','40,150 100,150 100,270 40,270'],['mantle','100,150 180,150 180,270 100,270'],['mantle','180,150 280,150 280,270 180,270']],
   solid:[['base','160,200 220,200 160,120'],['mantle','60,250 120,250 220,200 160,200'],['mantle','60,250 60,170 160,120 160,200'],['mantle','120,250 60,170 160,120 220,200'],['base','60,250 120,250 60,170']]
  };
  const update=()=>{
   zone.querySelectorAll('[data-prism-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.prismView===view)));
   zone.querySelectorAll('[data-prism-part]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.prismPart===part)));
   const detail=part==='base'?'Zwei Dreiecke: je 3 · 4 / 2 = 6 cm², zusammen 12 cm².':part==='mantle'?'Drei Rechtecke: 3 · 6 + 4 · 6 + 5 · 6 = 72 cm². Der Mantelstreifen ist 12 cm breit und 6 cm hoch.':'Gesamte Oberfläche: 12 cm² + 72 cm² = 84 cm². Volumen: 6 cm² · 6 cm = 36 cm³.';
   const description=(view==='net'?'Netz mit fünf Flächen. ':'Schrägbild eines geraden Dreiecksprismas. ')+detail;
   const polygons=faces[view].map(([kind,points])=>`<polygon data-face="${kind}" points="${points}" fill="${kind==='base'?'#bfdbfe':'#fef3c7'}" fill-opacity="${view==='net'?1:0.6}" stroke="#172554" stroke-width="${part==='all'||part===kind?3:1}"/>`).join('');
   const labels=view==='net'?'<text x="50" y="175">3 cm</text><text x="120" y="175">4 cm</text><text x="205" y="175">5 cm</text><text x="290" y="215">6 cm</text><text x="75" y="120">G</text><text x="75" y="308">G</text>':'<text x="75" y="275">3 cm</text><text x="15" y="210">4 cm</text><text x="98" y="202">5 cm</text><text x="182" y="249">h = 6 cm</text>';
   zone.querySelector('[data-prism-drawing]').innerHTML=`<svg viewBox="0 0 360 400" role="img" aria-label="${description}" style="width:100%;max-width:440px;background:white;border-radius:8px" xmlns="http://www.w3.org/2000/svg">${polygons}<g font-size="15" fill="#172554">${labels}</g></svg>`;
   zone.querySelector('[data-prism-description]').textContent=description;
  };
  zone.querySelectorAll('[data-prism-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.prismView;update();}));
  zone.querySelectorAll('[data-prism-part]').forEach(b=>b.addEventListener('click',()=>{part=b.dataset.prismPart;update();}));
  update();
 });
}

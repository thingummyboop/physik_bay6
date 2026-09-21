function checkFunc1(){
 const raw=document.getElementById('func1').value.trim().replace(/−/g,'-'),out=document.getElementById('fb_func1');
 const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
 out.textContent=!Number.isFinite(value)?'Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.':value===5?"Korrekt! Für x = 2 gilt y = 2 + 3 = 5.":"Ersetze x in y = x + 3 durch 2. Addiere anschließend 3.";
}


function topicInit() { bindQuickDecimalAnswer();bindFunctionLine();bindFunctionWalk();

        const external=document.getElementById('ggb-funktionen'),disclosure=external?.closest('details');
        if (external && external.dataset.toggleBound!=='true') {
            external.dataset.toggleBound='true';
            const loadExplorer=()=>{
            if(disclosure&&!disclosure.open||external.dataset.bound==='true')return;
            external.dataset.bound='true';
            if (typeof GGBApplet !== 'undefined') {
                var params = {
                    "appName": "graphing",
                    "width": Math.max(200, external.clientWidth),
                    "height": 500,
                    "showToolBar": true,
                    "showAlgebraInput": true,
                    "showMenuBar": false
                };
                var applet = new GGBApplet(params, true);
                applet.inject('ggb-funktionen');
            } else {
                document.getElementById('ggb-funktionen').innerHTML = '<p style="padding: 20px; color: red;">GeoGebra konnte nicht geladen werden. Bitte lade die Seite neu.</p>';
            }
            };
            if(disclosure)disclosure.addEventListener('toggle',loadExplorer);loadExplorer();
        }
}

function bindQuickDecimalAnswer(){const input=document.getElementById('func1'),out=document.getElementById('fb_func1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Funktionswert y für x gleich 2");input.setAttribute('aria-describedby','fb_func1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();checkFunc1();}};}

function functionNumber(value){return value.toLocaleString('de-AT',{maximumFractionDigits:3});}
function functionEquation(m,b){return 'y = '+functionNumber(m)+' · x'+(b<0?' − '+functionNumber(-b):b>0?' + '+functionNumber(b):'');}
function functionLineModel(m,b,dx,x){return {m,b,dx,dy:m*dx,x,y:m*x+b,points:[-2,-1,0,1,2,3,4].map(x=>({x,y:m*x+b}))};}
function functionLineSVG(m,b,dx,staticFigure=false){
 const px=x=>52+(x+3)*47.5,py=y=>374-(y+12)*322/26;
 let grid='';for(let x=-3;x<=5;x++){grid+=`<path d="M${px(x)} 52V374" stroke="#e0e6ee"/><text x="${px(x)}" y="404" text-anchor="middle">${x}</text>`;}
 for(let y=-12;y<=12;y+=4){grid+=`<path d="M52 ${py(y)}H432" stroke="#e0e6ee"/><text x="48" y="${py(y)+8}" text-anchor="end">${y}</text>`;}
 // All selectable slopes/intercepts keep the segment inside the fixed window.
 return `<svg ${staticFigure?'data-worksheet-static="true"':''} viewBox="0 0 480 440" role="img" aria-label="${functionEquation(m,b)}; Steigungsdreieck mit waagrechter Änderung ${dx} und senkrechter Änderung ${functionNumber(m*dx)}"><rect width="480" height="440" fill="white"/><g font-size="32" fill="#172b4d">${grid}<text x="447" y="404">x</text><text x="34" y="42">y</text></g><path d="M52 ${py(0)}H432M${px(0)} 52V374" stroke="#596a7d" stroke-width="2"/><line data-function-line-segment x1="${px(-3)}" y1="${py(-3*m+b)}" x2="${px(5)}" y2="${py(5*m+b)}" stroke="#174d83" stroke-width="4"/><path data-function-slope-triangle d="M${px(0)} ${py(b)}H${px(dx)}V${py(m*dx+b)}" fill="none" stroke="#9a4800" stroke-width="4" stroke-dasharray="8 4"/><g fill="#9a4800"><circle cx="${px(0)}" cy="${py(b)}" r="5"/><circle cx="${px(dx)}" cy="${py(m*dx+b)}" r="5"/></g></svg>`;
}
function functionReadAnswer(input,min,max){const raw=input.value.trim().replace(/−/g,'-');const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;return Number.isFinite(value)&&value>=min&&value<=max?value:null;}
function bindFunctionLine(){
 const lab=document.querySelector('[data-function-line]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';
 const m=lab.querySelector('#function-m'),b=lab.querySelector('#function-b'),dx=lab.querySelector('#function-dx'),x=lab.querySelector('#function-x'),answer=lab.querySelector('#function-answer'),out=lab.querySelector('#function-status');
 const model=()=>functionLineModel(Number(m.value),Number(b.value),Number(dx.value),Number(x.value));
 const clear=()=>{out.textContent='';answer.removeAttribute('aria-invalid');};
 const draw=()=>{clear();answer.value='';const v=model();lab.querySelector('[data-function-equation]').textContent=functionEquation(v.m,v.b);lab.querySelector('[data-function-drawing]').innerHTML=functionLineSVG(v.m,v.b,v.dx);lab.querySelector('[data-function-triangle]').textContent='Steigungsdreieck von (0|'+functionNumber(v.b)+') zu ('+v.dx+'|'+functionNumber(v.b+v.dy)+'): Δx = '+v.dx+', Δy = '+functionNumber(v.dy)+'. Quotient: '+functionNumber(v.dy)+' / '+v.dx+' = '+functionNumber(v.m)+'.';lab.querySelector('[data-function-table]').innerHTML=v.points.map(p=>'<tr><th scope="row">'+p.x+'</th><td>'+functionNumber(p.y)+'</td></tr>').join('');lab.querySelector('[data-function-question]').textContent='Welcher Funktionswert y gehört zu x = '+v.x+'?';};
 const explanation=v=>'Einsetzen: y = '+functionNumber(v.m)+' · ('+v.x+')'+(v.b<0?' − '+functionNumber(-v.b):' + '+functionNumber(v.b))+' = '+functionNumber(v.y)+'. Prüfe den entsprechenden Tabellenpunkt und seine Lage auf der Geraden.';
 const check=()=>{clear();const value=functionReadAnswer(answer,-20,20);if(value===null){answer.setAttribute('aria-invalid','true');out.textContent='Gib einen Funktionswert zwischen −20 und 20 als Zahl ein, zum Beispiel −1,5.';answer.focus();return;}const v=model();out.textContent=(value===v.y?'Richtig. ':'Noch nicht richtig. ')+explanation(v);out.focus();};
 for(const control of [m,b,dx,x])control.onchange=draw;
 answer.oninput=clear;answer.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};lab.querySelector('[data-function-check]').onclick=check;lab.querySelector('[data-function-show]').onclick=()=>{clear();out.textContent=explanation(model());out.focus();};lab.querySelector('[data-function-reset]').onclick=()=>{m.value='2';b.value='1';dx.value='2';x.value='2';draw();m.focus();};draw();
}
function functionWalkValue(t){return t<0||t>8?null:t<=2?60*t:t<=4?120:240-30*t;}
function functionWalkSVG(t,staticFigure=false){
 const px=x=>65+x*44,py=y=>300-y*1.65;let grid='';
 for(let x=0;x<=8;x+=2)grid+=`<path d="M${px(x)} 69V300" stroke="#e0e6ee"/><text x="${px(x)}" y="329" text-anchor="middle">${x}</text>`;
 for(let y=0;y<=120;y+=30)grid+=`<path d="M65 ${py(y)}H417" stroke="#e0e6ee"/><text x="56" y="${py(y)+8}" text-anchor="end">${y}</text>`;
 const selected=t===null?'':`<path d="M65 ${py(functionWalkValue(t))}H${px(t)}V300" fill="none" stroke="#9a4800" stroke-width="3" stroke-dasharray="7 5"/><circle data-walk-point cx="${px(t)}" cy="${py(functionWalkValue(t))}" r="7" fill="#9a4800"/>`;
 return `<svg ${staticFigure?'data-worksheet-static="true"':''} viewBox="0 0 480 390" role="img" aria-label="Entfernung vom Start in Metern über Zeit in Minuten: hinaus von 0 bis 2, Pause bis 4, Rückkehr bis 8 Minuten"><rect width="480" height="390" fill="white"/><g font-size="32" fill="#172b4d">${grid}<text x="65" y="44">s in m</text><text x="330" y="366">t in min</text></g><path d="M65 69V300H435" stroke="#596a7d" stroke-width="2" fill="none"/><polyline data-walk-line points="${[[0,0],[2,120],[4,120],[6,60],[8,0]].map(([x,y])=>px(x)+','+py(y)).join(' ')}" stroke="#174d83" stroke-width="4" fill="none"/>${selected}</svg>`;
}
function bindFunctionWalk(){
 const lab=document.querySelector('[data-function-walk]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';const time=lab.querySelector('#function-time'),answer=lab.querySelector('#walk-answer'),out=lab.querySelector('#walk-status');
 const clear=()=>{out.textContent='';answer.removeAttribute('aria-invalid');};
 const draw=()=>{clear();answer.value='';const t=Number(time.value);time.setAttribute('aria-valuetext',t+' Minuten');lab.querySelector('[data-function-time]').textContent='Gewählter Zeitpunkt: '+t+' min.';lab.querySelector('[data-walk-drawing]').innerHTML=functionWalkSVG(t);};
 const explanation=()=>{const t=Number(time.value);return 'Bei t = '+t+' min liegt der Punkt bei s = '+functionWalkValue(t)+' m. Gehe auf der Zeitachse zu '+t+', dann senkrecht zum Graphen und waagrecht zur Entfernungsachse. '+(t<=2?'Im ersten Abschnitt wächst die Entfernung um 60 m je Minute.':t<=4?'Im waagrechten Abschnitt bleibt die Entfernung 120 m.':'Im Rückwegabschnitt nimmt die Entfernung um 30 m je Minute ab.');};
 const check=()=>{clear();const value=functionReadAnswer(answer,0,200);if(value===null){answer.setAttribute('aria-invalid','true');out.textContent='Gib eine Entfernung von 0 bis 200 m als Zahl ein.';answer.focus();return;}out.textContent=(value===functionWalkValue(Number(time.value))?'Richtig. ':'Noch nicht richtig. ')+explanation();out.focus();};
 time.oninput=draw;answer.oninput=clear;answer.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};lab.querySelector('[data-walk-check]').onclick=check;lab.querySelector('[data-walk-show]').onclick=()=>{clear();out.textContent=explanation();out.focus();};lab.querySelector('[data-walk-reset]').onclick=()=>{time.value='5';draw();time.focus();};draw();
}

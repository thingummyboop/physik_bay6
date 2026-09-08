function checkFunc1(){
 const raw=document.getElementById('func1').value.trim().replace(/−/g,'-'),out=document.getElementById('fb_func1');
 const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
 out.textContent=!Number.isFinite(value)?'Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.':value===5?"Korrekt! Für x = 2 gilt y = 2 + 3 = 5.":"Ersetze x in y = x + 3 durch 2. Addiere anschließend 3.";
}


function topicInit() { bindQuickDecimalAnswer();

        if (document.getElementById('ggb-funktionen')) {
            if (typeof GGBApplet !== 'undefined') {
                var params = {
                    "appName": "graphing",
                    "width": document.getElementById('ggb-funktionen').offsetWidth,
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
        }
}

function bindQuickDecimalAnswer(){const input=document.getElementById('func1'),out=document.getElementById('fb_func1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Funktionswert y für x gleich 2");input.setAttribute('aria-describedby','fb_func1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();checkFunc1();}};}

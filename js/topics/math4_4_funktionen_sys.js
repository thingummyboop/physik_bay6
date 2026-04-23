function checkFunc1(){ let v = document.getElementById('func1').value; if(v==5){ document.getElementById('fb_func1').innerHTML="<span style='color:green'>Korrekt! 2 + 3 = 5</span>"; } else { document.getElementById('fb_func1').innerHTML="<span style='color:red'>Falsch. Setze 2 für x ein!</span>"; } }


function topicInit() {

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

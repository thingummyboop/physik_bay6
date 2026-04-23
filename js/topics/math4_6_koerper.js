function topicInit() {

        if (document.getElementById('ggb-koerper')) {
            if (typeof GGBApplet !== 'undefined') {
                var params = {
                    "appName": "3d",
                    "width": document.getElementById('ggb-koerper').offsetWidth,
                    "height": 500,
                    "showToolBar": true,
                    "showAlgebraInput": false,
                    "showMenuBar": false
                };
                var applet = new GGBApplet(params, true);
                applet.inject('ggb-koerper');
            } else {
                document.getElementById('ggb-koerper').innerHTML = '<p style="padding: 20px; color: red;">GeoGebra konnte nicht geladen werden. Bitte lade die Seite neu.</p>';
            }
        }
}

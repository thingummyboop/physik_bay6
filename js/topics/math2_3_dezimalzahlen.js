
        function updateDec() {
            const e = document.getElementById('stelleE').value;
            const z = document.getElementById('stelleZ').value;
            const h = document.getElementById('stelleH').value;
            document.getElementById('decResult').innerText = `${e},${z}${h}`;
            document.getElementById('decExplain').innerText = `${e} Ganze, ${z} Zehntel und ${h} Hundertstel`;
        }
    


        function updateLine() {
            const v = document.getElementById('numLine').value;
            const dec = (v / 100).toFixed(2).replace('.', ',');
            document.getElementById('lineVal').innerText = dec;
        }
    


        function doRound() {
            const v = parseFloat(document.getElementById('roundNum').value);
            const rounded = Math.round(v);
            let action = v - Math.floor(v) >= 0.5 ? 'aufgerundet' : 'abgerundet';
            document.getElementById('roundRes').innerText = `${v.toString().replace('.', ',')} wird ${action} auf ${rounded}`;
        }
    


        function shiftComma(factor) {
            const val = 3.1415;
            const res = (val * factor).toFixed(5);
            document.getElementById('shiftRes').innerText = parseFloat(res).toString().replace('.', ',');
        }
    


function topicInit() {}

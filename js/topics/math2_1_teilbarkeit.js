
        function divideApples(n) {
            const total = 12;
            const remainder = total % n;
            if(remainder === 0) {
                document.getElementById('appleResult').innerText = `Ja! 12 lässt sich ohne Rest durch ${n} teilen.`;
            } else {
                document.getElementById('appleResult').innerText = `Nein! Es bleiben ${remainder} Äpfel übrig.`;
            }
            let html = '';
            for(let i=0; i<total; i++) {
                if(i > 0 && i % n === 0) html += ' | ';
                html += '🍎';
            }
            document.getElementById('appleContainer').innerHTML = html;
        }
    


        function checkEnd() {
            const v = parseInt(document.getElementById('endNum').value);
            let res = '';
            if(v % 2 === 0) res += '<li>✅ Teilbar durch 2 (endet auf 0, 2, 4, 6 oder 8)</li>';
            else res += '<li>❌ Nicht teilbar durch 2</li>';
            if(v % 5 === 0) res += '<li>✅ Teilbar durch 5 (endet auf 0 oder 5)</li>';
            else res += '<li>❌ Nicht teilbar durch 5</li>';
            if(v % 10 === 0) res += '<li>✅ Teilbar durch 10 (endet auf 0)</li>';
            else res += '<li>❌ Nicht teilbar durch 10</li>';
            document.getElementById('endResult').innerHTML = res;
        }
    


        function checkZSum() {
            const str = document.getElementById('zNum').value;
            let sum = 0;
            let expr = [];
            for(let c of str) {
                sum += parseInt(c);
                expr.push(c);
            }
            let res = expr.join(' + ') + ' = ' + sum + '<br>';
            if(sum % 3 === 0) res += '✅ Teilbar durch 3. '; else res += '❌ Nicht durch 3 teilbar. ';
            if(sum % 9 === 0) res += '✅ Teilbar durch 9.'; else res += '❌ Nicht durch 9 teilbar.';
            document.getElementById('zResult').innerHTML = res;
        }
    


        const grid = document.getElementById('sieveGrid');
        for(let i=2; i<=21; i++) {
            let btn = document.createElement('button');
            btn.innerText = i;
            btn.onclick = function() {
                if(!btn.style.textDecoration) {
                    btn.style.textDecoration = 'line-through';
                    btn.style.opacity = '0.5';
                }
            };
            grid.appendChild(btn);
        }
    


function topicInit() {}

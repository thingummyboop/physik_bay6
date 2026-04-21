
    (function() {
      const b = document.getElementById('base');
      const e = document.getElementById('exp-slider');
      const r = document.getElementById('pow-result');
      const c = document.getElementById('squares-container');
      function update() {
        const val = Math.pow(b.value, e.value);
        r.textContent = b.value + '^' + e.value + ' = ' + val;
        c.innerHTML = '';
        if(val <= 100) {
          for(let i=0; i<val; i++){
            let div = document.createElement('div');
            div.style.width = '10px'; div.style.height = '10px';
            div.style.backgroundColor = 'blue';
            c.appendChild(div);
          }
        }
      }
      b.onchange = update;
      e.oninput = update;
      update();
    })();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

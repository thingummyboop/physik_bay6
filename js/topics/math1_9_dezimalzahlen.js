
    (function(){
      const svg = document.getElementById('grid-svg');
      let val = 0;
      for(let i=0; i<100; i++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (i%10)*10);
        rect.setAttribute('y', Math.floor(i/10)*10);
        rect.setAttribute('width', '10');
        rect.setAttribute('height', '10');
        rect.setAttribute('fill', 'white');
        rect.setAttribute('stroke', '#e2e8f0');
        rect.setAttribute('stroke-width', '0.5');
        rect.id = 'cell-' + i;
        svg.appendChild(rect);
      }
      function update() {
        for(let i=0; i<100; i++) {
          document.getElementById('cell-' + i).setAttribute('fill', i < val ? '#3b82f6' : 'white');
        }
        document.getElementById('dec-value').innerText = '0,' + (val < 10 ? '0' + val : val);
      }
      document.getElementById('add-tenth').onclick = () => { if(val <= 90) val+=10; update(); };
      document.getElementById('add-hundredth').onclick = () => { if(val < 100) val+=1; update(); };
      document.getElementById('reset-grid').onclick = () => { val=0; update(); };
      update();
    })();
  


    (function(){
      let d = 1;
      const btn = document.getElementById('btn-up');
      btn.onclick = () => {
        if(d < 9) d++; else d=0;
        document.getElementById('drag-digit').innerText = d;
        document.getElementById('sum-res').innerText = (3.45 + (2 + d/10)).toFixed(2).replace('.', ',');
      }
    })();
  


function topicInit() {}

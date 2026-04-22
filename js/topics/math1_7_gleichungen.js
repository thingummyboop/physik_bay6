
    (function(){
      let l = 2; let r = 1;
      const beam = document.getElementById('scale-beam');
      const status = document.getElementById('scale-status');
      function update() {
        document.getElementById('val-l').innerText = l;
        document.getElementById('val-r').innerText = r;
        if (l === r) {
          beam.setAttribute('transform', 'rotate(0 120 90)');
          status.textContent = '=';
          status.setAttribute('fill', '#22c55e');
        } else if (l > r) {
          beam.setAttribute('transform', 'rotate(-10 120 90)');
          status.textContent = '>';
          status.setAttribute('fill', '#ef4444');
        } else {
          beam.setAttribute('transform', 'rotate(10 120 90)');
          status.textContent = '<';
          status.setAttribute('fill', '#ef4444');
        }
      }
      document.getElementById('add-l').onclick = () => { l++; update(); };
      document.getElementById('add-r').onclick = () => { r++; update(); };
      document.getElementById('reset-scale').onclick = () => { l=2; r=1; update(); };
      update();
    })();
  


    (function(){
      let add = 5; let res = 12;
      const btn = document.getElementById('btn-sub');
      btn.onclick = () => {
        if (add > 0) {
          add--; res--;
          document.getElementById('eq-add').innerText = add;
          document.getElementById('eq-res').innerText = res;
        }
        if (add === 0) {
          document.getElementById('eq-add').innerHTML = '<span style="color:#22c55e">0</span>';
          btn.disabled = true;
          btn.innerText = 'Gleichung gelöst! x = ' + res;
        }
      };
    })();
  


function topicInit() {}


    (function(){
      const slider = document.getElementById('len-slider');
      slider.oninput = function() {
        const val = parseInt(this.value);
        document.getElementById('v-cm').innerText = val;
        document.getElementById('v-mm').innerText = val * 10;
        document.getElementById('v-dm').innerText = (val / 10).toFixed(1).replace('.', ',');
        document.getElementById('v-m').innerText = (val / 100).toFixed(2).replace('.', ',');
      };
      slider.oninput();
    })();
  


    (function(){
      let total = 0;
      function add(cents) {
        total += cents;
        document.getElementById('money-total').innerText = (total / 100).toFixed(2).replace('.', ',');
      }
      document.getElementById('c-200').onclick = () => add(200);
      document.getElementById('c-100').onclick = () => add(100);
      document.getElementById('c-50').onclick = () => add(50);
      document.getElementById('c-10').onclick = () => add(10);
      document.getElementById('clear-money').onclick = () => { total = 0; add(0); };
    })();
  


function topicInit() {}

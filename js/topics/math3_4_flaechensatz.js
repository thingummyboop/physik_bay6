
    (function() {
      const ka = document.getElementById('kat-a');
      const kb = document.getElementById('kat-b');
      const hc = document.getElementById('hyp-c');
      function calc() {
        const a = ka.value;
        const b = kb.value;
        hc.textContent = Math.sqrt(a*a + b*b).toFixed(2);
      }
      ka.oninput = calc; kb.oninput = calc; calc();
    })();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

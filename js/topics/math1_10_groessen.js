
    function updateSize() {
      let m = parseFloat(document.getElementById('m-input').value) || 0;
      let cm = Math.round(m * 100);
      document.getElementById('cm-output').innerText = cm;
      let w = Math.min(300, (cm / 200) * 300);
      document.getElementById('size-bar').setAttribute('width', Math.max(0, w));
    }
    updateSize();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

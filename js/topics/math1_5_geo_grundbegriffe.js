
    function drawGeo(type) {
      const line = document.getElementById('geo-line');
      const desc = document.getElementById('geo-desc');
      line.setAttribute('opacity', '1');
      line.removeAttribute('stroke-dasharray');
      if(type === 'strecke') {
        line.setAttribute('x1', '100'); line.setAttribute('x2', '200');
        desc.innerText = "Strecke: Hat einen Anfangs- und einen Endpunkt.";
      } else if(type === 'strahl') {
        line.setAttribute('x1', '100'); line.setAttribute('x2', '300');
        desc.innerText = "Strahl (Halbgerade): Hat einen Anfangspunkt, aber kein Ende.";
      } else {
        line.setAttribute('x1', '0'); line.setAttribute('x2', '300');
        desc.innerText = "Gerade: Ist auf beiden Seiten unendlich (kein Anfang, kein Ende).";
      }
    }
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

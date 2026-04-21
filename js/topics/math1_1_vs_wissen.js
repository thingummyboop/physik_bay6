
    function updateApples(val) {
      const svg = document.getElementById('apple-svg');
      let circles = '';
      for(let i=0; i<val; i++) {
        circles += '<circle cx="'+(20 + i*22)+'" cy="25" r="8" fill="#ff5722" />';
      }
      svg.innerHTML = circles;
    }
    updateApples(3);
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

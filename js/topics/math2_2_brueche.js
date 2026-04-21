
    let active = 0;
    function togglePizza(e) {
      if(e.target.tagName === 'path') {
        let isFill = e.target.getAttribute('fill') === '#f1c40f';
        e.target.setAttribute('fill', isFill ? '#ecf0f1' : '#f1c40f');
        active += isFill ? -1 : 1;
        document.getElementById('pizzaResult').innerText = active + '/4 markiert';
      }
    }
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

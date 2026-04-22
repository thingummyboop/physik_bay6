
    function resetBars() {
      let bars = ['powBar1', 'powBar2', 'powBar3', 'powBar4'];
      bars.forEach((id, i) => {
        let el = document.getElementById(id);
        el.setAttribute('height', '0');
        el.setAttribute('y', '150');
        setTimeout(() => {
          let h = 10 * Math.pow(2, i);
          el.setAttribute('height', h);
          el.setAttribute('y', 150 - h);
        }, i * 500);
      });
    }
  


function topicInit() {}

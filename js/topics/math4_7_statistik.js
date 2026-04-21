
  function randomizeData() {
    let min = 30 + Math.random() * 40;
    let q1 = min + 20 + Math.random() * 30;
    let med = q1 + 10 + Math.random() * 30;
    let q2 = med + 10 + Math.random() * 30;
    let max = q2 + 20 + Math.random() * 40;
    if(max > 380) max = 380;
    document.getElementById('bp-wl').setAttribute('x1', min);
    document.getElementById('bp-wl').setAttribute('x2', q1);
    document.getElementById('bp-box').setAttribute('x', q1);
    document.getElementById('bp-box').setAttribute('width', q2 - q1);
    document.getElementById('bp-med').setAttribute('x1', med);
    document.getElementById('bp-med').setAttribute('x2', med);
    document.getElementById('bp-wr').setAttribute('x1', q2);
    document.getElementById('bp-wr').setAttribute('x2', max);
  }



function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

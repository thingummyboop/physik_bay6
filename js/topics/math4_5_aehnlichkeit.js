document.getElementById('k-slider').addEventListener('input', function(e){ const k = parseFloat(e.target.value); const points = [10*k,10*k, 50*k,10*k, 30*k,50*k]; document.getElementById('scaled').setAttribute('points', points.map((p,i)=> i%2==0 ? p+90 : p).join(',')); });

console.log('Strahlensatz Interaktivität geladen.');


function topicInit() {}

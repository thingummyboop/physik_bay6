function updateStat() { let outlier = parseFloat(document.getElementById('outlierSlider').value); let data = [5, 8, 10, 12, outlier]; let mean = data.reduce(function(a,b){return a+b}, 0) / 5; let sorted = data.slice().sort(function(a,b){return a-b}); let median = sorted[2]; document.getElementById('meanVal').innerText = mean.toFixed(1); document.getElementById('medianVal').innerText = median.toFixed(1); document.getElementById('outlierDot').setAttribute('cx', outlier * 10); document.getElementById('meanArrow').setAttribute('transform', 'translate(' + (mean*10) + ', 0)'); document.getElementById('medianArrow').setAttribute('transform', 'translate(' + (median*10) + ', 0)'); } updateStat();


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

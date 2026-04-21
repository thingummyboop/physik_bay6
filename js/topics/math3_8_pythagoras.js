function updatePyth() { let a = parseFloat(document.getElementById('pythA').value); let b = parseFloat(document.getElementById('pythB').value); document.getElementById('valA').innerText = a.toFixed(1); document.getElementById('valB').innerText = b.toFixed(1); let a2 = a*a; let b2 = b*b; let c2 = a2 + b2; document.getElementById('valA2B2').innerText = c2.toFixed(2); document.getElementById('valC2').innerText = c2.toFixed(2); let u = 20; let pxA = a * u; let pxB = b * u; document.getElementById('pythTri').setAttribute('points', '0,0 ' + pxB + ',0 0,-' + pxA); document.getElementById('rectA').setAttribute('x', -pxA); document.getElementById('rectA').setAttribute('y', -pxA); document.getElementById('rectA').setAttribute('width', pxA); document.getElementById('rectA').setAttribute('height', pxA); document.getElementById('rectB').setAttribute('width', pxB); document.getElementById('rectB').setAttribute('height', pxB); document.getElementById('rectC').setAttribute('points', pxB + ',0 0,-' + pxA + ' ' + pxA + ',-' + (pxA + pxB) + ' ' + (pxB + pxA) + ',-' + pxB); } updatePyth();


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}

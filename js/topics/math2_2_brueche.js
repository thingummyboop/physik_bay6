
let expandFactor = 2;
let baseZ = 1;
let baseN = 2;
const btn = document.getElementById('gl_expand_btn');
if(btn) {
    btn.onclick = () => {
        expandFactor++;
        if(expandFactor > 5) expandFactor = 2;
        document.getElementById('gl_z2').innerText = baseZ * expandFactor;
        document.getElementById('gl_n2').innerText = baseN * expandFactor;
        btn.innerText = "Mit " + expandFactor + " erweitern ➡️";
    };
}
function topicInit() {}

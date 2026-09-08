function topicInit() {
    const root = document.querySelector('[data-point-distance]');
    if (!root || root.dataset.bound) return;
    const input = root.querySelector('input');
    const update = () => {
        const offset = Number(input.value), x = 150 + 30 * offset;
        root.querySelector('[data-distance-link]').setAttribute('x2', x);
        root.querySelector('[data-distance-point]').setAttribute('cx', x);
        root.querySelector('[data-distance-label]').setAttribute('x', x);
        const length = Math.hypot(4, offset).toLocaleString('de-AT', {minimumFractionDigits:2, maximumFractionDigits:2});
        root.querySelector('[data-distance-status]').textContent = offset === 0 ? 'Q liegt auf F. PQ = PF = 4 cm: Dies ist die kürzeste Verbindung und damit der Abstand.' : 'Q liegt '+Math.abs(offset)+' cm '+(offset<0?'links':'rechts')+' von F. PQ ist gerundet '+length+' cm lang und länger als PF = 4 cm. Der Abstand von P zu g bleibt 4 cm.';
    };
    input.addEventListener('input', update);
    root.dataset.bound = '1';
    update();
}

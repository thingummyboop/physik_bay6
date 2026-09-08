'use strict';
function topicInit() {
    document.querySelectorAll('[data-cladogram-rotation]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        let rootRotated = false;
        let pairRotated = false;
        const svg = zone.querySelector('svg');
        const status = zone.querySelector('[role="status"]');
        const rootButton = zone.querySelector('[data-rotate-root]');
        const pairButton = zone.querySelector('[data-rotate-pair]');
        function render(announce) {
            const aY = rootRotated ? 240 : 60;
            const positions = rootRotated ? [60, 140] : [160, 240];
            const bY = positions[pairRotated ? 1 : 0];
            const cY = positions[pairRotated ? 0 : 1];
            const pairY = (bY + cY) / 2;
            const rootY = (aY + pairY) / 2;
            const order = [['A', aY], ['B', bY], ['C', cY]].sort((a, b) => a[1] - b[1]).map(item => item[0]).join(', ');
            svg.setAttribute('aria-label', `Kladogramm. Von oben nach unten: ${order}. A zweigt am älteren Knoten ab. B und C teilen einen jüngeren gemeinsamen Knoten. Keine Zeitskala.`);
            svg.innerHTML = `
                <g fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 ${rootY} H80 M80 ${aY} V${pairY} M80 ${aY} H520 M80 ${pairY} H280"/>
                    <path data-bc-branch d="M280 ${bY} V${cY} M280 ${bY} H520 M280 ${cY} H520"/>
                </g>
                <g fill="currentColor">
                    <circle cx="80" cy="${rootY}" r="6"/>
                    <circle data-bc-node cx="280" cy="${pairY}" r="6"/>
                    <text x="68" y="${rootY - 14}" font-size="18">1</text>
                    <text x="266" y="${pairY - 14}" font-size="18">2</text>
                    <text data-tip="A" x="540" y="${aY + 7}" font-size="24">A</text>
                    <text data-tip="B" x="540" y="${bY + 7}" font-size="24">B</text>
                    <text data-tip="C" x="540" y="${cY + 7}" font-size="24">C</text>
                </g>`;
            rootButton.setAttribute('aria-pressed', String(rootRotated));
            pairButton.setAttribute('aria-pressed', String(pairRotated));
            if (announce) status.textContent = `Reihenfolge: ${order}. Die Verwandtschaft bleibt gleich: B und C teilen Knoten 2; mit A teilen beide Knoten 1.`;
        }
        rootButton.addEventListener('click', () => { rootRotated = !rootRotated; render(true); });
        pairButton.addEventListener('click', () => { pairRotated = !pairRotated; render(true); });
        zone.querySelector('[data-tree-reset]').addEventListener('click', () => {
            rootRotated = false;
            pairRotated = false;
            render(true);
        });
        render(false);
    });
}
window.topicInit = topicInit;

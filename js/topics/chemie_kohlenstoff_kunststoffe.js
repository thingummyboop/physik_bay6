function topicInit() {
    if (window.ChemieLabs) {
        window.ChemieLabs.topicInit();
        return;
    }
    const existing = document.querySelector('script[data-chemie-common="true"]');
    if (existing) {
        existing.addEventListener('load', () => window.ChemieLabs?.topicInit(), { once: true });
        return;
    }
    const script = document.createElement('script');
    script.src = '../js/topics/chemie_common.js?v=1.2';
    script.async = false;
    script.dataset.chemieCommon = 'true';
    script.onload = () => window.ChemieLabs?.topicInit();
    document.body.appendChild(script);
}

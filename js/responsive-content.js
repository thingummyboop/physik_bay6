// Keep wide teaching tables readable without making the whole chapter wider.
(() => {
    const records = new Map();
    let scheduled = false;
    let sequence = 0;
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;

    function hasScrollContainer(table, root) {
        for (let parent = table.parentElement; parent && parent !== root; parent = parent.parentElement) {
            if (['auto', 'scroll'].includes(getComputedStyle(parent).overflowX)) return true;
        }
        return false;
    }

    function refresh() {
        scheduled = false;
        const root = document.getElementById('sections-container');
        if (!root) return;
        for (const [table, record] of records) {
            if (!root.contains(table)) {
                resize?.unobserve(record.wrapper);
                resize?.unobserve(table);
                records.delete(table);
            }
        }
        for (const table of root.querySelectorAll('table')) {
            if (records.has(table) || hasScrollContainer(table, root)) continue;
            const wrapper = document.createElement('div');
            wrapper.className = 'responsive-table';
            wrapper.dataset.responsiveTable = String(++sequence);
            table.before(wrapper);
            wrapper.append(table);
            const hint = document.createElement('span');
            hint.className = 'responsive-table-hint';
            hint.textContent = '↔';
            hint.setAttribute('aria-hidden', 'true');
            hint.hidden = true;
            wrapper.before(hint);
            records.set(table, { wrapper, hint });
            resize?.observe(wrapper);
            resize?.observe(table);
        }
        for (const [table, { wrapper, hint }] of records) {
            const overflows = wrapper.clientWidth > 0 && wrapper.scrollWidth > wrapper.clientWidth + 1;
            hint.hidden = !overflows;
            if (overflows) {
                const label = table.caption?.textContent.trim() || table.closest('.card')?.querySelector('h2,h3')?.textContent.trim() || table.querySelector('th')?.textContent.trim();
                wrapper.tabIndex = 0;
                wrapper.setAttribute('role', 'region');
                if (label) wrapper.setAttribute('aria-label', label);
            } else {
                wrapper.removeAttribute('tabindex');
                wrapper.removeAttribute('role');
                wrapper.removeAttribute('aria-label');
            }
        }
    }

    function schedule() {
        if (!scheduled) {
            scheduled = true;
            requestAnimationFrame(refresh);
        }
    }

    function start() {
        const root = document.getElementById('sections-container');
        if (!root) return;
        new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
        window.addEventListener('resize', schedule);
        schedule();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();

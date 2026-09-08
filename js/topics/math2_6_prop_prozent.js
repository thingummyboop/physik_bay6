function updatePizzaCalculator() {
    const slider = document.getElementById('pizza_slider');
    const count = document.getElementById('pizza_count');
    const price = document.getElementById('pizza_price');
    if (!slider || !count || !price) return;

    const amount = Number(slider.value);
    const total = amount * 5;
    count.innerText = String(amount);
    price.innerText = String(total);
    slider.setAttribute('aria-valuetext', `${amount} Pizzen, ${total} Euro`);
}

function calculateRabatt() {
    const rabattInput = document.getElementById('rabatt_input');
    const rabattRes = document.getElementById('rabatt_res');
    if (!rabattInput || !rabattRes) return;

    const baseInput = document.getElementById('rabatt_base');
    const hundredths = raw => {
        const value = String(raw).trim().replace(',', '.');
        if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return NaN;
        const [whole, fraction = ''] = value.split('.');
        return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    };
    const base = hundredths(baseInput?.value);
    const rate = hundredths(rabattInput.value);
    if (!Number.isSafeInteger(base) || base < 0 || base > 99999999) {
        rabattRes.textContent = 'Gib einen ursprünglichen Preis von 0 bis 999999,99 € mit höchstens zwei Nachkommastellen ein.';
        return;
    }
    if (!Number.isSafeInteger(rate) || rate < 0 || rate > 10000) {
        rabattRes.textContent = 'Bitte gib einen Rabatt zwischen 0 und 100 ein, mit höchstens zwei Nachkommastellen.';
        return;
    }

    // Integer cents and hundredths of a percent keep monetary rounding consistent.
    const savingCents = Math.floor((base * rate + 5000) / 10000);
    const sparen = savingCents / 100;
    const neuerPreis = (base - savingCents) / 100;
    const euro = value => value.toLocaleString('de-AT', {style: 'currency', currency: 'EUR'});
    rabattRes.textContent = `Grundwert: ${euro(base / 100)}. Rabatt: ${(rate / 100).toLocaleString('de-AT')} %. Rechenweg: ${euro(base / 100)} × ${(rate / 100).toLocaleString('de-AT')} : 100. Du sparst: ${euro(sparen)}. Neuer Preis: ${euro(neuerPreis)}. Der Rabattbetrag ist auf Cent gerundet.`;
}

function updateInverseCalculator() {
    const input = document.getElementById('inverse_people'), result = document.getElementById('inverse_result');
    if (!input || !result) return;
    const people = Number(input.value);
    if (!Number.isInteger(people) || people < 1 || people > 12) {
        result.textContent = 'Wähle eine ganze Personenanzahl von 1 bis 12.';
        return;
    }
    const share = (60 / people).toLocaleString('de-AT', {style: 'currency', currency: 'EUR'});
    result.textContent = `${people} Personen: 60 € : ${people} = ${share} pro Person (auf Cent gerundet).`;
    input.setAttribute('aria-valuetext', `${people} Personen, ${share} pro Person`);
}

function topicInit() {
    const inverse = document.getElementById('inverse_people');
    if (inverse) {
        inverse.oninput = updateInverseCalculator;
        inverse.setAttribute('aria-describedby', 'inverse_result');
        updateInverseCalculator();
    }
    const pizzaSlider = document.getElementById('pizza_slider');
    const pizzaPrice = document.getElementById('pizza_price');
    if (pizzaSlider) {
        pizzaSlider.oninput = updatePizzaCalculator;
        pizzaSlider.setAttribute('aria-describedby', 'pizza_price');
        updatePizzaCalculator();
    }
    if (pizzaPrice) {
        pizzaPrice.setAttribute('role', 'status');
        pizzaPrice.setAttribute('aria-live', 'polite');
        pizzaPrice.setAttribute('aria-atomic', 'true');
    }

    const rabattInput = document.getElementById('rabatt_input');
    const rabattRes = document.getElementById('rabatt_res');
    if (rabattRes) {
        rabattRes.setAttribute('role', 'status');
        rabattRes.setAttribute('aria-live', 'polite');
        rabattRes.setAttribute('aria-atomic', 'true');
    }
    for (const field of [document.getElementById('rabatt_base'), rabattInput].filter(Boolean)) {
        field.setAttribute('aria-describedby', 'rabatt_res');
        if (field.dataset.enterBound !== 'true') {
            field.dataset.enterBound = 'true';
            field.addEventListener('input', () => { if (rabattRes) rabattRes.textContent = ''; });
            field.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    calculateRabatt();
                }
            });
        }

    }
    if (rabattInput) {
        const rabattButton = rabattInput.parentElement?.nextElementSibling;
        if (rabattButton?.tagName === 'BUTTON' && rabattButton.dataset.handlerBound !== 'true') {
            rabattButton.dataset.handlerBound = 'true';
            rabattButton.onclick = (event) => {
                event.preventDefault();
                calculateRabatt();
            };
        }
    }
}

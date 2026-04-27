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

    const rabatt = Number(String(rabattInput.value).replace(',', '.'));
    if (!Number.isFinite(rabatt) || rabatt < 0 || rabatt > 100) {
        rabattRes.innerText = 'Bitte gib einen Rabatt zwischen 0 und 100 ein.';
        return;
    }

    const sparen = 100 * (rabatt / 100);
    const neuerPreis = 100 - sparen;
    rabattRes.innerHTML = `Du sparst: ${sparen.toFixed(2)}€<br>Neuer Preis: <b>${neuerPreis.toFixed(2)}€</b>`;
}

function topicInit() {
    const pizzaSlider = document.getElementById('pizza_slider');
    const pizzaPrice = document.getElementById('pizza_price');
    if (pizzaSlider) {
        pizzaSlider.addEventListener('input', updatePizzaCalculator);
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
    if (rabattInput) {
        rabattInput.setAttribute('aria-describedby', 'rabatt_res');
        if (rabattInput.dataset.enterBound !== 'true') {
            rabattInput.dataset.enterBound = 'true';
            rabattInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    calculateRabatt();
                }
            });
        }

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

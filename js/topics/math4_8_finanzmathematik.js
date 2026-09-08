function ensureFinanzFeedback(host) {
    if (!host) return null;
    let feedback = document.getElementById('finanz_feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'finanz_feedback';
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        host.appendChild(feedback);
    }
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    return feedback;
}

function financeComparison(amount) {
    if (!Number.isFinite(amount) || amount < 0 || amount > 100000 || Math.abs(amount*100-Math.round(amount*100))>0.000001) return null;
    const start=Math.round(amount*100), simpleInterest=Math.round(start*5/100), rows=[];
    let balance=start;
    for(let year=1;year<=5;year++){
        const interest=Math.round(balance*5/100);balance+=interest;
        rows.push({year,interest:interest/100,compound:balance/100,simple:(start+year*simpleInterest)/100});
    }
    return rows;
}

function topicInit() {
    const input = document.getElementById('fin_z');
    if (!input) return;

    const zone = input.closest('.interactive-zone');
    const button = zone?.querySelector('button') || null;
    if (!button) return;

    const feedback = ensureFinanzFeedback(zone);
    input.setAttribute('aria-describedby', 'finanz_feedback');

    const evaluate = () => {
        const raw=String(input.value).trim().replace(',', '.'),amount=raw===''?NaN:Number(raw),rows=financeComparison(amount),output=zone.querySelector('[data-interest-table]');
        if(output)output.replaceChildren();
        if (!rows) {
            if (feedback) feedback.textContent = 'Gib ein Startguthaben von 0 bis 100 000 Euro mit höchstens zwei Nachkommastellen ein.';
            return;
        }
        const euro=n=>n.toLocaleString('de-AT',{style:'currency',currency:'EUR'});
        if(feedback)feedback.textContent='Nach fünf Jahren: '+euro(rows[4].compound)+' mit Zinseszins; '+euro(rows[4].simple)+' bei einfacher Verzinsung. Beide Modelle verwenden 5 % pro Jahr ohne Abzüge.';
        if(output){const table=document.createElement('table'),caption=document.createElement('caption');caption.textContent='Vergleich mit jährlicher Cent-Rundung';table.append(caption);const header=document.createElement('tr');for(const label of ['Jahr','Zinsen dieses Jahres mit Zinseszins','Guthaben mit Zinseszins','Anfangskapital plus einfache Zinsen']){const th=document.createElement('th');th.scope='col';th.textContent=label;header.append(th);}const thead=document.createElement('thead');thead.append(header);table.append(thead);const tbody=document.createElement('tbody');for(const row of rows){const tr=document.createElement('tr');for(const text of [row.year,euro(row.interest),euro(row.compound),euro(row.simple)]){const td=document.createElement('td');td.textContent=text;tr.append(td);}tbody.append(tr);}table.append(tbody);output.append(table);}
    };

    button.onclick = (event) => {
        event.preventDefault();
        evaluate();
    };

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    }
    evaluate();
}

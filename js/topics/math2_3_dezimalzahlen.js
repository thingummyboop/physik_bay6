function ensureDecimalExerciseFeedback(input, button, feedbackId) {
    if (!input) return null;

    let feedback = document.getElementById(feedbackId);
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = feedbackId;
        feedback.className = 'lab-feedback';
        feedback.style.marginTop = '8px';
        const host = button?.parentElement || input.parentElement;
        host?.appendChild(feedback);
    }

    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    input.setAttribute('aria-describedby', feedbackId);

    return feedback;
}

function parseCommaNumber(raw) {
    if (typeof raw !== 'string') return NaN;
    const normalized = raw.trim().replace(/−/g, '-').replace(',', '.');
    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(normalized)) return NaN;
    return Number(normalized);
}

function bindDecimalExercise({ inputId, feedbackId, expected, successText, hintText }) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = 'text';
    input.inputMode = 'decimal';
    input.setAttribute('aria-label', {
        geld_input: 'Restbetrag in Euro',
        rund_input: '12,3 auf ganze Zahlen gerundet',
        komma_input: 'Ergebnis von 5,2 mal 100'
    }[inputId] || 'Dein Ergebnis');

    const button = input.parentElement?.querySelector('button') || null;
    const feedback = ensureDecimalExerciseFeedback(input, button, feedbackId);

    const evaluate = () => {
        const value = parseCommaNumber(input.value);
        if (!Number.isFinite(value)) {
            if (feedback) feedback.textContent = 'Gib eine Zahl ein, zum Beispiel 2,5. Komma oder Punkt sind als Dezimalzeichen erlaubt.';
        } else if (value === expected) {
            if (feedback) feedback.textContent = successText;
        } else {
            if (feedback) feedback.textContent = hintText;
        }
    };

    if (button) {
        button.onclick = (event) => {
            event.preventDefault();
            evaluate();
        };
    }

    if (input.dataset.enterBound !== 'true') {
        input.dataset.enterBound = 'true';
        input.addEventListener('input', () => { if(feedback) feedback.textContent = ''; });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                evaluate();
            }
        });
    }
}

function topicInit() {
    bindPeriodDivision();
    bindPeriodFraction();
    bindDecimalExercise({
        inputId: 'geld_input',
        feedbackId: 'geld_feedback',
        expected: 2.5,
        successText: 'Genau! 2,50 Euro bleiben übrig.',
        hintText: 'Noch nicht ganz: rechne 5,00 minus 2,50.'
    });

    bindDecimalExercise({
        inputId: 'rund_input',
        feedbackId: 'rund_feedback',
        expected: 12,
        successText: 'Richtig! 12,3 wird auf 12 abgerundet.',
        hintText: 'Tipp: Schau auf die erste Zahl nach dem Komma. Bei 3 wird abgerundet.'
    });

    bindDecimalExercise({
        inputId: 'komma_input',
        feedbackId: 'komma_feedback',
        expected: 520,
        successText: 'Super! 5,2 mal 100 ergibt 520.',
        hintText: 'Noch nicht: Bei mal 100 wandert das Komma zwei Stellen nach rechts.'
    });
}

function periodDivisionModel(numerator, denominator) {
    if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || numerator < 0 || numerator > 100 || denominator < 1 || denominator > 100) return null;
    const whole = Math.floor(numerator / denominator), initialRest = numerator % denominator, seen = new Map(), rows = [], digits = [];
    let rest = initialRest;
    while (rest !== 0 && !seen.has(rest)) {
        seen.set(rest, digits.length);
        const scaled = rest * 10, digit = Math.floor(scaled / denominator), after = scaled % denominator;
        rows.push({before: rest, scaled, digit, after}); digits.push(digit); rest = after;
    }
    const start = rest === 0 ? digits.length : seen.get(rest), prefix = digits.slice(0, start).join(''), period = digits.slice(start).join('');
    const exact = String(whole) + (digits.length ? ',' + prefix + (period ? '(' + period + ')' : '') : '');
    return {numerator, denominator, whole, initialRest, rows, prefix, period, exact, repeatedRest: period ? rest : null};
}

function bindPeriodDivision() {
    const lab = document.querySelector('[data-period-lab]'); if (!lab || lab.dataset.bound) return; lab.dataset.bound = 'true';
    const q = s => lab.querySelector(s), num = q('#period-num'), den = q('#period-den'), next = q('[data-period-next]'), all = q('[data-period-all]'), reset = q('[data-period-reset]');
    let model, visible = 0;
    function render() {
        q('[data-period-start]').textContent = model.numerator + ' : ' + model.denominator + ': Ganzer Anteil ' + model.whole + ', erster Rest ' + model.initialRest + '.';
        q('[data-period-table]').innerHTML = '<p class="decimal-legend">R: bisheriger Rest; 10R: zehnfacher Rest; Z: nächste Ziffer; R′: neuer Rest.</p><table class="decimal-table"><caption>Schritte nach dem Komma</caption><thead><tr><th scope="col">R</th><th scope="col">10R</th><th scope="col">Z</th><th scope="col">R′</th></tr></thead><tbody>' + model.rows.slice(0,visible).map(r => '<tr><td>'+r.before+'</td><td>'+r.scaled+'</td><td>'+r.digit+'</td><td>'+r.after+'</td></tr>').join('') + '</tbody></table>';
        const finished = visible === model.rows.length;
        next.disabled = finished; all.disabled = finished;
        q('#period-status').textContent = finished ? model.numerator+'/'+model.denominator+' = '+model.exact+'. '+(model.period ? 'Rest '+model.repeatedRest+' wiederholt sich. Periode: '+model.period+'. '+(model.prefix ? 'Vorperiode: '+model.prefix+'.' : 'Die Periode beginnt direkt nach dem Komma.') : 'Rest 0: Die Division endet.') : visible ? 'Bisher: '+model.whole+','+model.rows.slice(0,visible).map(r=>r.digit).join('')+'… . Neuer Rest: '+model.rows[visible-1].after+'. Rechne weiter.' : 'Vermute zuerst, ob die Division endet. Zeige dann den nächsten Schritt.';
    }
    function update() { model = periodDivisionModel(Number(num.value),Number(den.value)); visible=0; render(); }
    next.addEventListener('click',()=>{visible=Math.min(visible+1,model.rows.length);render();if(visible===model.rows.length)reset.focus();});
    all.addEventListener('click',()=>{visible=model.rows.length;render();reset.focus();});
    for(const control of [num,den])control.addEventListener('change',update);
    reset.addEventListener('click',()=>{num.value='1';den.value='6';update();num.focus();});update();
}

function periodFractionModel(index) {
    const cases = [['0','','3'],['0','','6'],['0','','27'],['0','1','6'],['0','08','3'],['1','','2'],['0','','9'],['0','125',''],['0','75',''],['2','5',''],['0','',''],['2','','']];
    if (!Number.isInteger(index) || !cases[index]) return null;
    const [whole,prefix,period] = cases[index], lowerFactor = 10**prefix.length, upperFactor = 10**(prefix.length+period.length);
    const left = Number(whole+prefix+period), right = period ? Number(whole+prefix) : 0, numerator = left-right, denominator = period ? upperFactor-lowerFactor : lowerFactor;
    let a=numerator,b=denominator; while(b){const r=a%b;a=b;b=r;} const gcd=a;
    return {whole,prefix,period,lowerFactor,upperFactor,left,right,numerator,denominator,gcd,reducedNumerator:numerator/gcd,reducedDenominator:denominator/gcd,label:whole+(prefix||period?','+prefix+(period?'('+period+')':''):'')};
}

function bindPeriodFraction() {
    const lab=document.querySelector('[data-period-back]');if(!lab||lab.dataset.bound)return;lab.dataset.bound='true';
    const q=s=>lab.querySelector(s),task=q('#period-case'),num=q('#period-answer-num'),den=q('#period-answer-den'),status=q('#period-back-status'),solution=q('[data-period-solution-text]');
    const integer=s=>/^\d+$/.test(s.trim())&&Number(s)<=1000000?Number(s):null;
    function update(){num.value=den.value='';status.textContent='';solution.replaceChildren();solution.hidden=true;}
    function check(){const n=integer(num.value),d=integer(den.value),m=periodFractionModel(Number(task.value));if(n===null||d===null||d===0){status.textContent='Gib einen nichtnegativen ganzen Zähler und einen positiven ganzen Nenner ein (höchstens 1 000 000).';return;}status.textContent=n*m.reducedDenominator!==d*m.reducedNumerator?'Noch nicht. Beachte, welche Ziffern sich wiederholen. Prüfe den Rechenweg durch Verschieben und Subtrahieren.':n===m.reducedNumerator&&d===m.reducedDenominator?'Richtig: '+m.label+' = '+n+'/'+d+'. Der Bruch ist vollständig gekürzt.':'Der Wert stimmt. Kürze Zähler und Nenner noch durch ihren gemeinsamen Teiler.';}
    task.addEventListener('change',update);for(const input of [num,den]){input.addEventListener('input',()=>{status.textContent='';});input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});}
    q('[data-period-check]').addEventListener('click',check);
    q('[data-period-solution]').addEventListener('click',()=>{const m=periodFractionModel(Number(task.value));solution.hidden=false;solution.innerHTML=m.period?'<p>Setze x = '+m.label+'. Multiplizieren mit '+m.upperFactor+' beziehungsweise '+m.lowerFactor+' bringt dieselbe Periode hinter das Komma.</p><p><span class="decimal-number">'+m.upperFactor+'x = '+m.left+',('+m.period+')</span>; <span class="decimal-number">'+m.lowerFactor+'x = '+m.right+',('+m.period+')</span>.</p><p>Subtrahieren: ('+m.upperFactor+' − '+m.lowerFactor+')x = '+m.left+' − '+m.right+'. Also '+m.denominator+'x = '+m.numerator+'.</p>':'<p>'+m.prefix.length+' Nachkommastellen: '+m.label+' = '+m.numerator+'/'+m.denominator+'.</p>';solution.innerHTML+='<p>'+m.numerator+'/'+m.denominator+' = '+m.reducedNumerator+'/'+m.reducedDenominator+'. '+(m.gcd>1?'Zähler und Nenner durch '+m.gcd+' kürzen.':'Zähler und Nenner haben keinen gemeinsamen Teiler größer als 1.')+'</p>';status.textContent='Der Rechenweg steht unter den Schaltflächen.';});
    q('[data-period-back-reset]').addEventListener('click',()=>{task.value='0';update();task.focus();});update();
}

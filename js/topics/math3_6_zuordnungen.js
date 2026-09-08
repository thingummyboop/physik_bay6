function checkKino() {
 const input = document.getElementById('kino_in'), feedback = document.getElementById('kino_feedback');
 if (!input || !feedback) return;
 const raw = input.value.trim().replace(',', '.');
 if (!/^\d+(?:\.\d{1,2})?$/.test(raw) || !Number.isFinite(Number(raw))) {
  feedback.textContent = 'Gib einen nicht negativen Preis in Euro ein, mit höchstens zwei Nachkommastellen.';
  return;
 }
 feedback.textContent = Number(raw) === 50 ? 'Richtig: 20 € : 2 = 10 € pro Ticket. 5 × 10 € = 50 €.' : 'Noch nicht: Bestimme zuerst den Preis für ein Ticket mit 20 € : 2. Multipliziere diesen Stückpreis dann mit 5.';
}
function topicInit() {
 const input = document.getElementById('kino_in'), feedback = document.getElementById('kino_feedback');
 if (!input || !feedback || input.dataset.bound === 'true') return;
 input.dataset.bound = 'true';
 input.setAttribute('aria-describedby', 'kino_feedback');
 feedback.setAttribute('role', 'status');feedback.setAttribute('aria-live', 'polite');feedback.setAttribute('aria-atomic', 'true');
 input.addEventListener('input', () => { feedback.textContent = ''; });
 input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault();checkKino(); } });
 const button = input.closest('.interactive-zone').querySelector('button');
 button.type = 'button';button.onclick = checkKino;
}

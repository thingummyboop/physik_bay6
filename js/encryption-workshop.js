'use strict';
(() => {
  const el = id => document.getElementById(id);
  const fields = ['plain', 'encrypt-password', 'encrypted', 'file', 'cipher', 'decrypt-password', 'opened'];
  const controls = [...fields, 'encrypt', 'decrypt', 'download', 'transfer'];
  const supported = !!(globalThis.isSecureContext && globalThis.crypto?.subtle && globalThis.TextEncoder && globalThis.TextDecoder);
  const iterations = 600000, maxFile = 16384;
  let generation = 0, busy = false;
  const status = message => { el('status').textContent = message; };
  function buttons() {
    controls.forEach(id => { el(id).disabled = busy || !supported; });
    el('download').disabled = el('transfer').disabled = busy || !supported || !el('encrypted').value;
    el('status').setAttribute('aria-busy', String(busy));
  }
  function invalidateOpened() { el('opened').value = ''; }
  function invalidateEncrypted() { el('encrypted').value = ''; buttons(); }
  function password(id) {
    const value = el(id).value;
    if (value.length < 8 || value.length > 128) throw new Error('Verwende ein Übungspasswort mit 8 bis 128 Zeichen.');
    return value;
  }
  const encode = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
  function decode(value, min, max) {
    if (typeof value !== 'string' || value.length > maxFile || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)) throw new Error('Dateiformat');
    const bytes = Uint8Array.from(atob(value), char => char.charCodeAt(0));
    if (bytes.length < min || bytes.length > max || encode(bytes) !== value) throw new Error('Dateiformat');
    return bytes;
  }
  function parse(value) {
    if (!value || value.length > maxFile) throw new Error('Dateiformat');
    const data = JSON.parse(value);
    if (!data || Array.isArray(data) || Object.keys(data).sort().join(',') !== 'data,format,iterations,iv,kdf,salt' || data.format !== 'sciverse-text-v1' || data.kdf !== 'PBKDF2-SHA-256' || data.iterations !== iterations) throw new Error('Dateiformat');
    return { salt: decode(data.salt, 16, 16), iv: decode(data.iv, 12, 12), data: decode(data.data, 17, 3016) };
  }
  async function key(pass, salt, usage) {
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, material, { name: 'AES-GCM', length: 256 }, false, [usage]);
  }
  async function run(work, failure) {
    if (busy || !supported) return;
    const token = ++generation;
    busy = true; buttons(); status('Wird verarbeitet …');
    try { await work(() => token === generation); }
    catch (error) { if (token === generation) status(failure || error.message); }
    finally { if (token === generation) { busy = false; buttons(); } }
  }
  el('encrypt').addEventListener('click', () => {
    invalidateEncrypted();
    run(async current => {
      const text = el('plain').value, pass = password('encrypt-password');
      if (!text.trim() || text.length > 1000) throw new Error('Trage eine erfundene Notiz mit 1 bis 1.000 Zeichen ein.');
      const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
      const aes = await key(pass, salt, 'encrypt');
      const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, aes, new TextEncoder().encode(text));
      if (!current()) return;
      el('encrypted').value = JSON.stringify({ format: 'sciverse-text-v1', kdf: 'PBKDF2-SHA-256', iterations, salt: encode(salt), iv: encode(iv), data: encode(encrypted) }, null, 2);
      status('Verschlüsselt. Speichere die Datei oder übernimm die Daten zum Öffnen. Das Original steht weiterhin im ersten Feld.');
    });
  });
  el('decrypt').addEventListener('click', () => {
    invalidateOpened();
    run(async current => {
      const pass = password('decrypt-password'), parsed = parse(el('cipher').value);
      const aes = await key(pass, parsed.salt, 'decrypt');
      const bytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: parsed.iv, tagLength: 128 }, aes, parsed.data);
      const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
      if (!text.trim() || text.length > 1000) throw new Error('Textlänge');
      if (!current()) return;
      el('opened').value = text;
      status('Entschlüsselt. Vergleiche die Notiz mit deinem ursprünglichen Text.');
    }, 'Öffnen fehlgeschlagen. Prüfe das Übungspasswort und lade die unveränderte Datei dieser Werkstatt. Es wird kein Klartext ausgegeben.');
  });
  el('file').addEventListener('change', () => {
    const file = el('file').files[0];
    invalidateOpened(); el('cipher').value = '';
    if (!file) return;
    run(async current => {
      if (file.size > maxFile) throw new Error('Die Datei ist zu groß. Erlaubt sind höchstens 16 KiB.');
      const text = await file.text();
      try { parse(text); } catch { throw new Error('Diese Datei hat nicht das unterstützte Übungsformat. Lade eine unveränderte Datei dieser Werkstatt.'); }
      if (!current()) return;
      el('cipher').value = text;
      status('Datei geladen. Gib das passende Übungspasswort zum Öffnen ein.');
    });
  });
  el('transfer').addEventListener('click', () => {
    el('cipher').value = el('encrypted').value; el('file').value = ''; invalidateOpened();
    el('decrypt-password').focus(); status('Daten übernommen. Gib das passende Übungspasswort zum Öffnen ein.');
  });
  el('download').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([el('encrypted').value], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'sciverse-uebungsnotiz.json'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status('Download angefordert. Prüfe den Downloadordner und merke dir dein Übungspasswort getrennt von der Datei.');
  });
  ['plain', 'encrypt-password'].forEach(id => el(id).addEventListener('input', () => { invalidateEncrypted(); status('Eingabe geändert. Verschlüssle die Notiz erneut.'); }));
  ['cipher', 'decrypt-password'].forEach(id => el(id).addEventListener('input', () => { invalidateOpened(); status('Eingabe geändert. Öffne die Daten erneut.'); }));
  el('reset').addEventListener('click', () => {
    generation++; busy = false;
    fields.forEach(id => { el(id).value = ''; }); buttons(); el('plain').focus();
    status(supported ? 'Arbeitsfelder geleert. Bereits heruntergeladene Dateien bleiben erhalten.' : 'Verschlüsselung ist hier nicht verfügbar. Öffne die HTTPS-Version mit einem aktuellen Browser.');
  });
  // Clear restored form values as well: this exercise does not resume secrets after reload/back.
  ['encrypt-password', 'encrypted', 'file', 'cipher', 'decrypt-password', 'opened'].forEach(id => { el(id).value = ''; });
  buttons();
  if (!supported) status('Verschlüsselung ist hier nicht verfügbar. Öffne die HTTPS-Version mit einem aktuellen Browser.');
})();

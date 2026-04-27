# Gemeinsame Qualitätskriterien (P2/P3)

Diese Kriterien gelten für **alle Fächer** (Physik, Mathematik, DGB, Wetter/Klima).

## 1) Sprache (A2–B1)
- Kurze Sätze, ein Gedanke pro Satz.
- Fachbegriff nur mit kurzer Alltagserklärung.
- Merksatz sichtbar machen ("Merke:").
- Keine unnötigen Metaphern oder lange Einleitungen.

## 2) Didaktik & Lernprogression
- Reihenfolge pro Abschnitt: **Mini-Ziel → Beispiel → geführter Versuch → schneller Check**.
- Neue Symbole/Formeln erst nach einem konkreten Kontext.
- Transferfrage mit Alltagsbezug (Öffis, Rad, Wohnung, Einkauf, Wetter, Handy).

## 3) Quiz-/Diplom-Feedback
- Jede Antwortoption braucht ein `feedback`-Feld.
- Falsche Antworten: typische Fehlvorstellung benennen (nicht nur "falsch").
- Richtige Antworten: kurz begründen, warum richtig.
- Länge pro Feedback: ideal 1–2 Sätze.

## 4) Accessibility (Interaktionen)
- Dynamische Rückmeldungen über Live-Regionen (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`).
- Bedienelemente per Tastatur erreichbar (Tab, Enter/Space).
- Bei Umschaltern/Auswahlzuständen `aria-pressed` konsistent pflegen.
- Für Slider `aria-describedby` und sinnvolle `aria-valuetext`-Ausgabe.
- Re-Init-sicher: keine doppelten Event-Listener oder gestapelten Timer/Animationen.

## 5) Technische Mindest-Checks vor Commit
- Syntaxcheck betroffener Topic-Dateien: `node --check ...`
- Sprachdateien parsebar: `node -e "JSON.parse(fs.readFileSync(...))"` oder bestehende Audits.
- Quiz-Feedback-Vollständigkeit: `node scripts/audit_quiz_feedback.js`
- Nebenfächer-A11y-Basischeck: `node scripts/audit_remaining_subjects_a11y.js`
- Whitespace/Conflict-Fehler: `git diff --check`

## 6) Definition of Done (pro Chunk)
Ein Chunk ist erst fertig, wenn:
1. die inhaltliche Lücke geschlossen ist,
2. Accessibility nicht regressiv ist,
3. die Mindest-Checks grün sind,
4. kurze Run-Notiz im `docs/ROADMAP_PERFECTION.md` ergänzt wurde.

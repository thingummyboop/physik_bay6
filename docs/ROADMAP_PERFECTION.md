# Roadmap Perfection

## Audit P1: Physik

Konkrete Schwächen vor P1:
- Sprache: Einige Physiktexte waren motivierend, aber zu lang, mit hoher Bildsprache und wenig kurzen Merksätzen.
- Kognitive Last: Formeln und Simulationen wurden teils gleichzeitig gezeigt, ohne kleinen Rechenweg oder Beobachtungsauftrag.
- Interaktion: Viele Elemente waren reine Animationen. Vorhersage, Tipp und Auswertung fehlten oft.
- Feedback: Falsche Quizantworten bekamen meist generisches Feedback statt Erklärung der Fehlvorstellung.
- Progression: Einige Seiten sprangen schnell von Alltagssprache zu Fachbegriffen wie Frequenz, Widerstand oder Energieerhaltung.
- Barrierearmut: Feedback ist jetzt stärker textlich sichtbar; P2 braucht noch systematische Tastatur- und Screenreader-Prüfung aller SVG-Labore.

## Phase 1: Physics

P1 umgesetzt:
- Quizantworten unterstützen kurze, antwortspezifische Feedbacktexte.
- Physik-Kernthemen Kraft und Bewegung, Energie, Wärmelehre, Elektrizität und Akustik erhielten geführte Hinweise, kurze Reveals und bessere Auswertungstexte.
- Fachsprache wurde an mehreren Stellen mit einfachen Alltagssätzen gestützt.

P2 als Nächstes:
- Alle restlichen Physikthemen einzeln auf A2-B1-Sprache, Fehlvorstellungen und Lernprogression prüfen.
- Diplomfragen mit Diagnosefeedback statt nur Punktefeedback erweitern.
- SVG-Interaktionen mit Tastaturbedienung, sichtbarem Fokus und ARIA-Beschreibungen nachziehen.
- Mehr kurze Transferchecks aus österreichischem Alltag ergänzen: Öffis, Rad, Wohnung, Supermarkt, Wetter, Handy.

P2 Fortschritt (Run 2026-04-27 16:31):
- Thema **Elektromagnetismus** vollständig mit diagnoseorientiertem Antwortfeedback nachgezogen.
- Abgedeckt: 6 Kapitel-Quizfragen + 15 Diplomfragen (jeweils richtige und typische Fehlvorstellung).
- Ergebnis: Lernende bekommen jetzt bei falschen Antworten konkrete Korrekturhinweise statt generischem "falsch".

P2 Fortschritt (Run 2026-04-27 16:41):
- Thema **Akustik** im Diplomteil mit durchgängigem Antwortfeedback ergänzt.
- Abgedeckt: 15 Diplomfragen mit jeweils Feedback für richtige und typische falsche Antwort.
- Ergebnis: Auch im Abschlusscheck erhalten Lernende jetzt direkte Korrekturhinweise statt leeren Feedbackfeldern.

P2 Fortschritt (Run 2026-04-27 16:58):
- Themen **Arbeit** und **Energie** im Diplomteil mit diagnoseorientiertem Antwortfeedback ergänzt.
- Abgedeckt: 20 Diplomfragen (10 + 10), jeweils mit Feedback für richtige und typische falsche Antwort.
- Ergebnis: Diese beiden Physikmodule geben bei Fehlvorstellungen jetzt konkrete Korrekturhinweise statt leerem Feedback.

P2 Fortschritt (Run 2026-04-27 17:08):
- Thema **Astronomie** vollständig mit diagnoseorientiertem Antwortfeedback nachgezogen.
- Abgedeckt: 5 Kapitel-Quizfragen + 10 Diplomfragen (insgesamt 30 Antwortoptionen mit Feedback für richtig/falsch).
- Ergebnis: Astronomie liefert jetzt bei jeder Antwort direkte Lernhinweise statt stummer Auswertung.

P2 Fortschritt (Run 2026-04-27 17:18):
- Thema **Wärmelehre** bei den SVG-Laboren auf Accessibility und Tastatursteuerung verbessert.
- Abgedeckt: ARIA-Describes für Regler/Buttons, Live-Status für dynamische Rückmeldungen sowie Tastaturbedienung (Enter/Space) für den Heißluftballon-Brenner.
- Qualitätssicherung: GPT-5.5-Review-Schleife durchgeführt (Implementieren → Review → Patch), inklusive Fix für Timer-Stacking in Start/Stopp-Events.
- Ergebnis: Interaktionen sind robuster, besser screenreader-kompatibel und verhalten sich stabiler bei Maus-, Touch- und Tastatureingaben.

P2 Fortschritt (Run 2026-04-27 17:21):
- Thema **Statik & Hebel (drehundstatik)** im Diplomteil mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 15 Diplomfragen mit jeweils präzisem Feedback für richtige und typische falsche Antwort.
- Qualitätssicherung: Implementieren → Review (Vollständigkeitscheck aller Antworten) → Patch abgeschlossen.
- Ergebnis: Das Modul liefert nun durchgehend inhaltliche Korrekturhinweise statt stiller/freier Auswertung.

P2 Fortschritt (Run 2026-04-27 17:36):
- Thema **Akustik** bei den interaktiven Labs auf Accessibility und Stabilität verbessert.
- Abgedeckt: ARIA-Live/Status für dynamische Rückmeldungen (Stimmgabel, Vakuum, Gewitter, Echo, Resonanz), `aria-describedby`-Verknüpfungen für alle relevanten Slider sowie robuster Vakuum-Status über `data-vacuum-state` statt Text-Parsing.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inklusive Fix gegen doppelte `distRange`-Event-Listener nach Reset (`topicInit`).
- Ergebnis: Bessere Screenreader-Unterstützung, stabileres Verhalten bei wiederholter Initialisierung und weniger fehleranfällige Zustandslogik.

P2 Fortschritt (Run 2026-04-27 17:41):
- Themen **Optik 1 (Licht & Schatten)** und **Linsen/Spiegel** bei der Spalt-Beugung auf Accessibility und Re-Init-Stabilität verbessert.
- Abgedeckt: Live-Regionen (`role="status"`, `aria-live="polite"`) für Vorhersage-/Status-/Labortext, `aria-describedby` am Spaltbreiten-Slider und Schutz gegen doppelte `input`-Listener bei erneutem `topicInit`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit Cross-File-Review, dadurch gleicher Stabilitätsfix in beiden Optikmodulen umgesetzt.
- Ergebnis: Bessere Screenreader-Rückmeldungen und kein mehrfaches Triggern der Beugungsberechnung nach Neuinitialisierung.

P2 Fortschritt (Run 2026-04-27 17:56):
- Thema **Elektrizität** (Ohm-Labor) auf Accessibility und Screenreader-Rückmeldung verbessert.
- Abgedeckt: automatisches Nachrüsten von `ohmFeedback` (falls in Übersetzungen fehlend), Live-Regionen für Stromstärke/Feedback, `aria-describedby` für beide Slider, `aria-valuetext` für Volt/Ohm sowie `aria-label` für den Lampen-Helligkeitszustand.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inkl. Syntaxcheck (`node --check`).
- Ergebnis: Das Ohm-Labor liefert jetzt konsistente, vorlesbare Statusmeldungen in allen Sprachvarianten statt rein visueller Rückmeldung.

P2 Fortschritt (Run 2026-04-27 18:01):
- Thema **Optik 1 (Licht & Schatten)** inhaltlich mit diagnoseorientiertem Antwortfeedback vollständig nachgezogen.
- Abgedeckt: 5 Kapitel-Quizfragen + 15 Diplomfragen (insgesamt 40 Antwortoptionen) jeweils mit gezieltem Feedback für richtige und typische falsche Antworten.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inkl. Vollständigkeitscheck aller Antwortoptionen; dabei zusätzlich eine missverständliche Diplomfrage (`o1_d15`) inhaltlich präzisiert.
- Ergebnis: Optik 1 gibt jetzt bei jeder Auswahl konkrete Lernhinweise statt stillem/freiem Feedback.

P2 Fortschritt (Run 2026-04-27 18:28):
- Themen **Mechanische Arbeit**, **Farben** und **Physik-Rechenbeispiele** inhaltlich mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 18 Kapitel-Quizfragen mit insgesamt 36 Antwortoptionen, jeweils mit gezieltem Feedback für richtige und typische falsche Antworten.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inkl. Vollständigkeitscheck auf fehlende Feedbackfelder (`0/36` offen nach Patch).
- Ergebnis: Diese drei Physikmodule geben nun bei jeder Auswahl konkrete Lernhinweise statt stiller Auswertung.

P2 Fortschritt (Run 2026-04-27 18:54):
- Physik-Labore **Kraft und Bewegung**, **Energie**, **Statik & Hebel**, **Mechanische Arbeit** und **Farben** auf Screenreader-Rückmeldung verbessert.
- Abgedeckt: Live-Regionen für dynamische Laborfeedbacks, `aria-describedby`/`aria-valuetext` für zentrale Slider und `aria-pressed` für den Energie-Schalter.
- Stabilität: Wiederholtes `topicInit()` erzeugt bei **Statik & Hebel** keine gestapelten Daueranimationen mehr; beim Farben-Prisma wird der Slider-Listener nur einmal gebunden.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check` für alle betroffenen Topic-Skripte, `lang/de.json`-Parsecheck und `git diff --check`.
- Ergebnis: Mehr Physik-Interaktionen liefern ihren Zustand textlich aus und bleiben robuster bei erneuter Initialisierung.

P2 Fortschritt (Run 2026-04-27 19:22):
- Thema **Astronomie** bei den Interaktionen auf Accessibility und Stabilität verbessert.
- Abgedeckt: Live-Regionen (`role="status"`, `aria-live`) für dynamische Rückmeldungen (Planetenvergleich, Timer, Gravitation, Raketen-Tacho, Supernova), `aria-describedby`/`aria-valuetext` für die Slider (`zoomRange`, `tRange`) sowie `aria-pressed`-Status für den Supernova-Button.
- Stabilität: Timer wird bei erneutem Start/`topicInit()` sauber zurückgesetzt (kein Intervall-Stacking), `stopTimer()` ignoriert ungültige Stops ohne laufenden Versuch.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check js/topics/astronomie.js` und `git diff --check`.
- Ergebnis: Astronomie-Labore sind robuster bei Re-Init und liefern konsistentere, vorlesbare Zustandsrückmeldungen.

## Phase 2: Math

- Erst Mathematikthemen mit hohem Förderbedarf priorisieren: Brüche, Dezimalzahlen, Gleichungen, Prozent.
- Pro Thema: ein Mini-Ziel, ein Beispiel, ein geführter Versuch, ein schneller Check.
- Falschantworten nach typischen Fehlern erklären, nicht nur als falsch markieren.

P2-Math Fortschritt (Run 2026-04-27 18:34):
- Themen **math1_9_dezimalzahlen** und **math2_6_prop_prozent** mit diagnoseorientiertem Antwortfeedback nachgezogen.
- Abgedeckt: 6 Fragen mit insgesamt 14 Antwortoptionen.
- Qualitätssicherung: Implementieren → Review → Patch mit Vollständigkeitscheck (`0/14` fehlende Feedbackfelder).
- Ergebnis: Lernende erhalten nun bei typischen Rechenfehlern (Kommafehler, Prozentverwechslung, Proportionalität) direkte Korrekturhinweise.

P2-Math Fortschritt (Run 2026-04-27 18:58):
- Thema **math1_8_brueche** bei den interaktiven Bruchmodellen auf Tastatur- und Screenreader-Zugänglichkeit verbessert.
- Abgedeckt: Bruchstücke im visuellen Additions-/Subtraktionsmodell sind nun per Tab erreichbar, mit Enter/Leertaste auswählbar und melden ihren Auswahlzustand über `aria-pressed`.
- Ergänzt: Live-Regionen für Bruchaufgaben-, Zahlenstrahl- und Anteilsfeedback sowie `aria-valuetext` für den Zahlenstrahl-Slider.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check js/topics/math1_8_brueche.js` und `git diff --check`.
- Ergebnis: Ein priorisiertes Bruch-Labor ist nicht mehr nur mausbedienbar und gibt Rückmeldungen textlich aus.

P2 Fortschritt (Run 2026-04-27 18:59):
- Thema **SI-Einheiten** bei den interaktiven Labs auf Tastatur- und Screenreader-Unterstützung verbessert.
- Abgedeckt: Live-Regionen für Rückmeldetexte (Messung, Zuordnung, Umrechnung, Formelhilfe, Geschwindigkeits-/Graph-Feedback), `aria-describedby`/`aria-valuetext` für zentrale Slider (Zoom, Weg, Zeit) und `aria-pressed`-Status für Formelziel-Buttons.
- Stabilität: Formelziel-Buttons erhalten Enter/Leertaste-Unterstützung mit Guard gegen doppelte Listener bei erneutem `topicInit()`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inkl. Fix gegen zu häufige Live-Ansagen beim Timer-Display; abschließend `node --check js/topics/sieinheiten.js` und `git diff --check`.
- Ergebnis: Das Modul ist besser ohne Maus nutzbar und liefert konsistentere, vorlesbare Rückmeldungen ohne Screenreader-Spam.

P2 Fortschritt (Run 2026-04-27 19:03):
- Thema **Licht, Schatten & Astronomie** bei den Interaktionen auf Robustheit und Accessibility verbessert.
- Abgedeckt: Live-Regionen für Eclipse-/Orbit-Status, `aria-valuetext` für Schatten- und Mondpositions-Slider sowie `aria-pressed`-Status für Lampen-Toggle-Buttons.
- Stabilität: Bugfix in `updateShadow1()` – Strahl-`y2` wird nur noch gesetzt, wenn das jeweilige SVG-Element existiert (kein potenzieller Nullzugriff mehr).
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check js/topics/licht_schatten_astronomie.js` und `git diff --check`.
- Ergebnis: Das Modul liefert verlässlichere Rückmeldungen für assistive Technologien und ist robuster gegen partiell fehlende DOM-Elemente.

P2 Fortschritt (Run 2026-04-27 19:05):
- Physik-Labore **Mechanische Arbeit**, **Energie** und **Statik & Hebel** bei Live-Rückmeldung und Slider-/Button-Semantik weiter verbessert.
- Abgedeckt: `role="status"` + `aria-live` für dynamische Feedbacktexte, `aria-describedby`/`aria-valuetext` für zentrale Regler und `aria-pressed` beim Energie-Schalter.
- Stabilität: In **Statik & Hebel** werden Rotationsanimationen bei erneutem `topicInit()` nun sauber gecancelt statt gestapelt.
- Parallel (Math-Priorität): **Brüche**-Labor mit zusätzlichen Live-Regionen und zugänglicherem Slider-Feedback ergänzt.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check` für alle betroffenen Topic-Dateien, `lang/de.json`-Parsecheck und `git diff --check`.
- Ergebnis: Physik-Interaktionen sind robuster und für Screenreader klarer auswertbar; das priorisierte Brüche-Modul bleibt konsistent zugänglich.

P2-Math Fortschritt (Run 2026-04-27 19:26):
- Themen **math4_8_finanzmathematik**, **math1_3_add_sub** und **math1_2_nat_zahlen** mit diagnoseorientiertem Antwortfeedback ergänzt.
- Abgedeckt: 13 Antwortoptionen (inkl. Kredit-/Zins-Grundlagen sowie Diplom-Selbsteinschätzungen).
- Qualitätssicherung: Implementieren → Review → Patch mit JSON-Parsecheck und Vollständigkeitsaudit je Thema (`0` fehlende Feedbackfelder).
- Ergebnis: Diese drei Mathematikmodule geben nun bei jeder Antwort konkrete Lernhinweise statt stiller Auswertung.

## Phase 3: Other Subjects

- Digitale Grundbildung, Wetter, Klima und Klimawandel danach angleichen.
- Begriffe reduzieren, Beispiele lokalisieren, Leselast senken.
- Gemeinsame Qualitätskriterien für Sprache, Feedback, Accessibility und Interaktion dokumentieren.

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

P2 Fortschritt (Run 2026-04-27 19:42):
- Thema **Elektromagnetismus** bei den Interaktionen auf Accessibility und Re-Init-Stabilität verbessert.
- Abgedeckt: Live-Regionen für Status-/Messwerte (`materialText`, `directionText`, `relayStatus`, `transText`, `voltValSec`), `aria-describedby`/`aria-valuetext` für Strom- und Transformator-Slider sowie `aria-pressed`/`aria-label` für Relais- und Lampenzustand.
- Stabilität: Beim erneuten `topicInit()` wird ein laufender Taschenlampen-Drain-Timer sauber beendet und der Energiestatus konsistent auf 0 zurückgesetzt (kein Zombie-Intervall, kein veralteter UI-Stand).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/elektromagnetismus.js` und `git diff --check`.
- Ergebnis: Das Elektromagnetismus-Labor ist robuster bei wiederholter Initialisierung und liefert deutlich besser vorlesbare Zustandsrückmeldungen.

P2-Math Fortschritt (Run 2026-04-27 19:49):
- Thema **math1_4_mult_div** mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 6 Kapitel-Quizfragen mit 16 Antwortoptionen (Grundbegriffe, Division durch 0, Punkt-vor-Strich, Rechenausdruck).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck und Vollständigkeitsaudit (`0/16` fehlende Feedbackfelder).
- Ergebnis: Lernende erhalten bei typischen Fehlvorstellungen (Summanden/Differenz-Verwechslung, falsche Rechenreihenfolge) sofort konkrete Korrekturhinweise.

P2-Math Fortschritt (Run 2026-04-27 19:58):
- Thema **math1_1_vs_wissen** mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 5 Fragen mit insgesamt 12 Antwortoptionen (Kapitel + Diplom-Basics).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck und Vollständigkeitsaudit (`0/12` fehlende Feedbackfelder).
- Ergebnis: Auch im Einstiegsmodul erhalten Lernende jetzt bei jeder Auswahl eine kurze inhaltliche Rückmeldung statt stiller Punktevergabe.

P2-Math Fortschritt (Run 2026-04-27 20:03):
- Thema **math1_5_geo_grundbegriffe** mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 6 Fragen mit insgesamt 13 Antwortoptionen (Grundbegriffe: Strahl, Gerade, Strecke, parallel, normal, Punktbezeichnung).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck und Vollständigkeitsaudit (`0/13` fehlende Feedbackfelder).
- Ergebnis: Typische Verwechslungen (Gerade vs. Strahl, parallel vs. normal, Groß-/Kleinschreibung bei Punkten) werden jetzt direkt erklärt.

P2 Fortschritt (Run 2026-04-27 20:11):
- Thema **Linsen & Spiegel** bei mehreren Interaktionen auf Accessibility verbessert.
- Abgedeckt: Live-Regionen (`role="status"`, `aria-live`, `aria-atomic`) für dynamische Rückmeldungen in Brechung, Linsen, Spiegel, Mikroskop, Faseroptik und Auge; `aria-describedby` + `aria-valuetext` für zentrale Slider (`fiberAngle`, `microObjDist`, `microTubeDist`, `slitWidth`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/linsen_spiegel.js` und `git diff --check`.
- Ergebnis: Das Modul ist für Screenreader klarer nutzbar und kommuniziert den aktuellen Reglerzustand zuverlässiger.

P2-Math Fortschritt (Run 2026-04-27 20:13):
- Thema **math1_6_winkel** mit diagnoseorientiertem Antwortfeedback vervollständigt.
- Abgedeckt: 7 Fragen (5 Kapitel + 2 Diplom) mit insgesamt 15 Antwortoptionen.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck und Vollständigkeitsaudit (`0/15` fehlende Feedbackfelder).
- Ergebnis: Typische Verwechslungen (90° vs. 180°/360°, spitz vs. stumpf, Scheitelpunkt-Lage) werden jetzt direkt erklärt.

P2 Fortschritt (Run 2026-04-27 20:15):
- **Physik (SI-Einheiten)** und **Mathematik**-Module (**Brüche**, **Pythagoras**, **Körper**) in `lang/en.json` von Token-/Markup-Artefakten bereinigt.
- Abgedeckt: vier fehlerhafte Sektionen (`sieinheiten.sec0`, `math1_8_brueche.zaehler_nenner`, `math4_2_pythagoras.sec1`, `math4_6_koerper.sec1`) mit inhaltlicher Glättung und korrekten Quiz-Referenzen.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit Parsecheck (`en.json ok`) und Token-Audit (`0` verbleibende `TOKEN`-Artefakte).
- Ergebnis: Englische Lerninhalte sind wieder lesbar/stabil, ohne defekte Platzhalter im Frontend.

## Phase 3: Other Subjects

- Digitale Grundbildung, Wetter, Klima und Klimawandel danach angleichen.
- Begriffe reduzieren, Beispiele lokalisieren, Leselast senken.
- Gemeinsame Qualitätskriterien für Sprache, Feedback, Accessibility und Interaktion dokumentieren.

P2-Math Fortschritt (Run 2026-04-27 20:31):
- Themen **math1_4_mult_div** (Diplomteil) und **math1_10_groessen** vollständig mit diagnoseorientiertem Antwortfeedback ergänzt.
- Abgedeckt: 43 Antwortoptionen (31 in `math1_4_mult_div`, 12 in `math1_10_groessen`) mit gezielten Hinweisen für typische Fehler (z. B. Summe statt Produkt, Vorrangregeln, kg↔g und h↔min Umrechnung).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck (`de.json ok`), Vollständigkeitsaudit (`0` fehlende Feedbackfelder in beiden Themen) und `git diff --check`.
- Ergebnis: Beide Module liefern jetzt durchgehend inhaltliche Rückmeldungen statt stiller Punktevergabe.

P2-Math Fortschritt (Run 2026-04-27 21:03):
- Verbleibende Mathematik-Module mit fehlenden Antwortrückmeldungen vollständig nachgezogen: **math2_7_geometrie**, **math2_8_statistik**, **math1_11_figuren_koerper**, **math2_1_teilbarkeit**, **math2_4_relative_zahlen**, **math3_1/2/4/5/6/7/8/9/11**, **math4_1/2/4/5/6/7**.
- Abgedeckt: alle zuvor noch offenen Mathematik-Antwortoptionen (Audit vorher: 127 fehlende Feedbackfelder, Audit nachher: `ALL_CLEAR`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) je Chunk mit Parsecheck (`de.json ok`) und Konsistenzprüfung (`git diff --check`).
- Ergebnis: Mathematik ist nun flächendeckend auf diagnoseorientierte Antwortauswertung umgestellt; keine stillen Quiz-/Diplom-Antworten mehr.

P3 Fortschritt (Run 2026-04-27 21:12):
- Sprachdateien **ar.json**, **tr.json** und **uk.json** auf verbliebene Token-/Platzhalterartefakte bereinigt (`TOKEN_`-Fragmente in mehreren Themensektionen).
- Abgedeckt: Restartefakte in Physik/Mathematik/Nebenfächern entfernt (Audit nach Patch: `0` verbleibende `TOKEN_`-Treffer in allen drei Dateien).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit JSON-Parsecheck für alle geänderten Sprachdateien und `git diff --check`.
- Ergebnis: Frontend-Texte in AR/TR/UK sind konsistenter lesbar und enthalten keine sichtbaren Token-Reste mehr.

P3 Fortschritt (Run 2026-04-27 21:20):
- Internationale Qualitätslücke geschlossen: Fehlende `feedback`-Texte bei Antwortoptionen in **en/ar/sr/tr/uk** vollständig ergänzt (Fallback aus de-Referenzinhalt).
- Abgedeckt: je Sprachdatei `1068` fehlende Feedbackfelder nachgezogen; Audit nach Patch in allen Sprachdateien: `0` fehlende Antwort-Feedbacks.
- Qualitätssicherung: Implementieren → Review → Patch mit Vollständigkeitsaudit (`lang/*.json`), JSON-Parsecheck und konsistenter Strukturübernahme entlang identischer Antwortarrays.
- Ergebnis: Quiz- und Diplomauswertung liefert nun in allen unterstützten Sprachen durchgehend erklärende Rückmeldungen statt stummer Falsch/Richtig-Ausgabe.

P3 Fortschritt (Run 2026-04-27 21:24):
- Qualitätssicherung verstetigt: neues Audit-Skript `scripts/audit_quiz_feedback.js` ergänzt.
- Abgedeckt: automatischer Check aller `lang/*.json` auf fehlende `feedback`-Felder in Antwortarrays (Quiz + Diplom).
- Qualitätssicherung: Lauf des Skripts nach Einführung (`ALL_CLEAR`) sowie JSON-Parsecheck/`git diff --check`.
- Ergebnis: Künftige Regressionsfunde bei stillen Antworten sind schnell und reproduzierbar prüfbar.

P2 Fortschritt (Run 2026-04-27 21:31):
- Thema **Physik-Rechenbeispiele** bei den Eingabeaufgaben auf Accessibility und Diagnosefeedback verbessert.
- Abgedeckt: Live-Regionen für Aufgabenfeedback (`role="status"`, `aria-live`, `aria-atomic`), `aria-describedby` für alle Rechenfelder sowie Enter-Submit für tastaturfreundliche Bedienung.
- Didaktik: Falsche Eingaben liefern jetzt aufgabenspezifische Hinweise (z. B. h→s, g→kg, km→m, Formelwahl bei `v=s/t` und `s=v·t`) statt generischem Standardtext.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check js/topics/rechenbeispiele.js` und `git diff --check`.
- Ergebnis: Das Modul ist besser ohne Maus nutzbar und gibt bei Rechenfehlern konkretere Lernhinweise.

P2 Fortschritt (Run 2026-04-27 21:44):
- Thema **Mechanische Arbeit** bei der Schlitten-/Feder-Interaktion auf Re-Init-Stabilität und Bedien-Semantik verbessert.
- Abgedeckt: Schutz gegen Timer-/Animations-Stacking bei wiederholtem Start von `pullSled()` (Run-Token + Timeout-Cleanup + Animation-Cancel), plus `aria-pressed`/`aria-describedby` für den Feder-Button.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/arbeit.js` und Diff-Review.
- Ergebnis: Die Interaktion bleibt bei mehrfacher Ausführung stabil und vermittelt den Federzustand zuverlässiger für assistive Technologien.

P2-Math Fortschritt (Run 2026-04-27 21:52):
- Thema **math1_7_gleichungen** didaktisch-technisch gehärtet (Interaktions-Feedback + Accessibility).
- Abgedeckt: robuste Input-Validierung (`trim`, sichere Number-/String-Normalisierung), Live-Status für Ergebnisfelder (`role="status"`, `aria-live`, `aria-atomic`), `aria-describedby` an Eingabefeldern und Enter-Submit für beide Mini-Checks.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/math1_7_gleichungen.js` und Diff-Review.
- Ergebnis: Das Gleichungsmodul ist tastaturfreundlicher, screenreader-lesbar und reagiert stabiler auf unterschiedliche Eingabeformate.

P2 Fortschritt (Run 2026-04-27 21:57):
- Thema **Kraft und Bewegung** bei Vorhersage-Interaktionen auf Bedienbarkeit und Screenreader-Semantik verbessert.
- Abgedeckt: `aria-atomic` für dynamische Statusfelder, Tastatursteuerung (Enter/Leertaste) für alle `data-predict-*`-Auswahlfelder mit Guard gegen doppelte Listener bei erneutem `topicInit()`, sowie konsistentes `aria-pressed`-State-Management in `setPrediction()`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/kraft_und_bewegung.js` und `git diff --check`.
- Ergebnis: Die Vorhersage-Checks sind nun auch bei Nicht-Maus-Bedienung zuverlässig nutzbar und kommunizieren ihren Auswahlzustand korrekt an assistive Technologien.

P2 Fortschritt (Run 2026-04-27 22:01):
- Thema **Statik & Hebel (drehundstatik)** bei Vorhersage-Interaktionen auf Accessibility und Re-Init-Stabilität nachgezogen.
- Abgedeckt: `aria-atomic` für dynamische Statusfelder, Tastatursteuerung (Enter/Leertaste) für alle `data-predict-*`-Elemente, Listener-Guard gegen Doppelbindung bei erneutem `topicInit()` sowie `aria-pressed`-Synchronisierung in `setPrediction()`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/drehundstatik.js` und `git diff --check`.
- Ergebnis: Vorhersage-Checks sind jetzt konsistent per Tastatur bedienbar und geben ihren Auswahlzustand zuverlässig für assistive Technologien aus.

P2 Fortschritt (Run 2026-04-27 22:09):
- Thema **Mechanische Arbeit** bei Auswahl-Interaktionen weiter auf Screenreader-Semantik verbessert.
- Abgedeckt: `aria-atomic` für dynamische Statusfelder sowie `aria-pressed`/`aria-describedby`-Semantik für Auswahlgruppen (`data-work-case`, `data-lift-object`, `data-surface`, `data-ramp`) inklusive synchronisierter Zustandsupdates.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/arbeit.js` und `git diff --check`.
- Ergebnis: Auswahlzustände sind nun konsistent vorlesbar und nicht mehr nur visuell über `.selected` erkennbar.

P2 Fortschritt (Run 2026-04-27 22:14):
- Thema **Linsen & Spiegel** bei der Spalt-Vorhersage auf Tastaturbedienung und Zustands-Semantik nachgezogen.
- Abgedeckt: Fokusfähigkeit + Enter/Leertaste für `data-slit-prediction`, Guard gegen doppelte Keydown-Listener bei erneutem `topicInit()`, sowie `aria-pressed`-Synchronisierung in `predictSlit()`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/linsen_spiegel.js` und `git diff --check`.
- Ergebnis: Der Vorhersage-Check ist nun ohne Maus bedienbar und kommuniziert den gewählten Zustand zuverlässig an assistive Technologien.

P2 Fortschritt (Run 2026-04-27 22:18):
- Thema **Optik 1 (Licht & Schatten)** bei der Spalt-Vorhersage auf Tastaturbedienung und Screenreader-Semantik nachgezogen.
- Abgedeckt: Fokusfähigkeit + Enter/Leertaste für `data-slit-prediction`, Guard gegen doppelte Keydown-Listener bei erneutem `topicInit()`, `role="button"`, `aria-describedby` und konsistente `aria-pressed`-Initialisierung.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/optik1.js`, `node scripts/audit_quiz_feedback.js` und `git diff --check`.
- Ergebnis: Der Vorhersage-Check in Optik 1 ist jetzt robust ohne Maus nutzbar und meldet Auswahlzustände zuverlässig für assistive Technologien.

P2 Fortschritt (Run 2026-04-27 22:27):
- Physikmodule **Akustik**, **Astronomie**, **Elektromagnetismus**, **Energie**, **Farben** und **Wärmelehre** bei Live-Rückmeldungen auf Screenreader-Konsistenz verbessert.
- Abgedeckt: bestehende `role="status"`-Live-Regionen um `aria-atomic="true"` ergänzt, damit zusammenhängende Statusmeldungen vollständig statt fragmentiert vorgelesen werden.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) inkl. Nachpatch für versehentliche Variablenreferenz in der Review-Phase; Abschluss mit `node --check` für alle 6 Topic-Dateien und `git diff --check`.
- Ergebnis: Physik-Interaktionen geben Zustandsänderungen konsistenter und verständlicher an assistive Technologien aus.

P2-Math Fortschritt (Run 2026-04-27 22:31):
- Thema **math1_8_brueche** bei den Statusrückmeldungen (`vfrac-feedback`, `zstrahl-feedback`, `anteil-feedback`, `vfrac-task-text`) auf Screenreader-Konsistenz verbessert.
- Abgedeckt: bestehende Live-Regionen mit `aria-atomic="true"` ergänzt, damit Aufgaben- und Feedbacktexte vollständig vorgelesen werden.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/math1_8_brueche.js` und `git diff --check`.
- Ergebnis: Das priorisierte Brüche-Modul liefert bei dynamischen Updates klarere, weniger fragmentierte Audio-Rückmeldungen.

P2 Fortschritt (Run 2026-04-27 22:39):
- Themen **Linsen & Spiegel** und **Optik 1** bei den Spalt-Live-Rückmeldungen auf Screenreader-Konsistenz nachgezogen.
- Abgedeckt: In `ensureSlitA11y()` für `slitStatus`, `slitText` und `slitPredictionText` jeweils `aria-atomic="true"` ergänzt.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/linsen_spiegel.js js/topics/optik1.js`, Status/Atomic-Audit und `node scripts/audit_quiz_feedback.js` (`ALL_CLEAR`).
- Ergebnis: Beide Optikmodule lesen dynamische Statusupdates nun vollständig statt fragmentiert vor.

P3 Fortschritt (Run 2026-04-27 22:41):
- Fächerübergreifende Qualitätsbasis dokumentiert: neue Datei **`docs/QUALITY_CRITERIA.md`**.
- Abgedeckt: gemeinsame Kriterien für Sprache, Didaktik/Progression, diagnoseorientiertes Feedback, Accessibility-Standards, technische Mindestchecks und Definition-of-Done.
- Ergebnis: P3 hat jetzt eine konkrete, versionierte Referenz für konsistente Qualitätsarbeit über Physik/Mathematik/Nebenfächer hinweg.

P2 Fortschritt (Run 2026-04-27 22:50):
- Physikmodule **Akustik**, **Wärmelehre** und **Optik 1** bei Slider-Semantik auf Screenreader-Konsistenz nachgezogen.
- Abgedeckt: `aria-valuetext` für zentrale Regler (`distRange`, `freqRange`, `ampRange`, `resRange`, `tempRange`, `thermoRange`, `posRange1`, `reflectRange`, `slitWidth`) inklusive laufender Aktualisierung bei `input`/Berechnung.
- Qualitätssicherung: neue Regression-Absicherung per **`scripts/audit_physics_a11y.js`** (prüft u. a. `aria-live`+`aria-atomic`, Predictive-Keyboard-Semantik, Slider-`aria-valuetext`) plus `node --check` und `git diff --check`.
- Ergebnis: Physik-Interaktionen melden Reglerzustände nun konsistenter und vorlesbar; Accessibility-Regressions werden künftig automatisiert erkannt.

P3 Fortschritt (Run 2026-04-27 22:58):
- Nebenfächer **Klima** und **Klimawandel** auf Grund-Accessibility für Regler/Status nachgezogen.
- Abgedeckt: `aria-valuetext` + `aria-describedby` für `co2Range` und `yearRange`, Live-Semantik (`role="status"`, `aria-live`, `aria-atomic`) für dynamische Ausgaben (`tempVal`, `archiveText`, `yearLabel`, `dominoResult`) sowie Initial-Update in `topicInit()`.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check` auf beide Topic-Dateien und `git diff --check`.
- Ergebnis: Die Klima-Interaktionen liefern auch ohne visuelle Beobachtung verständlichere Zustandsmeldungen und konsistente Reglerausgaben.

P2-Math Fortschritt (Run 2026-04-27 22:46):
- Thema **math2_3_dezimalzahlen** technisch und didaktisch verbessert: Inline-`alert()`-Checks aus den Übungen durch zugängliche, seiteninterne Feedbackausgabe ersetzt.
- Abgedeckt: drei Interaktionsaufgaben (`geld_input`, `rund_input`, `komma_input`) mit Enter-Submit, robustem Komma-Parsing und Live-Feedback (`role="status"`, `aria-live`, `aria-atomic`) inkl. `aria-describedby`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/math2_3_dezimalzahlen.js` und `git diff --check`.
- Ergebnis: Dezimalzahlen-Übungen sind ohne störende Popups nutzbar, tastaturfreundlicher und für Screenreader konsistenter.

P2-Math Fortschritt (Run 2026-04-27 22:49):
- Thema **math2_1_teilbarkeit** didaktisch und barrierearm gehärtet: bestehende Inline-`alert()`-Interaktionen zur Teilbarkeit/ggT/kgV werden nun durch in-seitige Feedbackfelder ersetzt.
- Abgedeckt: Divisibility-Check ohne Eingabe + zwei Zahlenaufgaben (`ggt_input`, `kgv_input`) mit Enter-Submit, robustem Zahlen-Parsing, Live-Semantik (`role="status"`, `aria-live`, `aria-atomic`) und `aria-describedby`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check js/topics/math2_1_teilbarkeit.js`, `node scripts/audit_quiz_feedback.js` (`ALL_CLEAR`) und `git diff --check`.
- Ergebnis: Übungen liefern jetzt ruhige, nachvollziehbare Lernrückmeldungen statt modaler Popups; Tastatur- und Screenreader-Nutzung ist konsistenter.

P3 Fortschritt (Run 2026-04-27 22:49):
- Neues Audit-Skript **`scripts/audit_inline_alerts.js`** ergänzt.
- Abgedeckt: automatischer Check aller `lang/*.json` auf verbliebene Inline-`alert()`-Handler in HTML-Content als technische Schuldenliste für die nächste Bereinigungsrunde.
- Ergebnis: Restlücken bei Popup-basierten Übungen sind nun messbar und priorisierbar (aktuell konzentriert auf wenige Mathematikmodule).

P2-Math Fortschritt (Run 2026-04-27 23:xx):
- Verbleibende Popup-Reste in **math2_1_teilbarkeit**, **math4_6_koerper** und **math4_8_finanzmathematik** entfernt (alle Sprachdateien `de/en/ar/sr/tr/uk`).
- Abgedeckt: Inline-`onclick='alert(...)'` aus den betroffenen Content-Blöcken entfernt und durch JS-gebundene, seiteninterne Feedbacklogik ersetzt.
- Technik: `math4_6_koerper.js` und `math4_8_finanzmathematik.js` um zugängliche Feedbackfelder (`role="status"`, `aria-live`, `aria-atomic`), `aria-describedby` und Enter-Submit ergänzt; `math2_1_teilbarkeit.js` auf handler-basierte Button-Bindung ohne Inline-Event angepasst.
- Qualitätssicherung: `node scripts/audit_inline_alerts.js` (`ALL_CLEAR`), `node scripts/audit_quiz_feedback.js` (`ALL_CLEAR`), `node scripts/audit_physics_a11y.js` (`PHYSICS_A11Y_CLEAR`), `node --check` für alle betroffenen Topic-Dateien und `git diff --check`.
- Ergebnis: Keine verbliebenen Inline-`alert()`-Handler mehr in den priorisierten Mathe-Modulen; Rückmeldungen sind ruhiger, tastaturfreundlicher und screenreader-konsistent.

P3 Fortschritt (Run 2026-04-27 23:10):
- Nebenfächer-Qualitätssicherung erweitert: neues Audit-Skript **`scripts/audit_remaining_subjects_a11y.js`** ergänzt.
- Abgedeckt: automatischer Basischeck für **DGB5, Wetter, Klima, Klimawandel** auf Live-Region-Konsistenz (`aria-live` + `aria-atomic`) sowie Slider-Semantik (`aria-describedby`, `aria-valuetext`).
- Qualitätssicherung: Lauf des neuen Audits (`REMAINING_SUBJECTS_A11Y_CLEAR`) und Dokumentations-Update in **`docs/QUALITY_CRITERIA.md`** als verpflichtender Mindestcheck.
- Ergebnis: Accessibility-Regressions in den verbleibenden Nebenfächern sind jetzt früh und reproduzierbar prüfbar.

P2-Math Fortschritt (Run 2026-04-27 23:30):
- Inline-`alert()`-Rückmeldungen in weiteren Mathematikübungen durch zugängliche Status-Rückmeldungen ersetzt.
- Abgedeckt: **math2_2_brueche**, **math2_8_statistik** und **math4_5_aehnlichkeit** mit JS-gebundenem Feedback, Enter-Submit und Live-Semantik; außerdem verbliebene Alert-Attribute in allen Sprachdateien entfernt.
- Qualitätssicherung: `scripts/audit_inline_alerts.js` robuster gemacht und danach `ALL_CLEAR`; zusätzlich Syntaxchecks, JSON-Parsecheck, `node scripts/audit_quiz_feedback.js` und `git diff --check`.
- Ergebnis: Die betroffenen Mathe-Checks bleiben im Lernfluss, vermeiden Popups und sind besser für Tastatur- und Screenreader-Nutzung geeignet.

P2-Math Fortschritt (Run 2026-04-27 23:34):
- Mathe-Accessibility-Regressionstest ergänzt: neues Audit-Skript **`scripts/audit_math_a11y.js`** eingeführt.
- Abgedeckt: automatischer Basischeck für alle `js/topics/math*.js` auf verbliebene `alert()`-Nutzung, Live-Region-Konsistenz (`aria-live` + `aria-atomic`), Predictive-Keyboard-Semantik (`data-predict-*` + Enter/Space + `aria-pressed`) und Slider-Rückmeldung (`aria-valuetext`).
- Qualitätssicherung: Ausführung des neuen Audits (`MATH_A11Y_CLEAR`) sowie Dokumentations-Update in **`docs/QUALITY_CRITERIA.md`** als verpflichtender Mindestcheck.
- Ergebnis: Mathe-Interaktionen sind jetzt wie Physik/Nebenfächer automatisiert gegen zentrale A11y-Regressionsmuster abgesichert.

P1/P2 Fortschritt (Run 2026-04-27 23:46):
- QA-Gate für den Perfektion-Backlog vereinheitlicht: neues Skript **`scripts/run_quality_gate.sh`** ergänzt.
- Abgedeckt: Sammellauf für `audit_quiz_feedback`, `audit_physics_a11y`, `audit_math_a11y`, `audit_remaining_subjects_a11y`, `audit_inline_alerts` plus `git diff --check`.
- Doku nachgezogen: **`docs/QUALITY_CRITERIA.md`** nennt Physik-Audit und Inline-Alert-Audit jetzt explizit in den Mindestchecks und verweist auf den Sammellauf.
- Ergebnis: Der Implementieren→Review→Patch-Loop für künftige Chunks ist reproduzierbarer, schneller und regressionssicherer über Physik/Mathe/Nebenfächer.

P1/P2 Fortschritt (Run 2026-04-27 23:58):
- Physik-Regressionstest **`scripts/audit_physics_a11y.js`** auf verbleibende QA-Lücken gehärtet.
- Abgedeckt: zusätzlicher Check auf `alert()`-Reste, erweiterte Live-Region-Prüfung (`aria-live` + `aria-atomic` + `role="status"`) sowie Slider-Basissemantik inklusive `aria-describedby` neben `aria-valuetext`.
- Qualitätssicherung: Implementieren → Review → Patch mit erneutem Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Perfection ist robuster gegen künftige A11y-Regressionen; stille Rückfälle bei Popup-Feedback oder unvollständiger Live-/Slider-Semantik werden jetzt früher erkannt.

P2-Math Fortschritt (Run 2026-04-28 00:03):
- Mathe-Regressionstest **`scripts/audit_math_a11y.js`** analog zur Physik-Qualitätsschiene gehärtet.
- Abgedeckt: ergänzter Check auf vollständige Live-Region-Semantik (`aria-live` + `aria-atomic` + `role="status"`) sowie Slider-Basissemantik (`aria-describedby` zusätzlich zu `aria-valuetext`).
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_math_a11y.js` und anschließendem Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathematik-Perfection ist belastbarer gegen A11y-Rückfälle; unvollständige Status-/Slider-Semantik wird künftig automatisiert früher erkannt.

P1/P2/P3 Fortschritt (Run 2026-04-28 00:12):
- QA-Gate gegen Syntax-Regressions erweitert: neues Skript **`scripts/audit_topic_syntax.js`** ergänzt.
- Abgedeckt: automatischer `node --check`-Lauf über alle `js/topics/*.js`-Module statt nur punktueller Datei-Syntaxchecks.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_topic_syntax.js` und anschließendem Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Doku nachgezogen: **`docs/QUALITY_CRITERIA.md`** führt den neuen Mindestcheck explizit.
- Ergebnis: Physik-/Mathe-/Nebenfächer-Perfection ist robuster gegen versehentliche Syntaxfehler in Themenmodulen.

P3 Fortschritt (Run 2026-04-28 00:17):
- Nebenfächer-Audit **`scripts/audit_remaining_subjects_a11y.js`** auf zentrale Regressionen gehärtet.
- Abgedeckt: zusätzlicher Check auf verbliebene `alert()`-Nutzung sowie vollständige Live-Region-Semantik (`aria-live` + `aria-atomic` + `role="status"`).
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_remaining_subjects_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Nebenfächer melden Accessibility-/Feedback-Rückfälle jetzt früher und konsistenter im gleichen Qualitätsniveau wie Physik/Mathe.

P1/P2 Fortschritt (Run 2026-04-28 00:22):
- Physik-Audit **`scripts/audit_physics_a11y.js`** um weitere Interaktionsmuster erweitert (`data-work-case`, `data-lift-object`, `data-surface`, `data-ramp`, `data-slit-prediction`, `data-formula-target`).
- Abgedeckt: automatischer Check, dass nicht nur Vorhersage-Controls, sondern auch weitere klickbare Auswahlgruppen Keyboard-Aktivierung (Enter/Leertaste) und `aria-pressed`-Semantik behalten.
- Patch aus Review-Schleife: im Modul **`js/topics/arbeit.js`** Auswahlgruppen systematisch mit `role="button"`, `tabindex="0"` und deduplizierter Enter/Leertaste-Aktivierung nachgerüstet.
- Qualitätssicherung: `node --check js/topics/arbeit.js`, `node scripts/audit_physics_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Die Arbeit-Interaktionen sind jetzt robust per Tastatur bedienbar und Physik-Regressionen bei nicht-mausbedienbaren Auswahlfeldern werden künftig automatisch erkannt.

P1/P2 Fortschritt (Run 2026-04-28 00:26):
- Physik-Audit **`scripts/audit_physics_a11y.js`** auf robustere Keyboard-Semantik-Prüfung nachgeschärft.
- Abgedeckt: Interaktions-Checks verlangen jetzt explizit Enter- und Leertaste-Handling plus `aria-pressed`; zusätzlich wird für klickbare Nicht-Button-Muster (`data-*`) auch `role="button"` + `tabindex="0"` als Mindestsemantik geprüft.
- Qualitätssicherung: Implementieren → Review → Patch (False-Positive-Fix bei alternativen Key-Syntaxen wie `['Enter',' ']`/`event.code==='Space'`), danach `node scripts/audit_physics_a11y.js` (`PHYSICS_A11Y_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Regressionen bei halb implementierter Tastaturbedienung werden früher erkannt; der Audit ist strenger, aber weiterhin stabil gegen legitime Implementierungsvarianten.

P2-Math Fortschritt (Run 2026-04-28 00:27):
- Mathe-Audit **`scripts/audit_math_a11y.js`** auf dieselbe robuste Keyboard-Semantik wie Physik gehärtet.
- Abgedeckt: Predictive-Controls prüfen jetzt explizit auf `keydown` + Enter/Leertaste + `aria-pressed`; zusätzlich wird bei nicht-nativen Controls `role="button"` + `tabindex="0"` als Mindestsemantik erzwungen.
- Qualitätssicherung: Implementieren → Review → Patch (inkl. toleranter Erkennung für unterschiedliche Key-Syntaxen), danach `node scripts/audit_math_a11y.js` (`MATH_A11Y_CLEAR`).
- Ergebnis: Mathe-Regressionen bei unvollständiger Tastaturbedienung werden früher und konsistenter erkannt.

P1/P2 Fortschritt (Run 2026-04-28 00:36):
- Physik-Audit **`scripts/audit_physics_a11y.js`** auf dynamische Themenabdeckung umgestellt.
- Abgedeckt: Physikthemen werden jetzt automatisch aus `js/topics/*.js` abgeleitet (mit Ausschluss von Mathe/Nebenfächern) statt starrer Hardcode-Liste; zusätzlich Guard gegen leere Topic-Erkennung.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check scripts/audit_physics_a11y.js`, `node scripts/audit_physics_a11y.js` (`PHYSICS_A11Y_CLEAR (15 topics)`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Neue Physikmodule fallen künftig automatisch unter den A11y-Regressionstest, ohne dass die Audit-Liste manuell nachgeführt werden muss.

P2-Math Fortschritt (Run 2026-04-28 00:46):
- Thema **math2_7_geometrie** (Prisma-Explorer) auf Tastatur- und Screenreader-Semantik verbessert.
- Abgedeckt: `data-prism-view`-Steuerung mit Enter/Leertaste, `role="button"`, `tabindex="0"`, `aria-pressed`-Synchronisierung und Guard gegen doppelte Event-Bindung bei erneutem `topicInit()`.
- Ergänzt: `prismFeedback` als Live-Region (`role="status"`, `aria-live`, `aria-atomic`) für konsistente Rückmeldungen ohne rein visuelle Abhängigkeit.
- Regression-Schutz: **`scripts/audit_math_a11y.js`** prüft interaktive Mathe-Steuerungen jetzt nicht nur für `data-predict-*`, sondern auch für `data-prism-view` auf Keyboard-/Semantik-Mindeststandard.
- Qualitätssicherung: `node --check js/topics/math2_7_geometrie.js`, `node --check scripts/audit_math_a11y.js`, `node scripts/audit_math_a11y.js` (`MATH_A11Y_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Der Prisma-Explorer ist robust ohne Maus bedienbar; die neue Audit-Abdeckung verhindert Rückfälle bei ähnlichen Mathe-Interaktionen.

P1/P2 Fortschritt (Run 2026-04-28 00:56):
- Physik-/Mathe-Audits auf Semantik-Konsistenz weiter gehärtet.
- Abgedeckt (Physik): **`scripts/audit_physics_a11y.js`** prüft jetzt zusätzlich den Regression-Fall `aria-atomic` ohne `aria-live` (`atomic_without_live`) und erkennt Vorhersage-Attribute expliziter (`data-predict-group`, `data-predict-value`) statt nur indirekt.
- Abgedeckt (Mathe): **`scripts/audit_math_a11y.js`** erhielt denselben `atomic_without_live`-Check und einen Guard für leere Topic-Erkennung (`no_math_topics_detected`).
- Qualitätssicherung: `node scripts/audit_physics_a11y.js`, `node scripts/audit_math_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Die QA-Schiene erkennt inkonsistente Live-Region-Semantik früher und bleibt auch bei Strukturänderungen der Topic-Landschaft robust.

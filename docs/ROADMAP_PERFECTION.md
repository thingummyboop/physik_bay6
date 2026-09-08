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

P2 Fortschritt (Run 2026-04-28 03:06):
- Thema **Optik (englische Inhalte)** sprachlich überarbeitet, um verbleibende Mischsprache/Fehlübersetzungen in zentralen Physik-Abschnitten zu entfernen.
- Abgedeckt: Auge (Near/Far, klare Merkhilfe), Linsen (Begriffe + Merksatz), Beugung (Labortitel), Mikroskop (Objective/Eyepiece/Fokus-Texte), Teleskop (secondary mirror) inkl. Korrektur betroffener Feedbacktexte.
- Qualitätssicherung: Implementieren → Review → Patch mit `JSON.parse(lang/en.json)`, `node scripts/audit_physics_language.js`, `node scripts/audit_physics_a11y.js` und `git diff --check`.
- Ergebnis: Physik-Optik ist in EN deutlich konsistenter, fachsprachlich sauberer und für Lernende verständlicher.

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

P3 Fortschritt (Run 2026-04-28 01:02):
- Nebenfächer-Audit **`scripts/audit_remaining_subjects_a11y.js`** auf Live-Region-Semantik weiter gehärtet.
- Abgedeckt: zusätzlicher Regression-Check `atomic_without_live` (erkennt `aria-atomic` ohne `aria-live`) analog zur Physik-/Mathe-Qualitätsschiene.
- Qualitätssicherung: `node scripts/audit_remaining_subjects_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Auch in Nebenfächern werden inkonsistente Live-Region-Attribute jetzt früher und einheitlich als QA-Fehler erkannt.

P1/P2 Fortschritt (Run 2026-04-28 01:14):
- Physik-Audit **`scripts/audit_physics_a11y.js`** bei Keyboard-Semantik robuster gemacht (weniger False-Greens bei Enter/Leertaste).
- Abgedeckt: Erkennung für Enter/Space/Spacebar in unterschiedlichen Implementierungsstilen erweitert (Vergleich mit `===`/`!==`, unterschiedliche Event-Variablennamen, Array-/`includes`-Muster).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit Zwischenfund in `sieinheiten` durch zu enge Regex-Variante; nach Patch `node scripts/audit_physics_a11y.js` (`PHYSICS_A11Y_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Der Physik-Regressionstest erkennt unvollständige Tastaturbedienung zuverlässiger und bleibt gleichzeitig kompatibel mit legitimen Codevarianten in bestehenden Modulen.

P2-Math Fortschritt (Run 2026-04-28 01:18):
- Mathe-Audit **`scripts/audit_math_a11y.js`** auf dieselbe robuste Keyboard-Mustererkennung wie Physik angehoben.
- Abgedeckt: Enter/Leertaste-Erkennung für verschiedene Event-Variablennamen und Vergleichsstile (`===`/`!==`) sowie Array-/`includes`-Varianten nachgezogen.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node scripts/audit_math_a11y.js` (`MATH_A11Y_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-Regressionstests vermeiden künftig False-Greens bei Keyboard-Semantik und bleiben robuster gegen unterschiedliche, aber korrekte Implementierungsstile.

P1/P2 Fortschritt (Run 2026-04-28 01:26):
- Physik-Audit **`scripts/audit_physics_a11y.js`** um einen zusätzlichen Slider-Guard erweitert.
- Abgedeckt: Neben den bisherigen Checks auf `aria-valuetext`/`aria-describedby` prüft der Audit jetzt zusätzlich, ob bei erkannten Range-Interaktionen auch eine explizite `setAttribute("aria-valuetext", ...)`-Zuweisung im Topic-Skript vorhanden ist.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node scripts/audit_physics_a11y.js` (`PHYSICS_A11Y_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Regressionen bei nur statisch gesetzter Slider-Semantik werden früher sichtbar; der Audit bleibt trotz strengerem Check stabil ohne neue False-Positives.

P1/P2/P3 Fortschritt (Run 2026-04-28 01:34):
- Sichtbarer Tastaturfokus für nicht-native Interaktions-Controls vereinheitlicht: **`css/style.css`** erweitert um `:focus-visible` für `[role="button"][tabindex]`.
- Abgedeckt: alle per JS nachgerüsteten klickbaren Div/Span-Controls in Physik/Mathe/Nebenfächern bekommen nun denselben klaren Fokusindikator wie native Buttons.
- Qualitätsgate nachgezogen: **`scripts/audit_math_a11y.js`** und **`scripts/audit_remaining_subjects_a11y.js`** um Slider-Guard auf explizite `setAttribute("aria-valuetext", ...)`-Zuweisung erweitert; Ausgabe jetzt mit Topic-Anzahl (`MATH_A11Y_CLEAR (38 topics)`, `REMAINING_SUBJECTS_A11Y_CLEAR (4 topics)`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit Einzelläufen der Audits und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: stärkere Regressionserkennung für dynamische Slider-Semantik plus konsistentere Keyboard-Nutzbarkeit über alle priorisierten Fächer.

P1/P2 Fortschritt (Run 2026-04-28 01:36):
- Physik- und Mathe-Audits bei Keyboard-Semantik weiter gehärtet: **`scripts/audit_physics_a11y.js`** und **`scripts/audit_math_a11y.js`** prüfen interaktive Controls jetzt zusätzlich auf echte Keyboard-Aktivierungslogik im `keydown`-Pfad (Click-Trigger **oder** `preventDefault()`-basiertes Handling), statt nur auf das bloße Vorkommen von `keydown`.
- Abgedeckt: `interactive_controls_incomplete_a11y` meldet nun explizit `keyboardActivation` im Diagnose-Detail und reduziert damit False-Greens bei unvollständiger Enter/Leertaste-Implementierung.
- Qualitätssicherung: Implementieren → Review → Patch mit Einzelläufen `node scripts/audit_physics_a11y.js`, `node scripts/audit_math_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: robustere Regressionserkennung für tatsächliche Tastaturbedienbarkeit in priorisierten Physik-/Mathe-Interaktionen.

P3 Fortschritt (Run 2026-04-28 01:37):
- Nebenfächer-Audit **`scripts/audit_remaining_subjects_a11y.js`** von statischer auf automatische Topic-Erkennung umgestellt.
- Abgedeckt: verbleibende Fächer werden jetzt direkt aus `js/topics/*.js` über Namensmuster (`dgb*`, `wetter`, `klima`, `klimawandel`) ermittelt statt per fixer Liste.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_remaining_subjects_a11y.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: neue Nebenfach-Module in diesem Scope fallen künftig ohne manuelle Skriptpflege automatisch unter den A11y-Regressionscheck.

P1/P2 Fortschritt (Run 2026-04-28 01:50):
- Physik-Sprachqualität im Quiz-/Diplom-Feedback weiter gehärtet.
- Abgedeckt: In **`lang/de.json`** ein überlanger Energie-Feedbacktext auf A2-B1-Niveau gekürzt und sprachlich vereinfacht (gleiche Fachaussage, geringere Leselast).
- Regression-Schutz ergänzt: neues Audit **`scripts/audit_physics_language.js`** prüft in allen Physikthemen automatisch, dass Feedbacktexte kompakt bleiben (Schwellwert: 180 Zeichen).
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_physics_language.js` sowie Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Perfection deckt jetzt neben A11y und Vollständigkeit auch die Verständlichkeitslänge der Diagnose-Feedbacks automatisiert ab.

P1 Fortschritt (Run 2026-04-28 01:56):
- Weitere Physik-Feedbacktexte in **`lang/de.json`** auf klare A2-B1-Sprache geglättet (Arbeit, Elektromagnetismus, Linsen/Spiegel).
- Abgedeckt: 5 Rückmeldungen mit unnötig verschachtelter Formulierung oder hoher Leselast auf kürzere, direkte Korrekturhinweise umgestellt.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_physics_language.js` und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Diagnosefeedback bleibt fachlich korrekt, ist aber schneller erfassbar und lernfreundlicher formuliert.

P1 Fortschritt (Run 2026-04-28 02:0x):
- Physik-Sprachfeinschliff in **`lang/de.json`** für die längsten Diagnose-Feedbacks fortgesetzt (Arbeit, Energie, Akustik, Astronomie, Linsen/Spiegel).
- Abgedeckt: 16 Rückmeldungen auf kürzere, direktere A2-B1-Formulierungen umgestellt; dabei auch ein fehlerhaftes Zitatmuster in einer Arbeit-Diplomrückmeldung bereinigt.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit Top-Längenreview und anschließendem Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-Feedback ist konsistenter, leichter erfassbar und frei von auffälligen Formulierungsartefakten.

P2-Math Fortschritt (Run 2026-04-28 02:1x):
- Mathe-Perfection um einen fehlenden Sprach-Regressionstest ergänzt: neues Audit **`scripts/audit_math_language.js`**.
- Abgedeckt: automatischer Check aller Mathe-Themen auf kompakte Diagnose-Feedbacks (`answers[].feedback`, Schwellwert 180 Zeichen), analog zur Physik-Qualitätsschiene.
- Gate/DoD nachgezogen: **`scripts/run_quality_gate.sh`** auf 9-stufigen Sammellauf erweitert und **`docs/QUALITY_CRITERIA.md`** um den verpflichtenden Mathe-Sprachcheck ergänzt.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node scripts/audit_math_language.js` (`MATH_LANGUAGE_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathematik-Feedback ist jetzt ebenfalls automatisiert gegen Leselast-Regressionen abgesichert, nicht nur gegen A11y-/Syntaxfehler.

P3 Fortschritt (Run 2026-04-28 02:16):
- Nebenfächer-Perfection um einen fehlenden Sprach-Regressionstest ergänzt: neues Audit **`scripts/audit_remaining_subjects_language.js`**.
- Abgedeckt: automatischer Check für DGB/Wetter/Klima-Themen auf kompakte Diagnose-Feedbacks (`answers[].feedback`, Schwellwert 180 Zeichen) über alle Sprachdateien.
- Gate/DoD nachgezogen: **`scripts/run_quality_gate.sh`** auf 10-stufigen Sammellauf erweitert und **`docs/QUALITY_CRITERIA.md`** um den verpflichtenden Nebenfächer-Sprachcheck ergänzt.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node scripts/audit_remaining_subjects_language.js` (`REMAINING_SUBJECTS_LANGUAGE_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Nebenfächer sind jetzt wie Physik/Mathematik auch gegen Leselast-Regressionen im Feedback automatisiert abgesichert.

P1 Fortschritt (Run 2026-04-28 02:22):
- Physik-Sprachaudit **`scripts/audit_physics_language.js`** von starrer Topic-Heuristik auf dynamische Topic-Erkennung umgestellt.
- Abgedeckt: Physik-Language-Check leitet die gültigen Topic-Keys jetzt direkt aus `js/topics/*.js` ab (Ausschluss von `math*` und Nebenfächern), inkl. Guard gegen leere Physik-Erkennung.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node --check scripts/audit_physics_language.js`, `node scripts/audit_physics_language.js` (`PHYSICS_LANGUAGE_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: neue Physikmodule werden ohne manuelle Regex-Pflege automatisch im Sprach-Regressionstest erfasst; die Perfection-Schiene bleibt robuster gegen Scope-Drift.

P1/P2/P3 Fortschritt (Run 2026-04-28 02:26):
- Sprach-Audits für **Physik/Mathe/Nebenfächer** um Topic-Coverage-Guards ergänzt: `scripts/audit_physics_language.js`, `scripts/audit_math_language.js`, `scripts/audit_remaining_subjects_language.js`.
- Abgedeckt: dynamische Topic-Erkennung aus `js/topics/*.js`, Auditing nur für in `de.json` vorhandene Topic-Keys, neue Fehlerklassen `missing_topic_key` und `topic_has_no_feedback_entries` sowie vereinheitlichte Issue-Ausgabe mit Reason-Codes.
- Review/Patch aus Schleife: False-Positive bei `licht_schatten_astronomie` durch fehlenden Sprachblock abgefangen, indem nur auditable Topic-Keys (mit Sprachinhalt) als harte Pflicht gelten.
- Qualitätssicherung: `node --check` + Einzelläufe aller drei Language-Audits sowie Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Regressionstests prüfen jetzt nicht nur Feedbacklänge, sondern auch strukturierte Sprachabdeckung pro Thema und Sprache; Scope-Drift wird früher erkannt.

P1 Fortschritt (Run 2026-04-28 02:36):
- Physik-Sprachqualität im Audit weiter gehärtet: **`scripts/audit_physics_language.js`** erkennt nun auch generische Ein-Wort-Feedbacks (z. B. nur „richtig/falsch“) als Regression (`feedback_too_generic`).
- Abgedeckt: Normalisierung für verschiedene Sprach-/Schreibvarianten (inkl. diakritischer Zeichen), damit Platzhalterfeedback robust erkannt wird.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check scripts/audit_physics_language.js`, `node scripts/audit_physics_language.js` (`PHYSICS_LANGUAGE_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Doku nachgezogen: **`docs/QUALITY_CRITERIA.md`** ergänzt um Verbot generischer Platzhalterantworten ohne Erklärung.
- Ergebnis: Physik-Perfection schützt jetzt nicht nur gegen zu lange, sondern auch gegen inhaltsarme Diagnose-Feedbacks.

P2-Math Fortschritt (Run 2026-04-28 02:44):
- Mathe-Sprachaudit **`scripts/audit_math_language.js`** analog erweitert: generische Ein-Wort-Feedbacks werden jetzt als Regression (`feedback_too_generic`) markiert.
- Review/Patch aus Schleife: Audit fand 18 Altfälle in `math1_1_vs_wissen` (alle Sprachen mit nur „Richtig.“); diese Rückmeldungen wurden auf kurze inhaltliche Bestätigungen nachgezogen.
- Qualitätssicherung: `node --check scripts/audit_math_language.js`, `node scripts/audit_math_language.js` (`MATH_LANGUAGE_CLEAR`) und Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-Perfection verhindert nun ebenfalls inhaltsarme Platzhalterrückmeldungen bei korrekten Antworten.

P1 Fortschritt (Run 2026-04-28 02:5x):
- Physik-Sprachfeinschliff in **`lang/de.json`** für verbliebene sehr kurze Diagnose-Feedbacks fortgesetzt (Akustik, Arbeit, Energie, SI-Einheiten).
- Abgedeckt: 8 knappe Rückmeldungen (u. a. „Richtig: Resonanz.“ / „Richtig: In Joule (J).“) auf klarere A2-B1-Sätze mit kurzer Begründung umgestellt.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_physics_language.js` (`PHYSICS_LANGUAGE_CLEAR`) plus Längen-Spotcheck der kürzesten Physik-Feedbacks.
- Ergebnis: Physik-Feedback bleibt kurz, ist aber inhaltlich erklärender und didaktisch konsistenter.

P2-Math Fortschritt (Run 2026-04-28 03:0x):
- Mathe-Sprachfeinschliff in **`lang/de.json`** für die letzten sehr kurzen Diagnose-Feedbacks ausgebaut (`math1_4_mult_div`).
- Abgedeckt: 2 knappe Rückmeldungen auf klarere, lernfreundliche A2-B1-Formulierungen umgestellt („15 mal 4 ergibt 60“, „144 geteilt durch 12 ist 12“).
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_math_language.js` und anschließendem Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathematik-Feedback bleibt kompakt, aber in der Formulierung konsistenter und leichter vorlesbar.

P2-Math Fortschritt (Run 2026-04-28 03:06):
- Thema **math2_6_prop_prozent** im EN-Text auf verbleibende Mischsprache geprüft und zentrale Feedbacktexte vollständig auf Englisch vereinheitlicht.
- Abgedeckt: Proportionalitäts- und Rabatt-Feedback im Kapitelquiz sowie 2 Diplom-Feedbacks (inkl. 100%-Grundverständnis).
- Qualitätssicherung: Implementieren → Review → Patch mit `JSON.parse(lang/en.json)`, `node scripts/audit_math_language.js`, `node scripts/audit_math_a11y.js` und `git diff --check`.
- Ergebnis: Prozent/Proportionalität ist im EN-Modul konsistenter und didaktisch klarer formuliert.

P1 Fortschritt (Run 2026-04-28 03:2x):
- Thema **Elektrizität** (EN-Inhalte) auf verbleibende Mischsprache im Antwort-Feedback geprüft und vollständig auf Englisch vereinheitlicht.
- Abgedeckt: 23 diagnoseorientierte Feedbacktexte in Kapitel-Quizblöcken (Ladungen, Leiter/Isolator, Stromkreis, Batterie, Kondensator, Ohm-Zusammenhang).
- Qualitätssicherung: Implementieren → Review → Patch mit Spotcheck auf verbleibende DE-Feedbackmarker im Modul, anschließend `node scripts/audit_physics_language.js` und `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Das Elektrizitätsmodul ist im EN-Feedback jetzt konsistent englisch, fachlich klar und regressionsfrei im Gesamt-Qualitätsgate.

P1 Fortschritt (Run 2026-04-28 03:4x):
- Physik-Perfection um einen neuen Regressionstest für EN-Mischsprache ergänzt: **`scripts/audit_physics_english_consistency.js`**.
- Abgedeckt: automatischer Scan priorisierter Physik-EN-Module (`elektrizitaet`, `optik1`, `linsen_spiegel`) auf deutsche Restmarker (Umlaute + häufige Funktionswörter), mit baseline-gestützter New-Issue-Erkennung.
- Gate/DoD nachgezogen: **`scripts/run_quality_gate.sh`** auf 11-stufigen Sammellauf erweitert; **`docs/QUALITY_CRITERIA.md`** um den verpflichtenden EN-Konsistenzcheck ergänzt.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_physics_english_consistency.js` und vollständigem Sammellauf `bash scripts/run_quality_gate.sh`.
- Ergebnis: Neue Mischsprach-Regressionsfälle in den priorisierten EN-Physikmodulen werden automatisch erkannt; vorhandene Altlasten sind als baseline sichtbar nachverfolgbar.

P2-Math Fortschritt (Run 2026-04-28 03:5x):
- Mathe-Perfection um EN-Konsistenzprüfung ergänzt: neues Audit **`scripts/audit_math_english_consistency.js`** (initial auf `math2_6_prop_prozent`).
- Abgedeckt: 5 verbliebene deutschsprachige EN-Feedbacktexte im Prozent/Proportionalitätsmodul direkt auf Englisch korrigiert.
- Gate/DoD nachgezogen: **`scripts/run_quality_gate.sh`** auf 12-stufigen Sammellauf erweitert; **`docs/QUALITY_CRITERIA.md`** um den verpflichtenden Mathe-EN-Konsistenzcheck ergänzt.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_math_english_consistency.js`, `JSON.parse(lang/en.json)` und anschließend `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Das priorisierte EN-Mathemodul ist sprachlich konsistent, und neue Mischsprach-Rückfälle werden automatisiert abgefangen.

P1 Fortschritt (Run 2026-04-28 03:43):
- Physik-Perfection (EN) für die priorisierten Optik-Module vollständig nachgezogen: **`optik1`** und **`linsen_spiegel`** enthalten keine deutschsprachigen Rest-Feedbacks mehr.
- Abgedeckt: 86 Diagnose-Feedbacktexte + 1 Inhaltsstring in `lang/en.json` (Kapitelquiz + Diplomteil) auf konsistentes Englisch vereinheitlicht.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: `scripts/audit_physics_english_consistency.js` meldet nun `known_debt=0`; Baseline (`scripts/baselines/physics_en_consistency_allowlist.json`) wurde auf leere Altlasten aktualisiert.

P2-Math Fortschritt (Run 2026-04-28 03:58):
- Mathe-Perfection (EN) im priorisierten Thema **`math1_7_gleichungen`** nachgezogen.
- Abgedeckt: 11 diagnoseorientierte Feedbacktexte + 1 Inhaltsblock (`sections[0].content`) auf konsistentes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 1 auf 2 priorisierte Themen erweitert (`math2_6_prop_prozent`, `math1_7_gleichungen`); Baseline (`scripts/baselines/math_en_consistency_allowlist.json`) entsprechend aktualisiert.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-EN-Konsistenzprüfung deckt jetzt Gleichungen automatisiert mit ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 04:0x):
- Physik-Perfection (EN) im Thema **`akustik`** nachgezogen.
- Abgedeckt: 42 verbliebene deutschsprachige Diagnose-Feedbacktexte (Kapitel + Diplom) in `lang/en.json` auf konsistentes, kurzes A2-B1-Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Scope von 3 auf 4 priorisierte Physikthemen erweitert (`elektrizitaet`, `optik1`, `linsen_spiegel`, `akustik`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `PHYSICS_EN_CONSISTENCY_TOPICS=akustik node scripts/audit_physics_english_consistency.js`, anschließend vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-EN-Konsistenzprüfung deckt jetzt auch Akustik automatisiert ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 04:1x):
- Physik-Perfection (EN) im Thema **Energie** nachgezogen.
- Abgedeckt: gemischte DE/EN-Reste in Kapitelinhalten, Quiz-Feedback und Diplom-Feedback auf konsistentes A2-B1-Englisch vereinheitlicht (u. a. zentrale Begriffe wie force/distance, potential energy, friction work).
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Scope von 4 auf 5 priorisierte Physikthemen erweitert (neu: `energie`).
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-EN-Konsistenzprüfung deckt jetzt auch Energie automatisiert ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 04:2x):
- Physik-Perfection (EN) im Thema **Astronomie** nachgezogen.
- Abgedeckt: 30 verbliebene deutschsprachige Diagnose-Feedbacktexte (Kapitel + Diplom) in `lang/en.json` auf konsistentes, kurzes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Scope von 5 auf 6 priorisierte Physikthemen erweitert (neu: `astronomie`).
- Qualitätssicherung: Implementieren → Review → Patch mit `PHYSICS_EN_CONSISTENCY_TOPICS=astronomie node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-EN-Konsistenzprüfung deckt jetzt auch Astronomie automatisiert ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 04:27):
- Physik-Perfection (EN) im Thema **drehundstatik** nachgezogen.
- Abgedeckt: 45 gemischte DE/EN-Reste in Kapitel-/Diplom-Feedback sowie mehrere DE-Aria-/Content-Strings in `lang/en.json` auf konsistentes, kurzes Englisch vereinheitlicht; zusätzlich inhaltliche Korrektur von Tippfehlern (`Lebelarm` → `lever arm`) und UI-Texten (`Merksatz` → `Remember`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `PHYSICS_EN_CONSISTENCY_TOPICS=drehundstatik node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: `drehundstatik` ist EN-konsistent (`known_debt=0` im fokussierten Audit), ohne Regressionen im Gesamt-Gate.

P1 Fortschritt (Run 2026-04-28 04:3x):
- Physik-Perfection (EN) im Thema **kraft_und_bewegung** nachgezogen.
- Abgedeckt: verbliebene DE-Reste in 9 Feedbacktexten (Kapitel + Diplom) auf konsistentes, kurzes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Scope von 7 auf 8 priorisierte Physikthemen erweitert (neu: `kraft_und_bewegung`).
- Qualitätssicherung: Implementieren → Review → Patch mit `PHYSICS_EN_CONSISTENCY_TOPICS=kraft_und_bewegung node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Auch `kraft_und_bewegung` ist jetzt EN-konsistent im priorisierten Physik-Scope (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 04:37):
- Physik-Perfection (EN) im Thema **elektromagnetismus** nachgezogen.
- Abgedeckt: verbliebene deutschsprachige Feedback-/Content-Reste in Kapitel- und Diplomteil auf konsistentes, kurzes Englisch vereinheitlicht (inkl. Begriffskorrekturen wie `Coil`, `Ratio: 1:1`).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `PHYSICS_EN_CONSISTENCY_TOPICS=elektromagnetismus node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: `elektromagnetismus` ist jetzt EN-konsistent (`known_debt=0` im fokussierten Audit) ohne Regressionen im Gesamt-Gate.

P1 Fortschritt (Run 2026-04-28 04:45):
- Physik-Perfection (EN) im Thema **rechenbeispiele** nachgezogen.
- Abgedeckt: 16 verbliebene DE/EN-Mischsprach-Feedbacks im Master-Quiz auf kurzes, konsistentes Englisch vereinheitlicht; gleichzeitig veraltete Zahlenreferenzen in mehreren Feedbacks an die tatsächlichen Aufgabenwerte angepasst.
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Scope von 9 auf 10 priorisierte Physikthemen erweitert (neu: `rechenbeispiele`).
- Qualitätssicherung: Implementieren → Review → Patch mit `PHYSICS_EN_CONSISTENCY_TOPICS=rechenbeispiele node scripts/audit_physics_english_consistency.js`, `node scripts/audit_physics_language.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: `rechenbeispiele` ist jetzt EN-konsistent (`known_debt=0` im fokussierten Audit) ohne Regressionen im Gesamt-Gate.

P1 Fortschritt (Run 2026-04-28 05:12):
- Physik-Perfection (EN) für die verbleibenden Themen **`sieinheiten`** und **`waermelehre`** abgeschlossen.
- Abgedeckt: 69 verbliebene DE/EN-Mischsprach-Feedbacks (inkl. einzelner Content-/ARIA-Textreste) in `lang/en.json` auf kurzes, konsistentes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_physics_english_consistency.js`** Default-Scope von 11 auf alle 15 Physikthemen erweitert (neu: `arbeit`, `licht_schatten_astronomie`, `sieinheiten`, `waermelehre`).
- Baseline aktualisiert: `scripts/baselines/physics_en_consistency_allowlist.json` dokumentiert jetzt den erweiterten Scope (15 Physikthemen) bei `knownIssuePaths=[]`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `PHYSICS_EN_CONSISTENCY_TOPICS=sieinheiten,waermelehre node scripts/audit_physics_english_consistency.js`, `node scripts/audit_physics_language.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-EN-Konsistenz ist im Standardlauf über alle auditable EN-Topics regressionsfrei (`PHYSICS_EN_CONSISTENCY_CLEAR (... 14 topics, known_debt=0)`); verbleibender Strukturpunkt: `licht_schatten_astronomie` fehlt aktuell als eigener Key in `lang/en.json`.

P2 Fortschritt (Run 2026-04-28 05:18):
- Mathematik-Perfection (EN) im nächsten priorisierten Modul **`math1_2_nat_zahlen`** nachgezogen.
- Abgedeckt: 5 verbliebene DE/EN-Mischsprach-Rückmeldungen (Kapitel + Diplom-Einstiegsfeedback) in `lang/en.json` auf kurze, konsistente Englischtexte umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 2 auf 3 priorisierte Mathethemen erweitert (neu: `math1_2_nat_zahlen`).
- Baseline aktualisiert: `scripts/baselines/math_en_consistency_allowlist.json` mit 3-Themen-Scope und `knownIssuePaths=[]`.
- Qualitätssicherung: Implementieren → Review → Patch mit `MATH_EN_CONSISTENCY_TOPICS=math1_2_nat_zahlen node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P2 Fortschritt (Run 2026-04-28 05:31):
- Mathematik-Perfection (EN) im priorisierten Modul **`math1_3_add_sub`** nachgezogen.
- Abgedeckt: verbliebene DE/EN-Mischsprache in Kapitelinhalten (`Einer/Zehner`, Formulierungsrest in Subtraktions-Intro) und 2 Diplom-Feedbacktexte auf kurzes, konsistentes Englisch umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 3 auf 4 priorisierte Mathethemen erweitert (neu: `math1_3_add_sub`).
- Baseline aktualisiert: `scripts/baselines/math_en_consistency_allowlist.json` mit 4-Themen-Scope und `knownIssuePaths=[]`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math1_3_add_sub node scripts/audit_math_english_consistency.js` plus vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P2 Fortschritt (Run 2026-04-28 05:39):
- Mathematik-Perfection (EN) im priorisierten Modul **`math3_1_rationale_zahlen`** nachgezogen.
- Abgedeckt: 6 verbliebene DE-Feedbackreste in Kapitel- und Diplomquiz (`Richtig./Noch nicht./Korrekt ist ...`) auf kurze, konsistente Englischtexte umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 4 auf 5 priorisierte Mathethemen erweitert (neu: `math3_1_rationale_zahlen`).
- Baseline aktualisiert: `scripts/baselines/math_en_consistency_allowlist.json` mit 5-Themen-Scope und `knownIssuePaths=[]`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math3_1_rationale_zahlen node scripts/audit_math_english_consistency.js` plus vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P2 Fortschritt (Run 2026-04-28 05:46):
- Mathematik-Perfection (EN) im priorisierten Modul **`math3_2_potenzen_terme`** nachgezogen.
- Abgedeckt: 6 verbliebene DE-Feedbackreste in Kapitel- und Diplomquiz (`Richtig./Noch nicht./Korrekt ist ...`) auf kurze, konsistente Englischtexte umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 5 auf 6 priorisierte Mathethemen erweitert (neu: `math3_2_potenzen_terme`).
- Baseline aktualisiert: `scripts/baselines/math_en_consistency_allowlist.json` mit 6-Themen-Scope und `knownIssuePaths=[]`.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math3_2_potenzen_terme node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P2 Fortschritt (Run 2026-04-28 05:57):
- Mathematik-Perfection (EN) im priorisierten Modul **`math1_4_mult_div`** nachgezogen.
- Abgedeckt: 27 verbliebene DE/EN-Mischsprach-Feedbacks in Kapitel- und Diplomquiz auf kurze, konsistente Englischtexte umgestellt (inkl. Terminologie zu factor/product/dividend/divisor und Vorrangregeln).
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math1_4_mult_div node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: `math1_4_mult_div` ist EN-konsistent (`known_debt=0` im fokussierten Audit) ohne Regressionen im Gesamt-Gate.

P2 Fortschritt (Run 2026-04-28 06:08):
- Mathematik-Perfection (EN) im priorisierten Modul **`math1_6_winkel`** nachgezogen.
- Abgedeckt: 16 verbliebene DE/EN-Mischsprach-Reste in Kapitelinhalten und Diagnose-Feedbacks auf kurzes, konsistentes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 8 auf 10 priorisierte Mathethemen erweitert (neu: `math1_4_mult_div`, `math1_6_winkel`); Baseline `scripts/baselines/math_en_consistency_allowlist.json` entsprechend aktualisiert.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math1_6_winkel node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Die Mathe-EN-Konsistenzprüfung deckt jetzt 10 priorisierte Themen automatisiert ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 06:2x):
- Physik-Perfection-Lücke in **`licht_schatten_astronomie`** (Runtime-UI) geschlossen.
- Abgedeckt: harte DE-Strings in Interaktionsstatus/ARIA/Buttons auf DE+EN-Laufzeitlokalisierung umgestellt (Schatten-Regler, Lampenstatus, Finsternis-Status, Orbit-Erklärtexte).
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check js/topics/licht_schatten_astronomie.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Das Modul zeigt im EN-Kontext keine erzwungenen deutschen Live-/Statusmeldungen mehr und bleibt regressionsfrei im Gesamt-Gate.

P2 Fortschritt (Run 2026-04-28 06:3x):
- Mathematik-Perfection (EN) im Modul **`math2_7_geometrie`** nachgezogen.
- Abgedeckt: verbliebene DE-Feedbackreste in Kapitel- und Diplomquiz auf konsistentes, kurzes Englisch vereinheitlicht.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 12 auf 13 priorisierte Mathethemen erweitert (neu: `math2_7_geometrie`); Baseline aktualisiert.
- Qualitätssicherung: Implementieren → Review → Patch mit `node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-EN-Konsistenzprüfung deckt jetzt 13 priorisierte Themen automatisiert ab (`known_debt=0`).

P1 Fortschritt (Run 2026-04-28 06:5x):
- Physik-Perfection-Gate geschlossen: **`scripts/audit_physics_english_consistency.js`** zählt jetzt alle 15 Physikthemen im Scope (inkl. Runtime-only-Themen ohne `lang/en.json`-Block).
- Abgedeckt: `licht_schatten_astronomie` wird als `runtime_only_topics` transparent ausgewiesen statt still aus dem Scope zu fallen.
- Qualitätssicherung: Implementieren → Review → Patch mit `node --check scripts/audit_physics_english_consistency.js`, `node scripts/audit_physics_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Physik-EN-Konsistenz meldet jetzt **15 Themen** regressionsfrei (`known_debt=0`).

P2 Fortschritt (Run 2026-04-28 06:5x):
- Mathematik-Perfection (EN) im priorisierten Modul **`math3_3_gleichungen`** nachgezogen.
- Abgedeckt: 6 verbliebene DE-Feedbacktexte in Kapitel- und Diplomquiz auf kurzes, konsistentes Englisch umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 13 auf 14 priorisierte Mathethemen erweitert (neu: `math3_3_gleichungen`); Baseline aktualisiert.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math3_3_gleichungen node scripts/audit_math_english_consistency.js`, anschließend `node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-EN-Konsistenzprüfung deckt jetzt 14 priorisierte Themen automatisiert ab (`known_debt=0`).

P2 Fortschritt (Run 2026-04-28 07:0x):
- Mathematik-Perfection (EN) im priorisierten Modul **`math3_4_flaechensatz`** nachgezogen.
- Abgedeckt: 6 verbliebene DE-Feedbackreste in Kapitel- und Diplomquiz auf kurzes, konsistentes Englisch umgestellt.
- Gate-Ausbau: **`scripts/audit_math_english_consistency.js`** Scope von 14 auf 15 priorisierte Mathethemen erweitert (neu: `math3_4_flaechensatz`); Baseline aktualisiert.
- Qualitätssicherung: GPT-5.5-Schleife (Implementieren → Review → Patch) mit `MATH_EN_CONSISTENCY_TOPICS=math3_4_flaechensatz node scripts/audit_math_english_consistency.js`, anschließend `node scripts/audit_math_english_consistency.js` und vollständigem `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).
- Ergebnis: Mathe-EN-Konsistenzprüfung deckt jetzt 15 priorisierte Themen automatisiert ab (`known_debt=0`).

P3 Fortschritt (Run 2026-04-28 10:xx):
- Leere Fachbereiche **Geographie**, **Chemie** und **Biologie** in der Navigation durch je ein erstes Einstiegsmodul ersetzt.
- Neu angelegt: **`geo_oesterreich_alltag`** und **`chemie_alltag_stoffe`** mit A2-B1-Sprache, Österreich-/Alltagsbezug, kurzen Merksätzen, Mini-Aufgaben, Quizfragen und Diplomchecks.
- Layout/A11y: Quiz-Feedback im Renderer nutzt jetzt `role="status"` + `aria-live` + `aria-atomic`, und Quizbuttons sind explizit `type="button"`.
- QA-Scope: Physik-Audits schließen neue Geo-/Chemie-/Bio-Topic-Dateien korrekt aus, damit Nicht-Physik-Fächer nicht als Physik-Regressionsfälle zählen.
- Qualitätssicherung: `node -e "JSON.parse(...lang/de.json...)"`, `node --check` für Renderer/neue Topic-Dateien und vollständiger Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P1 Fortschritt (Run 2026-04-28 10:xx):
- **Optik 1** didaktisch an die gewünschte Licht-Chronologie angepasst: Einstieg erklärt jetzt zuerst Lichtquellen/Entstehung, danach geradlinige Ausbreitung und Schatten.
- Missverständliche Absolutformulierung in der ersten Optik-Frage entschärft (`absolut gerade` → geradlinig im gleichen Medium/Luft), inklusive einfacherer Feedbacktexte.
- Layout/A11y: Dark-Mode-Kontrast im Hauptlayout korrigiert (`--text-color` war schwarz auf dunklem Hintergrund).
- Qualitätssicherung: `JSON.parse(lang/de.json)` und vollständiger Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P1/P2 Fortschritt (Run 2026-04-28 10:xx):
- Tonalität und Klarheit in auffälligen DE-Übungen geglättet.
- Abgedeckt: Akustik-Fehlantwort `Magie` durch fachliche Fehlvorstellung ersetzt, Vakuum-Erklärung weniger dramatisch formuliert, Optik-Kernschatten einfacher erklärt, neue Chemie-/Bio-Fehlantworten sachlicher gemacht.
- Zusätzlich Mathe-Texte mit unnötig umgangssprachlichen Formulierungen bereinigt (`absolute Chef`, `fette Pizza`, `Magie der Dreiecke`) und Finanzmathematik-Subtitle neutraler formuliert.
- Qualitätssicherung: `JSON.parse(lang/de.json)` und vollständiger Sammellauf `bash scripts/run_quality_gate.sh` (`QUALITY_GATE_CLEAR`).

P3 Fortschritt (Run 2026-04-28 16:xx):
- Neue Einstiegsfächer **Geographie**, **Chemie** und **Biologie** didaktisch von Starter-Niveau auf klassentaugliche A2-B1-Module erweitert.
- Pro Kapitel ergänzt: 2-3 Mini-Aufgaben, eine Transferaufgabe, klare **Merke**-Boxen, Alltagssituationen und explizite Hinweise auf typische Fehlvorstellungen.
- EN-Backfill für **`geo_oesterreich_alltag`** und **`chemie_alltag_stoffe`** mit gleicher Struktur/gleichen Quiz-IDs ergänzt, damit diese neuen Topics nicht mehr auf Deutsch zurückfallen.
- QA-Ausbau: neuer sichtbarer Warning-Audit **`scripts/audit_new_subject_english_blocks.js`** im Sammel-Gate; meldet neue `geo_`/`chemie_`/`bio_`-Topickeys ohne `lang/en.json`-Block als `NEW_SUBJECT_EN_BLOCK_WARNING`.

P3 Fortschritt (Run 2026-04-28 17:xx):
- Neue Fächer **Geographie**, **Chemie** und **Biologie** mit je einer robusten Kerninteraktion ergänzt.
- Abgedeckt: Geo-Routencheck (Richtung + Orientierungspunkt), Chemie-Trenncheck (gelöstes Salz + Filter/Verdampfen) und Bio-Pulscheck (Aktivität + Pulsmodell).
- Accessibility: Interaktionen nutzen native Tastatursteuerung, `role="status"` + `aria-live` + `aria-atomic`, `aria-pressed` bei Auswahlzuständen, `aria-describedby`/`aria-valuetext` bei Reglern sowie Re-Init-Guards gegen doppelte Injektion.
- QA-Ausbau: neues Gate-Audit **`scripts/audit_new_subject_interactions.js`** prüft Interaktions-/A11y-Mindestmerkmale; neues Didaktik-Audit **`scripts/audit_new_subject_didactics.js`** prüft Merke-Box, Fehlvorstellung, Transferaufgabe und A2-B1-Satzlängen mit WARN/FAIL-Ausgabe.
- EN-Qualität: Geo/Chemie/Bio in `lang/en.json` stilistisch geglättet und Begriffe konsistent gehalten (`federal state`, `landmark`, `mixture`, `dissolved`, `pulse`, `germs`).
- Dokumentation: `docs/QUALITY_CRITERIA.md` enthält jetzt fachbezogene Definition-of-Done-Blöcke für Geo, Chemie und Bio.

Mini-Pilot (Run 2026-04-28 17:xx):
- Fünf studentische Walkthrough-Snapshots geprüft: Geo DE Einstieg, Geo EN Öffi-Route, Chemie EN Mischen/Trennen, Bio DE Atmen/Kreislauf und Bio EN Schutz/Hygiene.
- Ergebnis: Lernfluss ist verständlich, Merke/Fehlvorstellung/Transfer erscheinen in allen geprüften Kapiteln, und die neuen Interaktionen sitzen nahe am passenden Lernziel.
- Fokuspatches: doppelten `geographie`-Key in `index.html` entfernt und Bio-EN-Reglertext von `walking stairs` zu natürlicherem `climbing stairs` geglättet.

## 2026-09-05 – Interaktives Lehrbuch Mittelschule Wien
Gemeinsamer Lernbereich mit teilbaren Stofflisten und freiem Quizzugang implementiert; Physik-Navigation an aktuellen RIS-Lehrplan angeglichen. Neue Zugangs- und DOM-Flow-Tests bestanden. Vollständiger Auftrag und offene Lücken: docs/MITTELSCHULE_WIEN.md. Bestehende Audits für Quizfeedback und Mathematiksprache bleiben rot; keine Veröffentlichung erfolgt.

## 2026-09-05 – Physik-Kernkapitel und nachvollziehbare Rückmeldungen
Drei Kernkapitel mit Modellen und 24 Fragen ergänzt. Lern-/Wiederholungsnavigation integriert. 100 Astronomie- und 72 Mathematik-Rückmeldungen ergänzt/überarbeitet. Vier neue Funktionstests und alle 14 bestehenden Audits bestanden; Audit-Abdeckung ist begrenzt. Gesamtziel bleibt offen, Details in docs/MITTELSCHULE_WIEN.md.

## 2026-09-05 – Sprachfächer und Textwerkstatt
11 Deutsch- und 9 Englischkapitel aus den geplanten Einträgen ausgearbeitet. 80 Fragen, 60 Zuordnungen und 20 Schreibwerkstätten ergänzt. Echte Renderer-Integration aller Kapitel, Draft-Speicherung und optionale Sprachausgabe automatisiert geprüft. Geteilte Stofflisten bleiben beim Rückweg erhalten. Gesamtauftrag weiterhin offen; 25 geplante Kapitel in weiteren Fächern verbleiben.

## 2026-09-05 – Geografieübungen und Zuordnung
Vier Geografiekapitel mit Routen- und Budgetmodell abgesichert, Antwortalternativen verbessert und Jahrgangszuordnung anhand des aktuellen RIS-Fachlehrplans korrigiert. Vier Renderer-Aufrufe, Routenfälle, 16 Budgetkombinationen und Stofflisten-Flow bestanden. Zusätzliche fachliche Lücken des bisherigen Kapitelplans in MITTELSCHULE_WIEN.md konkret dokumentiert; 21 geplante Kapitel in weiteren Fächern bleiben offen. Keine Veröffentlichung erfolgt.

## 2026-09-05 – Kunst und Gestaltung
Sieben Kunstkapitel mit 28 Fragen, 21 Zuordnungen und praktischen Gestaltungsaufträgen ergänzt. Drei funktionale Bildlabore ermöglichen kontrollierte Varianten und A/B-Vergleiche. Alle sieben Renderer-Integrationen und Bildsteuerungen geprüft; gemeinsame Deutsch-/Englischwerkstätten bleiben funktionsfähig. 14 geplante Kapitel und die dokumentierten fachlichen Abnahmelücken bleiben offen; keine Veröffentlichung.

## 2026-09-05 – Musik und Klanglabor
Sieben Musikkapitel mit 28 Fragen, 21 Zuordnungen und praktischen Musikaufträgen ergänzt. Vier Klanglabore mit editierbaren Tönen/Pausen, Tempo, Klangfarbe und Grundschlägen. Alle Kapitel integriert geprüft; Audio-Ablauf mit Testdoubles einschließlich Abbruch bei ausstehendem Start abgesichert. Reale Hörprüfung und weitere Lehrplaninhalte bleiben offen. Sieben geplante Ernährungskapitel verbleiben; keine Veröffentlichung.

## 2026-09-05 – Ernährung und Haushalt
Sieben Kapitel und drei Rezept-/Kostenplaner ausgearbeitet, nach RIS der 2. Klasse zugeordnet. 28 Fragen, 21 Zuordnungen und alle Mengen-/Kostenfälle geprüft. Nun keine geplanten Navigationseinträge mehr; fachliche und technische Vollständigkeit bleibt unbewiesen. Fehlende strukturierte Lernziele/Zusammenfassungen im Bestand und weitere Fachlücken sind in MITTELSCHULE_WIEN.md dokumentiert. Keine Veröffentlichung.

## 2026-09-05 – Physik-Lernwege und Vorwissen
17 Bestandskapitel mit spezifischen Lernzielen/Zusammenfassungen ergänzt; alle 20 Physikeinträge im Renderer geprüft. Vorwissenslinks auf tatsächlich existierende Kapitel begrenzt. Optikformulierungen und sieben Fragen fachlich präzisiert, Kapitelnummern korrigiert. Bestands-Simulationen, weitere fachliche und sprachliche Lücken sowie Veröffentlichung bleiben offen.

## 2026-09-05 – Klimadiagramm
Achsenskalen, Monatsauswahl und vollständige Tabelle ergänzt. Trockenheitsregel präzisiert, Verdunstung nicht länger als gemessen behauptet, unbelegte Rom-Daten als Modell gekennzeichnet. Funktions- und Inhaltstests bestanden; Gesamtauftrag unverändert offen.

## 2026-09-05 – Mathematik-Flächenkapitel
Falsches Pythagoras-Duplikat hinter dem Flächenkapitel ersetzt. Vier Figuren im interaktiven Flächenlabor, acht Fragen, Zerlegungsaufgabe und passende Lernziele ergänzt. 108 Geometriekombinationen geprüft. Weitere Inhaltslücken und Versionierung alter Lernstände bleiben offen.

## 2026-09-05 – Gleichungssysteme
Fehlende Lösungsverfahren und Fälle im Funktionskapitel ergänzt. Neues unabhängiges Geradenmodell neben bestehendem GeoGebra; 625 Koeffizientenkombinationen geprüft. Fachliche und sprachliche Gesamtabnahme sowie Veröffentlichung bleiben offen.

## 2026-09-05 – Kugelberechnung
Kugelinhalt und Oberflächenformeln im Körperkapitel ergänzt. Radiusmodell und vier Fragen mit Einheiten/Skalierung; zehn Modellradien geprüft. Zylinderübung erhält eine Ergebnisprüfung neben dem Tipp. Gesamtziel unverändert offen.

## 2026-09-05 – Versionsbezogener Lernstand
Kapitelquiz-Ergebnisse werden bei wesentlich geänderten Inhalten von der aktuellen Fassung getrennt. Alte Ergebnisse bleiben erhalten, neue Bestwerte beginnen passend zur Inhaltsversion. Stoffliste zählt überholte Ergebnisse nicht als aktuellen Erfolg. Ablauf- und Regressionstests bestanden; Gesamtauftrag offen.

## 2026-09-05 – Mathematik, Lernführung der 1. Klasse
Elf Bestandskapitel erhalten konkrete Lernziele, Vorwissen und Zusammenfassungen. Fehlende Quiz-ID repariert; Zahlen-Abschluss prüft Stellenwerte statt bloßer Selbsteinschätzung. Winkelgrenzen, Masse, Würfelflächen und Papierflächenmodell präzisiert. Lernstandsrevision für drei veränderte Prüfungsinhalte ergänzt. Elf Renderer-Integrationen, Stellenwertübung, Versions- und Stofflistenabläufe sowie Syntaxprüfung bestanden. Fachliche Vollständigkeit aller Kapitel und Veröffentlichung bleiben offen.

## 2026-09-05 – Mathematik, Lernführung der 2. Klasse
Acht Kapitel mit spezifischen Lernzielen, Voraussetzungen und Zusammenfassungen ergänzt. Bruchkapitel um Erweitern/Kürzen und ungleichnamige Addition/Subtraktion mit vier Fragen und einer Eingabeübung erweitert. Gleichwertige Ergebnisbrüche werden exakt geprüft; leere und ungültige Eingaben abgewiesen. Runden, direkte Proportionalität, ggT und Prismenhöhe präzisiert. Acht Renderer-Prüfungen, Bruchübung, Vorjahreskapitel, Lernstandsrevision und Syntaxprüfung bestanden. Weitere fachliche Abnahme und Veröffentlichung bleiben offen.

## 2026-09-05 – Teilbarkeit und Primfaktoren
Quersummenregeln für 3/9 samt Begründung, Primzahlen/Primfaktoren und Anwendung auf ggT/kgV ergänzt. Vier neue Verständnisfragen und eine Eingabeübung mit differenzierten Rückmeldungen; generische Rückmeldungen der sechs bisherigen Fragen fachlich ersetzt. Neue Inhaltsrevision berücksichtigt alte Lernstände. Renderer, Primzahlfälle 2 bis 60, Eingabe-/Tastaturfälle und bestehende ggT/kgV-Übungen sowie Versions- und Syntaxprüfungen bestanden. Weitere Inhaltsabnahme und Veröffentlichung bleiben offen.

## 2026-09-05 – Proportionalität und Prozentrechnung
Indirekte Proportionalität mit festem Gesamtbetrag, Modellgrenzen (Grundgebühr) und alle drei Prozentgrößen ergänzt. Sechs neue Fragen und Aufteilungsrechner für 1 bis 12 Personen. Rabattrechner lehnt leere Eingaben ab und formatiert Eurobeträge österreichisch. Acht Kapitel-Renderer, sämtliche Gruppengrößen, Rabattgrenzen/Dezimalwerte und Tastatureingabe geprüft. Eine zunächst falsche Testannahme zur Eurozeichenposition berichtigt; anschließende Tests sowie Lernstands- und Syntaxprüfung bestanden. Gesamtauftrag offen.

## 2026-09-05 – Reelle Zahlen und Quadratwurzeln
Falsche Definition irrationaler Zahlen ersetzt: rationale periodische Dezimalzahlen und unendliche nicht periodische Darstellungen unterschieden. Wurzeldefinition, nichtnegative Wurzel versus Gleichungslösungen, Eingrenzen/Nähern und unzulässiges Verteilen über Summen erklärt. Vier Abschnitte mit sieben Übungsfragen, strukturierten Lernhilfen und Näherungssteuerung. Alle 1001 Stellwerte, Wurzeleingabe, Renderer und Versions-/Syntaxregression bestanden. Symbolische Ungleichung im Fragetext als Wörter formuliert, nachdem Darstellungstest die ursprüngliche Form nicht wiederfand. Gesamtauftrag bleibt offen.

## 2026-09-05 – Statistik und Boxplot
Statistik 4 auf vier inhaltliche Abschnitte mit sieben Übungsfragen ausgebaut. Mittelwert, Median bei gerader/ungerader Anzahl, Modus, Spannweite, Quartilregel und einfacher Min/Max-Boxplot erklärt. Editierbares Datenlabor mit Tabellen/SVG und Extremwertvergleich ergänzt. Irreführende Behauptung einer stets perfekten Galton-Glockenkurve entfällt mit dem ersetzten Einstieg. Statistik 3: Gleichsetzung Mittelwert/normal korrigiert. Bekannte Datensätze, ungültige Eingaben, Darstellung, Presets, Versions- und Syntaxprüfungen bestanden. Vollständige Abnahme/Veröffentlichung weiterhin offen.

## 2026-09-05 – Mehrschrittige Gleichungen
Mathematik 4: Gleichartige Terme, Klammern, Variablen auf beiden Seiten, keine/unendlich viele Lösungen und Textmodell ergänzt. Neun Übungsfragen, Lernhilfen und drei geführte Umformungsaufgaben mit Fehlererklärungen und Einsetzprobe. Bestehende Termeingabe bleibt erhalten und per Enter bedienbar. Alle richtigen/falschen Schrittoptionen, Rücksetzen, unabhängige Einsetzproben, Renderer, Versions- und Syntaxprüfungen bestanden. Gesamtauftrag offen.

## 2026-09-05 – Rationale Zahlen
Vier Abschnitte erklären rationale Zahlen, Ordnung, Gegenzahl/Betrag, alle Grundrechenarten und negative Brüche. Acht Übungsfragen und Zahlenstrahl mit Addition/Subtraktion in halben Schritten ergänzt. Alle 882 Reglerkombinationen samt Ergebnisposition, bestehende Eingaben, Renderer, Versions- und Syntaxprüfung bestanden. Gesamtauftrag und Veröffentlichung weiterhin offen.

## 2026-09-05 – Kapitelübergreifender Render-Audit
Gemeinsame Fragenbereinigung korrigiert: mathematische Vergleiche mit < und > bleiben erhalten, während HTML-Tags entfernt werden. Neuer audit_all_chapter_renders lädt sämtliche 181 deutschen Navigationskapitel mit gemeinsamen Modulen und vergleicht Anzahl der Quiz-Platzhalter/angezeigten Fragen sowie vorhandene Lernhilfen. 181 erfolgreich, keine Befunde in dieser Prüfabdeckung. 90 Kapitel ohne vollständige strukturierte Lernhilfen erfasst. Bericht unter work/chapter-render-audit.json außerhalb des Repos. Lernzugang, Stofflisten, Wurzeln und Lernstandsrevision erneut bestanden. Kein Beleg für fachliche, visuelle oder externe Simulationsvollständigkeit.

## 2026-09-05 – Geometrie-Lernhilfen und Voraussetzungen
Fünf Geometriekapitel erhalten konkrete Lernziele, Vorwissen und Zusammenfassungen. Katheten-/Diagonalberechnung sowie Flächenskalierung mit drei Fragen ergänzt. Maßstabumrechnung, Papierflächenmodell und Schattenvoraussetzungen präzisiert; Pythagoras-Zahlenpuzzle nicht länger als allgemeiner Beweis bezeichnet. Vollständiger gemeinsamer Render-Audit: 181/181 ohne Befunde, noch 85 Kapitel ohne vollständige strukturierte Lernhilfen. Versionsregression bestanden. Einzelne Bestandsmodule und fachliche Gesamtabnahme weiter offen.

## 2026-09-05 – Weitere Lernhilfen Mathematik 3
Potenzen, Gleichungen, Verhältnisse, Zuordnungen und Statistik erhalten Lernziele/Vorwissen/Zusammenfassungen. Potenzregeln und zweischrittige Gleichungen mit vier Fragen ergänzt. Voraussetzungen des Arbeitsmodells präzisiert. Statistikdiagramm mit Skala und fiktiven Buchausleihen versehen; tatsächlich noch vorhandene normal-Formulierung per HTML-Textauswahl korrigiert. Render-Audit 181/181 ohne Befunde, noch 80 Kapitel ohne strukturierte Lernhilfen. Versionsregression bestanden; Gesamtziel offen.

## 2026-09-05 – Zinsen und Finanzierung
Zwei Kapitel mit Lernhilfen, einfachen Monatszinsen, Zinseszins, Brutto/Netto und vollständigen Ratenkosten erweitert. Pauschale Geschenk-/Mehrkostenbehauptungen präzisiert; OeNB, AK und BMF als Quellen geprüft. Fünfjahresrechner vergleicht einfache Verzinsung und Zinseszins bei expliziter jährlicher Cent-Rundung. Fachliche Beispielwerte, Eingabegrenzen, Nullbetrag, Enter und Wiederherstellung geprüft. Audit 181/181 erfolgreich, 78 Kapitel ohne strukturierte Lernhilfen; Gesamtauftrag offen.

## 2026-09-05 – Chemiezuordnung und Lernhilfen
15 Chemiekapitel erhalten strukturierte Lernziele aus ihren vorhandenen fachlichen Zielen, passende Zusammenfassungen und Vorwissenslinks. Nach RIS Chemie der 4. Klasse zugeordnet; falsche feste Zweijahresaufteilung in Navigation und deutschem Lernweg durch Grundlagen-/Anwendungsblöcke ersetzt. Stoff-/Teilchen-/Symbolebene präzisiert. Alle 181 Kapitel im gemeinsamen Renderer erfolgreich; fehlende strukturierte Lernhilfen nun 63. Chemie-Lernwegsteuerungen und Zuordnung geprüft. Experimentanleitungen und Fachmodelle benötigen weiterhin vollständige Abnahme.

## 2026-09-05 – Digitale Grundbildung: Lernhilfen
21 Kapitel erhalten strukturierte Ziele aus vorhandenen Werkstattzielen, spezifische Zusammenfassungen und fachstrangbezogene Vorwissensverweise. Analog/digital-Erklärung präzisiert. Gemeinsamer Audit 181/181 ohne Befunde, noch 42 Kapitel ohne vollständige Lernhilfen. Vorwissensziele und Stofflistenfluss geprüft. Fachliche/aktuelle Prüfung aller technischen und rechtlichen Aussagen sowie der einzelnen Werkstattfunktionen bleibt offen.

## 2026-09-05 – Biologie: Grundlagen und Ökosysteme
18 Kapitel mit strukturierten vorhandenen Zielen, kapitelspezifischen Zusammenfassungen und Vorwissensverweisen ergänzt. Bereiche: biologische Arbeitsweise, Pflanzen, Zellen, Evolution, Lebensräume, Boden, Fossilien, Geologie und Stadt-/Landwirtschaftsökologie. Render-Audit 181/181 ohne Befunde; noch 24 Kapitel ohne vollständige Lernhilfen. Verweisziele geprüft. Fachliche Einzelprüfung, Medienlizenzen und praktische Versuche weiterhin offen.

## 2026-09-05 – Lernhilfen in allen Navigationskapiteln
21 verbleibende Biologiekapitel sowie Österreich-Alltag, Rechenreise und Känguru-Training mit Lernzielen/Vorwissen/Zusammenfassungen ergänzt. Gesundheitsportal für Pubertät, Verdauung, Impfungen und Antibiotikaresistenzen herangezogen. Render-Audit: 181/181 erfolgreich, keine fehlenden strukturierten Lernhilfen. Dies schließt nur die erfasste Strukturlücke; fachliche Vollständigkeit, Aufgabenqualität, einzelne Module, Übersetzungen, Medienlizenzen, visuelle Gesamtabnahme und Veröffentlichung bleiben offen.

## 2026-09-05 – Vollständige Kapitelchecks
Der vorherige Antwortturn war keine Umsetzung; die vorhandenen Änderungen wurden erneut geprüft und durch Regressionstests abgesichert. Die feste Begrenzung auf zwölf Abschlussfragen entfällt. In 13 Kapiteln werden dadurch auch bisher abgeschnittene Fragen berücksichtigt. Bestehende Ergebnisse dieser Kapitel werden über Inhaltsrevisionen als veraltet gekennzeichnet und beim nächsten Versuch archiviert. Die Kapitelkarte erklärt, dass praktische Lernaufträge zusätzlich zu bearbeiten sind.
Neuer Test test_complete_chapter_quizzes.js prüft einen gemischten Pool mit 20 eindeutigen Fragen: Abschnitts-/Kapitel-/Diplomfragen, Duplikate, Ausschluss reiner Übungsfragen, Auswertung einer späten falschen Antwort (95 Prozent), vollständige Rückmeldung und Revisionen aller 13 betroffenen Kapitel. Versionsregression und Lernbereich-Flowtest bestanden. Gemeinsamer Render-Audit: 181/181, keine fehlenden Lernhilfen, keine Befunde innerhalb dieser Prüfabdeckung. Keine visuelle oder vollständige fachliche Abnahme; Übersetzungen, Lehrplanlücken, Bestandsmodule und Veröffentlichung weiterhin offen.

## 2026-09-05 – Geografie: Ernährung und Landwirtschaft
Vorheriger Zielturn war Fortschritt (vollständige Kapitelchecks mit Regression). Dokumentierte Lehrplanlücke der 1. Klasse nun mit eigenem Kapitel geo_1_ernaehrung_landwirtschaft bearbeitet: vier Abschnitte zu Lebensmittelketten/Zugang, natürlichen und menschlichen Anbaubedingungen, Ernte pro Fläche sowie Einkaufsentscheidungen unter Unsicherheit. Acht begründete Fragen, drei interaktive Zuordnungen und eigener Jausenplan mit Kriterien und Vergleichslösung. Lernziele, Vorwissen, Zusammenfassung, Quellen und Navigation für die 5. Schulstufe vorhanden. Tabellen und Angebote ausdrücklich fiktiv; keine pauschale Umweltwertung allein nach Herkunft. Wiener Landwirtschaft anhand Stadt-Wien-Quellen überprüft; RIS-Anwendungsbereich Ernährung/Landwirtschaft in Klasse 1 erneut in vorhandener Textfassung bestätigt.
Geografie-Integrationstest erweitert und bestanden: 24 Fragen über fünf neue Geografiekapitel, 15 Zuordnungen, Modellrechnung aus gerenderter Tabelle, Schulstufe, Fehlerfeedback und unmittelbare Entwurfsspeicherung; vorhandene Route/Budget weiter geprüft. Lernbereich-Flowtest bestanden. Gemeinsamer Render-Audit 182/182 ohne Befunde, keine fehlenden strukturierten Lernhilfen. git diff --check sauber. Weitere dokumentierte Geografie-Lücken (Naturgefahren, weltweite Lebenssituationen, Ressourcen/Arbeitswelt/Märkte, Österreich, EU/Urbanisierung) sowie fachübergreifende Gesamtabnahme und Veröffentlichung bleiben offen.

## 2026-09-05 – Geografie: Naturereignisse und Naturgefahren
Vorheriger Zielturn war Fortschritt; Landwirtschaftskapitel und Tests im Bestand erneut geprüft. Eigenes Kapitel geo_1_naturgefahren für die 1. Klasse ergänzt: Naturereignis/Gefahr/Risiko, Überflutung/Hangrutschung/Erdbeben, unterschiedliche Betroffenheit, Vorsorge und Solidarität. Vier Abschnitte, acht Fragen mit individuellen Begründungen, drei Zuordnungen und begründeter Planungsauftrag. Quellen: naturgefahren.at (Bundesministerium), GeoSphere Austria, Stadt Wien zum Entlastungsgerinne Neue Donau. Keine Vorhersage oder Behauptung vollständiger Sicherheit.
Neues tabellarisches Hochwassermodell in geo-experiments: drei frei gewählte Wasserstände, Verlegung zweier Standorte, Warnung unabhängig vom Wasserstand, Rücksetzen. Modelleinheiten und Grenzen ausdrücklich erläutert; betroffene Gebäude werden nicht mit Schadenshöhe oder vollständigem Risiko gleichgesetzt. Test fand zunächst ein fehlerhaftes option-Tag beim mittleren Wasserstand; Quelle korrigiert, Generator erneut ausgeführt. Alle zwölf Kombinationen und Reset anschließend bestanden. Geografie-Integration prüft jetzt sechs neue Kapitel mit 32 Fragen und 18 Zuordnungen einschließlich bestehender Route, Budget und Landwirtschaft. Lernbereich-Flowtest bestanden. Gemeinsamer Render-Audit 183/183 ohne Befunde und ohne fehlende Lernhilfen. Keine visuelle Abnahme. Verbleibende Geografie- und fachübergreifende Anforderungen sowie Veröffentlichung weiterhin offen.

## 2026-09-05 – Geografie 2: Arbeit, Märkte und Projekt
Vorheriger Zielturn war Fortschritt; Naturgefahrenkapitel und Modell im Bestand vorhanden. RIS-Kompetenzbereiche der 2. Klasse erneut gelesen. Neues Kapitel geo_2_arbeit_maerkte behandelt Arbeitsformen/Berufserkundung, Arbeitsteilung, Digitalisierung, Märkte/Preisbildung, Dienstleistungsvergleich sowie Projektplanung, Erprobung und Reflexion. Sechs Abschnitte, zwölf Fragen mit Begründungen, drei Zuordnungen und praktischer Auftrag einschließlich Beruferecherche im überprüften AMS-Berufslexikon. Navigation: 6. Schulstufe. Modellrechnung ersetzt ausdrücklich nicht den praktischen Versuch.
Lesezeichenmodell mit drei Preisen und drei Mengen: angenommene Nachfrage, tatsächlich verkaufbare Menge, Restbestand, Einnahmen, fixe/variable Modellkosten und Ergebnis. Unbezahlte Zeit und fehlende Kosten werden als Grenzen benannt; keine Umsatz-/Gewinnverwechslung. Alle neun Kombinationen mit unabhängiger Ergebnismatrix sowie Reset und Klassenbezug getestet. Geografie-Integration nun sieben neue Kapitel, 44 Fragen, 21 Zuordnungen; bestehende Modelle weiter erfolgreich. Lernbereich-Flowtest bestanden. Render-Audit 184/184 ohne Befunde, keine fehlenden strukturierten Lernhilfen, diff --check sauber. Ressourcen/Energie und Sparen/Risiko der 2. Klasse bleiben noch gezielt auszuarbeiten; übrige dokumentierte Lehrplanlücken, Gesamtprüfung und Veröffentlichung offen.

## 2026-09-05 – Geografie 2: Ressourcen, Energie und Kreisläufe
Vorheriger Zielturn war Fortschritt; Arbeits-/Marktkapitel und Modell erneut im Bestand geprüft. Neues Kapitel geo_2_ressourcen_energie für die 6. Schulstufe ergänzt: räumliche Ressourcenverteilung versus gesellschaftlicher Zugang, Kartenauftrag zum Wiener Wasser, Vergleich erneuerbarer/nicht erneuerbarer Energiequellen, Wasser/Boden/Luft und gemeinschaftliche Schutzregeln, Wiederverwendung/Recycling. Vier Abschnitte, acht begründete Fragen, drei Zuordnungen, praktischer Gegenstandsvergleich mit Lernzielen, Vorwissen und Zusammenfassung. Wiener Quellenschutz und Herkunft sowie österreichisches Umweltbundesamt zur Kreislaufwirtschaft aktuell als Quellen geprüft. Regionstabelle ausdrücklich fiktiv, keine unbelegte Kausalität aus Niederschlag/Versorgungsanteil.
Recyclingmodell: 100 Ausgangseinheiten, drei Durchläufe ohne Nachschub, 50/80/100 Prozent Rückgewinnung; idealer Fall und Grenzen (Energie, Qualität, Schadstoffe) ausdrücklich benannt. Tabellenwerte, Bilanz jeweils 100, kumulierte Verluste, Reset und wiederholte Initialisierung geprüft. Geografietest jetzt acht neue Kapitel, 52 Fragen, 24 Zuordnungen; frühere Modelle unverändert erfolgreich. Lernbereich-Flowtest bestanden, Render-Audit 185/185 ohne Befunde/fehlende strukturierte Lernhilfen, diff --check sauber. Kein Beleg für visuelle oder gesamte fachliche Vollständigkeit. Sparen/Risiko, übrige Geografie-Lücken und fachübergreifende Abnahme samt Veröffentlichung weiter offen.

## 2026-09-05 – Geografie 2: Sparziele, Kaufkraft und Risiko
Vorheriger Zielturn war Fortschritt; Ressourcenmodell und Kapitel im Bestand erneut geprüft. Lehrplanbereich Sparen/Risiko durch eigenes Kapitel geo_2_sparen_risiko der 6. Schulstufe ergänzt. Vier Abschnitte: realistischer Sparplan, Betrag/Kaufkraft/Inflation, Ertrag/Risiko/Verfügbarkeit und kritische Prüfung von Geldversprechen. Acht begründete Fragen, drei Zuordnungen und eigener Entscheidungsauftrag. OeNB-Inflationsglossar und FMA-Geldanlageinformationen aktuell geprüft; fiktive Vergleichskarten ausdrücklich keine Produkte, keine erfundenen Wahrscheinlichkeiten. Kredit und Sparen unterschieden; keine persönlichen Finanzdaten erforderlich.
Neues Kaufkraftmodell mit drei Geldbeträgen und drei Heftpreisen. Ganze Stückzahlen und Restbeträge in Cent gerechnet; einzelner Preis ausdrücklich kein allgemeiner Inflationsmaßstab. Alle neun Kombinationen mit unabhängigen Ergebnis-/Restmatrizen, Budgetbilanz und Reset bestanden. Geografie-Integration nun neun neue Kapitel, 60 Fragen, 27 Zuordnungen; vorherige Modelle weiter erfolgreich. Lernbereich-Flowtest bestanden, Render-Audit 186/186 ohne Befunde oder fehlende strukturierte Lernhilfen, diff --check sauber. Geografie 1 (weltweite Lebenssituationen), Geografie 3 und weitere Vertiefungen/gesamte Lehrplanabnahme, Übersetzungen, visuelle und fachliche Gesamtprüfung sowie Veröffentlichung bleiben offen.

## 2026-09-05 – Geografie 3: Bevölkerung und Zusammenleben
Vorheriger Zielturn war Fortschritt; Spar-/Risikokapitel und Tests vorhanden. RIS-Kompetenzbereich österreichische Gesellschaftsentwicklung erneut gelesen. Neues Kapitel geo_3_bevoelkerung für die 7. Schulstufe: Bevölkerungsstand und Bewegungen, Altersstruktur/Planung, statistische Kategorien und Selbst-/Fremdbilder, kritische Wiener Datenrecherche. Vier Abschnitte, acht begründete Fragen, drei Zuordnungen und eigener dokumentierter Daten-/Planungsauftrag. Statistik Austria zu Komponenten sowie Wiener Bevölkerungsdaten aktuell recherchiert; Geburtsland und Staatsangehörigkeit ausdrücklich getrennt. Amtliche Daten können statistische Korrekturen enthalten. Modellgemeinden sind fiktiv; keine unbewiesenen aktuellen Zahlen eingefügt.
Neues Bevölkerungsmodell mit 16 Kombinationen von Geburten, Sterbefällen, Zu- und Wegzügen; Ausgangsstand 1000, gleiche Gebiets-/Jahresdefinition, separate Bilanzen und Hinweis bei unverändertem Gesamtstand. Alle 16 Ergebnisse gegen unabhängige Werteliste, Reset und Schulstufe geprüft. Geografietest jetzt zehn neue Kapitel, 68 Fragen, 30 Zuordnungen einschließlich früherer Modelle. Lernbereich-Flowtest bestanden. Render-Audit 187/187 ohne Befunde/fehlende strukturierte Lernhilfen, diff --check sauber. Weitere Geografie-3-Bereiche (Bildungswege/Rechte, Wirtschaftsstandort, Zentren/Peripherien), weltweite Lebenssituationen, weitere Lehrplanvertiefungen, Übersetzungen, vollständige fachliche/visuelle Abnahme und Veröffentlichung bleiben offen.

## 2026-09-05 – Geografie 3: Zentren, Umland und Lebensqualität
Vorheriger Zielturn war Fortschritt; Bevölkerungskapitel im Bestand bestätigt. RIS-Bereich Zentren/Peripherien erneut gelesen. Neues Kapitel geo_3_zentren_lebensqualitaet: relative Zentralität, österreichischer Kartenvergleich, Erreichbarkeit, mehrperspektivische Lebensqualität und Raumplanung/Nutzungskonflikte. Vier Abschnitte, acht Fragen, drei Zuordnungen, ÖROK-Kartenauftrag und Beobachtung mit Lehrkraft bzw. Bildmaterial plus Planungsvorschlag. ÖROK-Erreichbarkeit und Wiener Flächenwidmungsinformation aktuell geprüft. Wohnlagentabelle und Verkehrszeiten sind ausdrücklich fiktiv; keine echte Fahrplanauskunft oder allgemeine Wohnortrangliste.
Wegezeitmodell zählt Fußwege, Wartezeit und Fahrt. Vier Route-/Zeitpunktkombinationen und Reset getestet; schnellere Verbindung wechselt zwischen Morgen und Abend. Geografie-Integration nun elf neue Kapitel, 76 Fragen und 33 Zuordnungen; frühere Modelle weiter bestanden. Lernbereich-Flowtest bestanden. Render-Audit 188/188 ohne Befunde oder fehlende strukturierte Lernhilfen, diff --check sauber. Weitere offene Inhalte: Wirtschaftsstandort/ökosoziale Marktwirtschaft, Bildungswege/Rechte, weltweite Lebenssituationen, Vertiefungen der 4. Klasse sowie fachübergreifende vollständige Abnahme, Übersetzungen, visuelle Prüfung und Veröffentlichung.

## 2026-09-05 – Geografie 3: Wirtschaftsstandort Österreich
Vorheriger Zielturn war Fortschritt; Regionalraumkapitel und Tests im Bestand bestätigt. RIS-Kompetenzbereich Wirtschaftsstandort erneut gelesen. Neues Kapitel geo_3_wirtschaftsstandort mit sechs Abschnitten zu Standortfaktoren/Innovation, Ansiedlung, Akteuren der ökosozialen Marktwirtschaft, Kosten/Steuern, Außenhandel und Kennzahlen. Zwölf begründete Fragen, drei Zuordnungen und offener Standort-/Beziehungs-/Datenauftrag. OeNB-Aufgaben, amtliche Sozialpartnerschaftsinformation und Statistik-Austria-BIP-Seite aktuell recherchiert. Keine garantierten Beschäftigungseffekte, keine vollständige Gewinnbehauptung aus Teilkosten, nominaler Anstieg nicht mit mehr Produktionsmenge gleichgesetzt. Karten- und aktuelle Kennzahlenrecherche als Lernaufträge; keine erfundenen aktuellen Werte.
Geografie-Integration jetzt zwölf neue Kapitel mit 88 Fragen und 36 Zuordnungen. Neue Prüfung der gerenderten Mengen/Preise/Verkaufswerte, fehlerbezogener Akteursrückmeldung, sofortiger Entwurfsspeicherung und Schulstufe bestanden. Vorherige Modelle und Lernbereich-Flowtest ebenfalls bestanden. Gemeinsamer Render-Audit 189/189 ohne Befunde/fehlende strukturierte Lernhilfen, diff --check sauber. Bildungswege/Arbeits- und Konsumentenrechte, weltweite Lebenssituationen, Vertiefungen der 4. Klasse sowie gesamte fachliche/visuelle Abnahme, Übersetzungen und Veröffentlichung bleiben offen.

## 2026-09-05 – Geografie 3: Bildungswege, Arbeit und Rechte
Vorheriger Zielturn war Fortschritt; Wirtschaftskapitel und Teststand bestätigt. Neues Kapitel geo_3_bildung_arbeit_rechte für die 7. Schulstufe: österreichische Bildungswege und Aufnahmeprüfung als Recherche, Arbeitsvertrag/Dienstzettel, Brutto/Netto, Gewährleistung/Garantie/Umtausch, Dokumentation und Beratung. Fünf Abschnitte, zehn begründete Fragen, drei interaktive Zuordnungen und Bildungswegevergleich plus Reklamationsentwurf. Österreich.gv.at und AK zu Schulwegen, Arbeitsunterlagen und Verbraucherrechten aktuell geprüft; AMS zur dualen Lehre. Rechtsüberblick auf 5.9.2026 datiert, keine pauschale Sofort-Rückzahlung, keine Gleichsetzung stationärer/Online-Käufe. Modellabrechnung ausdrücklich kein gültiger Steuersatz.
Geografie-Integration nun 13 neue Kapitel, 98 Fragen, 39 Zuordnungen: neue Prüfung der Modellabrechnung, Fehlerfeedback zur Gewährleistung, unmittelbarer Entwurfsspeicherung und Schulstufe bestanden. Vorherige Modelle und Lernbereich-Flowtest weiterhin bestanden. Render-Audit 190/190 ohne Befunde oder fehlende strukturierte Lernhilfen, diff --check sauber. Konkrete Ausbildungspflicht/Übergangshilfen, Versichern/Finanzieren und weitere Vertiefungen sind noch gezielt zu prüfen; weltweite Lebenssituationen, Geografie 4, übrige Fächer, vollständige fachliche/visuelle Abnahme, Übersetzungen und Veröffentlichung bleiben offen.

## 2026-09-05 – Übergangshilfen, Finanzieren und Versichern
Vorheriger Zielturn war Fortschritt; Bildungs-/Rechtekapitel und Autorenskript erneut geprüft. Bestehendes Kapitel um drei Abschnitte und sechs Fragen auf acht Abschnitte/16 Fragen erweitert: Ausbildungspflicht nach der Schulpflicht mit Hinweis auf anerkannte Abschlüsse und konkrete Voraussetzungen, kostenloses freiwilliges Jugendcoaching, Finanzierungsvergleich inklusive Ratenanzahl/Zusatzkosten und Grundlagen zu Prämie/Selbstbehalt/Versicherungsleistung. Österreich.gv.at, NEBA, AK und FMA aktuell recherchiert. Nicht alle Jugendlichen müssen bis 18 zwingend eine Schule besuchen; passende Ausbildung zählt. Modellraten und Selbstbehalte ausdrücklich fiktiv, keine Kreditabschlussanleitung für Minderjährige.
Autorenskript, Lernziele, Zusammenfassung, Quellen und Werkstatttitel angepasst; Inhaltsrevision auf 1, damit der alte kürzere Test keinen aktuellen Abschluss belegt. Geografietest nun 104 Fragen, ergänzt um gerenderte Finanzierungstabelle mit 276/264 Euro sowie Revisionsprüfung. Geografie- und allgemeine Revisionsregression bestanden. Fachübergreifende offene Anforderungen, weltweite Lebenssituationen, Geografie 4, Übersetzungen, vollständige fachliche/visuelle Abnahme und Veröffentlichung unverändert offen.

## 2026-09-05 – Geografie 4: Europäische Integration
Vorheriger Zielturn war Fortschritt; Bildungs-/Finanzierungsergänzungen im Bestand. RIS-Kompetenzbereich Europa/Integration erneut gelesen. Bestehendes geo_3_europa bleibt korrekt der 8. Schulstufe zugeordnet und ist auf sieben Abschnitte/zwölf Fragen erweitert: Grundwerte/Rechtsstaatlichkeit, Institutionen, vier Freiheiten und unterschiedliche EU/Euro/Schengen-Einteilungen sowie Beteiligung und gemeinsame Umweltprobleme. Werkstatt auf grenzüberschreitendes Flussbeispiel mit Interessen, Daten, Grundwerten und Gesetzgebungsrollen ausgerichtet. EU-Primärquellen zu Werten, Institutionen, Binnenmarkt und Bürgerinitiative geprüft. Keine veraltete Länderzahl oder automatische Gesetzeswirkung einer Bürgerinitiative behauptet. Ergänzungsskript complete_europe_geography idempotent für eigene Abschnitte/Metadaten; altes Grundkapitel-Generierskript darf die Ergänzung nicht nachträglich überschreiben, bei Neuaufbau Ergänzung danach ausführen.
Revision 1 verhindert aktuelle Meisterschaft aus dem alten Vier-Fragen-Test. Geografie-Integration jetzt 112 Fragen; neue Tabellenrollen, späte Transferfrage, Klasse und Revisionsverhalten geprüft. Allgemeine Revisions- und Lernbereichtests bestanden. Render-Audit 190/190 ohne Befunde oder fehlende strukturierte Lernhilfen; diff --check sauber. Weltweite Lebenssituationen, globale Bevölkerung/Urbanisierung/internationale Akteure, übrige Fachlehrplanvertiefungen, Übersetzungen, gesamte fachliche/visuelle Abnahme und Veröffentlichung offen.

## 2026-09-05 – Geografie 4: Globale Bevölkerung, Städte und Zusammenarbeit
Vorheriger Zielturn war Fortschritt; Europavertiefung im Bestand. RIS-Bereiche globale Entwicklung/eigene Perspektiven erneut gelesen. Neues geo_4_bevoelkerung_staedte für die 8. Schulstufe: räumliche Verteilung und absolute/relative Dynamik, Urbanisierung mit verschiedenen Definitionen, Migration/Flucht und differenzierte Schutzbegriffe, internationale Akteure und nachhaltige Zusammenarbeit. Vier Abschnitte, acht begründete Fragen, drei Zuordnungen, Städtevergleich mit gleicher UN-Datenfassung und Planspiel zum Wasserzugang samt Zukunftsreflexion. UN-Urbanisierungsdefinitionen 2025, UN-Organe und UNHCR-FAQ aktuell geprüft. Keine Vermischung nationaler Stadtdefinitionen mit harmonisierten Daten, keine Weltbevölkerungszunahme durch Grenzübertritt, kein automatischer Schutzstatus bei Umweltveränderung. Zahlenbeispiele ausdrücklich fiktiv.
Geografie-Integration nun 14 neue Kapitel, 120 Fragen und 42 Zuordnungen: neue Vergleichstabelle, öffentliche versus wirtschaftliche Rolle, unmittelbarer Entwurf und Schulstufe geprüft. Frühere Modelle und Lernbereich-Flowtest bestanden. Render-Audit 191/191 ohne Befunde oder fehlende strukturierte Lernhilfen, diff --check sauber. Weltweite Lebenssituationen für Klasse 1, zusätzliche Klima/planetare-Grenzen-Vertiefungen und Gesamtlehrplanprüfung bleiben zu bearbeiten; weitere Fächer, Übersetzungen, vollständige fachliche/visuelle Abnahme und Veröffentlichung ebenfalls offen.

## 2026-09-05 – Geografie 1: Lebenssituationen hier und weltweit
Vorheriger Zielturn war Fortschritt; globales Gesellschaftskapitel vorhanden. RIS-Bereiche Leben/Wirtschaften im eigenen Umfeld und weltweit erneut gelesen. Neues geo_1_lebenssituationen der 5. Schulstufe mit vier Abschnitten, acht Fragen, drei Zuordnungen und Atlas-/Kriterienvergleich. Vier ausdrücklich erfundene Profile in Wien, Nairobi (zwei unterschiedliche Fälle) und Umland von Lima; keine Interviews oder repräsentativen Landesprofile vorgetäuscht. Wohnen/Lernen, Arbeit und Mobilität, mehrdimensionale Armutsbetrachtung, Kinderrechte und Grenzen von Darstellungen. UNICEF-Österreich-Informationen zu Kinderrechten geprüft, geografische Einordnung anhand UN-Quellen plausibilisiert. Eigene private Einkommens-/Wohnverhältnisse müssen nicht offengelegt werden.
Geografie-Integration jetzt 15 neue Kapitel, 128 Fragen und 45 Zuordnungen. Neue Tabelle mit vier Wegezeiten, 300-Minuten-Wochendifferenz, Rückmeldung gegen unzulässige Verallgemeinerung und Schulstufe geprüft. Frühere Modelle und Lernbereich-Flowtest bestanden. Render-Audit 192/192 ohne Befunde/fehlende strukturierte Lernhilfen, diff --check sauber. Kein Abschluss der gesamten Fachlehrplanabnahme: Klima/Nahrungsproduktion, planetare Grenzen und weitere konkrete Anwendungstiefe sowie übrige Fächer, Übersetzungen, visuelle/fachliche Gesamtprüfung und Veröffentlichung bleiben offen.

### Landwirtschaft: Klima und Ernährung (2026-09-05)
- geo_1_ernaehrung_landwirtschaft um zwei Abschnitte erweitert: Wetter/Klima, verstärkter Treibhauseffekt, Erntebedingungen, Anpassung und Klimaschutz. Standortabhängige Grenzen und konkurrierender Wasserbedarf werden ausdrücklich behandelt.
- Vier neue Fragen mit antwortspezifischem Feedback und ein begründeter Entscheidungsauftrag; nun sechs Abschnitte und zwölf Prüfungsfragen. Quellen: GeoSphere Austria und IPCC AR6 WGII SPM. Fiktiver Gemüsebetrieb ist als Modell gekennzeichnet.
- Inhaltsrevision 1: Alte Ergebnisse gelten nicht als Beherrschung des erweiterten Stoffes. Basiserzeuger führt die idempotente Ergänzung aus.
- Verifiziert: Geografie-Integration (15 Kapitel, 132 Fragen), Versionswechsel-Test, 192/192 Kapitel strukturell in JSDOM gerendert, diff --check. Keine Aussage über vollständige fachliche, visuelle oder Lehrplanprüfung; Gesamtziel weiter offen, Veröffentlichung noch ausstehend.

### Wärmelehre: fachliche Widersprüche korrigiert (2026-09-05)
- Sechs Haupttexte neu gefasst: Temperatur/innere Energie/Wärme unterschieden; Nullpunkt als Modellgrenze; Leitung mit Elektronenbeitrag, Dämmung ohne Schutzgarantie; Sonnenstrahlung nicht nur Infrarot; Dichte und Auftrieb; Zustandswechsel bei angegebenem Druck, Verdunstung und Temperaturplateau; Ausdehnung mit Ausnahmen.
- Neun Fragen samt Feedback ersetzt; bestehende 21 Fragen bleiben im vollständigen Kapiteltest. Inhaltsrevision auf 2, damit alte Beherrschungswerte nicht gelten.
- Interaktions- und Diagramm-IDs erhalten. Laufzeittexte zum Holzgriff und Strahlungsmodell korrigiert, unbelegte Kochanimation bei Modelltemperaturen abgeschaltet. Quellen am Kapitel: OpenStax und Max-Planck-Institut.
- Tests bestanden: test_thermal_concepts (inkl. echter Topic-Funktionen mit kontrollierten Timern), test_physics_guides, test_complete_chapter_quizzes, audit_all_chapter_renders (192/192), diff --check. Keine visuelle Prüfung oder Verifikation der Videoinhalte; weitere alte Distraktoren und Medien bleiben gesondert zu prüfen.

### Übersetzungen und aktueller Prüfungsstoff (2026-09-05)
- Renderer prüft sourceRevision einer Übersetzung gegen chapterRevision. Fehlende oder unpassende Übersetzungen versionierter Kapitel verwenden das gesamte aktuelle deutsche Kapitel statt einer Mischung aus alten Fragen und neuen Experimenten.
- Strukturell unpassende Übersetzungen und fehlende Kapitel erhalten denselben sichtbaren Hinweis. Meldungen in Englisch, Arabisch, Ukrainisch, Serbisch und Türkisch; deutscher Kapitelbereich mit lang=de/dir=ltr, Hinweis mit eigener Sprach- und Richtungsangabe. Doppelte deutsche Fallbackmeldung entfernt.
- Eine aktualisierte Übersetzung muss sourceRevision auf den geprüften deutschen Revisionsstand setzen. Diese Kennzeichnung erst nach vollständigem Inhaltsabgleich vergeben. Kapitel ohne Revision bleiben im bisherigen Übersetzungsworkflow und sind damit nicht fachlich validiert.
- Tests: test_translation_revisions mit allen fünf tatsächlichen Sprachdateien (Wärmelehre: 21 aktuelle Fragen, fehlende/veraltete/aktuelle/falsche Revision), test_learning_flows, test_thermal_concepts, 192/192 strukturelle Kapitelrender, diff --check.
- Vollständige Übersetzungen und Prüfung der übrigen Sprachinhalte weiterhin offen. Die Versionssperre ersetzt keine Übersetzung und keine fachliche Freigabe. Veröffentlichung weiterhin ausstehend.

### Arbeitsblätter für Unterricht und Wiederholung (2026-09-05)
- Druckansicht aus inline-Script nach js/worksheet.js ausgelagert. Aktuelle Kapitelaufgaben enthalten Antwortoptionen, Platz für Begründungen sowie optional druckbare Lösungen und Feedback. Fragen aus Abschnitten, topic.quizzes und Diplom werden berücksichtigt, Dubletten und practiceOnly ausgeschlossen.
- Lernziele, korrekte Fachangabe für Mathematik/Physik, Link zum zugehörigen Lernkapitel. Kontextabhängige Aufgaben ausdrücklich zur Bearbeitung mit dem Kapitel, keine Behauptung eines eigenständigen vollständigen Prüfungsblatts.
- Dynamische Rechenübungen bleiben erhalten; Hinweis unterscheidet variable Zahlen und unveränderte Kapitelaufgaben. Druck erst nach erfolgreichem Laden/Typesetting, verständliche Fehler bei fehlendem Topic/HTTP-Fehler. Druckansicht nun in Physikkapiteln direkt verlinkt.
- test_worksheets bestanden (21 Wärmefragen, Optionen/Lösungen, Vergleiche mit < und >, Dubletten, dynamische Bruchübungen, Fehlerzustände), test_physics_guides, test_thermal_concepts, diff --check. Tatsächlicher PDF-Seitenumbruch und MathJax-Netzwerkladen noch nicht visuell geprüft; alter dynamischer Aufgabengenerator noch nicht vollständig fachlich geprüft.

### Testauswertung bei vollem Browserspeicher (2026-09-05)
- Fehler beim Schreiben von sciverse_chapter_quiz_results brechen die Auswertung nicht mehr ab. Ergebnis, alle Rückmeldungen und deaktivierte erneute Abgabe bleiben sichtbar; ein ausdrücklicher Hinweis nennt fehlende dauerhafte Speicherung und empfiehlt, Hinweise vor dem Schließen zu notieren.
- Spielpunkte werden bei fehlgeschlagener Ergebnisspeicherung nicht vergeben. Fehler im separaten Punktespeicher oder beschädigtes Punkte-JSON verhindern die Lernrückmeldung nicht; Hinweis unterscheidet gespeichertes Testergebnis und fehlgeschlagene Punkteaktualisierung.
- readChapterQuizResults verwirft null/Arrays/primitive Strukturen statt bei der folgenden Verarbeitung abzustürzen.
- test_quiz_storage_failures bestanden: QuotaExceededError für alle Writes, nur Punkte-Writes, beschädigtes JSON, null-Ergebnis und regulärer Erfolg. Regression: learning_flows, chapter_revisions, complete_chapter_quizzes, diff --check bestanden.
- Noch keine allgemeine Export-/Importfunktion. Vollständig gesperrter Storage-Zugriff beim Start und Speicherpfade anderer Übungen sind gesondert zu prüfen. Gesamtziel und Veröffentlichung weiter offen.

### Elektrizitätslehre: Ladung und Energie (2026-09-05)
- Haupttexte zu Atommodell, Ladungsträgern, Stromkreis, Batterie/Elektrolyt, Kondensator und Ohmschem Gesetz fachlich neu gefasst; gerichteter Transport bereits vorhandener Elektronen, Ionenleitung und technische Stromrichtung unterschieden. Widerstandserwärmung nicht mehr durch gegenseitiges Reiben der Elektronen erklärt.
- Sechs bestehende Fragen aktualisiert, altes separates Punkte-Finale durch zwei regulär erfasste Transferfragen ersetzt. Nun 13 Kapiteltestfragen. Revision 1 schützt vor alten Ergebnissen und aktiviert den Übersetzungsabgleich.
- Bestehende Diagramm-/Interaktionsbereiche erhalten; Ohm-Lampenhelligkeit explizit als schematische Stromanzeige. Reale Glühlampen nicht als konstante Widerstände dargestellt. Quellen: OpenStax.
- test_electricity_concepts bestanden (13 Fragen, Altfinale entfernt, Inhaltsrevision, vier U/R-Fälle mit zugänglichen Werten), test_physics_guides, 192/192 strukturelle Kapitelrender, diff --check. Bildliche Modelltreue und externe Medien noch nicht umfassend geprüft; Gesamtziel bleibt offen.

### Zusammengeführte Funktionsprüfung (2026-09-05)
- Neuer Einstieg: node scripts/run_functional_tests.js. Er entdeckt sämtliche scripts/test_*.js, führt jede Suite in einem eigenen Node-Prozess aus, protokolliert Ausgaben/Exitstatus/Laufzeit, setzt bei jedem Fehlschlag einen fehlgeschlagenen Gesamtstatus und schreibt ../functional-test-report.json. Keine Tests werden nach einem ersten Fehler übersprungen.
- Tatsächlicher Gesamtlauf: 29 von 29 Suiten bestanden. Erfasst die derzeit vorhandenen Tests für Lernwege, Kapitelversionen, vollständige Quizpools, Speicherfehler, Sprachversionsauswahl, Arbeitsblätter sowie die vorhandenen Fach-/Modelltests.
- Separater Datencheck: keine fehlenden Feedbackfelder in den strukturierten deutschen Fragen (Abschnitt, Kapitel, Diplom). Die zwei Zusatzspiele mathespiel und math_kaenguru sind die einzigen Navigationseinträge ohne diese Standard-Quizdaten; eigene Spielaufgaben wurden dadurch nicht geprüft.
- Grenzen: Feldbelegung beweist keine richtige Erklärung. Keine Aussage zur Vollständigkeit des Lehrplans, Qualität sämtlicher Distraktoren, Alt-HTML-Aufgaben, Browserlayout, Medien oder Veröffentlichung. Diese Abnahmepunkte bleiben offen.

### Lokale Medien und steuerbare Lernvideos (2026-09-05)
- Neuer audit_chapter_media.js prüft Medienreferenzen in den sechs angebotenen Sprachdateien, lokale Dateiexistenz und Video-Bedienelemente. Externe Verweise werden ausdrücklich nur inventarisiert, nicht als erreichbar behauptet.
- Gefunden und entfernt: 23 kaputte WebM-Alternativquellen, jeweils bei vorhandener MP4-Quelle. 46 Videoeinbettungen haben nun controls und preload=metadata, kein autoplay. Native Pausen-/Abspielfunktion für selbstbestimmtes Lerntempo.
- Alle acht vorhandenen MP4-Dateien mit ffprobe lesbar: H.264-Videostreams, Laufzeiten 12–15 Sekunden (Wärmelehre 14,4 s), keine Audiospuren gemeldet. Dies prüft Container/Stream-Metadaten, keine fachliche Bildtreue oder vollständige Dekodierung.
- Nach Reparatur: 219 Medienreferenzen, davon 173 externe; keine fehlenden lokalen Dateien und keine Video-Control-Funde. test_translation_revisions und diff --check bestanden. Bericht ../chapter-media-audit.json.
- Offen: externe Medienverfügbarkeit, Rechte-/Quellenzuordnung, inhaltliche Prüfung aller Animationen und tatsächliche Wiedergabe im Browser. Gesamtziel weiter offen.

### Externe Medien: HTTP-Prüfung ohne falsche Löschungen (2026-09-05)
- check_external_media.js inventarisiert eindeutige externe Bildadressen aus chapter-media-audit.json und protokolliert HTTP-Status/Content-Type/Weiterleitung. Vier parallele Worker, 15-s-Timeout. 69 unterschiedliche Adressen hinter 173 Einbettungen.
- Erstbefund: 32 image-reachable, eine NASA-Adresse mit HEAD 404, 36 Wikimedia-Adressen mit HTTP 429. Ein normaler GET derselben NASA-Adresse liefert 200 image/png; die vermeintlich fehlende Datei war damit nicht bestätigt defekt. Keine Bildquelle entfernt.
- Checker bestätigt 404/410/405 künftig per GET und bricht den Body nach den Headern ab. HTTP 429 wird nicht erneut angefragt, nicht als fehlendes Bild klassifiziert und nicht umgangen.
- Aktueller Bericht ../external-media-check.json: 33 Bildadressen mit erfolgreichem HTTP-Bildtypnachweis, 36 wegen Rate-Limit unverifiziert. Offizielle NASA-Quellseite der Zeitstrahlgrafik geprüft: https://science.nasa.gov/asset/webb/first-stars-timeline-of-the-universe/ .
- Grenzen: HTTP-Erfolg beweist keine richtige Bildbeschreibung, ausreichende Auflösung, Browserdarstellung oder Lizenz. Diese Prüfungen bleiben offen. Syntaxcheck und diff --check bestanden; keine Änderung der Lehrinhalte in diesem Schritt.

### Kapitelreihenfolge und Weiterlernen (2026-09-05)
- Fachinterne Voraussetzungen über die gesamte Navigation geprüft. Physik ohne Rückwärtsabhängigkeit. Word-Werkstatt in DGB hinter dgb5_handeln verschoben; damit stehen dgb5_information und dgb5_handeln vorher. Gemeinsame Curriculumquelle aktualisiert.
- Kapitelende in core-learning.js erhält Vorheriges/Nächstes Kapitel mit Schulstufe sowie Rückkehr zur Stoffliste. Normaler Lernmodus bleibt innerhalb des Fachs. Wiederholungsmodus verwendet nur eine gespeicherte Stoffliste, die das aktuelle Kapitel enthält; unbekannte Einträge und Dubletten entfernt, kein unbeabsichtigter Wechsel zur Fachreihenfolge bei fehlender Liste.
- Ende des Fachs bzw. der Stoffliste wird erklärt. Keine Sperre durch Quizstatus, keine automatische Navigation. Stabile Links für GitHub-Pages-Unterverzeichnis und eingebettete Kapitel.
- test_chapter_navigation, test_physics_guides, test_learning_flows bestanden. Prüfungen umfassen Anfang/Mitte/Ende, fachübergreifende Stoffliste, ungültige Liste, mehrfache Initialisierung und fachinterne Reihenfolge aller expliziten Voraussetzungen. Dies ersetzt nicht die didaktische Prüfung ungenannter Voraussetzungen oder die Lehrplanzuordnung.

### Klassenübergreifende Grundlagen im Filter (2026-09-05)
- Fehler behoben: bisher erkannte grade() bei „5./6. Schulstufe“ nur die 6. Schulstufe; „Grundlagen“ erschien bei keinem Klassenfilter. gradeLevels() unterstützt explizite Schulstufenlisten und vorhandene Klassen-/Schulstufenbeschriftungen.
- Word-Werkstatt mit gradeLevels [5,6]; Messen und Einheiten mit [6,7,8] und sichtbarer Beschriftung „Grundlagen für die 6.–8. Schulstufe“. Keine pauschale Zuordnung aller Extras/Vertiefungen zu jeder Klasse.
- Erweiterter test_learning_flows prüft beide Word-Klassen, Ausschluss in Klasse 3 sowie Messgrundlagen in allen drei Physikjahrgängen. test_chapter_navigation ebenfalls bestanden; keine Rückwärtsabhängigkeiten eingeführt.
- Dies korrigiert Auffindbarkeit vorhandener Inhalte. Es ersetzt nicht die noch offene vollständige Lehrplanprüfung oder Differenzierung des Schwierigkeitsgrads.

### Wetter: Messgrößen und Modellgrenzen (2026-09-05)
- Fünf Haupttexte überarbeitet: Messort/-zeit/-bedingungen, Druckgradient statt ausnahmslos geradlinigem Hoch-Tief-Wind, Ladungstrennung bei Gewittern, Niederschlagsentstehung und mehrere Antriebe der Meeresströmungen. Golfstrom nicht als alleinige Erklärung europäischer Winter.
- Sieben Fragen mit Feedback ersetzt; 11 Gesamtfragen bleiben. Revision 1 invalidiert alte Ergebnisse und aktiviert Übersetzungsversionsvergleich.
- Topic-JavaScript: relative Luftfeuchtigkeit als Verhältnis zum temperaturabhängigen Sättigungswert, Schnee durch Kristallwachstum, Graupel durch Anfrieren unterkühlter Tröpfchen, Hagel nicht ausschließlich im Sommer. Interaktive Controls erhalten.
- Quellen im Kapitel: NOAA und MeteoSchweiz. test_weather_concepts (Render, Revision, 11 Fragen, Hygrometer und alle vier Niederschlagsbeschreibungen), test_physics_guides und diff --check bestanden. Animationen selbst noch nicht visuell/fachlich vollständig überprüft.

### Eindeutige Auswahlantworten in allen Sprachdateien (2026-09-05)
- audit_quiz_feedback.js erweitert: nichtleere Frage/Antworten, mindestens zwei Optionen, exakt eine boolesch richtige Antwort, keine identischen Antworttexte sowie vorhandenes Feedback. Rekursive Prüfung aller Sprach-JSONs, nicht nur aktuell dargestellter Kapitel.
- Zwei echte arabische Dubletten gefunden und korrigiert: astronomische Reihenfolge Meteoroid/Meteor/Meteorit und Objektiv/Okular im Mikroskop. Identischer Text war jeweils widersprüchlich als richtig und falsch markiert. Mikroskopbegriffe jetzt الشيئية / العينية, Astronomie mit arabischen Beschreibungen und eindeutigen internationalen Begriffen. Englisches „The lens“ bei Objektiv zu „The objective lens“ präzisiert.
- Nach Korrektur 4856 strukturierte Frageeinträge aus allen Dateien ohne diese Strukturfehler. test_translation_revisions und diff --check bestanden.
- Übersetzungsrevisionen nicht als aktuell freigegeben: Einzelkorrekturen ersetzen keine vollständige Übersetzung der überarbeiteten Kapitel. Inhaltliche Mehrdeutigkeit trotz verschiedener Texte und fachliche Richtigkeit bleiben gesondert zu prüfen.

### Tastaturfokus bei Kapiteltests (2026-09-05)
- Öffnen fokussiert die Testüberschrift; zuvor aktives Steuerelement wird gemerkt. Schließen stellt den Fokus auf den sichtbaren Auslöser zurück, ersatzweise auf den Startknopf im Kapitelcheck.
- Unvollständige Abgabe fokussiert die erste unbeantwortete Radiogruppe und verknüpft sie per aria-describedby mit der Fehlermeldung. Fehlerattribute werden beim nächsten Versuch bereinigt; keine Speicherung unvollständiger Antworten als Testergebnis.
- Auswertung fokussiert die Ergebnisüberschrift mit Prozentwert in der zugänglichen Bezeichnung. prefers-reduced-motion schaltet weiches Scrollen aus. Funktioniert auch ohne scrollIntoView in der Testumgebung.
- test_quiz_focus besteht für normale/reduzierte Bewegung, Öffnen, Fehlereingabe, vollständige Auswertung und Rückkehr. Regressionen learning_flows, quiz_storage_failures, complete_chapter_quizzes und diff --check bestanden. Tatsächliche Screenreader-Ausgabe und Browserlayout bleiben gesondert zu prüfen.

### Geografie Klasse 4: globale Umweltveränderungen und Entscheidungen (2026-09-05)
- Lehrplantext am Kompetenzbereich/Anwendungsbereich der 4. Klasse geprüft: Anthropozän, Belastungsgrenzen, Globalisierung/Deglobalisierung und Handlungsstrategien verschiedener Akteure sind ausdrücklich genannt.
- geo_4_globalisierung von drei auf sechs Abschnitte, vier auf zehn Quizfragen erweitert. Neue Inhalte: Anthropozän mit Abgrenzung zur nicht formalisierten geologischen Epoche; planetare Belastungsgrenzen als Risikomodell; Verlagerung/Diversifizierung von Lieferbeziehungen; mehrere Handlungsebenen mit Kostenvergleich eines fiktiven Kostümprojekts.
- Drei Arbeitsaufträge zu datierter Forschungsquelle, Lieferbeziehungen und begründeter Gruppenentscheidung. Keine undatierten aktuellen Überschreitungszahlen. Lernziele, Zusammenfassung, Quellen und Werkstattnummer aktualisiert. Inhaltsrevision 1 gegen alte Meisterungswerte.
- Quellen: vorhandener aktueller RIS-Text, Stockholm Resilience Centre, IUGS/ICS. test_geography_chapters (15 Kapitel, 138 Fragen), audit_quiz_feedback (4862 Einträge) und diff --check bestanden. Dies schließt eine konkrete Lehrplanlücke, keine abschließende Abnahme des gesamten Geografielehrplans.

### Gezielte Wiederholung statt bloßer Fragenliste (2026-09-05)
- Quiznormalisierung führt sectionIndex für Abschnittsfragen; kapitelweite Fragen werden nur über vorhandene QUIZ-Platzhalter zugeordnet. Übergreifende Diplomfragen erhalten keine geratene Zuordnung.
- Falsch beantwortete, zuordenbare Fragen bieten direkt in der Auswertung einen Wiederholknopf. Er beendet die Testansicht, zeigt den Lerninhalt und fokussiert die passende Überschrift. Gespeicherte Wiederholungsbedarfe erhalten beim nächsten Öffnen Abschnittslinks; übergreifende Fragen verweisen auf die vorhandene Zusammenfassung.
- Section-Zuordnung über data-chapter-section, ohne Abhängigkeit von zusätzlichen Lernziel-/Navigationskarten. IDs und Bewertungen der Fragen unverändert, deshalb keine Inhaltsrevision nötig.
- test_targeted_review (13 Elektrizitätsfragen, sichtbarer/fokussierter Zielabschnitt, persistente Links, Topic-Platzhalter und keine geratene Diplomzuordnung), test_complete_chapter_quizzes, test_quiz_focus, test_learning_flows und diff --check bestanden.

### Messgrundlagen und Messunsicherheit (2026-09-05)
- sieinheiten enthält nun einen praktischen Auftrag zum wiederholten Messen einer Heftkante und zwei neue Verständnisfragen (insgesamt 17). Streuung, gleichbleibende Fehler und Grenzen der Anzeige sind getrennt erklärt. Inhaltsrevision 2 berücksichtigt die erweiterten Anforderungen.
- Größenwert als Zahlenwert mal Einheit formuliert; Einheit vom Messgerät unterschieden. Titel, Untertitel und Lernzielbox an die Erklärung angepasst. Mittlere Geschwindigkeit einschließlich Pausenzeit erklärt und in der interaktiven Ausgabe benannt. Vorgegebene Diagrammdaten auch während der Animation als Modellwerte bezeichnet.
- test_measurement_basics besteht: gerenderte 17 Fragen, Begriffe, alte Ergebnisse als veraltet, drei Geschwindigkeitsfälle, Diagrammablauf. test_physics_guides besteht für 20 Physikkapitel; audit_quiz_feedback prüft 4864 strukturierte Fragen ohne Strukturfehler. Kein Nachweis vollständiger fachlicher, visueller oder übersetzungsbezogener Abnahme.

### Kraft, Bewegung und Kräftegleichgewicht (2026-09-05)
- Trägheitsgesetz auf resultierende Kraft bezogen; Kräftegleichgewicht am Buch von Wechselwirkungskräften auf Buch und Erde unterschieden. Haftreibung als anpassungsfähige Kraft bis zum Grenzwert erklärt, Rollwiderstand mit Bedingungen statt pauschaler Rangfolge. Partnerauftrag verwendet Kraftpfeile anstelle des bisherigen Rollbrett-/Sockenversuchs.
- Neues interaktives Modell mit zwei entgegengesetzten waagrechten Kräften, fester Masse, signierter Beschleunigung und Erklärung des Unterschieds zwischen Bewegungs- und Beschleunigungsrichtung. Vorhersageauftrag und zwei Transferfragen; insgesamt 25 Fragen. Bestehendes Kraft-Masse-Labor nennt ausdrücklich die resultierende Kraft und die Grenzen der Animation.
- Verständnisfragen zu Trägheit, Haftreibung, Wechselwirkung, Fallbedingungen und Masse angepasst. Inhaltsrevision 2; ältere Meisterungswerte werden nicht als aktueller Nachweis übernommen. Quellen: OpenStax/Newton 1 und 2 sowie Reibung; The Physics Classroom/Newtons Gesetze.
- test_force_concepts besteht mit sechs Fällen für resultierende Kräfte (null, positiv, negativ) und drei Kraft-Masse-Fällen sowie gerenderten Fragen. test_physics_guides für 20 Kapitel bestanden; Fragen-Strukturaudit 4866 Einträge. Visuelle Prüfung und fachliche Prüfung aller übrigen Bestandsmodelle bleiben offen.

### Gemeinsame Funktionsprüfung und robuste Stoffliste (2026-09-05)
- Vor dem aktuellen Stofflisten-Fix besteht der gemeinsame Funktionslauf mit 35/35 Suiten. Der Bericht ist eine Momentaufnahme dieses Stands, keine fachliche oder visuelle Gesamtabnahme.
- learning.js fängt nun auch den direkten Zugriff auf die gespeicherte Farbdarstellung ab. Bei vollständig gesperrtem localStorage werden Beschreibungen weiterhin geladen; Auswahl und Teilen bleiben im Arbeitsspeicher möglich. Dauerhafte Speicherung wird bei Fehlschlag weiterhin ausdrücklich als nicht verfügbar gemeldet.
- Stabile Fokuskennungen erhalten die Tastaturposition beim Aktualisieren der Kapitel-/Stoffliste. Nach Entfernen eines fokussierten Stofflisteneintrags erhält die Listenüberschrift den Fokus.
- Neue Suite test_learning_resilience prüft normalen und vollständig gesperrten Speicher, geladene Beschreibungen, Auswahl, Linkfreigabe, Speicherereignis und Fokus nach Entfernen. Sie sowie test_learning_flows und test_learning_access bestehen nach dem Fix. Nun 36 vorhandene Suiten; der letzte vollständige Lauf erfasste die vorherigen 35.

### Reihenfolge der Stoffliste bearbeiten (2026-09-05)
- Ausgewählte Kapitel lassen sich mit benannten Schaltflächen nach oben oder unten verschieben. An den Grenzen verhindern aria-disabled und die Aktionsprüfung ein Verschieben über den Listenrand; der Tastaturfokus bleibt am zugehörigen Steuerelement. Die Statusmeldung nennt die neue Position.
- Die Set-Reihenfolge wird lokal gespeichert und in den geteilten Link übernommen. Nach Änderungen wird ein zuvor erzeugter Link ausgeblendet, damit keine veraltete Reihenfolge kopiert wird. Die bestehende Wiederholungsnavigation verwendet diese Reihenfolge bereits.
- test_study_plan_order prüft beide Richtungen, Grenzen, Fokus, Speichern, Link und erneutes Öffnen sowie gesperrten Speicher. test_learning_resilience, test_learning_flows und test_chapter_navigation bestehen ebenfalls. Druck nutzt dieselbe geordnete Liste; die tatsächliche Druckdarstellung ist noch nicht visuell abgenommen.

### Energie, Bilanz und Leistung (2026-09-05)
- Energie-Kapitel korrigiert: Energie ruhender Körper, Referenzniveau der Lageenergie, abgeschlossenes System, Übertragung an die Umgebung, innere Energie und Wärme, endliche Verfügbarkeit erneuerbarer Quellen sowie Ladungstransport im Metall. Quellen: OpenStax Energieerhaltung und EIA erneuerbare Quellen.
- Pendel als ideales Modell gekennzeichnet; Stoppknopf behauptet keinen simulierten Reibungsprozess mehr. Windregler zeigt qualitative Modellstufen und eine Sturmabschaltung statt stetig steigender Stromproduktion; Neustart bei geringerer Stufe möglich. Keine realen Windgeschwindigkeiten oder Leistungskurve behauptet.
- Neuer Abschnitt zu einer fiktiven 100-J-Lampenbilanz und mittlerer Leistung P=E/t, zwei neue Fragen, insgesamt 17 eindeutige Fragen. Verständnisfragen zur Erhaltung und erneuerbaren Energie überarbeitet. Inhaltsrevision 2.
- test_energy_concepts prüft 17 gerenderte Fragen, sechs Windzustände, Pendelstopp, Stromkreisschalter und alte Ergebnisse. test_physics_guides und Fragen-Strukturaudit (4868 Datensätze) bestanden.
- Bei der gleichzeitigen Sichtung von arbeit wurden weitere offene fachliche Stellen festgestellt: Vorzeichen und Bedingungen von W=F·s, Systemgrenze beim Halten, innere Energie bei Reibung, idealer Flaschenzug. Diese sind noch zu bearbeiten. Keine Gesamtabnahme oder Veröffentlichung.

### Mechanische Arbeit und Kraftrichtung (2026-09-05)
- Arbeit-Kapitel unterscheidet Arbeit einer benannten Kraft am Gegenstand von Energieumsetzung im Muskel. W=F·s gilt ausdrücklich für konstante Kraft in Wegrichtung. Entgegengerichtete Kraft verrichtet negative, senkrechte Kraft keine Arbeit. Hubarbeit mit gleichmäßiger Bewegung und Modellbedingungen; ideale Maschinen von realer Reibung abgegrenzt. Quelle: OpenStax, Work: The Scientific Definition.
- Bestehendes Rechenlabor um Richtungswahl erweitert. Vorzeichen erscheint im Ergebnis, Balken zeigt den Betrag. Reibungsmodell erklärt positive Zugarbeit und negative Reibungsarbeit bei gleichbleibender Geschwindigkeit und benennt innere Energie. Sechs vorhandene Fragen korrigiert, insgesamt 15; Inhaltsrevision 2.
- test_work_concepts prüft drei Richtungen, Betrag des Balkens, beide Reibungsbilanzen und gleiche ideale Rampenarbeit sowie Render und Revision. Web-Animation-API im JSDOM-Test ersetzt; tatsächliche Animation nicht visuell geprüft. test_physics_guides und audit_quiz_feedback (4868 Datensätze) bestanden.

### Unterrichtsansicht und druckbare Stoffliste (2026-09-05)
- Unterrichtsmodus zeigt keine persönlichen Quizstände oder Erfolgsanzahl. Die Lern-/Wiederholungsmodi behalten diese Angaben, gespeicherte Ergebnisse bleiben unverändert. Kapitelaktionen heißen im Unterrichtsmodus Kapitel ansehen.
- Stofflisteneinträge enthalten jetzt auch das Fach neben Schulstufe, Titel und Lernzielen. Print-CSS schließt persönliche Ergebnisse in allen Modi aus und setzt die Druckfarben auch bei aktivem Dunkelmodus auf Schwarz/Weiß.
- Die Positionsmeldung nach Sortieren erhält die separaten Ergebniselemente, damit der Druckausschluss wirksam bleibt.
- test_teaching_plan prüft Modiwechsel mit gespeichertem Ergebnis, Lernziele/Fach, Ergebnisfreiheit im Unterricht, Erhalt des Speichers, Sortiermeldung, CSS-Druckausschluss und Link. test_study_plan_order und test_learning_flows bestehen. Tatsächliche Druckseiten bleiben visuell zu prüfen; CSS-/DOM-Prüfung allein ist kein Layoutnachweis.

### Elektromagnetismus: Rückmeldungen und Modellgrenzen (2026-09-05)
- Zehn Diplomfragen em_d6 bis em_d15 hatten fachlich fremde Rückmeldungen. Fragen, Antworten und Erklärungen sind nun zusammenhängend überarbeitet; Induktion trennt Spannung von Strom und setzt Änderung des magnetischen Flusses voraus. Zwei Abschnittsfragen ebenfalls korrigiert. Insgesamt weiterhin 21 Fragen, Inhaltsrevision 2.
- Spule, Lorentzkraft, Generator und Transformator mit Bedingungen erklärt. Feldlinien als Modell; prozentartige Regler als relative Stufen. Schüttellampe zeigt einen schematischen Energiespeicher, keine elektrische Ladungsmessung. Werbliche Behauptungen zur Video-Genauigkeit und technische Herstellungsdetails entfernt.
- Unbelastetes ideales Trafomodell: keine Stromteilchen am offenen Sekundärkreis, Feldstärke beim Ändern von N₂ konstant; 230 V und geringe Windungszahlen ausdrücklich Bildschirm-/Schemamodell. Stromloser gerader Leiter zeigt keine von ihm erzeugten Feldlinien.
- Quellen: OpenStax Induktion und Transformatoren. test_electromagnetism_concepts besteht für drei Übersetzungen, konstantes Feld, offene Sekundärseite, Nullstrom und Relais; test_physics_guides und Quiz-Strukturaudit (4868) bestehen. Bildgeometrie, Video und vollständiger Magnetismusbestand bleiben visuell/fachlich weiter zu prüfen.

### Statik-Begriffe und weitere Quizrückmeldungen (2026-09-05)
- drehundstatik: Hebelarm als senkrechter Abstand zur Wirkungslinie definiert; Zeichenauftrag mit 8 N·m/2 N·m/Nullfall ergänzt. Kippkriterium nennt Lotlinie, feste waagrechte Unterlage und Grenzen des Seiltänzermodells. Gleichgewichtsarten unterscheiden Auslenkung, Rückstellwirkung und Dämpfung. Pirouette nennt fehlendes äußeres Drehmoment und Muskelarbeit bei möglicher Zunahme der Rotationsenergie. Inhaltsrevision 2.
- Quizdefinitionen zu Hebelarm, Kippen und Pirouette angepasst. Quellen: OpenStax Drehmoment und Stabilität. Modelltexte zu Balance und Kreisbewegung präzisiert. Die bestehenden Bewegungsabläufe wurden dabei nicht numerisch geändert.
- Akustik f8: falscher Ultraschallbezug beim hohen Vogelgesang ersetzt; f10 Tippfehler korrigiert. Keine neue Akustikrevision, da richtige Antwort und geprüfte Kompetenz unverändert bleiben.
- test_physics_guides für alle 20 Physikkapitel und audit_quiz_feedback für 4868 Datensätze bestanden. Diese Sichtung ist keine vollständige semantische Prüfung sämtlicher übriger Physikfragen oder visueller Modelle.

### Akustik: Messgrößen und Resonanzmodell (2026-09-05)
- Mikrofon und Oszilloskop unterschieden, Kurve als zeitlicher Signalverlauf statt Teilchenbahn erklärt. Schalldruckamplitude von logarithmischem Schallpegel getrennt; Lautheitsvergleich mit gleichen Hörbedingungen. Schallteilchen schwingen lokal, Schallgeschwindigkeit mit Medium-/Temperaturbedingung.
- Resonanz erklärt Anregung und Dämpfung. Glasmodell verwendet relative Frequenzstufen, keine fiktiven 4 Hz. Automatischer Glasbruch und dauerhafte Sperre ersetzt durch reversibel stärkere/schwächere Schwingung. Quellen: OpenStax Schall und Resonanz. Inhaltsrevision 2.
- test_acoustics_concepts besteht für 21 gerenderte Fragen und sechs Modellzustände, einschließlich Rückkehr vom Maximum. test_physics_guides und audit_quiz_feedback bestehen; visuelle und akustische Prüfung aller übrigen Abläufe bleibt offen.

### Aussagekräftigere Fehlantworten im Kraft-Kapitel (2026-09-05)
- Gesamtplan erneut gelesen: Plausible Fehlvorstellungen statt absurder Alternativen ist ein offenes Abnahmekriterium. Im Kraft-Diplom zehn falsche Antworten ersetzt und die bisherige reine Hebel-Aufzählung als Scheren-Anwendung neu gefasst.
- Abgedeckte Fehlvorstellungen: Kraft als Bewegungsvorrat, Trägheit beim Fallen, Kräftepaare am selben Körper, Rakete braucht Umgebungsluft, umgekehrter Masse-Kraft-Zusammenhang, Beschleunigung nur als Tempoanstieg, Masse gleich Kraft, Hebel spare gleichzeitig Weg/Arbeit. Rückmeldungen erklären den jeweiligen Fehler. Weiterhin 25 Kapitelcheckfragen.
- Inhaltsrevision 3 invalidiert auch Ergebnisse aus Revision 2. test_force_concepts, audit_quiz_feedback und test_translation_revisions bestehen. Das Kriterium plausibler Fehlantworten ist für übrige Kapitel weiterhin nicht vollständig erfüllt; keine umfassende Abnahme behauptet.

### Vollständige Lernziele vor Stofflistendruck (2026-09-05)
- Lernbereich unterscheidet Laden, Fehler und geladene Inhalte. Druck wird erst bei vorhandenen Lernzielen/Abschnittszielen für alle ausgewählten Kapitel freigegeben. Der Druckhandler prüft dies zusätzlich. Teilen und Öffnen bleiben unabhängig davon möglich.
- Eigener Status und Wiederholungsknopf nach Ladefehler oder unvollständiger Auswahlbeschreibung; Auswahl bleibt unverändert. Falsche JSON-Grundstruktur wird als Fehler behandelt. Keine Behauptung, dass diese Prüfung die inhaltliche Vollständigkeit der Lernziele beweist.
- test_study_plan_loading prüft verzögerten Abruf, HTTP-Fehler, null-Payload, fehlendes Kapitel, Wiederholung bis Erfolg und Druckfreigabe. test_learning_flows, test_learning_resilience und test_teaching_plan bestehen.

### Vollständiger technischer Prüflauf nach den Erweiterungen (2026-09-05)
- run_functional_tests: 43/43 Suiten bestanden. audit_all_chapter_renders: 192/192, keine fehlenden Lernhilfen, keine im Audit erfassten Fehler. Zusätzliche Prüfung aller deutschen Abschnittsinhalte findet keine doppelten IDs innerhalb eines Kapitels.
- Konsolidierten Nachweisstand im verbindlichen Produktplan von historischen 29 auf aktuelle 43 Suiten aktualisiert. Die Grenzen der Prüfung und fehlende Gesamtabnahme bleiben ausdrücklich dokumentiert. Keine Fehler im aktuellen Prüfumfang; nächste Arbeit betrifft die offenen fachlichen, didaktischen und tatsächlichen Darstellungsanforderungen.

### Chemie: Teilchenmodell und Diffusionsbeobachtung (2026-09-05)
- Aggregatzustand mit Stoff-, Temperatur- und Druckabhängigkeit; Reglerstufen ausdrücklich schematisch. Diffusion von möglichen Strömungsbeiträgen im Farbversuch getrennt. Versuch auf Lebensmittelfarbe konkretisiert. Aussagekräftige Rückmeldungen für vier Diplomfragen und überarbeitete Anwendungsfrage. Inhaltsrevision 1.
- Modellfehler behoben: Gaszustand zeigt jetzt wie Feststoff/Flüssigkeit 22 statt 16 Teilchen. Moduswechsel übernimmt den laufenden Animationsstatus; es entstehen keine zusätzlichen requestAnimationFrame-Schleifen.
- test_chemistry_particles prüft 7 gerenderte Fragen und fünf Zustandswechsel mit jeweils 22 gezeichneten Teilchen und genau einer ausstehenden Animationsfortsetzung. Renderaudit 192/192 und Quiz-Strukturaudit 4868 bestanden. Stofftrennung wurde mitgesichtet, bleibt aber fachlich/didaktisch noch zu überarbeiten.

### Chemie: Trennziel und Grenzen der Verfahren (2026-09-05)
- Rückstand/Filtrat und Porengröße erklärt; Papierfiltration entfernt gelöstes Kochsalz nicht. Eindampfen und Destillieren anhand der Rückgewinnung von Salz bzw. Wasser unterschieden. Planungsauftrag zur Rückgewinnung aller drei Bestandteile ergänzt.
- Chromatografie berücksichtigt Laufmittel und Papier; Wasser eignet sich nicht für jede Farbe, ein Fleck beweist keine Reinheit. Vier Diplomfragen durch Anwendungen mit plausiblen Fehlvorstellungen ersetzt, Filterfrage präzisiert. Sieben Fragen insgesamt, Inhaltsrevision 1. Quellen: RSC Trennung und Chromatografie.
- Interaktive Auswahl erklärt für jedes der drei Gemische die Eigenschaft und Einschränkungen. test_chemistry_separation, Regression test_chemistry_particles und audit_quiz_feedback (4868) bestanden. Kein vollständiger Chemielehrplan- oder visueller Nachweis.

### Chemische Reaktionen: Bilanz und Beobachtung (2026-09-05)
- Neuer Abschnitt erklärt exotherm/endotherm, Aktivierungsenergie, Bindungsenergie und Masse im offenen System anhand eines ausdrücklich fiktiven 120,0-g/119,2-g-Beispiels. Zwei neue Fragen; neun insgesamt. Inhaltsrevision 1.
- Ausgleichen verändert Koeffizienten, keine Stoffformeln. Hinweiszahl ist kein Reaktionsnachweis; derselbe Vorbehalt gilt nun auch im interaktiven Hinweis-Sammler. Endotherm-Frage mit plausiblen Alternativen und konkreter Rückmeldung.
- test_chemistry_reactions prüft gerenderten Inhalt, alle gesammelten Hinweise sowie ausgeglichene, unausgeglichene und leere Methangleichung. Quiz-Strukturaudit 4870 Datensätze bestanden. Quelle: OpenStax Thermochemie. Weitere knappe Bestandsrückmeldungen und gesamte Chemielehrplanabdeckung bleiben offen.

### pH-Kapitel: Neutralisation und Aussagegrenzen
- Neutralisation als Säure-Base-Reaktion erklärt; Verdünnung, Stoffmengen und verbleibende Salz-Ionen unterschieden. Ein Endwert von 7 ist nicht allgemein garantiert.
- Schulmodell auf wässrige Lösungen bei etwa 25 °C bezogen. Probenwerte und Farben als schematisch markiert, Rotkraut-Farbvergleich ergänzt. Natron-Beispiel von pH 12 auf gerundet 8 korrigiert.
- Sieben Fragen mit überarbeiteten Fehlvorstellungen; Inhaltsrevision 1 macht alte Ergebnisse als veraltet erkennbar.
- test_chemistry_ph.js prüft Darstellung, Probenwahl, fünf Reglerwerte und Rücksetzen der Auswahl. Fragenstrukturprüfung: 4870 Datensätze ohne Strukturfehler; keine Aussage über vollständige fachliche oder übersetzte Qualität. Änderungen lokal, Browserdarstellung und Veröffentlichung noch offen.

### Wasser, Lösen und Kristalle: tragfähiges Sättigungsmodell
- Kapitel neu ausgearbeitet: Ionengitter und gelöste Ionen, Lösen versus Schmelzen, Sättigung versus Lösegeschwindigkeit, Kristallisation und Leitfähigkeit im Vergleich mit Zucker. Neun Fragen mit begründeten, überwiegend auf typische Fehlvorstellungen bezogenen Alternativen. Inhaltsrevision 1.
- Bisheriges Tagesmodell ersetzt: 18 g Salz in 100 g Wasser, Verdunstungsregler, konstante Temperatur und gerundete Löslichkeitsgrenze 36 g je 100 g Wasser. Tabelle bilanziert gelöstes und kristallisiertes Salz; keine Kristalle vor Überschreiten der Grenze. Keine Vorhersage einer realen Wachstumsdauer.
- Sichtbares Ionengitter liegt jetzt innerhalb des SVG und zeigt abwechselnde Ladungen; Kristallanzahl und Größen ausdrücklich schematisch.
- Schulversuch mit Kochsalz, Raumtemperatur und vorgeschaltetem Filtern präzisiert; Beobachtung von Flüssigkeitsstand und neu entstandenen Kristallen statt Verwechslung mit alten Körnern.
- test_chemistry_solutions.js: neun gerenderte Fragen, Revision, sechs Modellzustände einschließlich Sättigungsgrenze und Rückkehr, Massenerhaltung, Beschriftung und keine doppelten Darstellungen bestanden. pH-Regression ebenfalls bestanden. Strukturprüfung: 4872 Fragen in sieben JSON-Dateien; fachliche Gesamtprüfung und Übersetzungsqualität dadurch nicht bewiesen. Lokal, noch keine Veröffentlichung.

### Atome und Periodensystem: Aufbau und Unterscheidungen
- Kapitel zu Teilchenorten und Ladungen, Ordnungszahl, Ion, Isotop, Massenzahl, Gruppe und Periode ausgearbeitet. Unterschied zwischen elementarem Sauerstoff O2 und Wasser als Verbindung erklärt. Nachschlagetabelle der ersten 20 Elemente ergänzt; keine externe Recherche für die Grundaufgaben nötig.
- Baukasten um Neutronenzahl sowie getrennte Ladungs- und Massenzahl erweitert, Elektronenzahl null zugelassen. Modellgrenzen sichtbar: keine festen Elektronenflugbahnen, kein Stabilitäts- oder Existenznachweis für beliebige Kombinationen. Alte zweireglige Einbettungen bleiben technisch unterstützt.
- Neun Aufgaben mit passenden Rückmeldungen statt Antwortmöglichkeiten über Heftfarben und Schultaschen; Inhaltsrevision 1.
- test_chemistry_atoms.js bestanden: neun gerenderte Fragen, 20 Nachschlagezeilen und sechs Atom-/Ion-/Isotopzustände einschließlich null Elektronen, Ladung, Masse, zugängliche Reglerbeschriftungen. Fragenstrukturprüfung: 4874 Datensätze in sieben JSON-Dateien ohne Strukturfehler. Fachliche Gesamtprüfung aller Kapitel, Übersetzungen und Browserdarstellung bleiben offen.
- Anschließender vollständiger Funktionstestlauf: 49/49 Suites bestanden. Bericht: work/functional-test-report.json (relativ zum übergeordneten Workspace). Kein Nachweis für vollständige Lehrplanabdeckung, fachliche Richtigkeit, Medien oder visuelles Layout. git diff --check ohne Fehler.

### Bindungen und Strukturen: Modelle fachlich verbunden
- Ionengitter statt einzelner NaCl-Moleküle, gemeinsame Elektronenpaare in Molekülen und Netzwerken, Metallbindung und bewegliche Ladungsträger erklärt. Sprödigkeit auf veränderte Nachbarschaften bezogen; schlechte Löslichkeit anderer Salze ausdrücklich zugelassen.
- Wasser: Teilladungen von Ionenladungen sowie Anziehung zwischen Molekülen von Bindungen im Molekül unterschieden. Gewöhnliches Verdampfen erhält H2O-Moleküle. Schulversuch um Kontrollprobe und vergleichbare Bedingungen ergänzt; Kabelauswahl als Transfer.
- Sieben Aufgaben mit begründeten Fehlvorstellungen neu verfasst; Inhaltsrevision 1.
- Modellrückmeldungen berichtigt; SVG-Bedienelemente erhalten Namen und Auswahlstatus, Fokus bleibt nach Tastaturaktivierung erhalten. Vor einer Auswahl kein irreführend markiertes Modell.
- test_chemistry_bonding.js und Atombau-Regression bestanden; Fragenstrukturprüfung 4874 Datensätze ohne Fehler und git diff --check sauber. Keine neue vollständige Browser-/Layoutprüfung, keine Veröffentlichung.

### Sauerstoff und Verbrennung: Bedingungen statt Fehlvorstellungen
- Flamme als heiße Reaktionszone statt als sichtbare Energie erklärt. Wachsdampf als Brennstoff, Sauerstoff als Reaktionspartner, vollständige/unvollständige Verbrennung und unterschiedliche Produkte behandelt. Oxidation mit Sauerstoff als Einstieg vom allgemeineren Redoxbegriff abgegrenzt.
- Kerzenversuch mit Lehrkraft und hitzebeständigem Gefäß präzisiert: Erlöschen vor vollständigem Sauerstoffverbrauch, Beobachtung ist keine quantitative Sauerstoffmessung.
- Branddreieck nennt fehlende Bedingungen einzeln und zeigt Grenzen der drei Schalter. Zündquelle von fortlaufender Wärmefreisetzung unterschieden. Wiener Notruf 122 und Schulalarmplan ergänzt; theoretische Löschaufgaben nicht als Handlungsauftrag dargestellt.
- Sieben Fragen und Rückmeldungen erneuert; Inhaltsrevision 1. test_chemistry_combustion.js prüft alle acht Schalterkombinationen und Übergang vom vollständigen Modell zu fehlendem Sauerstoff, Kapitelrender und alte Ergebnisse. Bindungsregression und Strukturprüfung (4874 Fragen) bestanden. Änderungen lokal, fachliche Gesamtprüfung und visuelle Prüfung weiterhin offen.

### Metalle und Redox: Elektronenübertragung und kontrollierter Rostvergleich
- Oxidation/Reduktion als gekoppelte Elektronenabgabe/-aufnahme mit Fe-Teilgleichung und Zn/Cu-Ionen-Modell erklärt. Neun Fragen mit begründeten Antworten; Inhaltsrevision 1. Atombau als Vorwissen ergänzt.
- Rostversuch konkretisiert: kontrolliert trockene Luft, lufthaltiges Wasser, vergleichbares Salzwasser und zuvor abgekochtes Wasser unter Öl. Gleiche Nägel, Mengen, Temperatur und Zeiten sowie Restfeuchte/Beschichtungen als mögliche Störgrößen erläutert.
- Modell zeigt keine Rostpunkte für idealisierte trockene/sauerstoffarme Ansätze; Wasserstände der wässrigen Ansätze gleich, Nägel vollständig eingetaucht. Punkte sind qualitative Erwartungen, keine Mengenmessung. Öl entfernt keinen bereits gelösten Sauerstoff.
- Dichte Schutzschichten versus poröser Rost, beschädigter Lack und Verzinken erläutert; Fahrrad nach dem Winter als Alltagsaufgabe.
- test_chemistry_redox.js bestanden: neun gerenderte Fragen, Gleichungen, Revision, vier Modellwahlen, qualitative Punkte und Tastaturfokus. Dabei entdeckten Fokusverlust behoben und erneut geprüft. Verbrennungsregression und Fragenstrukturprüfung (4876 Datensätze) bestanden. Keine Veröffentlichung oder vollständige visuelle Prüfung.

### Kohlenstoff, Erdöl und Kunststoffe: Modellzählung und Stoffwege
- Fehler im Kettenmodell behoben: ab sechs C-Atomen wurde zuvor ein zusätzliches C gezeichnet. Neue Auswahl für unverzweigte/verzweigte offenkettige Alkane erhält Gesamtzahl und Summenformel. Verzweigung erst ab vier C; Wasserstoffauslassung und Modellgrenzen beschriftet. Überdeckender Textkasten entfernt.
- Erdöl als Gemisch, fraktionierte Destillation versus Cracken/Polymerisation, natürliche Polymere und Kunststoffzusätze ergänzt. Aussagen über Kettenlänge auf unverzweigte Alkane begrenzt.
- Schwimmprobe mit eingeschlossener Luft und Materialmischungen kritisch erklärt. Wiener Verpackungssammlung/Pfandrückgabe mit MA-48-Quelle und Stand September 2026; Rohstoffherkunft nicht mit Abbaubarkeit gleichgesetzt.
- Sieben Fragen und Rückmeldungen überarbeitet; Inhaltsrevision 1. test_chemistry_carbon.js prüft alle acht Atomzahlen in beiden Auswahlmodi, C-Zählung, Verknüpfungszahl, Summenformel, Auswahlgrenzen und Einzelgrafik. Redox-Regression, Fragenstrukturprüfung (4876 Datensätze) und git diff --check bestanden. Keine vollständige visuelle oder fachliche Abnahme; Änderungen lokal.

### Chemie und Umwelt: begründeter Lebenswegvergleich
- Gleichwertigen Nutzen, Lebenswegschritte, Gefahr versus situatives Risiko, Etiketten/Quellen/Annahmen und sachgerechte Dosierung erklärt. Wiener Batteriesammlung ergänzt; entladen nicht mit stofflich leer gleichgesetzt.
- Neuer interaktiver Vergleich: fiktive Einwegbehälter zu 15 g je Einsatz versus eine 120-g-Mehrwegbox. Nutzungszahl 1–40; Gleichstand bei acht Einsätzen. Ausdrücklich nur neu hergestellte Behältermasse, keine Gesamtökobilanz oder CO2-Aussage; Reinigung, Transport, Energie und weitere Daten fehlen.
- Neun Fragen zu Kriterien, Rechenbeispiel und Aussagegrenzen; Inhaltsrevision 1. Absolute Reparatur-Rangfolge aus Lebensweggrafik entfernt.
- test_chemistry_environment.js prüft sieben Nutzungszahlen einschließlich Gleichstand und Rückkehr, Tabellenwerte, Beschriftungen, Grenzen, neun Fragen und Revision. Kohlenstoff-Regression sowie Strukturprüfung (4878 Fragen) und git diff --check bestanden. Vollständige visuelle/fachliche Abnahme und Veröffentlichung weiterhin offen.

### Produkt-Lebensweg: Auswahl, Tastatur und Darstellung
- Lebensweggrafik neu angeordnet: Bedienelemente überdecken keine Prozessstationen mehr; Reihenfolge Rohstoff–Herstellung–Nutzung–Sammlung mit teilweiser Rückgewinnung und abzweigenden Reststoffen. Kein behaupteter verlustfreier Kreislauf.
- Anfangszustand markiert keine ungewählte Mehrwegoption. Vier SVG-Auswahlen erhalten zugängliche Namen/Auswahlstatus und behalten Fokus bei Enter/Leertaste. Native Schaltflächen bleiben ebenfalls bedienbar.
- Ausführliche Bedingungen zu Einweg, Mehrweg, Reparatur und Recycling stehen als umbrechender Text unter der Grafik. Statusmeldung und Erklärung sind identisch.
- test_chemistry_environment.js erweitert: alle vier Auswahlen über native Schaltflächen und SVG per Enter/Leertaste, Fokus und Statuskonsistenz bestanden. Bestehender Massenvergleich bleibt grün. Kohlenstoff-Regression bestand; keine vollständige visuelle Browserabnahme.

### Stoffeigenschaften: Beobachtung, Deutung und Grenzen
- Gegenstandsgröße versus Stoffeigenschaft, Dichte als Masse/Volumen und ein erfundener Vergleich gleich dichter Proben ergänzt. Einzelne Eigenschaften nicht als eindeutige Stoffnachweise dargestellt.
- Vergleichsversuch auf bekannte codierte Kandidaten bezogen; Salz/Zucker durch bloßes Lösen nicht unterscheidbar. Bedingungen, Kontrollwasser, zusätzliche Leitfähigkeitsprüfung und widersprechende Beobachtungen erläutert. Sieben Fragen erneuert, Inhaltsrevision 1.
- Kartenlabor zeigt anfangs keine vorausgewählte Probe. Lange Prüfvorschläge stehen als umbrechender Text unter dem SVG; Ölvergleich benötigt keine Brennprobe. Sichtbare Körnchen aus der Grafik der gelösten Salzprobe entfernt, schematische Darstellung kenntlich gemacht.
- test_chemistry_properties.js und Umwelt-Regression bestanden, Fragenstrukturprüfung 4878 Datensätze und git diff --check sauber. Vollständige fachliche/visuelle Abnahme und Veröffentlichung bleiben offen.

### Sicherheits-Einführung: Handlungsklarheit und Etiketten
- Vorbereitung und konkrete Versuchsfreigabe durch die Lehrkraft, Umgang mit unbeschrifteten Proben und Verzicht auf Kostproben auch bei bekannten Stoffen erklärt.
- Unerwarteten Geruch von einer freigegebenen Geruchsprüfung abgegrenzt: keine eigenständige Untersuchung durch Zufächeln. Augenspritzer: sofortiges Spülen mit fließendem Wasser und gleichzeitiges Hilfeholen, kein Abwarten/Reiben. Verschütten: Abstand, Warnen und Meldung statt eigenständiger Reinigung. Rückmeldungen und Aufgaben konsistent überarbeitet.
- Etikettenlesen mit neun Bildmotiven, Signalwort, Gefahren- und Sicherheitshinweisen ergänzt; offizielle ECHA-Piktogrammtafel verlinkt. Allgemeines Warndreieck der Grafik ausdrücklich kein CLP-Symbol. Keine eigene visuelle Piktogrammsammlung eingebaut. Fachliche Grundlage AUVA M391 und ECHA.
- Neun Fragen, Inhaltsrevision 1. test_chemistry_safety.js und Stoffeigenschaften-Regression bestanden; Fragenstrukturprüfung 4880 Datensätze und git diff --check sauber. Tests prüfen Darstellung/Funktion, ersetzen keine fachliche Sicherheitsfreigabe für konkrete Schulversuche. Gesamtabnahme und Veröffentlichung offen.

### Chemie-Einstieg und fachliche Reihenfolge
- Lernweg neu geordnet: Sicherheit/Alltag/Eigenschaften, Teilchenmodell und Trennverfahren, dann Atome/Bindungen/Lösungen vor Reaktionen, Verbrennung, Säuren/Basen, Redox und Anwendungen. Zuvor lag das für Redox vorausgesetzte Atomkapitel erst danach.
- Lernwegseite verlinkt sämtliche 14 Folgekapitel in Navigationsreihenfolge; Empfehlungen im gemeinsamen Modell angepasst. Bindungen als Vorwissen für Salzlösungen und Reaktionen ergänzt. Direkter Zugriff und frei wählbare Wiederholungslisten bleiben bestehen.
- Alltagseinführung unterscheidet Materialgruppen, Reinstoff/Gemisch sowie physikalische Änderung/Reaktion. Klare Salzlösung nicht als Reinheitsnachweis behandelt. Fraglicher Reaktionsnachweis im Lernwegquiz korrigiert. Revisionen: Alltag 1, Lernweg 2.
- test_chemistry_progression.js prüft die Reihenfolge aller 15 Chemiekapitel gegen deren Voraussetzungen, alle Lernweglinks, zwei gerenderte Kapitel und Modellempfehlung. Allgemeine Navigationstests und Fragenstrukturprüfung (4880 Datensätze) bestanden.
- Anschließender vollständiger Funktionstestlauf: 57/57 Suites bestanden. Dies belegt die geprüften Funktionen, nicht vollständige Lehrplanabdeckung, fachliche Richtigkeit, Medien oder visuelles Layout. Änderungen weiterhin lokal und nicht veröffentlicht.

### Chemie-Darstellung: verborgenes Modellinnere zugänglich gemacht
- prepareLab setzte aria-hidden=true auf jede Chemie-Grafik inklusive Tabellen und fokussierbarer SVG-Schaltflächen. Diese Ausblendung entfernt; vorhandene Container werden entsprechend bereinigt. Eigenständige SVG-Beschreibungen, Tabellen und Bedienelemente bleiben zugänglich.
- Chemie-Regler, Auswahlfelder und Schaltflächen mit mindestens 44px Bedienhöhe, Fokusmarkierung und angepasster Breite. Lange Überschriften und Tabellenzellen dürfen umbrechen; Tabelleninhalt oben ausgerichtet.
- test_chemistry_accessibility.js prüft alle 15 Kapitel auf verborgene Grafikcontainer, Tabellen und Bedienelemente. Umwelt-/Bindungsregression und git diff --check bestanden. Keine Aussage über vollständige Screenreader-, Touch- oder visuelle Browserqualität.
- Browserprüfung angefragt: Sites-Skill erlaubt Screenshots/DOM-Browserprüfung nur bei ausdrücklichem Nutzerauftrag. Rückfrage ausstehend; ausschließlich Quellcode-/JSDOM-Arbeit fortgesetzt. Vorhandener Vorschau-Listener auf 127.0.0.1:4173 bestätigt, keine neue Serverinstanz gestartet. Veröffentlichung weiterhin offen.

### Stoffliste: Fokus beim erneuten Laden
- Beim tastaturgesteuerten Wiederholen einer fehlgeschlagenen Inhaltsanfrage bleibt der Fokus während des Ladens auf dem sichtbaren Status. Danach führt er zur Wiederholen-Schaltfläche oder bei vollständigen Lernzielen zur Druckaktion. Eine zwischenzeitlich vom Nutzer gewählte Fokusposition bleibt erhalten.
- Mehrfach ausgelöste Ladeaktionen starten keine konkurrierenden Anfragen. Die anfängliche automatische Anfrage verschiebt den Fokus nicht.
- test_study_plan_loading.js erweitert: Fokus bei Fehler, Erfolg und bewusster Fokusänderung sowie doppelte Aktivierung geprüft. Lade-, Druckschutz- und Reihenfolgetests bestanden. Änderungen lokal; keine reale Screenreaderprüfung oder Veröffentlichung in diesem Schritt.

### Wiederholungsweg ohne Browserspeicher
- Beim Öffnen eines Kapitels im Wiederholungsmodus reist die aktuelle Stoffliste als URL-Parameter mit. Vorwärts-/Rückwärtslinks übernehmen die Reihenfolge; beide Rücklinks öffnen dieselbe Auswahl. Explizite Listen haben Vorrang vor gespeicherten Listen, auch bei leerer Auswahl.
- Unbekannte und doppelte Kapitel werden für die Fortsetzung entfernt. Geteilte Links enthalten weiterhin nur Kapitel-IDs, keine persönlichen Ergebnisse.
- Neuer Funktionstest prüft Einstieg aus der Stoffliste, Kapitelwechsel und Rücklinks bei gesperrtem localStorage. Navigation, Lernabläufe und Ladezustände als Regression bestanden. Quellenprüfung aller hinterlegten Voraussetzungen fand keine nachfolgenden Voraussetzungen innerhalb desselben Fachs; dies ersetzt keine vollständige didaktische Lehrplanprüfung.

### Prüfungsstoff nach Kapitelinhalten suchen
- Suchindex umfasst jetzt Titel, Fach, Kategorie, Untertitel, Lernziele, Zusammenfassung und Abschnittstexte. Mehrere Suchwörter müssen alle vorkommen, ihre Reihenfolge ist beliebig. Umlaut-Umschreibungen und ß/ss werden angeglichen.
- Fachauswahl um „Alle Fächer“ ergänzt. Bestehende Fach-/Klassenfilter und Stoffauswahl bleiben unabhängig von der Suche. Index wird beim Laden neuer Inhalte erneuert, sodass eine bereits eingegebene Suche nach dem Laden aktualisiert wird.
- test_learning_search.js prüft echte Inhaltsbegriffe (Konvektion, Papierchromatografie), verzögertes Laden, Mehrwortsuche, Umlautvarianten und Filter. Lernablauf- und Ladezustandstests bestanden. Keine Aussage über abschließende visuelle Bedienqualität oder vollständige fachliche Abdeckung.

### Biologie: Pflanzenorgane und Fotosynthese fachlich überarbeitet
- Fünf Abschnitte neu formuliert: Organfunktionen und Transport, Spaltöffnungen/Wasserhaushalt, Stoffe gegenüber Energie, aussagekräftiger Pflanzenvergleich und gleichzeitige Fotosynthese/Zellatmung. Die irreführende Formulierung „Lichtenergie in Stoffe umwandeln“ und Licht als Stoff in einer Übungsfrage entfernt.
- Zehn bewertete Fragen und eine zusätzliche Übung mit plausiblen Fehlvorstellungen sowie antwortbezogenen Begründungen ersetzt. Lernziele erweitert; Inhaltsrevision 1 verhindert, dass alte Ergebnisse als Nachweis der überarbeiteten Anforderungen erscheinen. Bestehende zwei Bilder bleiben erhalten und benötigen weiterhin Medienprüfung.
- Neues bedienbares Sauerstoffbilanzmodell: frei gewählte Bildung 0/2/6 bei Verbrauch 2; Aufnahme, Ausgleich trotz beider Vorgänge, Abgabe. Grenzen der konstanten Modellraten ausdrücklich erklärt. Native Auswahl und Statusrückmeldung, keine automatische Animation.
- Hintergrund geprüft: https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis. Texte und Aufgaben selbst formuliert, keine Übernahme von Abbildungen.
- Vor der Kapiteländerung gestarteter Gesamtlauf: 60/60 Funktionstests bestanden. Neuer test_plant_photosynthesis.js danach separat bestanden, ebenso Revisions- und Suchregression sowie Fragenstrukturaudit (4880 Datensätze). Gesamtzahl nun 61 Suites; kein neuer vollständiger 61er-Lauf behauptet. Fachliche Vollständigkeit sämtlicher Biologiekapitel, visuelle Prüfung und Veröffentlichung weiterhin offen.

### Biologie: Pflanzen- und Tierzellen
- Zehn bewertete Fragen und eine Zusatzübung mit gezielten Fehlvorstellungen und konkreten Rückmeldungen erneuert. Keine offensichtlich fachfremden Ablenkantworten mehr in diesen Fragen.
- Pflanzenzellen ohne Chloroplasten, Mitochondrien auch in Pflanzen, Zellwand gegenüber Membran, spezialisierte Zellen und Grenzen mikroskopischer Sichtbarkeit erläutert. Gesamtvergrößerung mit Rechenbeispiel ergänzt; Lernziele erweitert und Revision 1 gesetzt.
- Neuer interaktiver Tabellenvergleich für grüne Blattzelle, unterirdische Wurzelzelle und tierische Hautzelle: sieben Strukturen mit Aufgaben, Statusrückmeldung und ausdrücklich beschriebenen Modellgrenzen. Native Auswahl, zugängliche Tabellenüberschriften, umbrechende Zellen und Bedienhöhen für beide neuen Biologiemodelle ergänzt.
- Fachlicher Hintergrund: https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells. Vorhandene Illustrationen unverändert; visuelle und Lizenzprüfung noch offen.
- test_cell_comparison.js prüft zehn gerenderte Fragen, Revision, alle drei Zellbeispiele, wiederholte Initialisierung und stabilen Fokus. Fotosynthese- und Übersetzungsrevisionstests ebenfalls bestanden. Neuer Testbestand 62 Suites; kein vollständiger 62er-Lauf in diesem Schritt. Änderungen weiterhin lokal.

### Biologie: Pflanzenvermehrung
- Fünf Abschnitte überarbeitet: Blütenorganisation, Bestäubung gegenüber Befruchtung, Samen/Frucht/Keimung, vegetative Vermehrung, Vielfalt und konkreter Keimversuch. Selbstbefruchtung ausdrücklich geschlechtlich; Vielfalt kein garantierter Vorteil jedes Nachkommens. Modellgrenzen und Versuchsgrenzen erklärt.
- Wiederholte Abschlussfragen durch zehn eigenständige Aufgaben mit plausiblen Ablenkantworten ersetzt. Eine Zusatzübung zur Selbstbefruchtung; Rückmeldungen erklären die jeweilige Auswahl. Lernziele erweitert, Inhaltsrevision 1.
- Neue Zuordnungsübung für fünf Vorgänge mit nativen Auswahlfeldern, Einzelbegründungen, fehlenden Antworten, beliebigen Wiederholungen und Reset-Fokus. Geänderte Antworten verlieren veraltete Rückmeldung. Kein Punktabzug oder Speicherzwang.
- test_plant_reproduction.js prüft zehn gerenderte Fragen und alle Übungszustände. Zell-/Fotosynthese- und Navigationstests sowie Fragenstrukturaudit bestanden. Testbestand jetzt 63 Suites; kein vollständiger 63er-Lauf behauptet. Medien-/Browserprüfung und Veröffentlichung weiterhin offen.
- Hintergrund: https://openstax.org/books/biology-2e/pages/32-2-pollination-and-fertilization. Texte/Aufgaben selbst formuliert; bestehende Bilder unverändert.

### Fachübergreifende redaktionelle Bestandsaufnahme und Pilzfragen
- Neues audit_learning_depth.js untersucht strukturierte Fragen aller 192 verfügbaren deutschen Kapitel. Bericht ../learning-depth-report.json enthält konkrete Datenpfade für drei bekannte pauschale Feedbacksätze sowie doppelte Frage-/Antworttexte. Kein Gütesiegel für sonstige Rückmeldungen, fachliche Richtigkeit, Sprachen oder Lehrplanabdeckung.
- Zunächst sechs Biologiekapitel mit 180 solchen Rückmeldungen und insgesamt 25 doppelten Frageeinträgen gefunden. Pilze anschließend bearbeitet: zehn eigenständige Fragen mit individueller Begründung; Erklärungen zu Myzel/Hefe, Spore/Samen, äußerer Verdauung und Energiefluss ergänzt. Revision 1. Neue interaktive Vertiefung dieses Kapitels bleibt noch zu bearbeiten.
- Nach Aktualisierung noch fünf Kapitel mit 150 bekannten pauschalen Rückmeldungen und 20 Doppeleinträgen: bio_2_oekosysteme, bio_2_mikroorganismen, bio_2_wirbellose, bio_2_sinne_gehirn, bio_2_gehirn_bewegung. Diese Liste ist der nächste belegte Bearbeitungsbedarf, nicht die gesamte Restabnahme.
- Pilzkapitel in echter Vorlage mit Renderer geprüft: zehn Fragen, Erweiterungen sichtbar im Dokument, alte Ergebnisse veraltet. Revisionsregression und Fragenstrukturaudit bestanden. Hintergrund https://openstax.org/books/biology-2e/pages/24-1-characteristics-of-fungi. Weiterhin lokale Änderungen, keine Veröffentlichung.

### Pilze: Nahrungsbeziehungen interaktiv unterscheiden
- Drei beschriebene Fälle (abgestorbenes Holz, Austausch an Wurzeln, Schädigung lebenden Blatts) mit Auswahl zwischen Zersetzung, Symbiose und Parasitismus. Begründung bezieht sich auf Nahrungsquelle und Wirkung; Nachbarschaft allein kein Mykorrhizanachweis.
- Szenariowechsel löscht alte Antwort und Rückmeldung, neue Auswahl ersetzt überholtes Ergebnis. Keine Versuchssperren, Animation oder Speicherung. Native Radiogruppe, Statusausgabe und Tastaturfokus geprüft. Elfte bewertete Frage zum Parasitismus hinzugefügt; bestehende unveröffentlichte Revision 1 deckt die Kapitelüberarbeitung ab.
- test_fungi_relations.js prüft alle neun Antwortkombinationen, leere Auswahl, Szenariowechsel, Wiederinitialisierung und elf gerenderte Fragen. Navigation und Datenstrukturprüfung (4881 Datensätze) bestanden. Redaktioneller Bericht erneuert: weiterhin fünf Kapitel mit den bekannten pauschalen Feedbacksätzen. Testbestand 64 Suites, kein kompletter neuer Gesamtlauf in diesem Schritt.
- Fachliche Grundlage weiterhin im Kapitel verlinkt. Gesamtabnahme, Medien-/Browserprüfung und Veröffentlichung offen; Änderungen lokal.

### Waldökosysteme: Daten auswerten statt pauschaler Aussagen
- Zehn bewertete Aufgaben sowie Zusatzübung mit passenden Fehlvorstellungen und begründeten Rückmeldungen erneuert. Individuenzahl, Artenzahl und weitere Biodiversitätsebenen getrennt; pauschalen Stabilitätstitel abgeschwächt. Nahrungsketten-Pfeilrichtung, Nahrungsnetz sowie Stoffkreislauf/Energiefluss ergänzt.
- Drei fiktive Erhebungen vergleichbarer Probeflächen als interaktive Datentabelle. Individuensummen und Anzahl nachgewiesener Arten werden aus den Daten berechnet; Nullen zählen nicht als Artnachweis. Zwei Beispiele mit mehr Individuen, aber weniger Arten; drittes mit gleicher Artenzahl. Keine echten Wiener Messdaten behauptet. Grenzen von Stichprobe und Kausalschluss ausdrücklich erläutert.
- Lernziele erweitert, Revision 1. Hintergrunddefinitionen: https://www.cbd.int/convention/articles?a=cbd-02. test_habitat_sampling.js prüft zehn Fragen, Datensummen/Artenzahlen in allen Fällen, Wechsel zurück, Fokus und Modellgrenzen. Such- und Navigationsregression sowie Datenstrukturaudit bestanden.
- Redaktioneller Bericht erneuert: vier Kapitel mit 120 bekannten pauschalen Rückmeldungen und 20 doppelten Frageeinträgen verbleiben (Mikroorganismen, Wirbellose, Sinne/Gehirn, Gehirn/Bewegung). Testbestand 65 Suites; kein vollständiger 65er-Lauf behauptet. Inhaltliche Gesamtprüfung, Medien/Browser und Veröffentlichung weiterhin offen.

### Wirbellose: Merkmale und Bestimmungsgrenzen
- Zehn eigenständige bewertete Fragen plus Zusatzübung ersetzen doppelte Fragen und pauschale Rückmeldungen. Grundbauplan erwachsener Insekten, Larven/Bauchfüße, flügellose Erwachsene, unsichere Ansichten, ökologische Rollen und Kontext von „Schädling“ behandelt.
- Angepasstheit nicht als perfekte oder vollständige Absicherung beschrieben. Beiträge von Bodentieren und Mikroorganismen zur Zersetzung unterschieden. Lernziele erweitert, Revision 1.
- Nativer Merkmalsfilter für fünf klar begrenzte Beispiele mit Beinzahl und Gehäuse: unbekannte Merkmale möglich, keine pauschale Artbestimmung, kein Treffer wird als Grenze von Beobachtung/Auswahl erläutert. Zurücksetzen stellt alle Beispiele und Fokus wieder her.
- test_invertebrate_key.js prüft zehn Fragen, alle 15 Filterkombinationen, Rücksetzen, Fokus und Modellgrenzen. Navigations- und Datenstrukturaudit bestanden. Bericht: drei Kapitel mit 90 bekannten pauschalen Rückmeldungen und 15 Doppeleinträgen verbleiben (Mikroorganismen, Sinne/Gehirn, Gehirn/Bewegung). 66 Tests vorhanden, kein neuer vollständiger Lauf in diesem Schritt.
- Fachquelle: https://openstax.org/books/biology-2e/pages/28-6-superphylum-ecdysozoa-arthropods. Änderungen lokal; Gesamtprüfung, Medien-/Browserprüfung und Veröffentlichung bleiben offen.

### Mikroorganismen: Unterschiede und gezielte Hygiene
- Zehn unterschiedliche bewertete Fragen und eine Zusatzübung ersetzen doppelte Fragen und pauschales Feedback. Aufbau Bakterium/Hefe/Virus, Mikrobiom-Begriffsvereinfachung, Kontakt/Infektion/Erkrankung, Fermentation sowie zielgerichtete Hygiene behandelt. Revision 1.
- Vergleichstabelle für Zellaufbau und Vermehrung ergänzt. Hygieneabschnitt anhand des österreichischen Gesundheitsportals erneuert: Händewaschen, unterschiedliche Übertragungswege, Kreuzkontamination und situationsbezogene Reinigung. Neue begründete Küchenaufgabe. Keine Diagnostik oder medizinische Behandlung aus dem Quiz ableiten.
- Quellen geprüft und im Kapitel verlinkt: https://www.gesundheit.gv.at/krankheiten/immunsystem/haendewaschen.html und https://www.gesundheit.gv.at/leben/ernaehrung/lebensmittel/verarbeitung-von-lebensmitteln.html.
- Echte Vorlage/Renderer geprüft: zehn Fragen, Vergleich und Hygieneinhalt vorhanden, alte Ergebnisse veraltet. Revisionsregression und Datenstrukturaudit bestanden. Redaktioneller Bericht: noch zwei Kapitel (Sinne/Gehirn, Gehirn/Bewegung) mit 60 bekannten pauschalen Rückmeldungen und zehn Doppeleinträgen. Kapitelvertiefung über die Quizinteraktion hinaus sowie vollständige fachliche/visuelle Abnahme bleiben offen. Lokale Änderungen, keine Veröffentlichung.

### Sinne: Wahrnehmung und kontrollierte Darstellung
- Zehn eigenständige Fragen und zusätzliche Übung mit erklärenden Rückmeldungen. Reiz/Signal/Wahrnehmung, Netzhaut/Linse/Sehnerv, Haarzellen, Zusammenspiel der Sinne und Gleichgewicht differenziert. Kapitelrevision 1.
- Neue ruhige Kontrastdarstellung: zwei unverändert gleich graue Quadrate; nur die Hintergründe lassen sich angleichen und zurückstellen. Erklärung unterscheidet Eindruck von Darstellung und bewertet weder Intelligenz noch Sehgesundheit. Textbeschreibung, Status und native Schaltfläche vorhanden; keine Animation oder Tonwiedergabe.
- test_sensory_contrast.js prüft zehn Fragen, Revision, konstante Zielflächen, vier Umschaltungen, Wiederinitialisierung und Fokus. Strukturaudit bestanden. Tatsächlicher visueller Eindruck wurde damit ausdrücklich nicht geprüft; Browserprüfung weiterhin ausstehend.
- Quellen: National Eye Institute „How the Eyes Work“ und NIDCD „Noise-Induced Hearing Loss“, im Kapitel verlinkt. Redaktioneller Bericht: nur bio_2_gehirn_bewegung enthält noch die drei bekannten pauschalen Feedbacksätze (30 Antworten) und fünf doppelte Frageeinträge. Dies ist keine Aussage zur vollständigen Inhaltsqualität anderer Kapitel.
- 67 Funktionstests vorhanden, kein neuer Gesamtlauf in diesem Schritt. Lokale Änderungen; Medien, volle Abnahme und Veröffentlichung offen.

### Gehirn und Bewegung: Reflexe differenzieren
- Zehn unterschiedliche bewertete Fragen mit individuellen Begründungen sowie Zusatzübung erneuert. Zentrales/peripheres Nervensystem, sensorische/motorische Information, Rückmeldungen bei Bewegung und Unterschiede von Reflex und gelernter Reaktion behandelt. Revision 1.
- Reflexabschnitt mit aufklappbarem Signalweg neu geschrieben: Rückenmark nicht einziger Verschaltungsort, keine notwendige bewusste Vorentscheidung, keine Garantie gegen Verletzung. Keine Aufforderung zur Auslösung schädigender Reize. Übungsdaten nicht als Intelligenz- oder Gesundheitstest interpretieren; Bewegung an Voraussetzungen anpassen.
- Fachgrundlagen OpenStax „Motor Responses“ und österreichisches Gesundheitsportal „Bewegungsempfehlungen für Kinder und Jugendliche“, im Kapitel verlinkt. Echte Vorlage/Renderer geprüft: zehn Fragen, Modellgrenzen, alte Ergebnisse veraltet.
- Redaktioneller Audit über alle 192 deutschen Kapitel findet nun keine der drei exakt erfassten pauschalen Feedbackphrasen und keine gleichen Frage-/Antwortkombinationen doppelt. Andere schwache Rückmeldungen, fachliche Fehler, Übersetzungen, Lehrplanlücken oder bloß ähnliche Aufgaben werden dadurch nicht ausgeschlossen. Datenstrukturaudit weiterhin 4881 Datensätze ohne formale Fehler.
- Vollständiger Funktionstestlauf nach den neuen Biologieänderungen gestartet; Ergebnis wird nach Abschluss gesondert ergänzt. Veröffentlichung und vollständige Abnahme bleiben offen.
- Anschließender vollständiger Funktionstestlauf abgeschlossen: 67/67 Suites bestanden; Ergebnis in ../functional-test-report.json. Die separat gerenderten Mikroorganismen- und Gehirn/Bewegungs-Kapitel wurden zusätzlich geprüft. Keine vollständige fachliche, visuelle oder Lehrplan-Abnahme daraus abgeleitet.

### Breitere Feedbackprüfung und tatsächlicher Bruchfehler
- Häufigkeitsanalyse sämtlicher deutscher Rückmeldungen findet weitere Leerformeln außerhalb der zunächst geprüften drei Sätze. Redaktionellen Audit auf 17 exakt benannte Formulierungen erweitert, einschließlich knapper „Richtig.“/„Nein.“-Antworten als Prüfkandidaten. Bericht nennt Muster und Grenzen ausdrücklich; die früheren Nullbefunde gelten nur für die damaligen drei Sätze.
- math1_8_brueche: Alle 84 falschen Antwortoptionen der 42 Zusatzübungen erhalten individuelle Begründungen. Fehlerhafte Gleichwertigkeitsfrage korrigiert: 3 × 2/7 und 2 × 3/7 waren beide rechnerisch richtig, aber nur eine Antwort anerkannt. Falsche Alternative jetzt 2 × 2/7. Unklare Formulierungen bei Darstellungen und Rechenkontrolle präzisiert; Revision 1 schützt vor veralteten Übersetzungen/Ergebnissen.
- Mathematische Prüfung der drei Produktoptionen bestanden: genau die zu 6/7 gleichwertige Option ist richtig markiert. Alle elf Mathematikkapitel der ersten Klasse bestehen den vorhandenen Rendertest; Datenstrukturaudit bestanden.
- Neuer Bericht: Kandidaten in Physik 1 Kapitel/4 Antworten, Chemie 2/13, Biologie 28/594, Mathematik 1/108. Diese 719 Fundstellen benötigen redaktionelle Prüfung; kurze Antworten können durch den Kontext unterstützt sein. Keine pauschale inhaltliche Fertigstellung behauptet. Weitere Gesamtanforderungen und Veröffentlichung bleiben offen.

### Dezimalzahlen: Zusatzübungen mit konkreten Fehlerbegründungen
- Alle 108 falschen Optionen der 54 Zusatzübungen in math1_9_dezimalzahlen erhalten fachbezogene Rückmeldungen. Rechenweg, Stellenwert, Einheiten oder Rückrechnung erläutern jeweils die falsche Auswahl.
- Fragen zu 2+1-Angebot, Ziffernverschiebung in fester Stellenwerttafel, Rundungsregel sowie Komma unter Komma präzisiert. Letzteres ausdrücklich auf Addition/Subtraktion beschränkt. Revision 1 für überarbeitete Lerninhalte und Übersetzungsabgleich.
- Alle elf direkt formulierten Rechenaufgaben mit zwei Operanden unabhängig nachgerechnet und jede Antwortoption gegen den Wert geprüft; keine weitere gleichwertige falsche Option in diesem geprüften Teil gefunden. Alle 54 Übungen auf verbleibende bekannte Leerformeln geprüft. Rendertest aller elf Mathematikkapitel der ersten Klasse und Datenstrukturaudit bestanden.
- Erweiterter redaktioneller Bericht enthält jetzt 611 Prüfkandidaten (Physik 4, Chemie 13, Biologie 594), keine der erfassten Phrasen mehr in Mathematik. Das ist keine vollständige mathematische Inhaltsabnahme. Weiterhin lokale Änderungen; Gesamtprüfung und Veröffentlichung offen.

### Kurze Physik- und Chemierückmeldungen erklären
- 19 Rückmeldungen in klimawandel, chemie_reaktionen_energie und chemie_saeuren_basen fachlich ausgeführt, darunter sämtliche 17 verbleibenden Treffer der bekannten kurzen Leerformeln in diesen Fächern. Erklärungen unterscheiden Klima/Wetter, Klimaschutz/Anpassung, Lösen/Reaktion, Reaktionshinweise und pH-Einordnung. Fragebewertung unverändert; reine Rückmeldungsergänzungen ohne neue Kapitelrevision.
- Klimagrundlage anhand IPCC AR6 geprüft: https://report.ipcc.ch/ar6syr/headline.html. Vorhandene falsche Sonnenbehauptung erhält eine konkrete Widerlegung.
- Bestehende Tests für chemische Reaktionen, pH und alle 20 Physikkapitel bestanden. Redaktioneller Bericht jetzt 594 Prüfkandidaten in 28 Biologiekapiteln, keine erfassten Leerformeln in Physik/Chemie. Andere Qualitätsmängel werden dadurch nicht ausgeschlossen; kein neuer Gesamttestlauf.
- Änderungen lokal, Gesamtanforderungen und Veröffentlichung weiter offen.

### Evolution: fachliche Einordnung und Transfer
- Fehler in der Tierstammtabelle korrigiert: Wirbeltiere sind eine Gruppe innerhalb der Chordatiere, kein eigener Stamm. Chorda und Wirbelsäule unterschieden; verschachtelte Zuordnung am Katzenbeispiel erklärt. Amsel/Biene als begründete Vergleichsaufgabe mit aufklappbarer Lösung und zwei neuen bewerteten Transferfragen ergänzt. Fachquellen OpenStax Biology 2e, 29.1 und 20.2 im Kapitel verlinkt.
- Lebensentstehungsdiagramm ausdrücklich als Modell ohne gesicherte Schrittfolge bezeichnet. Pauschale Behauptung, ein einzelner Beleg sei schwach, durch Erklärung der Belegqualität ersetzt; unglückliches Hauskatze/Wildkatze-Artbeispiel ersetzt. Lernziele decken jetzt alle Kapitelbereiche ab. Kapitelrevision 1 wegen erweiterter Bewertung.
- Echte Vorlage und Renderer ohne Browser geprüft: 13 Fragen, beide neuen Transferfragen, korrekte Tabellenzeile, Modellhinweis und Revisionsverhalten. Bestehender Revisionsregressionstest bestanden. Keine visuelle Abnahme abgeleitet.
- Im Biologie-Kompass zusätzlich 22 pauschale falsche Rückmeldungen durch konkrete Erklärungen zu Beobachtung, Beleg, Modell, Quelle und Untersuchungsmethode ersetzt; Bewertung dort unverändert.
- Redaktioneller Bericht: 572 bekannte Feedback-Prüfkandidaten in 27 Biologiekapiteln, keine doppelten Frage-/Antwortkombinationen. Bericht erfasst weder alle fachlichen Fehler noch alle schwachen Aufgaben. Änderungen lokal; Gesamtfertigstellung und Veröffentlichung bleiben offen.

### Lebensräume: Beobachten, zählen und vorsichtig erklären
- 23 pauschale Quizrückmeldungen durch konkrete Begründungen ersetzt. Unbelebte Faktoren als Lichtstärke, Temperatur und Bodenwassergehalt präzisiert: Boden enthält auch Lebewesen. Sauerstoffrolle von Wasserpflanzen differenziert; nicht alle Insekten benötigen Blüten.
- Sonnenlicht als Energiezufuhr von Nahrungspfeilen unterschieden. Ökologisches Gleichgewicht als vereinfachtes zeitbezogenes Modell statt ideales Gruppenverhältnis erklärt. Standortvergleich liefert mögliche Ursachen, keinen automatischen Kausalnachweis.
- Neue fiktive Schulhofdaten mit aufklappbarer Auswertung: 18 Tiere/eine Gruppe gegenüber 6 Tieren/drei Gruppen. Tiergruppen nicht mit Artenzahl gleichgesetzt; Wiederholung, Auffindbarkeit und Grenzen von Fotoauswertungen erläutert. Lernziele erweitert, Revision 1.
- Echte Vorlage/Renderer geprüft: elf bewertete Fragen, Datentabelle samt unabhängig addierten Summen 18/6, Auswertung, keine offenen Quizplatzhalter und veraltete frühere Ergebnisse. Redaktioneller Bericht jetzt 549 bekannte Prüfkandidaten in 26 Biologiekapiteln. Keine vollständige fachliche oder visuelle Abnahme; lokale Änderungen, Veröffentlichung offen.

### Blütenpflanzen: Fotosynthese und Fortpflanzung präzisieren
- 26 pauschale Rückmeldungen durch konkrete Erklärungen ersetzt. Irreführende lineare Fotosynthesegrafik (Licht → Wasser → Kohlenstoffdioxid → Zucker → Sauerstoff) durch vereinfachte Wortgleichung mit ausdrücklich getrennter Energiequelle ersetzt.
- Bestäubung nicht als Garantie für Befruchtung dargestellt; Pollenschlauch und Samenanlage erklärt. Keimung benötigt passende Temperatur, nicht pauschal mehr Wärme. Neue kontrollierte Feucht-/Trockenvergleichsaufgabe mit aufklappbarer Interpretation; kein Keimling bedeutet nicht automatisch toter Samen.
- Moos als Beispiel im Blütenpflanzenvergleich durch Sumpfdotterblume ersetzt. Lernziele erweitert, Kapitelrevision 1.
- Gesamter Kapitel-Rendertest: 192/192 mit Kapitelkarten, aufgelösten Quizplatzhaltern, erwarteten Übungsanzahlen und Lernziel-/Zusammenfassungsanzahlen; keine gemeldeten Probleme. Das prüft weder fachliche Vollständigkeit noch alle Simulationen oder visuelles Verhalten. Revisionsregression bestanden.
- Redaktioneller Bericht enthält noch 523 bekannte Feedback-Prüfkandidaten in 25 Biologiekapiteln. Lokale Änderungen, Gesamtfertigstellung und Veröffentlichung weiterhin offen.

### Wirbeltiere: Zuordnung begründen und Grenzen erkennen
- 26 bekannte pauschale Rückmeldungen und eine weitere verkürzte Erklärung durch fachbezogene Begründungen ersetzt. Lungen allein kennzeichnen keine Säugetiere; Lebensraum, Fortbewegung und Beliebtheit ersetzen keine Gruppenmerkmale. Vergleichsfrage sprachlich korrigiert.
- Neue aufklappbare Transferaufgabe: schwimmendes Tier mit Federn, fliegendes Tier mit Fell und Säugen sowie unbestimmbarer Fall mit bloß Lungenatmung/Eierlegen. Gruppen- und genaue Artbestimmung ausdrücklich getrennt. Kapitelweite Lernziele und Revision 1.
- Technischer Rendertest aller 192 Kapitel erneut ohne gemeldete Fehler. Redaktioneller Bericht noch 497 bekannte Feedback-Prüfkandidaten in 24 Biologiekapiteln. Keine vollständige fachliche/visuelle Abnahme; Änderungen lokal und Veröffentlichung offen.

### Selektion: Modellregeln und Merkmalsanteile
- 26 pauschale Rückmeldungen konkret erklärt. Fehlerhafte Behauptung, Veränderungen seien erst über mehrere Generationen sichtbar, korrigiert: eine Runde kann bereits Unterschiede zeigen; weitere Runden und unabhängige Wiederholungen haben unterschiedliche Zwecke.
- Papiermodell mit explizitem Start, Suchzeit, gleich großen Punkten, Verdopplung der Überlebenden, Zählung vor Folgerunde und Abbruch bei null Überlebenden ergänzt. Modellgrenzen und veränderliche Gesamtzahl erklärt.
- Fiktive Falterdaten korrekt als Anzahl und Anteil beschrieben: 8/20 zu 18/20 sind 40 zu 90 Prozent. Gegenbeispiel 18/60 zeigt eine größere Anzahl bei kleinerem Anteil. Datenbeschreibung nicht als automatischer Ursachennachweis ausgegeben. Lernziele erweitert, Revision 1.
- Beispielanteile unabhängig nachgerechnet; technischer Rendertest 192/192 ohne gemeldete Probleme. Redaktioneller Bericht noch 471 bekannte Feedback-Prüfkandidaten in 23 Biologiekapiteln. Keine umfassende fachliche/visuelle Abnahme; Änderungen lokal und Veröffentlichung offen.

### Fossilien: Erhaltung und relative Datierung
- 21 pauschale Rückmeldungen durch konkrete fachliche Begründungen ersetzt. Fossilerhaltung nicht auf Sedimentbedeckung/Mineralisierung beschränkt; Bernstein und Gefrieren als weitere Wege genannt. Quellen NPS Body Fossils und USGS Rocks and Layers geprüft und verlinkt.
- Relative Altersfolge in ungestörten, nicht umgekippten Sedimentschichten erklärt, von zahlenmäßigem Alter getrennt. Aufklappbare Schichtenaufgabe und achte bewertete Frage ergänzt; Grenzen durch Umlagerung/Störung benannt. Lernziele erweitert, Revision 1.
- Technischer Gesamtrender geprüft; weiter keine umfassende fachliche oder visuelle Abnahme. Redaktioneller Bericht bleibt ein begrenzter Phrasenaudit. Änderungen lokal, Gesamtfertigstellung und Veröffentlichung offen.

### Biologie-Datenspiele: proportionale Balken
- Quizmechanik geprüft: Kapitel- und Übungsantworten werden bereits gemischt; keine unnötige Änderung daran.
- Tatsächlichen Diagrammfehler korrigiert: feste Zusatzhöhe von 24 SVG-Einheiten verzerrte Balkenverhältnisse. Balken jetzt proportional ab gemeinsamer Nullbasis; Rundung einmal vor Berechnung der Oberkante verhindert abweichende Unterkanten.
- Nullpunkt sichtbar beschriftet, Datensätze sichtbar als fiktive Beispiele gekennzeichnet, zugängliche SVG-Beschreibung enthält sämtliche Kategorien und Werte.
- Neuer test_bio_chart_scale.js prüft Verhältnisse, gemeinsame Basis, Nullwerte, ausschließlich nullwertige Daten sowie zugängliche Werte. Erster Lauf deckte getrennte Rundungsabweichung auf; nach Korrektur bestanden. 68 Funktionstests vorhanden, noch kein neuer Gesamtlauf. Visuelle Prüfung und Gesamtfertigstellung bleiben offen; Änderungen lokal.

### Datenspiele: richtige Einheiten und konkrete Aussagen
- Beliebige Zeitwerte 8/32/116 für kurz/Millionen/Milliarden ersetzt durch 1/100/1000 Millionen Jahre. Puls mit Einheit Schläge/min; Fundzahlen als Tierzählung und Standarddaten als Pflanzenzählung kenntlich gemacht.
- Datenentscheidungen verlangen nun eine konkrete, rechnerisch überprüfbare Aussage statt nur die Wahl der allgemeinen Strategie „Werte vergleichen“. Rückmeldungen unterscheiden Daten, Ursachen und Artenvielfalt. Beispieldaten ausdrücklich fiktiv; Pulswerte keine Gesundheitsbewertung.
- Längere Erklärungen bleiben außerhalb des SVG im umbruchfähigen Rückmeldungsabsatz, statt in eine einzelne Diagrammzeile geschrieben zu werden.
- test_bio_chart_scale.js erweitert: vier Datensätze/Einheiten, genau eine richtige Aussage, unabhängige Differenz-/Verhältnisrechnungen, alle zwölf Antwortaktionen, Status, Fokus, Rückmeldung und stabile SVG-Beschriftung. Bestanden. 68 Tests vorhanden, kein Gesamtlauf in diesem Schritt. Änderungen lokal; volle Abnahme und Veröffentlichung offen.

### Gesamttest nach Inhalts- und Diagrammänderungen
- Vollständiger Funktionstestlauf abgeschlossen: 68/68 Suites bestanden. Bericht ../functional-test-report.json aktualisiert; kein laufender Prozess verbleibt.
- In docs/MITTELSCHULE_WIEN.md konkrete Testnachweise den Produktanforderungen zugeordnet und Grenzen ausdrücklich daneben dokumentiert. Keine pauschale Abnahme aus grünen Tests abgeleitet.
- Vollständige Lehrplan-/Fachprüfung, reale Browser-/Medienabnahme und überprüfte Veröffentlichung fehlen weiterhin. Ziel bleibt offen.

### Kladogramme: Daten reichen nicht immer zur Auflösung
- 21 pauschale Rückmeldungen konkret erklärt. Bloßes Zählen von Ähnlichkeiten nicht als hinreichendes Verfahren dargestellt; unabhängige Entstehung und Merkmalsverlust erwähnt.
- Vorhandene Vier-Merkmal-Matrix löst Frosch/Katze/Taube nicht eindeutig auf. Diese Grenze ausdrücklich erklärt; tatsächliche Amniotenverwandtschaft beruht auf zusätzlichen Daten (OpenStax-Vertebratenquelle geprüft/verlinkt).
- Neue aufklappbare A/B/C-Verzweigungsaufgabe und achte bewertete Frage behandeln jüngsten gemeinsamen Vorfahren, Drehen von Ästen, gleich nahe Verwandtschaft zu A und fehlende Zeitskala. Lernziele erweitert, Revision 1.
- Technischer Rendertest 192/192 bestanden. Redaktioneller Bericht weiterhin begrenzte Phrasenprüfung; keine vollständige fachliche oder visuelle Abnahme. Lokale Änderungen; Gesamtfertigstellung und Veröffentlichung offen.

### Interaktives Kladogramm: Äste drehen
- bio_3_kladogramme lädt ein eigenes Kapitelmodul. Zwei native Schaltflächen drehen unabhängig die Äste an den beiden Knoten; Rücksetzen stellt die Ausgangslage wieder her. Alle vier Anordnungen erhalten den gemeinsamen jüngeren B/C-Knoten.
- SVG in Textfarbe mit vollständiger dynamischer Beschreibung, lesbarer Statusmeldung, stabilen Bedienelementen und sichtbarem Fokus. Hypothetische Gruppen und fehlende Zeitskala ausdrücklich genannt. Keine Animation; Inhalt bleibt auch als Text erklärt.
- test_cladogram_rotation.js prüft echte Kapitelvorlage mit acht Fragen, vier Anordnungen, B/C-Knotenposition, Rücksetzen, aria-pressed, Fokus und doppelte Initialisierung. Bestanden. 69 Funktionstests vorhanden, noch kein neuer Gesamtlauf. Visuelle Browserabnahme weiterhin offen; Änderungen lokal.

### Geologie und Lebensräume: plausible Fehlvorstellungen
- Sieben bewertete Fragen mit 21 fachbezogenen Rückmeldungen und plausiblen falschen Optionen überarbeitet: deterministische Standortvorhersage, Verwitterung/Transport/Erstarrung, fruchtbare Vulkanböden und Grenzen des Recyclings.
- Lithosphäre statt bloß Erdkruste als Plattenmaterial erklärt. Gesteinskreislauf ohne feste Reihenfolge; Metamorphose überwiegend im festen Zustand von Schmelzen/Erstarren unterschieden. Zwei aufklappbare Beispielwege ergänzt; USGS-Fachquellen geprüft/verlinkt.
- Lernziele erweitert, Revision 1. Technischer Rendertest aller 192 Kapitel bestanden. Redaktioneller Bericht nun 408 bekannte Feedback-Prüfkandidaten in 20 Biologiekapiteln. Fachliche Vollabnahme, Browser-/Medienprüfung und Veröffentlichung offen; Änderungen lokal.

### Boden: Bestandteile, Poren und Aussagegrenzen
- Sieben bewertete Fragen mit 21 individuellen Erklärungen und plausiblen Fehlvorstellungen erneuert. Humus/Bodenleben/mineralischer Anteil, Verdichtung/Versiegelung und Stoffabgabe bei Zersetzung getrennt.
- Neue aufklappbare Datenauswertung zum Wasserdurchlauf: 70 gegenüber 20 ml nach gleicher Zeit bedeutet nicht automatisch bessere Bodenqualität; nicht aufgefangene Menge nicht mit pflanzenverfügbarem Wasser gleichgesetzt. Fiktiver Modellversuch, gleiche Anfangsbedingungen ausdrücklich genannt.
- Lernziele erweitert, Revision 1. Technischer Rendertest aller 192 Kapitel bestanden; begrenzter Feedbackaudit bleibt keine fachliche Vollabnahme. Änderungen lokal; Browser-/Medienprüfung, Gesamtfertigstellung und Veröffentlichung offen.

### Gewässer: Sauerstoff im Tagesverlauf
- 21 pauschale Quizrückmeldungen durch Fachbegründungen ersetzt. Daten, Ursachen und Verursacher getrennt; Individuenzahl nicht mit Biodiversität gleichgesetzt.
- Fotosynthese und Zellatmung der Algen sowie aerober Abbau gemeinsam erklärt. Neue aufklappbare Messwertaufgabe 9 mg/l nachmittags gegenüber 4 mg/l vor Sonnenaufgang: Differenz 5 mg/l, plausible Erklärung ohne automatischen Düngernachweis oder universellen Gesundheitsgrenzwert. EPA-Fachquelle geprüft/verlinkt.
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden. Bekannte Feedbackkandidaten weiter reduziert, keine fachliche Vollabnahme behauptet. Änderungen lokal; Gesamtprüfung und Veröffentlichung offen.

### Wassertiere: Entwicklungsstadium ist keine Tiergruppe
- 21 pauschale Quizrückmeldungen konkret erklärt. Kaulquappenentwicklung ausdrücklich am Frosch erläutert, nicht pauschal allen Amphibien zugeschrieben. Neue aufklappbare Vergleichsaufgabe trennt Metamorphose von einem Wechsel der Tiergruppe und von Evolution.
- Beobachtungsantwort präzisiert: Wassertiere bei vorbereiteter Schalenbeobachtung in geeignetem Wasser, nicht bloß feucht halten. Vollständiges Protokoll umfasst auch Ruhephasen; ausgelöste Bewegung nicht mit ungestörtem Verhalten verwechseln.
- Lernziele erweitert, Revision 1. Technischer Rendertest aller 192 Kapitel bestanden. Phrasenprüfung bleibt begrenzt, keine umfassende Fach-/Browserabnahme. Änderungen lokal; Gesamtfertigstellung und Veröffentlichung offen.

### Landwirtschaft: Zielkonflikte anhand von Daten
- 18 pauschale Rückmeldungen konkret erklärt: Nährstoffaufnahme begrenzt, Bodenbildung langsam, Werbung kein Wirkungsnachweis, mehrere Kriterien für Entscheidungen.
- Neue fiktive Vergleichsaufgabe: gleich große Gesamtflächen, 1000/920 kg Ernte und 3/7 gefundene Wildbienenarten. 8 Prozent Erntedifferenz nachgerechnet; Artenfunde nicht mit gesamter Biodiversität und Einzelfall nicht mit allgemeinem Kausalnachweis gleichgesetzt. Aufklappbare Abwägung benennt Wiederholungen und weitere Kriterien.
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden; keine vollständige fachliche/visuelle Abnahme. Änderungen lokal, Gesamtfertigstellung und Veröffentlichung offen.

### Siedlungsräume: Schulhofgestaltung mit Wiener Bezug
- 18 pauschale Rückmeldungen durch konkrete Erklärungen ersetzt. Artenförderung als mögliche Wirkung statt Garantie formuliert; Schatten, Verdunstung und Regenrückhalt unterschieden.
- Neue Entwurfsaufgabe mit geprüftem Wiener Beispiel Pfeilgasse aus Smart City Wien. Sitzbereich, Bewegung, Vegetation und zugänglicher Weg gemeinsam planen; aufklappbare Selbstprüfung zu Schattenzeit, Wurzelraum, Pflege und konkreten Lebensraumansprüchen. Keine erfundenen Temperaturwirkungen oder allgemeine Patentlösung.
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden. Fachliche Vollabnahme, Browser-/Medienprüfung und Veröffentlichung bleiben offen; Änderungen lokal.

### Kohlenstoff: Speicher und Flüsse unterscheiden
- 18 pauschale Rückmeldungen konkret erklärt. Kohlenstoffelement, CO₂ und organische Verbindungen unterschieden; Stoffkreislauf nicht mit Energiefluss gleichgesetzt.
- Treibhauseffekt als Absorption und Abgabe von Wärmestrahlung statt undurchlässiger Wärmedecke erklärt. Neue fiktive Bilanzaufgabe zeigt, warum weniger Eintrag bei gleicher Aufnahme weiterhin eine wachsende Speichermenge ergeben kann (netto +4 und +2).
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden. Keine vollständige fachliche/visuelle Abnahme; Änderungen lokal, Gesamtfertigstellung und Veröffentlichung offen.

### Allgemeine Lesebedingungen: Scrollleisten und Fokus
- Globale Unterdrückung sämtlicher Scrollleisten aus Haupt-Stylesheet, Navigationsseite und Weltraum-Stylesheet entfernt. Native Browser-/Systemeinstellungen bestimmen nun die Anzeige; vorhandene gezielte Werkstatt-Scrollregeln bleiben erhalten.
- Biologie-Entscheidungsschaltflächen erhalten explizite 3-Pixel-Fokuslinie in Textfarbe statt outline:none. Bestehende Hoverdarstellung bleibt bestehen.
- Stylesheets mit JSDOM geparst, Entfernung der globalen Scrollleistenregeln und Fokusregel geprüft. Keine reale visuelle oder Plattform-Abnahme daraus abgeleitet; lokale Änderungen, Gesamtfertigstellung offen.

### Genetik: Wahrscheinlichkeiten und Begriffsgrenzen
- 18 Standardrückmeldungen fachlich ausgeführt. Genanalyse nicht automatisch Gentechnik/Veränderung; fragwürdige falsche Antwort über Gene außerhalb von Zellen durch eindeutige Alternative ersetzt.
- Allele, Umwelteinfluss und einfaches Aa×Aa-Modell ergänzt. Vier Kombinationen als Wahrscheinlichkeiten statt feste Nachkommenfolge erklärt; Großbuchstabe bedeutet nicht ohne weitere Annahme Dominanz oder Wertigkeit. NHGRI-Fachquellen geprüft/verlinkt.
- Lernziele erweitert, Revision 1. Alle vier Tabellenkombinationen unabhängig geprüft (1:2:1); technischer Rendertest 192/192 bestanden. Keine umfassende Fach-/Browserabnahme; lokale Änderungen, Gesamtfertigstellung und Veröffentlichung offen.

### Menschheitsentwicklung: Befunde vorsichtig zuordnen
- 18 Standardrückmeldungen ersetzt; eine nahezu inhaltsgleiche Abschlussfrage zur Vielfalt durch eine konkrete Werkzeug-/Knochenfundfrage ersetzt. Räumliche Nähe belegt nicht automatisch den Hersteller eines Werkzeugs.
- Neue aufklappbare Aufgabe unterscheidet direkten Vorfahren und verwandten Seitenzweig. Alter und Ähnlichkeit allein reichen für direkte Abstammung nicht; Smithsonian-Fossilienquelle verlinkt.
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden. Phrasenprüfung weiterhin keine fachliche Vollabnahme; Änderungen lokal, Gesamtprüfung und Veröffentlichung offen.

### Biologie-Einstieg Klasse 3: Untersuchung statt Leerformeln
- 18 Standardrückmeldungen konkret erklärt. Fehlerhafte falsche Alternative „Regel, die nur für eine Person gilt“ ersetzt: individuelle Empfehlungen sind nicht grundsätzlich schlecht; jetzt wird das Ignorieren widersprechender Hinweise geprüft.
- Neue fiktive Schulhofaufgabe trennt Insektenbesuche von Artenzahl und einzelnen Vergleich von allgemeiner Ursachenregel. Aufklappbare Auswertung führt zu wiederholter Untersuchung mit definierter Zählregel.
- Lernziele erweitert, Revision 1. Technischer Rendertest 192/192 bestanden. Keine fachliche/visuelle Vollabnahme; lokale Änderungen, Gesamtfertigstellung und Veröffentlichung offen.

### Biologie: Kompetenzplan 4 und Haustier-Verantwortung (06.09.2026)
- Vorhandene Änderungen am Kompetenzplan der vierten Klasse geprüft: Quellenvergleich zum Schulhof trennt Oberflächen- und Lufttemperatur sowie Beleg und Entscheidungsziel; Kapitelrevision 1 vorhanden.
- Haustier-Kapitel: 25 pauschale Rückmeldungen durch antwortbezogene Erklärungen ersetzt. Neue Aufgabe mit aufklappbarer Musterbegründung prüft tägliche Zuständigkeiten, laufende Ausgaben und Betreuung bei Abwesenheit. Eine neue bewertete Transferfrage prüft den unvollständigen Betreuungsplan; Lernziele erweitert und Inhaltsrevision auf 1 gesetzt.
- Verifikation: audit_all_chapter_renders.js rendert alle 192 Kapitel ohne gemeldete Strukturprobleme. audit_learning_depth.js findet noch 197 bekannte pauschale Antworten in neun Biologie-Kapiteln; keine doppelten Fragen nach dessen Normalisierung. Dieser Audit prüft eine festgelegte Phrasenliste und ersetzt keine vollständige fachliche oder didaktische Abnahme.
- Änderungen lokal; keine neue Browserprüfung und keine Veröffentlichung in diesem Schritt.

### Biologie: Skelett, Bewegung und Modellgrenzen (06.09.2026)
- 36 Antworterklärungen im Skelett-Kapitel überarbeitet, darunter alle 28 bislang erkannten pauschalen Rückmeldungen. Mehrere unplausible Ablenkantworten durch fachnahe Verwechslungen ersetzt (Sehne/Band/Knorpel, Muskelzug/Knochenverkürzung, Gelenkform). Jede der 13 Fragen einschließlich Übung besitzt weiterhin genau eine richtige Antwort.
- Widersprüchliche Einteilung des Beckens präzisiert: Hüftbeine als Beckengürtel, Kreuzbein als Teil der Wirbelsäule. Quelle OpenStax Kapitel 8.
- Muskelkraft von Verkürzung unterschieden; Denkaufgabe zum Anheben, Halten und langsamen Absenken eines Buches mit aufklappbarer Erklärung ergänzt. Quellen OpenStax 11.1 und 10.4. Ellbogen-/Knie-Scharniermodell als Vereinfachung gekennzeichnet; Modell-/Zeichnungsalternative für Bewegungsaufgabe ergänzt.
- Verletzungsfreiheit nicht mehr versprochen; Verletzungsverdacht von Diagnose getrennt und österreichischer Rettungsnotruf 144 mit Quelle Gesundheitsportal ergänzt. Gesundheitsportal Knochenbruch am 06.09.2026 geprüft.
- Kapitelweite Lernziele aktualisiert, Revision 1 wegen veränderter bewerteter Inhalte. audit_all_chapter_renders.js: 192/192 ohne gemeldete Strukturprobleme. audit_learning_depth.js: noch 169 bekannte pauschale Rückmeldungen in acht Biologie-Kapiteln. Keine Browserprüfung oder Veröffentlichung; fachliche Gesamtprüfung weiterhin offen.

### Biologie: Atmung und Energiegewinnung (06.09.2026)
- 21 generische Rückmeldungen ersetzt und mehrere fachfremde Ablenkantworten durch typische Verwechslungen ersetzt: Luftbewegung/Gasaustausch/Zellatmung, Sauerstoff als Nährstoff, direkter Lufttransport vs. Bluttransport. Reaktionsbeschreibung trennt Stoffumwandlung und Energieumwandlung; aerober Schwerpunkt ausdrücklich benannt.
- Atemmessung: Ein- und Ausatmen als ein Atemzug erklärt, 30-Sekunden-Zählung auf Minutenwerte umgerechnet; freiwillige leichte Bewegung unter Lehrpersonen-Anleitung, gleichwertige Auswertung erfundener Daten möglich. Kein erwarteter Anstieg vorgegeben; keine Diagnose oder Fitnessrangliste aus Messwerten. Beispiel 8/13/9 in 30 Sekunden ergibt 16/26/18 pro Minute, rechnerisch geprüft.
- Grenzen des Fisch-Kiemen-Beispiels und Besonderheit des Tracheenwegs ergänzt. Quellen OpenStax Systeme des Gasaustauschs und österreichisches Gesundheitsportal Atemwegsfunktion/akute Atemnot verlinkt. Lüftungshinweis berücksichtigt Außenluftqualität; starke akute Atemnot als Notfall mit 144 benannt.
- Lernziele erweitert, Inhaltsrevision 1. Alle acht Fragen einschließlich Übung besitzen genau eine richtige Antwort. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: noch 148 erkannte pauschale Rückmeldungen in sieben Biologie-Kapiteln. Keine vollständige fachliche Abnahme, Browserprüfung oder Veröffentlichung.

### Biologie: Blutkreislauf und Pulsdaten (06.09.2026)
- 21 pauschale Antworterklärungen ersetzt; fachnahe Verwechslungen zu Blutbestandteilen, Kapillaren und Stofftransport ergänzt. Wärme nicht mehr als Stoff bezeichnet.
- Vollständigen Weg durch vier Herzhöhlen und beide Kreisläufe als Denkaufgabe mit aufklappbarer Erklärung ergänzt; Lungenarterie/Lungenvene nach Flussrichtung eingeordnet. Zusätzliche bewertete Transferfrage, erweiterte Lernziele, Revision 1. Blutplättchen als Zellfragmente und Zusammenarbeit mit Gerinnungsproteinen erklärt. Quellen österreichisches Gesundheitsportal Herz/Kreislauf und Blutbestandteile.
- Puls als Druckwelle präzisiert, freiwillige Unterrichtsmessung mit Beispieldatenalternative; persönliche Werte können privat bleiben. Drei Messpunkte nicht als vollständiger Erholungsverlauf oder Diagnose dargestellt. Beispiel 18/27/20 Schläge pro 15 Sekunden -> 72/108/80 pro Minute sowie Zählfehler 1 -> 4 pro Minute unabhängig nachgerechnet.
- Neun Fragen einschließlich Übung mit je genau einer richtigen Antwort bestätigt. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 127 verbleibende bekannte pauschale Rückmeldungen in sechs Biologie-Kapiteln. Keine Browserprüfung oder Veröffentlichung; fachliche Gesamtprüfung offen.

### Biologie: Ausscheidung und Rückresorption (06.09.2026)
- 21 pauschale Rückmeldungen durch antwortbezogene Erklärungen ersetzt, Ablenkantworten zu Harnweg, Organzusammenarbeit und Selbstdiagnosen fachnäher gestaltet. Filtration, Primärharn, Rückresorption und weitere Stofftransporte erklärt; Harnleiter/Blase/Harnröhre eindeutig unterschieden.
- Modellkritik mit aufklappbarer Begründung: Ein Sieb allein bildet Rückgewinnung nicht ab. Neue bewertete Transferfrage zum Unterschied zwischen Primärharn und Endharn. Übungsfrage trennt unverdaute Reste von Stoffwechselprodukten. Kapitelrevision 1 und Lernziele angepasst.
- Schwitzen als Temperaturregulation und Stuhlabgabe differenziert; persönliche Körperdaten für Trinkplanung nicht erforderlich. NIDDK Nierenfunktion und österreichisches Gesundheitsportal Nieren/Harnwege geprüft und im Kapitel verlinkt.
- Neun Fragen (acht bewertet, eine Übung) mit jeweils genau einer richtigen Antwort bestätigt. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 106 bekannte pauschale Rückmeldungen in fünf Biologie-Kapiteln verbleiben. Keine Browserprüfung, Veröffentlichung oder vollständige fachliche Abnahme in diesem Schritt.

### Biologie: Nerven, Reflexe und hormonelle Zielzellen (06.09.2026)
- 18 generische Rückmeldungen ersetzt; fachnahe Ablenkantworten statt Knochen/Magensäure. Rückziehreflex über Rückenmark von bewusster Reaktion unterschieden; Information ans Gehirn und andere Reflexzentren erwähnt. Hitze-Beispiel ausdrücklich als Denkaufgabe.
- Endokrine Botenstoffe und passende Rezeptoren erläutert. Neuer aufklappbarer Zwei-Zellen-Modellfall und bewertete Transferfrage. Geschwindigkeitsvergleich als Tendenz mit rascher Adrenalinwirkung präzisiert. Quellen OpenStax 14.3 und 17.1 sowie Gesundheitsportal Stress.
- Unpräzise Stressenergie-Formulierung entfernt; Unterstützung und äußere Belastungen berücksichtigt, keine Offenlegung eigener Stresssituationen erforderlich. Quelle Gesundheitsportal Stress bei Kindern und Jugendlichen. Lernziele erweitert, Inhaltsrevision 1.
- Sieben bewertete Fragen plus eine Übung, jeweils genau eine richtige Antwort bestätigt. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 88 bekannte pauschale Rückmeldungen in vier Biologie-Kapiteln verbleiben. Keine Browserprüfung oder Veröffentlichung; fachliche Gesamtabnahme offen.

### Biologie: Immunabwehr und Resistenzmodell (06.09.2026)
- 18 pauschale Antworterklärungen ersetzt, plausible Verwechslungen zu spezifischem Gedächtnis, Antibiotikawirkung und Gemeinschaftsschutz eingesetzt. Angeborene/erworbene Abwehr und zeitliche Überlappung erläutert; nicht alle Mikroorganismen als Erreger bezeichnet. Aktive Impfung und verringerte Übertragung differenziert, Einnahmehinweis an aktuelle ärztliche Verordnung gebunden.
- Fiktives Resistenzmodell mit aufklappbarer Auswertung ergänzt: 10/100 -> 10/10 -> 20/20 trennt Anteilserhöhung durch Auswahl von Anzahlserhöhung durch Vermehrung. Vorhandene Resistenz als Annahme, Modellgrenzen und keine reale Behandlungsvorhersage ausdrücklich genannt. Lernziele erweitert und Kapitelrevision 1 gesetzt.
- Vorhandene Gesundheitsportal-Quellen zu Antibiotikaresistenz und Impfschutz am 06.09.2026 erneut geprüft. Sieben Fragen mit je einer richtigen Antwort und Modellanteile 10/100/100 Prozent geprüft. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 70 bekannte pauschale Rückmeldungen in drei Biologie-Kapiteln verbleiben. Keine Browserprüfung, Veröffentlichung oder fachliche Gesamtabnahme.

### Biologie: Ernährung, Verdauung und Portionsvergleich (06.09.2026)
- 26 pauschale Rückmeldungen ersetzt. Kohlenhydratfrage vermeidet pauschal schnelle Verfügbarkeit. Verdauung, Aufnahme und Zellverwertung getrennt; Lymphweg vieler Fette sowie Unterstützung durch Leber/Bauchspeicheldrüse ergänzt. Irreführenden perfekten Bedarfsfilter im Recyclingvergleich korrigiert.
- Brotbeobachtung als optionale, verträgliche Alternative zur Denkaufgabe gestaltet. Allergene auf verpackten Lebensmitteln präzisiert; fehlende Ballaststoffangabe nicht als Nullwert behandeln. AGES-Kennzeichnungsquelle und NIDDK-Verdauungsquelle geprüft und ergänzt.
- Neuer fiktiver Portionsvergleich: A 6g/100ml in 200ml -> 12g; B 4g/100ml in 500ml -> 20g. Rechnung unabhängig geprüft. Kapitelweite Lernziele, Revision 1. Zwölf Fragen einschließlich Übung mit je einer richtigen Antwort bestätigt.
- Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 44 bekannte pauschale Antworten in zwei Biologie-Kapiteln verbleiben. Keine Browserprüfung, Veröffentlichung oder vollständige fachliche Abnahme.

### Biologie: Sexualität, Entwicklung und Verantwortung (06.09.2026)
- 18 pauschale Rückmeldungen durch konkrete Erklärungen ersetzt. Fachnahe Ablenkantworten unterscheiden Eisprung, Befruchtung und Einnistung; reguläre Schwangerschaft in der Gebärmutter als Fragestellung präzisiert. Zyklus nicht als automatische Schwangerschaftskette dargestellt; Kalenderdarstellung kein sicherer Verhütungsplan.
- Vergleich Kondom/Pille trennt Schwangerschaftsverhütung von Infektionsschutz; Gesundheitsportal-Quellen geprüft und verlinkt. Fiktive Umarmungssituation mit aufklappbarer Erklärung zur widerrufbaren Zustimmung. Privatsphäre von erzwungener Geheimhaltung unterschieden. Rat auf Draht 147 anonym/kostenlos/rund um die Uhr über offizielle Website geprüft und ergänzt; keine persönliche Offenlegung erforderlich.
- Lernziele erweitert, Inhaltsrevision 1. Sieben Fragen einschließlich Übung mit je einer richtigen Antwort bestätigt. Renderaudit 192/192 ohne gemeldete Strukturprobleme. Phrasenaudit: 26 bekannte pauschale Rückmeldungen in einem Biologie-Kapitel verbleiben. Keine Browserprüfung oder Veröffentlichung; fachliche Gesamtprüfung weiterhin offen.

### Biologie: Pubertät der ersten Klasse und Abschluss der Phrasenliste (06.09.2026)
- 26 pauschale Rückmeldungen ersetzt. Befruchtungsdiagramm korrigiert: Ei- und Samenzelle gemeinsam vor Befruchtung statt irreführender Umwandlung Eizelle -> Samenzelle; weitere Zellteilungen und mögliche Einnistung ausdrücklich. Quelle Gesundheitsportal aus vorangegangener Prüfung verlinkt.
- Unterrichtsfall mit aufklappbarer Antwort zur freiwilligen persönlichen Offenlegung ergänzt. Schweigen/Erstarren nicht als Zustimmung oder Schuld dargestellt. Rat auf Draht 147 mit im vorangegangenen Schritt verifizierter Erreichbarkeit verlinkt. Lernziele erweitert, Revision 1.
- Zwölf Fragen einschließlich Übung, jeweils eine richtige Antwort bestätigt. Renderaudit 192/192 ohne gemeldete Strukturprobleme. audit_learning_depth.js findet erstmals keine der 17 bekannten generischen Feedbackphrasen mehr in allen 192 deutschen Kapiteln. Das ist nur die Abdeckung dieser konkreten Phrasenliste, kein Nachweis vollständiger Didaktik, Fachrichtigkeit, Übersetzung oder Lehrplanabdeckung. Keine Browserprüfung oder Veröffentlichung.

### Gesamtprüfung nach Biologie-Überarbeitung (06.09.2026)
- Vollständiger vorhandener Funktionslauf abgeschlossen: 69/69 Tests bestanden. Umfang umfasst u.a. Lernwege, Quiz-Auswertung, alte Inhaltsrevisionen, Speicherungsausfälle, Fokusführung und vorhandene Simulationstests; kein Nachweis vollständiger Fachlichkeit oder visueller Darstellung.
- 15 Prüfungen des bestehenden Shell-Quality-Gates unter Node/Windows ausgeführt und Einzelresultate in ../quality-gate-report.json gespeichert: zunächst 12 bestanden. Mathematik-A11y-Audit erkannte setAttribute ohne Leerzeichen fälschlich nicht; Erkennung korrigiert. Zwei Mathematikübungen erhalten explizites aria-atomic=true für vollständige Rückmeldungen (role=status war bereits vorhanden). Audit und betroffene Funktionsprüfungen bestanden nach Änderung.
- Zwei lange Klimawandel-Rückmeldungen ohne Bedeutungsverlust gekürzt; audit_remaining_subjects_language.js danach bestanden. Offen bleibt audit_math_language.js: math3_4_flaechensatz fehlt in ar/en/sr/tr/uk. Vorhandener Sprachfallback verhindert stille fehlerhafte Übersetzungsnutzung, erfüllt aber nicht die vollständige Übersetzungsanforderung.
- Der gespeicherte Quality-Gate-Bericht dokumentiert den ursprünglichen Lauf vor den beiden Korrekturen; Nachprüfungen sind oben separat dokumentiert. git diff --check bestanden (nur Zeilenendenhinweise). Keine Browserprüfung oder Veröffentlichung.

### Englische Fassung des Flächenkapitels (06.09.2026)
- math3_4_flaechensatz in en.json vollständig ergänzt: vier Abschnitte, acht Quizfragen mit Erklärungen, Lernziele/Zusammenfassung, Formelsortierung und Grundriss-Schreibaufgabe. sourceRevision 1 und contentLanguage en entsprechen der aktuellen deutschen Fassung.
- Flächenlabor liest optionale Locale und übersetzte Bezeichnungen für Grundseite/Höhe/zweite Parallelseite aus seinem Kapitel-Markup; deutscher Standard bleibt erhalten. Englische Dezimaldarstellung und SVG-Beschreibung dadurch nicht mehr deutsch.
- Bestehenden Flächenfunktionstest um tatsächliches englisches Template-Rendering mit Sprachwahl, Revisionserkennung ohne Fallback, acht Fragen, Workshop und interaktivem Dreiecksbeispiel 4.5 cm² ergänzt. Gesamter Flächentest bestanden, einschließlich unabhängiger deutscher Polygonflächenprüfung.
- audit_math_language.js meldet nun noch die vier fehlenden Fassungen ar/sr/tr/uk für dieses Kapitel. Keine Behauptung vollständiger Übersetzung aller Fächer; keine Browserprüfung oder Veröffentlichung.

### Serbische Fassung des Flächenkapitels (06.09.2026)
- Vollständige serbische Fassung in lateinischer Schrift ergänzt: vier Abschnitte, acht Fragen samt Erklärungen, Labor, Formelsortierung und Grundrissaufgabe. contentLanguage sr, sourceRevision 1.
- Tatsächliches JSDOM-Template mit Sprachwahl sr geprüft: serbischer Titel ohne Sprachfallback, acht bewertete Fragen, übersetzte Werkstatt, serbische SVG-Beschreibung und Dezimalkomma bei 4,5 cm². Bestanden. Der Sprachquellenaudit meldet für dieses Kapitel noch ar/tr/uk als fehlend.
- Keine Browserprüfung oder Veröffentlichung; vollständige Sprachprüfung des Gesamtangebots weiterhin offen.

### Türkische Fassung des Flächenkapitels (06.09.2026)
- Vier Abschnitte, acht Quizfragen samt Rückmeldungen, Laborbeschriftungen, Lernziele/Zusammenfassung sowie vollständige Werkstatt ins Türkische übertragen. sourceRevision 1 und contentLanguage tr.
- Tatsächliches JSDOM-Template mit Sprachwahl tr geprüft: türkischer Titel ohne Sprachfallback, acht bewertete Fragen, Werkstatt, türkische SVG-Beschreibung und 4,5 cm² beim interaktiven Dreieck. Bestanden. audit_math_language.js meldet noch ar/uk für dieses Kapitel.
- Keine Browserprüfung oder Veröffentlichung; Gesamtübersetzungsprüfung bleibt offen.

### Ukrainische Fassung des Flächenkapitels (06.09.2026)
- Vier Abschnitte, acht Quizfragen samt Rückmeldungen, Lernziele/Zusammenfassung, Labor und vollständige Grundrisswerkstatt ins Ukrainische übertragen. sourceRevision 1, contentLanguage uk; mathematische Kennzeichen und internationale Einheiten erhalten.
- JSDOM-Template mit Sprachwahl uk: ukrainischer Titel ohne Fallback, acht Fragen, Werkstatt, ukrainische SVG-Beschreibung und Dezimalkomma bei 4,5 cm² geprüft und bestanden. audit_math_language.js meldet für dieses Kapitel nur noch ar als fehlend.
- Keine Browserprüfung oder Veröffentlichung; fachliche und sprachliche Gesamtabnahme weiterhin offen.

### Flächenkapitel: arabische Fassung und gemeinsame Sprachprüfung
- Die arabische Fassung von `math3_4_flaechensatz` enthält Erklärungen, acht Prüfungsfragen mit Rückmeldungen, Lernziele, Zusammenfassung und Werkstatt. Grammatik der Erklärung zur Verdopplung eines Trapezes korrigiert.
- `test_area_chapter.js` prüft nun zusätzlich Serbisch, Türkisch, Ukrainisch und Arabisch durch den tatsächlichen Renderer: lokalisierter Titel, kein deutscher Ersatztext, acht Fragen, Dezimaldarstellung, SVG-Beschreibung und Werkstatt. Für Arabisch werden die RTL-Kapitelrichtung und die LTR-Geometrie/Ergebnisdarstellung geprüft. Deutsch und Englisch bleiben ebenfalls abgedeckt.
- Ergebnis: Flächenkapitel-Test bestanden; Mathematik-Sprachaudit bestanden (3330 Rückmeldungen in sechs Sprachen). Alle 15 Befehle aus `run_quality_gate.sh` wurden erneut erfolgreich ausgeführt; der aktuelle Bericht liegt unter `../quality-gate-report.json`.
- Reichweite: Diese Prüfungen bestätigen die jeweils implementierten Kontrollen, keine vollständige fachliche oder visuelle Abnahme. Insbesondere sind Browserprüfung, vollständige Übersetzungsabdeckung aller überarbeiteten Kapitel, Lehrplanabgleich sämtlicher Fächer und Veröffentlichung weiterhin offen.

### Körpergeometrie der 3. Klasse: nachgewiesene Inhaltslücke geschlossen
- Das Kapitel `math3_9_koerper` behandelte bisher überwiegend Körpererkennung und Quader-Volumen. Der lokal gespeicherte RIS-Lehrplantext nennt für die 3. Klasse gerade Prismen (Oberfläche und Volumen) und Pyramiden (Volumen). Der erneute Liveabruf der RIS-Gesamtfassung scheiterte mit HTTP 503; die aktuelle Rechtsfassung wurde in diesem Schritt daher nicht erneut bestätigt.
- Vier Abschnitte unterscheiden nun reale Gegenstände und Modelle, Innen-/Außenmaße, Oberfläche/Volumen, Grundflächenhöhe/Körperhöhe sowie Prisma/Pyramide. Mantelformel aus aufgeklappten Rechteckflächen erläutert; Pyramidensimulation ausdrücklich als Formelvergleich ohne Beweisanspruch gekennzeichnet.
- Neun bewertete Fragen mit konkreten Fehlvorstellungen und individuellen Rückmeldungen. Neue Werkstatt: Netz einer offenen Materialkiste, 4000 cm² Materialfläche und 24 Liter Modellvolumen; Wandstärke, Verschnitt und Verbindungen als Modellgrenzen. Vorwissen um Flächenkapitel ergänzt, Navigationstitel angepasst, Inhaltsrevision auf 2 erhöht.
- Vergleichslabor für Grundfläche und Körperhöhe mit nativen Reglern, vollständigem Live-Ergebnis und Reset. Bestehende 2D/3D-Prüfung akzeptiert nicht mehr beliebige Texte mit Teilstring „3d“.
- `test_solid_chapter.js`: echter Renderer, neun Fragen, 400 Wertekombinationen, Reset, Eingabevalidierung, Werkstatt und Veraltung alter Quizstände bestanden. `audit_all_chapter_renders.js`: alle 192 Kapitel erfolgreich, keine erkannten Probleme.
- Weiter offen: neue Kapitelübersetzungen, räumliche Darstellungen/Netze über die eigene Zeichnung hinaus und vollständiger Mathematik-Lehrplanabgleich. Die gespeicherte Lehrplanfassung nennt Pythagoras für Klasse 4 und Dreiecks-/Vierecksflächen bereits für Klasse 2; die bestehende Kapitelzuordnung muss daraufhin systematisch geprüft werden. Keine vollständige fachliche oder visuelle Abnahme behauptet.

### Räumliche Darstellung und Prismennetz
- `math3_9_koerper`: eigener SVG-Vergleich eines geraden Dreiecksprismas mit seinem maßstäblichen Netz. Grunddreieck 3–4–5 cm, Körperhöhe 6 cm; zwei Dreiecke und drei Rechtecke sind einzeln sichtbar. Körperbild ausdrücklich als verzerrtes Schrägbild bezeichnet.
- Native Schaltflächen wechseln Körper/Netz und heben Grundflächen bzw. Mantel mit dicker Umrandung hervor. Text und SVG-Beschreibung erklären 12 cm² Grund-/Deckflächen, 72 cm² Mantel, 84 cm² Oberfläche und 36 cm³ Volumen. Keine Animation oder automatische Bewegung; der Fokus bleibt auf dem gewählten Steuerelement.
- `test_solid_chapter.js` prüft zusätzlich alle sechs Ansicht/Auswahl-Kombinationen, hervorgehobene Flächen, Beschreibungen und Fokusbestand. Unabhängige Polygonflächenberechnung bestätigt die Netzflächen 6, 6, 18, 24 und 30 cm² sowie die Zeichenbereichsgrenzen. Bestehende 400 Volumenvergleiche bestehen weiterhin.
- Mathematik-A11y-Audit verlangte bislang für native Buttons unnötige eigene Tastaturhandler und Rollen. Die Prüfung erkennt nun die tatsächlich vorhandenen Auswahl-Tags im Kapitel/Script; nur durchgängig native, nicht deaktivierte Buttons erhalten die Ausnahme für implizite Tastatur-/Fokussemantik. Zustandskennzeichnung bleibt erforderlich. Audit bestanden; dies ersetzt keine Browser- oder Screenreaderprüfung.
- Keine neue Inhaltsrevision: Formeln und bewertete Aufgaben bleiben gegenüber Revision 2 gleich. Weiterhin lokal, keine Veröffentlichung und keine visuelle Browserabnahme.

### Mathematik: Flächenberechnung und Pythagoras im Lernweg
- Gespeicherte RIS-Anlage 1 (ELI `https://ris.bka.gv.at/eli/bgbl/ii/2012/185/ANL1/NOR40271471`): Dreiecks-/Vierecksflächen in Klasse 2, Vielecksflächen in Klasse 3, Pythagoras in Klasse 4. Erneuter Liveabruf sowohl der Normseite als auch des ELI-Links nicht erfolgreich (HTTP 503 bzw. Fetchfehler); keine erneute Aktualitätsbestätigung behauptet.
- `math3_4_flaechensatz` folgt jetzt auf die Geometriegrundlagen der 2. Klasse und erscheint über explizite `gradeLevels: [6,7]` in Klasse 2 sowie zur Wiederholung/Anwendung in Klasse 3. Sein Inhalt und seine stabile URL bleiben erhalten. Geometrie der 2. Klasse als Vorwissen in allen sechs vorhandenen Fassungen ergänzt.
- `math3_8_pythagoras` steht nun in Klasse 4 nach reellen Zahlen/Wurzeln und vor dem Anwendungskapitel. Wurzeln als Vorwissen ergänzt. Die historischen IDs dienen weiter bestehenden Links und gespeicherten Stofflisten; die sichtbare Klassenstufe wird aus dem Katalog bestimmt.
- Veraltete laufende Nummern aus Mathematik-Navigationstiteln entfernt, damit verschobene Kapitel keine widersprüchliche Nummerierung zeigen. Grundlagen und Anwendungen von Pythagoras erhalten unterscheidbare Navigationstitel.
- Erweitertes `test_learning_flows.js` bestätigt die tatsächlich gerenderten Filterlisten für Schulstufen 6, 7 und 8 sowie die fachlichen Reihenfolgen. `test_chapter_navigation.js` bestätigt außerdem sämtliche fachinternen Vorwissensabhängigkeiten und den Erhalt geteilter Wiederholungsreihenfolgen. Flächenkapitel einschließlich sechs Sprachen weiterhin erfolgreich getestet.
- Diese Korrektur ersetzt keinen vollständigen Mathematik-Lehrplanabgleich. Insbesondere Daten/Zufall der ersten Klasse und die Ausarbeitung sämtlicher Anwendungsbereiche müssen weiter geprüft werden. Keine Veröffentlichung erfolgt.

### Statistikgrundlagen für Klasse 1 und Aufbau Klasse 2
- `math2_8_statistik` vollständig überarbeitet: klar definierte fiktive Befragung, absolute Häufigkeiten, beschriftetes Säulendiagramm, Minimum/Maximum/Spannweite, Mittelwert und Median kleiner Listen. Aufbauabschnitt zu relativen Häufigkeiten ausdrücklich als Klasse 2 gekennzeichnet; Vergleich unterschiedlich großer Gruppen und Grenzen der Verallgemeinerung enthalten.
- Grundlage der Zuordnung: bereits gespeicherter RIS-Text, Mathematik Klasse 1, Anwendungsbereich Daten und Zufall (Kennzahlen einschließlich Median sowie einfache Abzählaufgaben). Kapitel im Katalog für Schulstufen 5 und 6 zugänglich, stabile ID erhalten. Keine neue Bestätigung der aktuellen Rechtsfassung in diesem Schritt.
- Diagrammlabor mit drei editierbaren absoluten Häufigkeiten, fester Null-Skala 0–20, proportionalen Säulen, Wertbeschriftungen und vollständiger Datentabelle. Relative Häufigkeiten als Brüche, bei null Antworten ausdrücklich nicht bestimmt. Ungültige Eingaben verändern die letzte gültige Darstellung nicht; Fehlermeldung und Fokus auf fehlerhaftes Feld. Aktualisierung per Button oder Enter, Reset und idempotente Initialisierung.
- Zehn Prüfungsfragen mit plausiblen Fehlvorstellungen und konkreten Rückmeldungen. Werkstatt ergänzt systematisches Abzählen von sechs Menü-Kombinationen sowie Planung einer anonymen Befragung. Revision 1 verhindert, dass alte Ergebnisse aus dem wesentlich einfacheren Kapitel als aktueller Kompetenznachweis erscheinen.
- `test_statistics_foundations.js` bestanden: echter Renderer, zehn Fragen, Klassenmetadaten, Säulenproportionen/Nullbeginn, leere Datensätze, Eingabefehler, Enter, Reset und Revisionswechsel. Kapitelnavigation mit allen fachinternen Abhängigkeiten und Mathematik-A11y-Audit bestanden. Alle 192 Kapitel durch Renderaudit geprüft, keine erkannten Probleme.
- Offen bleiben die aktualisierten Übersetzungen dieses Kapitels (sichtbarer deutscher Fallback), browsergestützte visuelle Abnahme und Gesamtprüfung/Veröffentlichung. Das gemeinsame Kapitelquiz umfasst auch den deutlich gekennzeichneten Aufbauabschnitt der zweiten Klasse; für einen ausschließlich auf Klasse 1 zugeschnittenen Check ist eine Auswahl der Abschnitte weiter zu prüfen.

### Statistik: getrennt zuweisbarer Stoff für Klasse 1 und Klasse 2
- Das zuvor kombinierte Kapitel stellte im gemeinsamen Quiz auch Fragen des Aufbauabschnitts an Lernende der ersten Klasse. Der Stoff ist jetzt in zwei reguläre, separat auswählbare Kapitel getrennt: `math2_8_statistik` enthält unter stabiler URL ausschließlich Grundlagen der Klasse 1; `math2_9_relative_haeufigkeit` enthält das Aufbaukapitel für Klasse 2.
- Grundlagen: acht Fragen ohne Prozent-/Anteilsaufgaben, Diagrammtabelle zeigt nur Anzahlen, Inhaltsrevision auf 2 erhöht. Neues Kapitel: acht eigenständige Fragen zu Bezugsgruppen, fehlenden Antworten, Nullmenge, Anteilsdarstellungen, Gruppenvergleich, Prozentpunkten und Aussagegrenzen; eigene Ziele, Zusammenfassung und Vergleichswerkstatt. Vorwissen verweist auf Statistikgrundlagen, Brüche und Prozentrechnung.
- Die vorhandene Stoffliste kann beide Kapitel unabhängig auswählen, teilen und drucken; damit müssen weder Lehrkraft noch Lernende Teilfragen aus einem gemischten Kapitelcheck aussortieren. Es wurde keine allgemeine Abschnittsauswahl implementiert.
- `test_statistics_foundations.js`: beide echten Kapitelrenderer mit disjunkten Fragen, neue Werkstattzuordnung 3/3 sowie weiterhin Diagramm-/Eingabeprüfungen bestanden. `test_learning_flows.js`: tatsächliche Klassenfilter zeigen Grundlagen nur in Schulstufe 5, relatives Kapitel nur in Schulstufe 6. Kapitelnavigation und Quizfeedbackaudit bestanden. Renderaudit: alle 193 Kapitel ohne erkannte Probleme.
- Weiter offen: Übersetzungen der überarbeiteten/neuen Inhalte, abschließende fachliche und visuelle Gesamtprüfung sowie Veröffentlichung. Aktueller Arbeitsstand bleibt lokal.

### Kennzahlen interaktiv vergleichen
- Statistikgrundlagen: neues Labor mit drei festen Wartezeiten (2, 4, 4 Minuten), veränderbarer vierter Wartezeit (0–40 Minuten) und optionaler fünfter Beobachtung (6 Minuten). Die geordnete Liste hebt die mittleren Positionen hervor; Mittelwert und Median werden mit Rechenwegen ausgegeben. Minimum, Maximum und Spannweite stehen im vollständigen Live-Status.
- Die Aufgabe vergleicht gezielt 10 und 30 Minuten: Mittelwert 5 bzw. 10 Minuten, Median jeweils 4 Minuten. Der Wechsel zur fünften Beobachtung erklärt die Medianbestimmung bei ungerader Anzahl. Native Regler-/Checkbox-Bedienung, verständlicher Reglerwert in Minuten und Reset mit erhaltenem Fokus.
- `test_statistics_foundations.js` erweitert: alle 82 Kombinationen der vierten Wartezeit und optionalen fünften Beobachtung anhand unabhängiger Fallformeln geprüft; Medianmarkierung, Reglerbeschreibung, gezielter Vergleich, Reset und wiederholte Initialisierung bestanden. Beide Statistik-Kapitel und bestehendes Häufigkeitslabor bleiben im Test enthalten. Mathematik-A11y und Syntaxaudit bestanden.
- Keine neue Inhaltsrevision: bestehende Formeln, Lernziele und bewertete Fragen bleiben unverändert. Visuelle Browserprüfung und Übersetzungen weiterhin offen; Änderungen lokal.

### Gesamtprüfung nach den Mathematik-Ergänzungen
- Alle 15 Befehle des bestehenden Qualitätsgates erneut erfolgreich ausgeführt; aktueller Bericht `../quality-gate-report.json`. Die Aussagen bleiben auf die implementierten Prüfungen begrenzt.
- Vollständige Funktionstestsammlung gestartet. Dabei fand `test_math2_guides.js` eine veraltete Annahme: genau acht IDs mit Präfix `math2_`. Der Test wählt jetzt die tatsächlichen Katalogeinträge für Schulstufe 6; die bewusst beibehaltenen historischen IDs bestimmen nicht die Klassenstufe. Zusätzliche Prüfaussagen sichern Flächenkapitel/neues relatives Kapitel und Ausschluss der in Klasse 1 eingeordneten Statistikgrundlagen. Korrigierter Test separat erfolgreich ausgeführt.
- Neues `audit_translation_coverage.js` verwendet die echte `selectCurrentTopic`-Logik für alle 193 Katalogkapitel in fünf Zusatzsprachen. Ergebnis je Sprache: 39 ausgewählte Übersetzungen, 154 deutsche Ersatzfassungen. Gründe: 99 fehlende Übersetzungen, 53 unpassende Inhaltsrevisionen, 2 inkompatible Strukturen (Klimawandel, Geometrie Klasse 2). Bericht: `../translation-coverage-report.json`.
- Diese Bestandsaufnahme bestätigt keine sprachliche Qualität der 39 geladenen Fassungen und prüft nicht deren sämtliche Laufzeitbeschriftungen. Sie macht die erhebliche verbleibende Übersetzungsarbeit sichtbar, die die engeren grünen Sprachaudits bislang nicht abbilden.
- Abschluss des Gesamtlaufs: 70/71 Tests bestanden; einzige Fehlstelle war die oben korrigierte veraltete Klassenannahme. Der gezielte Nachtest besteht; sein eigener Bericht liegt in `../functional-test-followup.json`. Der ursprüngliche Gesamtbericht bleibt unverändert, damit Fehlschlag und Nachprüfung nachvollziehbar bleiben. Keine Produktcodeänderung nach diesem Gesamtlauf.

### Englische relative Häufigkeiten und Werkstattbedienung
- `lang/en.json` enthält nun das vollständige Kapitel `math2_9_relative_haeufigkeit`: vier Abschnitte, acht Fragen mit 24 übersetzten Rückmeldungen, Lernziele, Zusammenfassung und Vergleichswerkstatt. IDs, Korrektheitsmarkierungen, Zahlenbeispiele und Vorwissen entsprechen der deutschen Quelle; explizite englische Inhaltssprache und Quellenrevision 0.
- Echte Rendererprüfung fand trotz übersetzter Aufgaben deutsche Bedienelemente in der gemeinsamen Werkstatt. `language-workshop.js` lokalisiert jetzt für explizit englische Inhalte auch Auswahl-/Prüftexte, dynamische Rückmeldungen, Entwurf-/Speicherhinweise, Selbstcheck und Vorlesebedienung. Deutscher Fallback sowie deutsch angeleiteter Englischunterricht bleiben deutsch bedienbar.
- Statistiktest prüft englische Darstellung ohne Ersatzhinweis, acht Fragen, gleiche Antwortwertungen, übersetzte Werkstatt, fehlende Zuordnungen, erfolgreiche Prüfung 3/3 und englischen Speicherstatus. Deutsche Werkstätten (11 Kapitel), Englischunterricht (9 Kapitel) und Flächenkapitel weiterhin erfolgreich getestet.
- Übersetzungsabdeckung nun Englisch 40 ausgewählte Fassungen / 153 deutsche Ersatzfassungen; übrige Zusatzsprachen jeweils 39 / 154. Gemeinsame Werkstattbeschriftungen für Arabisch, Serbisch, Türkisch und Ukrainisch bleiben noch zu übersetzen; die frühere Annahme ihrer vollständigen Lokalisierung ist durch den nun gelesenen Quellcode widerlegt. Keine visuelle Abnahme oder Veröffentlichung.

### Gemeinsame Werkstatttexte in sechs Sprachen
- Gemeinsame Werkstattoberfläche nun auch für explizit arabische, serbische (lateinische), türkische und ukrainische Kapitel lokalisiert: Auswahl, Prüfbutton, fehlende Zuordnungen, richtige/falsche Antworten, Ergebnis, Entwurf, Speichererfolg/-fehler, Datenschutzbeschreibung, Kriterien und Vergleichslösung. Vorlesebedienung und Hinweise ebenfalls übersetzt; ohne explizite Stimme wird die Kapitelsprache gewählt.
- Deutsche Ersatzfassungen verwenden weiterhin deutsche Bedienelemente. Die Sprache folgt dem ausgewählten Kapitelinhalt, nicht blind der gewünschten Oberflächensprache. Arabische Anzahlen werden über die Locale formatiert; die konkrete Ziffernform kann mit der Laufzeitumgebung variieren.
- Neues `test_workshop_languages.js` prüft alle sechs echten Flächenkapitel-Werkstätten: unvollständige Auswahl mit Fokusführung, 3/3 korrekte Zuordnungen, übersetzte Texte, verzögerten Speicherhinweis und simulierten Speicherfehler, wiederholte Initialisierung sowie deutschen Fallback. Test bestanden, ebenso deutsche Werkstätten und Flächenkapitel; Statistik-Englisch und bestehender Englischunterricht zuvor ebenfalls bestanden.
- Diese Änderung übersetzt gemeinsame Bedienelemente, nicht die noch fehlenden Kapitelinhalte. Die dokumentierte große Übersetzungslücke bleibt bestehen. Keine visuelle Browserprüfung oder Veröffentlichung.

### Relative Häufigkeiten auf Serbisch
- Vollständige serbische Fassung in lateinischer Schrift für `math2_9_relative_haeufigkeit`: vier Abschnitte, acht Fragen mit 24 individuellen Rückmeldungen, Ziele, Zusammenfassung und Werkstatt samt Kriterien und Musterlösung. Inhalts-/Frage-IDs, Antwortwertungen und Zahlenbeispiele entsprechen der deutschen Quelle.
- Statistiktest um echten serbischen Rendereraufruf ergänzt: kein deutscher Ersatzhinweis, acht Fragen, übersetzte Werkstattbedienung, erfolgreiche Zuordnung 3/3 sowie strukturell identische Frage-IDs und Korrektheitsmarkierungen. Test und Quizfeedbackaudit bestanden.
- Aktueller Abdeckungsbericht: Englisch und Serbisch jeweils 40 ausgewählte Übersetzungen / 153 deutsche Ersatzfassungen; Arabisch, Türkisch und Ukrainisch weiterhin jeweils 39 / 154. Diese Zahlen sind Auswahl-/Revisionsnachweise, keine pauschale fachliche oder sprachliche Zertifizierung. Veröffentlichung und visuelle Gesamtprüfung bleiben offen.

### Relative Häufigkeiten auf Türkisch
- Türkische Fassung von `math2_9_relative_haeufigkeit` ergänzt: vier Abschnitte, acht Fragen mit 24 Rückmeldungen, Ziele, Zusammenfassung, Werkstatt/Kriterien/Musterlösung. Türkische Prozentnotation mit vorangestelltem Prozentzeichen und Dezimalkomma verwendet; fachliche Zahlenbeispiele und Wertungen erhalten.
- Statistiktest um tatsächliche türkische Darstellung erweitert: kein deutscher Ersatzhinweis, acht Fragen, gleiche Frage-IDs und Korrektheitsmarkierungen, übersetzte Werkstatt und erfolgreiche Zuordnung 3/3. Test und Quizfeedbackaudit bestanden.
- Auswahlabdeckung jetzt Englisch/Serbisch/Türkisch jeweils 40 übersetzte Kapitel und 153 deutsche Ersatzfassungen; Arabisch/Ukrainisch weiterhin 39/154. Vollständige Übersetzungsabdeckung und visuelle Abnahme bleiben offen. Änderungen lokal, keine Veröffentlichung.

### Relative Häufigkeiten auf Ukrainisch
- Ukrainische Fassung von `math2_9_relative_haeufigkeit` ergänzt: alle vier Abschnitte, acht Fragen mit 24 Rückmeldungen, Lernziele, Zusammenfassung, Werkstatt, Kriterien und Musterlösung. Dezimalkomma, Bezugsgruppen, fehlende Antworten und Unterscheidung von Prozentpunkten/relativer Änderung erhalten.
- Echter ukrainischer Renderer im Statistiktest: kein deutscher Ersatztext, acht Fragen, korrekte Inhaltssprache, identische Frage-IDs und Antwortwertungen, erfolgreiche lokalisierte Werkstattzuordnung 3/3. Test und Quizfeedbackaudit bestanden.
- Auswahlabdeckung nun Englisch/Serbisch/Türkisch/Ukrainisch jeweils 40 übersetzte Kapitel und 153 Ersatzfassungen; Arabisch weiterhin 39/154. Keine Aussage, dass damit alle geladenen Texte fachlich abgenommen wären. Weitere Übersetzungen, visuelle Prüfung und Veröffentlichung offen.

### Relative Häufigkeiten auf Arabisch: sechs Sprachfassungen vorhanden
- Arabische Fassung von `math2_9_relative_haeufigkeit` ergänzt: vier Abschnitte, acht Fragen mit 24 Rückmeldungen, Ziele, Zusammenfassung, Werkstatt/Kriterien/Musterlösung. Inhaltsrevision 0 und explizite Inhaltssprache `ar` stimmen mit dem aktuellen Ausgangskapitel überein.
- Rechenausdrücke in HTML-Erklärungen mit `bdi dir="ltr"` isoliert; in reinen Textfeldern vollständige Rechenausdrücke mit Unicode-LTR-Isolaten ausgezeichnet. Arabische Prosa bleibt RTL. Die visuelle Wirkung ist noch im Browser zu prüfen.
- Statistiktest prüft nun auch den echten arabischen Renderer: kein Ersatzhinweis, acht Fragen mit gleichen IDs/Wertungen, RTL-Kapitel, LTR-Formelauszeichnung und erfolgreiche lokalisierte Zuordnung 3/3. Tests für sämtliche sechs Sprachfassungen des relativen Kapitels sowie Quizfeedbackaudit bestanden.
- Alle fünf Zusatzsprachen zeigen laut Auswahlbericht jeweils 40 Übersetzungen und 153 deutsche Ersatzfassungen. Das relative Kapitel ist in allen sechs Sprachen vorhanden; daraus folgt keine vollständige Übersetzungsabdeckung der Website. Weitere Inhalte, visuelle Gesamtprüfung und Veröffentlichung bleiben offen.

### Englische Kapitelcheck-Oberfläche vervollständigt
- Gemeinsamer Renderer verwendet die UI-Übersetzung jetzt auch für Verständnischeck-Titel, unbegrenztes Üben, überarbeitete Kapitel, besten Versuch, Umfangshinweis, Wiederholungslinks, Ergebnisanzahl, Speicherstatus und Lernempfehlung nach der Abgabe. Englische Texte ergänzt, deutsche Darstellung unverändert.
- Neues `test_quiz_language.js` prüft den tatsächlichen englischen Kapitelrenderer einschließlich Öffnen, erster fehlender Antwort, bestandenem/nicht bestandenem Check, Wiederholungslinks, Speicherfehler und Ergebnisfokus. Test bestanden; bestehende Speicherfehler-/Fokustests, Statistik-Sprachtests und Syntaxaudit ebenfalls bestanden.
- Für die vier weiteren Zusatzsprachen fehlen Teile dieser neu angeschlossenen UI-Texte noch. Diese Änderung allein bedeutet keine vollständige Lokalisierung der Kapiteloberfläche. Keine visuelle Browserprüfung oder Veröffentlichung.

### Kapitelcheck-Texte in allen fünf Zusatzsprachen
- Die zuletzt angeschlossenen Kapitelcheck-Texte nun auch auf Arabisch, Serbisch, Türkisch und Ukrainisch ergänzt: Überschriften, Status, Umfang/Abgabehinweise, fehlende Antwort, Ergebnisanzahl, Wiederholungslink, Speicherstatus/-fehler und Lernempfehlungen. Serbische vorhandene Grundbeschriftungen an die lateinische Schrift der aktuellen Kapitel und Werkstätten angeglichen.
- `test_quiz_language.js` erweitert auf fünf Sprachen mit je bestandenem, nicht bestandenem und nicht speicherbarem Ergebnis. Alle 15 Szenarien prüfen tatsächliche Kapitelrenderer, Startkarte, unvollständige Abgabe, acht Ergebnisdetails, passende Sprache der Speicher-/Wiederholungstexte und Ergebnisfokus. Test bestanden; bestehende Fokus- und Speicherfehlertests ebenfalls bestanden.
- Diese Prüfung betrifft den Kapitelcheck, nicht die vollständige Übersetzung sämtlicher Navigation, Lernhilfen oder Kapitel. Die dokumentierte Inhaltsübersetzungslücke bleibt unverändert. Keine visuelle Browserprüfung oder Veröffentlichung.

### Kapitelstart bei vollständig gesperrtem Browserspeicher
- Ungeschützte Einstellungszugriffe in `common.js` und `renderer.js` konnten bereits beim Laden durch einen SecurityError abbrechen. Sprache, Design und initialer Punktestand verwenden bei nicht lesbarem Speicher jetzt Standardwerte. Fehlende gespeicherte Antworten verhindern die Nutzung dieses Besuchs nicht.
- Neues `test_chapter_storage_denied.js` prüft beide realistischen Fehlerarten vor dem Laden der Skripte: gesperrte getItem/setItem-Methoden und eine bereits beim Zugriff werfende localStorage-Eigenschaft. Vollständiger Kapitelrenderer, Übungsfeedback, Entwurf mit ehrlichem Speicherfehler, unvollständiger Check, acht ausgewertete Antworten mit 100 %, nicht gespeichertes Ergebnis und Ergebnisfokus funktionieren in beiden Fällen.
- Test bestanden; Fünf-Sprachen-Kapitelcheck und bestehende Zugangstests ebenfalls bestanden. Die Änderung behauptet keine persistente Speicherung ohne Zugriff. Historische punktbasierte Interaktionen außerhalb des geprüften aktuellen Übungs-/Kapitelcheckpfads wurden damit nicht vollständig auf Speicherfehler geprüft.
- Änderungen weiterhin lokal; fachliche Gesamtprüfung, vollständige Übersetzungen, visuelle Abnahme und Veröffentlichung offen.

### Startseite und Einstellungen ohne lokalen Speicher
- `index.html` nutzt abgesicherte Lese-/Schreibzugriffe mit Einstellungen für den laufenden Besuch. Gesperrter Speicher unterbricht weder Startnavigation noch Fach-/Sprachwahl oder wiederholtes Umschalten des Designs. Kapitel übernehmen verfügbare Einstellungen vom gleich-originigen Rahmen, sodass die gewählte Sprache auch ohne lokalen Speicher nutzbar bleibt.
- Lernradio liest/schreibt Einstellungen ebenfalls abgesichert; der Aufbau der Bedienung scheitert nicht mehr an gesperrtem Speicher. Das ist kein Nachweis für Audio-Wiedergabe in allen Browsern.
- `test_shell_storage_denied.js`: echter HTML-Rahmen und Skripte bei werfender localStorage-Eigenschaft; Standard-Lernbereich, Kapitelroute, Englischwahl, zweimaliger Designwechsel, Radioaufbau und Übernahme der Sprache im Kapitel geprüft. Browser-APIs, die JSDOM nicht implementiert (matchMedia, innerText, Medienpause), im Test nachgebildet. Test bestanden. Kapitel-Speichersperre und Fünf-Sprachen-Kapitelcheck ebenfalls bestanden.
- Einstellungen im Arbeitsspeicher überleben kein Schließen der Seite; dauerhafte Speicherung wird nicht behauptet. Historischer globaler Zurücksetzpfad und weitere ältere punktbasierte Interaktionen sind nicht Gegenstand dieser Prüfung. Visuelle Abnahme und Veröffentlichung weiterhin offen.

### Geometriegrundlagen: widersprüchliche Klassifikation korrigiert
- `math2_7_geometrie` enthielt trotz korrekter Zusammenfassung Quizantworten, die Rechtecke mit vier gleich langen Seiten ausschlossen. Diese Widersprüche beseitigt: Quadrat als Rechteck und Raute; bloße Parallelität reicht nicht zum Rechteck; gleiche Seiten allein beweisen keine rechten Winkel. Raute nicht mehr als „schiefes Quadrat“ beschrieben.
- Dreiecksteil unterscheidet räumliche Rampe und ebene Seitenansicht, Seiten-/Winkelklassifikation, Innenwinkelsumme und Dreiecksungleichung. Neues beschriftetes SVG eines gleichschenklig-rechtwinkligen Dreiecks. Aufgaben prüfen 180°-Summe und zulässige Seiten statt bloßes Eckenzählen.
- Inklusive Definitionen von Trapez und Deltoid ausdrücklich angegeben; unterschiedliche Trapezkonventionen erläutert. Prismendefinition präzisiert und irreführender Papierblatt-Distraktor durch eindeutige Körperbeispiele ersetzt. Bestehende Prismendarstellung erhalten.
- Insgesamt zehn Prüfungsfragen; wesentliche Änderungen durch Inhaltsrevision 1 gekennzeichnet. Alte Quizstände gelten nicht als aktueller Kompetenznachweis. Test der realen Klassenkapitel erweitert um zehn Fragen, Revisionswechsel und sämtliche vier Prismaansichten; bestanden. Quizfeedback- und Mathematik-A11y-Audit ebenfalls bestanden.
- Weiter offen: vollständiger Lehrplanabgleich einschließlich Konstruktionen, Symmetrie und Koordinaten sowie neue Übersetzungen des revidierten Kapitels. Keine visuelle Browserabnahme oder Veröffentlichung.

### Dreiecksungleichung im interaktiven Seitenlabor
- Geometriegrundlagen um ein Labor mit drei nativen Reglern für Seitenlängen von 1–10 cm ergänzt. Gültige Dreiecke werden bei fester Skala gezeichnet und nach Seiten/Winkeln beschrieben. Gestreckter Grenzfall und unmögliche Längen erhalten verschiedene Begründungen; keine irreführende Dreiecksfläche bleibt stehen.
- Aufgabe vergleicht 3/4/5 mit 3/4/7 und 3/4/8. Beschriftete Eckpunkte und Zuordnung AB=c, AC=b, BC=a erläutern die Zeichnung; gespiegelte Lage wird als gleich lange Variante erwähnt. Vollständige Live-Rückmeldung, Reglerwerte in Zentimetern und Reset mit erhaltenem Fokus.
- `test_math2_guides.js` erweitert: alle 1000 Längenkombinationen geprüft. Für jeden gültigen Fall stimmen unabhängig aus den Polygonpunkten gemessene Seiten mit a/b/c überein; Fläche anhand Heron-Formel und Zeichenbereichsgrenzen bestätigt. Ungültige Fälle enthalten kein Polygon. Ausgangswerte, Klassifikation und Reset geprüft. Test, Mathematik-A11y und Syntaxaudit bestanden.
- Inhaltliche Bewertung bleibt Revision 1, da keine bewerteten Fragen geändert wurden. Übersetzungen, browsergestützte visuelle Abnahme und Veröffentlichung weiterhin offen.

### Dreieckskonstruktionen und Kongruenz
- `math2_7_geometrie`: neuer Abschnitt mit Planfigur, beschrifteter Konstruktion, SSS über zwei Kreisbögen, SWS mit eingeschlossenem Winkel und WSW mit anliegenden Winkeln. Beispielmaße und Voraussetzungen ausdrücklich genannt; zwei gespiegelte SSS-Lösungen als kongruent erklärt. Drei Winkel allein bestimmen die Größe nicht.
- Drei neue Verständnisfragen, nun insgesamt 13. Werkstatt enthält drei begründete Zuordnungen sowie eine echte Papierkonstruktion mit beiden Schnittpunkten, Kriterien und dokumentiertem Weg. Freitext ersetzt die Zeichnung ausdrücklich nicht und wird nicht automatisch benotet. Inhaltsrevision auf 2 erhöht.
- Test der Klassenkapitel um neue Fragenzahl und tatsächliche Werkstattzuordnung 3/3 erweitert; bestanden. Die 1000 Seitenkombinationen des vorhandenen Dreieckslabors bleiben geprüft. Quizfeedbackaudit und vollständiger Renderaudit aller 193 Kapitel bestanden.
- Weiter offen: übrige Geometrie-Anwendungsbereiche, aktuelle Übersetzungen dieses überarbeiteten Kapitels, visuelle Abnahme und Veröffentlichung. Kein vollständiger Lehrplanabschluss behauptet.

### Koordinaten und Achsenspiegelung
- Geometriekapitel um Koordinatenreihenfolge, negative Koordinaten, Spiegelung an x-/y-Achse, senkrechten Abstand, feste Punkte und Achsensymmetrie ergänzt. Vorwissen zu ganzen Zahlen verlinkt. Drei zusätzliche Fragen; insgesamt 16, Inhaltsrevision auf 3 erhöht.
- Neues SVG-Labor mit beschriftetem Koordinatengitter, zwei nativen Koordinatenreglern und Achsenwahl. Originalpunkt als gefüllter Punkt, Bildpunkt als Ring; Spiegelachse hervorgehoben, Verbindung gestrichelt und bei zusammenfallenden Punkten gemeinsame Beschriftung. Vollständige Koordinaten und Fixpunktstatus auch als Text.
- Test erweitert um alle 242 ganzzahligen Punkt-/Achsenkombinationen. Gezeichnete Koordinaten, unveränderte Koordinate entlang der Achse, Mittelpunkt der Verbindung auf der Spiegelachse, Randgrenzen und Fixpunkte unabhängig geprüft. Test inklusive bisherigem Dreieckslabor, Kapitelnavigation und Mathematik-A11y bestanden.
- Die Darstellung allein deckt noch nicht sämtliche Konstruktionen und Symmetrieaufgaben ab. Übersetzungen, visuelle Browserprüfung und Veröffentlichung bleiben offen.

### Strecken- und Winkelsymmetralen
- Gespeicherten RIS-Anwendungsbereich Geometrie Klasse 2 erneut gelesen. Eigenschaften, Konstruktion und Anwendung der beiden Symmetralen waren im Kapitel noch nicht ausgearbeitet.
- Neuer Abschnitt erklärt österreichische Begriffe und Synonyme Mittelsenkrechte/Winkelhalbierende, gleiche Abstände und Konstruktionen mit sichtbaren Hilfsbögen. Streckensymmetrale mit eigener maßstäblicher SVG-Darstellung; Winkelhalbierende über SSS kongruenter Dreiecke begründet. Die Zirkelöffnung bei der Winkelkonstruktion ausdrücklich festgelegt.
- Drei zusätzliche Fragen prüfen die ganze Ortsgerade statt nur des Mittelpunkts, notwendige Kreisradien und senkrechte statt beliebiger Abstände. Nun 19 Fragen; Inhaltsrevision 4. Neue Lernziele und Zusammenfassung ergänzt.
- Test aller zugeordneten Klassenkapitel und Quizfeedbackaudit bestanden. Zeichnungen auf Papier werden nicht automatisch benotet; ihre praktische Ausführung und die visuelle Browserdarstellung sind nicht durch den Test nachgewiesen. Weitere Anwendungsbereiche, Übersetzungen und Veröffentlichung bleiben offen.

### Figuren grafisch und rechnerisch verschieben
- Koordinatenabschnitt um Verschiebungen ergänzt: gleiche Schritte für alle Eckpunkte, Koordinatenregel, Rückverschiebung und Erhalt von Form/Größe. Zwei zusätzliche Fragen unterscheiden neue Punktkoordinaten von den Verschiebungsschritten sowie Verschiebung von Verformung und Vergrößerung. Insgesamt 21 Fragen; Inhaltsrevision 5.
- Neues Dreieckslabor zeigt Ausgangsfigur als gefülltes Polygon und Bildfigur als gestrichelte Umrandung im selben beschrifteten Raster. Zwei native Regler, vollständige Bildkoordinaten im Live-Status und Nullverschiebung zum direkten Vergleich.
- Test prüft alle 25 einstellbaren Verschiebungen: jeder Eckpunkt erhält denselben Versatz, alle Seitenlängen bleiben gleich, die Zeichnung bleibt im Raster und Nullverschiebung deckt beide Figuren. Test einschließlich vorhandener Dreiecks-/Spiegelungslabore bestanden; Mathematik-A11y und Quizfeedbackaudit ebenfalls bestanden.
- Weitere fachliche Abnahme, Übersetzungen, visuelle Browserprüfung und Veröffentlichung bleiben offen.

### Winkelbeziehungen und Begründung der Dreieckswinkelsumme
- Geometriegrundlagen beginnen nun mit Ergänzung auf 90°, Nebenwinkeln, Scheitelwinkeln und Winkelbeziehungen an parallelen Geraden. Die Parallelitätsvoraussetzung wird ausdrücklich genannt; bloßes Aussehen ist kein Nachweis.
- Eigene SVG-Hilfszeichnung: Parallele zur Grundseite durch die gegenüberliegende Ecke. Wechselwinkel entsprechen den Basiswinkeln und bilden mit dem dritten Innenwinkel einen gestreckten Winkel. Dadurch ist die bisher nur genannte Winkelsumme allgemein begründet; Messung und Begründung werden unterschieden.
- Drei neue Fragen zu Nebenwinkelrechnung, Wechselwinkeln und dem Beweisgedanken; nun 24 Fragen, Revision 6. Passender Zeichenauftrag und Lernziel/Zusammenfassung ergänzt. Test der Klassenkapitel inklusive bestehender interaktiver Labore und Quizfeedbackaudit bestanden.
- Weitere Kapitelübersetzungen und vollständige fachliche/visuelle Abnahme bleiben offen. Keine Veröffentlichung.

### Besondere Vierecke konstruieren
- Vierecksabschnitt enthält jetzt konkrete Konstruktionen von Rechteck/Quadrat mit Senkrechten sowie Parallelogramm/Raute mit Parallelen. Eindeutige Eckpunktfolge, notwendige Winkelangaben und anschließende Mess-/Eigenschaftskontrolle erklärt. Zeichenauftrag vergleicht Rechteck und Parallelogramm gleicher benachbarter Seitenlängen.
- Eigene maßstäbliche Parallelogramm-SVG-Darstellung; 5 cm, 3 cm und eingeschlossener Winkel 60° rechnerisch aus den gezeichneten Punkten bestätigt. Zwei zusätzliche Fragen, insgesamt 26; Inhaltsrevision 7.
- Klassenkapiteltest und Quizfeedbackaudit bestanden. Papierkonstruktionen und visuelles Layout sind dadurch nicht abgenommen. Verbleibende fachliche Inhalte, Übersetzungen und Veröffentlichung weiterhin offen.

### Prismendarstellungen im Geometriekapitel fachlich korrigiert
- Das bisherige Dreiecksprismennetz hatte Rechteckbreiten von 120, aber schräge Dreiecksseiten von rund 112,36 Zeicheneinheiten. Die Dreiecke sind nun gleichseitig mit Kantenlänge 120; alle Anschlusskanten passen.
- Die hintere Quaderfläche war um fünf Zeicheneinheiten höher als die vordere. Entsprechende Eckpunkte und verdeckte Kanten sind nun konsistente Verschiebungen.
- Erklärung unterscheidet das eigene Netzbeispiel vom anderen Dreiecksprisma in der Körperansicht und erläutert Kantenpassung sowie Verzerrung im Schrägbild. Fünfeckprisma nennt genau fünf Seitenflächen.
- Neues test_prism_geometry.js prüft kongruente verschobene Grund-/Deckflächen für drei Körper sowie Seitenlängen, Anschluss und Rechteckhöhen des Netzes. Bestanden; test_math2_guides.js ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung erfolgt.
- Anschließender Gesamtlauf: scripts/run_functional_tests.js beendet mit 76/76 bestandenen Funktionstestsuiten; Bericht unter ../functional-test-report.json. Das ersetzt weder fachliche Vollprüfung noch Übersetzungsvollständigkeit, Medien- oder Browserprüfung.

### Relative Häufigkeiten: Kreisdiagramm und Prozentstreifen ergänzt
- Neue Diagrammwerkstatt in math2_9_relative_haeufigkeit in de/en/sr/tr/uk/ar. Erklärt Anteil × 360°, anteilige Streifenlänge sowie vollständige, nicht überlappende Kategorien. Aufgaben: 5/10/15 von 20 vorhersagen, Randfälle untersuchen, 7 von 20 auf Papier zeichnen und vergleichen.
- Neues optionales Kapitelmodul: ein nativer Regler verändert Bibliotheksstimmen bei fester Gesamtzahl 20. Kreis, Prozentstreifen und vollständige Tabelle zeigen synchron Anzahl, Prozentanteil und Winkel. Null- und Vollkreis gesondert dargestellt; A/B, Schraffur und Text unterscheiden Kategorien über Farbe hinaus. Sprachabhängige Zahlenformate und isolierte Zahlen in der Tabelle; Reset erhält Fokus.
- Alle sechs Kapitel laden das neue Modul; Lernziele und Zusammenfassung ergänzt. Bestehende acht Prüfungsfragen unverändert, deshalb keine Änderung der Prüfungsrevision. Übersetzungen bleiben strukturgleich und werden weiter ausgewählt.
- test_share_diagrams.js prüft echte Kapitelrender aller sechs Sprachen und 126 Reglerstellungen: Kreisbogenendpunkte/Flags, Streifenproportion, Tabellendaten, 0/100 %, Sprachwahl, Reset/Fokus und wiederholte Initialisierung. Bestanden nach expliziter window.topicInit-Registrierung (striktes eval hatte die Funktion im Test zunächst nicht global verfügbar gemacht).
- Zusätzlich test_statistics_foundations.js, test_quiz_language.js, test_translation_revisions.js bestanden; Syntaxprüfung 85 Kapitelmodule bestanden. Keine visuelle Browserprüfung, keine Veröffentlichung. Zweistufige Häufigkeitsbäume und weitere Lehrplanbereiche bleiben separat zu ergänzen.

### Zweistufiger Häufigkeitsbaum in relativen Häufigkeiten
- In allen sechs Sprachfassungen eine weitere Werkstatt mit fiktiven Klassen A (12 Antworten) und B (8 Antworten) ergänzt. Native Regler verändern die Bibliotheksstimmen; die zweite Kategorie wird als Rest berechnet. Verschachtelte Listen bilden den zweistufigen Baum mit vollständigen Häufigkeiten auch ohne Grafik ab.
- Ausgabe unterscheidet Anteil innerhalb der jeweiligen Klasse, gemeinsame Zugehörigkeit zu Klasse und Bibliotheksgruppe unter allen 20 Antworten sowie gesamten Bibliotheksanteil. Erklärung behandelt die unterschiedliche Bezugsgruppe und den Fehler, Prozentwerte unterschiedlich großer Gruppen ungewichtet zu mitteln.
- Vorhersageaufgaben verlangen gleiche 50-%-Anteile und den Vergleich 12/12 plus 0/8 mit dem Gesamtanteil 12/20. Gerundete Werte verwenden ≈, exakte angezeigte Werte =. Zahlen stehen in Bidi-Isolaten; Sprachformat, native Tastaturbedienung, Live-Rückmeldung und Reset mit Fokuserhalt.
- test_share_diagrams.js erweitert: 702 Kombinationen (13 × 9 × 6 Sprachen) auf Teilgruppensummen, Nenner, Einzel-/Gesamtprozente und Rundungszeichen geprüft, zusätzlich weiterhin 126 Kreis-/Streifenfälle. Bestanden; test_statistics_foundations.js und Syntaxprüfung 85 Module bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Prüfung um Diagramm- und Baumverständnis erweitert
- Zwei strukturierte Aufgaben in allen sechs Sprachen ergänzt: 25 % in einen Mittelpunktswinkel umrechnen; gemeinsame Zugehörigkeit zu Klasse A und Bibliotheksgruppe auf alle 20 Befragten beziehen. Jede falsche Antwort erklärt den konkreten Fehler (Prozentzahl als Winkel, Halbkreis, falscher Nenner bzw. zu große gezählte Gruppe).
- Kapitelprüfung math2_9_relative_haeufigkeit umfasst nun zehn Aufgaben. Prüfungsrevision auf 1 angehoben, alle fünf Übersetzungen mit sourceRevision 1 synchronisiert. Alte Ergebnisse bleiben als historisch vorhanden, gelten aber nicht mehr als bestandener aktueller Stoff.
- Tests für tatsächliche Kapitelrender, mehrsprachige vollständige Prüfung und blockierten Browserspeicher aktualisiert und bestanden. Diagrammtest prüft beide neue Aufgaben, genau eine richtige Antwort, Rückmeldungen und Versionswechsel; 126 Diagramm- und 702 Baumstellungen bestehen weiterhin.
- Audit strukturierter Quizdaten: 5009 Datensätze ohne Strukturfehler. Übersetzungsauswahl weiterhin 40 übersetzte Kapitel und 153 deutsche Rückfälle je Fremdsprache; dies ist ausdrücklich keine vollständige Übersetzung. diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Medienprüfung und verständliche Alternative zur Schallwellen-Animation
- Medieninventar erneut ausgeführt: 219 Referenzen, davon 173 extern; keine fehlenden lokalen Dateien und keine im Audit erfassten Autoplay-/Controls-Verstöße. Dies belegt nicht die Erreichbarkeit externer Dateien oder deren fachliche Qualität.
- Lokale schallwelle.mp4 mit ffmpeg in zeitlich verteilte Einzelbilder extrahiert und visuell betrachtet (kein Browser). Gesehen: blaue Querwellenkurve, grüne Verdichtungs-/Verdünnungsdarstellung, Beschriftung Licht bzw. Schall. Keine vollständige Bewegungsprüfung aus Einzelbildern behauptet.
- Deutscher Akustikabschnitt ergänzt eine sichtbare, über aria-describedby verknüpfte Inhaltsbeschreibung und Modellgrenzen: Luftteilchen schwingen lokal; Verdichtungen breiten sich aus. Eine Druckkurve stellt keine transversale Teilchenbewegung dar. Lichtbeispiel betrifft elektromagnetische Felder; Seilwelle als mechanischer Vergleich ergänzt. Beobachtungsauftrag unterscheidet Teilchenbewegung von Verdichtungsbewegung.
- test_acoustics_concepts.js und test_physics_guides.js bestanden, diff --check sauber. Weitere Videos, externe Bilder, Lizenzen und Browser-/Medienwiedergabeprüfung bleiben offen. Keine Veröffentlichung.

### Strom- und Kraftrichtung im Motor-Modell sichtbar gemacht
- Lorentzvideo als Einzelbildübersicht betrachtet und zugehörigen Manim-Quelltext gelesen: dargestellt ist ein Elektron (negatives Ladungsvorzeichen), nicht ein positiv geladener Träger. Deutscher Begleittext unterscheidet nun Elektronenbewegung, technische Stromrichtung und positive Vergleichsladung. Die Einzelbildprüfung ersetzt keine vollständige Prüfung der zeitlichen Bahn-/Pfeilkonsistenz; diese bleibt offen.
- Bestehender Schubs-Tester zeigte nur einen wechselnden Kraftstrich ohne sichtbare Stromrichtung. Nun sind Feldrichtung N→S, Punkt für Strom aus der Ebene und Kreuz für Strom in die Ebene samt Erklärung vorhanden. Stromsymbol und Kraftpfeil wechseln gemeinsam; Pfeilspitze zeigt Orientierung. SVG hat zugänglichen Titel und verknüpfte Live-Richtungsbeschreibung.
- Vorhersageauftrag ergänzt. Test prüft zehn Wechsel samt Punkt/Kreuz, Text und Pfeilrichtung gegen I×B (unter Berücksichtigung der nach unten laufenden SVG-y-Achse), nicht nur gegen festgeschriebene Statuswörter. Vorhandene Elektromagnetismus- und Physik-Leitfadentests sowie Syntaxaudit 85 Module bestanden; diff --check sauber.
- Keine Browserprüfung, kein neu gerendertes Video und keine Veröffentlichung.

### Lorentzvideo durch konsistentes Kreisbahnmodell ersetzt
- Manim-Quelltext neu aufgebaut: explizite Kreisbahn eines Elektrons bei B in die Ebene, stets tangentialer Geschwindigkeitspfeil und nach innen gerichteter Kraftpfeil. Negative Ladung und Modellannahmen sichtbar genannt. Modellfunktion in manim_scripts/lorentz_model.py getrennt, um mathematische Eigenschaften unabhängig von Grafikmethoden zu prüfen.
- Erster Render zeigte übergroße Textobjekte und im alten Manim-Renderer statisch zwischengespeicherte Pfeile. Textgrößen begrenzt und alle bewegten Elemente in gemeinsam aktualisierte Gruppe gelegt. Weitere Einzelbildprüfung zeigte Überlagerung am Endpunkt; Bahnposition/-radius angepasst, finalen Endframe geprüft. Kein Browser dafür verwendet.
- Finales Video mit Manim 0.7.0 lokal gerendert, erst nach Prüfungen nach assets/videos/lorentz_kraft.mp4 kopiert. ffprobe bestätigt H.264, 1280×720, 11 Sekunden, keine Audiospur. Sichtbarer, über aria-describedby verknüpfter Beschreibungstext im deutschen Kapitel ergänzt.
- Neues test_lorentz_model.js prüft 1001 Zustände: konstante Geschwindigkeit und Radius, tangentiale Bewegung per numerischer Ableitung, orthogonale nach innen gerichtete Kraft, Vorzeichen aus q(v×B) für negative Ladung. Bestanden; Elektromagnetismus-Kapiteltest bestanden, diff --check sauber.
- Einzelbilder und mathematisches Modell geprüft; Browserwiedergabe bleibt offen. Keine Veröffentlichung.

### Linsenmodell: Strahlen hinter dem Fokus und Modellgrenzen
- Vorhandenes Linsenvideo anhand verteilter Einzelbilder und Manim-Quelle geprüft: parallele Eingangsstrahlen werden im Dünnlinsenmodell bei x=0 geknickt und schneiden sich bei x=4; sie laufen weiter. Keine Behauptung einer exakten Grenzflächenberechnung. Video unverändert gelassen.
- Interaktiver Linsen-Wechsler korrigiert: Sammelstrahlen endeten bisher im Fokus. Nun laufen sie durch den Fokus bis zum rechten Diagrammrand weiter. Zerstreuungsstrahlen ebenfalls bis zum Rand fortgesetzt; ihre Rückverlängerungen treffen weiterhin den virtuellen Fokus links.
- Pauschales „alle Strahlen“ ersetzt durch achsennahe parallele Strahlen und Näherung. Deutscher Text erklärt Grenzflächen gegenüber Dünnlinsenmodell sowie virtuelle Verlängerungen ohne rückwärts laufendes Licht. Technisches Manim-Werbeintro durch Beobachtungsauftrag ersetzt; SVG und Video mit zugänglicher Modellbeschreibung verknüpft. Glas-Umschalttext verwendet Brechungsindex statt unspezifischer Dichte.
- Neues test_lens_models.js prüft tatsächlich gerenderten Wechsler: Strahl-Achsenschnittpunkte, Fortsetzung hinter realem Fokus, nur rückwärtiger virtueller Schnitt, zehn Wechsel, Text und zugängliche Verknüpfung. Bestanden; Physik-Leitfadentest und Syntaxaudit bestanden. Gemeldete Leerzeichen an zwei geänderten Zeilen entfernt; diff --check erneut sauber.
- Keine Browserprüfung oder Veröffentlichung.

### Brechungsversuch auf nachvollziehbare Modellwerte umgestellt
- Luft/Wasser/Glas-Strahlen waren frei platzierte Endpunkte; beim Beispielglas ergab sich ein zu kleiner Winkel. setMedium berechnet nun den Brechungswinkel für 45° Einfall nach dem Brechungsgesetz mit n=1,00/1,33/1,50. Status nennt Material, Brechzahl und Winkel zum Lot; Auswahlknöpfe zeigen ihren Zustand mit aria-pressed.
- Irreführende Erklärung „schwerer zu durchdringen“ samt Knetmassen-Fußvergleich entfernt. Erklärung trennt Lichtgeschwindigkeit/Brechzahl von Lichtdurchlässigkeit, erklärt das Lot und senkrechten Einfall. Gerundete material-/farbabhängige Werte und weggelassener Reflexionsanteil als Modellgrenzen genannt. Vorhersageauftrag und zugängliche SVG-Beschreibung ergänzt.
- Linsenmodelltest erweitert um Materialwechsel: aus den gezeichneten Endpunkten berechnete Winkel erfüllen das Brechungsgesetz; Auswahlzustand, Fokus, ungültiger Materialname und Rückmeldungen geprüft. Erste Testfassung führte inline onclick in outside-only JSDOM nicht aus; Test führt jetzt die tatsächlichen Markup-Handler explizit aus. Anschließend bestanden. Physik-Leitfadentest, Syntaxaudit und diff --check bestanden. Keine Browserprüfung oder Veröffentlichung.

### Reflexionsversuch mit echten Winkeln statt Zeichenabständen
- Der bisherige Regler angleRange variierte lediglich einen horizontalen Abstand von 20 bis 140. Nun wählt er 0–70 Grad zum Lot; beide Strahlen werden aus diesem Winkel mit konstanter Länge berechnet. Sichtbare Live-Rückmeldung und aria-valuetext nennen den Einfalls-/Reflexionswinkel, einschließlich senkrechten Einfalls.
- Hin-/Rückweg durch Pfeilspitzen sowie gestrichelte/durchgezogene Linien unterscheidbar. SVG mit Lotbeschriftung, zugänglicher Beschreibung und verknüpftem Status. Aufgaben für 30°, 60° und 0°; Winkel zur Oberfläche ausdrücklich vom Winkel zum Lot unterschieden.
- Pauschale Gleichsetzung von Lichtteilchen und perfekten Flummis durch klar bezeichnete Modellvorstellung ersetzt.
- test_lens_models.js prüft zusätzlich sämtliche 71 Reglerstellungen: tatsächliche gezeichnete Winkel aus Koordinaten, Gleichheit, Strahllänge, Rückmeldung bei 0° und zugänglichen Winkelwert. Bestanden; Physik-Leitfadentest und Syntaxaudit bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Totalreflexionsmodell fachlich und numerisch korrigiert
- Alter Glasstabversuch bezeichnete den Reglerwinkel zur Stabachse als Einfallswinkel; verwendete pauschal 42° und verdoppelte beim Austritt nur die Steigung. Bei 0° entstanden unendliche Koordinaten und eine falsche Totalreflexionsmeldung. Nun berechnet das Modell Grenzwinkel aus nGlas=1,50/nLuft=1,00, Strahl-Wandtreffer und Austrittsrichtung nach dem Brechungsgesetz.
- Gerade Lichtwege und kleine Winkel ohne Wandkontakt enden korrekt am Rand der Darstellung, ohne Reflexion zu behaupten. Teilreflexion zeigt zusätzlich einen kurzen gestrichelten reflektierten Anteil. Stabachsenwinkel und Einfallswinkel zum Wandlot werden getrennt erklärt; Status außerhalb des SVG verhindert lange Textzeilen im Diagramm.
- Modellgrenzen ausdrücklich: bereits im Glas laufender Strahl, keine berechnete Einkopplung/Stirnfläche, keine Intensitätsaussage aus Linienbreiten. Unterschied Glasstab in Luft gegenüber Kern/Mantel einer Glasfaser erklärt. Definition verlangt Einfallswinkel größer als Grenzwinkel; Gleichheitsfall entlang der Grenzfläche beschrieben.
- Test prüft alle 121 ganzzahligen Reglerwerte: endliche Strahlkoordinaten, 0° ohne Reflexion, Schwellenwechsel bei 48/49° zur Achse, Austritt nach Brechungsgesetz und korrekte Austrittsseite. Linsenmodell- und Physik-Leitfadentests bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Optikprüfung auf Anwendung und Modellverständnis ausgerichtet
- Acht bestehende Aufgaben (q_total, q4, f1/f2/f3/f5/f6/f7) bei gleichen IDs durch Anwendungsfragen mit je drei plausiblen Antworten und spezifischer Rückmeldung ersetzt. Inhalte: Winkel zum Lot/Oberfläche, senkrechter Einfall, Brechzahlvergleich, Totalreflexion oberhalb des Grenzwinkels, virtuelle Rückverlängerungen, Abgrenzung Beugung/Brechung/Reflexion und Spaltbreitenvergleich.
- Unbelegte historische Entdeckerbehauptung aus der Beugungsfrage entfernt; stattdessen beobachtbares Phänomen geprüft. Zentrales Maximum und Winkelbreite im Lehrtext erklärt, damit die Prüfungsfrage auf behandelten Inhalt aufbaut. Überzogenen Diplom-Titel durch sachlichen Verständnischeck-Titel ersetzt.
- Kapitelrevision linsen_spiegel 2→3: frühere Ergebnisse sind für die geänderte Prüfung veraltet. Test prüft tatsächliche Fragen im Renderer, Antwortstruktur/Rückmeldungen und Versionswechsel zusätzlich zur Geometrie. Bestanden; Physik-Leitfadentest und Feedbackstrukturaudit bestanden; diff --check sauber. Weitere alte Optikfragen bleiben separat fachlich/redaktionell zu prüfen. Keine Browserprüfung oder Veröffentlichung.

### Augenmodell: gleiche Gegenstandshöhe und konsistentes Netzhautbild
- Nah-/Fernumschaltung änderte bisher die angenommene Gegenstandshöhe, ohne den Pfeil anzupassen, und zeichnete Strahlen verschiedener Punkte ohne konsistente Abbildung. Neues Dünnlinsenmodell verwendet feste Gegenstandshöhe 30, feste Bildweite 95 und zwei Gegenstandsweiten. Beide Strahlen desselben Spitzenpunkts treffen dieselbe Bildspitze; der Mittelpunktstrahl verläuft geradlinig. Bildgröße folgt b/g und Brennweite der Linsengleichung.
- Netzhautebene im schematischen Auge eindeutig eingezeichnet. Text kennzeichnet die Ersatzlinse für Hornhaut plus Augenlinse sowie nicht anatomisch maßstabsgetreue Formen. Stärkere Brechkraft und größeres invertiertes Bild bei Nähe werden erläutert.
- Akkommodationstext korrigiert: Ziliarmuskelkontraktion entspannt die Aufhängefasern, elastische Linse wird stärker gekrümmt; bei Ferne umgekehrt. Unpassenden Bauch-/Geschlechter-Merkspruch samt wiederholtem Linsenblock entfernt. Bedienknöpfe mit Auswahlzustand, SVG-Beschreibung und Vorhersageauftrag ergänzt.
- Tests prüfen beide Modi mehrfach: konstante Gegenstandshöhe, gemeinsamer Bildpunkt, gerader Mittelpunktstrahl, feste Netzhautposition, Vergrößerung, Linsengleichung, stärkere Nahbrechkraft sowie Auswahl/Fokus. Linsenmodell- und Physik-Leitfadentests bestanden, Syntaxaudit bestanden, diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Gekrümmte Spiegel: Auftreffpunkte und Reflexionsgesetz konsistent
- Bisherige Strahlen lagen nicht exakt auf der quadratischen Spiegelkurve; Wölbspiegelstrahlen verließen den ViewBox. Jetzt gemeinsames parabolisches Modell x=260±(y−120)²/320 mit Fokus 180 bzw. 340. Auftreffpunkte, reflektierte Richtungen und virtuelle Verlängerungen daraus berechnet; sichtbare Strahlen am Diagrammrand begrenzt.
- Pfeile verdeutlichen den tatsächlichen Hin-/Rückweg. Reale Strahlen am Hohlspiegel laufen durch den Fokus weiter; beim Wölbspiegel treffen nur rückwärtige Verlängerungen den virtuellen Fokus. Statische Anfangszeichnung ebenfalls korrigiert.
- Modelltext unterscheidet parabolischen Querschnitt von kugelförmigem Spiegel (nur achsennah näherungsweiser Fokus) sowie Reflexion von Brechung durch eine Linse. Vorhersageauftrag, SVG-Beschreibung und Status ergänzt.
- Tests prüfen zehn Wechsel mit drei Strahlen: gemeinsamer Auftreffpunkt auf der Spiegelkurve, v_out=v_in−2(v_in·n)n an der lokalen Normalen, Fokuslage und Diagrammgrenzen. Linsenmodell-/Physik-Leitfadentests bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Mikroskopmodell: konsistente Objektebene und Strahlen hinter dem Okular
- Objektspitze lag bisher 10 Zeicheneinheiten außerhalb der zur Linsengleichung verwendeten Objektebene. Gegenstand nun als horizontaler Pfeil in derselben Ebene dargestellt; Zwischenbildpfeil beginnt auf der Achse. Beide Strahlen werden vom selben Punkt durch Objektiv und Okular berechnet und hinter dem Okular fortgesetzt.
- Modell unterscheidet reale Zwischenbilder zwischen den Linsen von Einstellungen, bei denen das Objektiv allein erst am/hinter dem Okular fokussieren würde. Letztere werden nicht als bereits entstandenes reales Zwischenbild gezeichnet. ViewBox umfasst veränderte Strahlkoordinaten.
- Schärferückmeldung auf entspanntes Sehen ohne Akkommodation begrenzt; vordere Brennebene statt einzelner Fokuspunkt. Qualitativer Blur/Größeneindruck und 1,5-mm-Anzeigetoleranz ausdrücklich als Modell benannt. Aufgaben vergleichen bei g=25 mm die Abstände 100/130/160 mm. Prüfungsfrage f12 entsprechend präzisiert.
- Test prüft 235 Einstellungen (47 Objektabstände × 5 Linsenabstände): beide Dünnlinsenbrechungen aus tatsächlich gezeichneten Strahlen, endliche Koordinaten, Zwischenbildlage und parallelen Austritt bei g=25/d=130. Ein Rundungsfehler am Gleichheitsfall b=d wurde durch algebraisch stabile Bildweitenformel behoben. Anschließend Tests bestanden; Physik-Leitfadentest und Syntaxaudit bestanden, diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Teleskopmodelle geometrisch korrigiert
- Refraktorstrahlen am Okular auf exakte Fortsetzung durch die gemeinsame Brennebene korrigiert; austretende Strahlen des axialen Bildpunkts parallel.
- Newton-Modell mit parabolischem Hauptspiegel (Scheitel x=350, Fokus x=180) und 45°-Fangspiegel y=x−100 konsistent berechnet. Auftreffpunkte liegen auf der Spiegelkurve; Reflexion am Fangspiegel führt zum Zwischenbild (220,80) vor dem seitlichen Okular. Nach dem Okular parallele Strahlen.
- Überzogene Spiegel-vs.-Linsen-Darstellung und pauschale historische Erstbehauptung ersetzt durch Aufgaben der Bauteile, Öffnung/Lichtsammeln/Auflösung sowie konkrete Vorteile und Grenzen. Modell erklärt dünne Linsen, parabolischen Hauptspiegel, fernen axialen Punkt und nicht dargestellte Halterungen/Abschattung.
- Bauartwechsel setzt aria-hidden und sichtbaren Live-Status; SVG ist mit Modelltext verknüpft. Tests prüfen Reflexion an beiden Spiegeln aus lokalen Normalen, Zwischenbild, Okularaustritt, Refraktorfortsetzung sowie mehrfachen Wechsel. Linsenmodell-/Physik-Leitfadentests bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Prüfungsfragen zu optischen Geräten präzisiert
- Sechs Diplomfragen f10–f15 überarbeitet: Funktion des Objektivs, Bedeutung des reellen Zwischenbilds, Brennebeneneinstellung für entspanntes Sehen, Einordnung Refraktor/Reflektor, Aufgabe des ebenen Fangspiegels und Vorteile großer Hauptspiegel. Je drei plausible Antwortmöglichkeiten mit begründeten Rückmeldungen statt offensichtlicher Unsinnsantworten.
- Lehrtext erklärt reelles/virtuelles Bild und Auffangen eines reellen Bilds auf einem Schirm. Bauartfrage berücksichtigt, dass auch Reflektoren Linsen im Okular besitzen können. Keine pauschale Fehlerfreiheit oder automatisch größere Vergrößerung von Spiegeln behauptet.
- Kapitelrevision 3→4; veraltete Ergebnisse werden nicht als aktueller Prüfungsnachweis verwendet. Test deckt nun auch die sechs neuen Aufgaben samt Antwort-/Feedbackstruktur und Versionswechsel ab. Linsenmodell-/Physik-Leitfadentests und Feedbackaudit bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Gesamtlauf und didaktische Reihenfolge im Optikkapitel
- Vollständiger vorhandener Funktionstestrunner abgeschlossen: 79/79 Suiten bestanden, Bericht ../functional-test-report.json. Enthält neue Optikgeometrie, Lorentzmodell sowie Häufigkeitsdiagramme/-bäume. Dies ist kein Nachweis vollständiger Lehrplanabdeckung, Übersetzung, Medienqualität oder Browserdarstellung.
- Anschließend Optikkapitel sinnvoll geordnet: Reflexion → Brechung → Linsen → Totalreflexion → Auge → gekrümmte Spiegel → Mikroskop → Teleskop → Beugung. Die Einführung der Linsen steht damit vor der Anwendung im Auge; Beugung wird nach den geometrisch-optischen Modellen behandelt.
- Abschnittsüberschriften konkretisiert und fortlaufend nummeriert; stabile Abschnitts- und Quiz-IDs erhalten. Sieben Lernziele und sieben Zusammenfassungspunkte decken jetzt auch reale/virtuelle Bilder, gekrümmte Spiegel, Akkommodation, Gerätefunktionen und Beugung ab.
- Nach der Umordnung Linsenmodell-, Physik-Leitfaden- und Kapitelnavigationstests bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung. Die umfassende Produktabnahme bleibt offen.

### Englische Fassung: Europa und Vernetzung
- geo_3_europa vollständig aus der aktuellen deutschen Kapitelstruktur ins Englische übertragen: sieben Abschnitte, Lernziele, Vorwissen, Zusammenfassung, Institutionentabelle, Karten-/Rollenspielaufträge, zwölf Quizfragen mit allen Antworten/Rückmeldungen sowie Zuordnungs- und Schreibwerkstatt. sourceRevision 1; Quellenadressen erhalten, deutschsprachige Quellen in englischen Titeln gekennzeichnet.
- Test rendert das tatsächliche Kapitel mit englischer Sprachwahl: kein deutscher Fallback, Abschnittssprache en, gleiche Abschnitts-/Frage-IDs und Richtigkeitsflags, Zuordnung 3/3 und gesamte Prüfung 12/12. Bestanden; diff --check sauber.
- Übersetzungsauswahlaudit nun Englisch 41 gewählte Übersetzungen / 152 deutsche Rückfälle; ar/sr/tr/uk weiterhin 40/153. Auswahlzahlen sind kein Nachweis einer sprachlichen Vollprüfung aller älteren Übersetzungen. Keine Browserprüfung oder Veröffentlichung.

### Englische Fassung: Karten und Räume einschließlich Routenplaner
- geo_1_karten_raeume in Englisch ergänzt: alle drei Abschnitte, vier Quizfragen mit Antworten/Rückmeldungen, Lernziele, Zusammenfassung, Vorwissen und Zuordnungs-/Schreibwerkstatt. SourceRevision 0 entspricht unverändertem Prüfungsstand.
- Gemeinsamer Routenplaner unterstützt data-locale=en: Positions-/Schrittangaben, zugängliche Kartenbeschreibung, Ziel, gesperrtes Feld und Kartenrand vollständig auf Englisch. Deutsche bestehende Meldungen erhalten.
- Neuer Test rendert die tatsächliche englische Seite ohne Rückfall, prüft äquivalente Antworten, Zuordnung 3/3, vollständige Prüfung 4/4 und Route: Kartenrand ohne Schrittzuwachs, C3 gesperrt, kürzester Weg 800 m, Zielmeldung, Reset sowie wiederholte Initialisierung. Bestanden; bestehender umfassender Geografietest ebenfalls bestanden; diff --check sauber.
- Übersetzungsauswahl Englisch jetzt 42/193, 151 deutsche Rückfälle. Andere Sprachen unverändert 40/193. Keine Browserprüfung oder Veröffentlichung.

### Englische Fassung: Wirtschaften im Alltag und Budgetexperiment
- geo_2_wirtschaften vollständig auf Englisch ergänzt: drei Abschnitte, vier Prüfungsfragen, alle Rückmeldungen, Lernziele/Vorwissen/Zusammenfassung und Schreib-/Zuordnungswerkstatt. Bedürfnisse, Opportunitätskosten, Budget, Einnahmen/Kosten/Gewinn sowie bezahlte/unbezahlte Arbeit bleiben inhaltlich erhalten.
- Budgetexperiment erkennt data-locale=en und meldet Ausgaben/Rest, Budgetüberschreitung, fehlende Zielrücklage oder erfülltes Rücklagenziel auf Englisch. Deutsche Meldungen erhalten.
- Neuer tatsächlicher Render-/Interaktionstest prüft 16 Auswahlkombinationen unabhängig berechnet, Sprachwahl ohne Rückfall, Antwortäquivalenz, Zuordnung 3/3 und vollständige Prüfung 4/4. Bestehender Geografietest und englischer Kartentest ebenfalls bestanden; diff --check sauber.
- Englische Übersetzungsauswahl nun 43/193, 150 deutsche Rückfälle; andere angebotene Fremdsprachen bleiben bei 40/193. Keine Browserprüfung oder Veröffentlichung.

### Türkische Fassung: Karten und Räume
- Vollständige türkische Fassung von geo_1_karten_raeume ergänzt: drei Abschnitte, vier Fragen einschließlich aller Rückmeldungen, Lernziele, Zusammenfassung, Vorwissen sowie Zuordnungs-/Schreibwerkstatt. SourceRevision 0 bleibt mit dem deutschen Prüfungsstand synchron.
- Routenmeldungen in explizites Sprachverzeichnis für de/en/tr überführt. Türkische Positions-, Hindernis-, Rand- und Zielmeldungen sowie zugängliche Kartenbeschreibung ergänzt; Steuerknöpfe im Kapitel übersetzt.
- Tatsächlicher türkischer Render-/Interaktionstest prüft fehlenden Fallback, gleiche Richtigkeitsflags, Zuordnung 3/3, Prüfung 4/4, gesperrtes C3, Kartenrand, 800-m-Route, Ziel und Reset. Bestanden; englischer Kartentest und bestehender Geografietest ebenfalls bestanden; diff --check sauber.
- Türkische Übersetzungsauswahl jetzt 41/193 (152 Rückfälle), Englisch 43/193; übrige Fremdsprachen 40/193. Keine Browserprüfung oder Veröffentlichung.

### Ukrainische Fassung: Karten und Räume
- geo_1_karten_raeume in Ukrainisch ergänzt: drei Abschnitte, vier Quizfragen samt Rückmeldungen, Ziele/Vorwissen/Zusammenfassung, Kartenauftrag und Zuordnungs-/Schreibwerkstatt. Maßstab, kürzeste Route, Legende sowie Interessen unterschiedlicher Nutzergruppen bleiben erhalten; SourceRevision 0.
- Routenverzeichnis um uk ergänzt, einschließlich zugänglicher Kartenbeschreibung, Position, Schrittzahl/Entfernung, Baustelle, Rand und Ziel. Zählformulierung vermeidet falsche ukrainische Pluralformen.
- Tatsächlicher ukrainischer Kapiteltest prüft Auswahl ohne Rückfall, Antwortäquivalenz, Zuordnung 3/3, vollständige Prüfung 4/4 sowie Kartenrand, C3-Sperre, 800-m-Route, Ziel, Reset und wiederholte Initialisierung. Bestanden; deutsche Geografiefunktionen und englische/türkische Kartentests ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Serbische Fassung: Karten und Räume
- Vollständige serbische Übersetzung in lateinischer Schrift ergänzt: drei Abschnitte, vier Fragen mit sämtlichen Rückmeldungen, Lernziele/Vorwissen/Zusammenfassung sowie Zuordnungs- und Schreibwerkstatt. SourceRevision 0 entspricht der deutschen Prüfung.
- Routenverzeichnis um sr ergänzt: Position, Schrittzahl/Entfernung, Sperre, Rand, Ziel und zugängliche Kartenbeschreibung. Zählformulierung mit „Broj koraka“ vermeidet wechselnde Numerusformen.
- Neuer tatsächlicher serbischer Kapiteltest prüft Auswahl ohne Rückfall, Antwortäquivalenz, Zuordnung 3/3, Prüfung 4/4, Kartenrand, C3-Sperre, 800-m-Route, Ziel und Reset. Bestanden; ukrainische, türkische, englische Kartentests und bestehender deutscher Geografietest ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Arabische Fassung: Karten und Räume; Kartenrichtung unabhängig von Schreibrichtung
- Arabisches Kapitel vollständig ergänzt: drei Abschnitte, vier Prüfungsfragen/Rückmeldungen, Ziele/Vorwissen/Zusammenfassung und Zuordnungs-/Schreibwerkstatt. SourceRevision 0; Koordinaten und Maßstabsnotation in Texten mit Bidi-Isolierung.
- Route unterstützt nun de/en/tr/uk/sr/ar. Kartengitter hat ausdrücklich dir=ltr, damit A links, E rechts und die Ost-/West-Steuerung auch unter arabischem Seitentext räumlich konsistent bleiben. Arabische Meldungen isolieren Koordinaten; natürliche arabische Zählformulierungen.
- Tatsächlicher arabischer Render-/Interaktionstest prüft Übersetzungsauswahl, Antwortäquivalenz, Zuordnung 3/3, Prüfung 4/4, Kartenrand, C3, 800-m-Route, Ziel, Reset und deklarierte Gitterrichtung/Reihenfolge. Bestanden; alle vier weiteren übersetzten Kartentests sowie bestehender deutscher Geografietest bestanden. diff --check sauber.
- Karten und Räume ist damit in allen sechs angebotenen Sprachen inhaltlich und funktional umgesetzt. Browserdarstellung (insbesondere RTL) ist weiterhin separat zu prüfen; keine Veröffentlichung und keine vollständige Website-Abnahme behauptet.

### Türkische Fassung: Wirtschaften im Alltag
- Kapitel geo_2_wirtschaften vollständig ins Türkische übertragen: drei Abschnitte, vier Prüfungsfragen mit Rückmeldungen, Lernziele/Vorwissen/Zusammenfassung sowie Zuordnungs- und Schreibwerkstatt. Begriffe für Bedürfnisse, Opportunitätskosten, Budget und Einnahmen/Kosten/Gewinn erhalten.
- Budgetmeldungen in de/en/tr-Sprachverzeichnis überführt. Türkische Ausgaben-/Restangaben und drei Zielzustände (Überschreitung, Rücklage nicht erreicht, Rücklage erreicht) ergänzt; bestehende Rechenlogik unverändert.
- Tatsächlicher türkischer Test prüft alle 16 Budgetkombinationen, fehlenden Fallback, gleiche Richtigkeitsflags, Zuordnung 3/3 und vollständige Prüfung 4/4. Bestanden; englischer Wirtschaftstest und umfassender deutscher Geografietest ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Ukrainische Fassung: Wirtschaften im Alltag
- Vorhandene ukrainische Übertragung von geo_2_wirtschaften anhand der aktuellen Dateien geprüft: drei Abschnitte, vier Fragen mit Antwortfeedback, Lernziele, Vorwissen, Zusammenfassung sowie Zuordnungs- und Schreibwerkstatt; sourceRevision 0.
- Ukrainische Budgetmeldungen sind implementiert und werden über data-locale=uk ausgewählt. Ausgaben, Restbetrag und die drei Zustände (Budget überschritten, Reserve zu klein, Reserve erreicht) werden geprüft.
- Neuer tatsächlicher Kapiteltest test_economics_ukrainian.js bestanden: Auswahl ohne deutschen Rückfall, stabile Frage-IDs und Richtigkeitsflags, Zuordnung 3/3, vollständige Prüfung 4/4 sowie alle 16 Budgetkombinationen und erneute Initialisierung.
- Englischer und türkischer Wirtschaftstest sowie der deutsche Geografietest ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung; Gesamtziel weiterhin offen.

### Serbische Fassung: Wirtschaften im Alltag
- geo_2_wirtschaften in serbischer lateinischer Schrift ergänzt: drei Abschnitte, vier Fragen mit Feedback, Lernziele/Vorwissen/Zusammenfassung, Budgetexperiment und Zuordnungs-/Schreibwerkstatt. SourceRevision 0; Frage-IDs und Richtigkeitsflags erhalten.
- Budgetmeldungen um sr erweitert: Ausgaben/Restbetrag und Rückmeldung für Überschreitung, unzureichende Reserve oder erreichte Reserve.
- Neuer tatsächlicher Kapiteltest test_economics_serbian.js bestanden: Übersetzung ohne Rückfall, Zuordnung 3/3, Prüfung 4/4, alle 16 Budgetkombinationen und wiederholte Initialisierung. Englische, türkische, ukrainische Wirtschaftstests und deutscher Geografietest ebenfalls bestanden.
- Keine Browserprüfung und keine Veröffentlichung; die Gesamtwebsite ist weiterhin unvollständig.

### Arabische Fassung: Wirtschaften im Alltag
- geo_2_wirtschaften vollständig ergänzt: drei Abschnitte, vier Fragen mit Rückmeldungen, Lernziele/Vorwissen/Zusammenfassung sowie Zuordnungs- und Schreibwerkstatt; sourceRevision 0 und stabile Fragen-IDs/Richtigkeitsflags.
- Budgetmeldungen unterstützen nun alle sechs Sprachen. Arabische dynamische Zahlen einschließlich negativer Restbeträge mit Unicode-LTR-Isolierung; Währung als arabisches Wort. Rechenausdruck im Quiz ebenfalls isoliert.
- test_economics_arabic.js bestanden: kein Übersetzungsrückfall, Zuordnung 3/3, vollständiges Quiz 4/4, alle 16 Budgetkombinationen mit unabhängig berechneten Sollwerten und wiederholte Initialisierung. Alle vier weiteren übersetzten Wirtschaftstests und deutscher Geografietest bestanden; diff --check sauber.
- Das Kapitel ist in allen sechs angebotenen Sprachen umgesetzt. Browserdarstellung und insbesondere RTL bleiben separat zu prüfen. Gesamtziel offen, keine Veröffentlichung.

### Wirtschaften im Alltag: Fragen den erklärenden Abschnitten zuordnen
- In allen sechs Sprachfassungen die vier bestehenden Fragen didaktisch neu zugeordnet: Dienstleistungen und Opportunitätskosten direkt nach den Grundbegriffen; Restbetrag direkt nach Budgeterklärung und Experiment; Einnahmen/Gewinn nach den wirtschaftlichen Beziehungen.
- Frage-IDs, Antworten, Feedback und Prüfungsumfang unverändert. Keine Revisionsanhebung, weil kein neuer Prüfungsstoff entsteht und gespeicherte Ergebnisse fachlich gültig bleiben.
- Deutscher Geografietest und alle fünf übersetzten Wirtschaftskapiteltests bestanden; sie prüfen Rendern, Frageäquivalenz, Aufgabenabschluss und Budgetzustände. Keine Browserprüfung oder Veröffentlichung.

### Gesamtprüfung nach den Geografieübersetzungen
- Aktuellen vollständigen Funktionstestlauf abgeschlossen: scripts/run_functional_tests.js meldet 90/90 bestandene Suiten, Exit 0. Einzelresultate und Zeitstempel stehen in ../functional-test-report.json. Der Lauf umfasst die neuen Karten-/Wirtschaftsübersetzungen sowie die bestehenden Lern-, Prüfungs-, Stofflisten-, Arbeitsblatt- und Fachinteraktionstests.
- Feedback-Strukturaudit: 5061 strukturierte Fragen ohne gemeldete Strukturfehler. Dies ist kein Beweis fachlicher Richtigkeit oder sprachlicher Gleichwertigkeit.
- Übersetzungsauswahl erneut gemessen: Englisch 43/193; Arabisch, Serbisch, Türkisch und Ukrainisch jeweils 42/193. Somit bleiben 150 bzw. 151 deutsche Ersatzfassungen pro Sprache; darunter jeweils 54 veraltete Revisionen und eine inkompatible Struktur. Vollständige Mehrsprachigkeit ist ausdrücklich nicht erreicht.
- Gesamtziel offen: vollständiger Lehrplan-/Inhaltsabgleich, verbleibende Übersetzungen, Medienprüfung, Browserprüfung und Veröffentlichung fehlen weiterhin. Der erfolgreiche Funktionstestlauf ersetzt diese Abnahmen nicht.

### Englische Fassung: Lebenssituationen hier und weltweit
- geo_1_lebenssituationen vollständig ins Englische übertragen: vier Abschnitte und fiktive Vergleichsfälle (Wien/Nairobi/Lima), acht Fragen mit Antwortfeedback, Lernziele, Zusammenfassung und Zuordnungs-/Schreibwerkstatt. Voraussetzungen und Quellen-URLs erhalten, deutsche Quellentitel als German gekennzeichnet; sourceRevision 0.
- Fiktion/Kontextgrenzen, Vergleichskriterien, wöchentliche Wegzeitrechnung (450/150 Minuten, Differenz 300 Minuten), Einkommen/Vermögen und Handlungsebenen bleiben erhalten. Keine persönlichen Familienangaben erforderlich.
- Neuer tatsächlicher Render-/Interaktionstest test_living_situations_english.js bestanden: Auswahl ohne Fallback, Frage-IDs/Richtigkeitsflags, vier Tabellenfälle mit Spaltenköpfen, Zuordnung 3/3 und vollständiges Quiz 8/8. Bestehender deutscher Geografietest ebenfalls bestanden; diff --check sauber.
- Keine Browserprüfung oder Veröffentlichung. Vollständiger letzter Gesamtfunktionstestlauf mit 90 Suiten stammt vor dieser Ergänzung; neue gezielte Tests separat bestanden.

### Lebenssituationen: Aussagekräftigere Fehlantworten
- In Deutsch und Englisch acht Distraktoren samt spezifischen Rückmeldungen bei vier Fragen überarbeitet. Konkrete Verwechslungen: gleicher Beruf/gleiches Einkommen; Berufsname/Beschäftigungssicherheit; Eigentum oder Geldbetrag als alleinige Vergleichsgrundlage; Momentaufnahme/Dauerzustand; Einzelbild/Stadtprofil; mehrere Maßnahmen/eine oder mehrere Handlungsebenen.
- Unplausible Alternativen zu persönlichem Wert, langer Wegzeit als Reichtumsbeweis und automatisch kürzerer Busfahrt entfernt. Die Unterrichtsaussagen bleiben erhalten; die Prüfung fordert genaueres Unterscheiden.
- Kapitelrevision auf 1 gesetzt und englische sourceRevision synchronisiert, damit Ergebnisse der leichteren alten Fragen nicht als aktueller Nachweis übernommen werden.
- Englischer Kapiteltest nun zusätzlich mit beiden falschen Antwortvarianten über alle acht Fragen: sämtliche gewählten Feedbacktexte werden tatsächlich in der Auswertung angezeigt. Test, deutscher Geografietest und Revisionsverhaltenstest bestanden; diff --check vor letzter Testerweiterung sauber. Keine Browserprüfung oder Veröffentlichung.

### Lebenssituationen: interaktiver Schulwegvergleich
- Deutsches und englisches Kapitel um angeleitete Interaktion ergänzt: zwei einfache Wegzeiten von 1–60 Minuten und 1–5 Schultage; Startwerte Jo 45/Amani 15 bei fünf Tagen. Sichtbare Eingabewerte, Rechenwege für Hin-/Rückwege, absolute Differenz in Minuten sowie Stunden/Restminuten und Richtung des Vergleichs.
- Annahmen stehen im Modell: zwei gleich lange Wege täglich, geänderte Werte sind neue fiktive Szenarien. Vorhersageauftrag und Reflexion zu nicht ableitbarer Lernbereitschaft verbinden Bedienung mit Lernziel.
- Native beschriftete Regler, Live-Status und Reset. Keine neue Prüfungsfrage oder neuer Prüfungsstoff; Kapitelrevision 1 unverändert.
- Neuer Test mit 250 Kombinationen über beide Sprachen bestanden, einschließlich Gleichstand, umgekehrter Zeitbelastung, Grenzwerten, Stundenumrechnung, sichtbaren Werten, Reset/Fokus und wiederholter Initialisierung. Englischer tatsächlicher Kapiteltest und bestehender Geografietest ebenfalls bestanden; diff --check sauber. Browserprüfung und Gesamtfertigstellung weiterhin offen.

### Türkische Fassung: Lebenssituationen hier und weltweit
- Vollständiges Kapitel mit vier Abschnitten, fiktiver Falltabelle, acht überarbeiteten Prüfungsfragen und sämtlichen Feedbacktexten, Lernzielen/Zusammenfassung sowie Zuordnungs-/Schreibwerkstatt ergänzt. Voraussetzungsschlüssel und Quellen-URLs erhalten; sourceRevision 1.
- Schulwegvergleich mit türkischen Beschriftungen, Modellannahmen, Reflexionsauftrag und Statusmeldungen ergänzt. Rechenlogik und Wertebereiche bleiben in allen Sprachfassungen gleich.
- Tatsächlicher türkischer Kapiteltest bestanden: Auswahl ohne Fallback, Frageäquivalenz, vier Fälle, Zuordnung 3/3, Prüfung 8/8 und beide falschen Antwortvarianten samt ausgewähltem Feedback für alle acht Fragen. Vergleichstest auf drei Sprachen erweitert: 375 Fälle einschließlich Gleichstand, Richtungswechsel und Reset bestanden.
- Englischer Kapiteltest und deutscher Geografietest ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung; Gesamtziel bleibt offen.

### Ukrainische Fassung: Lebenssituationen hier und weltweit
- Vollständige ukrainische Fassung von geo_1_lebenssituationen ergänzt: vier Abschnitte mit Falltabelle, acht aktuelle Fragen und allen Rückmeldungen, Lernzielen/Zusammenfassung sowie Zuordnungs-/Schreibwerkstatt. SourceRevision 1; Voraussetzungen und Quellen-URLs erhalten.
- Schulwegvergleich mit ukrainischen Eingaben, Annahmen und Reflexionsauftrag. Statusmeldungen in ein de/en/tr/uk-Verzeichnis überführt; Rechenlogik unverändert.
- Ukrainischer tatsächlicher Kapiteltest bestanden: kein Fallback, vier Fälle, gleiche Frage-IDs und Richtigkeitsflags, Zuordnung 3/3, Prüfung 8/8 sowie beide falschen Antwortvarianten mit jeweiligem Feedback für jede Frage.
- 500 Schulwegvergleiche über vier Sprachen bestanden; englischer und türkischer Kapiteltest sowie deutscher Geografietest ebenfalls bestanden. diff --check sauber. Gesamtziel, weitere Übersetzungen, Browserprüfung und Veröffentlichung bleiben offen.

### Serbische Fassung: Lebenssituationen hier und weltweit
- Kapitel in serbischer lateinischer Schrift ergänzt: vier Abschnitte, Falltabelle, acht aktuelle Fragen mit allen Rückmeldungen, Lernziele/Zusammenfassung und Zuordnungs-/Schreibwerkstatt; sourceRevision 1.
- Schulwegvergleich mit serbischen Eingaben, Modellannahmen, Reflexionsauftrag und Statusmeldungen. Inhalte behalten die Grenzen fiktiver Fallbeispiele und die Unterscheidung zwischen Beobachtung, Berechnung und unbelegter Verallgemeinerung bei.
- Tatsächlicher serbischer Kapiteltest bestanden: Auswahl ohne Fallback, Frageäquivalenz, vier Fälle, Zuordnung 3/3, Prüfung 8/8 sowie beide falschen Antwortvarianten mit Feedback. 625 Vergleichsfälle über fünf Sprachen und bestehender deutscher Geografietest bestanden; diff --check sauber.
- Keine Browserprüfung oder Veröffentlichung; Gesamtziel weiterhin offen.

### Arabische Fassung: Lebenssituationen hier und weltweit
- Kapitel vollständig ergänzt: vier Abschnitte, fiktive Falltabelle, acht Fragen mit sämtlichen aktuellen Rückmeldungen, Lernziele/Zusammenfassung und Zuordnungs-/Schreibwerkstatt. SourceRevision 1, Quellen-URLs und Voraussetzungsschlüssel erhalten.
- Schulwegvergleich unterstützt nun alle sechs angebotenen Sprachen. Arabische Formeln, Differenz und A/B-Kennzeichnungen sind mit LTR-Isolierung versehen; Regler explizit dir=ltr, Einheiten min/h im Text erklärt.
- Tatsächlicher arabischer Kapiteltest bestanden: kein Fallback, vier Tabellenfälle, Zuordnung 3/3, Prüfung 8/8 sowie beide falschen Antwortvarianten samt Feedback. 750 Schulwegvergleiche über sechs Sprachen einschließlich Richtung, Gleichstand, Reset und deklarierter Leserichtung bestanden. Deutscher Geografietest ebenfalls bestanden; diff --check sauber.
- Das Kapitel ist in allen sechs Sprachen umgesetzt. Browserdarstellung, insbesondere tatsächliches RTL-Layout, ist noch nicht geprüft; keine Veröffentlichung und kein Abschluss des Gesamtziels.

### Geteilte Stofflisten: unbekannte Kapitel sichtbar machen
- Unbekannte Kapitel-IDs in geteilten Listen werden nicht mehr still verworfen: ein dauerhafter Hinweis bei der Stoffliste kennzeichnet den unvollständigen Prüfungsstoff und verweist zur Klärung an die teilende Person. Doppelte unbekannte IDs werden einmal gezählt; rohe Linkwerte werden nicht als HTML ausgegeben.
- Vollständig ungültige Links überschreiben die bisher gespeicherte persönliche Stoffliste nicht. Gültige Teilmengen bleiben öffnbar; ein ausdrücklich leerer Plan bleibt eine leere Auswahl.
- Neuer Test für teilweise/vollständig ungültige Links, Duplikate, Moduswechsel und explizit leere Pläne bestanden. Lehrplanlisten-, Ladefehler- und Lernablauftests ebenfalls bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Unvollständige Stofflisten beim Weiterteilen und Wiederholen erhalten
- Fehlende Kapitel-IDs bleiben jetzt im weitergeteilten Link sowie beim Öffnen eines Wiederholungskapitels erhalten. Damit wird der Hinweis auf unvollständigen Prüfungsstoff beim Weitergeben nicht still beseitigt.
- Kernnavigation trägt diesen Linkkontext über Vor-/Zurück-Kapitel und den Rückweg zur Stoffliste weiter. Für tatsächlich angebotene Navigationsziele werden weiterhin ausschließlich vorhandene Kapitel verwendet; Duplikate werden entfernt.
- Tests für Weiterteilen, unbekannte IDs, gesperrten Speicher, Kapitelwechsel, Rücklinks, Lehrkräftemodus und Kapitelreihenfolge bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung, Gesamtziel offen.

### Englische Bedienhinweise für den gemeinsamen Kapitel-Lernweg
- 23 gemeinsame Navigations-/Orientierungstexte in core-learning.js lokalisierbar gemacht und englisch ergänzt: Lern-/Wiederholungsweg, Quizstart, Lernziele/Vorwissen, gezielte Wiederholung, Zusammenfassung, Quellen, Rückweg und Fortsetzung.
- Sprache richtet sich nach tatsächlicher Kapitelsprache. Deutsche Ersatzfassungen und bewusst zweisprachige de-en-Unterrichtskapitel behalten deutsche Lernhilfen.
- Neuer Test prüft beide Modi mit englischem Inhalt, deutschem Fallback und de-en-Inhalt einschließlich zugänglicher Überschrift, Abschnittslink, Quizstart und Wiederholungsinitialisierung. Englischer tatsächlicher Kapiteltest sowie Navigations- und Review-Linktests bestanden; diff --check sauber.
- Andere UI-Sprachen und katalogbasierte Titel benachbarter Kapitel sind damit noch nicht vollständig lokalisiert. Browserprüfung und Gesamtabschluss weiterhin offen.

### Gemeinsame Kapitelhinweise in allen angebotenen Sprachen
- Die 23 gemeinsamen Lern-/Wiederholungshinweise jetzt zusätzlich auf Türkisch, Ukrainisch, Serbisch und Arabisch ergänzt: Ziele, Vorwissen, Quizstart, gezielte Wiederholung, Zusammenfassung, Quellen und Navigation.
- Test auf 30 Kombinationen erweitert (fünf Fremdsprachen, zwei Modi, übersetzter Inhalt/deutscher Fallback/de-en-Inhalt). Lokalisierte Orientierung, zugängliche Beschriftung, Abschnittslink und Quizaktion sowie deutsche Hilfen bei Ersatzfassungen bestanden.
- Tatsächliche arabische, türkische, ukrainische und serbische Kapiteltests sowie Kapitelnavigation bestanden; diff --check sauber. Katalogtitel benachbarter Kapitel und Lernbereich-Oberfläche sind noch nicht vollständig lokalisiert. Browserprüfung und Gesamtziel bleiben offen.

### Übersetzte Titel in Vorwissens- und Fortsetzungslinks
- Renderer gibt der gemeinsamen Lernnavigation einen Resolver für das tatsächlich ausgewählte Kapitel. Vorwissenslinks und vorherige/nächste Kapitel verwenden damit aktuelle übersetzte Titel, sofern die vorhandene Übersetzung die gleiche Auswahlprüfung wie das Kapitel selbst besteht.
- Fehlende/veraltete Übersetzungen verwenden den deutschen Titel; Resolver ist optional für bestehende direkte Aufrufe. Titel-Markup wird in reinen Linktext umgewandelt.
- Alle fünf tatsächlichen Lebenssituationen-Sprachtests prüfen jetzt zusätzlich beide übersetzten Vorwissenstitel. Diese Tests, 30 UI-Sprachfälle, Kapitelnavigation und Übersetzungsrevisionstests bestanden; diff --check sauber.
- Lernbereich-Oberfläche, weitere Inhalte, Browserprüfung und Gesamtfertigstellung bleiben offen. Keine Veröffentlichung.

### Gesamtfunktionstest nach mehrsprachiger Navigation und Stofflisten-Korrekturen
- Aktueller Lauf scripts/run_functional_tests.js abgeschlossen: 98/98 Suiten bestanden, Exit 0. Einzelresultate mit Zeitstempeln in ../functional-test-report.json. Enthalten sind die neuen Sprach-/Schulwegtests und die Weitergabe unvollständiger Stofflisten.
- Feedback-Strukturaudit: 5101 strukturierte Frageeinträge ohne gemeldete Strukturfehler; keine Aussage über vollständige fachliche Richtigkeit.
- Übersetzungsprüfung: Englisch 44 von 193 Kapiteln ausgewählt, übrige vier Fremdsprachen jeweils 43; 149 bzw. 150 deutsche Ersatzfassungen bleiben. Dies widerspricht einer vollständigen Mehrsprachigkeitsabnahme.
- Gesamtziel unverändert offen: verbleibende Inhalte/Lehrplanabgleich, Übersetzungen, Medien, Browserprüfung und Veröffentlichung. Die grünen Funktionstests belegen diese Anforderungen nicht.

### Strahlung: typische Fehlvorstellungen statt offensichtlicher Ablenker
- Zwölf falsche Antwortoptionen bei sechs deutschen Fragen überarbeitet: Anregung/Ionisation, chemische Reaktion/Kernumwandlung, kurze Reichweite/Energieabgabe, äußere Abschirmung/innere Quelle, relative Häufigkeit/Wahrscheinlichkeit sowie Aktivität/Exposition. Jeweils spezifische Rückmeldung ergänzt.
- Erklärung zu Elektronenhülle, Ionisation und Kernumwandlung im Kapitel ergänzt, damit die Unterscheidungen vor der Prüfung behandelt werden. EPA-Seiten radiation-basics und radioactive-decay live gelesen; Grundlagenquelle im Kapitel ergänzt.
- Kapitelrevision 1: frühere Ergebnisse der leichteren Prüfung bleiben historisch erhalten, gelten aber nicht als aktueller Nachweis.
- Physikkern-, Revisions- und tatsächlicher Kernkapitel-Rendertest bestanden; diff --check vor letzter Textergänzung sauber. Keine vollständige fachliche Abnahme aller Physikkapitel, keine Browserprüfung oder Veröffentlichung.

### Zerfallsmodell: Erwartungswert und Modellgrenzen erklären
- Beim Erreichen von null Ausgangskernen erklärt der Status den Unterschied zwischen einem einzelnen Versuch und dem theoretischen Mittelwert. Nach zehn Schritten wird das Darstellungsende samt Neustartmöglichkeit ausdrücklich genannt.
- Kapitel erläutert, dass nur ursprüngliche Kerne verfolgt werden, Zerfallsprodukte nicht weiter modelliert werden und ein gebrochener Erwartungswert keinen Bruchteil eines Kerns bedeutet. Zehn Schritte sind eine Darstellungsgrenze, kein physikalisches Ende.
- Tabelle mit Beschriftung und Spaltenzuordnung versehen; deutsche Dezimaldarstellung in Status und Tabelle vereinheitlicht.
- Neuer Grenzfalltest prüft alle/keine überlebenden Kerne, Zahl der Zufallsziehungen, unveränderten Erwartungswert, zehn Schritte, Aktivierungsgrenze und vollständigen Reset. Zusammen mit Physikkern- und tatsächlichem Rendertest bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Zerfallsmodell: mehrere Durchläufe direkt vergleichen
- Nach Schritt zwei übernimmt das Modell automatisch Restzahl und Erwartungswert 50 in eine Vergleichstabelle. Die letzten zehn erfassten Versuche bleiben über Neustarts hinweg sichtbar; die Seite erklärt die auf den Seitenbesuch begrenzte Speicherung.
- Vergleich separat leerbar, ohne den laufenden Versuch zu verändern. Erfassung erfolgt nur einmal je Durchlauf nach Schritt zwei; weitere Schritte erzeugen keine irreführenden Vergleichswerte.
- Tests prüfen drei unterschiedliche Ergebnisse (200/0/50 mit kontrollierten Zufallsfolgen), Erfassungszeitpunkt, Neustarterhalt, Grenze von zehn Einträgen, Nummerierung und Leeren/Fokus. Grenzfall-, Physikkern- und tatsächlicher Rendertest bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung.

### Kraftwerke: Umwandlung, Nutzung und Speicher unterscheiden
- Zehn Distraktoren mit gezieltem Feedback überarbeitet: Turbine/Generator/Akku, Fernwärme gegenüber elektrischer Heizung und Brennstoffleitung, Bilanzfehler 55/60 statt 15 und einseitige Auswahl nach Nennleistung oder Nutzungsgrad.
- Anwendungsbeispiel und Prüfung zu Speicherenergie/Leistung ergänzt: 10 kWh bereits nutzbare Energie bei 2 kW gleichmäßiger Entnahme ergeben 5 h. Annahmen zu Entladeleistung und bereits berücksichtigten Verlusten ausdrücklich genannt; Lernziel und Zusammenfassung erweitert.
- Energiebilanztabelle mit Caption und zugeordneten Spaltenüberschriften. Revision 1 wegen erweitertem Prüfungsstoff.
- Physikkern-, tatsächlicher Kernkapitel- und Revisionsverhaltenstest bestanden; diff --check sauber. Die Wiener Standortangaben wurden in diesem Schritt nicht erneut verifiziert. Gesamtziel und Browserprüfung offen; keine Veröffentlichung.

### Speicherenergie und Leistung interaktiv untersuchen
- Kraftwerkskapitel um Regler für 0–20 kWh nutzbare Energie und 0–5 kW konstante Entnahme erweitert. Rechenweg E/P, deutsche Dezimaldarstellung und Näherungszeichen bei gerundeten Zeiten; Vorhersageauftrag zur Verdopplung der Leistung.
- Leerer Speicher und fehlende Entnahme erhalten eigene Erklärungen ohne Division durch null. Modellgrenzen ausdrücklich: nutzbare Energie nach Verlusten, keine Nachladung, passende Entladeleistung, keine Selbstentladung oder Eigenverbrauch.
- 231 Kombinationen, Halbierung der Dauer bei doppelter Leistung, zugängliche Reglerwerte und Reset bestanden. Physikkern-Test bestanden. Tatsächlicher Rendertest erwartete zuvor nur ein Experiment je Kapitel; auf konkrete Identität und Initialisierung beider Kraftwerksexperimente erweitert, danach bestanden.
- Keine Browserprüfung oder Veröffentlichung. Gesamtziel weiterhin offen.

### Wiener Kraftwerksbeispiele anhand erreichbarer Primärquellen geprüft
- Stadt-Wien-Seite zu Freudenau und Wien-Energie-Besuchsseite zur Spittelau erfolgreich geöffnet. Ergänzend technische VERBUND-Seite power.verbund.com/de/Wien-Freudenau und Wien-Energie-Seite zur Generalsanierung (Turbine/Generator, Strom und Wärme) recherchiert und als Kapitelquellen aufgenommen.
- Freudenau als Laufkraftwerk präzisiert. Keine wechselnden Haushaltsvergleichszahlen oder pauschalen Werbeaussagen als Lehrbuchfakten übernommen.
- Quellenwerkstatt mit Arbeitsauftrag und Vergleichshilfe ergänzt: technische Angabe vs. Bewertung, Herkunft/Abrufdatum, fehlende Daten für Umweltvergleich, Bedeutung von Haushaltsäquivalenten. Bestehendes Lernziel der Mehrkriterienbewertung vertieft.
- Älterer Umweltbericht 2023 aus Suchtreffer war beim Öffnen nicht erreichbar (404); nicht als neue Belegquelle verwendet. Physikkern- und tatsächlicher Rendertest bestanden; diff --check sauber. Keine Browserprüfung oder Veröffentlichung, Gesamtziel offen.

### Mondphasen: Modellskala und Finsternisse klar unterscheiden
- Phasenregler beschreibt nun ausdrücklich einen vollständigen vereinfachten Zyklus von 0° bis 360° statt eines ungerichteten Winkels zwischen Blickrichtungen. Die Rückkehr bei 360° und das Weglassen von Erdschatten/Bahnneigung werden erklärt; das Balkenmodell berechnet keine Finsternisse.
- Vergleichslösung präzisiert den Bezugsflächenanteil: beleuchteter Anteil der von der Erde sichtbaren Mondscheibe. NASA-Mondphasenseite live gelesen, insbesondere Beleuchtung, Perspektive und Bahnneigung.
- Zwei unplausible Eclipse-Distraktoren durch konkrete Verwechslungen der Schattenreichweite und Neu-/Vollmondstellung ersetzt; Feedback erklärt die Geometrie. Kapitelrevision 1.
- Physikkern- und tatsächlicher Rendertest bestanden. Revisionsprüfung hatte das nun überarbeitete Mondkapitel als unverändertes Beispiel fest eingetragen; auf weiterhin unverändertes Kartenkapitel umgestellt und bestanden. Keine Browserprüfung oder Veröffentlichung.

### Mondphasen zusätzlich als Scheibe dargestellt
- SVG-Scheibe ergänzt, deren beleuchtete Fläche auf denselben Phasenregler reagiert. Beleuchtungsgrenze folgt der projizierten Kugelgeometrie; zunehmende Phase rechts, abnehmende links. Text kennzeichnet die vereinfachte Nordhalbkugel-Orientierung und wechselnde reale Lage am Himmel.
- Dynamische zugängliche Beschreibung nennt Phase/Prozentanteil und das Weglassen des Erdschattens. Balken bleibt als zweite Darstellung des Flächenanteils erhalten.
- Neuer Geometrietest prüft alle neun Reglerstellungen: Punkte innerhalb des Mondradius, Polygonfläche gegen unabhängig formuliertes sin²-Halbwinkelmaß (Toleranz 0,001), Halbmondorientierung und Beschreibung. Physikkern- und tatsächlicher Rendertest ebenfalls bestanden; diff --check sauber.
- Dies ist Quellcode-/Geometrieprüfung, keine visuelle Browserabnahme. Gesamtziel und Veröffentlichung weiterhin offen.

### Englische Fassung: Erde, Mond und Sonne
- Vollständige englische Fassung mit vier Abschnitten, acht aktuellen Fragen und sämtlichen Rückmeldungen, Lernzielen, Zusammenfassung, Modellaufträgen und Vergleichslösungen ergänzt; sourceRevision 1.
- Mondscheibe und Balken mit englischen Beschriftungen, Phasennamen und zugänglichen dynamischen Meldungen. Aktuelle Hinweise zur Zyklusskala, schematischen Orientierung und zum Weglassen von Finsternissen vollständig übertragen.
- Neuer tatsächlicher englischer Kapiteltest bestanden: Auswahl ohne Fallback, Frageäquivalenz, alle acht richtigen Antworten sowie beide falschen Antwortvarianten mit jeweiligem Feedback, Hauptphasen und SVG-Beschreibung. Mondgeometrie-, Physikkern- und deutscher Rendertest ebenfalls bestanden; diff --check sauber.
- Keine Browserprüfung oder Veröffentlichung. Weitere Sprachfassungen und Gesamtziel weiterhin offen.

### Türkische Fassung: Erde, Mond und Sonne
- Vier Abschnitte, acht Prüfungsfragen mit vollständigem Feedback, Lernziele/Zusammenfassung, Modellaufträge und Vergleichslösungen ins Türkische übertragen; sourceRevision 1.
- Mondmodell mit türkischen Phasennamen, Status-/Reglerrückmeldungen und SVG-Beschreibung. Einschränkungen zu Zyklusskala, Orientierung und fehlender Finsternisberechnung erhalten.
- Neuer tatsächlicher türkischer Kapiteltest bestanden: Auswahl ohne Fallback, acht äquivalente Fragen, korrekte und beide falschen Antwortvarianten mit Feedback sowie Hauptphasen und Scheibenbeschreibung. Englischer Kapiteltest, Mondgeometrie und Physikkern ebenfalls bestanden; diff --check sauber.
- Keine Browserprüfung oder Veröffentlichung; weitere Sprachen und Gesamtziel offen.

### Ukrainische und serbische Fassung: Erde, Mond und Sonne
- Vorheriger Gesprächsbeitrag beschrieb nur das Produktziel und änderte keine Dateien; daher kein Umsetzungsfortschritt. Aktuelle Arbeitskopie erneut geprüft und den zuvor nicht bestätigten ukrainischen Kapiteltest erfolgreich ausgeführt.
- Serbische Fassung in lateinischer Schrift ergänzt: vier Abschnitte, acht Fragen mit allen Rückmeldungen, Lernziele, Zusammenfassung, Modellaufträge und Vergleichslösungen; sourceRevision 1. Wiener Beispiele und Hinweise zu Modellgrenzen erhalten.
- Serbische Phasennamen, Statusmeldungen, zugängliche Reglerwerte und SVG-Beschreibungen ergänzt. Der neue Kapiteltest prüft die tatsächliche Auswahl ohne Fallback, Hauptphasen, Frageäquivalenz sowie alle richtigen und beide falschen Antwortvarianten. Test bestanden; eine anfänglich noch englische Testerwartung wurde auf den serbischen Modellgrenzentext korrigiert.
- Aktueller Auswahlaudit über 193 Kapitel: Englisch 45, Serbisch/Türkisch/Ukrainisch je 44, Arabisch 43 auswählbare Übersetzungen. Übrige Kapitel nutzen weiterhin kenntlich gemachten deutschen Fallback; dies ist keine vollständige sprachliche Abnahme.
- Keine Browserprüfung oder Veröffentlichung. Gesamtziel bleibt offen.
- Abschließender Gesamtlauf: 105/105 Funktionstests bestanden, Bericht unter ../functional-test-report.json. Dies belegt die jeweils getesteten Funktionen, nicht vollständige Lehrplanabdeckung, fachliche Prüfung aller Texte oder visuelle Abnahme.

### Arabische Fassung: Erde, Mond und Sonne
- Vorheriger Zielturn war Fortschritt: serbische Fassung, ukrainische Verifikation und vollständiger Funktionstestlauf. Ausgangsstand erneut gelesen; arabische Fassung dieses Kapitels fehlte tatsächlich.
- Vollständige arabische Fassung mit vier Abschnitten, acht Fragen und sämtlichen Rückmeldungen, Lernzielen, Zusammenfassung und Modellaufgaben ergänzt; sourceRevision 1. Alle sechs angebotenen Sprachen besitzen jetzt die aktuelle Fassung dieses Kapitels.
- Arabische Phasennamen, dynamische Status-/Regler-/SVG-Beschreibungen ergänzt. Winkel und Prozentwerte in Textmeldungen mit Unicode-Richtungsisolaten, im Kapiteltext mit bdi; Regler und Prozentbalken ausdrücklich ltr. Finsternisanordnungen sprachlich als „zwischen“ beschrieben, damit die Reihenfolge nicht von Bindestrichen und Leserichtung abhängt.
- Neuer tatsächlicher arabischer Kapiteltest bestanden: RTL-Inhaltsbereich, LTR-Regler/Balken, alle neun Phasenstellungen einschließlich zunehmender/abnehmender Zwischenphasen, Richtungsisolate, aktuelle Sprachauswahl, acht äquivalente Fragen und alle Antwortbegründungen. Vier weitere Sprachtests, Mondgeometrie, deutscher Kernkapitel-Rendertest und gemeinsame mehrsprachige Navigation ebenfalls bestanden.
- Automatisierte Struktur-/Funktionstests sind keine visuelle RTL-Abnahme. Keine Browserprüfung oder Veröffentlichung; übrige Inhalts-/Übersetzungslücken und Gesamtziel bleiben offen.

### Halbwertszeit: mehrere Versuche auswerten
- Vorheriger Zielturn war Fortschritt (arabische Mondfassung). Strahlungskapitel und vorhandene Vergleichstests erneut gelesen: Versuche wurden gesammelt, eine gemeinsame Auswertung fehlte bislang.
- Vergleichsanzeige berechnet jetzt Mittelwert, kleinste und größte Restzahl ausschließlich aus den bis zu zehn sichtbaren Versuchen. Rundung des Mittelwerts auf höchstens zwei Dezimalstellen wird benannt. Beim Neustart bleiben Vergleich und Auswertung erhalten; Leeren entfernt auch die alten Kennzahlen.
- Arbeitsauftrag und Vergleichslösung erweitert: Mittelwert selbst berechnen, mit Erwartungswert 50 vergleichen, Ganzzahligkeit der Einzelzählungen von möglichen Kommamittelwerten unterscheiden. Ein weiterer Versuch garantiert ausdrücklich keine Annäherung an 50; unabhängige Wiederholung wird als statistische Aussage erklärt.
- Test mit Restzahlen 200, 0, 50 ergibt Mittelwert 83,33 und Grenzen 0/200. Nach Herausfallen der beiden Extremwerte beziehen sich alle Kennzahlen korrekt nur noch auf die zehn sichtbaren 50er-Ergebnisse. Leeren/Neustart, Zerfallsgrenzen sowie Physikkern- und tatsächlicher Kapitel-Rendertest bestanden.
- Keine Änderung der Quizfragen oder Kapitelrevision. Keine Browserprüfung oder Veröffentlichung; Gesamtziel offen.

### Kunst, 4. Klasse: konkretes Werbeprojekt
- Vorheriger Zielturn war Fortschritt (Auswertung des Halbwertszeitmodells). Kunstbestand erneut geprüft: Portfolio bot bisher allgemeine Projektplanung ohne konkretes Werbebeispiel.
- In kunst_4_portfolio ein selbst verfasster, ausdrücklich fiktiver Schulplakat-Entwurf für eine Reparaturwerkstatt ergänzt. Native Textdarstellung statt externem Bild; Einladung bzw. Ort/Zeit lassen sich bei unverändertem Wortlaut, Farben und Reihenfolge größer/fetter hervorheben. Status erklärt die sichtbare Änderung, ohne eine gemessene Publikumswirkung vorzutäuschen.
- Analyseauftrag zu Absender, Publikum, gewünschter Handlung und Belegen; Vergleichshilfe trennt sichtbare Gestaltung von vermuteter Wirkung. Unbelegtes Reparaturversprechen dient als konkretes Beispiel. Eigener Zweivarianten-Entwurf, Lesbarkeitsrückmeldung und dokumentierte Überarbeitung als Portfolio-Alternative ergänzt.
- Zwei neue bewertete Fragen mit sechs spezifischen Rückmeldungen; Kapitel nun sechs Fragen und Revision 1. Lernziel und Zusammenfassung erweitert. Andere offene Kunstbereiche und systematische Lehrplanabdeckung sind damit nicht als abgeschlossen bewertet.
- Kunstintegration bestanden: sieben Kapitel, 30 Fragen, 21 Zuordnungen, bestehende drei Bildlabore, 20 Wechsel des neuen Modells mit unverändertem Inhalt, Reset/Fokus und alle Antwortvarianten im erweiterten Kapitelquiz. Revisions-, Übersetzungsrevisions- und Deutschwerkstatttest ebenfalls bestanden.
- Keine Browserprüfung oder Veröffentlichung. Neue Werbeinhalte bisher Deutsch; Gesamtziel bleibt offen.

### Kunst und Gesellschaft: konkretes Museumswerk
- Vorheriger Zielturn war Fortschritt (Werbeprojekt). Bestehendes Kapitel erneut gelesen: die Auswahl eines konkreten Werks war bislang vollständig an Lehrkraft/Lernende ausgelagert.
- KHM-Werkdatensatz „Children’s Games“ bei Google Arts & Culture live gelesen: Pieter Bruegel d. Ä., 1560, Öl auf Holz, GG 1017. Datensatz mit Abbildung direkt im Kapitel verlinkt, teilweise englischen Museumstext kenntlich gemacht. Keine Museumsabbildung kopiert oder eingebettet.
- Suchtreffer KHM /kinderspiele-1511899-1 erwies sich als Glasnegativ von J. Löwy (1888–1891), nicht als Gemälde; /kinderspiele-1511900 lieferte 403. Diese Verwechslungsgefahr wird als Aufgabe zur Unterscheidung Werk/Reproduktion aufgegriffen. Auffällige Dimensionsangabe auf Arts & Culture nicht übernommen.
- Konkrete Betrachtungsfolge Gesamtbild/zwei Details, Lageangaben, Trennung Quellenwissen/Beobachtung/Deutung und Grenzen der Verallgemeinerung ergänzt. Eigene Spielplatzstudie mit drei Szenen und zwei Blickhöhen samt Rückmeldung/Überarbeitung als Gestaltungsauftrag.
- Zwei Fragen mit sechs individuellen Rückmeldungen hinzugefügt, Kapitelrevision 1. Kunstintegration bestanden: sieben Kapitel, insgesamt 32 Fragen, beide erweiterten Kapitel mit jeweils sechs Fragen und jeder Antwortvariante; Museumlink und sichere Tabattribute geprüft. diff --check sauber.
- Externe Abbildung bleibt für die konkrete Bildbetrachtung erforderlich. Keine visuelle Browserabnahme oder Veröffentlichung; weitere Kunstinhalte, Übersetzungen und Gesamtziel offen.

### Kunstmarkt: Interessen und Wertbegriffe
- Vorheriger Zielturn war Fortschritt (konkretes Museumswerk). Aktuellen Stand des Kapitels kunst_3_kunstgeschichte gelesen; Abschnitt Auftrag/Freiheit enthielt bisher keinen ausgearbeiteten Kunstmarktfall.
- Abschnitt um eine fiktive Papierarbeit und vier Perspektiven erweitert: gestaltende Person, Schulteam, Galerie und Besucherin. Tabelle mit Spalten-/Zeilenüberschriften, begründbare Konflikt-/Entscheidungsaufgabe und Vergleichsvorschlag; eigene Faltarbeit mit zwei Aufstellungsentwürfen.
- Materialkosten, Arbeitszeit, vorgeschlagener Preis und Erlösanteil ausdrücklich unterschieden. Zahlen sind allein erfundene Aufgabenbedingungen, keine behaupteten Marktstandards. Preis ist kein Qualitätsmaß; Ausstellung und Betrachtung setzen keinen Kauf voraus.
- Zwei neue Fragen mit individuellen Rückmeldungen, Lernziel und Zusammenfassung ergänzt. Kapitel umfasst acht Fragen, Revision 2. Kunstintegration über sieben Kapitel und nun 34 Fragen bestanden, einschließlich aller Antwortvarianten des erweiterten Kapitels. Revisionsprüfung ebenfalls bestanden.
- Keine Browserprüfung oder Veröffentlichung. Übersetzungen und weitere fachliche Anforderungen bleiben offen; Gesamtziel unverändert.

### Kunstkapitel in gezielt wiederholbare Lernabschnitte gegliedert
- Vorheriger Zielturn war Fortschritt (Kunstmarktfall). Aktuellen Kapitelaufbau geprüft: die Ergänzungen lagen bisher als umfangreiche Unterüberschriften in den ersten beiden Abschnitten.
- Kunst und Gesellschaft jetzt mit fünf Abschnitten: Kontext, Bruegel-Werkbetrachtung, Auftrag, Kunstmarkt, Präsentation. Portfolio jetzt mit vier Abschnitten, darunter eigenständig erreichbares Werbeprojekt. Vorhandene Abschnitts-IDs erhalten, neue IDs werkbeispiel/kunstmarkt/werbung ergänzt; Werkstattnummern und interne Textverweise angepasst.
- Fragen bleiben unverändert, werden aber ihrem jeweiligen neuen Abschnitt zugeordnet. Damit führt gezielte Wiederholung zur passenden kürzeren Einheit. Keine neue Inhaltsrevision nötig, da bewerteter Stoff und Frage-IDs gleich bleiben.
- Kunstintegration prüft die genaue Reihenfolge sowie Abschnittszuordnung aller acht Fragen in Kunst und Gesellschaft und der beiden Werbefragen; alle 34 Kunstfragen weiterhin ausgewertet. Kunst- und gezielter Wiederholungstest bestanden. Keine Browserprüfung oder Veröffentlichung; Gesamtziel offen.

### Foto/Medien: Umgestaltung und Bildunterschrift
- Vorheriger Zielturn war Fortschritt (Gliederung der Kunstkapitel). Aktuellen Medieninhalt gelesen; konkrete Umgestaltung mit Bildunterschrift fehlte, Montagefrage hatte sachfremde Distraktoren.
- Im vorhandenen geometrischen Bildlabor drei auswählbare Unterschriften ergänzt. Wechsel verändert nur Beschriftung/Status, nicht die Zeichnung. A/B-Vergleich berücksichtigt die Unterschrift; Reset setzt sie zurück. Keine reale Bewegung oder gemessene Publikumswirkung behauptet.
- Eigenständiger Abschnitt mit Vergleichsauftrag, Erklärung Beschreibung/erzählerische Deutung, eigener Vorlage und zwei dokumentierten Varianten. Zwei neue Fragen; Montage-Distraktoren durch plausible Verwechslungen ersetzt. Lernziel/Zusammenfassung ergänzt, Kapitelrevision 1, jetzt sechs Fragen.
- Kunstintegration bestanden: sieben Kapitel, 36 Fragen, alle Antwortvarianten der drei erweiterten Kapitel; SVG unverändert bei drei Captionwechseln, A/B-Unterschied erkannt, Reset korrekt. Revisionsprüfung bestanden; keine Browserprüfung/Veröffentlichung, Gesamtziel offen.

### Portfolio: Installation, Handlung und Vergänglichkeit
- Vorheriger Zielturn war Fortschritt (Medien-Umgestaltung). Aktuellen Portfolioaufbau erneut geprüft; Raum-/Zeitgestaltung fehlte als konkrete Projektoption.
- Eigenständiger Abschnitt raum_zeit: sechs gebrauchte Papierblätter als kleine Installation, zwei Blickrichtungen und veränderte Zwischenräume; anschließend geplanter einminütiger Ablauf mit Öffnung/Schließung und Pausen. Ausführung, Beschreibung oder gezeichneter Ablaufplan als Bearbeitungsmöglichkeiten.
- Umnutzung des Papiers, vorübergehender Aufbau und Abbau, Dokumentation und ihre Grenzen ausdrücklich behandelt. Vergleichshilfe vermeidet eine starre Trennung Installation/Performance. Zwei neue Fragen mit spezifischen Rückmeldungen, Lernziel und Zusammenfassung; Portfolio nun acht Fragen, Revision 2.
- Nebenbefund im Medienlabor korrigiert: SVG-Beschreibung enthielt bei einem Reglerupdate die dann aktuelle Bildunterschrift und konnte nach späterem Captionwechsel veralten. SVG-Beschreibung nennt jetzt nur Bildmerkmale; Caption und Status bleiben getrennt aktuell.
- Kunstintegration über sieben Kapitel mit 38 Fragen bestanden, alle Antwortvarianten der erweiterten Kapitel und keine Bildunterschrift mehr im SVG-Label. Revisionsprüfung bestanden. Praktische Ausführung/visuelle Abnahme nicht automatisiert belegt; keine Veröffentlichung, Gesamtziel offen.

### Neues Kunstkapitel: Körperdarstellungen und Selbstbild
- Vorheriger Zielturn war Fortschritt (Installation/Performance). Aktuellen Katalog und Portfolio geprüft; eigenständiges Kapitel zu Körperdarstellungen/Selbstbild fehlte.
- kunst_4_koerper_selbstbild für 8. Schulstufe vor Portfolio ergänzt: drei Abschnitte, drei Lernziele, Zusammenfassung, zwei konkrete Vorwissenskapitel, sechs Fragen mit sämtlichen individuellen Rückmeldungen und drei Werkstattzuordnungen.
- Zwei eigene schematische SVG-Figuren mit gleichen Grundmaßen und verschiedenen Armstellungen als Vergleichsgrundlage. Aufgaben trennen sichtbare Haltung von behaupteten Eigenschaften; Ausschnitt-/Proportionsvarianten auf Papier, symbolisches Selbst- oder vollständig erfundenes Rollenbild mit zwei Varianten und Überarbeitung. Keine Körpernorm, Persönlichkeitsdiagnose oder private Offenlegung verlangt.
- Kunstintegration bestanden: nun acht Kapitel, 44 Fragen, 24 Zuordnungen, alle Antwortvarianten des neuen Kapitels, zugängliche Figurenbeschreibung und Position vor Portfolio. Lernbereich-Flow und Kapitelnavigation einschließlich Vorwissensreihenfolge ebenfalls bestanden; diff --check sauber.
- Neue Fassung bisher Deutsch. Keine visuelle Browserprüfung/Veröffentlichung; umfassende Lehrplanabnahme und Gesamtziel bleiben offen.

### Kunst: vollständiger Anwendungsbereich-Abgleich statt pauschaler Abdeckung
- Vorheriger Zielturn war Fortschritt (Körper-/Selbstbildkapitel). Alle vier Klassen des gespeicherten RIS-Kunstlehrplans erneut gelesen; neuer Direktabruf HTTP 503, aktuelle Geltung deshalb in diesem Durchlauf nicht neu bestätigt.
- docs/KUNST_LEHRPLANABGLEICH.md ordnet alle 24 Anwendungsbereiche den tatsächlichen Kapiteln zu und benennt fehlende Teile. Spätere Klassen gelten nicht als Ersatz für frühere. Neue Aufgaben zu Papierumnutzung/Installation decken die Gebäudenumgestaltung ausdrücklich nicht ab; generische Figuren ersetzen keine historischen/kulturellen Körperbilder.
- Konkrete nächste Arbeit abgeleitet: Wiener Gebäudefall, Grundlagen in Klassen 1/2, historische/kulturelle Vergleichspaare. Historische Wiener Gasometer-Pressequelle live gelesen und mit Geltungs-/Aussagegrenzen als Vorrecherche dokumentiert.
- Gesamte Funktionstestsammlung: 106/106 bestanden, Bericht ../functional-test-report.json. Dies bestätigt die jeweiligen Funktionen, nicht Lehrplanvollständigkeit oder visuelle Abnahme. Keine Veröffentlichung; Gesamtziel bleibt offen.

### Neues Kapitel: Alte Gebäude, neue Nutzung
- Vorheriger Zielturn war Fortschritt (vollständige Kunst-Lückenmatrix und Gesamttests). Matrix und aktuellen Katalog erneut geprüft; Gebäudenumgestaltung tatsächlich noch nicht vorhanden.
- kunst_4_gebaeude_umnutzen für 8. Schulstufe vor Portfolio ergänzt, mit Raum/Design als Vorwissen. Drei Abschnitte, sechs Fragen mit allen Rückmeldungen, drei Werkstattzuordnungen, Lernziele und Zusammenfassung.
- Bereits live gelesene Stadt-Wien-Archivmeldung vom 05.07.2001 dient als ausdrücklich historische Projektquelle zur Gasometer-Umnutzung. Keine heutigen Nutzungs-/Zufriedenheitsbehauptungen, keine Werbesuperlative übernommen. Separater erfundener Werkhallenfall mit fünf Interessen, Zugangs-/Lärmkonflikten und Entwurf zweier Grundrisse plus Außenansicht.
- Matrix auf konkretes neues Angebot aktualisiert, verbleibende bildliche Vergleiche/reale Nutzerperspektiven weiterhin offen. Kunstintegration über neun Kapitel, 50 Fragen und 27 Zuordnungen bestanden; alle Antwortvarianten im neuen Kapitel sowie Quellenlink/Tabattribute und zugängliche Interessentabelle geprüft. Navigation/Vorwissensfolge und Lernbereichsabläufe ebenfalls bestanden.
- Keine visuelle Browserprüfung oder Veröffentlichung. Neue Fassung Deutsch; Gesamtziel offen.

### Klasse 1: eigene Plätze beobachten und verändern
- Vorheriger Zielturn war Fortschritt (Gebäudeumnutzung). Aktuelles Kapitel kunst_1_wahrnehmen und die Lückenmatrix geprüft: individuelle Plätze waren bisher erst als Leseplatzmodell in Klasse 2 vorhanden.
- Neuer eigener Abschnitt meine_plaetze in Klasse 1: Beobachtung aus zwei Richtungen, einfache Platzskizze, Trennung persönliches Erleben/überprüfbare Merkmale, zweite Variante und Rückmeldung. Alternativer fiktiver Bank-Tür-Fall ermöglicht Bearbeitung ohne eigenen Ortszugang; unterschiedliche Nutzungsinteressen werden berücksichtigt.
- Zwei Fragen mit individuellen Rückmeldungen ergänzt, Lernziel und Zusammenfassung erweitert, Werkstattalternative/Nummer angepasst. Kapitelrevision 1 und gezielte Abschnittszuordnung geprüft. Kunstintegration mit 52 Fragen und Revisionsprüfung bestanden.
- Matrixzeile entsprechend aktualisiert. Kein Nachweis tatsächlicher praktischer Durchführung, keine Browserprüfung oder Veröffentlichung; Übersetzungen und Gesamtziel offen.

### Klasse 1: Kunst begegnen – Museum und Ausstellung
- Vorheriger Zielturn war Fortschritt (eigene Plätze). Bestand geprüft: konkrete Museumsquelle wurde bisher erst in Klasse 3 eingesetzt.
- Neues Kapitel kunst_1_museum für 5. Schulstufe nach Bilder wahrnehmen: drei Abschnitte, sechs Fragen mit individuellen Rückmeldungen, drei Zuordnungen, Lernziele/Zusammenfassung. Bereits geprüfter KHM-Datensatz zu Kinderspiele mit vierteiliger Werkkarte und einfacher Detailbeobachtung; keine Museumsabbildung kopiert.
- Vergleich Original/digitale Reproduktion; eigener Abstandsversuch ausdrücklich nicht als digitale Reproduktion ausgegeben. Kleine Ausstellung mit drei eigenen Arbeiten, zwei Anordnungen, Thema, Beschriftung und Überarbeitung. Externe Bildbetrachtung bleibt abhängig von der Museumsabbildung und ist bei Nichterreichbarkeit nachzuholen.
- Kunstintegration bestanden: zehn Kapitel, 58 Fragen, 30 Zuordnungen; Quellenlink/Tabattribute, Werkkarte, Klassenangabe und alle Quizantwortvarianten im neuen Kapitel. Vorwissens-/Kapitelnavigation und Lernbereichsabläufe ebenfalls bestanden; diff --check sauber.
- Matrix aktualisiert. Neue Fassung Deutsch, keine Browserprüfung oder Veröffentlichung; Gesamtziel offen.

### Klasse 2: eine Geschichte in einem Raumbild
- Vorheriger Zielturn war Fortschritt (Museumseinstieg). Raumkapitel geprüft: Raumdarstellung und Leseplatz waren vorhanden, Einbild-Erzählauftrag fehlte.
- Neuer Abschnitt raumbild_erzaehlen: erfundene unterbrochene Tischszene mit zwei begründbaren Lesarten, eigene Auswahl erzählender Gegenstände/Spuren, zwei Entwurfsskizzen und ein Endbild. Raumhinweise werden für die Erzählung genutzt; Abgrenzung zur Bildfolge ausdrücklich erklärt.
- Zwei Fragen mit individuellen Rückmeldungen, Lernziel/Zusammenfassung/Werkstattalternative ergänzt. Kapitelrevision 1. Kunstintegration nun mit 60 Fragen bestanden, einschließlich beider falschen Antwortvarianten und Zuordnung der neuen Fragen zu Abschnitt 4; Revisionsprüfung bestanden.
- Matrix aktualisiert. Praktische Arbeit nicht durch automatisierte Tests nachgewiesen; keine Browserprüfung oder Veröffentlichung. Gesamtziel offen.

### Einbild-Erzählung mit sichtbarer Vorlage
- Vorheriger Zielturn war Fortschritt (Einbild-Erzählauftrag). Aktuellen Abschnitt geprüft: die Ausgangsszene war bislang ausschließlich beschrieben.
- Eigene SVG-Draufsicht des Arbeitsplatzes ergänzt: Tisch, Blatt mit kurzer Linie, Stift, schräg abgerückter Stuhl und geöffnete Tür. Keine Person oder Ursache hineinerzählt. Skalierbare Darstellung mit Titel/Beschreibung und zusätzlicher lesbarer Textalternative; als schematisch und nicht maßstäblich gekennzeichnet.
- Arbeitsauftrag spricht nun von unmittelbar sichtbaren Merkmalen. Kunstintegration bestanden, einschließlich auflösbarer Beschreibungsreferenzen und aller vorhandenen Fragen. Keine neue Inhaltsrevision, da Fragen und bewertete Konzepte unverändert.
- Dies ist keine visuelle Browserabnahme. Keine Veröffentlichung; Gesamtziel offen.

### Klasse 2: Bewahren und kulturelles Gedächtnis
- Vorheriger Zielturn war Fortschritt (sichtbare Erzählvorlage). Arbeitsstand erneut geprüft; kulturelles Gedächtnis war im Klassenabgleich weiterhin ohne ausgearbeiteten Fall.
- Neuer Abschnitt bewahren in kunst_2_design: fiktives beschädigtes Schulwandbild, alte Beschriftung, Erinnerung einer ehemaligen Schülerin und heutiger Flächenwunsch. Zustand, persönliche Bedeutung, Nutzung und Wissenslücken werden getrennt.
- Zwei Präsentationsentwürfe und eigene Erinnerungskarte mit erhaltenem Ausgangsblatt; Erhalt, Dokumentation, Ergänzung und unbekannter Originalzustand ausdrücklich unterschieden. Keine restauratorischen Eingriffe am realen Werk angeleitet.
- Zwei Fragen mit individuellen Rückmeldungen, Lernziel/Zusammenfassung/Werkstattalternative ergänzt. Kapitelrevision 1. Kunstintegration mit 62 Fragen bestanden, einschließlich neuer Abschnittszuordnung, Interessentabelle und allen Antwortvarianten. Revisionsprüfung bestanden; diff --check sauber.
- Matrix nennt reales Werkbeispiel/Erhaltungspraxis weiterhin als Vertiefungslücke. Neue Fassung Deutsch; keine Browserprüfung oder Veröffentlichung, Gesamtziel offen.

### Bewahren: reales Wiener Werkbeispiel
- Vorheriger Zielturn war Fortschritt (kulturelles Gedächtnis). Aktuellen Abschnitt gelesen und fehlendes reales Beispiel ergänzt.
- Wien-Museum-Objektdatensatz zum Prater-Walfisch und Museumsbeitrag vom 16.12.2019 live gelesen. Entwurf Maria Benke, Datierung 1951, Materialien Kupferblech/Holz aus Datensatz; Restaurierungsabsicht Erhaltung der Patina/sichere Präsentation aus historischem Bericht. Kein damaliger Depotstand als heutige Besuchsinformation übernommen.
- Beobachtungs-/Quellenauftrag trennt Foto-Beobachtung, Materialangabe und Restaurierungsbericht; Vergleich mit dem erfundenen Schulwandbild. Museumsfotos nur verlinkt (Objektseite weist Nutzung auf Anfrage aus), nicht kopiert/eingebettet. Keine konkrete Restaurierungsmethode als Schülerexperiment übertragen.
- Kunstintegration einschließlich beider Quellenlinks, Tabattribute und vorhandener Fragen bestanden; diff --check sauber. Quizinhalt unverändert, daher keine neue Revision. Matrix aktualisiert; keine Browserabnahme/Veröffentlichung, Gesamtziel offen.

### Kunst-Arbeitsblätter: Material und Gestaltungsauftrag
- Vorheriger Zielturn war Fortschritt (reales Erhaltungsbeispiel). worksheet.js und bestehende Tests geprüft: generische Arbeitsblätter enthielten bislang nur Quizfragen und verwiesen für sämtliche Materialien ins Lernkapitel.
- Für Kunst optionale, standardmäßig sichtbare Materialbeilage ergänzt: Abschnittstexte, eigene statische SVG-Vorlagen, Werkstattauftrag/Kriterien und Quellen mit ausgeschriebenen URLs. Vergleichshilfen in details, interaktive Formulare/Statusmeldungen und eingebettete Medien werden aus der Beilage entfernt. Kein Werkstatt-Mustertext oder lokale Entwürfe übernommen.
- Eigener Materialschalter unabhängig vom Lösungsschalter; Fachname Kunst und Gestaltung ergänzt. Hinweis benennt Ausgangszustände und externe Museumsabbildungen. Druck-CSS unterstützt breite Tabellen, SVG-Skalierung und umbrechende Quellenadressen.
- Erweiterter Arbeitsblatttest für alle zehn Kunstkapitel bestanden: Abschnittszahl, Werkstatttexte, Quellen, statische Figuren samt zugänglichen Referenzen, keine Quiz-Platzhalter/Controls/Vergleichslösungen, unabhängige Umschalter. Bestehende Physik-/Mathe-/Fehlerzustände weiterhin bestanden; diff --check sauber.
- Keine visuelle Browser-/PDF-Druckabnahme oder Veröffentlichung. Externe Museumsbilder bleiben externe Quellen; Gesamtziel offen.

### Papierfassungen der Kunst-Bildlabore
- Vorheriger Zielturn war Fortschritt (Materialbeilage). Aktuellen Renderer geprüft: nach Entfernen der Steuerungen blieben Laboraufträge übrig, deren Wechsel auf Papier nicht unmittelbar ausführbar war.
- Geometrische Studien erhalten nun einen eigenen Papiervergleich: zwei Skizzen mit einer Änderung sowie abgedeckter Ausschnitt. Im Medienkapitel werden alle drei Bildunterschriften als Vergleichsliste mitgedruckt.
- Werbelabor wird zu zwei statischen Plakatvarianten mit identischem Wortlaut und unterschiedlicher Schriftgewichtung; A/B klar beschriftet. Online-Steuerelemente nicht erforderlich, Schüleraufträge bleiben bestehen.
- Erweiterter Arbeitsblatttest bestanden: beide Plakatfassungen mit gleichem Text und richtigen Hervorhebungen, vollständige Captionliste und Papierauftrag, alle bisherigen Material-/Lösungsschalter. Keine visuelle Druckabnahme, keine Veröffentlichung; Gesamtziel offen.

### Klasse 3: Zeichen und Markenformen
- Vorheriger Zielturn war Fortschritt (Papieralternativen der Bildlabore). Katalog geprüft: eigenständige Einheit zu drei grafischen Markenformen fehlte.
- kunst_3_zeichen_marken vor dem Medienkapitel für 7. Schulstufe ergänzt. Drei Abschnitte, sechs Fragen mit Rückmeldungen, drei Zuordnungen, Lernziele/Zusammenfassung/Vorwissen. Eigenes fiktives SPUR-Projekt mit Bildzeichen, Schriftzug und Kombination; grafische Einteilung ausdrücklich keine Aussage zum rechtlichen Schutz.
- Handbreite/daumenbreite Entwürfe, Vereinfachung, Abstandsvergleich und tatsächliche Rückmeldung versus eigene Vermutung. Eigene SVG-/Textbeispiele auch in der Materialbeilage vorhanden.
- Kunstintegration nun elf Kapitel, 68 Fragen und 33 Zuordnungen bestanden; alle Antwortvarianten und drei Darstellungsformen geprüft. Arbeitsblattprüfung für sämtliche Kunstkapitel und Vorwissensnavigation ebenfalls bestanden; diff --check sauber. Matrix aktualisiert.
- Neue Fassung Deutsch, keine visuelle Browserprüfung/Veröffentlichung; Gesamtziel offen.

### Markenformen: interaktiver Abstandsvergleich
- Vorheriger Zielturn war Fortschritt (Zeichenkapitel). Aktuelle Vorlage und Bildlaborinitialisierung geprüft: Wort-Bild-Kombination war bislang nur statisch.
- Nativer Abstandregler 0–64 Pixel in Acht-Pixel-Schritten mit zugänglichem Wert, A merken/vergleichen und Reset. Wort/Symbol/Größe/Farbe bleiben unverändert; bei knapper Breite wird die Kombination nicht in eine neue Anordnung umgebrochen. Gemerkter Abstand gilt nur für den Besuch.
- Papiervergleich als eigener Arbeitsauftrag in der Materialbeilage ergänzt. Keine neue Quizrevision, weil Fragen und bewertete Konzepte unverändert.
- Kunstintegration prüft alle neun Reglerwerte, unveränderte Wort-/Bildinhalte, zugängliche Werte, Vergleich ohne/mit Merkwert, Reinitialisierung und Reset/Fokus. Arbeitsblattprüfung mit Papieralternative ebenfalls bestanden; diff --check sauber.
- Keine visuelle Browserprüfung oder Veröffentlichung; Gesamtziel offen.

### Sichtbare gemerkte Wort-Bild-Variante
- Vorheriger Zielturn war Fortschritt (Abstandsregler). Aktuellen Vergleichscode geprüft: gemerkt wurde bisher nur ein Zahlenwert.
- Beim Merken bleibt jetzt eine eigenständige sichtbare Kopie der Kombination mit ihrem Abstand stehen. Nachfolgende Regleränderungen betreffen ausschließlich die aktuelle Kombination; erneutes Merken ersetzt die Kopie, Reset entfernt sie. Beide schmalen Ansichten sind als beschriftete, fokussierbare Bereiche zugänglich.
- Tests prüfen unveränderte Kopie über alle neun Reglerstellungen, Überschreiben ohne Duplikate, gültigen Merkwert 0, Reset und Fokus. Kunst- und Arbeitsblatttest bestanden; keine neue Kapitelrevision, keine Browserabnahme/Veröffentlichung. Gesamtziel offen.

### Sichtbare Vergleichsvorlagen in geometrischen Kunstlaboren
- Die drei geometrischen Bildlabore zeigen beim Merken eine feste SVG-Kopie der Variante A samt Beschreibung und gegebenenfalls Bildunterschrift. Änderungen am aktuellen Bild lassen diese Vorlage unverändert.
- Erneutes Merken ersetzt die Vorlage; Zurücksetzen entfernt sie. Wiederholte Initialisierung erzeugt keine zusätzlichen Vorschauen.
- Geprüft mit `node scripts/test_art_chapters.js` und `node scripts/test_worksheets.js`: alle bestanden, einschließlich Bildzustand, Ausschnitt, unabhängiger Bildunterschrift, Überschreiben und Zurücksetzen. `git diff --check` ohne Fehler. Keine visuelle Browserprüfung und keine Veröffentlichung.
- Anschließender vollständiger Funktionslauf: 106/106 Testsuiten bestanden. Dies belegt keine vollständige Lehrplanabdeckung, fachliche Gesamtprüfung oder visuelle Qualität.

### Kunst Klasse 3: Material und zeitliche Veränderung
- `kunst_3_foto_medien` enthält einen fünften Abschnitt: eigenes Zeichen in Bleistift und Wasser, Beobachtungsprotokoll zu drei tatsächlichen Zeitpunkten, Trennung von Beobachtung/Deutung, begründete Materialwahl und zweite Gestaltung. Ohne Unterlage bleibt eine ausdrücklich gekennzeichnete Planung möglich.
- Zwei Fragen mit jeweils konkreter Rückmeldung prüfen die Grenzen einer Einzelbeobachtung und einer fotografischen Dokumentation. Lernziele, Zusammenfassung, Werkstatt und Lehrplanmatrix angepasst. Kapitelrevision 2 verhindert, dass ein früheres Quizresultat die zusätzlichen Inhalte als gelernt ausweist.
- Kunstintegration (11 Kapitel, 70 Fragen), Arbeitsblätter und Kapitelrevisionen erfolgreich geprüft; diff --check ohne Fehler. Keine praktische oder visuelle Abnahme, keine Veröffentlichung. Die historischen Werkbeispiele und weitere Lehrplanlücken bleiben offen.

### Kunst Klasse 1: Eigene Bildvorlagen umarbeiten
- `kunst_1_wahrnehmen` ergänzt den Abschnitt bild_umbauen: eigene SVG-Beispiele Blatt/Fisch/Boot mit gleicher Grundform, Vergleich übernommener/geänderter Merkmale, zwei eigene Varianten und begründete Überarbeitung nach Rückmeldung. Einzelarbeit hat eine explizite Alternative zum Partnerfeedback.
- Zwei neue Fragen enthalten unterscheidbare Fehlvorstellungen und konkrete Rückmeldungen. Lernziele, Zusammenfassung, Werkstatt und Lehrplanmatrix angepasst; Kapitelrevision 2. Kunst umfasst jetzt 72 Fragen in elf Kapiteln.
- Kunst-, Arbeitsblatt- und Revisionsprüfungen bestanden; diff --check ohne Fehler. SVG-Struktur und gleiche Grundformen funktional geprüft, keine visuelle oder praktische Abnahme. Weiterhin lokal und unveröffentlicht.

### Kunst: Aussagekräftigere falsche Antwortmöglichkeiten
- Elf Fragen in Bilder wahrnehmen, Museum und Portfolio überarbeitet. 22 falsche Antwortmöglichkeiten greifen nun konkrete Verwechslungen auf: Titel/Beleg, Wertung/Bildhinweis, Mehrheitslesart/Eindeutigkeit, Standort/Absicht, Erklärung/unabhängige Rückmeldung, Bildauflösung/Vergrößerung, Originalbetrachtung/gesicherte Datierung und kontrollierter Variantenvergleich.
- Jede geänderte Antwort enthält passendes erklärendes Feedback. Kapitelrevisionen: kunst_1_wahrnehmen 3, kunst_1_museum 1, kunst_4_portfolio 3. Alte Ergebnisse bleiben archiviert, gelten aber nicht als Nachweis für die überarbeiteten Fragen.
- Kunstintegration prüft alle drei Antwortpositionen dieser Kapitel samt Feedback; Arbeitsblätter und Revisionslogik bestehen ebenfalls. Ein beim Bearbeiten des Testskripts entstandener doppelter Dateianhang wurde entfernt; der erneute Kunstlauf besteht. Keine visuelle Abnahme oder Veröffentlichung; weitere schwache Antwortmöglichkeiten bleiben zu prüfen.

### Direkte Wiederholung des Kapitelquiz ohne Neuladen
- Ergebnisaktionen führen jetzt direkt zurück zum Lerninhalt oder starten einen frischen Versuch. Wiederholung steht auch nach bestandenem Check bereit. Kein Seitenreload: bestehende Werkstattentwürfe und interaktive Zustände bleiben im Dokument.
- restartChapterQuiz mischt Antwortpositionen neu, behält die ursprünglichen Antwortwerte für die Auswertung bei, leert Auswahl/Rückmeldung/Fehlermarkierung und aktiviert die Abgabe. Der Fokus geht auf die Quizüberschrift; der ursprüngliche Öffner bleibt für die Rückkehr erhalten. Ein Neustart allein verbucht keinen Versuch.
- Neuer Test test_quiz_retry.js prüft erfolglosen Versuch, Neustart, neue Reihenfolge, stabile Zuordnung, Entwurfserhalt, unvollständige Abgabe, erfolgreichen zweiten Versuch und Fokusrückkehr. Zusätzlich Quizfokus, Speicherfehler, vollständiger Fragenpool, fünfsprachige Quiztexte und Lernabläufe bestanden. Keine Browserabnahme oder Veröffentlichung.

### Kapitelstatus und Wiederholungsbedarf ohne Neuladen aktualisieren
- Nach erfolgreichem Speichern eines Quizversuchs aktualisiert der Renderer die bestehende Statusanzeige und meldet das neue Ergebnis an die Lernnavigation. Bestehende Elemente und der Quizöffner bleiben erhalten.
- Die Liste „Beim letzten Versuch noch unsicher“ wird mit den zuletzt gespeicherten Frage-IDs neu aufgebaut. Nach einem vollständig richtigen Versuch verschwinden die alten Wiederholungshinweise unmittelbar. Bei Speicherfehlern wird kein neuer gespeicherter Status behauptet.
- Der integrierte Wiederholungstest prüft jetzt zwei sichtbare Wiederholungshinweise nach dem ersten Versuch, deren Entfernung nach 100 Prozent und den sofort aktualisierten Bestwert. Tests für gezielte Wiederholung, fünfsprachige Navigation, Quizwiederholung, Speicherfehler und Quizsprache bestanden; diff --check sauber. Keine Browserabnahme oder Veröffentlichung.

### Kunst Klasse 2: Raumtypen mit Wiener Beispielen
- Raumkapitel ergänzt: Innen/Außen, Zugänglichkeit/Eigentum und sakral/profan werden unterschieden. Hauptbücherei (Stadt-Wien-Archivmeldung 06.05.2023) und Stephansdom (veröffentlichte Hausordnung, Beschluss 20.09.2017) geben konkrete, live gelesene Primärquellen. Keine historischen Termine als aktuelle Bedingungen, keine fremden Fotos übernommen.
- Vergleichstabelle, Innen-/Außenskizzen, erfundener privater Raum und zwei Übergangsvarianten verbinden Wahrnehmen und Gestalten. Zwei neue Fragen mit konkreter Rückmeldung; Lernziele, Zusammenfassung, Quellen, Werkstatt und Lehrplanmatrix aktualisiert. Kapitelrevision 2.
- Kunstintegration (74 Fragen), Arbeitsblatt- und Revisionsprüfungen bestanden; diff --check sauber. Visuelle und praktische Abnahme offen, lokal/unveröffentlicht.

### Vorwissen in individuellen Stofflisten sichtbar machen
- Physik-Katalog und tatsächliche Voraussetzungen geprüft: verlinkte Voraussetzungen stehen in der vorhandenen Katalogreihenfolge vor den darauf aufbauenden Kapiteln. Keine unbegründete Umordnung vorgenommen.
- Stofflisten zeigen nun pro Kapitel das hilfreiche Vorwissen. Verlinkte Kapitel werden als davor, erst später oder nicht eingeplant bezeichnet und lassen sich mit eindeutig beschriftetem Button öffnen. Freie Vorwissensbeschreibungen bleiben lesbar. Die Liste wird nicht automatisch erweitert oder umsortiert; bekanntes Vorwissen muss nicht erneut belegt werden.
- Tests prüfen Hinweise bei verkehrter Reihenfolge und nach Umordnen, unveränderte Auswahl, Lehr-/Wiederholungsmodus sowie weiterhin bestehende Lade-, Such- und Teilfunktionen. Eine zuerst falsche Titelerwartung im Test wurde an den tatsächlich angezeigten Inhaltstitel angepasst; alle gezielten Tests bestehen. Lokal, keine Browserprüfung oder Veröffentlichung.

### Fachübergreifende Strukturprüfung des Vorwissens
- Alle 197 Katalogkapitel in elf Fächern anhand der deutschen Inhalte geprüft: 193 Kapitelverweise und 38 frei beschriebene Voraussetzungen. Keine nicht auflösbaren kennungsartigen Einträge, keine Abhängigkeitszyklen und keine fachinternen Voraussetzungen, die im Katalog erst nach dem jeweiligen Kapitel stehen.
- Diese Prüfung bestätigt nur die Konsistenz der vorhandenen Verweise. Sie beweist weder fachlich vollständiges Vorwissen noch vollständige österreichische Lehrplanabdeckung; hierfür sind weiterhin inhaltliche Abgleiche erforderlich.
- Vollständiger Funktionstest nach den Änderungen an Quizwiederholung, unmittelbarer Ergebnisanzeige, Kunstkapiteln und Vorwissenshinweisen: 107/107 Testsuiten bestanden. Bericht in ../functional-test-report.json aktualisiert.
- Übersetzungsaudit erneut ausgeführt: en 45 ausgewählte Übersetzungen / 152 deutsche Rückfälle; ar/sr/tr/uk jeweils 44 / 153. Je Sprache 54 Versionsabweichungen und eine inkompatible Struktur; fehlende Übersetzungen en 97, übrige 98. Diese Zählung prüft die tatsächliche Auswahl, nicht die sprachliche oder fachliche Qualität. Mehrsprachige Vollständigkeit bleibt ausdrücklich offen.

### Klimawandel: fachliche Bereinigung vor Übersetzungsabgleich
- Die eine strukturell inkompatible Übersetzung betrifft in allen fünf Sprachen klimawandel. Beim Quellvergleich unbelegte Rechenanzeigen im deutschen Treibhausmodell gefunden: ppm = 280 + 2*Regler, Prozent-Rückhalt = 35 + 0,6*Regler und Erwärmung = 1,7*Regler/100. Diese Formeln sind keine hinterlegte Klimaberechnung.
- Durch qualitativen Drei-Stufen-Vergleich ersetzt. Keine Konzentrations-, Prozent- oder Temperaturanzeigen; Thermometer und Rückhaltebalken entfernt. Erklärung nennt Absorption/Emission, verteilte Gase statt fester Schicht, zunächst gleiche Temperatur/sonstige Bedingungen, fortgesetzte Abstrahlung und späteres Strahlungsgleichgewicht. NASA Causes-Seite live gelesen und als Quelle ergänzt.
- Kapitelrevision 1 schützt vor veralteten Ergebnissen/Übersetzungen. Neuer Modelltest plus Physikgrundlagen-, Übersetzungsrevisions- und Kapitelrevisionstests bestanden; diff --check sauber. Noch keine neue Übersetzung erstellt: Die interpolierte Klimazeitleiste und übrige Inhalte benötigen zuerst Quellen-/Modellprüfung. Keine visuelle Abnahme oder Veröffentlichung.

### Klimazeitleiste: veröffentlichte Jahresdaten statt Stützpunktinterpolation
- NASA GISTEMP v4 und GeoSphere SOCRATES-Datensätze live recherchiert und Original-CSV-Dateien lokal archiviert. NASA-Datei war über Node/PowerShell nicht erreichbar, über Python urllib erfolgreich bezogen. GeoSphere-Datensatz ist CC BY 4.0; Quellen, Lizenz und Bearbeitung im Daten-README und Kapitel dokumentiert.
- 146 Jahrespaare 1880–2025, gemeinsamer Bezugszeitraum 1951–1980. Global: J-D aus NASA. Österreich: ausdrücklich eigene gleichgewichtete Monatsaggregation und Abzug des Basismittels. Keine interpolierten Jahreswerte, keine Gleichsetzung mit LOESS-Trend. Der bisherige Österreich-Wert +3,1 bis 2024 wird als Trend mit anderem Bezugszeitraum kenntlich gemacht.
- Datenkonstante reproduzierbar über scripts/build_climate_series.js; Download-JSON und Originale lokal. Ein Streifen je Jahr, nur gewähltes Jahr hervorgehoben, globale Thermometerskala −1 bis +2 °C erläutert. Keine Genauigkeitsgarantie aus Nachkommastellen.
- Alle 146 Anzeigen, NASA-Jahreswerte gegen Rohdatei, fehlende/fractionale Jahre, Schwankungen und erneute Initialisierung geprüft; Treibhausmodell und Physikgrundlagen ebenfalls bestanden. Kapitelrevision bleibt 1 im laufenden fachlichen Umbau. Weitere Quiz-/Kipppunktprüfung und Übersetzungen offen. Keine visuelle Abnahme oder Veröffentlichung.

### Klimakipppunkte: unbelegte Einzelschwellen entfernt
- Die vorherige Darstellung schaltete Korallen/Alpengletscher/Permafrost/Eisschilde bei frei hinterlegten 1,5/1,8/2,0/2,4 °C farblich um. Diese nicht belegten Systemschwellen entfernt. IPCC AR6 Synthesebericht B.3.2/B.7 zur Risikozunahme und Überschreitung von Erwärmungsniveaus recherchiert und verlinkt.
- Regler bezeichnet langfristige globale Erwärmung gegenüber 1850–1900. Balken ausdrücklich nur Einstellposition, keine Wahrscheinlichkeit oder Schadensbilanz. Keine feste Ereigniszeit aus der Anzeige; Verlauf/Dauer und schwer umkehrbare Folgen erklärt. Vergleichsauftrag 1,5/2,5 °C sowie Rückstellen ohne behauptete reale Umkehr.
- Bestehende falsche Antworten greifen nun genaue Kipppunktdatierung und sofortige Umkehr als Fehlvorstellungen auf. Zweite Frage prüft die Interpretation des Balkens. Ungültigen aria-describedby-Verweis auf die zuvor entfernte Wärmerückhaltanzeige korrigiert.
- 31 Reglerstellungen und vollständige Initialisierung mit gültigen Beschreibungszielen getestet; Jahresdaten-, Treibhaus- und vollständiger Quizpool-Test ebenfalls bestanden. Weitere Kapiteltexte und Abschlussfragen vor Übersetzung offen. Keine visuelle Abnahme oder Veröffentlichung.

### Klimawandel: Verständnischeck an korrigierte Modelle und Daten angepasst
- Drei zusätzliche Fragen prüfen qualitative Modellgrenzen, Temperaturabweichung gegenüber Referenzmittel und den Unterschied zwischen Jahreswert/Trend samt Bezugszeitraum. Kapitelcheck jetzt 13 Fragen, neun Übungen im Text.
- Sechs falsche Antworten in Grundlagen-/Daten-/Trockenstressfragen sowie acht falsche Antworten im Abschlussblock greifen konkrete Fehlvorstellungen auf. Alle Rückmeldungen erklären den jeweiligen Fehler. Trockenstress unterscheidet möglichen Verdunstungsbedarf von tatsächlicher, durch Wasserverfügbarkeit begrenzter Verdunstung; auch Labortext angepasst.
- Neuer Integrationstest lädt die tatsächliche Kapitelvorlage, prüft 13 Fragen, neun Übungsblöcke, Abschnittszuordnung und alle 39 Antwort-/Feedbackpfade über neue Versuche. Zusätzlich Kipppunkt- und Treibhausmodelltests bestanden; diff --check sauber. Weitere restliche Text-/Interaktionsprüfung und Übersetzungen offen; lokal/unveröffentlicht.

### Klimaschutz/Anpassung: korrigierbare Zuordnung mit Wirkungsbegründung
- Falsche Zuordnungen sperren eine Karte nicht mehr. Richtige Zuordnungen werden einmal gezählt; Zwischenstand beschreibt gelöste Karten statt eine nachträglich missverständliche Erfolgsquote.
- Vier Karten beschreiben ausdrücklich die jeweils zuzuordnende Wirkung. Individuelle Rückmeldung bleibt an jeder Karte sichtbar und wird zusätzlich als Status ausgegeben. Bäume: Schattenwirkung als Anpassung, mögliche Kohlenstoffspeicherung als zusätzliche Klimaschutzwirkung erklärt. Bahn-/Solarbeispiele enthalten keine unbelegte quantitative Einsparung.
- Richtige Karten erhalten aria-disabled-Semantik ohne Fokusverlust; doppelte Wertung verhindert. Zurücksetzen leert alle Zustände und Rückmeldungen. Neuer Test prüft alle vier falschen/anschließend richtigen Antworten, Zählung, Fokus, Erklärung und Wiederbeginn. Kapitelassessment und Kipppunktinitialisierung ebenfalls erfolgreich; diff --check sauber. Lokal/unveröffentlicht.

### Klima-Folgenexplorer: mitwachsender Erklärungstext und Auswahlzustand
- Festes SVG-foreignObject (480×58) durch normale HTML-Überschrift und Absatz ersetzt. Die langen Erklärungen können jetzt im Dokumentfluss wachsen; die generische Stadtgrafik ist als Dekoration ausgezeichnet und behauptet nicht, jede gewählte Folge abzubilden.
- Vier native Schaltflächen verweisen auf die Erklärung und zeigen ihren Auswahlzustand mit aria-pressed. Unbekannte Werte fallen konsistent auf Hitze zurück; Fokus bleibt beim bedienten Element. Alle vier Inhalte sowie Rückkehr und ungültige Auswahl getestet.
- Lernziele/Zusammenfassung greifen Bezugszeiträume und Modellgrenzen auf. Anpassung als Verringerung von Belastungen durch eingetretene/erwartete Folgen formuliert; Gerechtigkeitsabschnitt fragt konkret nach Kosten, Zugang und Bedürfnissen.
- Folgenexplorer-, Kapitelassessment- und vollständiger Kipppunktinitialisierungstest bestehen, diff --check sauber. Die Anpassung entfernt eine feste Höhenbegrenzung; tatsächliche visuelle Abnahme steht weiterhin aus. Englischübersetzung noch nicht erstellt, lokale Fassung unveröffentlicht.

### Vorbereitung der englischen Klimafassung: dynamische Texte
- Dynamische Treibhaus-/Kipppunkterklärungen, Folgenexplorer, Länderbeschriftung und Zuordnungsfeedback unterstützen Englisch. Sprache richtet sich nach data-climate-language der tatsächlich geladenen Kapitelvorlage, nicht bloß nach der gewählten Oberflächensprache.
- Deutsche Quellfassung explizit markiert. Englische Kapiteltexte und Kartenbegründungen werden im nächsten Übersetzungsschritt ergänzt; die alte englische Kapitelversion bleibt bis dahin weiterhin als veraltet ausgeschlossen. Kein Anspruch auf bereits vollständige Kapitelübersetzung.
- Runtime-Test verwendet ausdrücklich eine Sprachfixture: drei Treibhausstufen, vier Folgen, vier Jahre, vier Erwärmungsstufen, Fehlversuch/Korrektur/Reset sowie deutsche Ersatzfassung bei englischer Oberfläche. Deutsche Modell-/Jahres-/Zuordnungs-/Kipppunkttests bestehen weiterhin; diff --check sauber. Lokal/unveröffentlicht.

### Klimawandel: aktuelle englische Kapitelübersetzung
- Die überholte englische Fassung durch die aktuelle deutsche Struktur in vollständiger Übersetzung ersetzt: sechs Abschnitte, 133 Text-/Attributbausteine, 13 Fragen mit 39 Antworten/Rückmeldungen, Lernziele, Zusammenfassung und Quellenbeschriftungen. IDs, Zahlen, Datenquellen, Berechnungshinweise, Interaktionen und Antwortzuordnung bleiben entsprechend der deutschen Quelle erhalten. sourceRevision 1 und contentLanguage en.
- Enthält qualitative Treibhauserklärung, 146-Jahres-Datensatz mit Referenz-/Methodenhinweisen, Unsicherheiten, Folgenexplorer, korrigierbare Maßnahmenzuordnung, Kipppunktgrenzen und Wiener Rechercheauftrag. Daten-Downloads und Primärquellen bleiben verlinkt; englische Beschriftungen bedeuten nicht, dass externe deutschsprachige Quellen übersetzt wurden.
- Neuer Integrationstest test_climate_english.js lädt tatsächliche Vorlage und Sprachdateien: keine Ersatzfassung, alle 39 Feedbackpfade, 146 Jahre, 31 Erwärmungsstufen, drei Treibhausstufen und vier Karten mit Wiederholung. Deutschassessment besteht weiterhin. Audit jetzt en 46/197 ausgewählte Übersetzungen, 151 deutsche Rückfälle; andere Sprachen 44/197 mit 153 Rückfällen. Keine visuelle Abnahme oder Veröffentlichung.

### Klimazeitleiste: zwei Jahreswerte direkt vergleichen
- Deutsche und englische Fassung bieten „Jahr A merken“ und „Vergleich löschen“. Nach Wahl von B zeigt eine Tabelle die beiden Abweichungen und B − A für Global/Österreich. Datenbasis und Bezugszeitraum bleiben unverändert.
- Positives/negatives Vorzeichen erklärt; ein Zwei-Jahres-Vergleich wird ausdrücklich vom langfristigen Klimatrend unterschieden. A bleibt nur während des Seitenbesuchs erhalten. Überschreiben ersetzt die Vergleichstabelle; Löschen verändert den Jahresregler nicht.
- Tests prüfen je Sprache 146 Vergleichsjahre einschließlich negativer, positiver und Null-Differenz, beider Reihen, Überschreiben und Löschen/Fokus. Englischintegration und Jahresdatenprüfung bestehen weiterhin; diff --check sauber. Keine visuelle Abnahme oder Veröffentlichung.

### Stoffplanung: Vorwissen gezielt einfügen oder verschieben
- Fehlende verlinkte Voraussetzungen lassen sich direkt vor dem abhängigen Kapitel einfügen. Bereits später gewählte Voraussetzungen lassen sich davor verschieben. Bestehende frühere Voraussetzungen erzeugen keine unnötige Aktion; keine doppelten Einträge oder automatische rekursive Ergänzung.
- Übrige Reihenfolge bleibt erhalten, veraltete Teilansicht wird ausgeblendet, Fokus wechselt zur weiterhin vorhandenen Öffnen-Schaltfläche derselben Voraussetzung. Status nennt die neue Position relativ zum Kapitel.
- Neuer Test prüft Verschieben, Einfügen, bewusst offengelassene weitere Voraussetzungen, Löschen, Reihenfolge im Teilen-Link, persönliche Ergebnisfreiheit im Lehrmodus und Verhalten bei Speicherfehler. Lehrplanlisten- und allgemeiner Reihenfolgentest bestehen; diff --check sauber. Lokal, keine Browserabnahme oder Veröffentlichung.

### Stofflisten auf Papier mit Kapiteladressen
- Jedes ausgewählte Kapitel erhält einen direkten Online-Link. Die Druckregel gibt seine vollständige Adresse aus; lokale Vorschauadressen werden nicht fälschlich durch eine behauptete Veröffentlichungsadresse ersetzt. Links enthalten keine persönlichen Ergebnisse und berücksichtigen einen Hosting-Unterpfad.
- Große Listenabstände und Trennlinien auf die obersten Kapiteleinträge begrenzt. Untergeordnete Lernziele und Vorwissenspunkte werden kompakter gesetzt. Bestehende Druckausschlüsse für Bedienelemente und persönliche Ergebnisse bleiben bestehen.
- Lehrmodus-/Druckregeltest prüft Adresse und URL-Ausgabe; Vorwissensaktionstest zusätzlich den Unterpfad nach Umordnen. Reihenfolge-/Vorwissenstests bestehen. Dies ist eine Quell-/Funktionsprüfung der Druckregeln, keine tatsächliche visuelle Druckabnahme. Lokal/unveröffentlicht.

### Gesamtprüfung nach Klima- und Stoffplanerweiterungen
- Vollständiger Funktionslauf abgeschlossen: 117/117 Testsuiten bestanden. Bericht ../functional-test-report.json aktualisiert. Kein Prozess mehr aus diesem Prüflauf offen.
- Reproduktionsprüfung: Neubau aus den archivierten NASA-/GeoSphere-Dateien erzeugt exakt dieselben SHA-256-Inhalte für Klimaskript und jährliche Vergleichs-JSON. Syntaxaudit für 85 Kapitelskripte bestanden.
- Medieninventur erneut durchgeführt: 219 Verweise, davon 173 extern; keine fehlenden lokalen Dateien oder vom Inventurskript gemeldeten Videoeinbindungsprobleme. Das ist keine Erreichbarkeits-, Rechte-, Inhalts- oder visuelle Abnahme externer Medien.
- Gesamtziel weiterhin unvollständig: insbesondere weitere Sprachfassungen, fachliche Lehrplanabgleiche, visuelle/Unterrichtsprüfung und Veröffentlichung offen. Prüfberichte belegen ausschließlich den beschriebenen Umfang.

### Lernbilder bei Ladefehlern (2026-09-06)
- Gemeinsame Fehlerbehandlung vor dem Kapitelrenderer eingebunden: fehlgeschlagene Inhaltsbilder erhalten einen lesbaren Hinweis mit vorhandener Bildbeschreibung in DE/EN/AR/UK/SR/TR. Die Sprache folgt dem Inhaltscontainer, auch bei deutschem Übersetzungsfallback.
- Ereigniserfassung berücksichtigt nachträglich eingefügte Aktivitätsbilder. Wiederholte Fehler erzeugen keine doppelten Hinweise; erfolgreiches Laden entfernt den Hinweis und stellt das Bild wieder her. Beschreibungen werden als Text eingefügt; Bildunterschriften bleiben bestehen. Explizit dekorative Bilder erzeugen keine Meldung.
- Verifiziert: scripts/test_media_fallback.js (sechs Sprachen, dynamische Bilder, Wiederherstellung, Duplikate, Textsicherheit, Kapitelbegrenzung), node --check und git diff --check bestanden. Deutsche Kapitelbilder zusätzlich geprüft: keine fehlenden oder leeren alt-Attribute.
- Keine Aussage zur Erreichbarkeit sämtlicher externer Medien oder zur fachlichen Vollständigkeit ihrer Beschreibungen. Browserdarstellung noch nicht geprüft; Änderungen lokal, nicht veröffentlicht.

### Externe Bildquellen: Erreichbarkeit und Anfragenbegrenzung (2026-09-06)
- Tatsächliche Prüfung der 69 unterschiedlichen externen URLs aus dem Medieninventar abgeschlossen: 33 Antworten mit HTTP 200 und Bild-MIME-Typ, 36 Antworten mit HTTP 429. Kein bestätigtes HTTP 404/410. Die 429-Antworten stammen von Wikimedia; ihre Bilder bleiben unverifiziert und gelten nicht als fehlend. Der Bericht liegt außerhalb des auszuliefernden Projekts in ../external-media-check.json.
- Prüfer anschließend verbessert: URLs je Ursprungsserver sequenziell abarbeiten, nach HTTP 429 weitere URLs dieses Ursprungsservers aussetzen, Retry-After und auslösende URL dokumentieren. Andere Ursprungsserver können weiter geprüft werden. Ausgesetzte URLs zählen nicht als geprüft. Es erfolgt keine automatische Wiederholung einer Anfragenbegrenzung.
- Verifikation ohne weitere Live-Anfragen: scripts/test_external_media_check.js prüft Rate-Limit-Stopp, unabhängige andere Server, URL-Deduplizierung, HEAD→GET-Bestätigung für fehlende Ressourcen sowie die Unterscheidung von Netzwerkfehlern und unerwartetem Inhalt. Test, Syntax und diff --check bestanden.
- Erreichbarkeit allein bestätigt weder die Bildaussage noch Lizenzangaben; diese Prüfung bleibt separat offen.

### Bildfolgen praktisch vergleichen (2026-09-06)
- Kunst 1, Bilder wahrnehmen, Abschnitt 3: interaktives Labor mit drei eigenen geometrischen Zeichnungen ergänzt. Frühere/spätere Position per beschrifteten Schaltflächen; alle sechs Reihenfolgen möglich. Eine gemerkte Folge bleibt als sichtbare Zeichnungsfolge neben der aktuellen Anordnung erhalten und lässt sich ersetzen oder zurücksetzen.
- Aufgaben verbinden sachliche Bildbeschreibung, mehrere mögliche Handlungen, zwei sichtbare Belege und eine eigene Bildgeschichte. Keine einzig richtige Reihenfolge oder automatische Bewertung der Deutung. Die Papieralternative ist im Kapitel und im Arbeitsblatt enthalten. Bestehende Fragen und Lernziele bleiben gültig; deshalb keine Erhöhung der Bewertungsrevision.
- Verifiziert: neuer Test test_art_story.js (alle sechs Permutationen, unveränderte Bildinhalte, unabhängige gemerkte Folge, Randzustände, Fokus, erneutes Initialisieren, Ersetzen und Zurücksetzen); bestehende Kunstintegration für elf Kapitel/74 Fragen sowie Arbeitsblatttests bestanden. Syntax/diff --check bestanden. Keine Browserdarstellung geprüft, weiterhin lokal und unveröffentlicht.

### Werkstätten: belegte Selbsteinschätzung (2026-09-06)
- Zu jedem Prüfkriterium gibt es nun ein beschriftetes Notizfeld für einen konkreten Beleg aus der eigenen Arbeit oder den nächsten Überarbeitungsschritt. Erklärung, Speicherbestätigung und Fehlerhinweis sind in allen sechs unterstützten Inhaltssprachen vorhanden. Es werden keine automatischen Noten oder Spielpunkte vergeben.
- Häkchen und Notizen werden getrennt vom bestehenden Textentwurf lokal gespeichert. Zuordnung über den exakten Kriterientext schützt vor falscher Übernahme bei geänderter Reihenfolge; neue/geänderte Kriterien starten leer. Beschädigte Speicherwerte und verweigerter Zugriff verhindern die Bearbeitung nicht. Pro Notiz maximal 2000 Zeichen.
- Verifiziert: neuer test_workshop_reflection.js (sechs Sprachen, Wiederöffnung, umgeordnete/neue Kriterien, unabhängiger Entwurf, Textsicherheit, beschädigte Daten und verweigerter Speicher). Bestehende Tests test_workshop_languages.js, test_art_chapters.js, test_german_workshops.js und test_english_workshops.js bestanden; Syntax und diff --check ebenfalls. Browserdarstellung noch ungeprüft, Umsetzung lokal/unveröffentlicht.

### Gemeinsame Verifikation nach Werkstatt- und Medienänderungen (2026-09-06)
- Vollständiger Funktionstestlauf abgeschlossen: 121/121 Testsuiten bestanden, Bericht ../functional-test-report.json. Enthalten sind die neuen Tests für Bildfolgen, Bildfehler, externe Medienprüfung und gespeicherte Selbsteinschätzung sowie bisherige Fach-, Lernweg-, Stofflisten-, Quiz-, Speicher- und Arbeitsblattprüfungen.
- Syntaxaudit: 85 Themenskripte ohne Syntaxfehler. Redaktioneller Suchaudit: in allen 197 Kapiteln keine Treffer der ausdrücklich gelisteten generischen Feedbackformulierungen und keine wortgleichen doppelten Prüfungsfragen. Dies ist keine vollständige fachliche Prüfung.
- Übersetzungsstand erneut ermittelt: Englisch 46 aktuelle Übersetzungen/151 deutsche Ersatzfassungen; Arabisch, Serbisch, Türkisch und Ukrainisch jeweils 44/153. Fehlende bzw. veraltete Übersetzungen bleiben ein wesentlicher offener Teil des Gesamtauftrags.
- Lehrplanlücken laut fachlichen Abgleichen, inhaltliche Gesamtprüfung, externe Medien, Browser-/Druckdarstellung und Veröffentlichung bleiben offen. Keine Gesamtfreigabe aus den grünen Funktionstests abgeleitet.

### Kunst 3: Spuren und bewusste Darstellungsweisen (2026-09-06)
- Kapitel kunst_3_foto_medien um Abschnitt 6 spuren_stil ergänzt: zwei eigene SVG-Zeichnungen mit exakt gleichen Geometrien, dünne Konturen gegenüber stärkeren Linien/dunkleren Flächen. Beobachtung, mögliche Ursache und tatsächliches Ereignis werden unterschieden; keine automatische Gefühlswirkung oder historische Stilzuordnung behauptet.
- Praktischer Auftrag: erfundene Spurenszene, zwei Darstellungsweisen bei gleichen Gegenständen/Positionen, alternative Lesart, Rückmeldung beziehungsweise Alleinarbeitsalternative und begründete Überarbeitung. Lernziel, Zusammenfassung und Werkstattauftrag ergänzt.
- Zwei zusätzliche Verständnisfragen mit sechs individuellen Rückmeldungen. Kapitelrevision auf 3 angehoben, damit frühere Checks die ergänzten Anforderungen nicht als bereits geprüft ausweisen.
- Verifiziert: Kunstintegration nun elf Kapitel/76 Fragen, alle drei Antwortpositionen des erweiterten Zehn-Fragen-Checks, identische Geometrie bei veränderten Gestaltungsattributen; Arbeitsblatttests einschließlich beider Bildvorlagen bestanden. Übersetzungsauswahl unverändert (46 EN, je 44 AR/SR/TR/UK); diff --check bestanden. Kein erneuter Gesamttestlauf nötig für diese begrenzte Inhaltsänderung; der vorangegangene Gesamtlauf bezieht sich auf den damaligen Stand. Visuelle Abnahme und Veröffentlichung bleiben offen.

### Kunst 1: Schrift früher und heute (2026-09-06)
- kunst_1_linie_farbe um Abschnitt schrift_zeit ergänzt. Historischer Bezug: Gutenberg-Bibel 1452–1455, gedruckter Text und anschließend beauftragte farbige Ausstattung; Quelle des Gutenberg-Museums live gelesen: https://www.mainz.de/microsite/gutenberg-museum/Forschung_Sammlung_/Gutenberg_Bibeln (Abschnitt Gutenbergs Meisterwerk). Nur knappe paraphrasierte Fakten übernommen, keine externen Bilder kopiert.
- Beobachtungsauftrag zur Museumsabbildung, Vergleich eigener Handschrift/heutiger Druckschrift und zwei eigene Einladungsentwürfe mit gleichem Wortlaut. Lesbarkeit, eigener Gestaltungsspielraum und Rückmeldung werden verbunden. Historische Bildbetrachtung bleibt bei nicht verfügbarer Abbildung ausdrücklich offen. Keine einheitliche Schriftentwicklung oder allgemeine Überlegenheit neuer Schriften behauptet.
- Zwei Fragen/sechs Rückmeldungen ergänzt, Lernziel/Zusammenfassung/Werkstatt aktualisiert und Bewertungsrevision 1 eingeführt.
- Verifiziert: elf Kunstkapitel jetzt 78 Fragen, alle Antwortpositionen des erweiterten Sechs-Fragen-Checks sowie bestehende Arbeitsblattintegration bestanden; diff --check bestanden. Visuelle/unterrichtliche Abnahme und Veröffentlichung bleiben offen.

### Kunst 4: Selbstporträt, Rolle und Publikum (2026-09-06)
- Kapitel kunst_4_koerper_selbstbild um portraet_kontext ergänzt: Albrecht Dürer, Selbstbildnis im Pelzrock (1500, Inv. 537), und Cindy Sherman, Untitled Film Still #21 (1978). Primärquellen live gelesen: https://www.sammlung.pinakothek.de/de/artwork/Qlx2QpQ4Xq und https://www.moma.org/collection/works/56618. Beim Dürer-Nachweis ausdrücklich Originaldatensatz verwendet, nicht zunächst gefundenen Kopien-Datensatz XR4MOBgLQ1.
- Quellenfakten knapp paraphrasiert, Museumsdeutung als solche bezeichnet. Shermans gespielte Rolle nicht als dokumentarischer Beleg ihres Privatlebens bezeichnet; keine Diagnose von Charakter aus Haltung/Kleidung. Keine Bilder übernommen.
- Praktischer Auftrag: dieselbe erfundene Person für private Erinnerung und Projektvorstellung, optionale Bewerbung um eine Projektrolle; keine allgemeine Bewerbungsfoto-Regel, keine echten Fotos oder Personendaten erforderlich. Zwei Entwürfe, Rückmeldung, alternative Lesart und Überarbeitung.
- Zwei neue Fragen mit sechs Rückmeldungen, Lernziel/Zusammenfassung/Werkstatt ergänzt, Kapitelrevision 1. Tests für elf Kunstkapitel/80 Fragen einschließlich aller Antwortpositionen des erweiterten Acht-Fragen-Checks und Arbeitsblattintegration bestanden; diff --check bestanden. Externe Bildbetrachtung/visuelle Abnahme, weitere aktuelle Werkbeispiele und Veröffentlichung bleiben offen.

### Praktische Werkstattaufträge auf Arbeitsblättern (2026-09-06)
- Gemeinsamer Druckbaustein für alle 65 Kapitel mit workshop: vollständiger praktischer Auftrag, gegebenenfalls Hör-/Lesetext mit Hinweis zur abweichenden Alleinarbeit, jedes Prüfkriterium und zwei Schreibzeilen für Beleg beziehungsweise Überarbeitungsschritt. Kunstmaterial nutzt denselben Baustein.
- Praktische Aufgaben werden auch neben dynamisch erzeugten Mathematikübungen angeboten. Im ersten Test entdeckte Auslassung bei math2_7_geometrie behoben: Materialaufbau erfolgt jetzt unabhängig davon, ob ein dynamisches Rechenblatt existiert.
- Material lässt sich unabhängig von vorhandenen Quizlösungen ein-/ausblenden. Persönliche gespeicherte Entwürfe/Selbsteinschätzungen und Werkstatt-Mustertexte werden nicht in das gemeinsame Arbeitsblatt übernommen. Einzelne Reflexionsblöcke sollen beim Druck nicht über Seiten getrennt werden.
- Verifiziert: neuer test_workshop_worksheets.js lädt alle 65 tatsächlichen Kapitel durch das Arbeitsblatt-Template mit echtem Generator, prüft vollständige Aufträge/Kriterien, Schreibraum, Hörtexte, getrennte Druckschalter und fehlende private Daten/Mustertexte. Alle bestanden; bisherige test_worksheets.js, Syntax und diff --check ebenfalls bestanden. Drucklayout noch nicht visuell geprüft; Änderungen weiterhin lokal und unveröffentlicht.

### Kunst 2: Gestaltungsauftrag und unterschiedliche Perspektiven (2026-09-06)
- kunst_2_design um auftrag_perspektiven ergänzt: ausdrücklich erfundener Wettbewerb, verbindliche Plakatangaben gegenüber frei gestaltbaren Merkmalen. Zwei eigene SVG-Skizzen zeigen alternative Gewichtungen dreier Teams; die Skizzen werden nicht als fertige Plakate ausgegeben.
- Praktischer Auftrag mit zwei vollständigen Entwürfen, Perspektiven von Gewinnerteam/anderem Team/unbeteiligtem Publikum, Lesetest beziehungsweise gekennzeichnetem Alleinvergleich und begründeter Überarbeitung. Sichtbare Gewichtung wird nicht mit persönlichem Wert oder objektiver Gerechtigkeit gleichgesetzt.
- Zwei zusätzliche Fragen mit sechs spezifischen Rückmeldungen, Lernziel/Summary/Werkstatt ergänzt, Revision 2. Kunstintegration nun elf Kapitel/82 Fragen, alle Antwortpositionen des Acht-Fragen-Checks und zwei Bildskizzen geprüft; bestehende Arbeitsblatttests und alle 65 Werkstattarbeitsblätter bestanden. Dunkle A-Beschriftung auf goldener Fläche verwendet; keine visuelle Prüfung behauptet.
- Der reale öffentliche Stadtraum bleibt als eigener Ergänzungsbedarf im Lehrplanabgleich bestehen. Änderungen lokal, nicht veröffentlicht.

### Kunst 2: Wiener Mahnmal und Quellenarbeit (2026-09-06)
- Eigener Abschnitt judenplatz ergänzt: Mahnmal von Rachel Whiteread für österreichische jüdische Opfer der Shoah; Formbeobachtung, Hintergrundangaben und offene Frage getrennt. Sachliche Informationskarte mit Skizze, Werkangaben, Quellen und Überarbeitung; kein Besuch erforderlich, keine Opferrollen-Simulation.
- Primärquellen live gelesen: IKG Wien https://www.ikg-wien.at/rabbinat/friedh%C3%B6fe/wien/mahnmal-am-judenplatz (Initiative, Baukörper, Enthüllung 25.10.2000) und Stadt Wien https://presse.wien.gv.at/1996/01/25/holocaust-memorial-projekt-von-rachel-whiteread-wird-verwirklicht (damalige Juryentscheidung, namentlich zugeordnete Perspektiven, angekündigter Termin). Geplanter Termin aus 1996 ausdrücklich vom tatsächlichen Ereignis unterschieden; keine historischen Zugangsangaben als aktuelle Besuchsinformation verwendet.
- Zwei neue Fragen/sechs Rückmeldungen, Revision 3. Elf Kunstkapitel jetzt 84 Fragen; alle Antwortpositionen des Zehn-Fragen-Checks, Quellenlinks, bestehende Arbeitsblattintegration und alle 65 Werkstattarbeitsblätter erfolgreich geprüft. diff --check bestanden.
- Quellenbilder nicht kopiert; externe Bildbetrachtung und visuelle/unterrichtliche Abnahme offen. Keine Veröffentlichung vorgenommen.

### Englische Fassung: Kunst begegnen / Museum (2026-09-06)
- kunst_1_museum in lang/en.json vollständig auf Englisch ergänzt, contentLanguage en/sourceRevision 1: drei Abschnitte einschließlich Werkkarte, Beobachtungsauftrag, Original/Reproduktion und eigener Ausstellung; sechs Fragen mit 18 Rückmeldungen; Ziele, Zusammenfassung, Quellenbezeichnung und vollständige Werkstatt einschließlich Kriterien/Mustertext.
- IDs, Antwortzuordnung, Quellen-URL und Werkjahr gegenüber Deutsch erhalten. Gemeinsame Werkstatt-/Selbsteinschätzungsbedienung läuft auf Englisch. Das Kapitel benötigt keine lokalisierten fachspezifischen Regler.
- Verifikation: neuer test_museum_english.js lädt das tatsächliche Kapitel über den Renderer, prüft Auswahl ohne deutschen Ersatzhinweis, Struktur-/Antwortäquivalenz, englische Werkstatt und Reflexionsfelder sowie alle 18 Rückmeldungen mit 100/0/0 Prozent. Test und bestehende Übersetzungsrevisionsprüfung bestanden, diff --check bestanden.
- Erneuter Übersetzungsaudit: Englisch nun 47 aktuelle Kapitel / 150 deutsche Ersatzfassungen; AR/SR/TR/UK unverändert je 44/153. Keine vollständige Mehrsprachigkeit behauptet; Änderungen lokal und unveröffentlicht.

### Türkische Fassung: Museum und Ausstellung (2026-09-06)
- kunst_1_museum vollständig in lang/tr.json ergänzt (contentLanguage tr, sourceRevision 1): drei Erklär-/Auftragsabschnitte, Werkkarte, Ziele/Zusammenfassung, sechs Fragen mit 18 Rückmeldungen, Quellenbezeichnung und gesamte Werkstatt mit drei Zuordnungen, Kriterien und Mustertext. Kapitel-IDs, richtige Antworten und Quellenadresse bleiben gleich.
- Test test_museum_turkish.js verwendet den tatsächlichen Renderer mit türkischer Spracheinstellung: Auswahl ohne deutschen Ersatzhinweis, sechs äquivalente Fragen, alle 18 Rückmeldungen, 100/0/0-Prozent-Auswertungen, türkische Zuordnungsbedienung und Selbsteinschätzungsfelder bestanden; diff --check bestanden.
- Übersetzungsaudit: Türkisch nun 45 aktuelle Kapitel/152 deutsche Ersatzfassungen; Englisch 47/150, AR/SR/UK je 44/153. Visuelle und muttersprachliche Unterrichtserprobung nicht durch den Funktionstest nachgewiesen. Lokal, unveröffentlicht.

### Serbische Fassung: Museum und Ausstellung (2026-09-06)
- kunst_1_museum vollständig in lang/sr.json ergänzt, in der bereits verwendeten serbischen Lateinschrift (contentLanguage sr, sourceRevision 1). Drei Abschnitte, Werkkarte, praktische Aufträge, sechs Fragen/18 Rückmeldungen, Ziele, Zusammenfassung, Quelle und vollständige Werkstatt übersetzt. Quellenadresse, Jahr und Antwortzuordnungen erhalten.
- Neuer test_museum_serbian.js prüft tatsächliche serbische Kapitelauswahl ohne Ersatzhinweis, Aufgabenäquivalenz, alle 18 Rückmeldungen mit 100/0/0-Prozent-Ergebnissen, serbische Zuordnungs- und Reflexionsbedienung. Test und diff --check bestanden.
- Übersetzungsaudit: SR und TR je 45 aktuelle Kapitel/152 deutsche Ersatzfassungen; EN 47/150; AR und UK je 44/153. Keine Aussage zur vollständigen Mehrsprachigkeit oder muttersprachlichen Unterrichtserprobung. Lokal und unveröffentlicht.

### Ukrainische Fassung: Museum und Ausstellung (2026-09-06)
- kunst_1_museum vollständig in lang/uk.json ergänzt (contentLanguage uk/sourceRevision 1): drei Abschnitte mit Beobachtungs- und Gestaltungsaufträgen, Werkkarte, Ziele/Zusammenfassung/Quellenbezeichnung, sechs Fragen mit 18 Rückmeldungen und gesamte Werkstatt. Quellenadresse, IDs, Jahr und richtige Antworten beibehalten.
- Neuer test_museum_ukrainian.js prüft den tatsächlichen Renderer: ukrainische Auswahl ohne deutschen Ersatzhinweis, sechs äquivalente Fragen und sämtliche Rückmeldungen bei drei vollständigen Antwortdurchläufen, ukrainische Werkstatt- und Reflexionsbedienung. Bestanden; diff --check bestanden.
- UK/SR/TR nun je 45 aktuelle Kapitel/152 deutsche Ersatzfassungen, EN 47/150, AR 44/153. Gesamtübersetzung weiterhin unvollständig; keine muttersprachliche Unterrichtserprobung behauptet. Lokal und unveröffentlicht.

### Arabische Fassung und mehrsprachiges Museumskapitel (2026-09-06)
- kunst_1_museum vollständig in lang/ar.json ergänzt, contentLanguage ar/sourceRevision 1: drei Abschnitte, Werkkarte, praktische Aufträge, sechs Fragen/18 Rückmeldungen, Metadaten und vollständige Werkstatt. Werkjahr in der Tabelle durch bdi isoliert; RTL folgt dem Inhaltscontainer. Keine Änderungen an Quelle oder Antwortzuordnung.
- Neuer test_museum_arabic.js: arabische Fassung ohne deutschen Ersatzhinweis, RTL, Werkkarte, Aufgabenäquivalenz, alle Rückmeldungen und arabische Werkstatt-/Reflexionslabels bestanden. Prüfung der Zuordnungszahl akzeptiert lateinische oder arabisch-indische Ziffern, da die Intl-Laufzeit mit Locale ar hier lateinische Ziffern liefert.
- Sämtliche fünf Museumssprachtests EN/TR/SR/UK/AR gemeinsam bestanden; Deutsch zuvor im unveränderten Ausgangskapitel getestet. Das Museumskapitel liegt damit in allen sechs angebotenen Sprachen in aktueller Fassung vor. Visuelle RTL- und muttersprachliche Unterrichtserprobung bleiben offen.
- Audit: EN 47 aktuelle Kapitel/150 deutsche Ersatzfassungen, AR/SR/TR/UK jeweils 45/152. Gesamtmehrsprachigkeit weiterhin offen. diff --check bestanden, lokal/unveröffentlicht.

### Übersetzte Titel in der Lernübersicht (2026-09-06)
- Befund: Lernübersicht verwendet bislang ausschließlich deutsche Daten. Aktuelle übersetzte Kapiteltitel werden nun zusätzlich in der gewählten Sprache angezeigt, mit lang/dir-Kennzeichnung. Alle fünf Übersetzungstitel gehen in die Suche ein; deutsche Stofflisten bleiben unverändert. Vollständige Übersetzung der Übersichtsbedienung ist weiterhin offen.
- scripts/build_chapter_title_index.js erzeugt js/chapter-title-index.js anhand der tatsächlichen selectCurrentTopic-Entscheidung des Renderers. Nur aktuelle auswählbare Übersetzungen aufgenommen. Index nach Übersetzungs-/Revisionsänderungen neu erzeugen; der neue Test kontrolliert dies für alle Kapitel und Sprachen. Laufzeit blendet Einträge mit unpassender Kapitelrevision aus. Fehlender Index verhindert den bisherigen Lernbereich nicht.
- Sprachwechselnachrichten werden nur vom eigenen Ursprung berücksichtigt; arabische Titel erhalten RTL. Suchanfragen nach übersetztem Titel bleiben auch bei Wechsel zur deutschen Anzeige nutzbar.
- Verifiziert: test_translated_title_search.js (vollständige Indexäquivalenz, fünf Museumstitel, Sprachwechsel/Origin, RTL, unveränderte Auswahl und Revisionsschutz); vorhandene test_learning_search.js, test_teaching_plan.js und test_learning_resilience.js bestanden. Syntax/diff --check bestanden. Darstellung noch nicht visuell geprüft, lokal/unveröffentlicht.

### Englische Bedienung des Lerneinstiegs (2026-09-06)
- Überschrift, Lernwegwahl samt Hilfetext, Such-/Fach-/Klassenfilter und Fach-/Klassenoptionen der Lernübersicht auf Englisch ergänzt. Komponenten erhalten ihre tatsächliche lang-Kennzeichnung; die weiterhin deutschen Kapitelinformationen und Stofflisten werden nicht pauschal als Englisch ausgezeichnet.
- Sprachwechsel aktualisiert Texte bestehender Bedienelemente, erhält gewählte Filter, Suchanfrage und Fokus und stellt bei Deutsch die deutschen Bezeichnungen wieder her. Keine komplette englische Übersicht behauptet: Kartenaktionen, Stofflistenbedienung, Rückmeldungen und weitere Sprachen bleiben auszuarbeiten.
- Verifiziert: test_learning_entry_english.js (Beschriftungen, Fach-/Klassenwahl, Modushilfe, Hin-/Rückwechsel, Filter/Fokus); bestehende Such-, übersetzte-Titel-, Speicherresilienz- und Lehrplanlisten-Tests bestanden. Syntax/diff --check bestanden. Lokal, unveröffentlicht, ohne visuelle Abnahme.

### Englische Kapitelkarten und Lernstandmeldungen (2026-09-06)
- Kapitelkarten zeigen bei Englisch nun passende Lern-/Ansichts-/Wiederholungsaktionen, Auswahlzustand des Prüfungsstoffs und Erklärungsschalter. Trefferzahl mit Singular/Plural und leere Suche lokalisiert. Alle vier Ergebniszustände übersetzt: noch kein Versuch, weiter üben, später wiederholen und überarbeitete Kapitelrevision.
- Lokalisierte Elemente erhalten lang en; deutsche Inhaltsmetadaten bleiben deutsch gekennzeichnet durch die Seite. Ergebnistext auch in der Stoffliste mit eigener Sprachkennzeichnung. Übrige Stofflistenbedienung und weitere Sprachen bleiben offen.
- Englischer Einstiegstest erweitert um Auswahlaktionen, vier gespeicherte Ergebniszustände, Singular/Nulltreffer und Sprachkennzeichnung. Test nach Korrektur einer zu breiten Suchannahme bestanden: „museum“ trifft inzwischen auch das Gutenberg-Beispiel, die Singularprüfung verwendet daher den eindeutigen englischen Museumstitel. Bestehende Lernfluss-, Unterrichtsplan-, Such- und Titelindex-Tests sowie Syntax/diff --check bestanden. Lokal/unveröffentlicht.

### Englische Stofflistenaktionen (2026-09-06)
- Hauptüberschrift, Reihenfolge-Hilfe, Öffnen/Entfernen, Auf-/Abwärtsaktionen, Vorwissen-Schaltflächen, Teilen/Drucken und Nachladen auf Englisch ergänzt. Beschriftungen der Umordnungsaktionen auch für assistive Technik übersetzt. Geteilter-Link-Hinweis und Auswahl-/Ergebniszahlen lokalisiert.
- Neuer test_plan_controls_english.js prüft reale Zwei-Kapitel-Liste, Umordnen/Fokus, korrekte Reihenfolge im geteilten Unterpfad-Link, Entfernen, Unterrichtsmodus ohne persönliche Ergebnisse und Rückwechsel nach Deutsch. Bestanden; vorhandene englische Einstiegs-, Unterrichtsplan- und Vorwissenaktions-Tests ebenfalls bestanden, Syntax/diff --check bestanden.
- Weitere Hinweise (etwa Vorwissenstatus, Ladefehler, Bewegungsbestätigungen und Speichererklärung), Inhaltsmetadaten und weitere Sprachen bleiben zu übersetzen. Lokal/unveröffentlicht, keine visuelle Abnahme.

### Englische Stofflistenhinweise bei Fehlern und Änderungen (2026-09-06)
- Ladezustand, Abruffehler, fehlende Lernziele und Speicherfehler ins Englische übertragen. Hinweise erklären weiterhin verfügbare Kapitel-/Teilenfunktionen. Bestätigungen nach Umordnen oder Vorwisseneinfügung sowie Vorwissenüberschrift/-status/-Erklärung übersetzt.
- Neuer test_plan_feedback_english.js prüft verweigerten Schreibzugriff, verzögerten Abruf, HTTP-Fehler, unvollständige Daten, erfolgreiche Wiederholung, Drucksperre/-freigabe, Vorwissenstatus und Einfügung mit korrekt geteiltem Link. Bestanden; vorhandene englische Planaktions-, Vorwissen- und Ladezustandstests ebenfalls bestanden, Syntax/diff --check bestanden.
- Statische Speichererklärung, Warnung bei unbekannten Linkkapiteln und weitere Übersichtstexte sowie übrige Sprachen bleiben offen. Vorwissenstatus enthält weiterhin deutsche Kapiteltitel aus der gemeinsamen Stoffquelle. Lokal/unveröffentlicht, keine visuelle Abnahme.

### Englische Speicherinformation und unvollständige Stofflinks (2026-09-06)
- Speichererklärung, Kopierfeldbeschriftung und Lehrplanhinweis/-link übersetzt. Erläutert lokale Speicherung, keine Übermittlung an Lehrkräfte, Link ohne Ergebnisse und Unterschied zwischen Lernquiz und Schulnote.
- Warnung bei unbekannten Kapiteln in geteilten Listen auf Englisch ergänzt und in den Sprachwechsel eingebunden. Vollständig unbekannter Link erhält weiterhin vorherige gespeicherte Stoffliste; unbekannte IDs bleiben bei Weitergabe enthalten. Singular/Plural berücksichtigt.
- Neuer test_plan_information_english.js prüft teilweise/vollständig unbekannte Listen, Sprache/Warntext, erhaltenen Speicher, Weitergabe unbekannter IDs und Rückwechsel nach Deutsch. Test, bestehende Unbekannt-Kapitel-, englische Einstiegs-/Planaktionsprüfungen, Syntax/diff --check bestanden. Inhaltsmetadaten und weitere Sprachen sowie visuelle Abnahme/Veröffentlichung bleiben offen.

### Übersetzte Kurzbeschreibungen und Lernziele in Übersicht/Stoffliste (2026-09-06)
- Generierten Kapitelindex um Untertitel und Lernziele aus den tatsächlich ausgewählten aktuellen Übersetzungen erweitert. Karten und Stofflisten verwenden diese Angaben für die gewählte Sprache; fehlen sie oder passt die Revision nicht, werden deutsche Angaben genutzt. Listen/Absätze erhalten lang und passende Schreibrichtung. Übersetzte Metadaten gehen auch in die Suche ein.
- Die deutsche Haupttitel-/Fachmetadatenanzeige sowie ergänzende übersetzte Titel bleiben wie bisher; keine vollständig übersetzte Übersicht behauptet. Generierung nach Inhaltsänderungen weiterhin erforderlich.
- test_translated_title_search.js gleicht jetzt Titel, Untertitel und sämtliche Lernziele aller Kapitel/Sprachen gegen die aktuelle Rendererentscheidung ab. Für fünf Museumssprachen zusätzlich tatsächliche Karten, Planaufnahme, Sprachwechsel nach Deutsch und RTL geprüft. Bestanden; Such-, Stofflistenlade-, Unterrichtsplan- und englische Einstiegstests, Syntax/diff --check ebenfalls bestanden. Lokal/unveröffentlicht, Druck-/Browserdarstellung ungeprüft.

### Zustandsabhängige Stofflistenmeldungen beim Sprachwechsel (2026-09-06)
- Speicherfehler-/Linkhinweis nun über einen expliziten Meldungszustand gerendert. Sprachwechsel aktualisiert bestehende Meldungen; nach erfolgreichem Speichern bleibt kein veralteter Speicherfehler stehen. Ändern einer Liste entfernt den Hinweis zu ihrem ausgeblendeten alten Freigabelink.
- Neuer test_plan_notice_language.js prüft DE↔EN bei Speicherfehler und Freigabelink, erfolgreiche Speicherung nach vorübergehendem Fehler, unveränderten Linkwert/Fokus/Textauswahl beim Wechsel und Löschung veralteter Hinweise nach Entfernen. Bestanden; vorhandene englische Fehler-/Informations-/Planaktions- und Speicherresilienztests, Syntax/diff --check bestanden. Lokal/unveröffentlicht.

### Mehrsprachige Haupttitel in Lernübersicht und Stofflisten
- Aktuelle Übersetzungen werden als Haupttitel der Kapitelkarten, Stofflisten und Vorwissensverweise verwendet; veraltete oder fehlende Übersetzungen fallen auf Deutsch zurück.
- Kapitelkarten behalten den deutschen Originaltitel als zusätzliche Orientierung. Die Suche berücksichtigt deutsche und aktuelle übersetzte Titel unabhängig von der gewählten Sprache.
- Titel erhalten ihre tatsächliche Sprache und Schreibrichtung; Online-Kapitellinks trennen die Beschriftung vom sprachlich markierten Titel.
- Geprüft: test_translated_title_search, test_plan_controls_english, test_plan_feedback_english, test_learning_entry_english, test_teaching_plan und test_plan_prerequisite_actions sowie diff --check bestanden. Keine Browserprüfung und keine Veröffentlichung. Vollständige Lehrplanabdeckung und weitere Übersetzungen bleiben offen.

### Vollständiger Funktionstestlauf nach den jüngsten Inhalts- und Sprachänderungen
- `node scripts/run_functional_tests.js` vollständig beendet, Exitcode 0: 133 von 133 vorhandenen Funktionssuiten bestanden.
- Der Lauf umfasst unter anderem die fünf Museumübersetzungen, mehrsprachige Haupttitel, englische Stofflistenhinweise, Werkstattreflexion und druckbare Aufgaben sämtlicher 65 Werkstattkapitel sowie bestehende Physik-/Chemie-/Mathematikmodelle.
- Einzelresultate mit Laufzeiten und Ausgaben stehen in `../functional-test-report.json`. Es wurde kein weiterer Testprozess gestartet.
- Diese Ergebnisse belegen ausschließlich die von den jeweiligen Tests erfassten Funktionen. Vollständige Lehrplanabdeckung aller Fächer, fachliche Gesamtabnahme, externe Medien, reale Audioausgabe und visuelle Prüfung sind damit nicht nachgewiesen. Veröffentlichung weiterhin offen.

### Kunst, 3. Klasse: serielles Original und Reproduktion
- Kapitel `kunst_3_kunstgeschichte` um den Abschnitt `originaldruck` erweitert: Druckform, Originalabzug, Abbildung und Bildschirmdarstellung unterscheiden; Hokusais Große Welle als konkreter historischer Bezug aus Japan.
- Primärquellen live gelesen: Met-Objekt 45434 (JP1847, ca. 1830–1832, Holzblockdruck) und V&A „What is print?“ (Begriff und Reliefdruck). Keine Museumsabbildung heruntergeladen; externen Betrachtungsauftrag und fehlende Abbildung ausdrücklich berücksichtigt.
- Eigene praktische Aufgabe: Kartonform ohne Schnitzwerkzeug, Probe und drei Abzüge mit einer gezielt veränderten Bedingung, Beobachtung/Vermutung, Beschriftung, Anordnung und Überarbeitung. Planung ohne Material ist als noch nicht ausgeführter Versuch gekennzeichnet.
- Zwei neue Fragen mit sechs individuellen Rückmeldungen. Kapitelrevision von 2 auf 3 erhöht; veraltete Ergebnisse/Übersetzungen werden damit nicht als aktuell behandelt. Metadatenindex neu erzeugt.
- Tests bestanden: Kunstintegration (11 Kapitel, jetzt 86 Fragen), Arbeitsblätter, alle 65 Werkstatt-Arbeitsblätter, übersetzte Metadaten und diff --check. Der vorherige Gesamtstand von 133/133 Suiten wurde vor dieser Ergänzung erhoben; diesmal passende betroffene Suiten erneut geprüft.
- Lehrplanmatrix aktualisiert. Sammelgeschichte, eigenständige digitale Kunst und weitere ausgewiesene Fachlücken bleiben offen. Keine Browserprüfung oder Veröffentlichung.

### Kunst, 4. Klasse: Bild, Wort und Ton in Werbung
- `kunst_4_portfolio` um Abschnitt `bild_wort_ton` erweitert: eigene SVG-Flickenzeichnung, zwölfsekündiger Storyboard-Entwurf mit drei Karten, Sprechtext und selbst erzeugten Geräuschen. Sämtliche Veranstaltungsangaben bleiben ausdrücklich fiktiv.
- Praktischer A/B-Auftrag verändert nur die Geräuschfolge bei gleichem Bild, Wortlaut und Dauer; Rückmeldungen, Reihenfolgeeffekt, eigene Überarbeitung und schriftliche Alternative mit ausdrücklich offener Hörprüfung. Keine Tondatei oder automatische Audioausgabe hinzugefügt.
- Zeitdruck und behauptete Zustimmung als untersuchbare Werbemittel; Gestaltung und Tatsachenbeleg getrennt. Zwei neue Fragen mit sechs individuellen Rückmeldungen.
- Lernziele, Zusammenfassung, Portfolioauftrag und Kapitelrevision (jetzt 4) angepasst. Titelindex neu erzeugt. Kunst umfasst nun 88 Fragen in elf Kapiteln.
- Bestanden: Kunstintegration einschließlich Abschnittszuordnung/aller Antwortbegründungen, Arbeitsblätter, 65 Werkstatt-Arbeitsblätter, Metadatenprüfung und diff --check. Keine visuelle oder reale Hörprüfung; keine Veröffentlichung. Lehrplanmatrix mit verbleibenden Grenzen aktualisiert.

### Kunst, 3. Klasse: historische Bildräume vergleichen
- `kunst_3_kunstgeschichte` um `raumvergleich` ergänzt. Die bestehenden Quellen zu Bruegel (KHM über Arts & Culture) und Hokusai (Met JP1847) erneut live geöffnet; Museumsbeschreibungen stützen die Hinweise zu erhöhtem Blick/Straße bzw. Größenkontrast Berg/Welle.
- Zwei konkret belegte Werke aus unterschiedlichen Zeiten vergleichen; Museumsangaben, eigene Beobachtung und Wirkung getrennt. Anordnungsskizzen und zwei eigene Raumstudien mit verändertem Standpunkt, Größenkontrast, Überschneidung, Rückmeldung und Überarbeitung.
- Keine pauschale Entwicklungs- oder Kulturbehauptung aus zwei Werken. Bei fehlender externer Abbildung bleibt die Bildbeobachtung ausdrücklich offen.
- Zwei neue Fragen mit sechs individuellen Begründungen; zwölf Kapitelquizfragen, insgesamt 90 Kunstfragen. Ziele, Zusammenfassung und Portfolioauftrag erweitert; Kapitelrevision 4, Metadatenindex neu erzeugt.
- Bestanden: Kunstintegration mit Abschnittszuordnung/allen Antwortbegründungen, Arbeitsblätter, 65 Werkstatt-Arbeitsblätter, Metadatenprüfung und diff --check. Matrix aktualisiert; Gesamtlehrplanprüfung, Übersetzungen, Browserprüfung und Veröffentlichung weiter offen.

### Kunst, 3. Klasse: historische Adaption
- `kunst_3_foto_medien` enthält jetzt `historische_adaption`: Hiroshiges Pflaumengarten als Vorlage für van Goghs Gemälde von 1887, Beobachtungsauftrag und eigene Einladungskarte in zwei Varianten mit Quellen-/Änderungsnachweis.
- Primärbeleg: Van-Gogh-Museum-PDF „Gallery texts“, Seite 9, live gelesen; beschreibt Farbwechsel und ergänzte Ränder. Die zwei Sammlungsseiten lieferten dem Textabruf nur ihre Titel; sie sind als Abbildungsziele verlinkt, nicht als visuell geprüft dokumentiert. Fehlende Abbildungen lassen den Vergleich ausdrücklich offen. Keine genaue Datierung des Hiroshige-Abzugs aus indirekten Suchtreffern übernommen.
- Zwei Fragen mit sechs individuellen Rückmeldungen, zwölf Kapitelquizfragen, 92 Kunstfragen insgesamt. Revision auf 4 erhöht; Ziele, Zusammenfassung, Portfolioauftrag und Titelindex angepasst.
- Kunstintegration zunächst wegen alter Erwartung 10 statt 12 Fragen fehlgeschlagen; korrigierter Lauf bestanden. Auch Arbeitsblätter, alle 65 Werkstatt-Arbeitsblätter und übersetzte Metadaten bestanden. Keine Browserprüfung und keine Veröffentlichung; weitere Lehrplanarbeit und Übersetzungen bleiben offen.

### Kunst, 4. Klasse: öffentliche Entscheidung und mediale Darstellung
- `kunst_4_portfolio` um `medien_perspektiven` erweitert: vollständig fiktiver Schulhof-Fall (7/12 Stimmen für zwei Bäume/zwei Bänke statt sechs Stellplätzen), eigene Planzeichnung, drei Schlagzeilen, individuelle Erklärungen und zwei Nachrichtenkarten als Gestaltungsauftrag.
- `js/art-workshop.js`: nur Überschrift wechselt, Fakten und Bild bleiben identisch; Abgleich auf Wunsch, alte Erklärung bei Wechsel gelöscht, Statusmeldung, Rücksetzen und Initialisierungsschutz. Vergleich verursacht keinen Kapitelquizversuch.
- Zwei zusätzliche Fragen; jetzt zwölf Portfoliofragen und 94 Kunstfragen. Revision 5, Metadaten aktualisiert. Politische Meinung wird nicht benotet; Quellenarbeit und begründete Darstellung sind die Aufgabe.
- Neuer Test `test_art_media_framing.js` fand zunächst einen Fehler beim Wiederherstellen einer ungültigen Auswahl. Auswahlzugriff auf options/selectedIndex umgestellt, anschließend bestanden: Varianten, gleichbleibende Fakten/SVG, Erklärungen, Fokus, Reset, Wiederinitialisierung und ungültige Auswahl.
- Ebenfalls bestanden: Kunstintegration, Bildgeschichte, Arbeitsblätter, alle 65 Werkstatt-Arbeitsblätter, übersetzte Metadaten, Syntax und diff --check. Insgesamt jetzt 134 vorhandene Suiten; kein neuer vollständiger Gesamtlauf behauptet.
- Matrix aktualisiert. Reale Medienfälle, weitere Lehrplanlücken, Übersetzungen und visuelle Prüfung bleiben offen. Keine Veröffentlichung.

### 08.09.2026 – englisches Kapitel Gebäude umnutzen
- `kunst_4_gebaeude_umnutzen` vollständig auf Englisch ergänzt: drei Abschnitte, Gasometer-Archivbezug, fünf Nutzergruppen, zwei Grundrisse/Außenansicht, sechs Fragen mit 18 individuellen Rückmeldungen und gesamte Werkstatt einschließlich Kriterien/Modelltext.
- Bestehende Quellen, Voraussetzungen, Frage-IDs und richtige Antworten erhalten. Historische Aussage und heutige Situation sowie reales Gasometerprojekt und fiktiver Nachbarschaftshausauftrag getrennt. Deutsche externe Quelle in der englischen Fassung entsprechend bezeichnet.
- `contentLanguage: en`, aktuelle `sourceRevision: 0`; deutscher Kapitelinhalt unverändert. Index neu erzeugt: 48 aktuelle englische Titel, jeweils 45 in den anderen vier Übersetzungssprachen.
- Neuer Test `test_building_reuse_english.js` mit echtem Renderer bestanden: kein Sprachfallback, alle Antwortpfade (100/0/0 Prozent), Werkstattzuordnung, englische Reflexionsfelder, Quellen-/Voraussetzungsidentität und fünf Tabellenzeilen. Metadaten-/Revisionsprüfung und diff --check ebenfalls bestanden.
- Keine Browserprüfung oder Veröffentlichung. Weitere Kapitelübersetzungen und vollständige Lehrplanabnahme bleiben offen.

### 08.09.2026 – türkisches Kapitel Gebäude umnutzen
- `kunst_4_gebaeude_umnutzen` vollständig Türkisch ergänzt: drei Abschnitte, fünf Nutzergruppen, Entwurfsauftrag, sechs Fragen/18 individuelle Rückmeldungen und gesamte Gestaltungswerkstatt. Quelle, Voraussetzungen, IDs und Bewertungsstruktur erhalten; aktuelle Revision 0.
- Metadatenindex neu erzeugt: EN 48, TR 46, AR/SR/UK jeweils 45. Neue Titel/Lernziele werden über die gemeinsame Suche und Stofflisten verwendet.
- `test_building_reuse_turkish.js` prüft echten Renderer ohne Fallback, alle Antwortpfade und türkische Werkstatt-/Reflexionsbeschriftung. Erster Testlauf hatte den Buttonnamen im Singular statt der vorhandenen Pluralbeschriftung; Erwartung korrigiert. Danach bestanden, ebenso englisches Gebäudekapitel, vollständige Metadatenprüfung und diff --check.
- Keine Browserprüfung oder Veröffentlichung. Weitere Übersetzungen und Lehrplanabnahme bleiben offen.

### 08.09.2026 – serbisches Kapitel Gebäude umnutzen
- Vollständige serbische Fassung von `kunst_4_gebaeude_umnutzen` in lateinischer Schrift ergänzt, entsprechend der vorhandenen serbischen Inhalte: drei Abschnitte, fünf Nutzergruppen, zwei Entwurfsvarianten, sechs Fragen/18 Rückmeldungen und vollständige Werkstatt.
- Deutsche Ausgangsinhalte, historische Quelle, Voraussetzungskapitel, Frage-IDs und richtige Antworten unverändert erhalten. Aktuelle sourceRevision 0; deutschsprachiges externes Original entsprechend bezeichnet.
- Neuer Integrationstest `test_building_reuse_serbian.js` bestanden: tatsächliche serbische Darstellung ohne Fallback, äquivalente Fragen/Antworten, 100/0/0-Prozentpfade, Werkstattzuordnung und Reflexionsfelder. Metadatenprüfung, Werkstattfunktion in sechs Sprachen und diff --check ebenfalls bestanden.
- Index enthält nun EN 48, SR/TR 46, AR/UK 45 aktuelle Übersetzungen. Arabisch und Ukrainisch fehlen beim Gebäudekapitel weiterhin. Gesamtlehrplanabnahme, weitere Übersetzungen, visuelle Prüfung und Veröffentlichung bleiben offen.

### 08.09.2026 – ukrainisches Kapitel Gebäude umnutzen
- `kunst_4_gebaeude_umnutzen` vollständig Ukrainisch ergänzt: alle drei Abschnitte, fünf Nutzergruppen, Entwurfsauftrag, sechs Fragen/18 Rückmeldungen sowie Werkstatt, Kriterien und Modellantwort. Aktuelle sourceRevision 0; historische Quelle und Voraussetzungen erhalten.
- Quellenangaben bleiben zeitlich eingeordnet; externe deutsche Quelle ist als solche bezeichnet. Lehrmodell und bautechnischer Nachweis sind weiterhin getrennt.
- Neuer tatsächlicher Renderer-Test `test_building_reuse_ukrainian.js` bestanden: kein Fallback, äquivalente IDs/Antworten, alle 100/0/0-Prozentpfade, ukrainische Zuordnung und Reflexionsfelder. Metadatenprüfung, Werkstattfunktionen in sechs Sprachen und diff --check bestanden.
- Index neu erzeugt: EN 48, SR/TR/UK jeweils 46, AR 45 aktuelle Übersetzungen. Beim Gebäudekapitel fehlt noch Arabisch. Weitere Lehrplanarbeit, Übersetzungen, visuelle Prüfung und Veröffentlichung bleiben offen.

### 08.09.2026 – Gebäudekapitel in allen sechs Sprachen
- Arabische Fassung von `kunst_4_gebaeude_umnutzen` vollständig ergänzt: drei Abschnitte, Nutzergruppen, Entwurfsaufgabe, sechs Fragen mit 18 Rückmeldungen und gesamte Werkstatt. Historische Quelle und prerequisites erhalten; sourceRevision 0.
- Arabischer Inhalt wird von rechts nach links angeordnet; Jahreszahl im Fließtext mit bdi isoliert. Deutscher externer Quellentext entsprechend bezeichnet. Keine visuelle RTL-Abnahme behauptet.
- `test_building_reuse_arabic.js` bestanden: tatsächlicher Renderer ohne Fallback, RTL, äquivalente Fragen und Antwortpfade, Zuordnung und Reflexionsfelder. Die vier anderen Übersetzungstests des Kapitels, Metadatenprüfung, Werkstattfunktionen in sechs Sprachen und diff --check ebenfalls bestanden.
- Kapitel jetzt DE/EN/AR/SR/TR/UK verfügbar. Index: EN 48, AR/SR/TR/UK jeweils 46 aktuelle Übersetzungen. Das ist keine Vollständigkeit aller angebotenen Kapitelsprachen; weitere Übersetzungen, Lehrplanprüfung, Medien-/Browserabnahme und Veröffentlichung bleiben offen.

### 08.09.2026 – englische Fach- und Klassenangaben
- `js/learning.js` verwendet gemeinsame englische Fachnamen für Filter, Kapitelkarten und Stofflisten. Die Suche enthält deutsche und englische Fachnamen unabhängig von der aktuellen Sprache.
- Kapitelmetadaten übersetzen sämtliche derzeit vorhandenen Klassenangaben einschließlich mehrerer Schulstufen, Grundlagen und Vertiefung. Die Zuordnung zu Mittelschulklasse und Schulstufe bleibt ausdrücklich sichtbar. Unbekannte zukünftige Bezeichnungen fallen mit korrekter Sprachmarkierung auf den Ausgangstext zurück.
- Neuer Test `test_learning_metadata_english.js` prüft alle verfügbaren Kapitelmetadaten, konkrete Mehrjahres-/Grundlagen-/Vertiefungsangaben, zweisprachige Fachsuche und erhaltene Stoffauswahl. Bestehender Englisch-Einstiegstest um Karten-/Stofflistenmetadaten erweitert.
- Beide Tests bestanden; außerdem Unterrichtsstoffliste, englische Plansteuerung, Volltextsuche, übersetzte Metadaten, Syntax und diff --check. Keine Browserprüfung oder Veröffentlichung. Andere Oberflächensprachen und weitere fachliche Arbeit bleiben offen.

### 08.09.2026 – Physik als Ausgangspunkt der Gesamtprüfung
- BMB-Lehrplanseite live geprüft; direkter neuer RIS-Link liefert HTTP 503. Gespeicherten vollständigen Physiklehrplanabschnitt erneut gelesen und Quellenlage in `docs/PHYSIK_LEHRPLANABGLEICH.md` dokumentiert.
- Alle 20 Physikkapitel nach Klassen, Zielen und Abschnitten erfasst; konkrete Textprüfung der Optik-/Akustik-/Elektrizitäts-/Elektromagnetismus-Einstiege. Erste Arbeitsmatrix mit Kernlücken und noch offenen Nachweisen erstellt, keine vollständige Fachabnahme behauptet.
- Nächste priorisierte Umsetzung: expliziter Sehweg/Sender-Empfänger und Lochkamera. Danach Gehör-/Lichtschutz, elektrische Schutzmaßnahmen und Gerätebezug. Weitere Übersetzungen bis zur Stabilisierung der deutschen Kerninhalte nachrangig.
- Kein neuer Testlauf oder Browserprüfung: in diesem Durchlauf wurden Abdeckung und Reihenfolge untersucht, kein Produktcode geändert. Gesamtziel bleibt aktiv.

### 08.09.2026 – Sehweg im Optik-Einstieg
- `optik1/sec0` verbindet Lichtquelle, streuenden Gegenstand und empfangendes Auge. Lampe und Blende lassen sich unabhängig schalten; Text und SVG erklären Beleuchtung und Sichtbarkeit getrennt. Protokoll, Alltagsübertragung und Modellgrenzen ergänzen die Interaktion.
- Zwei neue Verständnisfragen mit sechs individuellen Rückmeldungen; Kapitelrevision auf 2 erhöht, Metadatenindex neu gebaut.
- Neuer tatsächlicher Kapiteltest `test_seeing_path.js` bestanden: Initialisierung, vier Zustände, Fokus, Reset, wiederholte Initialisierung und sämtliche neuen Antwortwege. Vollständiger Funktionstest abgeschlossen: 141/141 bestanden (2026-09-08T14:32:45.371Z); kein Browsernachweis.
- Lehrplanmatrix aktualisiert. Nächste Kernlücke bleibt die Lochkamera; im einfachen Optikeinstieg vor der Beugungsvertiefung einordnen, mit Punkt-zu-Punkt-Abbildung und unterscheidbaren Objektpunkten.

### 08.09.2026 – Lochkamera als grundlegende Bildentstehung
- Neuer zweiter Abschnitt `optik1/lochkamera` nach Lichtquelle/Gegenstand/Auge, vor Schattenvertiefung. Bestehende Abschnitts-IDs bleiben erhalten; Titelnummern angepasst. Kapitelrevision 3, Lernziel/Zusammenfassung und Metadatenindex aktualisiert.
- Interaktives Modell mit zwei markierten Gegenstandspunkten, geradlinigen Wegen durch das Loch und zwei Bildpunkten. Gegenstands- und Schirmabstand unabhängig veränderbar, maßstäbliche Bildgröße, zugängliche Textwerte und Reset. Keine vorgetäuschte Helligkeits-/Unschärfeberechnung.
- Vorhersage, kontrollierte Vergleichsreihe, angeleiteter Kartonversuch, Auswertung und Modellgrenzen. Drei neue Fragen zu Bildumkehr, Bildgröße und kontrolliertem Experiment, jeweils drei individuelle Rückmeldungen. Exploratorium-Bauanleitung/Erklärung geöffnet und verlinkt; keine fremden Bilder übernommen.
- `test_pinhole_camera.js` bestanden: tatsächliche Kapitelinitialisierung, alle 35 Parameterkombinationen, geradliniger Durchgang durch Loch, Verhältnis der Bildgröße zu Abständen, Fokus/Reset/Reinitialisierung, veralteter Lernstand und alle neun Antwortwege. Bestehende Tests für Sehweg, vollständigen Fragenpool, Revisionen, Physikziele, übersetzte Suche, Übersetzungsrevisionen, Arbeitsblätter und Navigation ebenfalls bestanden; Syntax geprüft.
- Vollständiger vorheriger 141/141-Lauf bleibt historischer Nachweis; jetzt 142 Suiten. Keine Browserprüfung, kein durchgeführter Klassenversuch, keine Veröffentlichung. Weitere Lehrplanabgleiche bleiben offen.

### 08.09.2026 – Gehörschutz und Lernumgebung in Akustik
- Neuer Abschnitt `akustik/gehoerschutz` nach Frequenz/Amplitude, bestehende IDs erhalten und sichtbare Nummern angepasst. Kapitelrevision 3, Lernziel/Zusammenfassung und Quellen ergänzt; Metadatenindex neu gebaut.
- Quelle, Abstand, Einwirkungsdauer und geeigneter Gehörschutz als begründete Ansatzpunkte. Eigene Unterrichtsbeobachtung mit kontrolliertem Vergleich, Protokoll, alternativer Beteiligung ohne Hörvergleich, Auswertung und zwei begründeten Verbesserungsvorschlägen. Keine lauten Testgeräusche, Hörgrenzentests oder behauptete gesundheitliche Freigabe.
- Gesundheitsportal und WHO Safe Listening am 08.09.2026 geöffnet und verlinkt. Keine gesetzlichen Veranstaltungsgrenzwerte oder pauschalen sicheren Hörzeiten übernommen. Quellenauftrag unterscheidet eigene Erfahrung und Gesundheitsinformation.
- Drei neue Fragen zu Kopfhörern im Bus, Schulfestplanung und Beobachtungsgrenzen. Akustiktest auf 24 Fragen erweitert: alle neun neuen Antwortwege und alte Resonanzfunktionen bestanden. Zusätzlich Physikziele, vollständiger Quizpool, Kapitelrevisionen, übersetzte Suche, Arbeitsblätter und Navigation bestanden; diff --check sauber.
- Kein neuer vollständiger Gesamtlauf, keine Browser-/Klassenprüfung oder Veröffentlichung. Nächste priorisierte Kerninhalte: elektrische Schutzmaßnahmen und Gerätebezug.

### 08.09.2026 – Elektrische Schutzmaßnahmen erklären
- Neuer Abschnitt `elektrizitaet/schutzmassnahmen`: vier Schutzmöglichkeiten mit Wirkprinzip und Grenzen, Papiermodell zur Strombilanz beim FI, begründete Alltagsentscheidungen und Quellenauftrag. Bestehende Abschnitts-IDs erhalten, Titelnummern angepasst. Revision 2 und Metadatenindex aktualisiert.
- OVE H02:2024 Abschnitte 3.1/3.5 als österreichische Quelle zur Gerätenutzung geöffnet. Eaton-FI/LS-Grundlagen und DKE-Konzept zur technischen Erklärung gelesen. Keine deutschen Normanforderungen als österreichisches Recht übernommen, keine tatsächlichen Auslöseschwellen/-zeiten behauptet und keine Eingriffe an Anlagen verlangt.
- Vier neue Fragen, zwölf individuelle Antwortwege. Bestehender Elektrizitätstest nun 17 Fragen; alle neuen Antwortwege, Revision und vier Ohm-Szenarien bestanden. Zusätzlich Physikziele, vollständiger Quizpool, Kapitelrevisionen, übersetzte Suche, Navigation und Arbeitsblätter bestanden; diff --check sauber.
- Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung. Nächste Kernlücke: moderne elektronische Alltagsgeräte mit zusammenhängender Verbraucherperspektive.

### 08.09.2026 – Elektronisches Alltagsgerät und Verbraucherperspektive
- Neuer Abschnitt `elektrizitaet/alltagsgeraet` vor Abschluss: Sensorlampe mit Eingabe, Verarbeitung und Ausgabe, getrennt von der Energieversorgung. Eigenes Modell mit heller/dunkler Umgebung, Automatik/Dauerlicht/Aus und verfügbarer Energie; Grenzen einschließlich Standby, Messung und Rückwirkung benannt.
- Kontrolliertes Zwölf-Zustände-Protokoll, Übertragung auf eine vorhandene Geräteanleitung ohne Zerlegen/Kauf. Zwei ausdrücklich erfundene Lampen zum Vergleich bei gleichem Lichtstrom: Leistung, Energie für gleiche Betriebsdauer, Reparaturangaben und fehlende Daten. Begründete vorläufige Empfehlung statt automatischer Kaufrangliste.
- Micro:bit Foundation zu Ein-/Ausgaben und lichtabhängiger Steuerung geöffnet und verlinkt. Keine Hardwarebilder oder fremder Programmcode übernommen. Drei neue Fragen, Kapitelrevision 3, Lernziel/Summary und Metadatenindex aktualisiert.
- Elektrizitätstest bestanden: nun 20 Fragen, 21 Schutz-/Geräteantwortwege, zwölf Zustände, Fokus/Reset/Reinitialisierung, ungültige Auswahl, keine Quizänderung durch Exploration und bestehende Ohm-Funktion. Sechs betroffene Suiten zusätzlich bestanden; Syntax und diff --check sauber. Kein Gesamtlauf, Browsernachweis oder Veröffentlichung.

### 08.09.2026 – Optik von der Beobachtung zur Erklärung
- Farbenfolge neu: Prisma → Gegenstandsfarben → Mischung → Wellenlänge → Itten → Strukturfarben → Atommodell. Abschnitts- und Frage-IDs erhalten; neue Titelnummern, Lernziele und Revision 3.
- Prisma mit Vorhersage, protokollierten Modelleinstellungen und angeleitetem Schirmversuch ergänzt. Frei gewählte Modellbrechzahlen und vereinfachte Farb-/Helligkeitsdarstellung ausdrücklich benannt. Keine Messdaten behauptet.
- Widersprüchliche Sprache vom hüpfenden Elektron durch Energieniveau-Erklärung ersetzt; Itten vom physikalischen Spektrum und RGB abgegrenzt, CMY/CMYK von realen Malkastenpigmenten unterschieden. In Optik 1 Schattenraum und Schirmbild erklärt und Beugung als Grenze des Strahlenmodells betitelt.
- Physik-Leitfadentest erweitert und bestanden: neue Reihenfolge mit Quiz-/Reviewzuordnung, vier Farbobjekte, 21 Prismenstellungen. Zusätzlich Sehweg, Lochkamera, vollständiger Fragenpool, übersetzte Suche, Revisionen und Navigation bestanden. Metadatenindex gebaut; diff --check sauber. Kein neuer Gesamtlauf, keine Browser-/Klassenprüfung oder Veröffentlichung.

### 08.09.2026 – Bewegung in einer Ebene vor den Kraftformeln
- Neuer zweiter Abschnitt `kraft_und_bewegung/bewegung_ebene`: Bezugssystem, zwei Koordinaten, neun Zeitpositionen auf einem geschlossenen Weg, Weg versus Positionsänderung, Tempo versus gerichtete Geschwindigkeit. Alle alten IDs erhalten; Revision 4, Titelnummern, Ziele/Summary und Metadatenindex aktualisiert.
- Zeitregler mit beschrifteter Draufsicht, zurückgelegtem Weg, letzter Bewegungsrichtung und zugänglicher Textalternative. Keine vorgetäuschte Kurvenbeschleunigung: Ecken als vereinfachte, zeitlich nicht aufgelöste Richtungsänderung erklärt.
- Eigene Spielsteinbeobachtung mit Messzeiten und Unsicherheiten; Kartenübertragung ohne persönliche Adressdaten oder Straßenversuche. Drei neue Fragen, 28 Fragen im Gesamtpool.
- Krafttest bestanden: neun Zustände einschließlich Rückwärtswahl, Fokus/Reset/Reinitialisierung, alle neun neuen Antwortwege und bestehende Kraft-/Massemodelle. Zusätzlich Physikziele, Quizpool, Revisionen, übersetzte Suche, Navigation und Arbeitsblätter bestanden; Syntax und diff --check sauber.
- Mobilitäts-/Quellenbewertung bleibt offen. Kein neuer Gesamtlauf, keine Browser-/Klassenprüfung oder Veröffentlichung.

### 08.09.2026 – Verkehrsaussagen und ihre Annahmen prüfen
- Neuer Abschnitt `kraft_und_bewegung/verkehr_quellen` nach Reibung: Reaktionsweg, Bremsweg und Anhalteweg; konkrete KFV-Aussage aus 12.02.2026 mit den Bedingungen aus Dossier 2023, Abschnitt 3.2, Seiten 26–27 verglichen. Beide Primärquellen geöffnet; gleicher Herausgeber ausdrücklich kein unabhängiger Doppelbeleg.
- Vier eigene Tabellenrechnungen: 30/50 km/h, Reaktionszeit 1/2 s, Verzögerung 7,5/3,75 m/s², jeweils kontrollierter Vergleich. Keine Messdaten oder sicheren Straßenlücken behauptet; Rundung der ungerundeten Summen erklärt.
- Quellenauftrag zu Herausgeber, Datum, Fundstelle, Aussage, Bedingungen und Grenzen; Klassenzeitungstext verlangt belegte Aussage statt Unfallwahrscheinlichkeit aus Wegzahlen. Drei neue Fragen, Revision 5, Ziele/Summary und Metadatenindex aktualisiert.
- Krafttest jetzt 31 Fragen: alle vier Tabellenfälle unabhängig nachgerechnet, neun neue Verkehrsantwortwege und bisherige Modelle bestanden. Zusätzlich Physikziele, Quizpool, Revisionen, übersetzte Suche, Navigation und Arbeitsblätter bestanden; diff --check sauber. Kein neuer Gesamtlauf, keine Browser-/Klassenprüfung oder Veröffentlichung.

### 08.09.2026 – Physikaufträge für den Unterricht mitdrucken
- Befund: Physik-Arbeitsblätter enthielten bisher überwiegend Auswahl-/Rechenfragen; die neuen Protokolle, Vergleichstabellen und Quellenaufträge fehlten.
- `renderPhysicsWorksheetMaterial` ergänzt alle 20 Physikkapitel um geordnete Texte, Daten und Arbeitsaufträge, Abschnittslinks mit ausgeschriebener Papier-URL und Schreibraum. Material ist unabhängig von den Lösungen zuschaltbar.
- Interaktive Bereiche und Medien werden durch ausdrückliche Onlineverweise ersetzt; keine uninitialisierten Diagramme als Ergebnis gedruckt. Aufklappbare Lösungen, versteckte Inhalte, Bedienfelder, Ereignishandler und Bildschirmlayouts werden nicht in den Materialteil übernommen. Es ist ein ergänzendes Arbeitsblatt mit Onlinebezug, keine vollständige Offline-Ausgabe aller Modelle.
- Neue Suite `test_physics_worksheets.js` prüft alle 20 Kapitel, alle Abschnittszuordnungen einschließlich alter Abschnitte ohne IDs, Tabellen/Versuche/Quellenaufträge, Papier-URLs sowie unabhängige Material-/Lösungsschalter. Bestanden; Syntax und diff --check sauber. Vollständiger Lauf 2026-09-08T15:07:08.037Z: 142/143. Einzig test_targeted_review.js erwartete noch 13 statt 20 Elektrizitätsfragen; auf die tatsächliche Kapitelanzahl umgestellt und separat erfolgreich wiederholt. Kein Produktcode nach dem Gesamtlauf geändert. Drucklayout noch nicht visuell geprüft.

### 08.09.2026 – Magnetismus vor Elektromagnetismus
- Neuer erster Abschnitt `elektromagnetismus/magnetische_grundlagen`: Permanentmagnet, Polregel, Materialvergleich und Kompassbeobachtung. Nord-/Südpol von elektrischen Ladungen unterschieden; Feldlinien als Modell, keine Fäden.
- Zwei Stabmagnete unabhängig umdrehbar, Polnamen und Kraftrichtungen mit Live-Text. Pfeile zeigen keine Kraftstärke oder berechnete Bewegung. Protokoll für alle vier Kombinationen; eigene Material-/Kompassaufträge mit Unsicherheiten.
- Drei neue Fragen zu Polregel, Aussagekraft der Magnetprobe und Feldlinien. Revision 3, Ziele/Summary, Titelnummern und Metadatenindex aktualisiert; bestehende IDs erhalten.
- Elektromagnetismustest nun 24 Fragen: vier Zustände mehrfach, Fokus/Reset/Reinitialisierung und alle neun neuen Antwortwege bestanden; bisherige Motor-/Relais-/Transformatorfälle ebenfalls. Zusätzlich Lorentzmodell, Physikziele, Quizpool, alle 20 Physikarbeitsblätter, übersetzte Suche und Revisionen bestanden; Syntax und diff --check sauber. Kein neuer Gesamtlauf, keine Browser-/Klassenprüfung oder Veröffentlichung.

### 08.09.2026 – Temperatur messen und Wetter beobachten
- Neuer Abschnitt `waermelehre/temperatur_messen` nach Temperatur/Wärme: zwei geeignete Geräte vergleichen, Anzeigeauflösung und Genauigkeit trennen, sichere Wasserprobe bei ungefährer Raumtemperatur, Zeitreihe und dokumentierte Bedingungen. Vier ausdrücklich erfundene Beispielwerte je Gerät; keine vermeintlichen Messdaten.
- Drei neue Fragen mit neun Rückmeldungen, Wärmelehre-Revision 3 und insgesamt 24 Fragen. Bestehende Modelle unverändert. Im Wetterkapitel ergänzender fünftägiger Messauftrag mit fehlenden Werten, gleicher Aufstellung, protokollierten Abweichungen und Grenzen kurzer Reihen; keine neuen bewerteten Wetterfragen, daher keine Wetterrevisionsänderung.
- Wärmelehretest, Übersetzungsrevisionen, alle 20 Physikarbeitsblätter, allgemeine Arbeitsblätter, Wettermodelle, Physikziele, übersetzte Suche, vollständiger Quizpool und Kapitelrevisionen bestanden. Veraltete Wärmelehre-Testzählungen und festgeschriebene synthetische Revisionsnummern aktualisiert. Metadatenindex gebaut; diff --check sauber.
- Keine echte Messreihe, Browser-/Druckprüfung oder Veröffentlichung. Vollständiger thermischer Fachabgleich und Wetterantrieb bleiben offen.

### 08.09.2026 – Gesamtregister und Haushaltsabgleich

197 aktuelle Kapitel in elf Fächern mit Quellhashes inventarisiert; fachübergreifendes Register und detaillierte Haushaltsmatrix angelegt. Lagerung/Haltbarmachung mit Quellen, Etikettenuntersuchung und drei Fragen ergänzt (eh_1_hygiene Revision 1). Sieben Haushalts-Arbeitsblätter übernehmen vollständige Abschnittstexte und Tabellen plus Werkstatt; Material/Lösungen unabhängig geprüft. Weiterarbeit an den im Register belegten praktischen Haushaltslücken, danach Musik/Deutsch/Englisch jahrgangsweise abgleichen. Keine fachübergreifende Freigabe oder Veröffentlichung behauptet.

### 08.09.2026 – Projektabrechnung für Ernährung und Haushalt

Vorheriger Zielturn war Umsetzungsfortschritt; aktuelles Projektkapitel vor Bearbeitung erneut gelesen. eh_4_projekt Revision 1 enthält jetzt einen vollständigen fiktiven Belegsatz für sechs Rezeptportionen: fünf Zutaten, Anfangsvorräte, Bedarf und Packungsgrößen, geplante und tatsächliche Preise, Kassenbeleg, Geld-/Sachvorratsabrechnung sowie Entscheidung und Vergleichslösung. Einkauf 9,90 €, Plan 9,30 €, Budget 12,00 €, Rest 2,10 €. Preise ausdrücklich unabhängig vom vorhandenen Verbrauchskostenplaner. Drei neue Verständnisfragen; alte Lernerfolge werden als veraltet erkannt.

Haushaltstest prüft sieben Kapitel/Arbeitsblätter mit jetzt 34 Fragen, insgesamt 18 Antwortwegen der beiden neuen Abschnitte, unabhängig errechneten Packungszahlen und Endvorräten sowie Ausschluss der Vergleichslösung aus dem Aufgabenmaterial. Werkstatt-Arbeitsblätter, vollständiger Quizpool, übersetzte Titel/Suche und Revisionen gezielt bestanden. Kein neuer Gesamtlauf aller 143 Suiten; keine Browserprüfung oder Veröffentlichung. Nächste Inhaltslücken bleiben Ernährungsprotokoll, differenzierter Qualitätsvergleich und weitere praktische Küchentechniken.

### 08.09.2026 – Lernbereich über mehrere Tabs

Die bisherige storage-Behandlung zeichnete nur die Oberfläche neu; Sprache und ausgewählte Kapitel blieben im alten Arbeitsspeicherzustand. Der Lernbereich liest jetzt die aktuellen relevanten Speicherwerte nach. Lokale Stofflisten übernehmen Auswahl und Reihenfolge, veraltete erzeugte Freigabelinks werden ausgeblendet. Explizite plan-URLs behalten ihren eigenen Stoff; Sprache und Farbschema werden auch dort aktualisiert. Ungültige oder gesperrte Speicherung verwirft die nutzbare Ansicht nicht; fremde sessionStorage-Ereignisse und nicht relevante Entwurfsänderungen werden ignoriert.

Neuer Test test_learning_cross_tab.js prüft Aktualisierung, Löschung, Gesamtlöschung, ungültige Daten, verspätete Ereignisse, Fokus/Filter, unbekannte Kapitel im geteilten Link und stabile explizite Listen. Fünf bestehende Suiten zu Lernabläufen, Speicherausfall, englischem Einstieg, Linkwarnungen und übersetzter Suche ebenfalls bestanden. Ein neuer gemeinsamer Lauf aller jetzt 144 Suiten wurde gestartet; Ergebnis erst nach seinem Abschluss eintragen.

Abschluss des gestarteten Gesamtlaufs: 2026-09-08T15:37:59.628Z, 144/144 bestanden. Keine Produktcodeänderung nach diesem Lauf. Weiterhin keine Browser-/Geräte-/Druckabnahme oder Veröffentlichung.

### 08.09.2026 – Musiknotation und aktueller Fachabgleich

Musik-Fachlehrplan vollständig und alle sieben Kapitel gelesen. Eigene Notenvorlage c′–d′–e′–g′, praktische Lese-/Spiel-/Schreibaufgabe und drei Fragen ergänzt; musik_2_notation Revision 1, Schulstufen 5/6. Sieben Musik-Arbeitsblätter mit statischer Notenvorlage und vollständigen Text-/Werkstattaufträgen. Sechs gezielte Suiten bestanden. MUSIK_LEHRPLANABGLEICH.md benennt verbleibendes konkretes Repertoire, Tanz, Harmonik, Kontext- und Medienarbeit; der Fachauftrag bleibt offen.

### 08.09.2026 – angeleitete Tanzfolge

musik_1_stimme_rhythmus Revision 1: eigene Zweitaktfolge mit sitzender Variante, passender Klanglabor-Begleitung, Variation, A–B–A und Beobachtungsbogen; drei neue Fragen. Musiktest prüft 34 Fragen, insgesamt 18 neue Antwortwege und Übereinstimmung von Bewegungsschlägen und Audiozeitplan; Tabellen erscheinen im Arbeitsblatt. Musik, Werkstatt-Arbeitsblätter, übersetzte Titel/Suche und Quizpool gezielt bestanden. Fachmatrix aktualisiert. Regionales/internationales Repertoire, Hör-/Liedbeispiele, weitere Inhalte und Veröffentlichung bleiben offen. Der frühere vollständige 144/144-Lauf liegt vor diesen Musikergänzungen.

### 08.09.2026 – lokaler Hörvergleich

musik_1_hoeren Revision 1: drei eigene elektronische WAV-Lernfassungen des Freude-Themas, Quellenkontext Beethoven-Haus, Hörprotokoll, Nachsingen/Nachspielen, drei neue Fragen. Dateiformat, alle 45 Tonhöhen, Längen und Rhythmusabweichung direkt am PCM geprüft. Native Hördateien und Klanglabor unterbrechen einander, pausieren bei verdeckter Ansicht und starten nicht automatisch; Fehlerhinweis und Lesealternative vorhanden. Musik-, Audiodatei-, Werkstatt-, Such- und Quizprüfungen gezielt bestanden. Jetzt 145 vorhandene Testsuiten; letzter gemeinsamer Gesamtlauf bleibt 144/144 vor den Musikergänzungen. Tatsächliches Abhören/Browserprüfung, vielfältiges Repertoire und Veröffentlichung weiterhin offen.

### 08.09.2026 – unbekannte Kapitel in gespeicherten Stofflisten

Vorheriger Zielturn war Fortschritt. Aktuelle Speicherung und Tests wurden gelesen: Unbekannte Kapitel wurden bisher zwar im geteilten Link erhalten, aber beim lokalen Speichern verworfen. Speicherung/Neuladen und Tab-Synchronisierung behalten sie jetzt bei. Fehlende Kennungen erscheinen als sicherer Text mit einer expliziten Entfernen-Aktion; alte Freigabelinks werden nach Änderungen ausgeblendet. Listen, die ausschließlich fehlende Kapitel enthalten, können zur Klärung geteilt werden. Ein vollständig unbekannter importierter Link überschreibt die bisherige gespeicherte Liste weiterhin nicht.

Gezielte Tests prüfen Wiederherstellung, erneutes Teilen, Entfernen/Fokus, unbekannte Änderungen bei unveränderten bekannten Kapiteln, Duplikate, HTML-Zeichen als Text, vollständig ungültige und leere Links, Speicherfehler, Sprache, Tab-Wechsel, Reihenfolge und Lehrkraftansicht. Betroffene Suiten bestanden. Kein neuer gemeinsamer Gesamtlauf nach dem früheren 144/144-Stand; 145 Suiten vorhanden. Inhalts-/Sprachvollständigkeit, Browserprüfung und Veröffentlichung bleiben offen.

### 08.09.2026 – vollständige Textmaterialien auf Sprach-Arbeitsblättern

Vorheriger Zielturn war Fortschritt. Bei der erneuten Sichtung der Sprachkapitel und Arbeitsblatt-Auswahl zeigte sich: Deutsch/Englisch druckten bisher Werkstatt und Quiz ohne die zugehörigen Abschnittstexte. Alle elf Deutsch- und neun Englisch-Arbeitsblätter übernehmen jetzt auch vollständige Lesetexte, Erklärungen und Abschnittslinks. Gedruckte Hörübungen erklären das Abdecken aller Textfassungen und eine ausdrücklich gekennzeichnete Lesealternative; Hör-/Lesetexte der Werkstatt erhalten die passende Sprachkennung. Aufgabenmaterial und Lösungen sind unabhängig schaltbar.

Neue Suite test_language_worksheets.js prüft alle 20 Kapitel, textgetreue Blockzitate, Sprachattribute, Aufgaben und Ausschluss privater Entwürfe sowie Vergleichslösungen. Dazu Werkstatt-, allgemeine, Musik-, Haushalts- und Physik-Arbeitsblattprüfungen bestanden. Jetzt 146 Testsuiten; der letzte gemeinsame Lauf (144/144) stammt aus dem Stand vor den Musik- und jüngsten Ablaufänderungen. Keine vollständige Deutsch-/Englisch-Lehrplanabdeckung oder visuelle Druckabnahme aus diesem Materialnachweis ableiten. Gesamtauftrag bleibt offen.

### 08.09.2026 – Deutsch: eine Überarbeitung tatsächlich durchführen

Vorheriger Zielturn war Fortschritt. Aktuelles Kapitel deutsch_1_schreiben vollständig erneut gelesen und auf Revision 1 angehoben: schwacher eigener Übungsentwurf zum vorhandenen Bim-Text, vier Prüfgänge, Schreibkonferenz mit konkreten Rückmeldungen, zwei begründete Änderungen und aufklappbare Vergleichsfassung. Drei zusätzliche Verständnisfragen; acht absurde oder wenig brauchbare Distraktoren der vier alten Aufgaben durch plausible Verwechslungen ersetzt. Freie Texte bleiben ohne automatische Benotung.

Gezielte Tests bestanden: alle elf Deutschkapitel (47 Fragen), alle 21 Antwortwege des überarbeiteten Kapitels, 20 Sprach-Arbeitsblätter inklusive Entwurf/Prüftabelle und Ausschluss der Vergleichsfassung, 65 Werkstatt-Arbeitsblätter, übersetzte Suche und vollständiger Quizpool. Kein neuer gemeinsamer Gesamtlauf; 146 Suiten vorhanden. Der vollständige Deutsch-Lehrplanabgleich und weitere Sprach-/Fachinhalte, Browserprüfung sowie Veröffentlichung bleiben offen.

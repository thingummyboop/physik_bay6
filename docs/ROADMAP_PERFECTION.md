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

## Phase 2: Math

- Erst Mathematikthemen mit hohem Förderbedarf priorisieren: Brüche, Dezimalzahlen, Gleichungen, Prozent.
- Pro Thema: ein Mini-Ziel, ein Beispiel, ein geführter Versuch, ein schneller Check.
- Falschantworten nach typischen Fehlern erklären, nicht nur als falsch markieren.

P2-Math Fortschritt (Run 2026-04-27 18:34):
- Themen **math1_9_dezimalzahlen** und **math2_6_prop_prozent** mit diagnoseorientiertem Antwortfeedback nachgezogen.
- Abgedeckt: 6 Fragen mit insgesamt 14 Antwortoptionen.
- Qualitätssicherung: Implementieren → Review → Patch mit Vollständigkeitscheck (`0/14` fehlende Feedbackfelder).
- Ergebnis: Lernende erhalten nun bei typischen Rechenfehlern (Kommafehler, Prozentverwechslung, Proportionalität) direkte Korrekturhinweise.

## Phase 3: Other Subjects

- Digitale Grundbildung, Wetter, Klima und Klimawandel danach angleichen.
- Begriffe reduzieren, Beispiele lokalisieren, Leselast senken.
- Gemeinsame Qualitätskriterien für Sprache, Feedback, Accessibility und Interaktion dokumentieren.

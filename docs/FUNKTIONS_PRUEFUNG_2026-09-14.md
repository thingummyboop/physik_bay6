# Funktionsprüfung und gefundener Inhaltsfehler am 14.09.2026

Ausgangspunkt: Commit `b154b4e676cae579254915456badc379fead4705` plus die lokalen Stofflisten-Korrekturen aus [STOFFLISTEN_KAPITELLINKS.md](STOFFLISTEN_KAPITELLINKS.md). Der vorherige Zielturn war Fortschritt: native und gedruckte Kapitelverweise erhalten den Listenbezug.

## Vollständiger Lauf des vorhandenen Funktionstestbestands

`node scripts/run_functional_tests.js` beendete alle **182 von 182** gefundenen `test_*.js`-Suiten erfolgreich. Bericht `../functional-test-report.json`, Abschluss `2026-09-14T02:25:33.658Z`, summierte Laufzeit 354.594 ms. Es gab keine ausgelassene oder abgebrochene Suite. Der Runner führt jede Datei in einem eigenen Node-Prozess aus und bewahrt Ausgaben und Fehler auf.

Dieser Lauf schließt die zuletzt nur einzeln geprüften Astronomie-, Chemie- und Stofflistenänderungen ein. Die anschließend unten beschriebene Saturnkorrektur und ihre neuen unabhängigen Erwartungen wurden danach gezielt geprüft; es wurde kein zweiter Gesamtlauf behauptet.

Zusätzliche abgeschlossene Prüfungen:

| Prüfung | Ergebnis | Tatsächliche Aussagegrenze |
| --- | --- | --- |
| `audit_all_chapter_renders.js` | 197 von 197 deutschen Navigationskapiteln aufgebaut; keine fehlenden Lernziele/Zusammenfassungen oder ungelösten Quizmarker | Gemeinsamer Renderer in JSDOM; keine vollständige Ausführung aller Kapitelskripte, keine Bildschirmdarstellung |
| `audit_topic_syntax.js` | 87 Kapitelskripte syntaktisch gültig | Syntax, keine inhaltliche oder funktionale Aussage |
| `audit_quiz_feedback.js` | 5.507 strukturierte Fragenrecords in sieben JSON-Dateien ohne Datenstrukturfehler | Vorhandene Inhalte nur gelesen; keine Übersetzungen erstellt und keine sprachliche/fachliche Gleichwertigkeit bewiesen |
| `audit_learning_depth.js` | In 197 Kapiteln keine Treffer auf die festgelegte Liste generischer Rückmeldungen und keine gleichlautenden bewerteten Doppelrecords | Suche nach bekannten Mustern; kein Nachweis guter Erklärungen oder fachlicher Wahrheit |

Die Arbeitsblattsuiten prüfen unter anderem Abschnittsinhalte, getrennte Lösungen, Quizpools, Materialschalter und ausgeschlossene persönliche Entwürfe. Die Gruppen von 95 STEM-, 21 DGB-, 20 Physik-, 20 Sprach- und 65 Werkstattblättern überlappen. JSDOM und ein MathJax-Testdouble beweisen weder den tatsächlichen Formelsatz noch vollständiges Drucklayout. Die vorhandenen gesonderten Browser-/Druckberichte bleiben dafür maßgeblich.

## Weshalb grüne Funktionstests keine fachliche Freigabe sind

Bei der Sichtprüfung des tatsächlichen GitHub-Pages-Screenshots fiel `astro_s15_saturn_p1` auf: Der richtige Quellenvergleich war als falsch markiert, das ungeprüfte Verwerfen einer älteren Angabe als richtig. Die Rückmeldung zur angeblichen Neuentstehung von Monden sprach stattdessen von Schriftgröße. Die technische Verbindung von Antwort, gespeichertem Wahrheitswert und gespeichertem Feedback funktionierte dabei genau wie programmiert. Deshalb bestanden die bisherigen Tests trotz des Inhaltsfehlers.

Alle 87 Fragen des aktuellen Astronomiekapitels einschließlich ihrer 261 Optionen, Wahrheitswerte und Rückmeldungen wurden anschließend auf solche widersprüchlichen Zuordnungen durchgesehen. Kein weiterer gleichartiger Befund. Das ist keine erneute vollständige astronomische Quellenprüfung sämtlicher Aussagen.

Die drei Saturnoptionen bilden jetzt wieder vollständige zusammenpassende Einheiten:

- Bezugsdaten, Definitionen und bestätigte Entdeckungen vergleichen: richtig; die Erklärung verlangt zu prüfen, was für welchen Zeitpunkt gezählt wurde.
- Ältere Angabe ohne Prüfung verwerfen: falsch; sie kann für ihren Bezugszeitpunkt richtig sein.
- Zusätzliche bekannte Monde mit neu entstandenen Monden gleichsetzen: falsch; Entdeckung/Bestätigung und Entstehung sind zu unterscheiden.

Erneut unmittelbar gelesene Primärquellen: [NASA Saturn Facts](https://science.nasa.gov/saturn/facts/) nennt 274 bestätigte Monde mit Bezug März 2025; [NASA Saturn Moons](https://science.nasa.gov/saturn/moons/) nennt 293 für August 2026. Die Unterschiede bleiben als datierte Quellenaufgabe erhalten. Die Übung ist `practiceOnly`; der bewertete Pool von 41 Fragen und Kapitelrevision 4 bleiben unverändert.

`test_astronomy_question_feedback.js` verlangt jetzt unabhängig von den Quelldaten, dass die drei genannten Antworttexte fachlich richtig bzw. falsch gewertet werden und eine zur jeweiligen Aussage passende Begründung enthalten. Diese Ergänzung scheiterte vor der Datenkorrektur tatsächlich an `false !== true` und bestand danach. Der anschließende vollständige Astronomietest prüfte außerdem wieder alle 261 Übungswege und 123 bewerteten Antwortwege, Wiederholungsabschnitte, Speicherung und Papierlösungen.

Auch `browser_astronomy_questions.js` enthält diese drei unabhängigen Erwartungen. Lokaler Abschluss `2026-09-14T02:26:56.348Z`: alle 261 nativen Übungsklicks plus die drei zusätzlichen Quellenfälle bestanden, vollständiger 41-Fragen-Versuch mit 98 % und passendem Wiederholungsabschnitt, drei Bildschirmbreiten ohne Überlauf und keine Browserfehler. Die richtige und die falsche Quellenantwort wurden anschließend als tatsächliche Screenshots gelesen. Bericht und Bilder: `../browser-qa/saturn-feedback-fixed/`.

## Veröffentlichten Zwischenstand getrennt geprüft

Die öffentliche Startseite antwortete mit HTTP 200. Sieben abgerufene Dateien (`index.html`, `lang/de.json`, Kapitelrevisionen, Astronomie-/Chemie-Kapitelskripte, Haupt-CSS und Arbeitsblatt-HTML) stimmten nach alleiniger Normalisierung von CRLF zu LF mit Commit `b154b4e` überein. SHA-256-Vergleich in `../pages-file-check.json`, `2026-09-14T02:21:50.073Z`.

Fünf vorhandene Chromium-Skripte liefen ausdrücklich gegen `https://thingummyboop.github.io/physik_bay6`: Sonnensystem (48 Zustände), Trennplanung (140 Kombinationen), Astronomiebilder (22 Bilder in 132 Layoutzuständen), Bahnmodelle (neun Keplerzeiten/sechs Fälle) und Astronomiefragen (261 Übungsantwortwege). Alle technischen Prüfungen bestanden; Bericht `../pages-browser-checks.json`, `2026-09-14T02:23:27.222Z`, Einzelberichte unter `../browser-qa/pages-b154b4e/`. Fünf ausgewählte Live-Screenshots wurden gelesen. Gerade dabei wurde der oben beschriebene Inhaltsfehler gefunden.

Die GitHub-API meldete zuletzt einen erfolgreichen Pages-Lauf mit anderer Head-SHA; daher wird daraus keine Identität des gesamten Deployments abgeleitet. Belegt sind die sieben tatsächlich verglichenen Dateien und die tatsächlich ausgeführten Browserwege. Weder die gesamte veröffentlichte Website noch alle 197 Kapitel wurden im Live-Browser abgenommen.

Die Stofflisten- und Saturnkorrekturen sind weiterhin lokal; in dieser Prüfrunde kein neuer Push. Der bekannte Saturnfehler ist damit nicht als auf GitHub Pages behoben behauptet. Der Gesamtauftrag bleibt offen, insbesondere vollständige fachliche und curriculare Abdeckung, übrige Darstellungs-/Bedienwege und abschließende Veröffentlichungsprüfung. Übersetzungen bleiben zurückgestellt.

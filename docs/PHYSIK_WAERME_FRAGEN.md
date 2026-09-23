# Wärmelehre: vollständiger Abgleich der gespeicherten Fragen

Stand: 23.09.2026, lokale Weiterarbeit nach `5a9c125`. Alle 29 deutschen Fragen mit sämtlichen Antwortmöglichkeiten und Rückmeldungen wurden gelesen. Dabei enthielten ältere Fragen noch Scherzantworten wie Pumpen im Thermometer oder Wärmeleitung entlang von Meteoriten. Einzelne Formulierungen verwendeten „Hitze“ wie einen wandernden Stoff oder verbanden sichtbare Farbe zu pauschal mit Strahlungsaufnahme.

## Änderungen in Revision 5

13 bestehende Fragen sind neu ausgearbeitet: `q3`, `q5`, `q6`, `f2`, `f4`, `f5`, `f6`, `f7`, `f8`, `f10`, `f12`, `f13`, `f15`. Jede besitzt drei begründete Alternativen. IDs, sieben Abschnitte, Versuche und Zahl der Kapitelcheckfragen bleiben erhalten. Revision 5 kennzeichnet frühere Ergebnisse als überholt, ohne deren Daten zu löschen.

- Reflexion und Absorption werden an gleichen, undurchsichtigen Platten mit vorgegebenem Reflexionsunterschied erklärt. Daraus wird keine genaue Endtemperatur oder allgemeine IR-Eigenschaft weißer Materialien abgeleitet.
- Die trocknende Pfütze unterscheidet Verdunsten unterhalb der Siedetemperatur von Sieden und Kondensieren.
- Bewegungsfugen erlauben Längenänderungen; sie verhindern weder die Temperaturänderung noch alle möglichen Schäden.
- Teilchenbewegung wird für ein gasförmig bleibendes Gas im Mittel beschrieben. Ausdehnung eines festen Metallstabs wird über mittlere Abstände erklärt, nicht über wachsende oder neu entstehende Teilchen.
- Leitung, Strömung und Strahlung werden an konkreten Energieübertragungen unterschieden. Poröse Dämmstoffe begrenzen auch größere Luftströmungen.
- Schmelzen verbindet Energieaufnahme und Zustandswechsel mit einer unter angegebenen Bedingungen ungefähr gleichbleibenden Temperatur.
- Das Flüssigkeitsthermometer nutzt die stärkere Volumenausdehnung der Flüssigkeit gegenüber dem Gefäß und die dünne Kapillare.

## Prüfnachweise und Grenzen

`scripts/fixtures/thermal_assessment_keys.json` hält die nach inhaltlicher Lektüre erwarteten Lösungen aller 29 Fragen unabhängig von den gespeicherten `correct`-Markierungen fest. `test_thermal_assessment.js` prüft alle 87 bewerteten Antwortwege sowie alle 42 freien Antwortwege, jede Rückmeldung, Wiederholungs-IDs, Revision 5 und die Übernahme sämtlicher Fragen und Lösungen in die getrennte Papierfassung.

Bestehende Prüfungen bestanden: `test_thermal_inquiry`, `test_thermal_concepts`, `test_physics_worksheets`, `test_complete_chapter_quizzes`, `test_chapter_revisions`, `test_translation_revisions`. Nur die zwei versionsgebundenen Prüfungen für die unveränderten Wärmeversuche wurden auf Revision 5 angehoben; ihre Versuchs-, Ergebnis- und Papierprüfungen bleiben bestehen. Zusammen sieben gezielte Suiten einschließlich des neuen Fragentests.

`browser_thermal_assessment.js` bestand am 23.09.2026 um 18:36:00 UTC mit Chromium 151.0.7922.34: sechs Ansichten (320, 390, 1280 px, hell/dunkel), alle 42 freien Antworten per Tastatur und alle 87 bewerteten Antworten mit unabhängig festgehaltenen Lösungen. Freies Üben verändert den Speicher nicht; Ergebnisse enthalten Revision 5 und die jeweils richtige Wiederholungs-ID. Keine Browserfehler. Mobile Reflexionsfrage mit Rückmeldung und Desktopfrage zum Schmelzen visuell gelesen.

Die Druckprüfung erzeugte eine getrennte Schüler- und Lösungsfassung. In der 34-seitigen Lösungsfassung wurden alle geänderten Fragen und Lösungen auf 15 Seiten visuell geprüft: 16, 19–27 und 29–33. Fragen, Optionen, Schreibraum und zugehörige Lösungen bleiben lesbar zusammen. Die ersten 27 Seiten stimmen textlich mit der Schülerfassung überein; Lösungen beginnen erst auf Seite 28. Die übrigen Erklärungs-/Versuchsseiten wurden in diesem Schritt nicht erneut visuell abgenommen. Artefakte und Laufbericht: `../browser-qa/thermal-assessment/`.

Der Inhalt der Fragen ist vollständig in diesem Kapitel geprüft, nicht jede ältere Modellgrafik oder jedes Experiment neu abgenommen. Die eigenen Schulversuche wurden nicht physisch durchgeführt. Die anderen fünf Viertklasskapitel besitzen noch keinen entsprechenden neuen vollständigen Fragenabgleich. Bei Wetter wurden bereits zwei wenig hilfreiche Ablenker festgestellt: die blaue Wasserfarbe bei Dichte und die Behauptung, der Golfstrom sei die einzige Meeresströmung. Diese und die übrigen älteren Fragen sind der nächste konkrete Qualitätsschritt.

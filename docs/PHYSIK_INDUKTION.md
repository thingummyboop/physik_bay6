# Elektromagnetismus: Induktion, Untersuchungen und Verständnisfragen

Stand 16.09.2026, 3. Klasse / 7. Schulstufe. Die Induktionswerkstatt und erste Transformatorreparaturen wurden mit 654367e gesichert. Die folgenden Ergänzungen nach diesem Commit bleiben lokal. Kapitelrevision jetzt 5.

## Inhalt und Lernweg

Sieben Abschnitte bleiben erhalten: Permanentmagnete → Leiterfeld → Spule → Relais → Kraftwirkung/Motor → Induktion/Generator → Transformator. Die elf verbliebenen Abschlussfragen sind jetzt den passenden Abschnitten zugeordnet. Alle 27 Fragen stehen damit auch als Übungen im Lernweg bereit; bei Fehlern führt die Wiederholung zu einem konkreten Abschnitt. Bestehende Frage-IDs bleiben erhalten, Ergebnisse aus Revision 4 gelten nicht als aktueller Nachweis.

16 bisher überwiegend zweistufige Auswahlfragen überarbeitet: Beobachtung statt historischer Namensabfrage, Leiterfeld gegenüber Erdmagnetfeld, kontrollierter Kernvergleich, Umkehr der Spulenpole, Windungszahl bei gleicher Stromstärke, getrennte Relaiskreise, Energieerhaltung beim Motor, Kraftumkehr und Windungsverhältnis. Jede Frage besitzt jetzt drei individuell begründete Optionen. Die elf bereits bearbeiteten Fragen sind ebenfalls in die vollständige Prüfung aller 81 Antwortmöglichkeiten einbezogen.

Zwölf zusätzliche Arbeitsaufträge in den Abschnitten Leiterfeld, Spule, Relais und Motor verbinden Vorhersage, Modellvergleich und Begründung. Vier Papieralternativen liefern ausdrücklich vorgegebene qualitative Modellbeschreibungen; vier getrennte Vergleichslösungen ergänzen sie. Das Relais schaltet den getrennt versorgten Lastkreis und liefert nicht dessen Energie. Die Aussage „Maximum“ beim Eisenkern wurde durch eine begrenzte qualitative Beschreibung ersetzt.

## Induktionsmodell und Transformator

Die bereits enthaltene Induktionswerkstatt vergleicht 24 Fälle: zwei Pole, Ruhe/hinein/heraus, zwei Tempostufen und offener/geschlossener Lastkreis. Die Anzeige zeigt qualitative Ausschläge, keine gemessenen Voltwerte. Nur Bewegungs- oder Polumkehr allein kehrt das Vorzeichen um; die Anschlusskonvention ist festgelegt. Laststrom benötigt zusätzlich einen geschlossenen Weg. Die Zeichenstufen sind keine quantitative Geschwindigkeits- oder Spannungsrechnung.

Papiermaterial unterscheidet sechs vorgegebene Modellfälle von sechs leeren Zeilen für eigene Beobachtungen. Vier Modellaufträge, vier Schritte für einen betreuten Schulversuch und Hinweise zu Messbereich, Wiederholung und kurzen Ausschlägen sind vorhanden. Ohne Geräte bleiben die eigenen Beobachtungen leer. Der Schüttellampenspeicher zeigt weiterhin ein vereinfachtes Energiemodell und ersetzt keine Induktionsrechnung.

Transformator: zehn Windungsstellungen, U₂ = 230 V · N₂/5. Beide Balken verwenden dieselbe Skala. Die früher auf SVG-Text angewandte falsche Aktualisierung wurde schon vor dem Zwischenstand korrigiert. Die anschließende mobile Sichtprüfung zeigte zu kleine Beschriftungen: Windungszahl und Spannungen stehen nun in normal großem HTML-Text. Das unbelastete Schema enthält keine animierten Strompunkte; die gestrichelte Linie behauptet keine umlaufenden Ladungen. Papieraufgaben vergleichen drei Spannungen und Balkenhöhen sowie eine ausdrücklich getrennte Rechnung bei 46 W übertragener Leistung.

## Quellen

Grundlage bleibt der dokumentierte österreichische Mittelschullehrplan mit qualitativem Untersuchen von Motor und Generator sowie Planen, Auswerten und Dokumentieren von Versuchen. Diese Einzelarbeit ist kein neuer vollständiger Lehrplanabgleich.

Am 16.09.2026 fachlich herangezogene Quellen:

- [LEIFIphysik: Ørsted-Versuch](https://www.leifiphysik.de/elektrizitaetslehre/stromwirkungen/versuche/orsted-versuch)
- [LEIFIphysik: Magnetfeld einer Zylinderspule](https://www.leifiphysik.de/elektrizitaetslehre/magnetisches-feld-spule/grundwissen/magnetfeld-einer-zylinderspule)
- [LEIFIphysik: Relais](https://www.leifiphysik.de/elektrizitaetslehre/stromwirkungen/ausblick/relais)
- [LEIFIphysik: Induktion im Schülerversuch](https://www.leifiphysik.de/elektrizitaetslehre/induktion-und-transformator/versuche/induktion-schuelerversuch)
- [OpenStax: Motoren, Generatoren und Transformatoren](https://openstax.org/books/physics/pages/20-2-motors-generators-and-transformers)
- [OpenStax: Transformatoren](https://openstax.org/books/college-physics-2e/pages/23-7-transformers)

Die Aufgaben und Diagramme sind eigene Unterrichtsdarstellungen; reale Versuchsergebnisse werden nicht vorgetäuscht.

## Nachweise und verbleibende Grenzen

- `test_electromagnetism_questions.js`: alle 27 Fragen mit 81 unabhängig festgelegten Antworterwartungen, Rückmeldungen, Prozentständen, Wiederholungs-IDs, sieben Abschnittszuordnungen und Revision 5 bestanden. Zusätzlich zwölf Untersuchungsaufträge, vier Papieralternativen, getrennte Lösungen, drei Transformator-Papierfälle und zehn lesbare Transformatorzustände geprüft.
- `test_induction_learning.js`: 24 Modellfälle, 72 Klassifikationen, 24 unabhängig erwartete Antwortwege für die acht Induktions-/Leistungsfragen, zehn Balkenverhältnisse, ungültige Eingaben, Fokus/Neustart und Unterrichtsprotokolle bestanden. `test_electromagnetism_concepts.js` prüft zusätzlich Magnetpole, Leiterkraft, Feld bei Strom null und Relaiszustände.
- `browser_induction_learning.js`: nativer Bericht 2026-09-16T13:10:24.023Z, Chromium 151.0.7922.34. Alle 81 Antworten per Tastatur, 24 Modellfälle/72 Entscheidungen, zehn Transformatorstellungen, Neustart, Schüttellampenbedienung, 18 Layoutfälle (320/390/1280 px, hell/dunkel, drei Bewegungen), Tabellen-Scrollen und sieben 96-Prozent-Kapitelchecks mit passenden Wiederholungszielen bestanden. Keine Seitenfehler. Die mobilen Transformatoransichten wurden in beiden Designs tatsächlich gelesen.
- Aktualisierte A4-Ausgabe mit Lösungen: 32 Seiten. Seiten 3–11, 17–20, 25, 31 und 32 gerendert und gelesen. Anschließend ausschließlich den unbewerteten Relaisauftrag zur Wirkungskette beim Ausschalten präzisiert. Erneuter Druckexport am 16.09.2026 um 13:12:17 UTC, betroffene Seite 5 erneut gelesen; die übrigen zuvor gelesenen Seiten erneut gerendert und als bildidentisch verifiziert. Keine Sichtprüfung sämtlicher Druckseiten.
- Alle 20 Physikarbeitsblätter, Physik-Lernziele/Vorwissen, Lern-/Stofflistenweg, Syntax und Diff-Prüfung gezielt bestanden. Inventar: 197 Kapitel, Prioritätsaudit: 1610 Frageninstanzen ohne strukturellen Befund. Kein neuer vollständiger Suitenlauf.

Noch offen sind die vollständige Prüfung der übrigen Kapitelbestandteile und Modelle, ein anschaulicherer vollständiger Motor-/Relaisaufbau, die praktische Unterrichtserprobung, reale Mobilgeräte/Screenreader sowie die Gesamtprodukt- und vollständige Lehrplanabnahme aller vorhandenen Fächer. Die Einteilung von Grundstoff und Vertiefung ist weiterhin ein übergreifender offener Punkt. Übersetzungen bleiben zurückgestellt. Kein erneuter Push oder Nachweis einer aktualisierten GitHub-Pages-Fassung in diesem Arbeitsschritt.

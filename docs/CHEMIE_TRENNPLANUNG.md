# Gemische trennen: Planen, begründen und prüfen

Stand 14.09.2026, `chemie_trennverfahren`, Revision 2. 4. Klasse Mittelschule. Übersetzungen zurückgestellt.

## Ergebnis

Die bisherige Auswahl von drei Gemischen zeigte sofort eine Musterlösung. Der neue Trennplaner verlangt eine eigene Entscheidung zu Trennziel, Ablauf und Stoffeigenschaft. Vier Aufgaben unterscheiden Sand-/Salzgewinnung, zusätzliche Wasserrückgewinnung, trockene Eisen-/Quarzsandtrennung und Untersuchung einer Farbprobe. Sieben mögliche Pläne und fünf Begründungsprinzipien ergeben 140 Kombinationen. Ausgangsstoffe und Bedingungen sind ausdrücklich vorgegeben; Aussagen über alle Sandarten oder alle Metalle werden vermieden.

Jedes der 28 Fall-/Plan-Paare erhält eine eigene Erklärung. Verfahrensprinzip und Erfüllung des Ziels werden getrennt rückgemeldet. Für Sand und Salz akzeptiert der Planer sowohl Eindampfen als auch Destillation nach Lösen und Filtration; zusätzliche Wasserrückgewinnung wird als Mehraufwand eingeordnet. Wenn Wasser Teil des Ziels ist, reicht bloßes Eindampfen nicht. Die Darstellung ist eine qualitative Planung, kein virtueller Messversuch und keine Heizungsanleitung.

Native Auswahlfelder haben kurze, auf schmalen Bildschirmen lesbare Bezeichnungen. Die vollständige gewählte Beschreibung erscheint vor der Prüfung darunter. Änderungen entfernen alte Auswertung; Reset behält das Trennziel, leert die Entscheidungen und setzt den Fokus auf den Plan. Keine Speicher- oder Punktänderung durch die Werkstatt. Der bisherige Auswahltyp bleibt für unveränderte übersetzte Kapitel vorhanden.

Papieralternative mit vier Fällen, sieben Plänen und eigenem Planungsprotokoll. Vier Auswertungsaufträge erscheinen einmal; Musterlösung getrennt. Der bestehende Schulversuch ergänzt Vorhersage, eigene Beobachtung und Deutung an vier Stellen im Ablauf. Ohne tatsächlichen Versuch bleiben die Beobachtungen leer. Feuchtigkeit, verbliebene Salzlösung und feine Teilchen werden als Grenzen einer bloß sichtbaren Trennung erklärt. Der vorhandene Versuchsablauf wurde nicht durch einen neuen Versuch ersetzt.

Zwei vorhandene Fragen präzisiert, zwei neue Transferfragen zu Wasserrückgewinnung und Reinheit ergänzt. Eine Magnetfrage steht jetzt bei der passenden Planungsaufgabe. Neun bewertete Fragen; frühere Ergebnisse aus Revision 1 gelten als veraltet.

## Quelle

[RSC/Nuffield: Separating sand and salt by filtering and evaporation](https://edu.rsc.org/experiments/separating-sand-and-salt-by-filtering-and-evaporation/386.article), am 14.09.2026 per direktem HTTPS-Abruf mit HTTP 200 gelesen, nachdem der Webabruf HTTP 405 lieferte. Material, Ablauf, Sicherheits- und Lehrerhinweise sowie Fragen zu verbleibenden Verunreinigungen geprüft. Der Quelltext unterscheidet feuchte Proben und weitere Reinigung/Trocknung. Die ungenaue Bezeichnung des Lösens als „reversible reaction“ in einem Primarschulabsatz wurde nicht übernommen. Das Kapitel behandelt das Lösen/Filtrieren von Kochsalz als physikalische Vorgänge, getrennt von chemischer Zerlegung.

Die Quelle und die vorhandenen Kapitelgrundlagen stützen die qualitativen Eigenschaften; die neue Planungsaufgabe ist eigene didaktische Ausarbeitung. Kein tatsächlich durchgeführter Versuch, keine Stoffreinheitsbestimmung und keine Gesamtfreigabe aller praktischen Bedingungen behauptet.

## Prüfung

- Aktualisierter `test_chemistry_separation.js`: 140 Entscheidungen mit unabhängig vorgegebenen gültigen Plänen und Eigenschaften, alle 28 individuellen Ergebnisbegründungen, Eingabelücken, Bearbeiten/Reset/Fokus, wiederholte Initialisierung, keine Modellspeicherung. Alle 27 Antwortwege der neun Kapitelcheckfragen, 100/89-Prozent-Auswertung, Revision und gezielte Wiederholungs-IDs. Alter Auswahltyp weiterhin funktionsfähig. Papieraufträge, Protokolle und Lösungstrennung geprüft.
- Alle 15 vorhandenen Chemie-Suiten bestanden, Bericht `../chemistry-planner-tests.json` vom 2026-09-14T02:00:10.182Z. Danach nur begrenzte Vorschau-/Papierdarstellung nachgebessert und den betroffenen Trennplanungstest erneut ausgeführt. 95 Mathematik-/Chemie-/Biologie-Arbeitsblätter bestanden. Kein vollständiger Lauf aller 182 Funktionstests.
- `browser_chemistry_separation.js`: Chromium 151.0.7922.34, Bericht vom 2026-09-14T02:04:37.667Z. Alle 140 Kombinationen mit nativen Auswahlfeldern und Prüfklicks, freie Korrektur, Reset/Fokus, unveränderte Modellspeicherung. Vollständiger Neun-Fragen-Versuch mit 89 % und passendem Wiederholungsabschnitt zur unsicheren Reinheitsfrage. Breiten 320/390/1280 ohne Seitenüberlauf; keine Browserfehler.
- Mobile richtige/falsche Auswahl und dunkler Zustand sowie Desktopansicht als Screenshots gelesen. Die zuerst abgeschnittenen Auswahltexte wurden durch kurze Bezeichnungen plus vollständige Vorschau behoben. A4-Export mit zehn Seiten: Seiten 2–4 und 10 gelesen. Doppelte Auswertungsaufträge entfernt; Versuchsüberschrift und zugehörige Tabelle beim Seitenwechsel zusammengehalten und erneut visuell geprüft. Nicht alle zehn Seiten vollständig visuell abgenommen.

## Offene Gesamtarbeit

Die Aufgabe stärkt begründete Verfahrenswahl und die Unterscheidung zwischen Beobachtung und Deutung. Praktische Erprobung, tatsächliche Produktanalytik und vollständige Chemie-/Lehrplan-/Produktabnahme bleiben offen. Inventar weiterhin 197 Kapitel, Prioritätsaudit jetzt 1532 Frageninstanzen ohne Strukturfehler, davon 124 in Chemie. Änderungen nach b70a5cf lokal, kein weiterer Push.

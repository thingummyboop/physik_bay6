# Relais: zwei getrennte Stromkreise

Stand 16.09.2026. Die Werkstatt im vierten Abschnitt von Elektromagnetismus ist Teil des bestätigten GitHub-Zwischenstands ba3f5d9. Die noch offene erneute Sichtprüfung nach zwei Textpräzisierungen ist jetzt abgeschlossen.

## Lernaufgabe und Modell

Steuerkreis öffnen/schließen, Quelle Q2 ein-/ausschalten und Lampe einsetzen/entfernen ergeben acht Fälle. Die Zeichnung verbindet Quelle Q1, Handschalter und Spule zu einem Steuerkreis; Quelle Q2, Relaiskontakt und Lampenplatz bilden den getrennten Lastkreis. Eine gestrichelte mechanische Verbindung überträgt die Ankerbewegung, ohne eine elektrische Verbindung darzustellen. Farben ergänzen ausgeschriebene Zustandsbeschreibungen. Native Schalter und Auswahlfelder, Tastaturfokus, Rücksetzen sowie drei begründete Antwortmöglichkeiten sind vorhanden.

Das Modell unterscheidet Kontaktstellung, vollständigen Stromweg und versorgte Lampe. Das Schließen des Kontakts allein lässt eine entfernte Lampe nicht leuchten. Eine ausgeschaltete Quelle Q2 liefert im Modell keine Spannung; sie ist nicht aus dem Stromweg entfernt. Eine entfernte Lampe unterbricht dagegen den Lastkreis. Die Steuerquelle kann die Spule unabhängig davon versorgen. Idealer Schließer, intakte Komponenten und zuverlässige Rückstellung sind Modellannahmen; Stromstärke, Verzögerung, Erwärmung und Helligkeit werden nicht berechnet.

Zwei neue Arbeitsaufträge, acht Papierfälle, eine statische Zeichnung mit geschlossenem Kontakt und ausgeschalteter Lastquelle sowie getrennte Lösungen ergänzen die drei bestehenden Untersuchungsaufträge. Keine Änderung der 30 bewerteten Kapitelaufgaben oder der Revision 6.

## Nachweise und Grenzen

- `test_relay_learning.js`: acht Fälle und 24 Klassifikationen; unabhängige Wegsuche aus den tatsächlich gezeichneten Leitungen und Bauteilanschlüssen bestätigt geschlossene/unterbrochene Wege sowie die elektrische Trennung. Fokus, Reset, wiederholte Initialisierung, bestehender Relaisaufruf, unveränderter Speicher und Papiermaterial ebenfalls geprüft. Vor dem Push erneut bestanden.
- `browser_relay_learning.js`: Chromium 151.0.7922.34, Bericht 2026-09-16T13:39:40.226Z. Acht Zustände, 24 Entscheidungen und 48 Layoutfälle bei 320/390/1280 px in beiden Designs, native Tastaturbedienung, Lösungstrennung und Druckexport bestanden. Keine Seitenfehler. Ausgewählte Diagramme und die dunkle Werkstatt wurden visuell gelesen.
- Finaler Arbeitsblattexport 2026-09-16T13:42:28.427Z, 40 Seiten. Die zuvor gelesenen Seiten 5 und 39 nach Präzisierung von Kontakt/Lastkreis sowie der Q2-Aussage erneut gerendert und jetzt gelesen. Beide sind lesbar und ohne Überlagerung. Seiten 6 und 7 sind gegenüber der bereits gelesenen Fassung per Bilddatei-Hash identisch. Keine Sichtprüfung aller 40 Seiten behauptet.
- Die vor dem Push bestandenen Kapitel-, Motor-, Induktions- und Physikarbeitsblattprüfungen sind in LIEFERSTAND.md dokumentiert. Diese ergänzende Druckprüfung ist kein neuer Gesamttest, keine reale Versuchsdurchführung und keine vollständige Physikabnahme.

Die übrigen Inhalts-, Lehrplan- und Produktanforderungen bleiben offen. Übersetzungen bleiben zurückgestellt; die Prioritäten Physik, Mathematik, Chemie, Biologie und DGB gelten weiter.

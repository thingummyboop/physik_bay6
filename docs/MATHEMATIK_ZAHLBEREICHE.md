# Ganze Zahlen und Zahlbereiche – zweite Klasse

Stand 21.09.2026. Kapitel `math2_4_relative_zahlen`, Revision 2. Die Erweiterung ist im gewünschten Zwischenstand `3e00d29` enthalten. Abschließende Druck-, Sprach- und Dokumentationskorrekturen danach sind lokal. Keine vollständige Fach- oder Produktabnahme.

## Grundlage und Befund

Die ursprünglichen zwei Abschnitte, alle vier Fragen und das vollständige Bewegungsskript wurden gelesen. Die Erklärungen des späteren Kapitels zu rationalen Zahlen wurden zur Abgrenzung gelesen. Die Präzisierungen der zweiten Klasse wurden erneut in der gespeicherten RIS-Fassung vom 16.09.2026 geprüft: ganze Zahlen deuten, darstellen und ordnen; Addition/Subtraktion einer natürlichen Zahl als Bewegung; Zahlbereiche hinsichtlich Vorgängern, Nachfolgern, Zwischenwerten und eindeutiger Darstellung vergleichen. Kein erneuter Rechtsquellenabruf; [Quellenstand](LEHRPLAN_QUELLENSTAND.md).

Der alte Lernweg enthielt negative Temperaturen und die Bewegung um eine nichtnegative ganze Schrittzahl. Der systematische Zahlbereichsvergleich fehlte. Die erzeugten Arbeitsblattaufgaben verwendeten teilweise negative zweite Operanden, obwohl deren Rechenregeln erst im Folgejahr erklärt werden. Die neuen erzeugten Bewegungsaufgaben bleiben beim erklärten Modell.

## Umsetzung und fachliche Entscheidungen

- Sechs Abschnitte, sechs Lernziele, sechs Zusammenfassungspunkte, 18 bewertete Fragen und 19 direkte Arbeitsaufträge. Die vier alten Frage-IDs und die beiden alten Abschnitts-IDs bleiben erhalten; die alten Diplomfragen stehen jetzt in den passenden Abschnitten. Neue Fragen erhalten begründete Rückmeldungen, falsche Antworten keine Punkte.
- Negative Zahlen an Temperatur, fiktiven Bezugshöhen und Salden deuten; Größe und Abstand von null unterscheiden. Drei statische Grafiken ergänzen die Zahlengerade, unmittelbare ganzzahlige Nachbarn und gleiche Werte am selben Punkt.
- Bewegungswerkstatt mit Startkreis, Zielquadrat, Richtungspfeil, Einerschritten und sichtbarem Nullpunkt. Bei null Schritten bleiben die Markierungen am selben Ort. Die Grafik passt ihren Ausschnitt an; die Einheiten bleiben erklärt. Eingabebereiche, Enter-Bedienung und ursprüngliche Textausgabe bleiben erhalten.
- Zwölf Zuordnungsbeispiele zu natürlichen Zahlen einschließlich null, ganzen Zahlen und nichtnegativen Bruchzahlen. Entscheidend ist der Wert: etwa 6/3 = 2 und 2,0 gehören zu allen drei Bereichen. Die Bereiche werden nicht fälschlich als eine einzige Kette ineinander enthalten dargestellt. Negative ganze Zahlen gehören nicht zu den nichtnegativen Bruchzahlen; negative Brüche werden in der dritten Klasse behandelt.
- Unmittelbare Vorgänger/Nachfolger immer auf einen Zahlbereich beziehen. Null hat unter den natürlichen Zahlen keinen Vorgänger. Positive nichtnegative Bruchzahlen haben weder unmittelbaren Vorgänger noch unmittelbaren Nachfolger; null ist in diesem Bereich die kleinste Zahl und hat ebenfalls keinen unmittelbaren Nachfolger.
- Zwölf Ausgangsintervalle mit eigenen Zwischenwerten und je sechs sichtbaren Halbierungen. Bruchrechnung mit ganzzahligen Zählern/Nennern und exakten Vergleichen vermeidet irreführende Rundungen. Die eigene Eingabe bezieht sich ausdrücklich auf das ursprüngliche Intervall. Der vergrößerte Grafikausschnitt und die technische Begrenzung auf sechs Schritte werden erklärt; mathematisch lässt sich die Halbierung beliebig fortsetzen.
- Gleicher Wert bei verschiedenen Bruch-/Dezimaldarstellungen; eindeutige vollständig gekürzte Bruchdarstellung mit positivem Nenner; endliche Näherungen gegenüber Perioden und der bereits eingeführte Sonderfall 0,(9) = 1. Vorwissen aus Bruch- und Dezimalzahlkapitel ist verlinkt.
- Drei Papieralternativen, sechs zuschaltbare Vergleichslösungen und zwölf erzeugte Aufgaben mit passenden Lösungen: vier Bewegungen, zwei Nachbarpaare, vier Zwischenwerte und zwei Kürzungen. Bei Zwischenwerten werden andere korrekte Antworten ausdrücklich zugelassen.

## Nachweise

`scripts/test_number_ranges.js`: alle 96 Auswahlkombinationen der zwölf Zuordnungen mit unabhängigen Erwartungswerten; 72 exakte Halbierungen, 24 gültige eigene Zwischenwerte sowie Grenz-/Fehleingaben; 30 Bewegungszeichnungen; alle 54 Quizantwortwege mit unabhängig festgelegtem Lösungsschlüssel. Außerdem Enter, Neustart, Fokus, wiederholte Initialisierung, unveränderter Speicher, Revision und Wiederholungszuordnung; sechs Abschnitte, drei Grafiken/Papieralternativen, sechs Lösungen und 48 erzeugte Aufgabenfälle mit passenden Lösungen.

`scripts/test_integer_movement.js`: alle bisherigen 462 Rechenwege, acht ungültige Eingaben, Enter und Rückmeldungsbereinigung bestehen weiterhin. Beide Prüfungen wurden nach den letzten Sprachkorrekturen erneut ausgeführt. Die gemeinsame Prüfung aller 96 Mathematik-/Chemie-/Biologie-Arbeitsblätter bestand nach der Druckkorrektur; die gemeinsame Zweitklass- und Suchprüfung war unmittelbar vor dem Zwischenstand erfolgreich.

`scripts/browser_number_ranges.js`, Bericht vom 21.09.2026, 17:03:38 UTC, Chromium 151.0.7922.34: 96 native Zuordnungswege, 72 Halbierungen, alle 54 Abschnittsantwortwege und 756 Layoutfälle bei 320/390/1280 px in beiden Farbschemata. Tastatur, Neustart, Fokus und 94-Prozent-Kapitelcheck mit passender Wiederholung geprüft; keine Seitenfehler. Beschriftungen liegen innerhalb der Grafiken und erreichen mindestens 12 sichtbare Pixel; die geprüften Schaltflächen/Eingaben beziehungsweise Checkbox-Beschriftungsflächen mindestens 44 px Höhe.

Nach der Sichtprüfung die Auswahltexte verkürzt und „Zahlengerade“ sprachlich vereinheitlicht. Sechs abschließende Ansichten prüfen die Auswahltextbreite und die statischen/beweglichen Grafikbeschriftungen; mobile Hell- und Dunkelansicht tatsächlich gelesen. Der bei einem Seitenumbruch getrennte Halbierungsabsatz bleibt jetzt zusammen. Alle 20 endgültigen Druckseiten wurden gelesen; nach letzter Sprachkorrektur 16 Rasterseiten bytegleich, die vier veränderten Aufgaben-/Lösungsseiten erneut geprüft. Alle zwölf exportierten Aufgaben wurden unabhängig nachgerechnet. Prüfartefakte liegen lokal außerhalb des Repositorys unter `../browser-qa/number-ranges/`.

## Grenzen und nächste Arbeit

Der Nachweis gilt für diesen Lernweg und die genannten Zustände. Eine echte Screenreader-, Unterrichts- oder fachübergreifende Gesamtprüfung ist dadurch nicht ersetzt. Der vollständige Mathematiklehrplan ist noch nicht abgenommen. Als nächste konkret belegte Lücke folgen grafische Proportionalitätsvergleiche und die Verbindung additiver/multiplikativer Prozentrechnungen im Zweitklasskapitel. Übersetzungen bleiben zurückgestellt; die übrigen priorisierten Fächer bleiben im Gesamtauftrag.

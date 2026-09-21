# Kreise und Kreisteile – 4. Klasse

Stand 21.09.2026. Neues Kapitel `math4_kreis_kreisteile`, Revision 1, 8. Schulstufe. Im Katalog vor Zylinder/Kegel eingefügt und dort als Vorwissen verlinkt. Lokal nach Zwischenstand `1367d26`; keine neue Veröffentlichung.

## Ausgangslücke und Lehrplanbezug

Der klassenübergreifende [Mathematik-Arbeitsabgleich](MATHEMATIK_LEHRPLANABGLEICH.md) stützt sich auf erneut gelesene Kompetenzbeschreibungen und alle Präzisierungen der gespeicherten RIS-Fassung vom 16.09.2026. Kein neuer Rechtsquellenabruf. Vorhandene Kreisgrundbegriffe der ersten Klasse und vorausgesetzte Formeln im Körperkapitel bildeten noch keinen ausgearbeiteten Lernweg zu den Kreisberechnungen der vierten Klasse.

| Anforderung bzw. Lernschritt | Umsetzung |
| --- | --- |
| U/d als konstantes Verhältnis; π experimentell annähern | Abschnitt 1: eigene Faden-/Durchmessermessung, drei ausdrücklich fiktive Ersatzmessungen, Vergleich der Quotienten und Erklärung von Messabweichungen |
| Kreisumfang und Kreisfläche kennen und anwenden | Abschnitt 2: U = πd = 2πr; Sektorzerlegung als anschauliche Begründung für A = πr²; eigenes Ausschneiden/Anordnen und Grenzen der endlichen Zerlegung; Radius/Durchmesser, Einheiten, Skalierung und Rundung |
| Halbkreis, Viertelkreis und Achtelkreis | Abschnitt 3: gleiche Anteile für Bogenlänge und Fläche, zusätzlicher gerader Rand aus zwei Radien; Ausnahme ganzer Kreis; 32 Größen-/Winkelkombinationen mit drei getrennten Rechengrößen |
| Umkehraufgaben und Formelumformung | Abschnitt 4: Radius aus Umfang bzw. Fläche, nichtnegative Wurzel als Länge, Kreisteil berücksichtigen, Probe und Umgang mit gerundeten Angaben |
| Anwendung und Modellprüfung | Abschnitt 5: Rechteck mit angesetztem Halbkreis, gemeinsame Innenlinie, maßstäbliche Zeichnung, Materialbedarf in ganzen Verkaufseinheiten, fiktiver Preis und eigener Entwurf |

Die allgemeine Sektorformel mit dem Anteil α/360° ist als Erweiterung gekennzeichnet. Sektor und Segment werden abgegrenzt; die Sektor-Randformel wird nicht auf Kreissegmente übertragen.

## Umfang und Interaktion

Fünf Abschnitte mit fünf Lernzielen, fünf Zusammenfassungspunkten, 15 direkten Arbeitsaufträgen und 15 bewerteten Fragen mit 45 Antwortmöglichkeiten. Fünf Vergleichslösungen sind optional druckbar. Zwei selbst erstellte statische SVGs zeigen Radius/Durchmesser sowie die zusammengesetzte Beetform. Eine Papieralternative übernimmt den Werkstattvergleich mit allen vier Kreisteilen.

Die Werkstatt variiert r = 1 bis 8 cm, ganzen/halben/viertel/achtel Kreis und die gesuchte Größe Bogen/Rand/Fläche: 96 Rechenfälle. Lernende geben erst einen eigenen Zahlenwert ein oder öffnen die freie Vergleichsrechnung. Die Auswertung zeigt exakte Ausdrücke mit π und gerundete Werte samt Einheiten. Falsche Antworten verweisen auf Radius/Durchmesser, Anteil und gerade Randstücke; leere oder ungültige Eingaben haben eine gesonderte Rückmeldung. Komma und Punkt, Enter, Fokussteuerung und Neustart sind unterstützt. Die Werkstatt verändert keine gespeicherten Quizresultate und verlangt keine Punkte oder Wartezeiten.

Die Zeichnung verwendet für alle Radien denselben Bildschirmmaßstab, der ausdrücklich kein Zentimetermaßstab ist. Der Bogen ist blau, gerade Randstücke orange; Text und Ergebnistabelle erklären die Unterscheidung zusätzlich. Beim ganzen Kreis werden keine Radien zum Rand addiert. Auf kleinen Bildschirmen startet die verschiebbare Zeichnung zentriert; alle angebotenen Figuren sind in der Anfangsansicht vollständig sichtbar. Die Beschriftung mit Radius/Winkel steht außerhalb des Scrollbereichs. Ergebnisse werden mobil als beschriftete Tabellenzellen untereinander dargestellt.

## Nachweise

- `test_circle_parts.js`: alle 96 Rechnungen gegen eine unabhängig abgetastete Grenze mit 5.000 Sehnen und Polygonflächen verglichen; absolute Abweichung kleiner als 0,0001. Korrekte/falsche/ungültige Eingaben, Ausdruck mit π, Formzustände, Enter, Fokus, Neustart, unveränderter Speicher und Katalog-/Vorwissensverknüpfung geprüft. Alle 45 Quizantwortwege mit unabhängig festgelegten richtigen Indizes, 100/93-Prozent-Ergebnis und passenden Wiederholungs-IDs bestanden. Zwei statische Druckbilder, 15 Aufgaben, Papieralternative und fünf optionale Lösungen vorhanden.
- `browser_circle_parts.js`, Bericht 13:29:20 UTC, Chromium 151.0.7922.34: 96 native Rechenfälle, 192 Layoutfälle bei 320/390/1280 Pixeln in beiden Farbschemata, Tastatur/Fokus/Speicher und 45 native Quizantwortwege bestanden; keine Browserfehler.
- Die erste mobile Sichtprüfung zeigte einen ungünstigen linken Zeichnungsausschnitt. Die Werkstatt zentriert nun ihre Grafik und hält deren Beschriftung außerhalb des Scrollbereichs. Finaler Bericht 13:31:16 UTC: alle 192 Layoutfälle zeigen die vollständige Figur bereits im Anfangsausschnitt; keine Seitenüberbreite, Rücksetzen zentriert wieder. Mobile Gesamt-/Ergebnisansichten, vollständige Figuren und abschließende mobile Ausschnitte tatsächlich gelesen.
- Alle 18 Seiten der Druckfassung vom 13:29:20 UTC gelesen. Eine Umkehraufgabe danach sprachlich präzisiert und die endgültige Fassung um 13:35:10 UTC erneut exportiert: 18 Seiten, 17 gerenderte Seiten bytegleich mit den bereits geprüften Bildern; die einzige geänderte Seite 6 erneut gelesen. Zwei Abbildungen, Formeln, Messwerttabelle, Aufgaben und Lösungen lesbar. Lokale Vorschauadressen im internen Prüf-PDF sind keine veröffentlichten Unterrichtsmaterialien.
- Gemeinsamer Renderer: 198/198 Kapitel ohne erfasste Darstellungsfehler oder fehlende Lernziel-/Zusammenfassungslisten. Arbeitsblattprüfung: 96 Mathematik-/Chemie-/Biologiekapitel. Syntax: 107 Themenskripte. Inventar: 198 Kapitel; Prioritätsaudit: 1.758 Frageninstanzen, davon 531 in Mathematik, ohne Strukturfehler.
- Vollständiger Funktionslauf und gezielte Nachprüfung des veralteten Suchindexes: [separater Bericht](FUNKTIONS_PRUEFUNG_2026-09-21.md).

Die angeleitete reale Messung und das Ausschneiden sind Aufgabenangebote, keine durchgeführte Unterrichtserprobung. Keine vollständige Screenreader-, Fach- oder Produktabnahme. Weitere konkrete Mathematiklücken sind im Arbeitsabgleich benannt; die übrigen Fächer und die übergreifende Gesamtprüfung bleiben im Auftrag. Übersetzungen wurden nicht ergänzt.

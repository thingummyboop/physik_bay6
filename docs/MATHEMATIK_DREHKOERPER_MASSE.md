# Drehkörper: Umkehraufgaben, Masse und Dichte

Stand 21.09.2026. `math4_6_koerper`, vierte Klasse / 8. Schulstufe, auf Revision 3 erweitert. Änderungen lokal nach dem ausdrücklich gepushten Zwischenstand `e03f3d6`.

## Ausgangsbefund und Lehrplanbezug

Alle vier bisherigen Abschnitte, sieben bewerteten Fragen, der Kugelregler und die Zylinder-Einstiegsübung wurden gelesen. Die Grundformeln, Kugelberechnung und Skalierung waren vorhanden; ausgearbeitete Umkehraufgaben und Masse-/Dichteanwendungen für Zylinder und Kegel fehlten.

Die gespeicherte RIS-Fassung vom 16.09.2026 nennt für die vierte Klasse ausdrücklich Eigenschaften von Drehzylinder/Drehkegel, Oberflächen-/Rauminhalte, einfache Umkehraufgaben durch Umformen sowie Sachaufgaben insbesondere zu Massen und Dichten. Die betreffende Präzisierung wurde erneut gelesen; kein neuer Abruf der Rechtsfassung. [Quellenstand](LEHRPLAN_QUELLENSTAND.md). Die vorhandene Kugelbehandlung bleibt ein ergänzendes Angebot und wird nicht als Beleg für diese ausdrücklich genannten Zylinder-/Kegelkompetenzen verwendet.

## Lernweg

| Anforderung | Konkrete Umsetzung |
| --- | --- |
| Eigenschaften und Maße | Entstehung durch Rotation eines Rechtecks bzw. rechtwinkeligen Dreiecks; eigene beschriftete Schrägansichten. Kreis erscheint als Ellipse; Radius, senkrechte Höhe und Mantellinie sind getrennt. Die Bilder sind schematisch und keine Messvorlagen. |
| Passende Oberfläche | Geschlossener Zylinder mit zwei Kreisflächen, oben offener mit einer; Kegeloberfläche einschließlich Grundfläche gegenüber reiner Mantelfläche. Das Körpermodell wird vor der Rechnung festgelegt. |
| Zylinder rückwärts | h = V/(πr²), r = √(V/(πh)), h = (O − 2πr²)/(2πr); Umformungen mit Zahlenbeispielen und Probe. Positive Höhe verlangt O > 2πr²; widersprüchliche Angaben werden begründet verworfen. |
| Kegel rückwärts | h = 3V/(πr²), r = √(3V/(πh)); aus O und r zuerst s = O/(πr) − r, anschließend h = √(s² − r²). Bedingungen s > r und positive Maße sowie Rückrechnung in die ursprüngliche Formel. |
| Masse und Dichte | m = ρV, ρ = m/V, V = m/ρ. Zylinder mit gemischten mm/cm-Angaben, Dichte eines massiven Kegels, Rückrechnung. 1 g/cm³ = 1 kg/dm³ = 1000 kg/m³; Ergebnis in g bzw. kg. Modellstoffe sind ausdrücklich erfunden. |
| Hohlkörper beurteilen | Materialvolumen statt Fassungsvermögen; Rohr mit π(R² − r²)h. Rechenauftrag für R = 3, r = 2, h = 10 cm und ρ = 2 g/cm³: 100π g. Mittlere Dichte aus Außenvolumen identifiziert einen Werkstoff nicht eindeutig. |

Sieben Abschnitte, fünf Lernziele und fünf Zusammenfassungspunkte. Zehn neue bewertete Fragen, insgesamt 17 Fragen mit 48 Antwortmöglichkeiten. Neun direkte Rechen-, Probe- und Begründungsaufträge mit drei optionalen Vergleichslösungen. Vier Papieralternativen decken Einstieg, Umkehrwerkstatt, Massewerkstatt und bestehenden Kugelvergleich ab; zwei eigene Körperbilder bleiben im Ausdruck erhalten.

## Interaktive Modelle

Die Umkehrwerkstatt bietet sechs Aufgabentypen und sechs Datensätze, zusammen 36 Fälle. Verwendet werden die Radien/Höhen-Paare (3,4), (5,12), (8,15) und ihre Verdoppelungen. Diese Datensätze liefern ganzzahlige Mantellinien und exakte Vielfache von π. Die gesuchte Länge wird erst im Rechenweg offengelegt; die schematische Zeichnung zeigt Buchstaben. Die Auswahl deckt Höhe aus V/r, Radius aus V/h und Höhe aus O/r für beide Körper ab. Freie beliebige oder widersprüchliche Dateneingabe ist keine Funktion dieser Werkstatt; die Beurteilung unzulässiger Angaben erfolgt in Text und Aufgaben.

Die Massewerkstatt kombiniert zwei Körper, drei Radien, zwei Höhen, drei fiktive Modellstoffe und zwei gesuchte Größen zu 72 Fällen. Bei gesuchter Masse ist die Dichte gegeben, bei gesuchter Dichte eine exakte Masse als Vielfaches von π. So entsteht keine unbeabsichtigte Zwischenrundung. Die Werkstatt prüft den Zahlenwert auf Genauigkeit von zwei Nachkommastellen; die Einheit steht sichtbar beim Auftrag. Rechenweg und Einheitenbegründung bleiben zusätzliche Lernaufträge, keine automatisch geprüfte Freitextleistung.

Beide Werkstätten akzeptieren Dezimalkomma/-punkt, prüfen ungültige Werte, lassen sich mit Enter bedienen und entfernen überholte Antworten bei geänderten Angaben. Ergebnis und Reset besitzen nachvollziehbaren Fokus. Freies Experimentieren verändert keinen Quizlernstand. Der alte Zylinder-Einstieg entfernt jetzt ebenfalls überholtes Feedback beim Tippen. Das bestehende freie 3D-Werkzeug bleibt erhalten und wird erst beim Öffnen des optionalen Details initialisiert.

Der Arbeitsblattgenerator liefert acht Aufgaben aus Volumen, Höhe aus Oberfläche, Radius aus Volumen, Masse und Dichte. Dieselben erzeugten Daten bestimmen die Lösungen mit Umformung und Probe. Die Lösungen sind optional; direkt erklärte Einstiegsbeispiele enthalten weiterhin ihre Vergleichsrechnung im Lernmaterial.

## Prüfungen und Ergebnisse

`scripts/test_round_bodies.js`: 36 inverse Fälle gegen unabhängige Vorwärtsrechnungen und zurückgewonnene Maße, 72 Masse-/Dichtefälle, falsche/ungültige Eingaben, Enter, Fokus, Reset, Löschen und unveränderter Speicher; verzögertes einmaliges Laden des Zusatzwerkzeugs. Alle 48 Quizantwortwege gegen einen unabhängigen festen Schlüssel mit tatsächlicher Rückmeldung, 100/94-Prozent-Ergebnis und Wiederholungs-IDs. Revision 2 gilt nicht als Nachweis für die neuen Inhalte. Vollständiger Arbeitsblattausbau sowie acht erzeugte Aufgaben/Lösungen und 40 kontrollierte Generatorfälle. Nach der Bildkorrektur erneut bestanden.

Bestehende Kugelprüfung mit zehn Radien, Dimensionen und quadratischer/kubischer Skalierung unverändert bestanden; lediglich die Anzahl der Abschnittsfragen aktualisiert. Die gemeinsame Prüfung aller 96 STEM-Arbeitsblätter, 40 Mathematik-Rückmeldungswege, übersetzte Titelsuche und begrenztes Mathematik-Quellaudit bestanden. Gemeinsamer Renderer 198/198 ohne gemeldete Strukturprobleme. Inventar 198 Kapitel; Prioritätsprüfung 1.806 Frageninstanzen ohne Strukturfehler. Der Suchindex wurde wegen der Inhaltsrevision neu erzeugt, keine Übersetzungen ergänzt.

Gezielte native Bildnachprüfung am 21.09.2026 um 15:13:38 UTC: sechs Layouts (320/390/1280 px, Hell/Dunkel), alle Beschriftungen innerhalb des Bildes, mindestens ungefähr 13,1 px. Die Radiusbeschriftung wurde nach Sichtbefund von der Ellipsenkante nach außen mit einer Hinweislinie versetzt. Das optionale 3D-Werkzeug wurde geöffnet und erzeugte tatsächlich eine Canvas-Darstellung.

`scripts/browser_round_bodies.js`, Chromium 151.0.7922.34, Bericht 15:14:50 UTC: 36 native Umkehrfälle, 72 native Masse-/Dichtefälle, 648 Layoutfälle, Tastatur-/Fokus-/Reset-/Speicherprüfung und sämtliche 48 Quizantwortwege. Keine Browserfehler. Die nachfolgende Anpassung der Kugelformel-Schreibweise ändert weder Antwortschlüssel noch Berechnung; der vollständige DOM-Test bestand anschließend erneut. Der vollständige native Lauf wurde dafür nicht wiederholt.

Zuerst alle 20 Druckseiten gelesen; zwei Absätze endeten ungünstig mit einer einzelnen Folgezeile. Der Modellmassen-Absatz und die gemeinsame Aufgabenanleitung werden nun jeweils zusammengehalten. Die endgültige Druckfassung von 15:18:00 UTC umfasst 21 Seiten. Sieben gerenderte Seiten sind bytegleich mit schon gelesenen Seiten; die 14 veränderten Seiten 5–16, 19 und 20 wurden erneut gelesen. Figuren, Rechenwege und Einheiten sind lesbar; alle acht aktuellen Zufallsaufgaben passen zu ihren Lösungen. Die PDFs mit lokalen Vorschauadressen sind interne Prüfexemplare, keine veröffentlichten Unterrichtsdateien.

## Grenzen und Weiterarbeit

Die konkret festgestellten Umkehr-/Masse-/Dichtelücken sind im beschriebenen Umfang ergänzt und geprüft. Die Kapitelprüfung ist keine vollständige Fach- oder Produktabnahme und keine Unterrichtserprobung. Kein vollständiger neuer Produkt-Suitenlauf in diesem Arbeitsschritt. Die gesamte Webseite, weitere Fachkompetenzen und die dokumentierten unteren Klassen bleiben im Auftrag. In Mathematik folgen Zehnerpotenzen/Gleitkommadarstellung und die offenen Zahlendarstellungen; [Gesamtabgleich](MATHEMATIK_LEHRPLANABGLEICH.md). Übersetzungen bleiben zurückgestellt; Physik, Mathematik, Chemie, Biologie und DGB bleiben priorisiert.

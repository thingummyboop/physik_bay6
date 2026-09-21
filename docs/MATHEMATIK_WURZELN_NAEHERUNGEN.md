# Wurzeln, reelle Zahlen und Näherungen – 4. Klasse

Stand 21.09.2026. `math4_1_reelle_zahlen` ist von Revision 1 auf 2 erweitert. Alte Quizresultate bestätigen damit nicht automatisch die neuen Inhalte. Änderungen nach dem ausdrücklich gepushten Zwischenstand `f9aa5fa` bleiben lokal.

## Fachlicher Lernweg

Der Abschnitt „Zahlen und Maße“ der vierten Klasse wurde in der gespeicherten RIS-Textfassung vom 16.09.2026 erneut gelesen: rationale/nichtrationale Zahlen, vollständige reelle Zahlengerade, systematisches Eingrenzen, Quadrat- und Kubikwurzeln mit Technologie und die Problematik von Näherungswerten. Die Formelbilder sind im Textauszug nicht enthalten; ihre wörtliche Wiedergabe wird daraus nicht behauptet. Quellenstand: [LEHRPLAN_QUELLENSTAND.md](LEHRPLAN_QUELLENSTAND.md).

Die vorhandenen Definitionen, rational/irrational, periodische Dezimalzahlen, √2-Schieberegler und die Unterscheidung von Wurzel und quadratischer Gleichung bleiben erhalten. Ergänzt sind:

- Die reelle Zahlengerade mit einer beschrifteten, auch druckbaren eigenen SVG-Darstellung der Stelle √2. Bildposition und Dezimalwert sind ausdrücklich Näherungen.
- Produkt- und Quotientenregel mit Voraussetzungen, Begründung durch Quadrieren, exakter Vereinfachung und Gegenbeispielen für negative Radikanden bzw. Summen. √(x²) = |x| wird mit x = −5 erklärt.
- Kubikwurzeln über Würfelvolumen, negative reelle Kubikwurzeln und Probe durch die dritte Potenz. Eine Rechneranleitung behandelt die dritte-Wurzel-Taste, positive Potenzen mit 1/3 und die Vorzeichenbehandlung, falls die Potenzfunktion für negative Werte einen Fehler meldet. Gerundete kubische Proben sind mit exakter Ganzzahlarithmetik nachgerechnet.
- Vorzeitiges Runden anhand eines Modellquadrats: Seite zuerst runden oder Umfang ohne Zwischenrundung berechnen; anschließend Fläche zurückrechnen und absolute Abweichung erklären. Die begrenzte Genauigkeit des Rechners bleibt ausdrücklich benannt.

Sieben Abschnitte, sieben Lernziele und sieben Zusammenfassungspunkte; 17 Abschnittsfragen plus eine Abschlussfrage, zusammen 18 bewertete Aufgaben mit 53 Antwortmöglichkeiten. Elf direkte Rechen-/Begründungsaufträge mit vier optionalen Vergleichslösungen. Drei Papieralternativen ersetzen die Eingabe-/Reglerbereiche. Der Arbeitsblattgenerator enthält acht zusätzliche Aufgaben mit acht zu genau diesen Zufallswerten passenden Lösungen: je zwei Summen, Produkte, Quotienten und Kubikwurzeln (davon eine negativ).

## Interaktive Werkstatt

Fünf exakte Modellflächen (2, 3, 5, 10 und 50 m²), fünf Genauigkeiten der Seite (0 bis 4 Nachkommastellen) und zwei gesuchte Rechenwege ergeben 50 Antwortfälle. Die Rückmeldung erläutert den gewählten Rechenweg; der freie Vergleich zeigt beide Umfänge, die zurückgerechnete Fläche und deren Abweichung. Auch übereinstimmende gerundete Umfänge werden erklärt: Sie beweisen keine exakte Seitenlänge.

Komma/Punkt, Enter, sichtbare Beschriftungen, Statusrückmeldung, Fokus auf Fehler bzw. Ergebnis, freie Vergleichsanzeige und Neustart sind unterstützt. Änderungen löschen veraltete Antworten und Ergebnisse. Die Werkstatt schreibt keine Quizresultate in den Speicher und verlangt keine Punkte oder Wartezeiten. Mobile Ergebnisse werden als beschriftete Karten gezeigt. Die alte Seitenlängeneingabe verwendet jetzt zum Farbschema passende Farben.

## Nachweise

- `test_root_rules.js`: alle 50 Fälle gegen eine unabhängige Referenz aus Intervallhalbierung und Ganzzahlarithmetik, einschließlich Flächenabweichungen; richtige/falsche/ungültige Eingaben, Enter, Fokus, Neustart und unveränderter Speicher. Alle 53 Quizantwortwege mit unabhängig festgelegten richtigen Indizes, 100/94-Prozent-Ergebnis und passenden Wiederholungs-IDs. Drei Papieralternativen, elf Aufgaben, vier verfasste Lösungen und acht passende Generatorlösungen; weitere 40 Generatorfälle mit kontrollierten Zufallswerten. Nach den letzten Text-/Druckanpassungen erneut bestanden.
- `test_real_numbers.js`: sieben Lernziele/Zusammenfassungspunkte und 17 Abschnittsfragen; alle 1.001 bestehenden √2-Schieberwerte sowie die alte Seitenlängeneingabe weiterhin bestanden. Die Erweiterung ändert keine alten Aufgaben-IDs.
- `browser_root_rules.js`, Bericht 13:55:53 UTC, Chromium 151.0.7922.34: 50 native Rechenfälle, 150 Layoutfälle bei 320/390/1280 Pixeln in beiden Farbschemata, Tastaturfolge, Eingabefokus und unveränderter Speicher; alle 53 nativen Quizantwortwege, keine Browserfehler.
- Die Sichtprüfung führte zu größeren Zahlengeradenbeschriftungen und einer Korrektur der oberen Textgrenze. Finale Nachprüfung 13:59:28 UTC: sechs Layoutfälle, vollständige Beschriftungsrahmen und mindestens 12,74 Pixel tatsächliche Schriftgröße; Seitenbreite und alte Eingabe ebenfalls geprüft. Mobile Einleitung, Zahlengerade und Werkstatt in beiden Farbschemata sowie die neuen Erklärungsabschnitte tatsächlich gelesen.
- Druckfassung vom 13:58:05 UTC: alle 19 gerenderten Seiten gelesen. Definition und Aufgabenblöcke bleiben zusammen, Zahlengerade und Einheiten sind lesbar, alle 18 Fragen sowie acht Zusatzaufgaben mit passenden Lösungen vorhanden. Zwei Seiten bei anderer Auflösung zusätzlich überprüft. Die lokale Vorschauadresse in diesem internen Prüf-PDF ist kein veröffentlichter Unterrichtslink.
- Gemeinsame Arbeitsblattprüfung für 96 Mathematik-/Chemie-/Biologiekapitel bestanden. Übersetzte Titel-/Metadatensuche nach Indexaufbau bestanden; keine Übersetzungen ergänzt. Gemeinsamer Renderer: 198/198 Kapitel, keine fehlenden Lernhilfen oder erfassten Fehler. Mathematik-Zugänglichkeitsaudit für 42 Einträge ohne Befund in seinem begrenzten Quellenprüfumfang.
- Inventar weiterhin 198 Kapitel; Prioritätsaudit 1.768 Frageninstanzen, davon 541 Mathematik, ohne Strukturfehler. Kein neuer vollständiger Lauf aller Funktionssuiten in diesem Arbeitsschritt; der vorherige Gesamtbericht bleibt unverändert.

Keine Unterrichtserprobung oder vollständige Screenreader-/Produktabnahme. Die dokumentierte Wurzellücke ist inhaltlich ergänzt und konkret geprüft. Pythagoras-Begründung, Funktionsdarstellungen, inverse Körperaufgaben und weitere im [Mathematik-Abgleich](MATHEMATIK_LEHRPLANABGLEICH.md) benannte Punkte sowie der Gesamtauftrag über alle Fächer bleiben offen.

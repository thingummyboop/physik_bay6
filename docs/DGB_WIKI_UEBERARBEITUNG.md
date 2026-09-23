# DGB: Einen bestehenden Wiki-Beitrag überarbeiten

Stand: 23.09.2026. Zwischenstand nach `47c553a`; keine vollständige Fach- oder Produktabnahme.

## Lernaufgabe und Umsetzung

Das Kapitel `dgb8_information` enthält in Revision 3 fünf Abschnitte und acht bewertete Fragen. Der neue Abschnitt `wiki_ueberarbeiten` schließt die im [Klassenabgleich](DGB_KLASSE4_ABGLEICH.md) beschriebene Lücke: Inhalte für eine Zielgruppe verbessern und in eine vorhandene Wissensordnung einbinden.

Die eigenständige [Wiki-Werkstatt](../examples/klassenwiki.html) stellt einen absichtlich fehlerhaften Beitrag und sechs ausdrücklich erfundene Datenspuren bereit. Lernende bearbeiten Titel, Beobachtung, Deutung, Empfehlung und Änderungsbegründung. Abschnittsfragen und Sprunglinks bleiben erhalten. Vorschau und Vergleich zeigen die Änderungen; die Zahl geänderter Felder ist ausdrücklich keine fachliche Bewertung.

Sieben Arbeitsaufträge verbinden Quellenvergleich, Überarbeitung für die erste Klasse, Rückmeldung, Speichern, Wiederherstellen und Weitergabe eines lesbaren Ergebnisses. Das Kapitel enthält den Ausgangstext auch auf Papier, ein Protokoll mit vier Zeilen und getrennte Lösungshinweise. Papierplanung wird vom tatsächlich ausgeführten Dateiversuch unterschieden.

Arbeitsstände lassen sich als JSON speichern und wieder laden; der fertige Beitrag lässt sich als eigenständige HTML-Datei exportieren. Auch die Werkstatt selbst kann heruntergeladen und offline geöffnet werden. Sie benötigt weder Konto noch automatische Speicherung und veröffentlicht nichts. Fehlerhafte oder übergroße Dateien erhalten den bisherigen Text. Ein langsamer Ladevorgang überschreibt keine zwischenzeitliche Eingabe. Exportierte Texte werden als Text behandelt, nicht als ausführbarer Inhalt. Prüfhäkchen dokumentieren eine manuelle Selbstprüfung und werden bei Textänderungen zurückgesetzt.

## Prüfung und Grenzen

- `scripts/test_wiki_workshop.js`: Vorschau, Vergleich, Zurücksetzen/Rücknahme, Dateiformate, fehlerhafte und konkurrierende Ladevorgänge, sichere Textausgabe, Quellenübereinstimmung und Papiermaterial bestanden.
- `scripts/browser_wiki_workshop.js`: sechs Ansichten (320, 390 und 1280 Pixel, jeweils hell/dunkel), Tastaturfokus, echte Downloads, erneutes Laden, Export und heruntergeladene Offline-Werkstatt bestanden. Im Offline-Versuch keine HTTP-Anfragen; kein erforderlicher Browserspeicher.
- `scripts/test_profile_traces.js` und `scripts/browser_profile_traces.js`: alle 24 Antwortwege des überarbeiteten Kapitels bestanden; der Browserbericht umfasst außerdem 96 Zustände der vorhandenen Datenspuren-Werkstatt.
- `scripts/test_dgb_worksheets.js` und `scripts/test_translated_title_search.js`: bestehende Arbeitsblatt- und Suchprüfungen bestanden. Übersetzungen wurden nicht überarbeitet.
- Die 17 Seiten der Kapitel-Lösungsdruckfassung und die einseitige exportierte Beitragsfassung wurden visuell geprüft. Der Arbeitsblatttest prüft zusätzlich die standardmäßig ausgeblendeten Lösungen; eine separate vollständige Sichtprüfung einer neuen Schüler-PDF wird hier nicht behauptet.

Lokale Prüfberichte und Bilder liegen außerhalb des Repositories unter `../browser-qa/wiki-workshop/` und `../browser-qa/information-rev3/`. Diese Prüfungen belegen die beschriebenen Abläufe, keine automatische fachliche Bewertung frei geschriebener Texte und keine Unterrichtserprobung.

Die Lehrplanzuordnung und noch offenen Anforderungen stehen im [Abgleich der 4. Klasse](DGB_KLASSE4_ABGLEICH.md). Nächster konkreter Ausbau ist der zusammenhängende Medienprojektauftrag im Bereich Produktion. Der Gesamtauftrag bleibt offen; Übersetzungen bleiben ausgesetzt.

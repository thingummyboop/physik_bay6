# DGB: Programme und Signal-Karten herstellen, 2. Klasse

Stand 23.09.2026, Kapitel `dgb6_produktion`, Revision 3. Inhalt und Werkstätten sind im angeforderten GitHub-Zwischenstand `4d50180` enthalten; die abschließende Prüfung und dieser Nachweis entstanden anschließend. Sechs Abschnitte enthalten 34 Arbeitsaufträge, zwölf bewertete Fragen und drei freie Übungen mit jeweils null Punkten. Der bisherige Punktezähler und die drei Bildlizenzkarten bleiben erhalten.

## Zuordnung zum Lehrplan

Grundlage ist der Produktionsabschnitt der 2. Klasse im [amtlichen Mittelschullehrplan](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html). Der gesamte DGB-Zweitklassabschnitt wurde am 23.09.2026 um 12:59:33 UTC erneut direkt abgerufen und gelesen: HTTP 200, 4.189 normalisierte Zeichen, unverändert zur zuvor gespeicherten Tagesfassung. Die Tabelle paraphrasiert seine vier Produktionskompetenzen. Für diesen Kompetenzbereich nennt der Abschnitt keine zusätzlichen Anwendungsbereiche.

| Anforderung | Material, Tätigkeit und überprüfbares Ergebnis |
| --- | --- |
| T: Speichern und Verarbeiten von Informationen durch Zahlen oder andere Symbole darstellen | sec2: Wertefolge mit SETZE, ERHÖHE und ZEIGE; Name, Wert, Anweisung und Ausgabe unterscheiden. In der eigenen Ausführung Speicher und Ausgabe schrittweise vergleichen. Laufender Wert und gespeicherte Datei sind getrennt. |
| T: In einer geeigneten Entwicklungsumgebung einfache Programme erstellen, testen und Fehler beheben | `dgb6_eigenes_programm`: eigene Anweisungen in der Punktewerkstatt schreiben; Erwartungen für drei Eingabefolgen berechnen, Programm ausführen, fehlendes ENDE und falsch platziertes SETZE untersuchen, korrigieren und erneut testen. Zusätzliche eigene Regel als Transfer. |
| G: Geistiges Eigentum bei Erstellung und Remix von Programmen beachten und Herkunft angeben | Derselbe Abschnitt: konkrete Vorlagenfreigabe lesen, Herkunft und eigene Regeländerungen im dafür vorgesehenen Feld festhalten, mit der bearbeitbaren Datei weitergeben. Die Freigabe gilt nicht automatisch für hinzugefügten fremden Code. |
| I: Visuelle/audiovisuelle/auditive Inhalte erzeugen, verändern, analysieren und Veröffentlichungsmöglichkeiten benennen | sec3: Text, grafische Dauerbalken und selbst erzeugte Töne als Signal-Karte gestalten; zunächst nur die Tonfolge ändern, Fassungen vergleichen, Rückmeldung aufnehmen und überarbeiten. Bearbeitbare Datei, fertige multimediale Karte und Tondatei unterscheiden; Unterrichtskanal, Klassenpräsentation und freigegebenes Schulangebot als Wege abwägen. |

Die Signal-Karte verbindet Text, Grafik und Ton; sie ist kein Videoeditor. Die Tonfolge bekommt ihre Bedeutung durch Vereinbarung und zusätzliche Mitteilung. Eine konkrete Rückmeldung oder ein Hörvergleich wird nicht durch einen automatisch vergebenen Punkt ersetzt. Die Papieralternativen ermöglichen Planung und Nachvollziehen, sind aber ausdrücklich kein Nachweis einer ausgeführten Programmierung oder erzeugten Tondatei.

## Punktewerkstatt

`examples/punktewerkstatt.html` ist eine eigenständige, ohne externe Bibliotheken verwendbare Entwicklungsumgebung mit einer begrenzten Lernsprache. Sie führt die eingegebenen Anweisungen tatsächlich aus. Die Syntax ist eigens für diese Aufgabe entwickelt und wird nicht als JavaScript oder Scratch ausgegeben.

Die ursprüngliche Regel beginnt bei 0 und addiert bei richtig 2. Der neue Auftrag beginnt bei 5, addiert bei richtig 3 und bei falsch −1. Unabhängig berechnete Erwartungen: richtig–falsch–richtig ergibt 8, 7, 10; dreimal falsch 4, 3, 2; dreimal richtig 8, 11, 14. Mit SETZE innerhalb der Wiederholung entsteht im ersten Test stattdessen 8, 4, 8. Fehlendes ENDE ist ein anderer Fehlertyp als eine syntaktisch gültige, aber zur Regel unpassende Platzierung.

Schrittweise Ausführung zeigt Speicher, Verzweigung und Ausgabe getrennt. Die gespeicherte HTML-Arbeitsdatei enthält Programm, gewählte Antworten, Vorhersagen, Notizen und Herkunft. Nach dem Wiederöffnen entsteht das Ablaufprotokoll durch erneutes Ausführen. Es gibt keine automatische Speicherung. Diese Modellpunkte verändern den Lernstand der Webseite nicht.

## Signalwerkstatt

`examples/signalwerkstatt.html` erzeugt aus drei wählbaren Tonhöhen und einer Tondauer tatsächlich eine WAV-Datei. Die zwei Pausen dauern je 0,2 Sekunden; drei Töne zu je 0,4 Sekunden ergeben daher insgesamt 1,6 Sekunden. Die Balken zeigen Dauer und Tonbezeichnungen, keine gemessene Schallwelle. Es gibt weder Mikrofonaufnahme noch fremde Musik oder automatische Wiedergabe.

Die drei Ausgaben haben unterschiedliche Zwecke:

- `mein-signal-arbeitsdatei.html`: bearbeitbare Einstellungen und Testnotizen; offline wieder öffnen, weiterarbeiten und Ton neu erzeugen.
- `mein-gruppensignal.html`: fertige Text-/Grafik-/Tonkarte mit eingebetteten Audiodaten, ohne Editor und Testnotizen; enthält kein Skript.
- `mein-gruppensignal.wav`: ausschließlich der erzeugte Ton.

Die eigene Lernfreigabe beider neuen Vorlagen gilt für deren Verwendung, Veränderung und Weitergabe für Lernzwecke mit Herkunfts- und Änderungshinweis. Sie ist keine Lizenzänderung für das gesamte Repository und wird nicht als Open-Source-Zertifizierung bezeichnet. Fremdes Zusatzmaterial braucht seine eigene passende Erlaubnis.

## Funktions- und Browsernachweise

- `test_points_workshop.js`: alle acht unabhängig berechneten Antwortfolgen, falsch platziertes SETZE, Syntax- und Laufzeitfehler, schrittweise Ausgabe, Fokus, sicherer Arbeitsdatei-Rundlauf und alle 36 Kapitelantwortwege mit unabhängigem Schlüssel bestanden. Revision 2 wird als veraltet erkannt; Revision 3 und genaue Wiederholungskennungen sind geprüft.
- `test_signal_workshop.js`: 81 WAV-Konfigurationen mit Header, Länge, gemessenen Frequenzzyklen, Pausen und begrenzter Amplitude; Rücksetzen veralteter Tonfassungen, sichere Textausgabe, Arbeitsdatei-Rundlauf und skriptfreie Ergebniskarte bestanden.
- `test_counter_debugging.js`: bisherige 16 Punktezählervarianten mit Zwischenständen bleiben geprüft. Die vollständige aktuelle Kapitelantwortprüfung liegt in der getrennten Punktewerkstatt-Suite.
- `browser_production_projects.js`, endgültiger Lauf **23.09.2026, 12:59:24 UTC**, Chromium **151.0.7922.34**: 18 Programmläufe, sechs Signalansichten, vier tatsächliche Downloads, drei offline wieder geöffnete HTML-Dateien, WAV-Decodierung und fortschreitende Wiedergabe; veraltete Tonwiedergabe stoppt nach Änderung. Sämtliche 36 bewerteten und neun freien Antwortwege sowie sechs Kapitelansichten bestanden; keine erfassten Browserfehler.
- Die Ansichten umfassen 320, 390 und 1280 Pixel in hellem und dunklem Design. Die mobile Ablaufspalte wurde vor dem endgültigen Lauf verbessert. Programm-, Ablauf-, Signal-, Export- und dunkle Kapitelansichten wurden tatsächlich gesichtet. Beim letzten Programmschritt wurde ein im nativen Browser erkennbarer Fokusfehler behoben und erneut geprüft.
- Alle **20 endgültigen Seiten** der Lösungsdruckfassung sind gesichtet. Gegenüber der zuvor geprüften Fassung änderten die letzten Sprachkorrekturen ausschließlich Seiten 7 und 15; beide erneut gelesen, die übrigen 18 Seiten bildidentisch. Das vollständige elfzeilige Lösungsprogramm auf Seite 19 zusätzlich in höherer Auflösung bestätigt. Die gedruckte fertige Signal-Karte ist ebenfalls gesichtet. Lösungen bleiben in der Schülerfassung zunächst verborgen.

Die automatisierte Audioprüfung belegt erzeugte Daten, Decodierung und Wiedergabe im Browser. Sie ersetzt keinen menschlichen Hörvergleich und keine Unterrichtserprobung. Der ältere vollständige 263-Suiten-Lauf liegt vor den Kommunikations- und Produktionsänderungen; ein neuer Gesamtlauf wird separat im [Funktionsbericht](FUNKTIONS_PRUEFUNG_2026-09-23.md) dokumentiert.

## Fachliche Hintergründe und Fortsetzung

Bei der Ausarbeitung gelesen: [MDN zu Syntax- und Logikfehlern](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong), [MDN zum Audioelement](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio) und [W3C zur zugänglichen Mediengestaltung](https://www.w3.org/WAI/media/av/). Die bestehenden Bildlizenzkarten behalten ihre eigenen Quellenangaben.

Die bisherige konkrete Lücke bei eigener Programmierung und Tonproduktion ist damit bearbeitet. Die Einordnung aller fünf Kapitel erfolgt im [Abgleich der 2. Klasse](DGB_KLASSE2_ABGLEICH.md). Weitere Jahrgänge, andere Fächer und offene Produktkriterien bleiben Teil des Gesamtauftrags. Übersetzungen sind zurückgestellt.

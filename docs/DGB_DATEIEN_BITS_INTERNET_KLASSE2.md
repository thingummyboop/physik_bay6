# DGB: Dateien, Bits und Internetabruf – 2. Klasse

Zwischenstand vom 23.09.2026 für `dgb6_information`, Revision 4. Das Kapitel enthält zwölf bewertete Fragen und drei freie Übungen ohne Punkte. Vorhandene Filter-, Sortier- und Lizenzmaterialien bleiben erhalten.

## Ergänzte Lernhandlungen

- Acht Bits umschalten, Stellenwerte addieren und erklären, warum auch acht Nullbits ein Byte bilden.
- Dateiformat und Lizenz unterscheiden; Byte, kB/MB und KiB/MiB auf konkrete Größenbegrenzungen anwenden.
- Offene Bildungsressourcen, Creative-Commons-Bedingungen und Open-Source-Lizenzen anhand von Fällen unterscheiden.
- Drei echte UTF-8-Dateien abrufen: `A` umfasst ein Byte, `AA` und `Ä` jeweils zwei Bytes. Die Dateien enthalten weder zusätzliche Zeilenumbrüche noch eine BOM.
- Anfrage, Serverantwort, Codierung und lokale Kopie unterscheiden; HTTP-Fehler und Verbindungsfehler begrenzt interpretieren.

Die Ergänzung umfasst zwei interaktive Werkstätten, drei herunterladbare Beispieldateien und elf neue Aufträge zusätzlich zu den bestehenden Aufgaben. Beide neuen Werkstätten besitzen Papieralternativen mit getrennten Lösungen. Die alten Frage-IDs bleiben erhalten; die neue Revision kennzeichnet ältere Ergebnisse als überholt.

## Nachweise zum Zwischenstand

`test_dgb_byte_files.js` prüft alle 256 Bytewerte, echte Beispieldateiinhalte, Zurücksetzen und Fokus, HTTP-/Netzwerk-/Codierungsfehler, verspätete Antworten, Speicherung und Papiermaterialien. `test_dgb_resource_filter.js` prüft weiterhin 330 Filter-/Sortierkombinationen und jetzt alle 36 Antwortwege des zwölfteiligen Kapitelquiz anhand einer getrennten Schlüsselfixture.

Der Browserlauf vom 23.09.2026, 12:00:03 UTC, bestand mit 48 Bytezuständen, 18 echten HTTP-Abrufen, 36 Quizantwortwegen, neun freien Antworten und sechs Ansichten bei 320, 390 und 1280 Pixeln in hellem und dunklem Design. Drei Downloads, Fehlerfälle, Tastaturbedienung und die Trennung zwischen lokaler Kopie und Serveroriginal wurden ebenfalls geprüft; keine erfassten Browserfehler. Die lokale Arbeitskopie wurde automatisiert verändert, nicht in einem nativen Texteditor.

Die abschließende Layoutprüfung um 12:01:42 UTC bestätigt in allen sechs Ansichten mindestens 44 × 44 Pixel große Bit-Schaltflächen ohne horizontalen Seitenüberlauf. Die 19-seitige Lösungsdruckfassung ist vollständig gesichtet. Nach dem GitHub-Zwischenstand 9233290 wurden auch die noch offenen Seiten 13–19 sowie die endgültige mobile Wegedarstellung geprüft; dabei waren keine weiteren Änderungen nötig. Der aktuelle Gesamtfunktionslauf wird separat im [Funktionsbericht](FUNKTIONS_PRUEFUNG_2026-09-23.md) dokumentiert. Unterrichtserprobung und vollständiger Abgleich aller DGB-Kapitel der 2. Klasse bleiben offen.

## Fachliche Quellen

- [NIST: binäre Präfixe](https://physics.nist.gov/cuu/Units/binary.html)
- [MDN: Funktionsweise des Webs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- [Unicode: UTF und BOM](https://www.unicode.org/faq/utf_bom.html)
- [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de) und [BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/deed.de)
- [Open Source Definition](https://opensource.org/osd)
- [UNESCO: Open Educational Resources](https://www.unesco.org/en/open-educational-resources/mandate)

Übersetzungen bleiben ausgesetzt. Dieser Zwischenstand ist keine vollständige Fach- oder Produktabnahme.

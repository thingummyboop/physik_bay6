# Teilen, Rechte und Mediencheck – 4. Klasse

Stand: 16.09.2026. Kapitel `dgb8_kommunikation`, Revision 1. Lokale Weiterarbeit nach c1d432a. Der vorherige Zielturn war Fortschritt: KI-Quellenwerkstatt erweitert und Browser-/Druckprüfung abgeschlossen.

## Ausgangsbefund und Umsetzung

Alle vier bisherigen Abschnitte einschließlich Fragen und Übungen wurden unmittelbar gelesen. Die Aufgaben verlangten ein vorbereitetes Posting, ohne selbst Material bereitzustellen; das Protokoll blieb ein Alltagsvergleich. Die vier Fragen hatten jeweils zwei Alternativen, darunter fachfremde Ablenkantworten. Kapiteladresse und Abschnitts-IDs bleiben erhalten.

Die vier neuen Abschnitte liefern konkrete Lerngelegenheiten:

1. Anfrage/Antwort: Vier Ablaufkarten mit Browser-/Serverrichtung, definierter Modellbestand, GET und die Antwortfälle 200/404. Vier Aufgaben verlangen Durchführung, gezielten Tippfehler, selbst ergänzte Ressource und Erklärung der Grenze. Das Kartenmodell sendet keine Nachrichten und simuliert weder Transport noch Verschlüsselung. HTTPS wird von inhaltlicher Wahrheit unterschieden; 404 nicht als dauerhafte Löschung oder ausgefallenes Internet erklärt.
2. Ausschnitt: Zwölf erfundene Abstimmungskarten, vier Ja und acht Nein. Zwei Bildausschnitte und zwei Überschriften lassen Bezugsgruppen vergleichen. Originalkarten bleiben unverändert. Eine eigene Beschriftung und ein mündlicher Tonvergleich übertragen das Prinzip. Der Ausschnitt wird ausdrücklich beschnitten; zusätzliche Karten erscheinen auch im seitlichen Leerraum des SVG nicht. Papierfassung mit zwei gleich hohen Abbildungen nebeneinander.
3. Rechte: Urheberrecht, österreichischer Bildnisschutz und Datenschutz getrennt. Drei Fälle behandeln eine Grafik ohne Nutzungsnachweis, ein Gruppenfoto mit begrenztem Empfängerkreis und eine fiktive CC-BY-Grafik. Lizenzhinweis selbst erstellen und eine eigene Skizze in einem schulisch freigegebenen Bereich austauschen. Papierplanung ist ausdrücklich noch kein tatsächlich ausgeführter digitaler Austausch.
4. Plattformwahl/Verbreitung: Zwei erfundene Geschäfts-/Auswahlmodelle, wirtschaftlicher Anreiz und möglicher Einfluss auf die Wahrnehmung. Eine erste Weitergaberunde erreicht im definierten Modell neun neue Empfänger, keine neun unabhängigen Quellen. Eine belegte Korrektur und Prüfung des eigenen Beitrags schließen das Kapitel ab.

16 konkrete Aufgaben, acht bewertete Fragen mit je drei Alternativen und drei Übungen mit null Punkten. Die vier bisherigen bewerteten IDs bleiben erhalten; die beiden Rechtefragen liegen nun passend in Abschnitt 3. Die Wiederholungszuordnung wird gegen die tatsächlichen Abschnitte geprüft. Revision 1 kennzeichnet frühere Ergebnisse als veraltet. Keine Übersetzungen geändert; Titelindex nach Revision neu erzeugt.

## Nachweise

- `test_media_context.js`: vier Bild-/Überschriftkombinationen, unveränderte zwölf Originalkarten, richtige Ausschnittgeometrie und Beschreibungen, Reset/Fokus/Speicher und erneute Initialisierung. 24 unabhängig festgelegte bewertete Antwortwege, drei Übungsschlüssel, 16 Aufgaben, vier Ablaufkarten, drei Rechtefälle. Tatsächliche Papiergenerierung mit zwei statischen Bildern und vier getrennten Lösungen. Bestanden.
- `browser_media_context.js`, finaler Bericht 2026-09-16T15:35:40.013Z, Chromium 151.0.7922.34: 24 Kombinationen aus zwei Bildern, zwei Überschriften, drei Breiten (320/390/1280) und zwei Designs. Native Auswahl, Reset/Enter, Auswahl per Pfeiltaste, Fokus, unveränderter Speicher, Beschriftungsfarben, 44-Pixel-Ziele und kein äußerer Seitenüberlauf. Alle 24 Quizantwortwege einschließlich Neustart bestanden. Keine Seitenfehler.
- Visuelle Prüfung der mobilen Ansichten hell/dunkel: Auswahltexte nach erster Sichtprüfung verkürzt. In der ersten Druckfassung verbrauchte der hochkant vergrößerte Ausschnitt fast eine eigene Seite; beide Ansichten anschließend auf gleiche Höhe gesetzt und nebeneinander angeordnet. Finaler Export hat 13 Seiten.
- Alle 13 Druckseiten gelesen. Nach letzter Verbesserung der HTTP-Ablenkantworten wurde Seite 7 erneut gelesen; die übrigen zwölf Seiten sind per SHA-256 bildidentisch mit der zuvor gelesenen Fassung. Kein überlappender oder abgeschnittener Inhalt festgestellt. Prüfung verwendet lokale Vorschauadressen in den Kapitelverweisen.
- Bestehende Prüfungen für KI-Quellenwerkstatt, Datenspuren, alle 21 DGB-Arbeitsblätter, Medienvergleich, Kapitelrevisionen, vollständige Quizpools und Titelauswahl bestanden. Syntaxaudit für 87 Dateien bestanden; kein neuer Gesamtlauf aller Suiten. Ein anfänglicher Syntaxfehler im neuen Modell wurde vor den erfolgreichen Läufen behoben. Ein zusätzlicher Test wurde zunächst unter falschem Dateinamen aufgerufen; `test_complete_chapter_quizzes.js` danach erfolgreich ausgeführt.

Berichte und Druckbilder liegen außerhalb des Repositorys unter `../browser-qa/media-context`. Papierbilder `checked-01.png` bis `checked-13.png` entsprechen dem letzten Export. Keine echten Nachrichten, Posts, Fotos oder Kontodaten wurden verwendet oder veröffentlicht.

## Quellen und Abgrenzung

Am 16.09.2026 unmittelbar geöffnet:

- [RIS: Mittelschullehrplan, Fassung vom 16.09.2026](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850), Anlage 1, DGB 4. Klasse, Kommunikation: Protokollfunktion, Medienkonstruktion, Unternehmensinteressen, verantwortlicher Austausch und zugehörige Anwendungsbereiche.
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), insbesondere 15.3.1 und 15.5.5: Status 200/404. [MDN, HTTP-Überblick](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview): grundlegender Anfrage-/Antwortablauf. Keine Darstellung vollständiger Nachrichten oder aller Versionen.
- [RIS, UrhG § 78](https://www.ris.bka.gv.at/eli/bgbl/1936/111/P78/NOR12024485): berechtigte Interessen bei öffentlicher Verbreitung von Bildnissen. Der erste Einzelabruf scheiterte; der ELI-Abruf war erreichbar und wurde gelesen.
- [Österreichische Datenschutzbehörde, Foto und Video](https://dsb.gv.at/faqs/foto-video): Erlaubnis für Aufnahme ist nicht automatisch Erlaubnis für Weitergabe/Veröffentlichung.
- [Creative Commons, CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de): Namens-/Rechteangaben, Lizenzverweis, Änderungen und mögliche weitere Rechte. Die erfundene Karte C ist Unterrichtsmaterial, keine Lizenzierung einer fremden Grafik.

Die Materialien sind konkrete Teilbelege für den Lehrplan. Nicht nachgewiesen sind die tatsächliche Durchführung in einer Schulplattform, eine vollständige Behandlung aller datenschutzrechtlichen Grundlagen, eine umfassende Fachabnahme oder die Kompetenz einzelner Lernender. Die übrigen Anforderungen des Gesamtprojekts bleiben offen.

# DGB-Kommunikation der 2. Klasse: Netze, Medienwahl und Nachrichtenprüfung

Stand: 23.09.2026, lokale Weiterarbeit nach `9233290`. Kapitel `dgb6_kommunikation`, Revision 2. Vier Abschnitte führen jetzt von Paketübertragung über Kommunikationsmedien und Plattforminteressen zu Phishing und Quellen-/Darstellungsprüfung. Die vorhandenen Paketkarten, Phishing-Nachricht A und Quellenkette B1–B3 bleiben erhalten.

## Zuordnung zum Lehrplan

Grundlage ist der am 23.09.2026 abgerufene [österreichische Mittelschullehrplan im RIS](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850), Digitale Grundbildung, 2. Klasse, Kompetenzbereich Kommunikation. Der betreffende Abschnitt wurde für diese Überarbeitung vollständig gelesen. Die folgende Tabelle paraphrasiert die drei Kompetenzanforderungen und vier Anwendungsbereiche; sie behauptet keine amtliche Approbation.

| Anforderung | Konkrete Lerngelegenheit und überprüfbares Ergebnis |
| --- | --- |
| T: Informationen zerlegen, durch mehrere Geräte übertragen und am Ziel zusammensetzen | Vier nummerierte Wortkarten, interaktiver Empfang mit Lücken und Duplikaten; zwei Wege über jeweils drei Router; Rollenübung mit Zurückhalten einer Karte. Ergebnis: Wegeskizze, Empfangsprotokoll und Unterscheidung von Zieladresse und Position. |
| G: Kommunikationsmedien nach Verwendung unterscheiden, Wirkungen auf Lebensumfeld und Gesellschaft sowie Meinungsbildung/Manipulation beschreiben | Vergleichstabelle mit vier Medienfunktionen; K1 Museumsänderung und K2 zeitversetzte zugängliche Zusammenarbeit; M1/M2 zur Schulhofbefragung. Ergebnis: begründete Kanalwahl, formulierte Nachricht, veränderte Darstellung und mögliche Folgen für Beteiligung. |
| I: Social Media und Anbieterinteressen erklären | Definition durch Beiträge, Austausch und Vernetzung; G1 Werbefinanzierung und G2 beitragsfinanzierter Vergleichsdienst. Ergebnis: getrennte Geld-, Daten- und Inhaltsflüsse, benannte bekannte und unbekannte Angaben. |
| Geschäftsmodelle und Verwendung persönlicher bzw. personenbezogener Informationen | Werbeausspielung von Namensverkauf unterscheiden; beobachtete Ansichten von vermutetem Interesse trennen; werbefrei bedeutet nicht ohne Kontodaten. Ergebnis: Fallvergleich und begrenzte Schlussfolgerungen. |
| Falschmeldungen, Darstellung/Realität, Manipulation und Interessen | Quellenkette B3 → B2 → B1 erhalten; 12/8/4-Stimmenvergleich mit zwei Überschriften ergänzt. Ergebnis: Quellenprotokoll, korrigierte Aussage, Trennung von Wirkung und nicht belegter Absicht. |
| Schutz personenbezogener Daten | Geeignete Zielgruppe statt öffentlicher Namens-/Treffpunktliste, getrennte Prüfung von Sichtbarkeit und Anbieterzugriff, Berechtigungsauftrag ohne persönliche Belege. Ergebnis: dokumentierte Einstellung oder gekennzeichneter Modellfall. |
| Internetbetrug und Phishing | Nachricht A mit Zeitdruck, drohendem Punktverlust und abweichender Adresse; unabhängiger Prüfkontakt statt Rückfrage an die verdächtige Nachricht. Ergebnis: vier konkrete Prüfschritte und Meldungsentwurf ohne Zugangsdaten. |

## Umfang und didaktische Entscheidungen

- Sechs neue Entscheidungsfälle in drei Werkstätten; jede Antwort erhält eine zum Fall passende Begründung. Der letzte Fall enthält seine Daten selbst und kann unabhängig vom vorherigen gelesen werden.
- 16 neue Arbeitsaufträge plus 14 erhaltene Aufträge zu Paketen, Phishing und Quellen. Die optionalen realen Arbeitsaufträge unterscheiden tatsächliche Durchführung von Papierplanung; fehlende Recherchebelege dürfen offenbleiben.
- Zehn bewertete Kapitelaufgaben mit 30 Antwortwegen; vier bestehende Aufgaben-IDs bleiben erhalten, sechs neue Aufgaben ergänzen Router, Medienwahl, Geschäftsmodell, Profilvermutung, Darstellung und Wirkung.
- Drei freie Übungen mit je drei fachlich plausiblen Antworten ersetzen die bisherigen unpassenden Ablenker. Alle freien Antworten geben null Punkte. Alte Ergebnisse der Revision 1 gelten nicht als aktueller Nachweis für Revision 2.
- Lernziele, Zusammenfassung und Abschnittszuordnung sind auf den neuen Lernweg abgestimmt. Papieralternativen für alle sechs Entscheidungsfälle und getrennte Vergleichslösungen bleiben verfügbar.

Die Routen sind Modelle mit einem Zielserver und erklären keinen vollständigen Netzwerkprotokollstapel. Weiterleitung, Reihenfolge und Fehlbehandlung werden getrennt; weder automatische Wiederholung noch unterschiedliche Wege für jedes einzelne Paket werden pauschal behauptet. ClipTreff und TeamForum sind erfunden und belegen keine aktuellen Geschäftsbedingungen realer Dienste. Die Klassenbefragung ist ebenfalls erfunden; sie erlaubt keine Aussage über alle Wiener Schüler:innen.

## Prüfung

- `test_communication_media.js`: 18 unabhängige Fallentscheidungen, 30 Kapitelantwortwege mit getrennt gepflegtem Lösungsschlüssel, Abschnittszuordnung, Revision, Fokus, Rücksetzen, unveränderte Speicherung durch Werkstätten, Papierfälle und getrennte Lösungen; bestanden, nach letzter Textpräzisierung erneut ausgeführt.
- `test_dgb_packet_order.js`: weiterhin alle 341 Empfangsfolgen bis Länge vier einschließlich Duplikaten und fehlenden Karten; bestanden. Der alte Vier-Fragen-Vertrag wurde durch die neue separate Zehn-Fragen-Prüfung ersetzt.
- `browser_communication_media.js`: Chromium 151.0.7922.34, Lauf vom 23.09.2026, 12:22:33 UTC. 108 native Fallentscheidungen, 30 bewertete Antwortwege, neun freie Antworten, sechs Ansichten (320/390/1280 Pixel, hell/dunkel), Tastaturauswahl, Tab/Enter, Rücksetzen/Fokus und Paketrekonstruktion; keine erfassten Browserfehler. Die Werkstätten verändern den Quizspeicher nicht.
- Die abschließende Kontextpräzisierung von M2 wurde um 12:27:53 UTC in allen sechs Ansichten mit weiteren 18 Entscheidungen geprüft. Druckfassung anschließend neu erzeugt; alle 21 Seitenbilder sind zur zuvor gesichteten Endfassung identisch. Sämtliche **21 endgültigen Druckseiten** gelesen; die zunächst im kleinen Vorschaubild unklaren Schreibzeilen auf Seite 14 zusätzlich in höherer Auflösung bestätigt. Mobile Netzweg-, Fall- und Schlussdarstellungen gesichtet.
- DGB-Arbeitsblätter aller 21 Kapitel, übersetzter Titelindex, vollständiger Quizpool, gezielte Wiederholung und vorhandene Punktezählerwerkstatt bestanden ihre jeweiligen Prüfungen. Letztere beiden allgemeinen Suiten sind ergänzende Regressionsevidenz, kein Ersatz für die neue Kommunikationsprüfung.
- Inventar unverändert 198 Kapitel. Prioritätsaudit: 1.974 Frageninstanzen, darunter 232 in DGB, ohne strukturellen Befund. Das Audit beweist keine fachliche Vollständigkeit.

Der vollständige Lauf mit 263/263 Suiten aus dem GitHub-Zwischenstand fand **vor** dieser Überarbeitung statt. Für diesen Stand wurden die oben genannten gezielten Prüfungen ausgeführt; ein neuer vollständiger Lauf wird nicht behauptet. Die neue Kommunikationssuite erhöht die vorhandene Sammlung auf 264 Suiten.

Die sieben zuvor offenen Druckseiten von [DGB-Information der 2. Klasse](DGB_DATEIEN_BITS_INTERNET_KLASSE2.md) und dessen endgültige mobile Wegedarstellung sind ebenfalls geprüft. Damit ist diese konkrete Restprüfung geschlossen.

## Fachliche Hintergründe

- [MDN: Wie das Internet funktioniert](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work), gelesen am 23.09.2026.
- [RFC 9293: TCP, Abschnitt 2.2](https://www.rfc-editor.org/rfc/rfc9293.html#section-2.2), am 23.09.2026 erneut konsultiert.
- [bpb: Geschäftsmodelle von Social-Media-Unternehmen](https://www.bpb.de/themen/medien-journalismus/soziale-medien/545978/das-geschaeftsmodell-von-social-media-unternehmen/), gelesen am 23.09.2026; eigene vereinfachte Fälle, keine Übernahme aktueller Produktkonditionen.
- [Saferinternet.at: Onlineinhalte überprüfen](https://www.saferinternet.at/wie-ueberprueft-man-onlineinhalte), am 23.09.2026 erneut konsultiert.

## Fortsetzung nach dem Zwischenstand

Die anschließend ausgearbeitete [Produktion der 2. Klasse](DGB_PRODUKTION_KLASSE2.md) enthält jetzt eine tatsächlich ausführbare Programmierwerkstatt und eine Text-/Grafik-/Tonwerkstatt mit gespeicherten Arbeitsdateien, konkretem Remixauftrag und überprüfbaren Ergebnissen. Punktezähler und Bildlizenzkarten bleiben erhalten. Der [zusammenhängende Klassenabgleich](DGB_KLASSE2_ABGLEICH.md) ordnet alle fünf Kapitel dem aktuellen Lehrplan zu. Die zuvor hier genannten konkreten Produktionslücken sind damit bearbeitet; die 1. Klasse und weitere Fach-/Produktprüfungen bleiben offen.

Dies ist eine abgeschlossene Kapitelüberarbeitung, keine vollständige Fach- oder Produktabnahme. Übersetzungen bleiben ausgesetzt; keine weitere Veröffentlichung oder GitHub-Sicherung ohne entsprechenden Auftrag.

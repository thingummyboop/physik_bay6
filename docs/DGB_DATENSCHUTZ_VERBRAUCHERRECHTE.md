# DGB: Datenschutz und Verbraucherrechte

Stand: 23.09.2026. Dieser Nachweis beschreibt die laufende Ergänzung nach `ceb183e`, keine vollständige Fach- oder Produktabnahme.

## Enthaltene Änderungen

`dgb8_kommunikation` hat in Revision 2 fünf Abschnitte und elf bewertete Fragen. Der neue Abschnitt erklärt Datenschutzgrundlagen und acht Betroffenenrechte mit Voraussetzungen und Grenzen. Vier fiktive Fälle behandeln Auskunft, Berichtigung, eine begrenzte Aufbewahrungspflicht und eine unbeantwortete Anfrage. Hinzu kommen vier weiterführende Arbeitsaufträge, eine Papieralternative, getrennte Lösungen und drei neue Quizfragen. Die Rechteübersicht verwendet auf schmalen Bildschirmen lesbare Karten. Anfragen werden ausschließlich als Übung entworfen, nicht versendet.

`dgb8_handeln` hat in Revision 2 vier Abschnitte und neun bewertete Fragen. Beim Abo-Vergleich werden angezeigte Modellpreise jetzt ausdrücklich von berechtigten Forderungen unterschieden: Das vorausgewählte Extra ist nicht allein durch unterlassenes Abwählen ausdrücklich vereinbart. Der Unterrichtstext behandelt Zustimmung, Rückforderung bereits bezahlter Zusatzentgelte und die getrennte Beurteilung des Hauptvertrags. Ein eigener Erwachsenenfall vermeidet die Vermischung mit der Geschäftsfähigkeit Minderjähriger. Altersangaben, eine vorhandene Preisfrage und ihre Rückmeldungen wurden präzisiert; eine neue Frage prüft den Zusatzentgeltfall.

## Quellenabgleich

Im Arbeitsverlauf am 23.09.2026 wurden folgende Primärquellen für diese Ergänzungen gelesen:

- Datenschutzbehörde: [Betroffenenrechte](https://dsb.gv.at/rechte-pflichten/ihre-rechte-als-betroffene-person), [FAQ](https://dsb.gv.at/faqs/), [Pflichten Verantwortlicher](https://dsb.gv.at/rechte-pflichten/ihre-pflichten-als-verantwortlicher), [Beschwerdeverfahren](https://dsb.gv.at/ueber-die-datenschutzbehoerde/beschwerdeverfahren) und [Rechtsquellen](https://dsb.gv.at/rechte-pflichten/rechtsquellen).
- RIS: [Datenschutzgesetz, aktuelle Gesamtfassung](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597), insbesondere § 1 und § 4 Abs. 4; [§ 6c KSchG](https://www.ris.bka.gv.at/eli/bgbl/1979/140/P6c/NOR40162141) und [§ 170 ABGB](https://www.ris.bka.gv.at/eli/jgs/1811/946/P170/NOR40146782).
- Ergänzend: [amtliche Information zur Geschäftsfähigkeit](https://www.oesterreich.gv.at/.syndication?pageId=ea950e98-a5b9-42e0-be0a-75a29c19b90a) sowie die [Internet Ombudsstelle](https://www.ombudsstelle.at/) als Hilfsangebot.

Der unmittelbare EUR-Lex-Abruf war technisch nicht lesbar. Eine vollständige eigene Prüfung des DSGVO-Originaltextes wird deshalb nicht behauptet; die Erläuterungen stützen sich auf die Datenschutzbehörde und die genannten österreichischen Gesetzestexte. Ältere externe Kapitelverweise wurden nicht sämtlich erneut geprüft.

## Prüfungen und Grenzen

Die gezielten Funktionstests `test_privacy_rights.js`, `test_media_context.js`, `test_dgb_action.js`, `test_dgb_worksheets.js` und `test_translated_title_search.js` bestanden. Die unabhängigen Antwortschlüssel umfassen 33 Antwortwege in Kommunikation und 27 in Handeln.

Der native Browserbericht dokumentiert 72 Fallentscheidungen, alle 60 Quizantwortwege, zwölf Kapitelansichten, Zurücksetzen und Fokusführung ohne Änderung gespeicherter Fortschritte durch die Fallwerkstatt. Nach der Umstellung der Rechteübersicht auf Karten bestanden nochmals zwölf Layoutprüfungen. Die Berichte liegen außerhalb des Repositories unter `../browser-qa/privacy-rights/`.

Nach dem GitHub-Zwischenstand `980c82e` wurde die noch offene Sichtprüfung abgeschlossen. Geprüft sind im Kommunikationskapitel die betroffenen Seiten 6–9, 11, 14–16, 19 und 21 der endgültigen 21-seitigen Lösungsdruckfassung; in Handeln die Seiten 4–7, 10–11 und 13–15 der endgültigen 15-seitigen Fassung. Texte, Falloptionen, neue Fragen, Quellen und getrennte Lösungen sind in diesem Umfang lesbar, ohne abgeschnittene Inhalte oder Überlagerungen. Die Klassenmatrix ist auf die neuen Inhalte fortgeschrieben.

Es gab keinen neuen vollständigen Funktionstestlauf und keine vollständige Prüfung aller Schülerdruckfassungen. Die gezielten Datenschutz-, Medienkontext- und Handeln-Tests bestanden beim Sichern nochmals. Die Ergänzungen sind ein abgegrenzter Inhalts- und Prüfschritt; die Gesamtprüfung aller DGB-Jahrgänge und aller Produktanforderungen bleibt offen.

# Fachübergreifender Abgleich – 08.09.2026

Dieser Registerstand trennt vorhandene Kapitel von nachgewiesener Fachabdeckung. Die bisherige chronologische Dokumentation ersetzt keinen abschließenden Abgleich. Bei der Erstellung dieses Registers wurden Navigation, Abschnittstitel aller Fächer und die sieben Haushaltskapitel geprüft; der vollständige Haushalts-Fachlehrplan wurde aus der gespeicherten RIS-Fassung gelesen. Spätere inhaltliche Ergänzungen werden in den Befunden nachgeführt.

## Nachweisverfahren

`node scripts/audit_curriculum_inventory.js` erzeugt `CHAPTER_INVENTORY.json` aus der echten Navigation und deutschen Kapitelquelle, einschließlich SHA-256 der Eingaben, Klassenangaben, Lernzielen, Abschnitten und Frage-IDs. Die Zählung von Abschnittsfragen umfasst ausdrücklich keine separat definierten Abschlussfragen, Werkstätten oder generierten Aufgaben. Für fachliche Freigabe muss jeder Kompetenz- und Anwendungsbereich des Fachlehrplans mit Erklärung, Lernhandlung und überprüfbarer Leistung verbunden werden. Eine Überschrift oder ein vorhandenes Lernziel reicht dafür nicht.

Grundlage: [BMB-Lehrplanseite](https://www.bmb.gv.at/Themen/schule/schulpraxis/lp/lp_ms.html), erneut am 08.09.2026 gelesen; vollständige gespeicherte RIS-Textfassung `../lehrplan.txt` vom 05.09.2026. Gesetzesänderungen und standortspezifische Stundentafeln sind vor Abschluss erneut abzugleichen. Keine Approbation behaupten.

## Alle vorhandenen Fächer

| Fach | Navigationseinträge | Vorhandener konkreter Ansatz | Noch notwendiger Abschlussnachweis |
|---|---:|---|---|
| Physik | 20 | Eigene Kompetenzmatrix `PHYSIK_LEHRPLANABGLEICH.md`; Mess-, Modell-, Quellen- und Papieraufträge | Offene Matrixzeilen schließen und alle Kernkapitel einschließlich Grundstoff/Vertiefung konsolidieren |
| Digitale Grundbildung | 21 | Vier Jahrgänge entlang fünf Strängen; zusätzliche Word-Werkstatt | Fachlehrplan vollständig gelesen; dgb8_information enthält jetzt praktische Sicherung/Wiederherstellung mit Versionsvergleich, alle 21 DGB-Arbeitsblätter enthalten Aufgabenmaterial. Vollständige jahrgangsweise Kompetenzmatrix, weitere tatsächliche digitale Handlungen sowie Rechts-/Softwareprüfung weiterhin offen |
| Geografie und wirtschaftliche Bildung | 16 | Lebenssituationen, Naturgefahren, Ressourcen, Arbeit, Österreich, Europa und globale Verflechtungen | Abgleich aller vier Klassen aus historischen Ergänzungen zu einer aktuellen Matrix zusammenführen; Daten und Entscheidungsaufgaben prüfen |
| Chemie | 15 | Klasse 4, Lernweg von Stoffeigenschaften bis Umweltchemie | Jeden Kompetenzbereich an Experiment, Modellgrenze, Deutung und begründetem Urteil nachweisen |
| Biologie und Umweltbildung | 39 | Vier Jahrgänge mit Lernstationen, Körper, Vielfalt und Ökosystemen | Vollständige jahrgangsweise Matrix; biologische Modelle, Beobachtungsaufträge und Gesundheitsaussagen überprüfen |
| Deutsch | 11 | Lese-, Schreib-, Gesprächs- und Reflexionswerkstätten; jetzt vollständige Textmaterialien auf allen Arbeitsblättern | Progression aller Kompetenzbereiche pro Klasse und hinreichend eigenständige Textüberarbeitung belegen |
| Englisch | 9 | Zielsprachentexte und Werkstätten; vollständige Arbeitsblatttexte; jahrgangsweiser Abgleich in ENGLISCH_LEHRPLANABGLEICH.md | Hörablauf vor Transkript, Informationslücken im Gespräch, Literatur/kulturelle Perspektiven und zusammenhängende Texte ausbauen; keine Sprachkompetenz aus Vorlesefunktion ableiten |
| Ernährung und Haushalt | 7 | Klasse 2; detaillierter Abgleich unten | Verbleibende praktische und verbraucherbezogene Aufgaben ergänzen; gesamte Fachfreigabe offen |
| Kunst und Gestaltung | 11 | Eigene Matrix `KUNST_LEHRPLANABGLEICH.md`, Originalmaterial und Werkstätten | Offene Matrixpunkte und Zusammenhang von Wahrnehmen, Gestalten und Reflektieren prüfen |
| Musik | 7 | Vollständiger Fachlehrplan gelesen, aktuelle Jahrgangsmatrix in MUSIK_LEHRPLANABGLEICH.md; Notenmotiv und Papiermaterial ergänzt | Konkretes Lied-/Hör-/Tanzrepertoire, Harmonik, historische Kontexte und digitale Aufnahme/Bearbeitung ergänzen |
| Mathematik | 41 | Vier Jahrgänge, Modelle, Rechen- und Anwendungsaufgaben sowie Extras | Kompetenzmatrix pro Klasse; besonders Begründen, Modellieren und Interpretieren durch konkrete Aufgaben nachweisen |

Diese Tabelle nennt Prüfaufträge, keine pauschal behaupteten Inhaltslücken. Die Zahl 197 enthält Übersichten, Vertiefungen und Zusatzangebote; sie ist keine Anzahl vollständig abgedeckter Lehrplaneinheiten.

## Ernährung und Haushalt: aktueller inhaltlicher Abgleich

Gelesener Fachlehrplan: beide Kompetenzbereiche, sämtliche Kompetenzbeschreibungen und Anwendungsbereiche der 2. Klasse sowie didaktische Grundsätze. Fundstelle im gespeicherten Text: von `ERNÄHRUNG UND HAUSHALT` bis `B. VERBINDLICHE ÜBUNGEN`. Die Zuordnung aller sieben Kapitel zur 6. Schulstufe stimmt mit dieser Fachfassung überein; schulautonome Regelungen bleiben gesondert zu berücksichtigen.

| Bereich des Lehrplans | Tatsächliche Fundstellen in lang/de.json | Befund und nächste Handlung |
|---|---|---|
| Gewohnheiten und Ernährungsbiografie reflektieren | eh_1_ernaehrung, section0/section2, essalltag_protokoll und Werkstatt | Strukturierter Früher-/Heute-Vergleich, fiktives Zwei-Tage-Material, freiwilliger eigener oder gleichwertiger fiktiver Protokollweg, Beobachtung/Vermutung/offene Frage, organisatorischer Plan und ausdrücklich tatsächliche bzw. erfundene Auswertung ergänzt. Keine Diagnose oder Bewertung privater Essgewohnheiten; ein Papierauftrag belegt noch keine durchgeführte Unterrichtsreflexion. |
| Bedarfsgerechte Ernährung, Modelle und Inhaltsstoffe | eh_1_ernaehrung, section0/section1 | Grundfunktionen, Lebensmittelgruppen und Tellermodell vorhanden; systematische Arbeit an aktueller österreichischer Pyramide und selbst ausgewertetem Ess-/Trinkprotokoll ergänzen |
| Lebensmittelqualität, Kennzeichnung, Lagerung und Haltbarmachung | eh_1_hygiene; eh_2_einkaufen, section1; eh_2_zubereiten, section2 | Neu: vier Verfahren mit Grenzen und dreiteilige Etikettenuntersuchung. Weiter offen: genauer Zutaten-/Qualitätsvergleich, Lebensmitteltrends und differenzierter Warentest |
| Grundtechniken und bedarfsgerechte Tagesmahlzeiten | eh_2_zubereiten, section0–section2; eh_4_projekt | Kalte Jause und Mengenplan sowie warme Karottenbeilage in eh_2_zubereiten/warm_duensten vorhanden: Abmessen, gleichmäßiges Schneiden, Dünsten, Flüssigkeitskontrolle, Garprobe, Mengenübertragung und Arbeitsprotokoll. Kochen/Dämpfen werden abgegrenzt, aber noch nicht eigenständig praktisch angeleitet. Ergänzung zur Mahlzeit wird geplant; weitere Tagesmahlzeiten und praktische Unterrichtserprobung bleiben offen |
| Ernährungsentscheidungen mit Qualität und Genuss begründen | eh_1_ernaehrung Werkstatt; eh_2_zubereiten section2; eh_4_projekt section2 | In eh_2_zubereiten/sensorischer_vergleich ergänzt: kontrollierter Schnittformvergleich, beschreibender Wortschatz, vier fiktive Einzelnotizen, eigener Untersuchungsbogen, unabhängige Beobachtung und Reihenfolgenwechsel, zweckbezogenes Urteil mit Grenzen. Bearbeitung ohne Verkosten ist gleichwertig. Praktische Durchführung und Unterrichtserprobung bleiben von den geprüften Online-/Papiermaterialien unterschieden |
| Konsum, Ressourcen, lokale/globale Herstellung | eh_3_nachhaltig, section0–section2 und Werkstatt | Produktlinienanalyse in eh_3_nachhaltig/produktvergleich ergänzt: zwei ausdrücklich fiktive Brotangebote, sieben Lebensweg-/Arbeitsbereiche, vorhandene Daten und offene Auskünfte. Grundpreise, Kassenbeträge und Überschüsse für zwei Bedarfssituationen berechnet; soziale und ökologische Aussagen von Kosten getrennt. Alle 21 Kapitelantwortwege, Rechenfälle und vollständige Arbeitsblattmaterialien geprüft. Eigene Anwendung und Unterrichtserprobung bleiben offen |
| Produkte, Preise und Konsumentscheidungen | eh_2_einkaufen, section0/section1 und Werkstatt | Grundpreis, Verbrauchskosten und Kassenbetrag getrennt. Neu in angebot_leistung: Preisfaktoren, enthaltene Leistungen, Eigenarbeit/Personenminuten, zwei fiktive Aufträge mit Budget-/Zeit-/Personalentscheidung und Auftragskontrollbogen. Qualitätsfragen und tatsächliche Ergebnisse bleiben von Werbeaussagen und Zusagen getrennt. Differenzierter Zutaten-/Produktvergleich und Lebensmitteltrends weiterhin offen |
| Arbeitsorganisation, Ressourcen und Haushalt | eh_3_haushalt, alle Abschnitte und Werkstatt | Planung, Abhängigkeiten, Zeit, Material, unbezahlte Arbeit und faire Aufteilung konkret vorhanden; praktische Ergebnisse werden von Lernenden dokumentiert, nicht durch Quiznoten ersetzt |
| Budget, Nutzung, Rechte/Pflichten und Reklamation | eh_2_einkaufen section2/Werkstatt; eh_3_haushalt section2; eh_4_projekt | Fiktive Reklamation und Budgetauftrag vorhanden; Plan-/Ist-Belegsatz jetzt in eh_4_projekt/projektabrechnung: fünf Zutaten mit Vorräten, Bedarf, Packungen und Preisen, separater Kassenbeleg, Abschlussbogen, gegenseitige Prüfung und Vergleichslösung. Rechtliche Quellen vor Freigabe erneut prüfen |

## Nächste Arbeit nach diesem Register

1. Haushaltslücken als zusammenhängenden Lernweg ergänzen: Protokoll und Qualitätsvergleich, weitere Küchentechniken. Der vollständige Projekt-Belegsatz wurde ergänzt. Praktische Küchenarbeit wird als angeleitete Unterrichtsaufgabe angeboten; ein Planspiel belegt keine ausgeführte Küchentechnik.
2. Musik, Deutsch und Englisch als bislang knappste Fächer vollständig gegen die jeweiligen Jahrgangskompetenzen lesen und konkrete Lücken priorisieren. Danach die umfangreicheren Fächer konsolidieren. Vorhandene historische Arbeiten nicht nochmals pauschal ersetzen.
3. Lehrerunterlagen: Alle sieben Haushalts-Arbeitsblätter übernehmen jetzt auch Abschnittstexte, Tabellen, Quellen und den neuen Etikettenbogen sowie die bisherige Werkstatt. Interaktive Planer bleiben ausdrücklich online; uninitialisierte Tabellen werden nicht als Rechenergebnis ausgegeben. Material und Lösungen lassen sich unabhängig ein-/ausblenden. Die tatsächliche Druckdarstellung bleibt ungeprüft.
4. Nach stabiler deutscher Abdeckung Gesamtfunktion und Browser-/Geräte-/Druckabläufe prüfen und die fertige Fassung veröffentlichen. Die Übersetzungsarbeit bleibt gemäß späterer Nutzeranweisung ausgesetzt. Vorrang haben Physik, Mathematik, Chemie, Biologie und DGB; der Auftrag für die übrigen vorhandenen Fächer bleibt bestehen.

### Deutsch – vertiefter Abgleich 08.09.2026

Siehe DEUTSCH_LEHRPLANABGLEICH.md: Hauptfach über alle vier Klassen mit elf tatsächlichen Kapiteln verglichen. Neue konkrete Aufgaben zu Rechtschreibstrategien und situationsgerechter Sprache im Grundlagenkapitel. Noch kein vollständiger Fachabschluss; literarische Vielfalt, Leseentwicklung, Quellenprogression und längere digitale Textproduktion bleiben insbesondere offen.

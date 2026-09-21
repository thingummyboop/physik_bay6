# Ausscheidung und Gesundheit: Stoffwege und Modellgrenzen

Stand: 21.09.2026. Kapitel `bio_3_ausscheidung_gesundheit`, Revision 2, für die 7. Schulstufe. Voraussetzung ist Blut und Kreislauf.

## Ausarbeitung

Vier Abschnitte verbinden Ausscheidungswege, Harnbildung, Wasser im Schulalltag und begründetes Hilfeholen. Die generischen Aufgaben wurden durch zwölf direkte Arbeitsaufträge ersetzt. Dazu kommen 16 Fachbegriffe, vier getrennte Vergleichslösungen, zehn bewertete Fragen mit antwortspezifischer Rückmeldung und eine punktfreie Übung. Bestehende Frage-IDs bleiben erhalten; zwei Modellfragen sind neu. Frühere Ergebnisse aus Revision 1 gelten für die neue Fassung als veraltet.

- Eine Stoffwegtabelle unterscheidet Kohlenstoffdioxid, Harnstoff, Wasser und unverdaute Reste. Ein eigenes Flussschema zeigt Nieren, Harnleiter, Harnblase und Harnröhre. Es stellt Funktionen und Reihenfolge dar, keine anatomische Lage. Blutweg und Harnweg werden getrennt erklärt.
- Die Werkstatt vergleicht bloße Filtration mit zusätzlicher Rückgewinnung. Drei erfundene Varianten A/B/C ergeben insgesamt sechs Zustände. Ausgangspunkt sind je 100 Wasser-, 10 Glucose- und 4 X-Einheiten im Filtrat. Ohne Rückgewinnung bleiben diese Mengen unverändert. Mit Rückgewinnung bleiben 10/5/2 Wasser, jeweils 0 Glucose und 4 X. Die Lernenden sagen Ergebnisse voraus, prüfen Erhaltung der einzelnen Mengen und vergleichen Konzentrationen.
- Die Vertiefung berechnet X je zehn Wassereinheiten: nach Rückgewinnung 4/8/20. Die Gesamtmenge X bleibt dennoch vier. Einheiten sind frei gewählte Rechengrößen; X ist kein bestimmter echter Stoff. Sekretion, Hormone, Druck und zeitliche Regulation fehlen ausdrücklich. Die Varianten stellen weder gesunde und kranke Personen noch Trinkempfehlungen dar.
- Ein erfundenes Trinkprotokoll ergibt für vier Zeitfenster 800 ml bzw. 0,8 l. Es ist keine Tagesempfehlung. Aufgaben verlangen fehlende Größen einer vollständigen Wasserbilanz und Verbesserungen eines Wiener Schulausflugs: Wasserzugang, Pausen, Toiletten und Alternativen für fehlende Flaschen.
- Drei Fälle unterscheiden Beobachtung von Diagnose, angemessene Hilfe von Abwarten und fachliche Aufgaben von der Veröffentlichung persönlicher Körperdaten. Niemand muss private Mengen, Fotos oder Beschwerden offenlegen. Keine Körperflüssigkeiten werden gesammelt.

Die Werkstatt speichert nichts und vergibt keine Punkte. Geänderte Eingaben entfernen alte Ergebnisse. Native Auswahlfelder, Auswertung und Zurücksetzen sind mit der Tastatur bedienbar. Eine vollständige Papieralternative nutzt dieselben Modellregeln. Tabellen werden am Handy als beschriftete Karten dargestellt.

## Nachweise

- `scripts/test_excretion_model.js`: sechs unabhängig festgelegte Modellergebnisse, Menge/Konzentration, Verwerfen veralteter Ergebnisse, ungültige Auswahl, doppelte Initialisierung, Zurücksetzen, Fokus und unveränderter Speicher bestanden. Alle 30 Quizantwortwege mit separat festgelegten Schlüsseln geprüft; bei einer falschen Antwort 90 Prozent, richtige Wiederholungszuordnung und passende Rückmeldung. Direkte Aufgaben, Tabellenzahlen, Fachbegriffe, Revision und vollständige Papieralternative geprüft.
- `scripts/browser_excretion_model.js`: Chromium 151.0.7922.34, Bericht vom 21.09.2026, 06:46:18 UTC. 36 Modell-/Layoutzustände: sechs Zustände bei 320/390/1280 Pixeln, jeweils hell und dunkel. Zusätzlich native Auswahl per Pfeiltasten, Tab-Wechsel, Enter, Rücksetzen/Fokus und unveränderter Speicher geprüft. Alle 30 Quizantwortwege im Browser bestanden; keine Browserfehler. Kartenfarben und Mindesthöhe der Bedienelemente geprüft.
- Alle 14 mobilen Detailbilder gelesen. Alle 19 Seiten der exportierten Druckfassung einschließlich separater Lösungen visuell geprüft; Seiten 14 und 15 zusätzlich höher aufgelöst, Seite 15 auch als JPEG kontrolliert. Keine abgeschnittenen Inhalte festgestellt. Die sieben Quellen sind in der geprüften Druckfassung enthalten.
- Gemeinsame Materialprüfung für 95 STEM-Arbeitsblätter, Kapitelrevisionen, vollständige Quizpools für 13 zuvor ausgebaute Kapitel und Syntaxprüfung aller 94 Themenskripte bestanden. Inventar: 197 Kapitel. Prioritätsaudit: 1.659 Frageninstanzen ohne Strukturfehler.

Lokale Berichte und Bildartefakte liegen außerhalb des Repositorys unter `../browser-qa/excretion`. Diese Nachweise gelten für das beschriebene Kapitel und die genannten gemeinsamen Prüfungen. Sie sind keine vollständige Fach- oder Produktabnahme und kein neuer Gesamtsuitenlauf.

## Quellen und didaktische Grenzen

Am 21.09.2026 gegengeprüft:

- [NIDDK: Your Kidneys & How They Work](https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work): Nephron, Filtration, Rückaufnahme und zusätzliche Stoffabgabe. Mengenangaben für Erwachsene wurden nicht als Normwerte für Schüler:innen übernommen.
- [Österreichisches Gesundheitsportal: Nieren und Harnwege](https://www.gesundheit.gv.at/krankheiten/nieren-harnblase/basis-info.html): Harnbildung, Rückgewinnung und ableitende Harnwege. Keine pauschalen Blasenvolumina oder Erkrankungsschwellen aus dem Artikel übernommen.
- [OpenStax: Protein Metabolism](https://openstax.org/books/anatomy-and-physiology-2e/pages/24-4-protein-metabolism): Zusammenhang von Aminosäureabbau, Harnstoffbildung vor allem in der Leber und Ausscheidung über die Nieren. Keine biochemischen Reaktionsdetails verlangt.
- [Gesundheitsportal: Harnwegsinfektion bei Kindern](https://www.gesundheit.gv.at/krankheiten/kinderkrankheiten/harnwegsinfektion.html): Beschwerden und medizinische Abklärung. Der Fall fordert Hilfeholen, keine Diagnose oder Arzneimittelwahl durch die Klasse.
- [Gesundheitsportal: Umgang mit Hitze](https://www.gesundheit.gv.at/leben/umwelt/gesund-bei-hitze/umgang-mit-hitze.html): zugängliche Getränke, Pausen, individuelle medizinische Vorgaben und Hilfe bei einem akuten Notfall.
- [Stadt Wien: Wassertrinken in Schulen](https://www.wien.gv.at/umwelt/wassertrinken-in-schulen-projektdetails-unterrichtsmaterial): realer Wiener Unterrichtsbezug. Die Pläne und Protokolle im Kapitel sind eigene erfundene Beispiele, keine Berichte über reale Klassen.
- [NHS Lancashire and South Cumbria: Continence promotion](https://www.lscft.nhs.uk/our-services/service-finder-z/continence-service/continence-promotion): Nahrung, Arzneimittel und weitere Einflüsse auf Harnfarbe. Keine Farbtabelle als eindeutiger Krankheits- oder Versorgungsnachweis übernommen.

Lehrplanbezug ist das Zusammenwirken der Organsysteme mit dem Ausscheidungssystem und gesundheitsbezogenes Handeln. Grundlage bleibt der dokumentierte österreichische Lehrplanabgleich. Die Modellrechnung verbindet diesen Inhalt mit mathematischer Bilanzierung und kritischer Modellbewertung; sie beansprucht keine physiologische Simulation.

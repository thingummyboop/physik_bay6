# SciVerse – interaktives Lehrbuch für die Mittelschule Wien

## Verbindliches Produktziel

Die bestehende Webseite wird zu einem interaktiven, gamifizierten Lehrbuch für die 5.–8. Schulstufe. Schüler:innen lernen neue Inhalte selbstständig und bereiten sich gezielt auf Tests und Schularbeiten vor. Lehrkräfte nutzen abgegrenzte Kapitel als Unterrichtsgrundlage und zuweisbaren Prüfungsstoff. Physik dient als fachlich und didaktisch ausgearbeitetes Vorbild, die übrigen bestehenden Fächer werden ebenfalls vervollständigt.

## Aktuelle Nutzerpriorität

Übersetzungen sind ausdrücklich zurückgestellt. Vorrang haben Physik, Mathematik, Chemie, Biologie und Digitale Grundbildung. Bestehende andere Fächer bleiben erhalten, werden derzeit aber nachrangig bearbeitet. Die Priorisierung ist keine Behauptung einer vollständigen fachlichen Abnahme.

## Abnahme – noch offen, bis nachgewiesen

- [ ] Österreichischer Mittelschullehrplan: alle vorhandenen Fächer und Klassen zuordnen, Lücken dokumentieren und schließen; österreichische Fachbezeichnungen verwenden.
- [ ] Physik: fachlich begründete Reihenfolge, Vorwissen, Grundstoff und Vertiefung, vollständige inhaltliche Prüfung und passende Wiener Alltagsbezüge.
- [ ] Jedes Kapitel: Lernziele, kurze Erklärungen, passende Darstellungen, angeleitete Interaktion, aussagekräftige Übungen, Zusammenfassung und Verständnischeck.
- [ ] Zwei Lernwege: schrittweise Neues lernen und gezielt Prüfungsstoff wiederholen.
- [ ] Lehrkräfte können Kapitel auswählen und eine wieder aufrufbare Stoffliste mit Lernzielen teilen und drucken.
- [ ] Lernstand zeigt Können und konkrete Wiederholungsbedarfe; lokale Speicherung wird verständlich erklärt.
- [ ] Gamifizierung ohne Sperren, Wartezeiten oder Punktkosten für Lernen und Prüfungsübungen.
- [ ] Jede Quizantwort erhält fachlich passende, widerspruchsfreie Rückmeldung; alle Aufgaben werden ausgewertet.
- [ ] Plausible Fehlvorstellungen statt absurder Antwortalternativen; ausreichende Anwendung und Transfer.
- [ ] Durchgängiges Deutsch; andere angebotene Sprachen ohne falsche Antworten oder stille Struktur-/Sprachmischung.
- [ ] Responsive Darstellung, Tastaturbedienung, lesbare Inhalte und Rückmeldungen; vorhandene Fähigkeiten bleiben erhalten.
- [ ] Vollständige Qualitätsprüfung, funktionierende Vorschau und veröffentlichte, überprüfte Fassung.

## Quellen und Arbeitsstand

- BMB: https://www.bmb.gv.at/Themen/schule/schulpraxis/lp/lp_ms.html
- RIS: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850
- Der neue Lehrplan wird seit 2023/24 aufsteigend eingeführt. Für 2026/27 ist die aktuelle Fassung für alle vier Klassen zu prüfen. Schulautonome Reihenfolgen bleiben möglich; keine amtliche Approbation behaupten.
- Ausgangsrepository: https://github.com/thingummyboop/physik_bay6, HEAD 65e0600170f96ed41bd26c9c5a9c2dc1c106994c.
- Arbeitskopie enthält 134 Einträge in lang/de.json. Aktueller Quellcode weicht von der zuvor besichtigten Live-Seite ab.
- Erste Änderungen: freie Kapitelquiz-Zugänge, keine wirksamen Versuchssperren, Auswertung sämtlicher Fragen, automatisches Schließen der mobilen Navigation; nachgewiesenen englischen Optik-Antwortfehler korrigiert.
- Ausgangsaudit findet 100 fehlende deutsche Feedbackfelder. Noch zu bearbeiten, nicht durch generische Fülltexte verdecken.
- Veröffentlichung erst nach Umsetzung und Prüfung des vollständigen Produkts; bisherige GitHub-Pages-Seite wurde nicht verändert.

## Arbeitsstand 05.09.2026 – erste Umsetzung

- Gemeinsame Kapitelquelle `js/curriculum.js`; Navigation und neuer Lernbereich verwenden dieselbe Liste.
- `topics/learning.html`: Fach-, Klassen- und Suchfilter, Lern-/Wiederholungs-/Unterrichtsmodus, lokale Stoffliste, Link ohne Schülerdaten, Druckansicht und letzter Quizstand. Einstieg über die Navigation und als Standard für neue Besucher.
- Automatisierte DOM-Tests prüfen Stoffauswahl, Teilen und Wiederöffnen unter GitHub-Unterpfad, Klassenfilter, Suche sowie fünf aufeinanderfolgende fehlgeschlagene Quizversuche. Alle sechs Testfragen erhalten Feedback; unsichere Frage-IDs werden gespeichert. Beide neuen Tests bestanden.
- Syntax aller 76 bisherigen Lernskripte bestanden. Bestehende Audits haben enge Themenlisten; ein grüner Audit beweist ausdrücklich keine Vollständigkeit aller Fächer. Zwei Audits sind rot: 100 fehlende deutsche Astronomie-Feedbackfelder sowie generische Mathematik-Rückmeldungen.
- Aktuelle RIS-Fassung am 05.09.2026 gelesen: 2. Klasse Sehen/Hören und optische Systeme; 3. Klasse Mechanik, Elektrizität/Magnetismus und Energie; 4. Klasse Wetter/Klima sowie Strahlung/Radioaktivität. Navigation entsprechend sortiert. Noch fehlen ein altersgerechtes Kapitel zu Erde/Mond/Sonne (2. Klasse) sowie ausgearbeitete Strahlungs- und Kraftwerkskapitel (4. Klasse). Das große Astronomiekapitel bleibt als Vertiefung erhalten.
- Bestandsprüfung: Deutsch (11), Englisch (9), Ernährung (7), Kunst (7), Musik (7) sind bislang nur geplante Kapitel. Geografie: 1 von 5 verfügbar. Diese Lücken gehören zum verbleibenden Gesamtauftrag.
- Lokale Vorschau läuft unter http://127.0.0.1:4173 über `../serve-sciverse.cjs`, Exec-Sitzung 43129. Vor Wiederverwendung Prozess prüfen. Browser-Öffnung wurde an Codex übergeben, keine visuelle Prüfung erfolgt.
- JSDOM für DOM-Tests liegt außerhalb des Projekts unter `../qa/node_modules`. RIS-Rohdaten und extrahierter Text liegen unter `../lehrplan.html` und `../lehrplan.txt`; Liste fehlender Feedbacks unter `../missing-feedback.json`.
- Noch keine Veröffentlichung, kein Site-Projekt registriert, keine Änderungen zum Ursprungsrepository gepusht. Umfang der Abnahme oben bleibt unverändert offen.

## Arbeitsstand 05.09.2026 – Physik-Kernkapitel und Rückmeldungen

- Vorheriger Zielturn war Fortschritt; aktuelle Arbeitskopie und Status wurden erneut geprüft.
- Drei neue deutsche Kapitel: `erde_mond_sonne` (2. Klasse), `strahlung_radioaktivitaet` und `kraftwerke_energieversorgung` (4. Klasse). Je vier Abschnitte, acht individuell verfasste Fragen mit Antwortbegründungen, Lernziele, Vorwissen, Zusammenfassung, Quellen und eine funktionierende Interaktion. 137 Einträge in `lang/de.json`, 20 Physik-Navigationseinträge.
- `js/core-learning.js` ergänzt Lern-/Wiederholungsnavigation für bestehende Kapitel, einen direkt erreichbaren Selbsttest und die beim letzten Versuch unsicheren Fragen. Neue Kapitel zeigen Zusammenfassungen vor dem Kapitelquiz. Wiederholungslinks aus der Stoffliste erhalten `mode=review`.
- Simulationsmodelle: sichtbarer Mondscheibenanteil bei wechselndem Winkel; unabhängige Zufallsentscheidungen für 200 zerfallende Modellkerne mit Verlaufstabelle; Vergleich von Stromnutzung und Kraft-Wärme-Kopplung bei gleicher Energiezufuhr. Modellgrenzen und fiktive Energiewerte sind ausdrücklich erklärt.
- 100 fehlende Astronomie-Feedbackfelder durch antwortbezogene Erklärungen ergänzt. Noch vorhandene absurde Antwortalternativen sind damit ausdrücklich nicht fachlich/didaktisch fertig überarbeitet.
- 72 Rückmeldungen zu Brüchen/Dezimalzahlen überarbeitet. Mehrdeutige Aufgabe mit Pausendauer konkretisiert; der wertgleiche Distraktor `1 7/4` für `11/4` wurde durch `1 3/4` ersetzt.
- Tests bestanden: `test_learning_access.js`, `test_learning_flows.js`, `test_physics_core.js`, `test_rendered_core_chapters.js`. Die letzten beiden prüfen auch die neuen Modelle und das Zusammenspiel mit der echten Vorlage und dem Renderer. Sämtliche 14 vorhandenen Audit-Skripte bestanden; deren enger Umfang bleibt eine Grenze der Aussagekraft. `git diff --check` sauber.
- Vorschau weiterhin erreichbar: HTTP 200 für Lernbereich und neues Interaktionsskript am Ende dieses Turns. Keine Browser-Screenshotprüfung erfolgt.
- Quellen neu geprüft: NASA (Mondphasen/Jahreszeiten, Kuipergürtel), IAEA/US EPA/NRC (Strahlungsgrundlagen), Stadt Wien (Freudenau), Wien Energie (Spittelau). Links stehen in den neuen Kapiteln; Lehrplangrundlage weiterhin die bereits gelesene aktuelle RIS-Fassung.
- Verbleibend: geplante Fächer/Geografiekapitel ausarbeiten; gesamte Lehrplanabdeckung und bestehende Kapitel inhaltlich prüfen; altersgerechte Distraktoren und wiederholende Texte verbessern; sprachliche Konsistenz aller angebotenen Sprachen (neue Kapitel aktuell nur Deutsch, Fallback kenntlich); Lehrkraft-Lernziele und Fortschrittsdarstellung vertiefen; abschließende Gesamtprüfung und Veröffentlichung.

## Arbeitsstand 05.09.2026 – Deutsch und Englisch

- Ausgangszustand erneut geprüft. Vorheriger Zielturn war Fortschritt; kein Blocker und kein Leerlauf.
- Deutsch: alle 11 bisher geplanten Kapitel mit Originaltexten, Lernzielen, Erklärungen, 44 Fragen, 33 begründeten Zuordnungen und je einem eigenen Schreibauftrag samt Kriterien und möglicher Lösung ausgearbeitet. Texte, Figuren und Zahlen sind als fiktives Übungsmaterial gekennzeichnet. Inhalte decken Lesen, Schreiben, Zuhören/Sprechen, Sprachreflexion, Sachtexte, Berichte, Literatur, Argumentieren, Medien und formelle Texte ab. Kein Anspruch, damit bereits den gesamten Fachlehrplan abschließend geprüft zu haben.
- Englisch: alle 9 bisher geplanten Kapitel mit 36 Fragen, 27 Zuordnungen, Hör-/Lesetexten sowie Gesprächs- und Schreibaufträgen ausgearbeitet. Englisch ist Zielsprache; Hilfen sind bewusst Deutsch und als solche gekennzeichnet. Sprachmittlung verwendet einen deutschen Ausgangstext und eine englische Anfrage. Progression von einfacher Vorstellung bis zu formellen Anfragen und begründeten Meinungen.
- Lehrplankapitel Deutsch und Lebende Fremdsprache aus der vorhandenen aktuellen RIS-Textkopie vollständig für die Grundsätze, Kompetenzbereiche und ersten Jahrgangsstufen gelesen. Kommunikative Anwendung und Überarbeitung statt isolierter Regellisten berücksichtigt; weitere Gesamtprüfung offen.
- `js/language-workshop.js`: native Zuordnung mit einzelnen Begründungen, lokaler Entwurf, Kriterien-Selbstcheck, Vergleichslösung. Freie Texte werden ausdrücklich nicht automatisch benotet oder versendet. Entwürfe werden bei jeder Eingabe sofort gespeichert; Rückmeldung ist verzögert, nicht die Speicherung. Optionale Browser-Vorlesestimme mit passender Sprache startet nur per Knopfdruck; Stoppen und Fallback ohne Sprachausgabe vorhanden.
- `css/workshops.css` ergänzt bedienbare Eingabefelder, Fokus, Kontrast über bestehende Themes, sichtbare Editor-Scrollbars und ausreichend große Bedienelemente. Keine visuelle Browserprüfung durchgeführt.
- Geteilte Stofflisten werden beim Öffnen nun lokal übernommen, damit der Rückweg aus einem Kapitel die Liste erhält. Defekte gespeicherte Listen führen nicht mehr zu einem Fehler beim Start.
- Tests bestanden: `test_german_workshops.js` (alle 11 echten Renderer-Aufrufe, Fragen, Zuordnungen, Drafts, Wiederherstellung), `test_english_workshops.js` (alle 9 Kapitel, englische Sprachausgabe auf expliziten Klick, Stoppen), `test_learning_flows.js`, `test_physics_core.js`, `test_rendered_core_chapters.js`. Quiz-Feedback-Audit und Syntax-Audit grün, `git diff --check` sauber.
- Bestand jetzt 157 Einträge in `lang/de.json`. Noch geplant: Ernährung/Haushalt (7), Kunst (7), Musik (7), vier Geografiekapitel. Diese 25 Kapitel sowie Gesamtprüfung, übrige Qualitätslücken und Veröffentlichung bleiben Teil des unveränderten Ziels.

## Arbeitsstand 05.09.2026 – Geografie und Lehrplanabgleich

- Die unmittelbar vorherige Antwort fasste nur das Ziel zusammen und war kein Umsetzungsfortschritt. Die Arbeitskopie wurde jetzt erneut gelesen; vorhandene Geografie-Ergänzungen wurden geprüft und weiter verbessert.
- Vier Geografiekapitel mit je drei Erklärabschnitten, Lernzielen, Vorwissen, Zusammenfassung, vier begründeten Quizfragen und einer Werkstatt mit drei Zuordnungen und einem offenen Arbeitsauftrag. Insgesamt 16 Fragen und 12 Zuordnungen; fiktive Modelle sind als solche gekennzeichnet.
- Routenplan: Standort im Raster, Himmelsrichtungen, gesperrtes Feld, Weglänge und Neustart. Budgetplan: alle 16 Kombinationen der vier Ausgaben geprüft, einschließlich Zielrücklage und Budgetüberschreitung. Mindestgrößen für Steuerelemente und sichtbarer Tastaturfokus ergänzt.
- `test_geography_chapters.js` bestanden: alle vier echten Kapitel mit Renderer, vollständige Fragen, Zuordnungen und Navigation; Routenbegrenzung, Baustelle, kürzester Weg (800 m), Reset und wiederholte Initialisierung; sämtliche Budgetkombinationen. Lernbereich-Flowtest und Quizfeedback-Audit ebenfalls bestanden.
- Unplausible Geografie-Distraktoren durch konkrete Verwechslungen ersetzt, etwa Verkaufspreis/Gewinn, EU/Euro-Raum, gleiche Produktion/wirtschaftliche Vernetzung. Ungültige Absatzverschachtelung im Autorenskript behoben.
- RIS-Fachlehrplan Geografie und wirtschaftliche Bildung in der vorhandenen aktuellen Textkopie nun über alle vier Klassen gelesen. Budget/Bedürfnisse passen zur 1. Klasse, europäische Integration zur 4. Klasse; Kapitelzuordnung korrigiert, bestehende IDs bleiben für Links erhalten.
- **Zusätzlicher nachgewiesener Inhaltsbedarf:** 1. Klasse Ernährung/Landwirtschaft, Naturprozesse/Naturgefahren und weltweite Lebenssituationen; 2. Klasse Ressourcen/Energie, Arbeitswelt, Märkte und unternehmerisches Projekt; 3. Klasse österreichische Gesellschaft, Bildungs-/Arbeitswege, Wirtschaftsstandort, Zentren/Peripherien; 4. Klasse EU-Werte/Integration, Bevölkerung/Urbanisierung und internationale Akteure vertiefen. Die vier neuen Kapitel allein erfüllen diesen Fachlehrplan nicht. Das alte Orientierungskapitel zu Österreich ersetzt insbesondere keinen Stoff der 3. Klasse.
- Bestand jetzt 161 Einträge. Noch 21 als geplant markierte Kapitel in Ernährung, Kunst und Musik; zusätzlich die oben dokumentierten fachlichen Lücken, Prüfung sämtlicher Bestandskapitel und Veröffentlichung. Gesamtauftrag bleibt offen.

## Arbeitsstand 05.09.2026 – Kunst und Gestaltung

- Vorheriger Zielturn war Fortschritt: Geografie-Ergänzungen und Tests sind in der Arbeitskopie vorhanden. Aktuellen Status und gemeinsame Werkstatt-/Renderer-Schnittstelle erneut gelesen.
- Alle sieben geplanten Kunstkapitel mit je drei Abschnitten, Lernzielen, Vorwissen, Zusammenfassung, vier Quizfragen, drei Zuordnungen und einem praktischen Gestaltungsauftrag ausgearbeitet. 28 Fragen und 21 Zuordnungen; insgesamt 168 Einträge in `lang/de.json`. Die Werkstatt erklärt ausdrücklich, dass der Prozessbericht die bildnerische Arbeit nicht ersetzt und keine automatische Benotung stattfindet.
- Inhalte: Linie/Farbe/Form mit Wortbild; Bildbeschreibung/Deutung/Wertung mit Bildgeschichte; räumliche Darstellung mit Leseplatzmodell; Design mit Piktogramm und Papierprototyp; Ausschnitt/Montage mit eigener Bildfolge; Kunstkontext und Präsentation; eigenes Projekt mit Portfolio und Überarbeitung. Praktische Arbeiten benötigen Papier bzw. geeignetes Material und bleiben in der Mappe.
- `js/art-workshop.js` stellt in drei Kapiteln eine selbst erstellte geometrische Studie bereit: Position, Radius, Hintergrundfarbton und Ausschnitt verändern; A/B-Vergleich mit konkreten Werten; Reset. SVG ist eine funktionale Unterrichtsdarstellung, kein historisches Werk. Bildschirmfarben werden ausdrücklich nicht als Pigmentmischung dargestellt. Varianten bleiben nur während des Seitenbesuchs, der Reflexionstext kann lokal gespeichert werden.
- Gemeinsame Navigation bezeichnet die fachübergreifende Werkstatt jetzt passend als Werkstatt statt stets Textwerkstatt; Kunst erhält den eigenen Navigationsnamen Gestaltungswerkstatt.
- `test_art_chapters.js` bestanden: sieben echte Renderer-Integrationen, Fragen, Zuordnungen, unmittelbare lokale Entwürfe; drei Bildlabore mit Steuerung, A/B-Vergleich, zugänglichen Beschreibungen und Reset. Deutsch- und Englisch-Werkstatttests erneut bestanden, Quizfeedback-Audit grün, `git diff --check` ohne Fehler. Keine visuelle Browserprüfung.
- RIS-Kunstlehrplan für Klasse 1/2 bereits gelesen, Klasse 3/4 jetzt ergänzt. Die allgemeine Kompetenzprogression ist aufgenommen. Für eine vollständige fachliche Abnahme fehlen noch konkret ausgearbeitete Werkbeispiele und die systematische Zuordnung aller Anwendungsbereiche: insbesondere Kunst/Markt, vergängliche Materialien, Adaptation in Klasse 3 sowie Werbung, Körperdarstellungen, Installation/Performance, Umnutzung und Selbstbild in Klasse 4. Diese offenen Anforderungen werden nicht durch das bloße Vorhandensein der sieben Kapitel als erfüllt gewertet.
- Noch 14 geplante Kapitel: Ernährung/Haushalt und Musik. Dazu bleiben die dokumentierten fachlichen Ergänzungen, die Gesamtprüfung des Bestands und die Veröffentlichung offen.

## Arbeitsstand 05.09.2026 – Musik und Klanglabor

- Vorheriger Zielturn war Fortschritt. Arbeitskopie und Kunst-Ergänzungen erneut geprüft; aktuellen RIS-Musiklehrplan für alle vier Klassen gelesen.
- Sieben Musik-Kapitel mit je drei Abschnitten, Lernzielen, Vorwissen, Zusammenfassung, vier Fragen, drei Zuordnungen und praktischer Musikwerkstatt ausgearbeitet. 28 Fragen und 21 Zuordnungen; insgesamt 175 Einträge. Musik bleibt praktische Tätigkeit: Sprechen/Singen, Bodypercussion, Instrumente, Bewegung, gemeinsames Arrangement und Reflexion.
- Vier Kapitel enthalten ein eigenes Klanglabor: acht Achtelfelder im 4/4-Takt, fünf auswählbare Töne und Pausen, drei Tempi, zwei synthetische Klangfarben und optionale Grundschläge. Vier Einzählschläge, dann zwei Wiederholungen. Die Texte benennen die Modellgrenzen (kurze Töne, keine gebundenen Noten, keine realen Instrumentenaufnahmen). Muster sind während des Besuchs bearbeitbar; die Werkstatt speichert den eingetippten Prozessbericht lokal.
- Audio startet ausschließlich auf Klick, nutzt einen wiederverwendeten AudioContext und stoppt bei Stopp, Änderung, Hintergrundwechsel und pagehide. Keine Mikrofonaufnahme, keine Übertragung. Ohne Audio bleibt die lesbare Notation mit Klatsch-/Bewegungsalternative erhalten. API-Verhalten mit MDN AudioContext und AudioScheduledSourceNode.stop abgeglichen.
- `test_music_chapters.js` prüft alle sieben echten Renderer-Integrationen und vier Klanglabore. Audio-API-Testdoubles prüfen Einzähl- und Achtelzeitpunkte, Pausen, Dauer, Tempi, Tonfrequenz, Context-Wiederverwendung, Stopp/Änderung/pagehide, fehlende API und Abbruch während ausstehendem resume. Zusätzlich Hintergrundwechsel geprüft. Keine reale Hör- oder Browserprüfung; Tests belegen die Ablaufsteuerung, nicht die Ausgabequalität eines Geräts.
- Kunst-Integration und Lernbereich-Flow erneut bestanden, Quizfeedback-Audit grün. Noch sieben geplante Ernährungskapitel. Die vollständige musikalische Abnahme bleibt offen: tatsächlich zugängliche und fachlich eingeordnete Hör-/Singbeispiele aus unterschiedlichen Kontexten, Notenbild, Harmonik/Großformen, Musikgeschichte und ausgewählte Tanzformen müssen ergänzt werden. Die bisherige Einladung zur Auswahl durch Lehrkräfte ist dafür allein kein Beleg.
- Gesamtprüfung aller Fächer und Veröffentlichung bleiben offen. Bestehende Live-Seite unverändert.

## Arbeitsstand 05.09.2026 – Ernährung und Haushalt

- Vorheriger Zielturn war Fortschritt. Aktuelle Dateien erneut geprüft. RIS-Fachlehrplan Ernährung und Haushalt vollständig gelesen: Pflichtfach in der 2. Klasse, daher alle sieben Kapitel auf 6. Schulstufe umgeordnet; IDs für vorhandene Links erhalten.
- Sieben Kapitel mit 28 Fragen, 21 Zuordnungen, Lernzielen, Vorwissen, Zusammenfassung und praktischen bzw. ausdrücklich fiktiven Planungsaufträgen ergänzt. Themen: Hygiene/Sicherheit, Ernährungsorientierung, Einkauf/Grundpreise/Reklamation, kalte Speise, Nachhaltigkeit, Haushaltsorganisation, gemeinsames Mahlzeitenprojekt. Gesundheitsbezogene Inhalte ohne Körperbewertung, Kalorientracking oder starre persönliche Essmengen. Gemeinsame Praxis unter Anleitung; keine unsicheren Verkostungsaufgaben.
- Grundlagen mit AGES Sicher kochen, österreichischem Gesundheitsportal (aktuelle Pyramide/Tellermodell) und Arbeiterkammer (Gewährleistung) abgeglichen. Quellen direkt in den betroffenen Kapiteln. Gesetzliche Gewährleistung von freiwilliger Garantie/Umtausch getrennt, keine individuelle Rechtsfallentscheidung.
- Drei Rezeptplaner: 1–8 Rezeptportionen einer kalten Bohnen-Gemüse-Jause mit ausschließlich verzehrfertigen Bohnen. Mengen und fiktive Verbrauchskosten transparent in einer Tabelle; Einkauf ganzer Packungen ausdrücklich davon unterschieden. Keine Empfehlung persönlicher Essmengen. Ungültige Eingaben liefern erklärtes Feedback und entfernen veraltete Rechenergebnisse.
- `test_household_chapters.js` bestanden: sieben Renderer-Integrationen, alle Fragen/Zuordnungen, Klassenbezug, drei Planer, alle Mengen 1–8, Dezimalmengen, Kosten, ungültige Eingaben und Wiederaufnahme. Ein anfänglicher Testfehler betraf ausschließlich österreichische Tausendertrennzeichen; Prüfung korrigiert. `test_learning_flows.js`, `audit_quiz_feedback.js`, `audit_topic_syntax.js` bestanden. Ein erster Syntax-Aufruf hatte einen falschen Dateinamen; der richtige Audit wurde danach ausgeführt (76 Dateien).
- Bestand: 182 deutsche Dateneinträge, kein Navigationseintrag mehr mit `available:false`, keine fehlenden Datenobjekte für Navigationseinträge. Das beweist keine fachliche Vollständigkeit. Neue Metadatenprüfung zeigt, dass bestehende Kapitel in Physik, Mathematik, Biologie, Chemie, Digitaler Grundbildung und das alte Geografiekapitel überwiegend noch keine strukturierten `learningGoals`-/`summary`-Felder besitzen. Teilweise vorhandene Ziele im Abschnitts-HTML müssen zuerst geprüft und sinnvoll übernommen werden; nicht blind durch generische Texte ersetzen.
- Weitere Abnahme: bei Ernährung Kennzeichnung/Haltbarmachung, aktueller Saisonbezug, experimenteller Vergleich und alle Lehrplananforderungen systematisch prüfen. Dokumentierte Lücken in anderen Fächern, Bestandsprüfung, mehrsprachige Konsistenz, vollständige Funktionsprüfung und Veröffentlichung bleiben offen.

## Arbeitsstand 05.09.2026 – Physik-Lernziele und Optikpräzisierungen

- Vorheriger Zielturn war Fortschritt. Bestehende Physik-Abschnitte und die gemeinsame Darstellung erneut gelesen. 17 Bestandskapitel erhalten individuell aus ihren Inhalten formulierte Lernziele, Vorwissen und Zusammenfassungen. Mit den drei neuen Kernkapiteln sind diese strukturierten Felder nun in allen 20 Physikeinträgen vorhanden und für die Stoffliste nutzbar.
- Fehler in der gemeinsamen Vorwissensdarstellung behoben: Ausgeschriebene Kenntnisse werden als Text dargestellt; nur im gemeinsamen Katalog vorhandene Kapitel-IDs werden verlinkt. Die Vorlage lädt den Katalog auch bei direktem Aufruf. Zugriff auf einen fremden Parent-Ursprung ist abgesichert.
- Optik korrigiert: Violett statt Blau als kurzwelliger Rand des sichtbaren Spektrums; Energie eines einzelnen Photons von Gesamtenergie getrennt; Itten/CMY/RGB in Fragen präzise unterschieden. Angeregte Atome werden mit Energieniveaus und ausdrücklich vereinfachtem Bahnmodell erklärt. Brechung, Netzhautbild und zusammengesetztes Mikroskop sprachlich präzisiert; pauschal „superheißer“ Brennpunkt entfernt. Doppelte Abschnittsnummerierung in Linsen/Spiegel berichtigt. Quellen: NASA sichtbares Licht und OpenStax Linsenabbildung.
- `test_physics_guides.js` prüft Lernziele, Zusammenfassungen und Vorwissenslinks über alle 20 tatsächlichen Renderer-Aufrufe. Beschreibendes Vorwissen erhält keine erfundenen Kapitelziele. Diese Prüfung lädt nicht alle Bestands-Simulationsskripte und ersetzt deren fachliche/funktionale Abnahme nicht. Haushalt- und Lernbereich-Flowtests sowie Quizfeedback-Audit bestanden; `git diff --check` sauber.
- Weiterhin erkannte Bestandsprobleme: unter anderem eine unzulässig allgemeine Trockenheitsregel im Klimadiagramm, vereinfachte Wärme-/Elektrizitätsformulierungen, veraltbare Astronomieangaben und unplausible Antwortalternativen. Die Physik ist damit nicht vollständig fachlich geprüft. Quellenprüfung und Angleichung anderer Sprachfassungen stehen für geänderte Bestandsinhalte ebenfalls noch aus.
- Nächste Gesamtarbeiten bleiben die dokumentierten fachlichen Lücken, strukturierte Lernziele/Zusammenfassungen der anderen Bestandsfächer, vollständige Interaktions-/Sprachprüfung und Veröffentlichung. Keine Abnahmebehauptung allein aufgrund grüner Strukturtests.

## Arbeitsstand 05.09.2026 – Klimadiagramm

- Vorheriger Zielturn war Fortschritt. Diagrammtext, Quiz und tatsächliche Skalenrechnung in js/topics/klima.js erneut geprüft. Die bisherige Grafik hatte das Verhältnis 1 °C zu 2 mm bereits geometrisch, aber keine numerischen Achsenticks und eine zu allgemeine Verdunstungsbehauptung.
- Numerische Achsen, native Monatsauswahl und vollständige Tabelle ergänzt. Auswahlfeld und Diagrammklick liefern dieselbe Rechnung P im Vergleich zu 2 · T. Alle zwölf Monatswerte sind ohne Maus zugänglich. Wiederholtes Rendern erzeugt keine doppelte Tabelle.
- Die unzureichend belegte Zuordnung zu Rom wurde als mediterrane Modellreihe gekennzeichnet. Kein Anspruch auf amtliche Stationsnormalwerte. Text und Quiz unterscheiden die Walter-Lieth-Faustregel von einer Messung tatsächlicher Verdunstung. Quelle: climatol-Dokumentation https://search.r-project.org/CRAN/refmans/climatol/html/diagwl.html; dort ist P < 2T explizit dokumentiert.
- test_climate_chart.js bestanden: zwölf Datenzeilen, Juni/Juli/August als aride Modellmonate, gekoppelte Achsen, Monatswechsel/Klick und erneutes Rendern. Physik-Lernzieltest über 20 Kapitel und Quizfeedback-Audit bestanden; git diff --check sauber. Keine visuelle Browserprüfung. Andere Sprachfassungen und die weiteren dokumentierten Inhaltslücken bleiben offen.

## Arbeitsstand 05.09.2026 – Mathematik: Flächen statt falschem Duplikat

- Vorheriger Zielturn war Fortschritt. Abschnittstitel aller 40 Mathematikeinträge geprüft. Der Navigationseintrag math3_4_flaechensatz kündigte Flächeninhalte an, enthielt aber ausschließlich Pythagoras. Diese nachgewiesene Inhaltslücke hat Vorrang vor dem Ergänzen bloßer Metadaten.
- Kapitel durch vier echte Flächenabschnitte ersetzt: Umfang/Fläche, Dreieck/Parallelogramm, Trapez/Zerlegung und Flächeneinheiten. Acht Fragen, drei Zuordnungen und eine Grundrissaufgabe mit zwei Lösungswegen. Pythagoras bleibt in seinen eigenen Kapiteln erhalten.
- Neues SVG-Flächenlabor: Rechteck, Dreieck, Parallelogramm und Trapez mit veränderbarer Grundseite, Höhe und zweiter paralleler Seite. Senkrechte Höhe und Grundseitenverlängerung ausdrücklich dargestellt. Formeln, Zeichnung und Beschriftung reagieren gemeinsam.
- test_area_chapter.js bestanden: echter Renderer, acht Fragen und 108 Kombinationen der Figuren/Längen. Polygonfläche unabhängig über Koordinaten berechnet und gegen die Formel geprüft; Zeichnung bleibt im Ausschnitt. Lernbereich-Flow und Quizfeedback-Audit grün.
- Falsche Übersetzungseinträge mit den alten Pythagoras-Frage-IDs aus den anderen Sprachdateien entfernt; sie nutzen nun den als Deutsch gekennzeichneten Kapitel-Fallback. Eine richtige Übersetzung des neuen Inhalts steht weiterhin aus. Alte lokale Kapitelquiz-Gesamtergebnisse müssen bei wesentlich geänderten Kapiteln künftig einer Inhaltsversion zugeordnet werden; neue Frage-IDs allein aktualisieren alte Gesamtergebnisse nicht.
- Weitere nachgewiesene Mathematik-Lücken: Kapitel Funktionen/Gleichungssysteme enthält derzeit nur Funktionen, Körperkapitel mit angekündigter Kugel enthält nur Zylinder/Kegel. Die übrigen Metadaten und fachliche Vollständigkeit bleiben offen; keine Veröffentlichung.

## Arbeitsstand 05.09.2026 – Lineare Gleichungssysteme

- Vorheriger Zielturn war Fortschritt. Das tatsächliche Funktionskapitel und sein GeoGebra-Skript erneut geprüft: zwei Funktionsabschnitte, aber keine ausgearbeiteten Lösungsverfahren für Gleichungssysteme.
- Drei Abschnitte mit Gleichsetzen, Einsetzen/Addieren, Lösungsfällen und fiktivem Kostenvergleich ergänzt. Sechs neue Fragen, vorhandene Steigungsfrage verbessert, Begriff der Funktion und Definitionsbereich präzisiert. Lernziele, Vorwissen und Zusammenfassung hinzugefügt.
- Eigenständiges Zwei-Geraden-Labor mit editierbaren Steigungen und Achsenabschnitten, drei Beispielsituationen und textlicher Lösung. Verschiedene Linienstile ergänzen die Farben. Schnittpunkte außerhalb des Fensters werden erklärt; ungültige Eingaben und Überschreitung des Zahlenbereichs werden nicht als mathematisch fehlende Lösung ausgegeben. Bestehendes GeoGebra-Labor bleibt zusätzlich vorhanden.
- test_linear_systems.js bestanden: tatsächliche Kapitelintegration mit acht Übungsfragen; 625 Koeffizientenkombinationen durch Einsetzen in beide Gleichungen geprüft, alle Lösungsfälle, außerhalb liegende Punkte, Eingabefehler und numerische Grenze. Flächenkapiteltest und Quizfeedback-Audit ebenfalls bestanden. Keine visuelle Browserprüfung.
- Übersetzungen des erweiterten Bestandskapitels, Versionszuordnung lokaler Gesamtergebnisse, Kugelberechnung und die zuvor dokumentierten fachlichen/technischen Arbeiten bleiben offen. Kein Abschluss und keine Veröffentlichung.

## Arbeitsstand 05.09.2026 – Kugel und Körperoberflächen

- Vorheriger Zielturn war Fortschritt. Körperkapitel tatsächlich gelesen: Kugelformel zuvor nur im Diplom abgefragt, ohne Erklärung; Zylinder/Kegel sehr knapp und Oberfläche nicht behandelt.
- Kugelabschnitt und Abschnitt zu Vergrößerung/Einheiten ergänzt. Oberfläche und Volumen von geradem Zylinder, geradem Kegel und Kugel erklärt; Radius/Durchmesser und Höhe/Mantellinie getrennt. Kegelvergleich präzisiert auf gleiche Grundfläche und gleiche senkrechte Höhe. Vier neue Fragen und spezifische Lernziele/Vorwissen/Zusammenfassung.
- Neues Radiusmodell mit gekennzeichnetem Mittelpunktschnitt, Diameter, Oberfläche und Volumen; vierfach/achtfach bei Radiusverdopplung sichtbar. Vorhandenes GeoGebra bleibt erhalten. Zylindereingabe bekommt zusätzlich zur vorhandenen Tippfunktion eine echte Ergebnisprüfung für die jetzt konkret benannte Aufgabe.
- test_sphere_chapter.js bestanden: tatsächlicher Renderer mit sechs Übungsfragen, zehn Radien, Beschriftungen/Einheiten und Skalierungsfaktoren. Quizfeedback-Audit und git diff --check grün. Prüfung der Zylinder-Ergebnisbedienung folgt im selben Arbeitsstand. Keine visuelle Browserprüfung.
- Weitere Mathematikmetadaten, Inhaltsversionen lokaler Ergebnisse, Übersetzungen und Gesamtlehrplan-/Funktionsabnahme weiterhin offen; keine Veröffentlichung.

- Nachprüfung im selben Turn bestanden: Zylinderübung bei leerer, falscher und richtiger Eingabe sowie Enter-Bedienung und wiederholter Initialisierung.

## Arbeitsstand 05.09.2026 – Inhaltsversionen und Lernstand

- Vorheriger Zielturn war Fortschritt. Speicherung und Anzeige von Kapitelquiz-Ergebnissen in Renderer, Lernbereich und Wiederholungsnavigation geprüft. Bisher konnte ein altes erfolgreiches Ergebnis für ein wesentlich geändertes Kapitel weiter als aktueller Lernstand erscheinen.
- Gemeinsames Versionsregister für die wesentlich geänderten Flächen-, Funktions-, Körper-, Farben-, Linsen- und Klimakapitel eingeführt. Alte Ergebnisse bleiben gespeichert, zählen aber nicht zur aktuellen Bestehensanzeige oder Stofflisten-Zählung. Die Kapitelkarte weist auf die Überarbeitung hin. Unsichere Fragen einer alten Fassung werden nicht als aktuelle Wiederholungsfragen gezeigt.
- Beim ersten neuen Versuch wird der alte Ergebnisstand einmal als frühere Version archiviert; neuer Bestwert und Bestehensstatus beziehen sich auf die aktuelle Fassung. Bereits erworbene Spielpunkte bleiben erhalten. Unveränderte Kapitel behalten ihren bisherigen Status. Weitere substanzielle Änderungen müssen die Versionsnummer erhöhen.
- test_chapter_revisions.js bestanden: alte/neue/unveränderte Fassungen, falscher und richtiger neuer Versuch, Archivierung nur einmal und Stofflistenanzeige ohne alten Erfolg. Lernbereich- und Zugangstests ebenfalls bestanden. Ein erster Test verwechselte Startkarte und Quizpanel; anschließend an der richtigen Darstellung geprüft.
- Gesamtziel weiterhin offen: Bestandsinhalte, Lernziele weiterer Fächer, Übersetzungen, umfassende Prüfung und Veröffentlichung.

### Fortschritt: Mathematik 1. Klasse
Alle elf vorhandenen Kapitel verfügen nun über strukturierte Lernziele, Voraussetzungen und Zusammenfassungen. `scripts/test_math1_guides.js` prüft deren Renderer-Integration einschließlich aufgelöster Quiz-Platzhalter und Stellenwertübung. Das ist keine vollständige Inhalts- oder Lehrplanabnahme: Einige Kapitel sind weiterhin knapp, vorhandene Abschlussfragen anderer Kapitel und die gesamten interaktiven Aufgaben benötigen eine breitere Prüfung. Die überarbeitete Zahlenprüfung ersetzt die bisherige Selbsteinschätzung; Winkel- und Körperfragen sind fachlich präzisiert. Die übrigen Mathematikjahrgänge und weitere Bestandsfächer benötigen weiterhin systematische Lernführung und Inhaltsprüfung.

### Fortschritt: Mathematik 2. Klasse
Acht Bestandskapitel haben strukturierte Lernziele und Zusammenfassungen. Bruchrechnen enthält nun Erweitern, Kürzen und gemeinsame Nenner mit vier neuen Fragen sowie einer tastaturbedienbaren Eingabeübung. `scripts/test_math2_guides.js` prüft alle acht Renderer-Integrationen und die neue Übung. Wesentliche verbleibende Inhaltslücken: Teilbarkeit durch 3/9 und Primfaktoren, indirekte Proportionalität, umfangreichere Gleichungsanwendungen und Geometriekonstruktionen sind mit den bisherigen kurzen Kapiteln noch nicht abgedeckt. Auch die bestehenden Diagramme und übrigen interaktiven Aufgaben müssen fachlich und funktional vollständig geprüft werden. Keine Veröffentlichung erfolgt.

### Geschlossene Inhaltslücke: Teilbarkeit
Das Kapitel math2_1_teilbarkeit enthält nun Teilbarkeitsregeln für 3 und 9, Definition und Gegenbeispiele von Primzahlen, Primfaktorzerlegung sowie ggT/kgV über Exponenten mit Aufteilungsanwendung. Die zuvor dokumentierte Lücke dieser Inhalte ist damit bearbeitet. Der erweiterte Test test_math2_guides prüft alle acht Renderer, die neue Primfaktorübung und die alten ggT/kgV-Eingaben; eine vollständige visuelle oder Lehrplanabnahme folgt daraus nicht.

### Geschlossene Inhaltslücke: Proportionalität
math2_6_prop_prozent behandelt jetzt direkte und indirekte Proportionalität, Quotienten-/Produktkonstanz, Gegenbeispiel Grundgebühr sowie Grundwert, Prozentwert und Prozentsatz. Der neue Aufteilungsrechner benennt die feste Gesamtsumme und Cent-Rundung ausdrücklich. Sechs zusätzliche Fragen prüfen die neuen Inhalte. Automatisierte Integration und Steuerungen bestanden; visuelle Gesamtabnahme und Veröffentlichung fehlen weiterhin.

### Fortschritt: Reelle Zahlen
math4_1_reelle_zahlen ist fachlich überarbeitet und um Näherungsverfahren sowie den Unterschied zwischen √a und x² = a erweitert. test_real_numbers.js prüft die vollständige Kapitelintegration und alle 1001 Sliderwerte. Weiter offen aus der Bestandssichtung: Statistik 4 behauptet eine stets perfekte Galton-Glockenkurve, nennt Boxplot ohne dessen Erklärung und prüft einen zuvor nicht erklärten Modus; Statistik 3 setzt den Mittelwert mit normal gleich. Weitere Mathematikkapitel der 3./4. Klasse haben noch keine strukturierten Lernhilfen. Diese Lücken sind nicht durch die Wurzelprüfung abgedeckt.

### Fortschritt: Statistik 4
Die dokumentierten Lücken Median/Modus/Boxplot wurden in math4_7_statistik geschlossen. Die Quartile werden als Mediane der Hälften berechnet, bei ungerader Anzahl ohne Gesamtmedian; die äußeren Linien reichen bis Minimum/Maximum. Quelle zur Grunddarstellung: NIST https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm . test_statistics.js prüft bekannte gerade, ungerade, gleiche und dezimale Datensätze, Modus-Gleichstände, ungültige Eingaben, SVG/Tabellen und Presets. Noch keine visuelle Gesamtprüfung; die übrigen genannten Mathematiklücken bleiben bestehen.

### Fortschritt: Gleichungen 4
math4_3_terme_gleichungen bietet nun sechs Abschnitte, neun Übungsfragen und drei geführte Rechenwege. Es behandelt Terme, Klammern, lineare Gleichungen mit beidseitiger Variable, Sonderfälle und ein Sachmodell. Der Schritttrainer ist eine Auswahlübung für vorgegebene Aufgaben, kein allgemeiner symbolischer Gleichungslöser. test_equations.js prüft jede angebotene Entscheidung der drei Aufgaben, Einsetzproben und bestehende Termeingabe. Weitere Lehrplan-/Darstellungsabnahme und Veröffentlichung bleiben offen.

### Fortschritt: Rationale Zahlen 3
math3_1_rationale_zahlen wurde von zwei knappen Abschnitten zu vier Abschnitten mit acht Übungsfragen und strukturierten Lernhilfen ausgebaut. Der Zahlenstrahl zeigt Start/Ergebnis durch unterschiedliche Formen und erklärt die Bewegung zusätzlich als Text. test_rational_numbers.js prüft alle 882 Kombinationen sowie bestehende Eingaben und Lernstandsrevision. Weitere Inhalts-/Lehrplanabnahme und visuelle Gesamtprüfung bleiben offen.

### Übergreifender Prüfstand
Der neue scripts/audit_all_chapter_renders.js prüft alle 181 deutschen Navigationskapitel im echten gemeinsamen Renderer samt gemeinsamen Labor-Modulen: Kapitelkarten, Frageanzahl gegen Quell-Platzhalter, Lernhilfen und Erhalt mathematischer Vergleichszeichen. Ergebnis: 181 geladen, keine Fehler in diesem Umfang, 90 Kapitel mit fehlenden strukturierten Lernzielen oder Zusammenfassungen. Der Bericht ../chapter-render-audit.json enthält die IDs und den Prüfumfang. Einzelne js/topics-Module, externe Medien, responsive Darstellung und fachliche Lehrplanabdeckung werden darin ausdrücklich nicht geprüft.

### Fortschritt: Geometrie 3/4
Lernführung in math3_7_aehnlichkeit, math3_8_pythagoras, math3_9_koerper, math4_2_pythagoras und math4_5_aehnlichkeit ergänzt. Neue Aufgaben behandeln fehlende Kathete, Rechteckdiagonale und Flächenfaktor. Schattenmethode benötigt parallele Lichtstrahlen, senkrechte Objekte und waagrechten Boden; diese Bedingungen stehen nun im Kapitel. Der Render-Audit bleibt bei 181 erfolgreichen Kapiteln, die Zahl fehlender strukturierter Lernhilfen sinkt auf 85. Kein Nachweis vollständiger Geometrieabdeckung: Konstruktionen, umfassende Körperberechnungen und Prüfung der bestehenden interaktiven Einzelmodule bleiben erforderlich.

### Fortschritt: Weitere Mathematik-Lernhilfen
Fünf verbleibende Kapitel der 3. Klasse erhalten Lernführung; Potenzen und Gleichungen zusätzlich konkrete neue Inhalte/Fragen. Beim aktuellen Lesen stellte sich heraus, dass die frühere textbasierte Korrektur von Mittelwert/normal wegen eines eingebetteten span-Tags nicht gegriffen hatte. Die HTML-Struktur wurde nun berücksichtigt und die Formulierung ersetzt. Das Säulendiagramm hat erstmals Achsen-/Größenangaben und eine Datenbeschreibung. Der umfassende gemeinsame Render-Audit zählt weiterhin 181 erfolgreiche Kapitel; fehlende strukturierte Lernhilfen: 80. Fachliche Gesamtabnahme, einzelne interaktive Bestandsmodule, Sprachfassungen und Veröffentlichung bleiben offen.

### Fortschritt: Finanzmathematik
Mathematik 3/4 enthält jetzt zeitanteilige Monatszinsen, Zinseszinsvergleich, Raten-Gesamtbeträge und KESt-Beispiel. Quellenstand 05.09.2026: OeNB Glossar Z, AK Ratenkauf, BMF Informationen zu Einkünften aus Kapitalvermögen. 25 % werden ausdrücklich auf Sparbuch-/Girozinsen bezogen, andere Kapitalerträge abgegrenzt. Alle Zinssätze der Aufgaben sind Modellannahmen. test_finance_chapters.js prüft jährliche Cent-Rundung und Benutzereingaben. Gemeinsamer Render-Audit 181/181, verbleibende Lernhilfenlücken 78. Finanzkapitel-Ausbau bedeutet keine vollständige Lehrplan- oder Veröffentlichungsabnahme.

### Fortschritt: Chemie
RIS nennt für Chemie Bildungs-/Lehraufgabe und didaktische Grundsätze für die 4. Klasse; dies wurde im lokal gespeicherten Lehrplan und per aktuellem RIS-Suchergebnis bestätigt. Direkter Normabruf lieferte zunächst HTTP 503. Die bisherige Zweijahreszuordnung war damit nicht tragfähig. Alle 15 Navigationseinträge sind nun Schulstufe 8, Grundlagen und Vertiefung bleiben als Lernblöcke erhalten. Authored Ziele sind strukturiert verfügbar, Zusammenfassungen und Vorwissen ergänzt. Deutscher Lernweg und drei Steuerknöpfe geprüft; andere Sprachfassungen, fachliche Experimente/Modelle und Schulautonomie-Abgleich sind noch keine abgeschlossene Gesamtabnahme. Render-Audit: 181 erfolgreich, 63 ohne vollständige strukturierte Lernhilfen.

### Fortschritt: Digitale Grundbildung
Alle 21 DGB-Navigationseinträge haben jetzt strukturierte Lernhilfen. Die Ziele stammen aus den vorhandenen Werkstattzielen, Zusammenfassungen sind kapitelspezifisch; Vorgängerkapitel folgen den fünf Fachsträngen über die Schulstufen. Analog bedeutet nicht ohne Datenverarbeitung: Die Beschreibung trennt nun kontinuierliche und diskrete Darstellung. Alle Vorwissensverweise existieren, gemeinsame Renderer-/Stofflistenprüfung bestanden. 42 übrige Kapitel ohne vollständige strukturierte Lernhilfen. Rechtliche Detailaussagen, konkrete Softwareanleitungen, praktische Arbeitsaufträge und angebotene Übersetzungen sind damit noch nicht vollständig verifiziert.

### Fortschritt: Biologie-Lernhilfen Teil 1
18 Kapitel aus Grundlagen, Pflanzen, Evolution und Ökosystemen verfügen nun über strukturierte Ziele und Zusammenfassungen. Die Ziele wurden aus den vorhandenen Das-soll-ich-lernen-Boxen übernommen und mit expliziten Vorwissensverweisen verbunden. Ein erfolgreicher Render-Audit und gültige Verweise belegen die Integration, keine vollständige fachliche Abnahme der vorhandenen Texte, Quizfragen, Simulationen oder Bilder. Gesamtstand: 181 Kapitel gerendert, 24 ohne vollständige strukturierte Lernhilfen.

### Meilenstein: Strukturierte Lernhilfen vollständig vorhanden
Alle 181 deutschen Navigationskapitel enthalten nun learningGoals und summary. Der gemeinsame Renderer zeigt die erwarteten Einträge; audit_all_chapter_renders meldet keine fehlenden Lernhilfen oder Darstellungsbefunde in seiner begrenzten Prüfabdeckung. Vorwissen ist kapitelspezifisch angegeben, bei Einstiegen teils leer. Neu ergänzt wurden 21 Biologiekapitel sowie drei übrige Angebote. Gesundheitliche Kernaussagen zu Impfungen/Antibiotika, Pubertät und Verdauung wurden anhand des österreichischen Gesundheitsportals abgeglichen und einschlägige Quellen ergänzt. Das ist keine umfassende medizinische Prüfung aller alten Kapiteltexte oder Aufgaben. Der Gesamtauftrag bleibt unverändert offen, insbesondere fachliche Abdeckung, Einzelmodule, Übersetzungen, Lizenzprüfung und Veröffentlichung.

## Konsolidierter Nachweisstand (05.09.2026)
Der oben dokumentierte ursprüngliche Bestand von 134 Einträgen ist historisch. Die aktuelle Navigation umfasst 192 Kapitel einschließlich Zusatzspiele. Der zuletzt erneut ausgeführte gemeinsame Funktionslauf `node scripts/run_functional_tests.js` besteht mit 43/43 vorhandenen Suiten; sein maschinenlesbarer Bericht liegt unter `../functional-test-report.json`. Dies ist ein Funktionsnachweis für die geprüften Abläufe, keine vollständige Produktabnahme. Fachliche und lehrplanbezogene Gesamtprüfung, vollständige angebotene Übersetzungen, visuelle/Medienprüfung und Veröffentlichung stehen weiter aus.

### Erneute Gesamtprüfung des technischen Bestands
- Gemeinsamer Renderlauf: 192/192 Navigationskapitel, keine fehlenden Lernziel-/Zusammenfassungslisten und keine erfassten Renderbefunde. Der Prüfumfang umfasst keine individuellen Skripte oder tatsächliche Browserdarstellung.
- Vollständiger Funktionslauf: 43/43 Suiten, einschließlich zuletzt ergänzter Inhaltsmodelle, Stofflisten-Reihenfolge, Lehrkraftansicht und Laden/Wiederholen. Der Bericht ist unter ../functional-test-report.json aktualisiert.
- Zusätzliche Sichtung der zusammengeführten deutschen Abschnitts-HTMLs: keine doppelten Element-IDs innerhalb eines Kapitels. Dies erfasst keine erst später dynamisch erzeugten IDs.
- Weiter zu belegen: vollständige Lehrplanabdeckung und fachliche Tiefe aller Fächer; plausible Fehlantworten in allen Kapiteln; vollständige Sprachfassungen; tatsächliche mobile/Desktop-/Druckdarstellung, individuelle Medien und Interaktionen; Vorschau und abschließende Veröffentlichung. Die Abnahmeliste bleibt offen.

## Abnahmenachweise – technischer Umfang am 06.09.2026

Diese Zuordnung ergänzt die offenen Produktanforderungen. Ein bestandener Test belegt nur seinen hier genannten Umfang; die Gesamt-Checkboxen bleiben bis zur vollständigen Abnahme offen.

| Anforderung | Konkrete vorhandene Prüfung | Noch nicht dadurch belegt |
| --- | --- | --- |
| Stoffliste für Unterricht auswählen und teilen | test_learning_flows.js prüft Auswahl, Import und Links unter dem Projekt-Unterpfad; test_study_plan_order.js prüft die Reihenfolge auch bei gesperrtem lokalen Speicher | Tatsächliche Bedienbarkeit und Ausdruck im Browser |
| Schülerdaten aus geteilter Unterrichtsliste heraushalten | test_teaching_plan.js prüft ausgeblendete persönliche Ergebnisse, erhaltene Lernziele, Links ohne Punktwerte und Druck-CSS | Gedruckte Seitenumbrüche, reale Druckvorschau |
| Gezielte Prüfungsvorbereitung | test_targeted_review.js und test_review_link_route.js prüfen Wiederholungsfragen und Weitergabe der Stoffliste zwischen Kapiteln | Vollständige didaktische Eignung aller Aufgaben |
| Lernen ohne Versuchssperren | test_learning_flows.js wertet fünf aufeinanderfolgende Fehlversuche aus; sämtliche sechs Testfragen erhalten Rückmeldung | Aussagekraft sämtlicher echten Fragen und Antworten |
| Aktueller Lernstand nach Inhaltsänderungen | test_chapter_revisions.js prüft veraltete Ergebnisse, neue Bewertung und einmaliges Archivieren | Inhaltliche Vergleichbarkeit unterschiedlicher Kapiteltests |
| Zugängliche technische Interaktion | Fokus-, Speicherfehler- und Fachlabor-Tests prüfen ausgewählte Tastatur-/Statusabläufe mit JSDOM | Reale Screenreader, Handyansichten, visueller Kontrast und Zoom |
| Kapitel funktionieren mit dem gemeinsamen Renderer | audit_all_chapter_renders.js prüft alle 192 Katalogkapitel auf Karten, Quizplatzhalter, Übungs- und Lernzielanzahlen | Fachliche Vollständigkeit, Medienqualität, alle Einzelsimulationen und Lehrplanabdeckung |
| Lehrplan Wien/Österreich und veröffentlichtes Gesamtprodukt | Noch kein vollständiger Abschlussnachweis | Systematische Abdeckung jedes geforderten Bereichs, reale Vorschau-/Browserabnahme und überprüfte Veröffentlichung |

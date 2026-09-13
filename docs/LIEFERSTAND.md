# Lieferstand und nächste Prioritäten

Stand: 09.09.2026. Zuletzt wurde Zwischenstand 8276883 auf ausdrücklichen Nutzerwunsch nach origin/main gepusht. Weitere Ergänzungen sind lokal. Die Veröffentlichung dieses Commits auf Pages ist nicht bestätigt. Der Gesamtauftrag bleibt unverändert: vollständiges interaktives Lehrbuch für die Mittelschule Wien einschließlich angebotener Sprachen und geprüfter Veröffentlichung. Die deutsche Fassung ist ein Zwischenmeilenstein, keine neue Definition von fertig.

## Aktuell belegter Stand

- 197 verfügbare Kapitel in elf Fächern; alle haben deutsche Lernziele und Zusammenfassungen. Das belegt Struktur, nicht fachliche Vollständigkeit.
- Aktueller revisionsgeprüfter Metadatenindex: 28 englische, je 26 türkische und serbische sowie je 25 arabische und ukrainische Kapitelübersetzungen. Fehlende oder veraltete Übersetzungen verwenden einen gekennzeichneten deutschen Fallback. Fremdsprachenunterricht enthält außerdem bewusst englische Zielsprachentexte; diese Zählung bewertet nicht deren Unterrichtssprache.
- Vollständiger Funktionstest 2026-09-08T22:15:46.351Z: 171/171 Suiten bestanden, Gesamtdauer rund 284 Sekunden. Bericht: ../functional-test-report.json. Dieser gemeinsame Lauf enthält die aktuellen Mathematik-/Biologie-/DGB-Ergänzungen, Dezimaleingaben und die Änderungen an Glossaren und statischen Zeichnungen in Arbeitsblättern. Das belegt die implementierten Prüfabläufe, keine vollständige fachliche, visuelle oder schulpraktische Abnahme.
- Lehrplanlücken sind unter anderem in KUNST_LEHRPLANABGLEICH.md konkret dokumentiert. Das neue Register FACHUEBERGREIFENDER_ABGLEICH.md erfasst alle elf Fächer und den detaillierten Haushaltsabgleich; CHAPTER_INVENTORY.json verknüpft alle 197 Einträge mit tatsächlichen Quellen, Abschnitten und Lernzielen. Eine konsolidierte abschließende Abdeckung sämtlicher Fächer ist nicht nachgewiesen.
- Alle 20 Physik-Arbeitsblätter enthalten nun zuschaltbare Texte, Daten und Papieraufträge mit Abschnittslinks; interaktive Modelle bleiben online. Browser-/Geräte-/Druckprüfung, Gesamtmedienprüfung und Veröffentlichung fehlen. Kein aktueller Vorschauprozess wurde in dieser Bestandsaufnahme bestätigt.

## Aktuelle Priorität nach ausdrücklicher Nutzeranweisung

Der Nutzer hat die Übersetzungen zurückgestellt und Physik, Mathematik, Chemie, Biologie und Digitale Grundbildung priorisiert. Diese Anweisung ersetzt die bisherige Reihenfolge. Keine weiteren Übersetzungsergänzungen beginnen. Bestehende Übersetzungen und gekennzeichneter Fallback bleiben erhalten; daraus keine vollständige Sprachabnahme ableiten. Die anderen Fächer werden vorerst nachrangig behandelt.

1. Physik: offene Punkte der vorhandenen Fachmatrix an tatsächlichen Erklärungen, Aufgaben und Modellen prüfen; als Nächstes einen vollständigen Linsenversuch zur Bildentstehung ergänzen. Der inhaltliche Spiegel-/Augenabgleich ist inzwischen konkretisiert; praktische und visuelle Prüfung bleiben offen. Bestehende ausgearbeitete Modelle erhalten.
2. Mathematik: die vier Jahrgänge konsolidiert gegen Kompetenzen und tatsächlich lösbare Anwendungsaufgaben prüfen; mathematische Modelle, Eingaben und verständliche Fehlererklärungen verbinden.
3. Chemie: vorhandene Experimente und Modelle an Erklärung, Durchführung, Deutung und Modellgrenzen prüfen; konkrete fachliche Lücken vor weiteren Textvarianten schließen.
4. Biologie: die 39 Kapitel jahrgangsweise konsolidieren; Beobachtungsaufträge, biologische Modellgrenzen und fachliche Aussagen prüfen.
5. DGB: tatsächlich ausführbare digitale Handlungen priorisieren. Die Rasterwerkstatt in dgb8_produktion ergänzt inzwischen ein ausführbares Beispiel mit verschachtelten Schleifen, zusammengesetzter Bedingung, eigener Codeänderung und Testprotokoll. Nächster Schritt ist der weitere jahrgangsweise Abgleich digitaler Handlungen; dieses Beispiel allein schließt den Fachlehrplan nicht ab.
6. Gemeinsame Lern-, Wiederholungs-, Stofflisten- und Druckabläufe bei Änderungen prüfen. Browser-/Geräte-/Druckprüfung und Veröffentlichung bleiben offene Abnahmen; keine Freigabe aus automatisierten Tests allein.

## Zeitangabe

Eine belastbare Endzeit ist derzeit nicht ableitbar. Die Größenordnung des vollständigen Restumfangs wurde dem Nutzer als mehrere weitere Tage bis Wochen genannt, ausdrücklich als grobe Schätzung. Voraussetzung für eine engere Einschätzung ist die fachübergreifende Abdeckungsprüfung. Keine Fertigstellung aus grünen Funktionstests allein ableiten.

## Ergänzung 08.09.2026 – fachübergreifendes Register und Haushalt

- Alle elf Fächer inventarisiert; sieben Haushaltskapitel inhaltlich gegen beide Kompetenzbereiche und sämtliche Anwendungsbereiche der gespeicherten Fachlehrplanfassung geprüft. Konkrete verbleibende Aufgaben stehen im Register.
- eh_1_hygiene Revision 1: vier Haltbarmachungsverfahren, dreiteiliger Etikettenbogen, drei neue Fragen mit neun Rückmeldungen. Verbrauchsdatum-Frage hinter die Erklärung verschoben. Fachquellen BZfE/BfR am 08.09.2026 gelesen; keine deutschen Rechtsvorschriften als österreichisches Recht übernommen.
- Alle sieben Haushalts-Arbeitsblätter enthalten Texte, Tabellen, Quellen und Werkstätten. Gemeinsame Materialfunktion mit Physik; bestehende Kunstvorlagen bleiben gesondert.
- Gezielte Prüfungen: Haushaltskapitel und sieben Arbeitsblätter; 20 Physik-Arbeitsblätter; allgemeine Arbeitsblätter einschließlich Kunst; 65 Werkstatt-Arbeitsblätter; übersetzte Titel/Suche und Lernstandsrevisionen bestanden. Kein neuer gemeinsamer Lauf aller 143 Suiten. Zwei zunächst falsch benannte Testaufrufe fanden keine Datei; die tatsächlichen Suiten wurden danach ermittelt. Noch unveröffentlicht, keine Browser-/Druckfreigabe.

### 08.09.2026 – Projektabrechnung für Ernährung und Haushalt

Vorheriger Zielturn war Umsetzungsfortschritt; aktuelles Projektkapitel vor Bearbeitung erneut gelesen. eh_4_projekt Revision 1 enthält jetzt einen vollständigen fiktiven Belegsatz für sechs Rezeptportionen: fünf Zutaten, Anfangsvorräte, Bedarf und Packungsgrößen, geplante und tatsächliche Preise, Kassenbeleg, Geld-/Sachvorratsabrechnung sowie Entscheidung und Vergleichslösung. Einkauf 9,90 €, Plan 9,30 €, Budget 12,00 €, Rest 2,10 €. Preise ausdrücklich unabhängig vom vorhandenen Verbrauchskostenplaner. Drei neue Verständnisfragen; alte Lernerfolge werden als veraltet erkannt.

Haushaltstest prüft sieben Kapitel/Arbeitsblätter mit jetzt 34 Fragen, insgesamt 18 Antwortwegen der beiden neuen Abschnitte, unabhängig errechneten Packungszahlen und Endvorräten sowie Ausschluss der Vergleichslösung aus dem Aufgabenmaterial. Werkstatt-Arbeitsblätter, vollständiger Quizpool, übersetzte Titel/Suche und Revisionen gezielt bestanden. Kein neuer Gesamtlauf aller 143 Suiten; keine Browserprüfung oder Veröffentlichung. Nächste Inhaltslücken bleiben Ernährungsprotokoll, differenzierter Qualitätsvergleich und weitere praktische Küchentechniken.

## Aktueller gemeinsamer Prüfstand

Am 2026-09-08T15:37:59.628Z endete der vollständige Lauf erfolgreich mit 144/144 Suiten. Lokale Stofflisten, Sprache und Farbschema werden nach Änderungen in anderen Tabs aktualisiert; ausdrücklich verlinkte Stofflisten behalten ihren eigenen Inhalt. Fokus und Filter bleiben erhalten. Historische Angaben zu 143 Suiten und ausstehenden gemeinsamen Läufen weiter oben gelten nur für den jeweiligen damaligen Stand. Die Veröffentlichung und fachliche Gesamtprüfung bleiben offen.

### Musik – nach dem Gesamtlauf vom 08.09.2026

Alle sieben Kapitel und der gesamte gespeicherte Musik-Fachlehrplan gelesen; Jahrgangsmatrix mit konkreten Repertoire- und Praxislücken in MUSIK_LEHRPLANABGLEICH.md. musik_2_notation Revision 1 enthält nun ein eigenes Notenbild und Lese-/Spiel-/Schreibaufträge sowie drei zusätzliche Fragen. Zuordnung Schulstufen 5/6. Alle sieben Musik-Arbeitsblätter übernehmen vollständige Texte und Werkstätten sowie das statische Notenmotiv. Sechs betroffene Suiten (Musik, Haushalt, Physik-Arbeitsblätter, Werkstatt-Arbeitsblätter, übersetzte Suche und Lernabläufe) bestanden. Tatsächliche Darstellung des Notenschlüssels, Browser-/Druckabnahme, vollständiges musikalisches Repertoire und Veröffentlichung bleiben offen.

### 08.09.2026 – angeleitete Tanzfolge

musik_1_stimme_rhythmus Revision 1: eigene Zweitaktfolge mit sitzender Variante, passender Klanglabor-Begleitung, Variation, A–B–A und Beobachtungsbogen; drei neue Fragen. Musiktest prüft 34 Fragen, insgesamt 18 neue Antwortwege und Übereinstimmung von Bewegungsschlägen und Audiozeitplan; Tabellen erscheinen im Arbeitsblatt. Musik, Werkstatt-Arbeitsblätter, übersetzte Titel/Suche und Quizpool gezielt bestanden. Fachmatrix aktualisiert. Regionales/internationales Repertoire, Hör-/Liedbeispiele, weitere Inhalte und Veröffentlichung bleiben offen. Der frühere vollständige 144/144-Lauf liegt vor diesen Musikergänzungen.

### 08.09.2026 – lokaler Hörvergleich

musik_1_hoeren Revision 1: drei eigene elektronische WAV-Lernfassungen des Freude-Themas, Quellenkontext Beethoven-Haus, Hörprotokoll, Nachsingen/Nachspielen, drei neue Fragen. Dateiformat, alle 45 Tonhöhen, Längen und Rhythmusabweichung direkt am PCM geprüft. Native Hördateien und Klanglabor unterbrechen einander, pausieren bei verdeckter Ansicht und starten nicht automatisch; Fehlerhinweis und Lesealternative vorhanden. Musik-, Audiodatei-, Werkstatt-, Such- und Quizprüfungen gezielt bestanden. Jetzt 145 vorhandene Testsuiten; letzter gemeinsamer Gesamtlauf bleibt 144/144 vor den Musikergänzungen. Tatsächliches Abhören/Browserprüfung, vielfältiges Repertoire und Veröffentlichung weiterhin offen.

### 08.09.2026 – unbekannte Kapitel in gespeicherten Stofflisten

Vorheriger Zielturn war Fortschritt. Aktuelle Speicherung und Tests wurden gelesen: Unbekannte Kapitel wurden bisher zwar im geteilten Link erhalten, aber beim lokalen Speichern verworfen. Speicherung/Neuladen und Tab-Synchronisierung behalten sie jetzt bei. Fehlende Kennungen erscheinen als sicherer Text mit einer expliziten Entfernen-Aktion; alte Freigabelinks werden nach Änderungen ausgeblendet. Listen, die ausschließlich fehlende Kapitel enthalten, können zur Klärung geteilt werden. Ein vollständig unbekannter importierter Link überschreibt die bisherige gespeicherte Liste weiterhin nicht.

Gezielte Tests prüfen Wiederherstellung, erneutes Teilen, Entfernen/Fokus, unbekannte Änderungen bei unveränderten bekannten Kapiteln, Duplikate, HTML-Zeichen als Text, vollständig ungültige und leere Links, Speicherfehler, Sprache, Tab-Wechsel, Reihenfolge und Lehrkraftansicht. Betroffene Suiten bestanden. Kein neuer gemeinsamer Gesamtlauf nach dem früheren 144/144-Stand; 145 Suiten vorhanden. Inhalts-/Sprachvollständigkeit, Browserprüfung und Veröffentlichung bleiben offen.

### 08.09.2026 – vollständige Textmaterialien auf Sprach-Arbeitsblättern

Vorheriger Zielturn war Fortschritt. Bei der erneuten Sichtung der Sprachkapitel und Arbeitsblatt-Auswahl zeigte sich: Deutsch/Englisch druckten bisher Werkstatt und Quiz ohne die zugehörigen Abschnittstexte. Alle elf Deutsch- und neun Englisch-Arbeitsblätter übernehmen jetzt auch vollständige Lesetexte, Erklärungen und Abschnittslinks. Gedruckte Hörübungen erklären das Abdecken aller Textfassungen und eine ausdrücklich gekennzeichnete Lesealternative; Hör-/Lesetexte der Werkstatt erhalten die passende Sprachkennung. Aufgabenmaterial und Lösungen sind unabhängig schaltbar.

Neue Suite test_language_worksheets.js prüft alle 20 Kapitel, textgetreue Blockzitate, Sprachattribute, Aufgaben und Ausschluss privater Entwürfe sowie Vergleichslösungen. Dazu Werkstatt-, allgemeine, Musik-, Haushalts- und Physik-Arbeitsblattprüfungen bestanden. Jetzt 146 Testsuiten; der letzte gemeinsame Lauf (144/144) stammt aus dem Stand vor den Musik- und jüngsten Ablaufänderungen. Keine vollständige Deutsch-/Englisch-Lehrplanabdeckung oder visuelle Druckabnahme aus diesem Materialnachweis ableiten. Gesamtauftrag bleibt offen.

### 08.09.2026 – Deutsch: eine Überarbeitung tatsächlich durchführen

Vorheriger Zielturn war Fortschritt. Aktuelles Kapitel deutsch_1_schreiben vollständig erneut gelesen und auf Revision 1 angehoben: schwacher eigener Übungsentwurf zum vorhandenen Bim-Text, vier Prüfgänge, Schreibkonferenz mit konkreten Rückmeldungen, zwei begründete Änderungen und aufklappbare Vergleichsfassung. Drei zusätzliche Verständnisfragen; acht absurde oder wenig brauchbare Distraktoren der vier alten Aufgaben durch plausible Verwechslungen ersetzt. Freie Texte bleiben ohne automatische Benotung.

Gezielte Tests bestanden: alle elf Deutschkapitel (47 Fragen), alle 21 Antwortwege des überarbeiteten Kapitels, 20 Sprach-Arbeitsblätter inklusive Entwurf/Prüftabelle und Ausschluss der Vergleichsfassung, 65 Werkstatt-Arbeitsblätter, übersetzte Suche und vollständiger Quizpool. Kein neuer gemeinsamer Gesamtlauf; 146 Suiten vorhanden. Der vollständige Deutsch-Lehrplanabgleich und weitere Sprach-/Fachinhalte, Browserprüfung sowie Veröffentlichung bleiben offen.

### 08.09.2026 – Deutschabgleich und Sprachstrategien

Die vorherige ETA-Antwort war kein Umsetzungsfortschritt. Arbeitskopie und elf Deutschkapitel wurden erneut geprüft; Klassenbeschreibungen des gespeicherten Hauptfachlehrplans über alle vier Klassen gelesen. DEUTSCH_LEHRPLANABGLEICH.md hält vorhandene Aufgaben und konkrete Lücken getrennt nach Kompetenzbereichen fest. Insbesondere literarische Vielfalt, Lese-/Medienbiografie, Vortragen, mehrere Quellen und umfangreichere digitale Textproduktion bleiben offen.

deutsch_1_sprache Revision 1: vier Rechtschreibstrategien mit begründeten Beispielen, Fehlerentwurf mit vier Korrekturen und aufklappbarer Lösung, eigener Übungszyklus; Chat und formelle Anfrage vergleichen, Perspektivwechsel in Antworten, respektvoller freiwilliger Sprachvergleich. Sechs neue Fragen mit 18 Antwortpfaden; jetzt zehn Fragen in diesem Kapitel. Subjekt-Rückmeldung präzisiert. Im Erzählkapitel pauschalen Satz über erlaubte Schularbeitshilfsmittel durch Wörterbuch-Übungshinweis und Besprechung von Umfang/Zeit ersetzt. Keine neue Aussage über rechtliche Zulässigkeit von Hilfsmitteln.

Gezielte Tests bestanden: elf Deutschkapitel mit insgesamt 53 Fragen, alle 51 Antwortpfade der beiden revidierten Kapitel, Lernstandsrevisionen, Entwurfsspeicherung und Werkstätten; 20 Sprach-Arbeitsblätter einschließlich neuer Tabellen und lösungsfreier Fehlerentwürfe; vollständiger Quizpool. Titelindex und Kapitelinventar aktualisiert, diff --check sauber. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung.

### 08.09.2026 – Vorlesen, Leseprotokoll und literarische Formen

deutsch_1_lesen und deutsch_2_literatur jeweils Revision 1: vorbereitete Vorleserunde mit vier Schritten, drei Feedbackkriterien, gezielter Wiederholung und Leseprotokoll über mehrere Texte; daran anschließender Vergleich der eigenen Nora-Erzählung mit einem neuen achtzeiligen Gedicht und einer kurzen Szene. Zwei Spielvarianten, kriteriengeleitete Wirkungsauswertung, eigene Formübertragung und erweitertes Leseprotokoll. Sechs neue Fragen, keine automatische Bewertung von Vortrag oder freier Gestaltung. Materialien auch in den Sprach-Arbeitsblättern.

Gezielte Tests bestanden: elf Deutschkapitel, 59 Fragen und 93 Antwortpfade der vier revidierten Kapitel; 20 Sprach-Arbeitsblätter mit erhaltenen Versumbrüchen, Rollenangaben, Tabellen und entfernten Vergleichslösungen; Titel-/Metadatenindex samt revisionsabhängiger Sprachauswahl. Keine visuelle Prüfung und kein neuer Gesamtlauf. Lehrplanmatrix um tatsächlichen Stand aktualisiert, umfassendes Werkrepertoire und Fortführung in Klasse 3/4 weiter offen.

### 08.09.2026 – Sachtexte mit mehreren Materialien

Vorheriger Zielturn war Fortschritt; aktuelles Sachtextkapitel erneut gelesen. deutsch_2_sachtexte Revision 1 ergänzt eine tatsächlich bereitgestellte Tabelle (10/8/4/2, Summe 24), eine Tageszählung derselben fiktiven Klasse (8/12/1/3, Summe 24) mit ausdrücklich anderer Fragestellung, einen überzogenen Kommentar sowie strukturierte Belegnotizen. Auftrag: Vergleichstabelle, materialgestützte Nachricht, sachliche Erwiderung, Partnerprüfung und Kurzvortrag. A/B stammen aus derselben Erhebung und zählen nicht als unabhängige Belege. Sämtliche Erhebungen sind eigene Fiktion; keine tatsächliche Wiener Verkehrsaussage. Drei neue Fragen; bestehende Ergebnisse revisionsbedingt veraltet.

Gezielte Tests bestanden: alle elf Deutschkapitel, 62 Fragen, 114 Antwortpfade in fünf revidierten Kapiteln, Werkstätten und Speicherung; 20 Sprach-Arbeitsblätter mit vollständigen Materialien und ausgeblendeter Vergleichslösung. Titelindex und Kapitelinventar aktualisiert; Lehrplanmatrix berichtigt. Weiterer Ausbau der Quellenarbeit in Klasse 3/4 und externe Recherche bleiben offen. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung.

### 08.09.2026 – Argumentation und moderierte Diskussion

Vorheriger Zielturn war Fortschritt; aktuelles Argumentationskapitel erneut gelesen. deutsch_3_argumentieren Revision 1: zusätzliche fiktive Befragung (16/5/3 bei 24 Antworten) und Planungsnotiz (18 Bücher, 24 Kinder), fünf Übungsrollen, fünf Gesprächsschritte mit Rollenwechsel und dokumentierter Auswertung. Textverarbeitungsauftrag mit Materialbezug, Einwand/Antwort und zwei begründeten Änderungen. Zustimmung ausdrücklich von Wirksamkeitsnachweis getrennt; auch begründete Ablehnung und offene Fragen zulässig. Drei neue Fragen mit Rückmeldungen.

Gezielte Tests bestanden: elf Deutschkapitel mit 65 Fragen, 135 Antwortpfade in sechs revidierten Kapiteln, Werkstätten, Lernstandsrevisionen und lokale Entwürfe; 20 Sprach-Arbeitsblätter einschließlich Rollen und Materialien ohne Vergleichslösung. Metadaten und Lehrplanmatrix aktualisiert. Keine automatische Bewertung von Gesprächen, kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung. Externe Recherche, multimediale Quellen und weiterer Ausbau bleiben offen.

### Gesamtprüfung 2026-09-08T16:26:29.767Z

Vorheriger Zielturn war Umsetzungsfortschritt; Runner und aktuelle Abnahmeanforderungen vor dem Lauf gelesen. Alle 146 vorhandenen test_*.js wurden seriell ausgeführt; sämtliche Prozesse endeten erfolgreich. Kein laufender Testprozess verbleibt. Geprüfte Produktdateien wurden während des Laufs nicht verändert. Gesamtergebnis und Einzelausgaben stehen im aktualisierten funktionalen Bericht. Der technische Nachweis ist damit wieder aktuell; fachliche Abdeckung, Übersetzungen, tatsächliche Medienwiedergabe, Geräte-/Druckdarstellung und Veröffentlichung sind weiterhin nicht abschließend belegt.

### 08.09.2026 – Veröffentlichtes literarisches Werk und Kontext

Vorheriger Zielturn war Fortschritt durch abgeschlossenen Gesamttest; aktuelles Analysekapitel vor Änderung gelesen. deutsch_4_analyse Revision 1 enthält nun Goethes gemeinfreies „Ein gleiches“ in der bei Wikisource transkribierten Fassung von 1827, S. 99, mit unveränderter historischer Schreibung und acht Versen. Textquelle (Wikisource oldid=3682272) und Forschungsdatensatz Goethes Lyrik digital 90317 am 08.09.2026 vollständig gelesen; Fassungsvielfalt und Unterschied zwischen Entstehungsdatum und verwendeter Ausgabe erklärt. Keine fremde Interpretation übernommen. Eigene Aufgaben: Worterschließung, Form/Anrede/Reime, mehrere Lesarten, zwei Vortragsvarianten, Vergleich mit dem Banktext, 180–250 Wörter mit Belegen, Peerprüfung und Leseprotokoll.

Gezielte Tests bestanden: alle elf Deutschkapitel, 68 Fragen, 156 Antwortpfade in sieben revidierten Kapiteln, Speicherung und Werkstätten; 20 Sprach-Arbeitsblätter einschließlich exakt erhaltenem Gedicht, Versumbrüchen, Quellenlinks und entfernter Vergleichslösung. Titelindex, Inventar und Abgleich aktualisiert. Historisches Gesamtresultat 146/146 bleibt vor dieser Ergänzung; keine erneute Gesamtprüfung oder Browserfreigabe. Weiteres Werkrepertoire, multimediale Vergleiche und eigenständige Recherche bleiben offen.

### 08.09.2026 – Englisch-Vergleichslösungen erfüllen die Aufgaben

Vorheriger Zielturn war Umsetzungsfortschritt. Alle neun englischen Schreibaufträge und Vergleichslösungen wurden gelesen. Fünf Lösungen unterschritten die im Auftrag genannten Wortbereiche: Einladung 34 statt 40–60, Geschichte 49 statt 90–120, Medienkommentar 45 statt 80–100, Anfrage 64 statt 100–130, Sprachmittlung 69 statt 80–100. Korrigierte vollständige Lösungen haben 49/110/90/107/84 Wörter. Zusätzlich nennt die Anfrage einen konkreten Wunschtermin; der Diskussionsdialog enthält jetzt zwei unterschiedliche Vorlieben mit Gründen, einen Einwand und eine gemeinsame Lösung. Eine zweite Runde mit fehlender Kamera konkretisiert die Anpassungsaufgabe. Keine Quizinhalte verändert, deshalb keine neue Lernstandsrevision.

Gezielte Tests bestanden: neun Englischkapitel mit 36 Fragen/27 Zuordnungen, vollständige Vergleichslösungen und Wortbereiche, explizite Sprachausgabe/Stoppen; 20 Sprach-Arbeitsblätter ohne Lösungstexte. Metadaten/Inventar neu erzeugt. Diese Inhaltskorrektur erfolgte nach dem letzten Gesamtlauf; noch kein vollständiger Englisch-Lehrplanabgleich. Weitere Progression, tatsächliches Hörverstehen und interaktive Gesprächsaufgaben bleiben zu prüfen.

### 08.09.2026 – Vollständiger Englisch-Hauptfachabgleich

Vorheriger Zielturn war Fortschritt durch korrigierte Vergleichslösungen. Hauptfachlehrplan Lebende Fremdsprache in der gespeicherten RIS-Fassung nun vollständig gelesen: Bildungsaufgabe, Grundsätze, Modell und alle vier Klassen, Zeichen 188642 bis vor dem Lehrplan der zweiten Fremdsprache. Neun Kapitel und tatsächliche Klassenverteilung abgeglichen; ENGLISCH_LEHRPLANABGLEICH.md ordnet jede Fertigkeit dem Bestand und konkreten Restarbeiten zu.

Neue priorisierte Befunde: Haupttexte stehen vor der Hörwerkstatt sichtbar; synthetisches Vorlesen allein trennt Hören/Lesen nicht. In Klasse 3/4 fehlen hinreichende Literatur-/Kulturbeispiele und eigenständige Präsentationen. Gesprächsaufgaben brauchen Informationslücken; Zukunft, Gefühle, Erfahrungen und literarische Eindrücke brauchen zusammenhängende Schreibaufträge. Deutscher Mediationstext ersetzt kein englisches Leseverstehen. Keine Produktdateien geändert und deshalb keine Wiederholung bereits grüner Funktionstests. Fachfreigabe bleibt offen.

### 08.09.2026 – Hörablauf vor sichtbarem Transkript

Vorheriger Zielturn war Fortschritt durch vollständigen Englischabgleich. Aktuelle Werkstatt- und Renderer-Schnittstelle gelesen. englisch_1_listening nutzt nun listeningFirst: Hörsteuerung vor den Aufgaben im ersten Abschnitt; vorhandener englischer Quellentext wird beim Aufbau in ein standardmäßig geschlossenes, jederzeit bedienbares details-Element verschoben. Keine doppelte Transkriptfassung in der späteren Werkstatt. Zwei Hördurchgänge mit Global-/Detailauftrag, anschließender Vergleich und ausdrücklich benannte Lesealternative. Papierausgabe erhält weiterhin den kompletten Quellentext, da nur die Laufzeitdarstellung umgeordnet wird. Keine Quizinhalte oder Ergebnisse verändert, keine neue Lernstandsrevision.

Gemeinsame Werkstattfunktion behält die bisherigen Sprachen und explizite Wiedergabe/Stoppen bei. Transkripte erhalten Zielsprachenattribute. Gezielte Tests bestanden: neun Englischkapitel einschließlich anfänglich geschlossenem Transkript, genau einer Steuerung, unverändertem Wortlaut, wiederholter Initialisierung und Fallback ohne speechSynthesis; alle sechs Werkstattsprachen; elf Deutschkapitel; 20 Sprach-Arbeitsblätter. Neue Aufnahme, tatsächliches Anhören und visuelle Prüfung sind nicht erfolgt. Die übrigen Hörkapitel und breiteres Stimmen-/Medienrepertoire bleiben offen.

### 08.09.2026 – Englisch: Verabredung mit Informationslücke

Vorheriger Zielturn war Fortschritt durch neuen Hörablauf. Aktuelles Alltagskapitel gelesen. englisch_2_everyday Revision 1 ergänzt fiktiven Veranstaltungsplan, zwei getrennt zu lesende Rollenkarten, funktionale Sprachbausteine, Rückfrage, gegenseitige Bestätigung, Rollenwechsel und Terminabsage. Dienstag 16–17 Uhr ist die einzige vollständige gemeinsame Möglichkeit; nach dessen Absage passt keiner der verbleibenden Termine. Partnerkarten sind frei zugängliches Unterrichtsmaterial; Abdecken/separate Ausdrucke werden erklärt, keine technische Geheimhaltung behauptet. Alleinarbeit ist ausdrücklich Gesprächsvorbereitung. Drei neue Quizfragen; Gesprächsleistung wird nicht automatisch benotet.

Gezielte Tests bestanden: neun Englischkapitel mit 39 Fragen, alle 21 Antwortpfade im revidierten Kapitel und Lernstandsrevision; 20 Sprach-Arbeitsblätter mit vollständigen englischen Rollenkarten und ohne Vergleichslösung. Titelindex, Inventar und Englischmatrix aktualisiert. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Englische Geschichte, Perspektive und Präsentation

Vorheriger Zielturn war Fortschritt durch Rollenkarten. Aktuelles Kapitel englisch_3_opinions erneut gelesen und auf Revision 1 erweitert: eigene fiktionale Geschichte „A different job“ (211 Wörter, vier Absätze), Worterschließung, Ich-Perspektive versus Figurenwunsch, Belegnotizen, drei neue Fragen, zweiminütige Präsentation mit Rückfrage, persönliche Reaktion von 100–130 Wörtern und Überarbeitung. Vergleichslösung hält den Wortbereich ein. Anschluss an weitere eigene Klassenlektüre; keine fremde Literatur oder kulturelle Repräsentativität behauptet. Englische Aufgaben und deutsche Hilfen sprachlich ausgezeichnet.

Gezielte Tests bestanden: neun Englischkapitel, 42 Fragen, 42 Antwortpfade in den beiden revidierten Kapiteln, Vergleichslösungen, Hörablauf und Navigation; 20 Sprach-Arbeitsblätter mit vollständiger Geschichte und ohne Musterantwort. Metadaten, Inventar und Kompetenzmatrix aktualisiert; weitere Literatur/kulturelle Perspektiven und Klasse-4-Progression offen. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Ausfälle der Vorlesestimme

Vorheriger Zielturn war Fortschritt durch englische Geschichte. Aktuelle Sprachwerkstatt auf Fehlerfälle geprüft: bisher fehlte eine Rückmeldung bei Voice-Fehlern oder geworfenen API-Ausnahmen. Jetzt zugänglicher Status in de/en/ar/sr/tr/uk, erneuter Start nach Fehler, Schutz vor verspäteten Ereignissen älterer Versuche und Unterscheidung von bewusster Abbruchhandlung. Unvollständige Speech-API fällt auf zugänglichen Text zurück. Ausblenden/Verlassen stoppt aktive Wiedergabe, auch nach Rückkehr auf eine zwischengespeicherte Seite; abgeschlossene Wiedergabe löst keine unnötige Abbruchhandlung aus. Ein Fehler öffnet das Transkript nicht automatisch.

Neue 147. Testsuite test_speech_failures.js bestanden: sechs Sprachen, Ereignis-/synchrone Fehler, Wiederholung, alte Callbacks, Stoppen, Sichtbarkeit, wiederholtes pagehide und Teil-API. Außerdem Deutsch-, Englisch- und sechs Werkstattsprachentests bestanden. Keine tatsächliche Audioqualität überprüft, kein neuer Gesamtlauf.

### 08.09.2026 – Englischer Kultur-Sachtext und Präsentation

Vorheriger Zielturn war Fortschritt durch robuste Sprachausgabe. Aktuelles Prüfungskapitel gelesen. englisch_4_exam Revision 1 ergänzt eigenen englischen Sachtext zum Globe Theatre anhand der am 08.09.2026 gelesenen offiziellen Seiten „Globe Theatre“ und „The Third Globe“. Historischer Erstbau 1599 und offizielle Eröffnung der heutigen Rekonstruktion 1997 getrennt; keine alten Besuchspreise oder Veranstaltungstermine übernommen. Zwei erfundene Schülermeinungen ausdrücklich von Fakten und tatsächlichen Erfahrungsberichten abgegrenzt. Quellenkritik berücksichtigt, dass beide Seiten denselben Herausgeber haben.

Aufgaben: Informationsentnahme, Einstellungen und Unsicherheit, drei neue Fragen, Empfehlung 120–160 Wörter samt passender Vergleichslösung, zweiminütige Präsentation mit eigener Darstellung, Vergleichsrecherche zu einem weiteren Kulturort. Gezielte Tests bestanden: neun Englischkapitel mit 45 Fragen, 63 Antwortpfade in drei revidierten Kapiteln; 20 Sprach-Arbeitsblätter mit beiden Textmaterialien und ohne Vergleichslösung. Metadaten, Inventar und Kompetenzmatrix aktualisiert. Keine Buchung, Veröffentlichung oder Browserprüfung; weitere Literatur-/Kulturvielfalt und Gesamtfreigabe offen.

### 08.09.2026 – Englisch: Vergangenheit, Gefühle und Zukunft

Vorheriger Zielturn war Fortschritt durch Kultur-Sachtext. Aktuelles Geschichtenkapitel gelesen. englisch_2_stories Revision 1 ergänzt eine Nachricht als Fortsetzung des Parktexts: Rückblick, Gefühle, going-to-Plan, Wunsch und noch unbestätigte Verabredung. Vierzeilige Funktionstabelle, sprachliche Hilfen, Gespräch mit anderem Interesse und späterer Ankunft, Antwortauftrag 70–100 Wörter und kriteriengeleitete Überarbeitung. Vergleichslösung erfüllt Umfang und Rollenbedingungen. Drei neue Fragen und neun Rückmeldungen.

Gezielte Tests bestanden: neun Englischkapitel mit 48 Fragen, 84 Antwortpfade in vier revidierten Kapiteln, Lernstandsrevisionen und Werkstätten; 20 Sprach-Arbeitsblätter mit Nachricht/Tabelle und ohne Musterantwort. Titelindex, Inventar und Kompetenzmatrix aktualisiert. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung; weiterer freier Transfer und gesamte Fachfreigabe offen.

### 08.09.2026 – Plausible Englisch-Distraktoren

Vorheriger Zielturn war Fortschritt durch Zukunftsplanung. Alle 36 ursprünglichen Englischfragen mit Antwortalternativen und Feedback erneut gelesen. 26 schwache/absurde Distraktoren in acht Kapiteln durch konkrete Verwechslungen aus den jeweiligen Texten ersetzt: Material/Zeit/Raum, eingeladenes und einladendes Kind, Ortspräpositionen, Plan/Missgeschick, Sprecherzuordnung, vorhandenes Angebot/fehlende Erklärung sowie Tätigkeit/Voraussetzung. Richtiglösungen unverändert; jede neue Alternative mit eigener Erklärung. Acht Kapitelrevisionen erhöht, damit alte Ergebnisse nicht denselben Anforderungsstand vortäuschen. Die weiteren neueren Fragen wurden nicht pauschal als inhaltlich vollständig freigegeben.

Gezielte Tests bestanden: neun Englischkapitel, alle 144 Antwortpfade der 48 Fragen, alle Lernstandsrevisionen, 27 Werkstattzuordnungen, Modellwortzahlen und Hörablauf; übersetzte Titel/Metadaten samt Fallback; 20 Sprach-Arbeitsblätter. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Energiebeobachtung abgeschlossen, Wetterantrieb ergänzt

Vorheriger Zielturn war eine reine Restzeitauskunft und damit kein Umsetzungsfortschritt. Begonnene Energieänderungen im aktuellen Arbeitsstand bestätigt: 20 Fragen, alle neun neuen Antwortwege, Pendelprotokoll, Messgrenzen, Energiebilanz und bestehende Modelle bestehen den Kapiteltest. Alle 20 Physik-Arbeitsblätter und die drei gerenderten Kernkapitel ebenfalls geprüft.

Wetterkapitel vollständig abschnittsweise gelesen; Revision 2 ergänzt unterschiedliche Oberflächenerwärmung, drei qualitative Küstenbedingungen, vollständige Umlaufwege, Vorhersage/Überprüfung, Vergleichstabelle, Untersuchungsplanung und Quellenauftrag. NWS-Seite „Weather In Action: Lake Shadow/Breeze“ am 08.09.2026 gelesen. Gleiche Oberflächentemperaturen implizieren keine allgemeine Windstille; Modell nicht als Windvorhersage für Wien ausgegeben. Drei neue Fragen mit neun begründeten Antwortwegen. Bestehende Abschnitts-IDs und Reihenfolge erhalten.

Gezielte Tests bestanden: Wetter mit 14 Fragen, drei Modellzuständen, Zustandswechsel/Zurücksetzen/Fokus/wiederholter Initialisierung, neun neuen Antwortwegen und Lernstandsrevision; alle 20 Physik-Arbeitsblätter einschließlich Küstenfällen/Arbeitsauftrag; Titelindex und Sprach-Fallback. Inventar und Physikmatrix aktualisiert. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung. Wetterextreme, restlicher Fachabgleich, alle Fächer/Sprachen und Endabnahme weiterhin offen.

### 08.09.2026 – Wetterextreme und Warnungen auswerten

Vorheriger Zielturn war Fortschritt durch Energieabschluss und Küstenmodell. Aktuelle Wetterstruktur, bestehende Prüfung und Geografiekapitel Naturgefahren vor der Ergänzung gelesen. Neuer Abschnitt extreme_warnungen (Revision 3): 1 mm = 1 L/m², zwei erfundene Regenfälle mit gleicher Gesamtmenge und unterschiedlicher Dauer, Berechnung von 30 bzw. 5 mm/h und jeweils 1 500 L auf 50 m², Trennung von gefallener Menge und Abfluss. Wiener Regenwassermanagement als Anwendung; Verknüpfung zum bestehenden Naturgefahrenkapitel.

Drei klar erfundene Warnmeldungen erlauben Vergleich von Ausgabe/Aktualisierung, Ort, Tag und Gültigkeit. Eine ebenfalls erfundene schulische Regel macht die Entscheidung für eine Innenraumalternative im Aufgabenfall überprüfbar. Unsicherheit, verständliche Information und aktuelle amtliche Quellen werden unterschieden. Keine echte Warnlage oder allgemein geltende Schulregel behauptet. GeoSphere-Warnsystem, Stadt-Wien-Wetterstatistik und Regenwassermanagement am 08.09.2026 gelesen. Hagelantwort ersetzt die zwingende mehrfache Auf-und-ab-Erzählung durch Wachstum gefrierender Tröpfchen und Tragen im Aufwind, entsprechend vorhandener Kapitel-/Simulationserklärung.

Gezielte Tests bestanden: tatsächliches Wetterkapitel mit allen 51 Antwortwegen der 18 Fragen, Zuordnung neuer Fragen zu Abschnitt 6, Regenrechnungen, Warnmaterial, Küstenzustände und vorhandene Messgerät-/Niederschlagserklärungen; alle 20 Physik-Arbeitsblätter mit Tabellen/Aufträgen und ohne Vergleichslösungen; Titelindex, Metadaten und Sprach-Fallback. Ein Syntaxfehler im erweiterten Test wurde vor dem erfolgreichen Lauf behoben. Inventar und Physikmatrix aktualisiert. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung. Gesamtauftrag bleibt offen.

### 08.09.2026 – Energieversorgung wirtschaftlich, ökologisch und ethisch abwägen

Vorheriger Zielturn war Fortschritt durch Wetterextreme. Aktuelle vier Abschnitte des Kraftwerkskapitels einschließlich aller bestehenden Fragen gelesen. Neuer Abschnitt abwaegung, Revision 2: drei selbst erstellte fiktive Angebote für PV, Wind und Laufwasser mit je 50 MWh erwarteter Jahresenergie, verschiedenen Winteranteilen, Kosten und Standortfragen. Angebote sind auf vergleichbaren Jahresertrag dimensioniert, nicht auf gleiche Anlagengröße. Vergleich der einmaligen Anschaffung plus zehnjährigem Betrieb ist ausdrücklich unvollständig; keine realen Preis-/Finanzierungsangaben. Prioritätenwechsel zwischen Kosten/Flächennutzung und Winterbeitrag macht Zielkonflikte sichtbar. Vier Perspektiven ergänzen Verteilung von Kosten, Nutzen, Umweltbelastung und Teilhabe. Beschlussauftrag 120–180 Wörter mit passender Vergleichslösung; keine automatische Benotung persönlicher Wertgewichtungen.

Gezielte Tests bestanden: drei Physik-Kernkapitel mit nun insgesamt 27 Fragen und bestehenden Modellen; tatsächlicher Renderer mit allen 33 Antwortwegen des Kraftwerkskapitels, neuer Abschnittszuordnung, Kosten-/Winterwerten, Lernstandsrevision und Modelltextumfang; alle 20 Physik-Arbeitsblätter mit Angebots-/Rollentabellen und ohne Musterantworten; Titel-/Metadatenindex samt Sprach-Fallback. Zwei Syntaxfehler im einmaligen Autorenskript vor Ausführung korrigiert; Kapiteländerung danach einmal erfolgreich angewendet. Inventar und Physikmatrix aktualisiert. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung. Gesamtumfang weiterhin offen.

### 08.09.2026 – Gemeinsamer Funktionstest abgeschlossen

Vorheriger Zielturn war Fortschritt durch den ausgearbeiteten Kraftwerksvergleich. Vor Start wurde geprüft, dass kein anderer Funktionstest-Runner aktiv war. Vollständiger serieller Lauf mit 147 vorhandenen Testsuiten, unveränderten Kapitel-/Anwendungsdateien während des Laufs und terminalem Ergebnis 147/147, Exitcode 0. Berichtzeit 2026-09-08T17:16:44.478Z; alle Einzelergebnisse und Ausgaben sind im Bericht gespeichert. Keine Fehlerkorrektur am Produkt erforderlich. Gesamtlauf umfasst jetzt sämtliche Änderungen seit dem vorherigen 146-Suiten-Nachweis.

Parallel aktuelle vier Strahlungsabschnitte samt acht Fragen gelesen (abgeschnittenen Halbwertszeitabschnitt separat vollständig nachgelesen). Bestehender Zerfallsvergleich ist ausgearbeitet; konkrete Forschungsanwendung und angeleitete Wechselwirkungsuntersuchung bleiben die nächsten offenen Inhalte. Offizielle TU-Wien-Seiten zum Atominstitut und zum Forschungsbereich Neutronen-/Quantenphysik geöffnet; Institutsbeschreibung nennt Umweltanalytik und Prüfung der Strahlungsresistenz von Werkstoffen. Dies ist zunächst Quellenorientierung, kein fertiger Forschungsauftrag und kein Nachweis einer konkret aufbereiteten aktuellen Studie.

Quellenorientierung: https://www.tuwien.at/phy/ati/ueber-uns und https://www.tuwien.at/phy/ati/neutronen-und-quantenphysik/forschung (08.09.2026). Keine Kapiteländerungen nach dem Gesamtlauf in diesem Turn. Weiter offen: vollständiger Fach-/Lehrplanabgleich aller Fächer, restliche Übersetzungen, tatsächliche Medien-/Audio- und Browser-/Geräte-/Druckprüfung sowie Veröffentlichung.

### 08.09.2026 – Strahlungsbildgebung und aktueller Forschungsbezug

Vorheriger Zielturn war Fortschritt durch den vollständigen 147-Suiten-Nachweis. Aktuelle Strahlungsstruktur erneut geprüft. Revision 2 ergänzt fünften Abschnitt: Detektorsignale, Absorption/Streuung, komplementäre Verfahren, idealisierte Zählreihen mit Untergrundkorrektur sowie Untersuchungskontrollen. Vier neue Fragen mit zwölf Antwortwegen; nun zwölf Fragen insgesamt. Die Übungszahlen stammen aus keiner Forschungsquelle und werden nicht als Material-, Dosis- oder Abschirmdaten ausgegeben.

Echte Quelle 1: TU-Wien-Abstract der Diplomarbeit von Clemens Trunner (2024), Aufbau einer Neutronenradiographieanlage, https://repositum.tuwien.at/handle/20.500.12708/195945. Echte Quelle 2: PSI-Medienmitteilung vom 13.08.2026, https://www.psi.ch/de/news/medienmitteilungen/was-ein-trockener-meteorit-ueber-wasser-auf-dem-mars-erzaehlt. Beide am 08.09.2026 gelesen. Eigene kurze altersgemäße Zusammenfassung, keine fremden Bilder. Wasserstoffhaltige Bereiche in einer kleinen Meteoritenprobe sind weder flüssiges Wasser im ganzen Planeten noch Lebensnachweis. Wiener Anlage und Schweizer Studie ausdrücklich getrennt. Quellenauftrag nennt Herausgeber-/Datumsprüfung sowie Befund/Deutung; Original-Fachartikel nicht ausgewertet.

Gezielte Tests: Kernkapitelmodelle, tatsächlicher Renderer mit allen 36 Strahlungs- und 33 Kraftwerksantwortwegen, Kontrollrechnungen, Lernstandsrevision, Forschungs-/Arbeitsmaterial; alle 20 Physik-Arbeitsblätter ohne Vergleichslösungen; Titelindex/Fallback. Eine zu starke Formulierung über bessere Unterscheidung durch zwei bereits einzeln unterscheidende Messreihen anschließend fachlich präzisiert und betroffene Tests erneut ausgeführt. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Praktische Erd-/Mondmodelle in sechs Sprachen

Vorheriger Zielturn war Fortschritt durch Strahlungsforschung. Aktuelle vier Erde/Mond/Sonne-Abschnitte samt Fragen gelesen. Revision 2 ergänzt kontrollierten Jahreszeitenaufbau (gleicher Abstand, konstante Achsenrichtung, langsame Eigendrehung, vier Beobachtungspositionen), Protokoll, Südhalbkugelvergleich und Zeichnungsalternative. Die Achse bleibt parallel zu einem Wandpfeil; eine missverständliche Ausrichtung auf einen endlichen Wandpunkt wurde vor Prüfung bereinigt. Mondphasenwerkstatt trennt Blick vom Erdplatz und Seitenansicht; Personenschatten sind Störeffekt, Finsternisse ein gesonderter Gegenstand. Keine minutengenaue Tageslänge oder maßstäbliche Geometrie behauptet.

Drei neue Fragen führen zu elf Fragen. Bereits vorhandene en/ar/sr/tr/uk-Fassungen samt allen neuen Aufträgen, Protokollen, Fragen und Rückmeldungen aktualisiert, sourceRevision 2. Damit bleibt der revisionsgeprüfte Umfang 48 englische und je 46 weitere Übersetzungen. Zunächst erkannter Fallback durch veraltete Übersetzungen ist behoben, nicht durch Umgehen der Revisionskontrolle verdeckt.

Gezielte Tests bestanden: Kernmodelle und Renderer mit allen 102 Antwortwegen der drei Physik-Kernkapitel; alle 20 deutschen Physik-Arbeitsblätter; jede der fünf übersetzten Erd-/Mondfassungen mit elf gleich zugeordneten Fragen, allen Rückmeldungen, Aufgabenmaterial und Phasenreglern; Metadaten/Fallback. Inventar und Physikmatrix aktualisiert. Unterrichtsaufbau, tatsächliche visuelle Prüfung und Muttersprachlerprüfung nicht durchgeführt. Kein neuer Gesamtlauf oder Veröffentlichung.

### 08.09.2026 – Qualitative Kraftwirkung und Kraftmesservergleich

Vorheriger Zielturn war Fortschritt durch sechs Sprachfassungen der Modellwerkstatt. Aktuelle Kraftabschnitte quellenbasiert im Repository gesichtet; Einstieg und Wechselwirkungsauftrag samt Fragen gezielt vollständig gelesen. Revision 6: Einstieg nennt Geschwindigkeitsänderung statt bloßer Bewegung; Einstiegsfrage trennt resultierende Kraft von gleichförmiger Bewegung und ruhendem Kräftegleichgewicht. Frühere Rollbrett-/Sockenhandlung durch kleinen kontrollierten Zugversuch an zwei Kraftmessern ersetzt. Auftrag enthält Geräteprüfung, Vermutung, gleichzeitiges Ablesen, Zugänderung/Rollenwechsel, Protokoll, Kraftpfeile für verschiedene Körper und Umgang mit Messabweichungen. Ohne Geräte ein ausdrücklich erfundenes 2-N-Papierbeispiel. Keine gemessenen Werte erfunden.

Gezielte Tests bestanden: 33 Kapitelaufgaben, 27 ausgewählte Antwortwege (einschließlich aller geänderten/neuen Aufgaben), Revisionen, neun Bewegungspositionen, vier Bremswegvergleiche, sechs resultierende-Kraft-Fälle und drei Kraft/Masse-Fälle; alle 20 Physik-Arbeitsblätter einschließlich Kraftmesserprotokoll; Titel-/Metadatenindex und Sprach-Fallback. Inventar und Physikmatrix aktualisiert. Kein neuer Gesamtlauf, tatsächlicher Klassenversuch, Browsertest oder Veröffentlichung.

### 08.09.2026 – Hebelmodell berechnet Drehmomente

Vorheriger Zielturn war Fortschritt durch Kraftmesseraufgabe. Aktueller Reibungs-/Hebelcode und Hebelinhalt gelesen. Hebelbefund: feste Chancenwerte 85/45/20 %, Positionsschwellen ohne Kräfteberechnung und Randstellung außerhalb des linken Kraftangriffspunkts. Revision 7 ersetzt dies durch masselosen 2-m-Hebel mit 40 N links und 10 N rechts; Drehpunkt 0,2 bis 1,8 m in 0,1-m-Schritten. Hebelarme und Drehmomente werden ausgerechnet. Gleichgewicht bei 0,4 m; größere rechte/ linke Momente heben/senken die linke Last anfangs. Gezeichnete Neigung ist ausdrücklich keine dynamische Zeit-/Endlagenberechnung. Wahrscheinlichkeitselement entfernt, Regler beschriftet und Beschreibung für assistive Technik aktualisiert. Hebelfrage mit eindeutigen konstanten Vergleichsbedingungen überarbeitet. Papierfassung erhält Kräfte, Abstand und Rechenweg außerhalb der entfernten Interaktionszone.

Gezielte Tests bestanden: alle 17 Hebelstellungen plus Rückwärtswechsel, Rechenwerte, Gleichgewicht, Drehrichtung und Fokus/zugängliche Beschriftung; 30 ausgewählte Antwortwege einschließlich geänderter Hebelfrage sowie bestehende Kraft-/Bewegungsmodelle; alle 20 Physik-Arbeitsblätter; Metadaten/Fallback. Reibungsrennen noch als separate offene Prüfung vorgemerkt: festgelegte CSS-Wege/Zeiten müssen mit Annahmen und Modellgrenzen abgeglichen werden. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Reibungswege mit kontrollierten Modellbedingungen

Vorheriger Zielturn war Fortschritt durch den Drehmomenthebel. Aktuelles Reibungs-HTML und pushBlocks-Code gelesen: gleiche Kraft ohne präzisierten Anschub, fest vorgegebene 400/60-Pixel-Wege, verschiedene CSS-Zeiten und 92/28-%-Balken. Revision 8 ersetzt das Rennen durch berechnete Zustände bei 1 kg Masse und 2 m/s Anfangstempo. Zwei erfundene Flächen mit 0,5 N und 2 N Gleitreibung während der Bewegung ergeben Stoppzeiten 4/1 s und Wege 4/1 m. Nach dem Stillstand bleiben Weg und Tempo konstant; ohne andere waagrechte Kraft wird auch keine waagrechte Haftreibung benötigt.

Zeitregler 0–4 s in 0,25-s-Schritten, gemeinsame maßstäbliche Wegachse in responsiven SVGs, Tabelle mit Weg/Tempo/Reibungskraft, Live-Erklärung und Reset. Keine zeitgesteuerten CSS-Animationen oder verzögerten Neustart-Callbacks mehr im Reibungsmodell. Drei Nachkommastellen in der Tabelle als Rundung gekennzeichnet. Materialwerte sind keine Messwerte für Eis oder Teppich. Modellannahmen und Rechenweg bleiben auf dem Arbeitsblatt erhalten. Frage q2 auf kontrollierten Vergleich mit plausiblen Alternativen umgeschrieben.

Gezielte Tests bestanden: alle 17 Zeitpunkte plus Rückwärtswechsel und Reset, berechnete Werte, Ende bei Stillstand, Zeichnungsgrenzen und Fokus; 33 ausgewählte Antwortwege einschließlich aller zuletzt geänderten Kraftfragen, bestehende Hebel-/Bewegungsmodelle; alle 20 Physik-Arbeitsblätter; Titel-/Metadatenindex samt Fallback. Inventar und Physikmatrix aktualisiert. Kein neuer Gesamtlauf oder Browserprüfung.

### 08.09.2026 – Haushaltslernen: Produktlinienanalyse mit zwei Brotangeboten

Vorheriger Zielturn war Fortschritt durch berechnetes Reibungsmodell. Fachübergreifendes Register und aktuelle Abschnitte/Fragen von eh_3_nachhaltig gelesen. Neuer Abschnitt produktvergleich (Revision 1) konkretisiert die dokumentierte Produktlinienlücke: fiktive Angebote A 500 g/2,50 € und B 750 g/3,00 €, Bedarf 450 g, Verpackungsangabe und letzte Lieferstrecke. Sieben Lebensweg-/Arbeitsbereiche trennen bekannte Angaben und offene Fragen. Zweiter bestätigter Bedarf verändert die Einkaufsplanung auf insgesamt 750 g. Rechenvergleich: Grundpreise 5/4 €/kg; erster Überschuss 50/300 g; zweiter Fall zwei A für 5 € mit 250 g Überschuss oder ein B für 3 € ohne Überschuss. Keine realen Preise, CO₂-Bilanzen oder Produkt-/Verkostungsfreigaben behauptet.

Drei neue Fragen und plausible Alternativen in zwei alten Fragen; jetzt sieben Fragen. Schreibauftrag verlangt Zahlenbelege, eine Umwelt- und eine soziale Frage sowie bedingte Empfehlung. Praktische Folgedokumentation getrennt vom Planspiel.

Gezielte Tests bestanden: sieben Haushaltskapitel mit 37 Fragen und 39 ausgewählten Antwortwegen, davon alle 21 im überarbeiteten Kapitel; beide unabhängig nachgerechneten Einkaufsfälle, Lernstandsrevision, Werkstätten und vorhandene Mengenplaner; vollständige sieben Haushalts-Arbeitsblätter mit Angebots-/Lebenswegtabellen und ohne Musterantworten; Titelindex und Sprach-Fallback. Inventar und fachübergreifendes Register aktualisiert. Kein neuer Gesamtlauf oder Browserprüfung.

## Ergänzung: Essalltag und Ernährungsbiografie (08.09.2026)

- `eh_1_ernaehrung` enthält jetzt vier Abschnitte und sieben Fragen, Revision 1. Die bisherigen Abschnitte und Frage-IDs bleiben erhalten. Neu sind Mikas ausdrücklich fiktiver Früher-/Heute-Vergleich, vier Beobachtungen aus zwei Schultagen, ein ausfüllbarer Papierbogen und fünf Auswertungsschritte. Ein freiwilliger eigener Ausschnitt und das fiktive Beispiel sind gleichwertig; persönliche Angaben sind weder Voraussetzung noch Beurteilungskriterium.
- Lebensmittel werden beschreibend eingeordnet. Fehlende Angaben bleiben unbekannt; zwei Tagesausschnitte erlauben keine Diagnose oder vollständige Versorgungsbewertung. Organisatorischer Plan, tatsächliche Beobachtung und erfundene mögliche Ausgänge werden unterschieden. Es wurden keine neuen medizinischen Empfehlungen oder Mengenrichtlinien hinzugefügt.
- Geprüft: alle sieben Haushaltskapitel mit 40 Fragen, 60 ausgewählten Antwortpfaden (davon alle 21 im überarbeiteten Ernährungskapitel), Arbeitsblattmaterial ohne versteckte Beispielauswertung, Revisionsentwertung älterer Ergebnisse und bestehende Portionsplaner. Titelindex und Inhaltsinventar neu erzeugt. Der letzte Gesamtlauf liegt weiterhin vor diesen Ergänzungen; keine Browserprüfung oder Veröffentlichung.

## Ergänzung: Sensorischer Vergleich (08.09.2026)

- `eh_2_zubereiten`, Revision 1: vier Abschnitte und sieben Fragen. Der neue Abschnitt untersucht die Schnittform desselben Apfels mit möglichst gleichen übrigen Bedingungen. Zutaten bleiben bekannt, Verkostung ist freiwillig und die Arbeit mit fiktiven Angaben gleichwertig. Wortschatz, vier Einzelnotizen, vier Untersuchungsschritte, Protokoll und fünf- bis siebensätziger Urteilsauftrag sind vollständig enthalten.
- Beschreibung, Vorliebe, Verwendungszweck und allgemeine Qualitätsbehauptung werden getrennt. Einzelurteile belegen weder Gesundheit, Lebensmittelsicherheit noch Eignung für alle Personen. Das Beispiel ist keine dokumentierte praktische Durchführung. Weitere Grundtechniken und differenzierte Zutaten-/Qualitätsvergleiche bleiben offen.
- Haushaltsprüfung bestanden: sieben Kapitel, 43 Fragen, 81 geprüfte Antwortpfade einschließlich aller 21 im überarbeiteten Zubereitungskapitel; neue Protokolle auch im Arbeitsblatt, verborgene Beispielurteile ausgeschlossen, Revisionsentwertung und bestehende Planer geprüft. Inventar und Titelindex neu erzeugt. Kein neuer Gesamtfunktionstest, keine Browserprüfung und keine Veröffentlichung.

## Ergänzung: Angebots- und Leistungsvergleich (08.09.2026)

- `eh_2_einkaufen`, Revision 1: vier Abschnitte, sieben Fragen. Neu: Selbstzubereitung und fertige Abholung von 20 Jausenboxen, ausschließlich fiktive Auftragswerte. Preisbestandteile, enthaltene Leistungen und unbezahlte Eigenarbeit werden erklärt. Die Aufgabe bewertet keine persönlichen Essmengen und verändert keine Rechtsauskünfte.
- Rechenwerte: A 40 € und zwei Personen je 90 Minuten; B 64 € und eine Person 15 Minuten; Lieferung zusätzlich 8 €. Zwei ausdrücklich vorgegebene Fälle führen zu unterschiedlichen begründeten Entscheidungen. Stückpreise, Gesamtbeträge, 180 bzw. 15 Personenminuten und beide Machbarkeitsentscheidungen werden unabhängig aus den Materialdaten geprüft. Preisunterschied ist ohne Kostenaufschlüsselung kein Gewinnnachweis.
- Qualitätsrückfragen und Kontrollbogen trennen Vereinbarung, tatsächliche Leistung und offene Angaben. Keine echte Bestellung oder dokumentierte Durchführung. Haushaltsprüfung bestanden: 46 Fragen, 102 Antwortpfade einschließlich aller 21 im geänderten Einkaufskapitel, Materialien ohne versteckte Vergleichslösung auf dem Arbeitsblatt; bestehende Planer unverändert geprüft. Inventar und Titelindex aktualisiert. Kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung.

## Gemeinsamer Funktionstest nach den Kapitelergänzungen

- Bericht 2026-09-08T18:02:51.617Z: alle 147 lokal vorhandenen test_*.js-Suiten seriell ausgeführt, alle bestanden, Prozess mit Exitcode 0 abgeschlossen. Gesamtdauer rund 237 Sekunden. Der Runner erhält Ausgaben und Einzelergebnisse einschließlich Fehlerfeldern im Bericht; die Zahl wurde gegen alle gespeicherten Einzelergebnisse geprüft.
- Der Lauf ersetzt die älteren Hinweise „nach dem Gesamtlauf ergänzt“ für den jetzt aktuellen Stand. Historische Ergänzungsabschnitte bleiben als Verlauf erhalten. Keine Änderungen am Produkt während dieses Testlaufs.
- Abnahmeumfang unverändert: alle elf Fächer und angebotenen Sprachen, vollständige fachliche Abdeckung, angemessene Interaktionen und Transferaufgaben, echte Browser-/Geräte-/Druckprüfung sowie geprüfte Veröffentlichung. Keine Abnahmecheckbox aus automatisierten Teilnachweisen allein geschlossen.

## Ergänzung: warme Beilage und Garprobe

- `eh_2_zubereiten`, Revision 2: fünf Abschnitte, zehn Fragen. Eigene angeleitete Karottenbeilage mit drei Zutatenmengen, Gerätebedarf, sechs Arbeitsschritten, vierzeiligem Protokoll und drei Verständnisfragen. Dünsten wird von Kochen und Dämpfen getrennt; Flüssigkeit, Schnittgröße und Garzustand bestimmen den Ablauf. Mengenrechnung für acht Rezeptportionen, Übertragung auf gemeinsame Mahlzeit und Aufgabenverteilung ergänzt.
- Fachmethoden: BZfE „Einfach selber kochen“; Hygiene: österreichisches Gesundheitsportal „Verarbeitung von Lebensmitteln“, beide am 08.09.2026 geöffnet. Eigene Mengen und Zeitansätze sind keine dokumentierte Erprobung. Aufsicht/Einweisung, sichere Dampfhandhabung und freiwilliges Verkosten sind in den eigentlichen Arbeitsschritten enthalten. Papierplanung wird nicht als ausgeführte Küchentechnik bewertet.
- Haushaltsprüfung bestanden: 49 Fragen, 111 Antwortwege, darunter alle 30 im Zubereitungskapitel. Geprüft sind neue Abschnittszuordnung, alte Ergebnisrevisionen, Zutatenverdopplung, vollständige Arbeitsblattmaterialien ohne versteckte Vergleichslösung sowie bestehende Planer. Inventar und Titelindex aktualisiert. Diese Ergänzung liegt nach dem letzten vollständigen 147er-Lauf; keine Browser- oder praktische Küchenprüfung und keine Veröffentlichung.

## Ergänzung: Musik-Rückmeldungen und plausible Fehlvorstellungen

- Der fachübergreifende Wortlaut-Audit findet in 197 Kapiteln keine der explizit hinterlegten generischen Rückmeldungen oder identischen Quizduplikate. Dieser enge Befund ersetzt keine Lektüre. Bei der anschließenden Lektüre aller 37 Musikfragen wurden 21 zu offensichtliche falsche Alternativen in elf Fragen ersetzt und individuell erklärt.
- Alle sieben Musikkapitel betroffen: Verwechslungen von Tastenbedienung/Klangerzeugung, Tempo/Rhythmus, Besetzung/Zeichenlegende, Figurenstimme/Autorenschaft und Einzelprobe/Zusammenspiel. Probenberichte trennen Absicht, Beobachtung und Entscheidung. Frage-IDs und korrekte Antworten bleiben erhalten; Inhaltsrevisionen steigen für die veränderte Beurteilung.
- Musiktest prüft jetzt sämtliche 111 Antwortwege der 37 Fragen, alte Inhaltsrevisionen, bestehende Audioereignisse/Klanglabore und sieben Arbeitsblätter. Die Revisionsprüfungen verwenden das tatsächliche Speicherfeld contentRevision. Titelindex und Inhaltsinventar aktualisiert. Kein neuer Gesamtlauf, keine tatsächliche Hör- oder Browserprüfung und keine Veröffentlichung.

## Ergänzung: ausgeführte Datensicherung und DGB-Arbeitsblätter

- Fachlehrplan Digitale Grundbildung vollständig im gespeicherten RIS-Text gelesen (vom Fachbeginn bis CHEMIE). Konkrete Lücke in der 4. Klasse Information: Der bisherige Backup-Auftrag verlangte nur Plan, Beschreibung und Auffinden, während der Lehrplan Ausführen von Sicherung und Wiederherstellung verlangt. Ein vollständiger aktueller Abgleich aller DGB-Aufgaben ist damit noch nicht erreicht; die erste umfangreiche Aufgabenausgabe war gekürzt.
- dgb8_information Revision 1 enthält nun eine siebenschrittige ausführbare Testdatei-Aufgabe: Version 1 erstellen, separat sichern, Arbeitsdatei auf Version 2 ändern, Version 1 in einen leeren Zielordner zurückholen, alle drei Inhalte vergleichen. Originalarbeiten werden nicht gelöscht oder überschrieben. Ein Ordner auf demselben Gerät wird ausdrücklich nur als Übung und nicht als Absicherung gegen Geräteausfall erklärt. Drei-Zeilen-Protokoll, Synchronisationsgrenze und regelmäßige Sicherungsauswertung ergänzt. Sechs absurde falsche Antworten durch passende Verwechslungen samt Erklärung ersetzt.
- Alle 21 DGB-Arbeitsblätter übernehmen jetzt Kapiteltexte und tatsächliche Aufgaben, einschließlich der Word-Werkstatt. Neue Suite test_dgb_worksheets.js: 21 Materialfassungen, Abschnittszahl, Entfernung interaktiver Elemente, Schalter, Wiederherstellungsprotokoll, echter Kapitelrenderer, acht bewertete Antwortwege und veralteter Lernstand. Bestehende Arbeitsblatt-/Werkstatt-/Metadatentests ebenfalls bestanden. Keine praktische Wiederherstellung auf einem Schülergerät behauptet.
- Die fünf vorhandenen Übersetzungen von dgb8_information haben nur zwei Abschnitte und keine explizite aktuelle Revision; die deutsche Quelle hat vier. Mit der neuen Revision sind diese Alttexte ausgeschlossen und verwenden gekennzeichneten deutschen Fallback. Index nun en 47, übrige vier Sprachen je 45. Die vollständige Übersetzungsaktualisierung ist erforderlich und bleibt offen. Keine Veröffentlichung.

## Ergänzung: aktuelle englische Backup-Fassung

- dgb8_information/en ersetzt die veraltete zweigliedrige Fassung durch vier Abschnitte mit sieben äquivalenten Fragen, allen Rückmeldungen, Lernzielen, Zusammenfassung und Aufgaben. contentLanguage=en und sourceRevision=1 entsprechen der deutschen Quelle.
- Vollständige siebenstufige Wiederherstellung mit Work/Backup_V1/Restored, Arbeitsversion 2 um 15:00, gesicherter und wiederhergestellter Version 1 um 14:00; Schutzgrenze desselben Geräts, Synchronisationsverhalten, kein Überschreiben und klare Kennzeichnung der Papieralternative übernommen. Zielgruppenauftrag und Tracking-/Profiling-Erklärungen ebenfalls enthalten.
- Erweiterte DGB-Suite und übersetzte Titelprüfung bestanden: tatsächliche englische Renderer-Auswahl ohne Fallback, sieben passende Frage-IDs samt Bewertungs-/Übungskennzeichen und Punkten, alle acht bewerteten englischen Antwortwege, Protokoll und sieben Schritte. Titelindex en 48, ar/sr/tr/uk je 45. Die übrigen vier Übersetzungen dieses Kapitels bleiben offen. Testsammlung weiterhin 148 Suiten, kein neuer Gesamtlauf und keine Veröffentlichung.

## Ergänzung: türkische Backup-Fassung

- dgb8_information/tr jetzt vollständig in vier Abschnitten mit sieben Fragen und Antworten übersetzt, contentLanguage=tr/sourceRevision=1. Wiederherstellung mit Calisma/Yedek_V1/GeriYuklenen, eigener DenemeNotu, Sürüm 1/2 und beiden Uhrzeiten 14:00/15:00 konsistent. Lernziele, Begriffe, Zielgruppenaufgabe, Protokoll, Sicherheits- und Modellgrenzen vollständig enthalten; Herkunft der deutschsprachigen BSI-Quelle gekennzeichnet.
- DGB-Sprachprüfung auf Englisch und Türkisch erweitert: tatsächliche Auswahl ohne Fallback, identische IDs, practiceOnly-Kennzeichen, richtige Antworten und Punkte; sieben Schritte, drei genaue Dateistände und alle acht bewerteten Antwortwege pro Sprache. DGB-Arbeitsblätter und Metadatenprüfung bestanden. Index en 48, tr 46, ar/sr/uk je 45. Die drei übrigen Übersetzungen dieses Kapitels bleiben offen. Keine Veröffentlichung, kein neuer Gesamtlauf.

## Ergänzung: serbische Backup-Fassung

- dgb8_information/sr vollständig aktualisiert: vier Abschnitte, sieben Fragen, alle Antworten/Rückmeldungen, Lernziele, Zusammenfassung, Begriffe und Zielgruppenauftrag. Kyrillischer Unterrichtstext mit ausdrücklich verwendeten Dateinamen Rad/Kopija_V1/Vraceno und ProbnaBeleska. sourceRevision=1/contentLanguage=sr.
- Sieben praktische Schritte und Protokoll bilden dieselben drei Dateistände ab: Arbeitsversion 2 um 15:00, Sicherung und Wiederherstellung Version 1 um 14:00. Grenzen eines zweiten Ordners auf demselben Gerät, Synchronisation und Papierplanung sind übernommen.
- DGB-Suite prüft jetzt en/tr/sr auf tatsächliche Auswahl, Strukturgleichheit, Bewertungskennzeichen, Schritte, genaue Protokollwerte und alle acht bewerteten Antwortwege je Sprache. DGB-Materialblätter und übersetzte Titelsuche bestanden. Index en 48, tr/sr je 46, ar/uk je 45. Arabisch und Ukrainisch dieses Kapitels bleiben offen. Kein neuer Gesamtlauf, keine Veröffentlichung.

## Prioritätswechsel während der arabischen Übersetzung

- Nutzeranweisung übernommen: Übersetzungen überspringen, Physik/Mathematik/Chemie/Biologie/DGB priorisieren. Der bereits geschriebene, noch nicht geprüfte arabische Backup-Entwurf bleibt gespeichert, ist aber mit sourceRevision=0 nicht als aktuelle Fassung freigegeben. Kein weiterer Übersetzungstest oder Ausbau in diesem Schritt; das Kapitel verwendet dort weiterhin gekennzeichneten deutschen Fallback.
- Physikmatrix und tatsächliche vier Abschnitte von dgb8_produktion gelesen. Der Programmierauftrag bleibt allgemein und weist noch keine konkrete Umsetzung mit verschachtelten Schleifen nach. Folgende Arbeit richtet sich auf fachliche und interaktive Kernanforderungen der fünf priorisierten Fächer.

## Physik: virtuelles Bild am ebenen Spiegel

- linsen_spiegel/sec0, Revision 5: Lichtweg vom beleuchteten Gegenstand über den Spiegel zum Auge, virtueller Bildpunkt als Schnitt gedachter Rückverlängerungen, gleiche senkrechte Abstände, Grenzen des kleinen Spiegels und Beobachterwechsel ergänzt. Fünf Konstruktionsschritte, drei Abstandsreihen, Übertragung auf realen Spiegel und zwei Fragen mit sechs Antwortwegen. Der Papierauftrag ist nicht als durchgeführtes Experiment ausgewiesen.
- Gezielte Linsen-/Augen-/Reflexionsmodellprüfung sowie alle 20 Physik-Arbeitsblätter bestanden. Neue Aufgaben erscheinen im Material, verdeckte Lösung bleibt ausgeschlossen; alte Revision 4 zählt nicht als aktueller Lernstand. Titelindex und Inhaltsinventar aktualisiert. Übersetzungen gemäß Nutzerpriorität nicht bearbeitet. Kein neuer Gesamtlauf oder Browsernachweis.

## Materialblätter für die priorisierten MINT-Fächer

- js/worksheet.js übernimmt nun Kapiteltexte, Tabellen, Arbeitsaufträge, Abschnittslinks und Schreibraum auch für Mathematik (41), Chemie (15) und Biologie (39). Damit haben alle fünf priorisierten Fächer vollständige Abschnittsmaterial-Ausgabe. Interaktive Zonen und Medien erhalten Onlinehinweise, versteckte Lösungen und uninitialisierte Steuerelemente werden ausgeschlossen. Bestehende generierte Mathematikübungen bleiben erhalten.
- Neue test_stem_worksheet_material.js prüft tatsächlich alle 95 Blätter: Abschnittszahl/Zuordnung, nutzbare Papierlinks, Schreibraum, keine Medien-/Steuerelementreste oder Eventhandler, unabhängiges Material und gegebenenfalls Lösungen. Bei Blättern ohne gesonderte Quizfragen wird kein Lösungsschalter versprochen; entsprechender Hinweis korrigiert. Der Test unterscheidet generierte Rechenübungen von Kapitelquizblättern.
- Neue Suite sowie bestehende Arbeitsblatt- und Physikmaterialprüfungen bestanden. Sammlung jetzt 149 Suiten; letzter Gesamtlauf weiterhin 147. Kein Nachweis vollständiger fachlicher Abdeckung oder tatsächlicher Druckdarstellung. Übersetzungen bleiben zurückgestellt, keine Veröffentlichung.

## Mathematik: fehlende Abschlussfragen wieder zugänglich

- Befund im tatsächlichen Fragenpool: math1_8_brueche und math1_9_dezimalzahlen hatten jeweils zwölf Kapitelabschlussfragen, alle als practiceOnly markiert; dadurch kein bewerteter Kapitelpool. Die Abschnittsübungen bleiben Übungen, die zwölf Abschlussfragen je Kapitel sind jetzt bewertbar. Beide Kapitel Revision 2. Eine absurde Bruchalternative durch die Verwechslung gleich großer und ungleich großer Teilflächen ersetzt.
- Zweiter Befund: Generierte Rechenblätter verdrängten vorhandene Kapitelquizfragen. Dynamische Arbeitsblätter behalten jetzt ihre zusätzlichen Rechenaufgaben und ergänzen vorhandene Verständnisfragen mit separat zuschaltbaren Lösungen.
- Neue test_fraction_decimal_assessment.js besteht: beide echten Kapitel mit je zwölf Fragen, alle 72 Antwortwege, präzise Wiederholungs-IDs, veralteter Lernstand und je zwölf Fragen/Lösungen auf dem Blatt. Bestehende Arbeitsblattprüfung und alle 95 MINT-Materialblätter ebenfalls bestanden. Inventar/Titelindex aktualisiert. Testsammlung 150 Suiten; kein neuer Gesamtlauf. Rechenreise/Känguru sind gesonderte Spiel-/Wettbewerbsangebote und bleiben für ihre tatsächlichen Aufgabenformate separat zu prüfen.

## DGB: ausführbare Rasterwerkstatt

- dgb8_produktion/sec3 Revision 1 ergänzt eine eigenständige lokale HTML-Anwendung unter examples/rasterwerkstatt.html mit verschachtelten Schleifen und zusammengesetzter UND-Bedingung. Kapitel verlinkt Ausführung und Download. Original und gezielt geänderte Bedingung werden anhand identischer Fälle vorhergesagt, ausgeführt, verglichen und dokumentiert; Abgabe besteht aus beiden Dateien und Testprotokoll. Keine Konten oder Datenübertragung.
- Lernanwendung mit Zeilen/Spalten 1–6, Grenze 0–12, eindeutig markierten Tabellenfeldern und aktuell ausgeführter Bedingung. Änderungen an Eingaben entfernen das alte Ergebnis. Zwei zusätzliche Verständnisfragen erklären Schleifenanzahl und UND.
- Neue Suite test_raster_programming.js prüft 936 Kombinationen beider tatsächlichen Programmfassungen, ungültige Eingaben, Reset/Ergebnisveraltung, Zellbeschriftungen, Downloadpfad und sechs neue Antwortwege. DGB-Arbeitsblätter und Metadatenprüfung bestanden. Sammlung jetzt 151 Suiten; kein neuer Gesamtlauf und keine visuelle Prüfung. Veraltete Übersetzungen dieses Kapitels verwenden gekennzeichneten Fallback; Nutzerpriorität gegen Übersetzungsarbeit bleibt bestehen.

## Gemeinsame Prüfung nach der Priorisierung

- 2026-09-08T18:42:49.163Z: 151/151 Suiten, Exitcode 0, rund 247 Sekunden. Alle gespeicherten Einzelergebnisse auf Erfolg geprüft. Während des Laufs keine Produktänderung vorgenommen.
- Neue Rasterwerkstatt, vollständige MINT-Materialblätter und bewertete Bruch-/Dezimalzahlfragen sind nun durch denselben Gesamtlauf abgedeckt. Historische Hinweise auf frühere 147er-Läufe bleiben als Verlauf erkennbar. Übersetzungen weiterhin zurückgestellt; vorhandene Fassungen werden lediglich regressionsgeprüft.
- Gesamtabnahme weiter offen: fachliche Abdeckung insbesondere der fünf priorisierten Fächer, tatsächliche Browser-/Geräte-/Druckprüfung und geprüfte Veröffentlichung. Keine Fertigstellungsbehauptung aus grünen Funktionstests.

## Chemie: Energiezufuhr und Schmelzplateau

- chemie_teilchenmodell Revision 2 enthält jetzt eine ausdrücklich erfundene ideale Erwärmungsreihe eines Modellstoffs bei festem Druck. Gleichmäßige Energiezufuhr, geschlossene Probe und vernachlässigte Verluste sind Vorgaben; es wird keine reale Wasserheizkurve behauptet. Fünf Datenpunkte, fünf Auswertungsschritte, Diagrammauftrag, konstante Teilchenzahl/-größe und Übertragung auf Erstarren ergänzen die vorhandene qualitative Erklärung.
- Zwei neue Fragen mit sechs Antwortwegen: gleichbleibende Temperatur trotz Energiezufuhr und Teilchenbild der geschmolzenen Probe. Keine Berechnung von Joule aus den Temperaturwerten ohne zusätzliche Angaben. Kapitel jetzt neun bewertete Fragen.
- Teilchenmodellprüfung und alle 95 MINT-Materialblätter bestanden; neue Tabelle und Auftrag im Arbeitsblatt, versteckte Vergleichslösung ausgeschlossen. Inventar und Titelindex aktualisiert. Letzter 151er-Gesamtlauf liegt vor dieser Ergänzung; keine Übersetzungsarbeit, Browserprüfung oder Veröffentlichung.

## Biologie: Beobachtung und Schlussfolgerung im Pflanzenvergleich (08.09.2026)

Übersetzungen bleiben entsprechend Nutzeranweisung pausiert; Physik, Mathematik, Chemie, Biologie und DGB haben Vorrang. bio_2_pflanzenorgane_fotosynthese ist nun Revision 2: sechs ausdrücklich fiktive Pflanzenbeobachtungen mit gleicher Anfangshöhe, zwei Lichtgruppen, Endhöhe und Blattfarbe. Fünf Auswertungsaufträge trennen Höhenzuwachs, Beobachtung, Erklärung und Grenzen einer Verallgemeinerung. Eine Vergleichsauswertung und eine zusätzliche Verständnisfrage ergänzen das Material; keine Behauptung eines tatsächlich durchgeführten Versuchs.

Gezielte Prüfungen bestanden: elf bewertete Kapitelaufgaben, alle drei Antwortwege der neuen Frage, alte Lernstandsrevision, bestehende drei Sauerstoffbilanzzustände; alle 95 MINT-Arbeitsblätter einschließlich sechs Datenzeilen und fünf Pflanzenaufträgen ohne versteckte Vergleichslösung; Titelindex und Sprach-Fallback. Inventar aktualisiert. Keine Übersetzungsänderung, kein neuer Gesamtlauf, keine Browserprüfung oder Veröffentlichung.

## Mathematik: angekündigte Ungleichungen tatsächlich ergänzt (08.09.2026)

Vorheriger Zielturn war Fortschritt. Mathematiknavigation und sämtliche Vorwissensverknüpfungen gelesen; fünf Algebra-/Statistikkapitel näher geprüft. Konkrete Lücke: math1_7_gleichungen kündigte in der Navigation Ungleichungen an, enthielt jedoch ausschließlich Gleichungen. Kapitel nun Revision 1, Titel und Untertitel passend, dritter Abschnitt mit <, >, ≤, ≥, zugelassenem Zahlenbereich und Probe an Grenzwerten. Native Interaktion vergleicht x + 3 mit 8 für 0 bis 10 und zeigt auf Wunsch alle Lösungen. Drei Papieraufträge und drei neue Verständnisfragen zu Grenze, Lösungsmenge und höchstens; drei absurde alte Distraktoren durch tatsächliche Fehlvorstellungen ersetzt. Alle falschen Antworten geben null Punkte.

Gezielte Tests bestanden: 55 Kombinationen aus Zeichen und Zahl einschließlich Grenzwerten, vollständige Lösungsmengen, alle 21 Antwortwege der neun Kapitelquizfragen, alte Inhaltsrevision, wiederholte Initialisierung und Fokus; alle 95 MINT-Arbeitsblätter einschließlich neuer Aufgaben ohne versteckte Vergleichslösung; Titelindex/Fallback. Inventar aktualisiert. Übersetzungen bleiben pausiert. Kein neuer Gesamtlauf, keine Browserprüfung und keine Veröffentlichung. Themenfolge ohne nachgewiesenen Bedarf nicht umsortiert; abschließender Mathematiklehrplanabgleich weiterhin offen.

## Mathematik: Rückmeldungen der Gleichungsübungen (08.09.2026)

Vorheriger Zielturn war Fortschritt. Die beiden bestehenden Eingabeübungen in math1_7_gleichungen unterscheiden jetzt fehlende Eingaben von falschen Antworten. Die Gleichungsprobe zeigt den eingesetzten Wert und den Vergleich mit der rechten Seite. Die Umkehroperation akzeptiert auch das typografische Minuszeichen. Eingabeänderungen entfernen alte Rückmeldungen; zugängliche Eingabenamen ergänzt. Kapitelquiz und Inhaltsrevision unverändert. Gezielter Test umfasst zusätzlich zehn Eingabe-/Enter-Pfade, leere Felder, Null, beide Ungleichheitsrichtungen, richtige Antworten, typografisches Minus und Entfernung veralteter Rückmeldungen. Bestehende 55 Zahlenvergleiche und 21 Quizantwortwege weiterhin bestanden. Keine Browserprüfung oder Veröffentlichung.

## DGB: aussagekräftigere Begriffsfragen (08.09.2026)

Vorheriger Zielturn war Fortschritt. Suchprüfung über die fünf priorisierten Fächer liefert Kandidaten für unplausible Distraktoren, keine vollständige Qualitätsabnahme. Drei DGB-Fälle korrigiert: dgb5_produktion Revision 1 prüft Zielbeschreibung versus Algorithmus; dgb6_information Revision 1 unterscheidet Filtern und Sortieren; dgb8_produktion Revision 2 trennt Bedingung und Anweisung. Definitionen in beiden Begriffskästen, Beispiel und Rückmeldung präzisiert: Die Bedingung wird wahr/falsch ausgewertet; die Wenn-dann-Anweisung verwendet das Ergebnis. Vorhandene Übungs-/Prüfungszuordnung und Frage-IDs bleiben erhalten.

Gezielte Prüfungen: alle 21 DGB-Arbeitsblätter, bestehende Wiederherstellungsprüfung, 936 Rasterkonfigurationen und sechs Rasterantwortwege sowie Titelindex/Fallback bestanden. Dies ist Integrationsnachweis, kein neuer Gesamtlauf und keine vollständige Antwortpfadprüfung aller DGB-Fragen. Inventar aktualisiert; Übersetzungen pausiert, keine Browserprüfung oder Veröffentlichung.

## Gemeinsamer Funktionstest nach den Prioritätsänderungen (08.09.2026)

Vorheriger Zielturn war Fortschritt. Alle 152 lokalen test_*.js-Suiten wurden in einem frischen gemeinsamen Lauf ausgeführt; 152 bestanden, Exit 0, 250 Sekunden, Berichtzeit 2026-09-08T19:02:56.292Z. Keine Fehlerkorrektur im laufenden Test nötig. Zusätzlich aktuelle Kapitelstruktur geprüft: Alle 136 Kapitel der fünf priorisierten Fächer enthalten Lernziele und Zusammenfassungen. Fehlende separate Quellenfelder sind lediglich Prüfkandidaten, kein Beweis fehlender Quellen im Abschnittstext. Lehrplanabgleich, fachliche Gesamtprüfung, Browser-/Geräte-/Druckprüfung und Veröffentlichung bleiben offen. Übersetzungen weiterhin pausiert.

## Physik: Energie und Kraft sowie Kreisbewegung unterscheiden (08.09.2026)

Vorheriger Zielturn war verifizierter Fortschritt durch den gemeinsamen Testlauf. Aktuelle Kapiteltexte und Antwortalternativen erneut gelesen. energie Revision 4 ersetzt die Gas-Ablenkantwort durch die Verwechslung von Energie/Kraft und Joule/Newton; korrekte Antwort beschreibt Speicherung, Übertragung und Umwandlung. drehundstatik Revision 3 fragt ausdrücklich aus Sicht des ruhenden Bodens nach der resultierenden horizontalen Kraft im gleichmäßig fahrenden Kettenkarussell. Antwort und Zusatztext trennen Kraft zur Mitte, tangentiale Bewegungsrichtung ohne diese Kraft und subjektives Gefühl des Nach-außen-Drückens. Falsche Antworten dieser beiden Fragen geben null Punkte.

Gezielte Energie-, Physik-Kapitelintegrations-, 20 Physik-Arbeitsblatt- und Titelindexprüfungen bestanden. Inventar aktualisiert. Änderungen liegen nach dem vollständigen 152er-Lauf; kein neuer Gesamtlauf, keine Browserprüfung, keine Veröffentlichung. Übersetzungen weiterhin pausiert.

## DGB: vollständiger Aufgabenabgleich der fünf Kernkapitel in Klasse 1 (08.09.2026)

Vorheriger Zielturn war Fortschritt. Alle Abschnitte der fünf dgb5-Kernkapitel gelesen und mit sämtlichen Kompetenzbereichen und Anwendungsbereichen der gespeicherten RIS-Fassung verglichen. DGB_LEHRPLANABGLEICH.md dokumentiert 21 Zuordnungen mit konkreten Aufgabenbelegen und Grenzen. Größte offene Lerngelegenheiten: Suchmaschinenprinzip/personalisierte Suche, einfache Schleifen, tatsächliche digitale Zusammenarbeit, historischer Medienvergleich und Komponenten als System. Die Befunde bestimmen die nächste Ausbaufolge; keine Abschlussbehauptung. Erneuter RIS-Abruf scheiterte, daher keine rechtliche Aktualitätsfreigabe. Keine Produktänderung in diesem Turn; neue Abgleichevidenz statt erneuter Funktionstests.

## DGB: Suchprinzip und personalisierte Treffer (08.09.2026)

Vorheriger Zielturn war Fortschritt durch den Aufgabenabgleich. dgb5_information Revision 1 enthält jetzt fünf Abschnitte, sieben bewertete Fragen und weiterhin drei reine Übungsfragen. Neuer Abschnitt nach dem Einstieg erklärt Suchindex und Trefferwahl anhand geöffneter Google-Primärquellen; zwei ausdrücklich erfundene Listen dienen fünf Vergleichs-/Rechercheaufträgen. Personalisierung wird von Zeitpunkt, Sprache und Ort unterschieden. Alle neun neuen Antwortwege, Rückverweis zum richtigen Abschnitt, alte Inhaltsrevision, neues Arbeitsblattmaterial ohne Vergleichslösung, alle 21 DGB-Arbeitsblätter und Titelindex bestanden. Aktuell 153 Suiten; letzter gemeinsamer Lauf weiterhin 152. Matrix und Inventar aktualisiert; keine Übersetzung, Browserprüfung oder Veröffentlichung.

## DGB: vollständige Dateiübung (08.09.2026)

Vorheriger Turn war Fortschritt. Aktuellen Ordnerauftrag erneut gelesen und in dgb5_information Revision 2 um Speichern, erneutes Öffnen, Inhaltsänderung und kontrollierten Vergleich einer unabhängigen Kopie ergänzt. Sieben Schritte, konkreter erfundener Notiztext, zwei Protokollzeilen und Vergleichslösung; ausschließlich die selbst erstellte Übungskopie wird gelöscht. Unterschied Datei/Verknüpfung und Grenzen einer Kopie auf demselben Gerät erklärt. Lernziel und Inventar aktualisiert. Suchkapiteltest einschließlich neuer Materialien, alle 21 DGB-Arbeitsblätter und diff --check bestanden; kein neuer Gesamtlauf, keine tatsächliche Betriebssystem-/Browserprüfung, keine Veröffentlichung. Übersetzungen pausiert.

## DGB: Schleifen für die 1. Klasse (08.09.2026)

Vorheriger Zielturn war Fortschritt. dgb5_produktion hatte vier Abschnitte ohne eigenen Laufzeitcode; jetzt Revision 2 mit fünf Abschnitten und fünf bewerteten Fragen. Neuer Abschnitt zwischen Einstieg und Fachwörtern, bestehende IDs erhalten. Eigenes Skript mit Schrittknopf, Durchlaufwahl 0–6, Rücksetzung und textlicher Statusmeldung; Punktdarstellung nur ergänzend. Vier Papieraufträge und eine Frage prüfen die Grenze des Schleifenblocks. Alle Zwischen-/Endzustände für sieben Durchlaufzahlen, Zurücksetzen, Eingabewechsel, wiederholte Initialisierung und drei neue Antwortwege bestanden; alle 21 DGB-Arbeitsblätter bestanden. 154 Suiten vorhanden, letzter gemeinsamer Lauf weiterhin 152. Keine Browserprüfung oder Veröffentlichung, Übersetzungen pausiert.

## DGB: Umfrage mit vollständigem Material (08.09.2026)

Vorheriger Zielturn war Fortschritt. Aktuellen Umfrageauftrag gelesen und in dgb5_produktion Revision 3 um acht erfundene Rohdaten ergänzt: Lesen 3, Radfahren 4, Ballspiel 1. Sechs Aufträge führen zu digitaler Tabelle, Formel, Diagramm, Auswertung, Darstellungsvergleich und Fehlerprüfung. Eigene Umfrage ist Alternative, ihre Frage und Antwortkategorien werden geplant. Gezielter Schleifentest ergänzt um unabhängige Rohdatenzählung; bestehende DGB-Arbeitsblattprüfung erneut ausgeführt. Keine tatsächliche Tabellenanwendungs- oder Browserprüfung, kein neuer Gesamtlauf, keine Veröffentlichung.

## DGB: tatsächliche Zusammenarbeit an einem Dokument anleiten (08.09.2026)

Vorheriger Zielturn war Fortschritt. Bisherige Regelwerkstatt erneut gelesen; dgb5_kommunikation Revision 1 ergänzt einen fiktiven Fehlerentwurf, sechs Arbeitsschritte, Rollenwechsel, wechselseitige Kommentare mit begründeter Überarbeitung, Formatierung, Freigabeprüfung und gemeinsamen Endstand nach erneutem Öffnen. Vier Protokollzeilen machen Zugriff und Beiträge nachvollziehbar. Einzelarbeit ist ausdrücklich Vorbereitung, keine behauptete Kollaboration. Bestehende Schulwerkzeuge verwenden; keine neue Kontoerstellung nötig. Alle 21 DGB-Arbeitsblätter bestanden, Inventar/Index aktualisiert. Keine tatsächliche Plattform-/Browserprüfung, keine Veröffentlichung, Übersetzungen pausiert.

## Arbeitsblätter: Zeichenreferenzen lesbar darstellen (08.09.2026)

Vorheriger Zielturn war Fortschritt. In js/worksheet.js wurden Klartextfelder unverändert als textContent ausgegeben, sodass etwa Fachw&ouml;rter sichtbar blieb. Neue Hilfsfunktion decodiert ausschließlich vollständige Zeichenreferenzen und schreibt das Ergebnis weiterhin als Text. Überschriften, Fragen, Antworten, Rückmeldungen, Werkstatttexte und Lernziele profitieren; Vergleichszeichen bleiben erhalten. Arbeitsblatttest ergänzt um benannte/numerische Referenzen und einen als Text erhaltenen HTML-Beispielstring. Der erste Testaufruf scheiterte an der fehlenden Test-Exportbindung; Testisolierung/Export korrigiert und erneut bestanden. Allgemeine Arbeitsblattprüfung, 21 DGB- und 95 MINT-Arbeitsblätter bestanden; DGB prüft jetzt tatsächlich lesbare Fachwörter-Überschriften. Keine Browser-/Drucklayoutprüfung, keine Veröffentlichung.

Die neue DGB-Überschriftenprüfung war zunächst zu breit für die anders strukturierte Word-Werkstatt. Sie verlangt die Fachwörter-Überschrift nun nur dort, wo die Quelldaten sie enthalten; danach alle 21 bestanden.

## DGB: Komponenten als System und praktische Hilfenutzung (08.09.2026)

Vorheriger Zielturn war Fortschritt. Aktuelle Grundlagen und Problemkarte in dgb5_handeln gelesen. Revision 1 ergänzt fünf Komponenten mit Rollen beim Schreiben/Speichern sowie drei Systemaufträge. RAM, dauerhafter Speicher, Bildschirm und Software werden getrennt; sichtbarer Text ist kein Speichernachweis. Vier weitere Schritte führen zur passenden Anwendungshilfe, tatsächlichem Speichern einer Übungsdatei unter neuem Namen und Ergebnisprüfung. Papierbearbeitung zählt ausdrücklich nur als Vorbereitung. Alle 21 DGB-Arbeitsblätter bestanden; Inventar/Index aktualisiert. Keine tatsächliche Betriebssystem-/Browserprüfung, keine Veröffentlichung.

## DGB: Medienwandel am gleichen Kommunikationsanliegen (08.09.2026)

Vorheriger Zielturn war Fortschritt. dgb5_orientierung Revision 1 ergänzt drei ausdrücklich erfundene Fälle zur Terminvereinbarung per Brief, gemeinsamem Festnetztelefon und Gruppenchat. Vier Aufträge vergleichen Übermittlung, Speicherung, Erreichbarkeit und Zugang; eine Quellenaufgabe führt zu einem konkreten historischen Beispiel. Museumsquelle medien.welten über Primärquellensuche geprüft und verlinkt. Papierbuch-Beispiel korrigiert: Zeichen auf Papier speichern Informationen, auch ohne elektronisches Gerät. Alle 21 DGB-Arbeitsblätter bestanden; Inventar und Index aktualisiert. Keine Abnahme der gesamten Mediengeschichte, keine Browserprüfung oder Veröffentlichung.

## DGB: Transfer im Kapitelquiz (08.09.2026)

Vorheriger Zielturn war Fortschritt. Neue Lerngelegenheiten in Orientierung, Kommunikation und Handeln waren noch nicht im bewerteten Fragenpool vertreten. Je eine Transferfrage ergänzt: Zugang zur gemeinsamen Terminvereinbarung, nachvollziehbare Überarbeitung und Prüfung gespeicherter Dateien. Alle drei Kapitel Revision 2; jeweils fünf bewertete Fragen und drei reine Übungen. Alle neun neuen Antwortwege, Abschnittszuordnung, frühere Lernstandsrevision und 21 Arbeitsblätter bestanden. 155 Suiten vorhanden; kein neuer gemeinsamer Lauf. Inventar/Index aktualisiert, Übersetzungen pausiert, keine Browserprüfung oder Veröffentlichung.

## Fachübergreifende Strukturprüfung der Quizdaten (08.09.2026)

Vorheriger Zielturn war Fortschritt. Neue reproduzierbare Prüfung audit_priority_quizzes.js liest die aktuelle Fachliste und deutsche strukturierte Fragen. PRIORITY_QUIZ_AUDIT.json dokumentiert 1467 Frageninstanzen in 136 Kapiteln: Physik 433, Mathematik 380, Chemie 119, Biologie 381, DGB 154. Keine fehlenden/mehrfachen Richtig-Markierungen, leeren Antworttexte, wortgleichen Optionen oder fehlenden Rückmeldungen gefunden; mindestens zwei Optionen pro Frage. Dies prüft ausschließlich die gespeicherte Struktur, einschließlich Übungsfragen. Fachlich gleichbedeutende Optionen, generierte Aufgaben, tatsächliche Richtigkeit und Lehrplanabdeckung bleiben davon unbewiesen. Deshalb keine Inhalte ohne Befund verändert; die weitere Fachprüfung kann sich auf Bedeutung und Anwendung konzentrieren.

## Mathematik: ganze Zahlen sinnvoll darstellen (08.09.2026)

Vorheriger Zielturn war Fortschritt. math2_4_relative_zahlen enthielt eine unbelegte negative V-Bucks-Kaufbehauptung und einen parseInt-Fahrstuhl mit stiller Dezimalabschneidung. Revision 1 ersetzt dies durch Begriffs-/Ordnungsaufträge und ein begrenztes Bewegungsmodell für Start −10 bis 10, nicht negative ganze Schrittzahlen 0 bis 10 und Addition/Subtraktion. Alle besuchten Zahlen werden in zeitlicher Reihenfolge angezeigt; Papieraufträge verlangen räumliche Zahlenstrahlen. Leere, gebrochene und außerhalb liegende Eingaben werden zurückgewiesen. Zwölf individuelle Rückmeldungen ersetzen generisches Wiederholen der richtigen Antwort; falsche Antworten null Punkte. Vier Fragen und IDs erhalten. 462 gültige Wege, acht ungültige Fälle, Enter/Eingabeänderung, alle zwölf Antwortwege und Klassen-2-Kapitelintegration bestanden. 156 Testsuiten vorhanden; letzter Gesamtlauf weiterhin 152. Keine Browserprüfung oder Veröffentlichung.

## Mathematik: Rundungsstelle und Stellenwert (08.09.2026)

Vorheriger Zielturn war Fortschritt. Aktuelles Dezimalzahlenkapitel vollständig gelesen. math2_3_dezimalzahlen Revision 1 korrigiert die sachlich falsche Rückmeldung zu 46/4,6 von hundertfach auf zehnfach. Rundungsregel präzisiert: gewünschte Stelle, erste folgende Ziffer, Übertrag und Näherungszeichen; Beispiele 4,49 direkt auf ganze Zahlen und 9,96 auf Zehntel vermeiden letzte-Ziffer- und Doppelrundungsfehler. Drei Papieraufträge ergänzt. Multiplikation/Division mit Zehnerpotenzen über Stellenwerte erklärt und Größenvergleich auf positive Zahlen begrenzt, null bleibt null. Falsche Antworten null Punkte. Klassen-2-Kapitelintegration und 95 MINT-Arbeitsblätter bestanden; Inventar/Index aktualisiert. Keine Browserprüfung oder Veröffentlichung.

## Mathematik: zuverlässige Dezimaleingaben (08.09.2026)

Vorheriger Zielturn war Fortschritt. Die drei Übungsfelder in math2_3_dezimalzahlen waren number-Felder trotz Parser für Kommas. Laufzeit setzt jetzt text mit decimal-Eingabemodus und zugänglichem Namen. Parser akzeptiert Dezimalkomma oder Punkt, verwirft leere/malformed Werte und nicht geforderte Hex-/Exponentialschreibweisen. Eigene Eingabehinweise statt mathematischem Fehlerfeedback; Eingabeänderung leert alte Rückmeldung. Exakte erwartete Werte statt unnötiger Toleranz. Tatsächliche Felder mit Komma/Punkt, Enter, Fokus, acht Schreibweisenfamilien, falschem Nahwert und mehrfacher Initialisierung geprüft; Klassen-2-Integration bestanden. 157 Testsuiten vorhanden, kein neuer Gesamtlauf und keine Browserprüfung.

## Gemeinsamer Lauf aller aktuellen Tests

Vorheriger Zielturn war Fortschritt. Der vollständige Lauf endete am 2026-09-08T19:33:11.903Z mit Exit 0 und 157/157 bestandenen Suiten (257 Sekunden). Während des Laufs keine Produktänderungen. Bericht direkt ausgewertet und aktueller Stand oben aktualisiert. Keine Browser-/Geräteprüfung oder Veröffentlichung; Übersetzungen bleiben pausiert.

## Chemie: systematischen Abgleich begonnen

Vorheriger Zielturn war Fortschritt durch vollständigen Testlauf. Gespeicherten Chemielehrplan vollständig gelesen; Fachzuordnung aller 15 Kapitel erfasst. Drei Kapitel vollständig textlich geprüft: Reaktionen/Energie, Trennverfahren, Sauerstoff/Verbrennung. CHEMIE_LEHRPLANABGLEICH.md trennt vollständige Textbelege von bloßen Kapitel-/Ausschnittzuordnungen. Konkrete nächste Prüfungen: weitere Reaktionstypen/Umwelt vollständig lesen, spezifische Nachweise/Synthesen/Analysen lokalisieren sowie drei Darstellungsebenen in einer Aufgabe verbinden. Keine neue Sicherheits- oder rechtliche Abnahme und keine Produktänderung in diesem Turn; der Abgleich liefert die nächste begründete Ausbaufolge.

## Chemie: Stoffumwandlung in drei Darstellungen

Vorheriger Turn war Fortschritt durch Abgleichevidenz. Reaktionskapitel und Baukasten erneut gelesen. Revision 2 ergänzt sechs zusammenhängende Aufgaben zur Wasserbildung; vier Tabellenzeilen trennen Stoffbeschreibung, Wortgleichung, Formelgleichung und Teilchenbild. Atomsorten bleiben erhalten, Molekülzahl muss nicht erhalten bleiben; Koeffizienten versus Stoffformeln anhand H₂O/H₂O₂ erklärt. Gezielter Reaktionstest erweitert um Wasserbildung in kleinster und verdoppelter Bilanz sowie Aufgabenmaterial. Keine praktische Synthese, Browserprüfung oder Veröffentlichung.

## Chemie: Reaktionstypen und Untersuchungsprotokoll

Vorheriger Zielturn war Fortschritt. Vier weitere Chemiekapitel vollständig textlich geprüft; tatsächliche Nachweise und Grenzen im Chemieabgleich nachgetragen. Rostvergleich Revision 2 erhält ein konkretes Protokoll für A–D und vier Aufträge zu Vorhersage, Beobachtung, Vergleich und Deutungsgrenze. Bestehende Redoxprüfung und alle 95 MINT-Arbeitsblätter bestanden. Inventar/Index aktualisiert. Keine praktische Versuchserprobung, Browserprüfung oder Veröffentlichung.

## Quellenbewertung in Umweltchemie ergänzt (08.09.2026)

chemie_umwelt_chemie Revision 2 enthält einen sechsten Abschnitt: zwei ausdrücklich erfundene Texte mit denselben Modellzahlen, sieben Vergleichs-/Recherche-/Schreibaufträge, ein dreizeiliges Belegprotokoll und eine aufklappbare Vergleichsauswertung. Die Lernenden unterscheiden Absicht, Datenherkunft und Reichweite einer Schlussfolgerung; gleiche Ausgangszahlen gelten nicht als unabhängige Messungen. Eine vorhandene Primärquelle soll mit Fundstelle und Datumsangaben einbezogen werden, ohne daraus Daten für die fiktive Box zu erfinden. Die bisherige Etikettenrecherche heißt nun Rechercheauftrag statt Experiment.

Zehn bewertete Fragen; die neue Frage wurde über alle drei Antwortpfade mit passender Rückmeldung, Abschnittszuordnung und 100/90-Prozent-Ergebnis geprüft. Ergebnisse aus Revision 1 werden als veraltet behandelt. Bestehende Modell- und Lebenswegprüfungen bestanden. Alle 95 Mathematik-/Chemie-/Biologie-Arbeitsblattprüfungen bestanden, einschließlich der neuen Tabelle und Aufträge ohne eingeblendete Musterlösung. Quiz-Strukturprüfung: 1468 Frageninstanzen, keine strukturellen Befunde. Keine neue Übersetzung, kein Browser-/Drucklayoutnachweis und keine Veröffentlichung. Der vollständige Lauf mit 157 Suiten liegt zeitlich vor dieser Änderung; hier wurden die betroffenen Prüfungen ausgeführt.

## Stoffliste beim Kapitelwechsel erhalten (08.09.2026)

Ein nachgewiesener Navigationsfehler ist behoben: Im Lern- und Unterrichtsmodus wurde beim Öffnen eines Kapitels die ausgewählte Stoffliste bisher nur über lokalen Speicher erhalten. Bei gesperrtem Speicher ging sie beim Rückweg verloren. learning.js gibt die Liste jetzt in allen drei Modi im Kapitel-Link mit; core-learning.js erhält sie bei Vorwissenslinks, Weiterblättern und Rückkehr. Auch der Unterrichtsmodus und explizit leere Listen bleiben erhalten. Die Fachreihenfolge beim Neulernen wird dadurch nicht in eine Prüfungsreihenfolge umgewandelt.

Neue Suite test_plan_navigation_context.js prüft den Weg vom echten Lernbereich über den echten Kapitelrenderer zurück zur wieder geöffneten Stoffliste in allen drei Modi, einschließlich unbekannter Kapitel und gesperrtem Speicher im Lernbereich. Keine Browserprüfung. Der vollständige Funktionslauf bestand anschließend mit 158/158 Suiten; Berichtzeitpunkt und Umfang stehen oben.

## Rabattrechnung mit verändertem Grundwert (08.09.2026)

math2_6_prop_prozent Revision 2: Der Rabattrechner erlaubt neben dem Prozentsatz einen eigenen Ausgangspreis. Die bisher fest verwendeten 100 € konnten die Verwechslung von Prozent und Euro verdecken. Die Ausgabe nennt Grundwert, Prozentsatz, Rechenweg, auf Cent gerundeten Rabattbetrag und den daraus berechneten neuen Preis. Drei Papieraufträge vergleichen verschiedene Grundwerte, bestimmen den Grundwert rückwärts und untersuchen 0/100 %. Aufklappbare Vergleichslösung vorhanden. Zwei falsche Quizantworten vergeben jetzt ebenfalls null Punkte; Frage-IDs bleiben erhalten.

Dezimalzahlen werden mit Komma oder Punkt und höchstens zwei Nachkommastellen angenommen. Cent und Hundertstelprozent werden intern ganzzahlig gerechnet; erst der Rabattbetrag wird kaufmännisch auf Cent gerundet und abgezogen. Leere, negative, zu große, exponentielle, hexadezimale und übergenaue Eingaben erhalten Hinweise. Bearbeiten entfernt alte Ergebnisse; Enter funktioniert in beiden Feldern. Wiederholtes Initialisieren vervielfacht die Eingabehandler nicht.

Betroffene Mathematiksuite bestanden: sieben Preis-/Rabattvergleiche einschließlich 5 Cent bei 50 %, Höchstwert, Null, Dezimalkomma und umgekehrtem Grundwert; zusätzliche ungültige Eingaben und Enter-/Änderungspfade. Alle 95 Arbeitsblattprüfungen bestanden; Quiz-Strukturprüfung 1468 Instanzen ohne Befund. Der oben genannte vollständige 158-Suiten-Lauf liegt vor dieser Änderung. Keine neue Übersetzung, Browserprüfung oder Veröffentlichung.

## Kapitel gezielt zurücksetzen, ohne andere Ergebnisse zu löschen (08.09.2026)

Die Punkteprüfung zeigte: Die aktuelle Kapitelbewertung zählt korrekte Antworten und verwendet die alten pts-Felder der Antwortoptionen nicht. Die in zahlreichen alten Daten vorhandenen positiven pts bei falschen Optionen sind daher kein belegter aktueller Bewertungsfehler; keine pauschale Inhaltsrevision vorgenommen.

Dabei wurde ein tatsächlicher Fehler im über die Vorlage erreichbaren resetTopicProgress gefunden: Der bisherige Fehlerpfad konnte den gesamten Schlüssel sciverse_chapter_quiz_results entfernen. Der Reset liest und validiert nun alle betroffenen Speicherwerte vor der ersten Änderung. Nur das aktuelle Kapitel wird aus den Ergebnissen entfernt; seine Spielpunkte und alten Antwortmarkierungen werden entsprechend angepasst. Scheitert eine Schreiboperation, werden bereits geänderte Schlüssel aus den Originalwerten wiederhergestellt. Scheitert auch diese Wiederherstellung, wird das ausdrücklich angezeigt; keine atomare Speichertransaktion behauptet. Bei unlesbaren Daten oder gesperrtem Zugriff wird ohne Änderung abgebrochen.

Neue Suite test_topic_reset_storage.js (nun 159 vorhandene Suiten) prüft normalen Kapitelreset mit erhaltenem Fremdkapitel, Abbruch, gesperrten Zugriff, beschädigte/falsch strukturierte Daten, fünf einzelne Schreibfehler mit Wiederherstellung und fehlgeschlagene Wiederherstellung. Dazu bestehen test_chapter_storage_denied.js und test_quiz_storage_failures.js. Der letzte vollständige Lauf umfasst weiterhin 158 Suiten und liegt vor dieser Änderung; kein erneuter Gesamtlauf behauptet. Keine Übersetzung ergänzt und keine Veröffentlichung.

## Zuordnungen: Tabellen, Vorschriften und Graphen (08.09.2026)

math3_6_zuordnungen Revision 1 ersetzt verkürzte Je-mehr-Überschriften durch die entscheidenden Bedingungen. Die drei alten Quizfragen haben explizite Voraussetzungen, jeweils drei plausible Antwortoptionen und individuelle Rechenhinweise. Ein dritter Abschnitt vergleicht y = 3x, y = 12 : x und y = 5 + 3x mit fünf Tabellenzeilen, fünf Berechnungs-/Zeichen-/Erkläraufträgen und Vergleichsauswertung. Einheiten, diskrete Sachwerte und mathematische Fortsetzung sind getrennt; x = 0 wird bei Division ausgeschlossen. Zwei zusätzliche Fragen prüfen Ursprungsgerade und Definitionslücke.

Die Kino-Übung hat ein beschriftetes Dezimalfeld, Formatprüfung, erklärende Rückmeldung, Enter-Bedienung und löscht beim Bearbeiten alte Ergebnisse. Neue Suite test_assignment_representations.js prüft alle 15 Antwortpfade, Tabelleninvarianten, Revisionsbehandlung und Eingabeabläufe. Nun 160 vorhandene Suiten; der letzte Gesamtlauf bleibt ausdrücklich bei 158 vor den jüngsten Änderungen. Alle 95 Arbeitsblattprüfungen bestanden; Strukturprüfung 1470 Frageninstanzen ohne Befund. Durch die Inhaltsrevision sind bisherige Kapitelübersetzungen veraltet; gekennzeichneter deutscher Fallback, keine neuen Übersetzungen.

## Verhältnisse als Teile und Gesamtmenge (08.09.2026)

math3_5_verhaeltnisse Revision 1 ist nun in drei Abschnitten ausgearbeitet: Verhältnisreihenfolge, gleichzeitiges Skalieren, Verhältnis versus Anteil am Ganzen, Aufteilen und doppelte Kontrolle. Fünf Papieraufträge, eine vierzeilige Tabelle und Vergleichsauswertung ergänzen den bestehenden Mischungscheck. Die drei alten Quizfragen haben jeweils drei plausible Optionen mit Rechenbegründungen; zwei neue Fragen prüfen Teil/Ganzes und additives Fehlskalieren.

Die Interaktion unterscheidet korrektes Verhältnis bei falscher Gesamtmenge, korrekte Gesamtmenge bei falschem Verhältnis und zwei gleichzeitig verletzte Bedingungen. Beschriftete Eingaben unterstützen Dezimalkomma/-punkt und Enter, verwerfen ungültige Formate und entfernen veraltete Rückmeldungen.

Neue Suite test_ratio_reasoning.js besteht mit allen 15 Antwortpfaden, unabhängigen Tabellenkontrollen, allen vier Rückmeldungsfällen und Eingabeprüfungen. Nun 161 vorhandene Suiten; vollständiger letzter Lauf weiterhin 158 vor den jüngsten Änderungen. Alle 95 Arbeitsblattprüfungen und die Strukturprüfung von 1472 Frageninstanzen bestanden. Veraltete Übersetzungen verwenden den gekennzeichneten deutschen Fallback. Keine neue Übersetzung oder Veröffentlichung.

## Ähnlichkeit und Maßstab ausarbeiten (08.09.2026)

math3_7_aehnlichkeit Revision 1 korrigiert die widersprüchliche Einstiegsaussage, ähnliche Figuren müssten verschiedene Größen haben. Entsprechende Seiten, Faktor 1 und Drehen sind erklärt. Die Figurenaufgabe zeigt A/B/C, eine Maßtabelle und eine benannte responsive SVG statt einer ausschließlich farbbezogenen Auswahl. Die Rückmeldung vergleicht beide Faktoren; fehlende Auswahl, Wechsel und Enter sind behandelt.

Maßstab wird in beiden Richtungen mit gleichen Einheiten erklärt. Fünf Papieraufträge verlangen einen fiktiven Raumplan einschließlich Türöffnung, Rückrechnung, Vergleich mit anderem Maßstab, Kopiervergrößerung und Drehen. Die drei bisherigen Quizfragen haben jeweils drei plausible Optionen mit eigenen Begründungen; zwei zusätzliche Fragen prüfen Faktor 1 und Rückrechnung.

Neue Suite test_similarity_scale.js besteht: alle 15 Antwortpfade, Revision, Übereinstimmung von SVG-Seiten und Maßtabelle, Beschriftung und Bedienpfade. Nun 162 vorhandene Suiten; letzter vollständiger Lauf weiterhin 158 vor den jüngsten Änderungen. Alle 95 Arbeitsblattprüfungen bestanden; Strukturprüfung 1474 Frageninstanzen ohne Befund. Tatsächliche Darstellung und Papierzeichnung sind dadurch nicht visuell geprüft. Übersetzungen pausiert; keine Veröffentlichung.

## Antwortbezogene Begründungen systematisch ergänzt (08.09.2026)

Eine Suche in allen gespeicherten strukturierten Fragen der fünf priorisierten Fächer fand noch 37 Rückmeldungen der Formen „Richtig. … ist hier korrekt.“ und „Noch nicht. Korrekt ist: …“. Diese wurden in sieben Mathematikkapiteln durch individuelle Begründungen ersetzt: Potenzen/Terme, Statistik, beide Pythagoras-Kapitel, Funktionen, Ähnlichkeit und Körper. Angaben zu Katheten/Hypotenuse und Zylinder präzisiert; Statistikfrage enthält ihre Daten nun auch im Kapitelcheck; zwei absurde Distraktoren wurden durch fachliche Verwechslungen ersetzt. Inhaltlich geänderte Kapitelrevisionen sind angehoben.

Neue Suite test_math_feedback_reasoning.js besteht mit 38 Antwortpfaden der 19 betroffenen Fragen in sieben echten Kapitelrenderings; geprüft sind Punkteprozente, vollständige jeweilige Rückmeldung und Veraltung vorheriger Revisionen. Nun 163 vorhandene Suiten. Der Struktur-Audit erkennt die beiden beanstandeten Schablonen künftig zusätzlich; 1474 gespeicherte Frageninstanzen ohne Struktur-/Schablonenbefund. Das beweist nicht, dass jede anders formulierte Rückmeldung bereits fachlich vollständig geprüft ist. Alle 95 Arbeitsblattprüfungen bestanden. Letzter Gesamtlauf weiterhin 158 vor den jüngsten Änderungen. Übersetzungen pausiert, keine Veröffentlichung.

## Mittelwert und Aussagegrenzen (08.09.2026)

math3_11_statistik Revision 2 ersetzt die Notenübung durch erfundene Buchausleihen. Das Kapitel beginnt mit einer Erhebungsfrage und erklärt die Skala. Ein neuer Vergleich enthält A = 2, 4, 6 und B = 0, 0, 12: gleicher Mittelwert 4, aber Spannweiten 4 und 12. Fünf Papieraufträge verbinden Rechnung, Säulenzeichnung, Spannweite, Beurteilung einer Behauptung und fehlende Beobachtungen. Nullwerte sind von fehlenden Daten getrennt. Zwei zusätzliche Fragen prüfen das Mitzählen von Nullbeobachtungen und Grenzen gleicher Mittelwerte.

Die Eingabeprüfung unterstützt Dezimalkomma/-punkt, Enter, getrennte Hinweise zu Summe und Mittelwert sowie das Entfernen alter Rückmeldung. Neue Suite test_mean_interpretation.js besteht mit unabhängig ausgelesenen Tabellenkennzahlen, sechs neuen Antwortpfaden, Abschnittszuordnung, Revision und Eingabeprüfung. Mathematik-Feedbacktest mit 38 weiteren Pfaden und alle 95 Arbeitsblattprüfungen bestanden; Strukturprüfung 1476 Frageninstanzen ohne Befund. Nun 164 vorhandene Suiten; letzter vollständiger Gesamtlauf weiterhin 158 vor den jüngsten Änderungen. Keine Übersetzungen ergänzt, keine Veröffentlichung.

## Gemeinsame Verifikation des jüngsten Arbeitsstands (08.09.2026)

Der vollständige Lauf ist mit 164/164 Suiten und Exit 0 abgeschlossen. Die zuvor dokumentierten Grenzen einzelner älterer Gesamtläufe sind damit historisch; der aktuelle Beleg steht oben. Zusätzlich wurden die Vorwissensverknüpfungen aller fünf priorisierten Fächer aus der aktuellen Navigation und deutschen Kapiteldaten geprüft: keine fehlenden Kapitelziele, keine Zyklen und keine später eingeordneten Vorwissenskapitel innerhalb desselben Fachs. Sechs freie Textangaben sind unterstützte Vorwissensbeschreibungen, keine defekten Links. Bericht ../priority-prerequisite-audit.json. Diese Prüfung bewertet Verknüpfungen, nicht die vollständige didaktische oder lehrplanbezogene Abdeckung. Gesamtziel bleibt offen.

## Biologie-Einstieg: Frage und Messgröße verbinden (08.09.2026)

bio_1_kompass Revision 2 korrigiert ein unpassendes Beispiel: Eine Hypothese zur Keimung wurde bisher mit späterer Pflanzenhöhe beantwortet. Das Beispiel nennt nun sichtbare Wurzeln und zählt gekeimte Samen. Fachlicher Hintergrund am 08.09.2026 anhand RHS „How to sow seeds indoors“ und SAPS „Student Sheet 5 – Investigating Seed Germination“ geprüft; beide Primärseiten sind im Kapitel verlinkt. Keimung und Wurzel-/Sprosslängen werden dort als unterschiedliche Beobachtungsgrößen behandelt.

Ergänzt: ausdrücklich erfundene kumulierte Keimzahlen in sechs Schalen mit je zehn Samen und drei Terminen, sechs Auswertungs-/Planungsaufträge, Vergleichsauswertung und zwei neue Fragen. Gruppensummen sind jeweils 7, 16, 25; die Aufgabe stützt keine allgemeine Aussage über den Einfluss von Licht. Beobachtungsregel, Bedingungen, Zwischenzeiten und tatsächliche Datenerhebung werden unterschieden. Keine echte Keimungsuntersuchung durchgeführt.

Neue Suite test_germination_evidence.js prüft sechs Antwortpfade, Abschnittszuordnung, Inhaltsrevision, unabhängige Gruppensummen/kumulierte Werte und das Arbeitsblatt ohne Musterlösung. Bestanden; nun 165 vorhandene Suiten. Strukturprüfung 1478 Frageninstanzen ohne Befund. Letzter vollständiger Lauf weiterhin 164 vor dieser Änderung. Keine neue Übersetzung und keine Veröffentlichung.

## Kennzeichen des Lebens ohne falsche Einzelausschlüsse (08.09.2026)

bio_1_kompass Revision 3 ersetzt die vereinfachte Vokabeldefinition und Quizantwort, nach der jedes Lebewesen selbst fortpflanzungsfähig sein müsste. Zellaufbau, Stoffwechsel, Reaktion und Entwicklung werden gemeinsam betrachtet; Fortpflanzung über Generationen ist von der Fähigkeit eines einzelnen Individuums getrennt. Drei Vergleichs-/Begründungsaufträge und eine neue Frage ergänzen die Erklärung. Der Einstieg des bereits vorhandenen Evolutionskapitels enthält die entsprechende Einschränkung schon und wurde nicht geändert.

Quellenabgleich am 08.09.2026: OpenStax Biology 2e 1.2 (Kennzeichen) und 18.2 (lebende, unfruchtbare Individuen). Eigene altersgerechte Formulierung, Quellen im Kapitel verlinkt. Die vorhandene neue Biologiesuite prüft jetzt zwölf Antwortpfade zu Keimung und Kennzeichen des Lebens, korrekte Abschnittszuordnung und Veraltung von Revision 2. Bestanden. Strukturprüfung 1479 Frageninstanzen ohne Befund. Weiterhin 165 Suiten vorhanden, letzter Gesamtlauf 164 vor den Biologieänderungen. Übersetzungen bleiben pausiert.

## Klimabeispiel zeitlich eindeutig beschriftet (08.09.2026)

bio_1_kompass Revision 4: Die NASA-Zahl für 2025 (+1,19 °C gegenüber 1951–1980) anhand der Mitteilung vom 14.01.2026 erneut bestätigt. Mehrdeutiges „die 10 letzten Jahre“ ist als 2016–2025 und die Rekordaussage als Auswertung bis 2025 datiert. Die Zahl von mehr als 25 000 bezieht sich nun eindeutig auf Wetterstationen; weitere Daten stammen von Schiffen/Bojen und antarktischen Stationen. Veröffentlichung, Datenjahr und Quellenprüfung sind getrennt angegeben. Drei Leseaufträge üben Vergleichszeitraum, globale Abweichung und Quellenvergleich.

Keine neue Klimazahl erfunden und kein laufend automatisch aktualisierter Datenstand behauptet. Betroffene Kapitel-/Arbeitsblattintegration mit zwölf Antwortpfaden bestand. Keine neue Testsuite oder Übersetzung. Vollständiger letzter Testlauf bleibt der oben datierte Lauf mit 164 Suiten vor den Biologieergänzungen; 165 Suiten vorhanden.

## DGB 2. Klasse: Variablen und Debuggen ausführen (08.09.2026)

dgb6_produktion Revision 1 enthält nun einen ausführbaren Punktezähler mit drei Antwortwerten und zwei Programmvarianten. Ein fehlerhaftes Zurücksetzen innerhalb der Wiederholung wird mit einmaligem Initialisieren verglichen. Jeder Schritt protokolliert vorherigen Stand, Zustand nach Zurücksetzen/Beibehalten und Endstand. Änderung/Reset starten neu; nach letztem Schritt bleibt ein bedienbarer Fokus. Die Modellpunkte verändern den Lernstand nicht.

Sechs Arbeitsaufträge verlangen Vorhersage, erste Abweichung, gezielte Korrektur, verschiedene Testfälle, eigene Variante und Dokumentation. Beide Pseudocodes stehen zusätzlich außerhalb der Interaktion für Papierarbeit. Zwei neue Kapitelquizfragen und konkretere Debugging-Rückmeldung. Neue Suite test_counter_debugging.js besteht: alle acht Antwortfolgen je Variante mit sämtlichen Zwischenständen, Reset/Änderung/Fokus, sechs Antwortpfade und Revision. Alle 21 DGB-Arbeitsblattprüfungen bestanden. Nun 166 vorhandene Suiten; letzter vollständiger Lauf 164 vor den jüngsten Änderungen. Strukturprüfung 1481 Frageninstanzen ohne Befund. Keine neue Übersetzung, Browserprüfung oder Veröffentlichung.

### DGB6: Nutzungserlaubnis und Quellenangabe getrennt prüfen

Deutsches Produktionskapitel auf Revision 2: drei ausdrücklich erfundene Lizenzkarten, fünf Arbeitsschritte, Partnerkontrolle und Musterangabe. CC BY 4.0 und CC BY-ND 4.0 anhand der offiziellen deutschen Lizenzübersichten am 8. September 2026 geprüft. Fragestellung ausdrücklich zum inhaltlichen Umgestalten und öffentlichen Teilen; keine pauschale Gleichsetzung von Quellenangabe und Erlaubnis. Zwei vorhandene Prüfungsfragen mit plausiblen Fehlannahmen und begründeten Rückmeldungen ersetzt. Keine Übersetzungen bearbeitet.

Gezielte Prüfung bestanden: 16 Debugging-Konfigurationen und zwölf Antwortpfade im tatsächlichen Renderer, frühere Kapitelrevision wird als veraltet erkannt; alle 21 DGB-Arbeitsblätter. Quiz-Strukturaudit: 1481 Fragen, keine Befunde. Weiterhin 166 Testsuiten; letzter vollständiger Lauf umfasst 164 Suiten und liegt vor diesen Änderungen. Kein Browser- oder Unterrichtstest, keine Veröffentlichung.

### Physik: Elektrizität in nachvollziehbarer Lernfolge

Elektrizitätskapitel Revision 4: U/I/R und Ohm-Rechner stehen jetzt vor der Kondensator-Vertiefung. Vorwissen durch eine konkrete Können-Beschreibung ergänzt. Drei Vergleichsfälle mit fünf Aufgaben verbinden Vorhersage, kontrollierte Änderung einer Größe, Berechnung, Modellanzeige und Modellgrenze; Papiermaterial und verdeckte Vergleichslösung vorhanden. Regler explizit beschriftet. Laufende Rückmeldung nennt nun die tatsächliche Rechnung statt pauschaler Schwellen für wenig/mittleren/hohen Strom.

Gezielte Tests bestanden: Elektrizitätskapitel mit neuer Abschnittszuordnung, fünf Ohm-Fällen, 21 Schutz-/Geräte-Antwortpfaden und zwölf Sensorlampen-Zuständen; alle 20 Physik-Arbeitsblätter einschließlich der neuen Tabelle und Aufgaben ohne Vergleichslösung. Frühere Kapitelrevision 3 wird als veraltet erkannt. Keine Übersetzungen, keine Veröffentlichung. Letzter vollständiger Lauf weiterhin 164 Suiten vor den späteren Ergänzungen; insgesamt 166 Testsuiten vorhanden. Browser- und Unterrichtserprobung offen.

### Gemeinsame Verifikation und präzisierter Physikbefund

Vollständiger Lauf 2026-09-08T20:43:58.755Z: 166/166 Suiten bestanden, Exit 0, 273 Sekunden. Während des Laufs keine Produkt- oder Testquellen geändert. Der bisher pauschal offene Spiegel-/Augenabgleich wurde durch vollständige Abschnitts-/Modellprüfung und Primärquellenvergleich konkretisiert; nächster belegter Inhaltsbedarf ist ein Linsenversuch zur Bildentstehung mit eigenen Beobachtungen. Einzelheiten in PHYSIK_LEHRPLANABGLEICH.md. Kein Browser-, Unterrichts- oder Veröffentlichungsnachweis. Übersetzungen weiter zurückgestellt.

### Linsenversuch ergänzt (08.09.2026)

Der zuvor dokumentierte fehlende Handlungsauftrag ist jetzt in linsen_spiegel/sec4 vorhanden: vorbereiteter schulischer LED-Aufbau mit Sammellinse ungefähr 10 cm Brennweite und Zerstreuungslinse, drei Gegenstandsabstände, Wiederholung, fünfzeiliges leeres Beobachtungsprotokoll und sieben Schritte. Schirmbeobachtung und Blick auf unbeleuchtetes Papier bei Raumlicht sind getrennt. Der Auftrag verwendet weder Sonne noch Laser oder Flamme. Die Lehrkraft muss Material und Aufbau vor der Stunde prüfen. Papierkonstruktion und ideale Vergleichswerte sind ausdrücklich keine Messdaten. Zwei neue Fragen prüfen reelle Bildentstehung und das Scharfstellen gegenüber dem Auge. Revision 6.

Gezielt bestanden: vorhandene Linsen-/Augenmodelltests mit sämtlichen sechs neuen Antwortwegen und korrekter Abschnittszuordnung, alle 20 Physik-Arbeitsblätter mit Tabelle und Auftrag ohne versteckte Vergleichslösung. Modellzahlen unabhängig über die Linsengleichung nachgerechnet: bei g=30/20/15 cm und f=10 cm ergeben sich b=15/20/30 cm sowie umgekehrte Bildgrößen 0,5/1/2 des Gegenstands. Praktische Durchführung, Sichtbarkeit mit konkretem Schulmaterial und visuelle Abnahme sind weiterhin nicht nachgewiesen.

Letzter gemeinsamer Lauf: 166/166 vom 2026-09-08T20:43:58.755Z, vor dieser Ergänzung. Weiterhin 166 Suiten, keine Übersetzungen geändert und keine Veröffentlichung. Quiz-Strukturaudit jetzt 1483 Fragen ohne Befund.

### Mathematik 1: Entbündeln und verlässlicher Plus-/Minus-Trainer

math1_3_add_sub Revision 1: Subtraktion mit Entbündeln einschließlich Nullüberbrückung (73−48 und 302−178), vier Papieraufträge, Gegenproben und Vergleichslösung ergänzt. Drei begründete fachliche Fragen ersetzen die bisherige Selbstauskunft im Diplom. Laufzeit akzeptiert ausschließlich sichere nichtnegative ganze Zahlen, schneidet keine Dezimaleingaben mehr ab und erklärt je nach Zahlenpaar Bündeln/Entbündeln oder Stellenwerte. Explizite Labels, Statusmeldungen, Enter, Löschen veralteter Rückmeldung und einmalige Initialisierung vorhanden. Keine Übersetzungen erstellt; veraltete Fassungen werden weiterhin ausdrücklich auf Deutsch zurückgeführt.

Neue Suite test_arithmetic_regrouping.js bestanden: alle 3600 Zahlenpaare des Generators mit richtigem und falschem Ergebnis, ungültige Formate, Enter/Neustart/Mehrfachinitialisierung, alle neun Quiz-Antwortwege und alte Revision. Zusätzlich alle elf Erstklasskapitel und 95 Mathematik-/Chemie-/Biologie-Arbeitsblätter geprüft. Insgesamt jetzt 167 Suiten; letzter vollständiger Lauf weiterhin 166/166 vom 2026-09-08T20:43:58.755Z vor dieser Änderung. Quiz-Strukturaudit: 1485 Fragen, keine Befunde. Keine praktische/visuelle Freigabe oder Veröffentlichung.

### Mathematik: Volksschul-Trainer ohne Abschneiden und Zeitdruck

math1_1_vs_wissen Revision 1: strenge Ganzzahleingabe in Addition/Multiplikation, konkrete Rechenhilfen und Gegenproben. Richtige Antworten bleiben sichtbar; neue Aufgabe nur auf ausdrücklichen Knopfdruck. Eingaben sind beschriftet, Feedback als Status ausgegeben, Enter unterstützt und veraltetes Feedback beim Bearbeiten gelöscht. Pauschale Aussage „Plus macht mehr/Minus weniger“ auf positive Zahlen begrenzt und Null ergänzt. Revision verhindert die Kombination alter übersetzter Oberflächen ohne Weiter-Schaltfläche mit neuer Laufzeit; keine Übersetzungen bearbeitet.

Neue Suite test_primary_arithmetic.js bestanden: 2581 Zahlenpaare mit richtigen, falschen und Dezimaleingaben, ungültige Formate, keine automatische Aufgabenersetzung, expliziter Aufgabenwechsel/Fokus, Enter und Mehrfachinitialisierung. Alle elf Mathematikkapitel der ersten Klasse ebenfalls bestanden. Jetzt 168 Suiten; letzter vollständiger Lauf bleibt 166/166 vor diesen Ergänzungen. Die übrigen parseInt-Vorkommen in Mathematik-Themenskripten betreffen laut Quellsuche Bruch-Reglerwerte, keine direkten Antworttexte. Keine Veröffentlichung oder visuelle Abnahme.

### Größen und Zeitspannen in Mathematik 1

math1_10_groessen Revision 1: Einheiten km/m/dm/cm/mm und t/kg/g/mg, gemischte Größen, Vergleiche nach Umrechnung, vier eigene Mess-/Papieraufträge und Zeitstrahl über volle Stunden ergänzt. Schätzung, Ablesung, Wiederholung und Einheit werden getrennt dokumentiert. Unterrichtsbeispiel 13:45–15:10 ausdrücklich fiktiv; verstrichene Zeit und reine Lernzeit unterschieden. Drei neue Fragen mit plausiblen Fehlannahmen. Länge wird als ganze Zahl geprüft; Dauer hat getrennte Stunden-/Minutenfelder mit verständlicher Restminutenregel, Enter und Feedback-Löschung.

Neue Suite test_sizes_and_duration.js bestanden: ungültige Längeneingaben, alle 240 Stunden-/Minutenpaare im gewählten Bereich, neun Antwortwege und alte Revision. Alle elf Mathematikkapitel der ersten Klasse und 95 STEM-Arbeitsblätter ebenfalls bestanden. Insgesamt 169 Suiten; letzter vollständiger Lauf weiterhin 166/166 vor diesen Änderungen. Quiz-Strukturaudit 1488 Fragen ohne Befund. Keine Übersetzungen, keine Veröffentlichung oder visuelle Abnahme.

### Geometrische Grundbegriffe: Konstruktion und Lagebeziehungen

math1_5_geo_grundbegriffe Revision 1: Punkt ohne Ausdehnung und mathematischer Strahl präzisiert; Schienenvergleich auf gerade Stücke begrenzt, Parallelität in der Ebene und normal als rechter Schnittwinkel erklärt. Zwei beschriftete schräge SVG-Beispiele und fünf Zeichen-/Messaufträge mit Geodreieck ergänzen die Begriffe. Die Aufgaben unterscheiden endliche Zeichenausschnitte von unbegrenzten Geraden und erhalten Lagebeziehungen beim Drehen des Blattes. Zwei neue Quizfragen, vorhandene Parallelfrage konkretisiert.

Bestehende Suite test_math1_guides.js erweitert und bestanden: geometrische Richtungen anhand der tatsächlichen SVG-Koordinaten, alle acht geänderten/neuen Antwortwege, richtige Abschnittszuordnung und alte Revision. Alle elf Erstklasskapitel sowie 95 STEM-Arbeitsblätter bestanden. Keine neue Testsuite (weiterhin 169); letzter vollständiger Lauf 166/166 vor diesen Ergänzungen. Quiz-Strukturaudit 1490 Fragen ohne Befund. Zeichnungen wurden nicht im Browser betrachtet und Aufgaben nicht im Unterricht erprobt; keine Veröffentlichung oder Übersetzungen.

### Mathematik 1: Division mit Rest und Sachfragen

math1_4_mult_div Revision 1: Stellenwertzerlegung größerer Produkte, Division 254:6, Restbedingung und Gegenprobe, drei unterschiedliche Kartensituationen sowie fünf Papier-/Legeaufträge ergänzt. Drei neue Fragen prüfen Restgröße, benötigte Schachteln und einen ganzzahligen Quotienten 0. Unzutreffende Rückmeldung zur Antwort 12 bei 3+4·5 korrigiert. Klammern und Links-nach-rechts bei gleichrangigen Rechenarten anhand konkreter Beispiele erklärt.

Erweiterte bestehende Erstklass-Suite bestanden: zwölf neue/geänderte Antwortpfade und richtige Abschnittszuordnung, alle elf Kapitel. Alle 95 STEM-Arbeitsblätter bestanden. Insgesamt weiterhin 169 Suiten; letzter gemeinsamer Lauf 166/166 vor diesen Ergänzungen. Quiz-Strukturaudit 1493 Fragen ohne Befund. Übersetzungen ausgesetzt, keine Veröffentlichung und keine visuelle oder Unterrichtsabnahme.

### Lehrplanabgleich Mathematik 1: Kreise und Tangenten

Die Kompetenzbeschreibung und Präzisierung der ersten Klasse aus der gespeicherten RIS-Fassung vom 05.09.2026 gelesen. Die Klassenansicht enthält zwölf Kapitel: elf math1_-Kapitel und math2_8_statistik, das bereits der ersten Klasse zugeordnet ist. Der Präfix allein ist kein Klassenfilter. Daten/Kennzahlen sind deshalb kein fehlender Gesamtbereich. Konkrete Lücke im Geometriebereich: Kreislinie/-fläche, Kreisteile und Tangentenkonstruktion.

Diese Inhalte stehen jetzt als dritter Abschnitt in math1_5_geo_grundbegriffe, Revision 2: Kreisbogen, Kreissektor und Kreissegment, Radius/Durchmesser, Punkt-/Geradenlagen zum Kreis, zwei beschriftete SVG-Darstellungen, fünf Konstruktionsschritte und zwei neue Fragen. Die bestehende Erstklass-Suite prüft nun 14 Geometrie-Antwortwege, Abschnittszuordnung, Tangentenlage aus SVG-Koordinaten und alle elf math1_-Kapitel. Alle 95 STEM-Arbeitsblätter bestanden. Quiz-Strukturaudit 1495 Fragen ohne Befund; weiterhin 169 Testsuiten, letzter vollständiger Lauf 166/166 vor den jüngsten Ergänzungen. Keine neue rechtliche Aktualitätsprüfung der gespeicherten Lehrplanfassung, keine vollständige Mathematikabnahme, keine visuelle oder praktische Abnahme, keine Übersetzungen und keine Veröffentlichung.

### Mathematik 1: systematisches Abzählen

math2_8_statistik Revision 3 (in der Navigation erste Klasse): vierter Abschnitt zu Auswahlmöglichkeiten ergänzt. Aus drei Heftmotiven und zwei Papierarten werden sechs vollständige Kombinationen als Tabelle und zugängliche Text-Baumstruktur dargestellt. Vier Arbeitsaufträge behandeln Vollständigkeit, Doppelzählung, eingeschränkte Auswahl und Erweiterung auf drei Papierarten. Zwei neue Fragen; keine Gleichsetzung von Anzahl der Möglichkeiten und Wahrscheinlichkeit.

Erweiterte bestehende Statistik-Suite bestanden: alle sechs neuen Antwortwege, Abschnitt 4, frühere Revision 2 ungültig, tatsächliche Tabellenzellen und Baumendpunkte entsprechen genau dem kartesischen Produkt der Auswahlmengen. Bestehende Diagramm-/Kennzahlfunktionen ebenfalls geprüft. Alle 95 STEM-Arbeitsblätter bestanden. Weiterhin 169 Suiten; letzter vollständiger Lauf 166/166 vor jüngsten Änderungen. Quiz-Strukturaudit 1497 Fragen ohne Befund. Keine Übersetzungen, visuelle/unterrichtliche Abnahme oder Veröffentlichung.

### Konsolidierter Mathematikbefund und gemeinsamer Testlauf

MATHEMATIK_KLASSE1_ABGLEICH.md führt die aktuelle Klassenzuordnung und belegte Inhalte gegen die gespeicherten Lehrplananforderungen zusammen. Wichtigste nächste Lücke: Rechteck-/Quaderkompetenzen im Erstklasskapitel, da ausführlichere Inhalte bisher späteren Klassen zugeordnet sind. Der gemeinsame Lauf 2026-09-08T21:10:37.165Z endet mit 169/169 bestanden und Exit 0 (277 Sekunden). Keine Produkt-/Teständerungen während des Laufs. Der Gesamtauftrag bleibt offen; keine Übersetzungen oder Veröffentlichung.

### Erstklassgeometrie: Rechteckfläche, Umfang und Maßstab

Figuren und Körper Revision 2: zweiter Abschnitt zu Rechtecken mit Einheitsquadratmodell, Formelbegründung, Umkehraufgaben und fünf Papier-/Konstruktionsaufträgen. Alle 100 Seitenkombinationen getestet, einschließlich sichtbarer Quadratzahl, Randgeometrie, A/U, Rücksetzen/Fokus und unverändertem Lernpunktestand. Neun neue Quiz-Antwortwege und veraltete Revision geprüft. Erstklass-Suite und 95 STEM-Arbeitsblätter bestanden. Jetzt 170 Suiten; letzter gemeinsamer Lauf 169/169 vom 2026-09-08T21:10:37.165Z liegt vor dieser Änderung. Quiz-Strukturaudit: 1500 Fragen ohne Befund. Quadernetz/-oberfläche/-volumen ist der nächste offene Inhaltsbereich. Keine Übersetzungen, Veröffentlichung, visuelle oder praktische Abnahme.

### Erstklassgeometrie: Quadernetz, Oberfläche und Volumen

Figuren und Körper Revision 3: Netz mit sechs Flächen, getrennte Einheitswürfelschichten, O-/V-Herleitung, sieben Konstruktion-/Rechenaufträge und drei neue Fragen. Alle 216 Modelleinstellungen, Netzmaße ohne Überlappung, Flächensumme und Würfelzählung geprüft. Vorhandener Rechtecktest umfasst nun zusätzlich alle neun Quaderantwortwege, Rücksetzen und alte Revision; alle elf math1_-Kapitel sowie 95 STEM-Arbeitsblätter bestanden. Weiterhin 170 Suiten, letzter vollständiger Lauf 169/169 vor den Geometrie-Ergänzungen. Quiz-Strukturaudit 1503 Fragen ohne Befund. Keine tatsächliche Faltprobe, visuelle Abnahme, Übersetzung oder Veröffentlichung.

### GitHub-Zwischenstand und Pages-Abgleich

Auf ausdrücklichen Nutzerwunsch wurden sämtliche 343 geänderten/neuen Projektdateien im Commit d732283ca330fdc9545b07b882d4cf10345ae6fa als Zwischenstand gesichert und nach origin/main gepusht. Remote-Referenz und lokale HEAD waren danach identisch; Arbeitskopie war sauber. Erneuter Fetch bestätigt main ohne Abweichung.

Read-only-Veröffentlichungsprüfung: Die GitHub-API meldet main=d732283 und master=7ea675daf762d6c672f638ab35dc7352f1beb052. Der jüngste von der API gelistete erfolgreiche Pages-Lauf (29084441710) bezieht sich auf master/7ea675d; für den Zwischenstandscommit gibt es keine gemeldeten Commit-Statuskontexte. Der öffentliche Pfad topics/learning.html liefert HTTP 404, während lang/de.json und das Skript math1_11_figuren_koerper.js HTTP 200 liefern, aber nicht den lokalen Inhalt enthalten. Es ist deshalb keine aktuelle Veröffentlichung des Zwischenstands nachgewiesen. Der öffentliche /pages-API-Endpunkt war ohne Authentifizierung nicht lesbar (404); die tatsächliche Pages-Quellkonfiguration wurde damit nicht bestätigt. Kein aktiver Deployment-Lauf für d732283 nachgewiesen, daher keine Warteschleife begonnen.

Für die spätere Veröffentlichung: authentifiziert die Pages-Quelle prüfen und den beabsichtigten Veröffentlichungsbranch festlegen. master wurde nicht verändert oder überschrieben. Browser-/Darstellungsprüfung bleibt offen. Seit dem Zwischenstandscommit wurden zunächst nur diese Befunde lokal dokumentiert.

## Winkelkonstruktion ergänzt

math1_6_winkel Revision 2: sechs Schritte zum Schätzen, Anlegen, Ablesen mit richtiger Nullskala, Konstruieren von 65°/120° und Darstellen des erhabenen 240°-Winkels. Zeichengenauigkeit und unveränderte Winkel beim Verlängern/Drehen ausdrücklich behandelt. Zwei neue Fragen mit sechs Antwortwegen in bestehender Erstklass-Suite bestanden; 95 STEM-Arbeitsblätter geprüft. Damit ist die dokumentierte fehlende eigenständige Geodreieck-Anleitung ergänzt. Praktische Zeichenerprobung bleibt offen.

Diese Änderungen liegen lokal nach Zwischenstandscommit d732283. Weiterhin 170 Testsuiten; letzter vollständiger Lauf 169/169 vor den jüngsten Geometrie-Ergänzungen. Quiz-Strukturaudit 1505 Fragen ohne Befund. Keine Übersetzungen oder erneuter Push.

## Größere natürliche Zahlen und Überschlag ergänzt

math1_2_nat_zahlen Revision 2: dritter Abschnitt mit größeren Stellenwerten und Nullstellen, Vergleich anhand erster unterschiedlicher Stelle, Zahlenstrahl mit Schrittweiten 100/200, Rundung auf Hunderter und Grenzen des Überschlags. Vier Darstellungs-/Vergleichsaufträge und drei Näherungsaufträge; drei neue Fragen mit neun Antwortwegen im tatsächlichen Renderer geprüft. Alle elf math1_-Kapitel und 95 STEM-Arbeitsblätter bestanden. Die zuvor dokumentierten Lücken sind für diese Inhalte ergänzt; eine vollständige Prüfung aller Präzisierungen und praktische Erprobung bleiben gesondert offen.

Lokal nach Zwischenstandscommit d732283, kein erneuter Push. Weiterhin 170 Suiten; letzter vollständiger Lauf 169/169 vor den jüngsten Ergänzungen. Quiz-Strukturaudit 1508 Fragen ohne Befund. Übersetzungen weiterhin ausgesetzt.

## Vom Sachtext zur Formel ergänzt

math1_7_gleichungen Revision 2: eigener vierter Abschnitt mit ausdrücklich erfundenem Kostenmodell, Definition von Variable und Einheit, festen/variablen Anteilen, Wertetabelle, Gleichung, Einsetzprobe und erlaubtem ganzzahligem Wertebereich. Fünf Arbeitsaufträge schließen eigenes Formulieren eines Sachtexts ein; drei neue Fragen. Multiplikation/Division als zusätzlicher Vorwissenslink. Bestehende Ungleichungs-Suite prüft alle 30 Antwortwege und 55 Modellvergleiche, neue Abschnittszuordnung, Tabellenrechnung und vorherige Revision. Erstklass-Suite und 95 STEM-Arbeitsblätter ebenfalls bestanden. Keine praktische/visuelle Gesamtprüfung.

Lokal nach d732283, kein erneuter Push. Weiterhin 170 Testsuiten, letzter gemeinsamer Lauf 169/169 vor den jüngsten Ergänzungen. Quiz-Strukturaudit 1511 Fragen ohne Befund. Übersetzungen ausgesetzt.

### Antwortformate: Ziffer und Eckenanzahl

Zehnerziffer in math1_2_nat_zahlen akzeptiert genau eine Dezimalziffer; Eckenanzahl in math1_11_figuren_koerper akzeptiert eine sichere nichtnegative ganze Zahl ohne Exponent-/Hexadezimalschreibweise. Beide Übungen unterstützen Enter und löschen alte Rückmeldung beim Bearbeiten. Körperauswahl unterscheidet leere Auswahl von einer fachlich falschen Antwort und begründet Kugel/Zylinder anhand der Flächen. Ergänzte bestehende Erstklass-/Rechtecktests bestanden, einschließlich Eingabeformaten und den vorhandenen 100 Rechteck-/216 Quadereinstellungen. Keine neue Suite und keine neue Inhaltsrevision für diese Bedienkorrekturen. Weitere schwache Vergleiche in späteren Mathematikübungen sind noch kontextabhängig zu prüfen; nicht jeder numerisch gleichwertige Dezimaleintrag ist ein Fehler. Lokal, kein Push, Übersetzungen weiter ausgesetzt.

### Dezimalzahlen: Einkauf begründen (nach Zwischenstand 8276883)

Die starre Signalworttabelle in math1_9_dezimalzahlen wurde durch zwei gegensätzliche Situationen mit „insgesamt“ ersetzt. Eine fiktive Preisliste führt durch fünf Aufgaben zu Stückpreis, Gesamtpreis, genau benötigter Menge, Rückgeld und Grenzen eines Überschlags am Budget. Aufklappbare Rechenwege und drei bewertete Fragen mit differenziertem Feedback ergänzen Abschnitt 9; Kapitelrevision 3 macht ältere Quizresultate als veraltet erkennbar. Keine Übersetzungen ergänzt.

Gezielt geprüft: alle elf math1-Kapitel im tatsächlichen Renderer, neun neue Antwortpfade einschließlich Abschnittszuordnung, Centrechnung mit vollständiger Enumeration der passenden Einzel-/Paketkäufe und Revisionserkennung. Alle 95 STEM-Arbeitsblattmaterialien bestanden ebenfalls. Strukturaudit: 1514 gespeicherte Quizinstanzen, keine Befunde; dies ist kein Beleg vollständiger Fachabdeckung. Browser- und Drucklayout nicht geprüft. Änderungen nach dem genannten Push sind lokal.

### Brüche: Gleichwertigkeit und Bezugsgröße

math1_8_brueche, Abschnitt 2, erklärt nun Erweitern und Kürzen an gleich langen Streifen mit 1/2 = 2/4 = 4/8. Fünf Zeichen-/Begründungsaufgaben mit aufklappbaren Lösungen behandeln Unterteilung, gemeinsamen Zahlenstrahlpunkt, verschiedene Bezugsgrößen und das Gegenbeispiel zum Addieren in Zähler und Nenner. Drei bewertete Fragen prüfen diese Zusammenhänge; Revision 3.

Gezielt bestanden: elf math1-Kapitel, neun zusätzliche Antwortpfade und Revisionserkennung, Streifenlängen/Unterteilungen ohne Lücken mit gleich großer markierter Hälfte sowie 95 STEM-Arbeitsblattmaterialien. Kein visueller Browser-/Drucknachweis. Strukturaudit jetzt 1517 gespeicherte Quizinstanzen ohne Strukturprobleme. Übersetzungen nicht ergänzt; Änderungen weiterhin lokal.

### DGB: Häufigkeiten selbst prüfen

Die vorhandene Umfragewerkstatt der ersten Klasse hat eine interaktive Auszählung erhalten. Rückmeldungen erklären pro Kategorie anhand der Antwortzettel, wo erneut gezählt werden muss. Eine passende Gesamtsumme allein wird ausdrücklich nicht als Erfolg bewertet. Die anschließende digitale Tabelle und Diagrammerstellung bleiben als eigener Werkstattauftrag erhalten.

Gezielt bestanden: 729 Kombinationen, ungültige Eingaben, Enter/Reset/Fokus, doppelte Initialisierung und unveränderter Quizspeicher, bestehende Schleifenmodelle sowie 21 DGB-Arbeitsblattmaterialien. Bewerteter Kapitelstoff bleibt unverändert; keine Revisionsanhebung und keine Übersetzungen. Keine visuelle Browserprüfung.

### Gesamtprüfung nach Mathematik- und DGB-Ergänzungen

Der Gesamtlauf prüfte alle 170 Suiten. Einzige Abweichung: test_fraction_decimal_assessment erwartete noch je zwölf Fragen. Die Prüfung berücksichtigt nun die drei zusätzlichen Abschnittsfragen je Kapitel, prüft weiterhin alle Antwortmöglichkeiten, genaue Wiederholungs-IDs, Revisionserkennung und die fünfzehn Fragen samt Lösungen beider Arbeitsblätter. Nachprüfung bestanden, Originalbericht mit 169/170 bleibt unverändert erhalten. Kein erneuter Push oder Veröffentlichung.

### Nach Gesamtprüfung: Abstand Punkt–Gerade

math1_5_geo_grundbegriffe enthält nun ein interaktives Streckenvergleichsmodell sowie vier Konstruktions-/Messaufträge zu Lotfußpunkt, senkrechtem Abstand und Abstand 0. Geprüft: neun Reglerstellungen, Koordinaten und Längenbeziehung, gerundete Rückmeldungen, unveränderter nativer Fokus, doppelte Initialisierung und sämtliche elf math1-Kapitel. Die 95 STEM-Arbeitsblattmaterialien bestanden. Diese Änderung liegt nach dem vollständigen 170-Suiten-Lauf und ist durch gezielte Nachprüfungen abgedeckt. Keine neue bewertete Frage, keine Übersetzung, keine visuelle Abnahme oder Veröffentlichung.

### Zusammengesetzte Quader: Oberfläche und Ansichten

math1_11_figuren_koerper Revision 4 ergänzt einen vollständig beschriebenen Stufenkörper, drei Ansichten, fünf eigenständige Aufgaben und zwei bewertete Fragen. Kontaktflächen werden zweimal von der Summe der Einzeloberflächen abgezogen. Unabhängig über diskrete Einheitswürfel geprüft: 30 Würfel, 62 freie Flächen und sämtliche Rasterpositionen der drei Projektionen. Die erweiterten Rechteck-/Quaderprüfungen, elf math1-Kapitel und 95 STEM-Arbeitsblattmaterialien bestanden. Kein tatsächlicher Modellbau, keine Browser-/Druckprüfung oder Veröffentlichung.

### Würfelnetze vergleichen

Der Quaderabschnitt enthält zwei gültige und ein ungültiges Netz mit nummerierten Quadraten, gleichwertigen Koordinatentabellen zum Nachzeichnen und vier Falt-/Begründungsaufträgen. Die Auflösung nennt gegenüberliegende Flächen und erklärt die unzulässigen Vierer-Treffpunkte der Rechteckanordnung. Eine unabhängige Orientierungsausbreitung mit 90-Grad-Faltungen prüft die drei Fälle und sämtliche genannten Gegenüber-Paare. Rechteck-/Quaderprüfungen und 95 STEM-Arbeitsblattmaterialien bestanden. Die Tabellen bleiben auch im Arbeitsblatt erhalten. Tatsächliches Ausschneiden/Falten und visuelle Prüfung bleiben offen; keine neue Quizrevision, Übersetzung oder Veröffentlichung.

### Lernpfad und Themenbezeichnungen konsolidiert

Geldrechnen ist jetzt im Katalog beim Dezimalkapitel benannt; das Größenkapitel nennt seine tatsächlichen Schwerpunkte Länge/Masse/Zeit. Untertitel beschreiben die ergänzten Inhalte. Figuren/Körper verweist auf Multiplikation und Größen als zusätzliches Vorwissen. Alle mathematischen Kapitelverweise führen im Katalog auf frühere Kapitel. Kapitel-, Such- und Stofflistentests bestanden; Inhaltsmatrix der ersten Klasse auf den aktuellen Stand gebracht. Keine Übersetzungen ergänzt.

### Eigene Daten erheben und auswerten

Im Erstklass-Statistikkapitel ist jetzt eine durchgehende Untersuchung von acht Stift- oder Papierstreifenlängen angeleitet: Auswahl und Messdefinition, Nullmarke/Einheit, Wiederholungsmessung, Rohdatenprotokoll, geordnete Liste, Kennzahlen, Häufigkeitstabelle, Diagramm und begrenzte Schlussfolgerung. Eine fiktive Alternative wird ausdrücklich von selbst erhobenen Daten getrennt. Ihre Summe 120 cm, Mittelwert/Median 15 cm, Spannweite 6 cm und Häufigkeiten 1/2/3/1/1 sind geprüft. Fehlende Werte sind keine Nullen; gleiche Beobachtungswerte bleiben mehrfach in der Liste.

Statistikprüfung und 95 STEM-Arbeitsblattmaterialien bestanden. Die Anleitung ist ausgearbeitet, die tatsächliche Erhebung und die Qualität von Schülerprodukten sind damit nicht nachgewiesen. Keine neue Quizrevision, Übersetzung oder Veröffentlichung.

### Biologie: Merkmalsvergleich und Abgleich begonnen

Im Pflanzenkapitel Artbegriff nach OpenStax präzisiert und einen konkreten Vergleich zweier Pflanzen mit Beobachtungstabelle, fünf Aufträgen und Unsicherheitsdokumentation ergänzt. Die 95 STEM-Arbeitsblattmaterialien bestanden. Neue BIOLOGIE_LEHRPLANABGLEICH.md trennt Katalogzuordnung von tatsächlich gelesenen Abschnitten und offenen jahrgangsweisen W/E/S-Nachweisen. Keine vollständige Biologieabnahme, Übersetzung oder Veröffentlichung.

### Pflanzenkapitel: konkrete Übungsaufträge

Fünfzehn allgemeine Trainingskarten in bio_1_bluetenpflanzen durch abschnittsbezogene Aufgaben ersetzt. Ganze Pflanze und vergrößerte Blüte werden getrennt gezeichnet; beobachtete und aus Vorlagen ergänzte Strukturen gekennzeichnet. Aufgaben nutzen das vorhandene Vergleichsprotokoll, den Pollenweg und den Feucht-/Trockenvergleich, statt austauschbarer Aufforderungen zu beliebigen Alltagssituationen. Fragepool und Lernstandlogik unverändert; gemeinsame Quizpool-Prüfung bestanden und Diff sauber. Kein neuer Laufzeittest für reine Auftragstexte.

### Rationale Zahlen: Eingaben und erklärtes Feedback

Die beiden bestehenden Zahlenaufgaben akzeptieren Dezimalkomma und Dezimalpunkt sowie führendes Plus und das typografische Minus. Leere/ungültige Formate werden ausdrücklich von mathematisch falschen Antworten unterschieden; Rückmeldungen erklären die Schritte über 0 bzw. unterscheiden Vorzeichen und Betrag. Alte Rückmeldungen verschwinden bei neuer Eingabe. Geprüft: gültige gleichwertige Schreibweisen, ungültige Formate, Enter, erneute Initialisierung, Feedbackentfernung und vorhandene 882 Zahlenstrahlkombinationen. Quizinhalt und Revision bleiben unverändert.

### Vier weitere kurze Dezimalantworten vereinheitlicht

Prozentrechnung, reelle Zahlen, Terme/Gleichungen und Funktionen unterstützen jetzt Textfelder mit Dezimalkomma/-punkt, Enter, Formatfehlern und Entfernen veralteter Rückmeldungen. Rabattfeedback trennt Ersparnis vom Endpreis. Neue gezielte Integrationstest-Suite test_quick_decimal_answers prüft die vier tatsächlichen Kapitel, gleichwertige Eingaben, Fehlerformate, Beschriftungen und unveränderten Quizspeicher. Vorhandene Prüfungen für reelle Zahlen (1001 Näherungen), Gleichungsumformungen und lineare Systeme (625 Koeffizientenkombinationen) bestanden ebenfalls. Jetzt 171 Testsuiten im Bestand; kein neuer vollständiger Gesamtlauf. Keine Quizrevision, Übersetzung oder Veröffentlichung.

### Arbeitsblätter: Fachwort-Erklärungen erhalten

Fehler in der gemeinsamen Materialerzeugung behoben: Pauschales Entfernen aller details-Elemente entfernte auch 440 biologische Glossareinträge. details.bio-vocab-item wird jetzt vor der Bereinigung in normalen Text mit hervorgehobenem Begriff umgewandelt. Die übrigen Details/Musterlösungen bleiben entfernt.

Die 95 STEM-Materialprüfungen vergleichen nun für jedes Kapitel und jeden Abschnitt Anzahl, Begriff sowie sämtliche Definitionen und Beispiele des Glossars mit dem Quelltext. Alle bestanden; außerdem 21 DGB- und 20 Physik-Arbeitsblattprüfungen mit weiterhin entfernten Lösungen/Interaktionen und getrennten Druckschaltern. Tatsächliches Seitenlayout bleibt ungeprüft. Keine Inhaltsrevision, Übersetzung oder Veröffentlichung.

### Statische Mathematikzeichnungen im Arbeitsblatt

Sieben ausdrücklich markierte statische SVGs (Bruchstreifen, Stufenkörperansichten und Würfelnetze) werden jetzt im Arbeitsblatt erhalten. Die übrigen Modell-/Medienregeln bleiben bestehen; Inline-Handler und dynamische Elemente werden weiterhin bereinigt. Druck-CSS begrenzt die Breite und vermeidet Umbrüche innerhalb einer Figur.

Die 95 STEM-Arbeitsblattprüfungen vergleichen Anzahl, ViewBox, zugängliche Beschriftung und Rechteckgeometrie jeder übernommenen Zeichnung mit dem Kapitel. Kapitelprüfungen für Rechtecke/Quader und alle elf math1-Kapitel bestanden. Das ist ein Nachweis des DOM-Inhalts, keine tatsächliche Drucklayoutkontrolle. Keine Veröffentlichung oder Übersetzung.

### Künstliche Selektion: Ziele und Belege

Vier neue Aufgaben im Selektionskapitel verbinden fiktive Erntewerte mit einer begründeten Elternauswahl. Anzahl und Erntemasse sind getrennt; aus zwei Beobachtungen wird keine Vererbbarkeit abgeleitet. Die Tabelle enthält zwei einzelne Pflanzen, damit das Produkt aus Fruchtzahl und mittlerer Fruchtmasse denselben Bezugsbereich hat. 95 STEM-Arbeitsblattprüfungen bestanden; Quiz und Laufzeit unverändert. Keine neue Übersetzung oder Veröffentlichung.

### Art, Population und Evolution konsistent erklärt

Wiederkehrende Glossareinträge zu Art, Population, Evolution und Angepasstheit im Biologiebestand direkt verglichen. Zwei Schneckenbeispiele korrigiert: Eine Population umfasst Tiere derselben Art, nicht alle Schneckenarten eines Ortes. Der Artbegriff im Evolutionskapitel nennt nun fortpflanzungsfähige Nachkommen und den begrenzten Geltungsbereich des Kriteriums, entsprechend der bereits geprüften OpenStax-Grundlage. Evolution im Viertklasskapitel nennt ausdrücklich vererbbare Merkmale; im Selektionsbeispiel ist Artentstehung nicht als notwendige Folge jeder Veränderung formuliert. Glossarübernahme in allen 95 STEM-Arbeitsblättern bestanden. Bestehende Quizantworten unverändert, keine neue Übersetzung oder Veröffentlichung.

### Erneute Gesamtprüfung bestanden

Alle 171 Funktionstests im selben Lauf erfolgreich. Zusätzlich Syntaxprüfung aller 87 Kapitel-Skripte und Strukturaudit der 1519 priorisierten Quizinstanzen ohne Befund. Es wurden während des Laufs keine Laufzeit- oder Kapiteldateien verändert. Die anschließende Aktualisierung betrifft nur diese Dokumentation. Veröffentlichung und vollständige Abnahme bleiben offen.

### Evolution: aussagekräftigere Verständnisprüfung

Fünf bestehende Kapitelquizfragen und eine Übungsfrage überarbeitet: plausible Verwechslungen zwischen individuellem Wachstum und vererbbarer Veränderung, Möglichkeit im Labor und historischer Schrittfolge, mehrfach kopierter Aussage und unabhängigen Belegen sowie Lebensraum und systematischer Gruppe. Revisionsstand bio_1_evolution 2. Alle 15 Antwortpfade der fünf bewerteten Fragen einschließlich gezielter Wiederholungs-IDs, Abschnittszuordnung und veralteter Revision 1 geprüft. Übungsfrage bleibt aus dem bewerteten Pool ausgeschlossen. Neue Suite test_biology_evolution_assessment; jetzt 172 Suiten, letzter gemeinsamer Gesamtlauf war vor dieser Änderung mit 171/171 erfolgreich. Keine Übersetzung oder Veröffentlichung.

### Schriftliche Division ergänzt

math1_4_mult_div enthält nun eine Stellenwerttabelle für 816 : 4 = 204 und drei erklärte Schritte für 7344 : 24 = 306. Die Null als notwendige Ergebnisstelle, Umtausch des Restes beim Herunterholen sowie Endrest/Gegenprobe werden getrennt erklärt. Fünf Aufgaben mit Vergleichslösungen behandeln außerdem 936 : 4 = 234, 7350 : 24 = 306 Rest 6 und 864 : 4 = 216. Elf math1-Kapitel und 95 STEM-Arbeitsblattmaterialien bestanden. Reine Ergänzung von Erklärung und Papieraufträgen; kein neuer bewerteter Quizstoff und keine Revisionsanhebung. Praktische Durchführung/visuelle Darstellung nicht geprüft.

### Schriftliche Multiplikation ergänzt

286 · 34 ist mit Überträgen, Teilprodukt 286 · 30, Stellenwerttabelle und Übertrag bei der Addition erklärt. Vier Aufgaben prüfen 203 · 14, den Fehler 1144 + 858, 407 · 26 und alternative Zerlegung/Überschlag. Beispielrechnungen numerisch kontrolliert; elf math1-Kapitel und 95 STEM-Arbeitsblattmaterialien bestanden. Die zuvor benannten schriftlichen Verfahren sind damit konkret ausgearbeitet; das ist noch keine vollständige Lehrplan- oder Unterrichtsabnahme. Keine neue Quizrevision oder Veröffentlichung.

### Papieraufgaben: Vergleichslösungen zuschaltbar

Sieben ausdrücklich markierte Vergleichslösungen (schriftliche Multiplikation/Division, Würfelnetze, Stufenkörper, Einkaufsbudget, Bruchgleichwertigkeit und eigene Statistikdaten) erscheinen nun im verborgenen Lösungsteil des Arbeitsblatts. Der vorhandene Lösungsschalter blendet sie gemeinsam mit Quizlösungen ein; die Materialauswahl bleibt unabhängig. Es werden nur markierte Blöcke übernommen, keine automatischen Rückschlüsse aus beliebigen aufklappbaren Texten gezogen.

Die STEM-Materialprüfung vergleicht jetzt jeden Absatz dieser Lösungen mit dem Kapitel und prüft die Trennung vom Schülerteil. Bestehende Bruch-/Dezimal- sowie allgemeine Arbeitsblattprüfungen wurden ebenfalls ausgeführt. Keine neue Bewertung oder Übersetzung; tatsächliches Drucklayout und Veröffentlichung offen.

### 09.09.2026 – Elektrizität: Reihen-/Parallelversuch

Sechs angeleitete Arbeitsaufträge mit Lampenvergleich, fünf leeren Protokollfällen, unabhängigen Schaltern, Fehlerprüfung und Papieralternative ergänzt. Vergleichslösungen auf Wunsch im Arbeitsblatt verfügbar. 20 Physik-Arbeitsblätter und Kapitelinventar geprüft; praktische und visuelle Abnahme offen. Neue lokale Arbeit nach Zwischenstand 8313ae7; keine Übersetzungen oder Veröffentlichung.

### Interaktiver Stromkreisvergleich (09.09.2026)

Elektrizität/sec2 ergänzt die praktische Anleitung um eine direkt bedienbare Reihen-/Parallelschaltung mit zwei unabhängigen Schaltern. SVG-Stromwege und Schalterstellungen, ausgeschriebene Lampenzustände, begründete Rückmeldungen sowie Rücksetzen sind verbunden. Das Modell setzt intakte Bauteile voraus und berechnet keine Helligkeit oder Stromstärke. In der Reihe liegen beide Schalter im gemeinsamen Weg; parallel steuert jeder einen Zweig.

Alle acht Zustandskombinationen durch unabhängige Graph-Wegsuche geprüft; sichtbare Modellgruppe, Schaltergeometrie, Lampenstatus, zugängliche Beschriftung, Fokus, wiederholte Initialisierung, Reset und unveränderter Quizspeicher ebenfalls geprüft. Bestehende Elektrizitätsprüfung, 20 Physik-Arbeitsblätter, Inventar und Diff-Prüfung bestanden. Keine Browser-/Unterrichtsabnahme, keine neue Quizrevision, Übersetzung oder Veröffentlichung.

### Papieralternativen für interaktive Modelle (09.09.2026)

Der gemeinsame Arbeitsblatt-Export übernimmt nun ausdrücklich verfasste Papieralternativen aus einem direkten template[data-worksheet-alternative] des Modells. Ohne Alternative bleibt der bisherige Onlinehinweis bestehen. Die Alternative wird in den normalen Bereinigungspfad übernommen; Bedienelemente und dynamische Medien werden nicht als Ergebnisse gedruckt. Der Stromkreisvergleich liefert als erster Anwendungsfall die vollständige Verbindungsbeschreibung und acht unausgefüllte Schalterfälle. Die Vergleichslösung berücksichtigt beide Schalter und bleibt separat zuschaltbar.

Geprüft: acht verschiedene vollständige Fälle, leere Antwortspalten, keine Bedienelemente oder versteckten Templates in der Papieralternative; alle 20 Physik-, 95 Mathematik/Chemie/Biologie- und 21 DGB-Arbeitsblätter bestanden. Tatsächliches Drucklayout bleibt ungeprüft.

### Gesamtprüfung nach Stromkreis- und Arbeitsblatterweiterung

Bericht 2026-09-08T22:41:09.522Z: **172 von 172 Funktionstestsuiten bestanden**, Exit 0. Der Lauf umfasst auch die Evolutionsfragen, schriftlichen Rechenaufträge, optionalen Papierlösungen, den interaktiven Stromkreisvergleich und die neue Papieralternative. Zusätzliche Prüfung: Syntax aller 87 Kapitelskripte gültig; priorisierte Quizstruktur mit 1519 Frageninstanzen ohne strukturelle Befunde. Der Physik-Zugänglichkeitsaudit meldet 17 erfasste Kapitel ohne Befund und ist damit kein vollständiger 20-Kapitel-Nachweis.

Der vollständige Lauf prüft bestehende Übersetzungen mit, ohne neue zu erstellen. Bericht außerhalb des Repositorys: ../functional-test-report.json. Fachliche Lehrplanvollständigkeit, konkrete Unterrichtsversuche, Browser-/Druckdarstellung und veröffentlichter Endstand bleiben gesondert zu prüfen. Die neuen Änderungen nach 8313ae7 sind weiterhin lokal.

### Physik-Prüfumfang und Speicherregler (09.09.2026)

Der Zugänglichkeitsaudit bestimmt seine Kapitel jetzt aus SCIVERSE_CURRICULUM.physik statt durch Dateinamen-Ausschlüsse. Die bisherige Zahl 17 war eine Skriptauswahl und kein verlässlicher Nachweis der Physik-Kapitelabdeckung. Alle 20 Katalogkapitel werden jetzt erfasst; für drei Kapitel mit script:false wird die gemeinsame core-learning-Logik zusammen mit dem deutschen Kapitel-HTML geprüft. Fehlende Inhalte, ungültige/duplizierte IDs und fehlende benötigte Skripte führen zu einem Befund. Die Ausgabe kennzeichnet ausdrücklich die Grenze statischer Quelltextprüfungen.

Die erweiterte Prüfung zeigte fehlende aria-describedby-Verknüpfungen bei den Speicherreglern im Kraftwerkskapitel. Beide Regler verweisen jetzt auf den vorhandenen Ergebnistext; vorhandene Beschreibungen bleiben erhalten. Bestanden: statischer Audit für 20 Kapitel, 231 Speicherfälle samt verknüpften Textzielen sowie bestehende Kernkapiteltests und 102 Antwortpfade im tatsächlichen Renderer. Der letzte vollständige Lauf 172/172 liegt vor dieser gezielt geprüften Änderung. Keine visuelle oder vollständige Barrierefreiheitsabnahme.

### Selektion: anwendungsbezogene Kapitelprüfung (09.09.2026)

Fünf bewertete Fragen in bio_1_selektion überarbeitet: Variation versus erbliche Ursache, Elternwahl versus Vererbungsnachweis in der vorhandenen Fruchtaufgabe, aufeinanderfolgende Modellgenerationen versus unabhängige Neustarts, umweltabhängiger Fortpflanzungserfolg und absolute Anzahl versus Anteil (8/20 = 40 %, 18/60 = 30 %). Offensichtlich sachfremde Antworten sind durch plausible Fehlvorstellungen mit eigener Erklärung ersetzt. Revision 2 verhindert, dass alte Ergebnisse als aktueller Nachweis gelten.

Die bestehende Evolutionsprüfung erfasst jetzt beide Kapitel: 30 Antwortwege, konkrete Wiederholungs-IDs, Abschnittszuordnung, Ausschluss von Übungsfragen und alte Revisionen geprüft. 95 STEM-Arbeitsblätter sowie Inventar/Quizstruktur bestanden. Ein beim Umbau der Tests entstandener Syntaxfehler ist korrigiert; der abschließende gezielte Lauf bestand. Der Gesamtbericht 172/172 liegt vor dieser Änderung. Keine Übersetzungen oder Veröffentlichung.

### Selektion: Rechenhilfe zur ersten Modellrunde

Die erste Papier-Suchrunde (Start zehn helle/zehn dunkle Punkte) kann jetzt mit eigenen oder ausdrücklich erfundenen Restzahlen ausgewertet werden. Die Rechenhilfe verdoppelt beide Überlebendenzahlen nach der bestehenden Modellregel und unterscheidet Gesamtzahl, dunklen Anteil und Vergleich mit anfänglich 50 %. Keine Überlebenden ergibt keinen definierten Anteil; leere oder ungültige Eingaben werden nicht als null behandelt. Änderungen löschen die überholte Rückmeldung. Papieralternative mit 6/9 Überlebenden und separat zuschaltbarer Lösung ergänzt.

Geprüft: alle 121 zulässigen Eingabepaare, ungültige Formate, 6/9-Beispiel, Eingabetaste, Rücksetzen/Fokus, erneute Initialisierung, zugeordnete Ergebnisbeschreibung und unveränderter Quizspeicher. Die 30 Evolutions-/Selektionsantwortwege, 95 STEM-Arbeitsblätter und gemeinsamen Physik-Kernmodelle bestanden ebenfalls. Kein realer Suchversuch oder Browserlayout geprüft; keine zusätzliche Quizrevision, Übersetzung oder Veröffentlichung.

### Selektionsprotokoll: Generationen und Neustarts trennen

Das vorherige Drei-Zeilen-Protokoll ist durch sieben eindeutig bezeichnete Zeitpunkte ersetzt: Start und jeweils nach Suche/nach Vermehrung für drei Runden. Eigene Farbzahlen, Gesamtzahl und Anteile bleiben nachvollziehbar. Nullbestand und nicht durchgeführte Runden werden unterschiedlich gekennzeichnet. Vier zusätzliche Neustarts vergleichen immer den Stand nach der ersten Suche bei zwei Untergründen; Reihenfolge, konstante Bedingungen, Übung/Ermüdung und unsichere Befunde sind ausdrücklich behandelt. Eine kurze Erprobung der Suchzeit soll verhindern, dass jede Runde zwangsläufig vollständig abgeerntet wird.

Die Evolutions-/Selektionsprüfung mit 30 Antwortpfaden und 121 Rechenfällen sowie 95 STEM-Arbeitsblätter bestanden vor der abschließenden sprachlichen Präzisierung zur Suchzeit; kein neues Laufzeitverhalten. Praktische Erprobung und Drucklayout weiterhin offen. Keine Quizrevision, Übersetzung oder Veröffentlichung.

### DGB 2. Klasse: konkrete Sortier-/Filterwerkstatt

dgb6_information/sec1 ergänzt acht fiktive Lernmaterialien mit ID, Titel, Fach und numerischer Dauer. Sechs Arbeitsaufträge führen vom vollständigen Übertragen über mehrstufiges Sortieren, UND-Filter, Wiederanzeigen aller Zeilen und ODER-Vergleich bis zur Häufigkeitstabelle/Diagramm. Papieralternative und optionale Vergleichslösung vorhanden. Die bisherige reine Definitionsfrage zum Filtern prüft nun beide Bedingungen anhand der Liste; Revision 2.

Ein gezielter Lauf im tatsächlichen Renderer prüfte acht Datensätze, numerische Sortierung mit ID bei Gleichstand, die zwei UND-Treffer und sieben ODER-Treffer, alle drei Antwortwege samt Rückmeldung, Wiederholungs-ID und alte Revision. Die vorhandenen 21 DGB-Arbeitsblätter sowie Inventar und Quizstruktur bestanden. Keine tatsächliche Bedienung einer Tabellenanwendung oder visuelle Abnahme nachgewiesen. Keine Übersetzungen oder Veröffentlichung.

### DGB: Lizenzvergleich statt bloßer Quellenzeile

dgb6_information Revision 3 enthält drei fiktive Bildangebote und vier Bearbeitungs-/Rechercheaufträge; drei bisher triviale Prüfungsfragen wurden durch konkrete Entscheidungen ersetzt. Die Open-Source-Erklärung ist präzisiert. Geprüfte und verlinkte Primärquellen (09.09.2026): https://creativecommons.org/licenses/by/4.0/deed.de , https://creativecommons.org/licenses/by-nd/4.0/deed.de und https://opensource.org/osd . Die Aufgabe beurteilt die genannten Lizenzen, keine konkrete umfassende Rechtefreigabe.

Gezielter tatsächlicher Renderer-Lauf: alle zwölf Antwortwege der vier Kapitelprüfungsfragen, passende Rückmeldungen, Wiederholungs-IDs, Angebotstabelle und alte Revision bestanden. Alle 21 DGB-Arbeitsblätter und Struktur-/Inventarprüfungen ebenfalls bestanden. Keine tatsächliche Bildveröffentlichung, Übersetzung oder Veröffentlichung der Website.

### Chemische Zerlegung als Schulversuch angeleitet

chemie_reaktionen_energie/Abschnitt 3 enthält nun einen abgegrenzten Zerlegungsversuch mit Hefe nach ACS Middle School Chemistry 6.5, Explore (https://www.acs.org/middleschoolchemistry/lessonplans/chapter6/lesson5.html, Volltext am 09.09.2026 gelesen). Beobachtungsprotokoll, Atombilanz, Grenzen der Produktidentifikation und Planung eines Kontrollvergleichs sind ausgearbeitet. Die Papieralternative erfindet keine Versuchsdaten.

Die frühere Feststellung „kein ausdrücklich angeleiteter Zerlegungsversuch“ ist damit überholt. Ein tatsächlich durchgeführter Produktnachweis, eine praktische Erprobung am konkreten Schulmaterial und die Synthese-Anforderung bleiben gesondert offen. Reaktionskapiteltest und 95 STEM-Arbeitsblätter bestanden; keine neuen bewerteten Quizfragen, Übersetzungen oder Veröffentlichung.

### Zerlegung im interaktiven Reaktionsbaukasten

Der vorhandene Chemie-Baukasten ergänzt Wasserstoffperoxid als dritte Reaktion. Formel, Koeffizienten, schematische H–O–O–H-Teilchen und Atombilanzen verwenden dieselbe Reaktion wie der Schulversuch. Vorhandene Methan-/Wasserfälle bleiben verfügbar. Eingestellte Nullkoeffizienten werden jetzt ausdrücklich angezeigt statt vor der Formel ausgeblendet. Modellgrenzen der Teilchenbilder stehen im Kapitel.

Bestanden: 125 Kombinationen der drei Koeffizienten 0–4, unabhängig berechnete Atombilanz und H/O-Symbolzählung in den Diagrammen, sichtbare Nullkoeffizienten, Rücksetzen und Rückwechsel zu vier Eingabefeldern. Bestehende Reaktionstests und 95 STEM-Arbeitsblätter ebenfalls bestanden; nach der abschließenden Nullanzeige-Korrektur den Reaktionstest erneut bestanden. Keine neue Quizrevision, Übersetzung oder Veröffentlichung; visuelle Prüfung bleibt offen.

### Reaktionsbaukasten: ungültige Koeffizienten

Die Eingabeprüfung rundet Bruchzahlen nicht mehr und begrenzt zu große Werte nicht still auf 9. Leere, negative, nicht ganzzahlige und außerhalb von 0–9 liegende Werte erhalten eine zugeordnete Rückmeldung und aria-invalid; die alte Bilanzgrafik wird entfernt, bis alle aktiven Eingaben gültig sind. Null bleibt eine zulässige Eingabe zum Erkunden fehlender Stoffmengen, aber keine gültige vollständige Reaktionsgleichung.

Geprüft: 50 ungültige Eingabefälle über alle aktiven Felder der drei Reaktionen, unveränderte Eingabetexte/Fokus, Fehlerzuordnung, Rückkehr zur Grafik nach Korrektur und unveränderter Quizspeicher. Vorhandene Reaktionsfälle einschließlich 125 Zerlegungsbilanzen und Zugänglichkeitsprüfung aller 15 Chemiekapitel bestanden. Kein Browser- oder Screenreader-Praxistest.

### Schriftliche Rechenverfahren im Kapiteltest

math1_4_mult_div Revision 2 enthält zwei zusätzliche Verständnisfragen: Teilprodukt für drei Zehner bei 286 · 34 und notwendige Nullstelle bei 816 : 4. Die Rückmeldungen unterscheiden einen richtigen Zwischenschritt mit falschem Stellenwert sowie Ergebnisziffer und Endrest. Alte Ergebnisse aus Revision 1 gelten nicht als aktueller Nachweis.

Bestehende Erstklassprüfung um beide Fragen erweitert: 18 ausgewählte Antwortwege im Kapitel einschließlich aller sechs neuen Pfade, richtige Abschnittszuordnung, Rückmeldungen und Revisionswechsel bestanden. Alle elf math1-Kapitel und 95 STEM-Arbeitsblätter geprüft. Quizstruktur nun 1521 Frageninstanzen. Keine Übersetzung oder Veröffentlichung; praktische/visuelle Prüfung bleibt offen.

### DGB-Filter direkt bedienbar

Die fiktive Ressourcenliste lässt sich jetzt nach Fach, maximaler Dauer und UND/ODER-Verknüpfung filtern. Der Filter startet ausgeschaltet; das Deaktivieren zeigt alle acht Einträge wieder. Ausgewählte Datensätze werden vollständig übernommen, die Ausgangstabelle bleibt erhalten. Rückmeldungen nennen Bedingung, Trefferzahl und leere Auswahl. Die anschließende Tabellenanwendungsaufgabe bleibt bestehen.

Neue Suite test_dgb_resource_filter.js: 110 Kombinationen mit unabhängiger Mengenprüfung, unveränderte Quelldaten, Filteraufhebung, zugängliche Beschriftungen/Fokus, Wiederinitialisierung, unveränderter Lernstand sowie zwölf Antwortwege der vier Kapitelprüfungsfragen. 21 DGB-Arbeitsblätter ebenfalls bestanden. Jetzt 173 Suiten vorhanden; letzter vollständiger Bericht ist weiterhin 172/172 vor den nachfolgenden Änderungen. Keine Browserprüfung, Übersetzung oder Veröffentlichung.

### DGB: Sortieren und Filtern gemeinsam erkunden

Das Ressourcenmodell bietet nun ursprüngliche Reihenfolge sowie numerische Sortierung nach Dauer auf-/absteigend, bei gleichen Werten jeweils nach ID aufsteigend. Vollständige Datensätze bleiben zusammen und die Ausgangstabelle bleibt unverändert. Rückmeldungen nennen auch die gewählte Reihenfolge.

Die bestehende Suite prüft jetzt 330 Filter-/Sortierkombinationen gegen unabhängig festgelegte ID-Reihenfolgen, vollständige Zeilen, Fokus, Ergebnisverknüpfungen, Filteraufhebung und zwölf Quizantwortwege. 21 DGB-Arbeitsblätter bestanden. Keine neue Quizrevision, Übersetzung oder Veröffentlichung; Browserprüfung weiter offen.

### Mathematik 2. Klasse: Primzahlen begründet finden

Teilbarkeit/m21_prim ergänzt ein sechsstufiges Sieb bis 50: 1 ausschließen, Primzahlen einkreisen, größere Vielfache streichen und Ergebnisse kontrollieren. 29/49 und die Grenze nach dem Schritt 7 werden begründet. Die Vergleichsliste und die verkürzte Suche ab dem Quadrat sind optional als Papierlösung verfügbar. Die 15 Primzahlen wurden unabhängig durch Teilersuche ermittelt; Zweitklasskapitelprüfung und 95 STEM-Arbeitsblätter bestanden. Kein neuer bewerteter Quizstoff, keine Übersetzung oder Veröffentlichung; tatsächliche Zeichnung und Darstellung nicht geprüft.

### Teilbarkeit: Rückmeldungen differenziert

Die ggT-/kgV-Eingaben unterscheiden nun passende gemeinsame Teiler/Vielfache von der geforderten größten/kleinsten Lösung. Leere, nichtpositive und nichtganzzahlige Werte erhalten eine eigene Erklärung. Eingabeänderungen entfernen überholte Rückmeldungen auch bei Primfaktoren. Bestehende Erstinitialisierung/Enter-Bindung bleibt mehrfach aufrufbar.

Zweitklassprüfung bestanden, erweitert um sechs Zwischenlösungs-/Fehlerfälle und acht ungültige Eingaben sowie Rückmeldungslöschung und Fokus. Vorhandene Primfaktorprüfung kontrolliert außerdem sämtliche Kandidaten 2–60 über unabhängig ermittelte Teiler. Keine neue Quizrevision oder Veröffentlichung.

### Vollständiger Funktionstest nach den Fachergänzungen

2026-09-08T23:15:23.531Z: **173/173 Funktionstestsuiten bestanden**, Exit 0. Enthalten sind alle Änderungen bis zum erweiterten ggT/kgV-Feedback, der DGB-Sortier-/Filterwerkstatt und der Chemie-Eingabeprüfung. Zusätzlich: Syntax aller 87 Kapitelskripte und statischer Physik-Audit über 20 Katalogkapitel bestanden.

Der ergänzende Mathematik-Audit fand eine fehlende aria-atomic-Angabe bei der Stellenwert-Rückmeldung. Nach dem Gesamtlauf wurde ausschließlich diese Angabe ergänzt; Mathematik-Audit (39 erfasste Skripte) und alle elf Erstklasskapitel danach erneut bestanden. Der 39-Skript-Audit ist kein Nachweis vollständiger Barrierefreiheit sämtlicher Mathematikkapitel. Fachliche Vollständigkeit, reale Versuche, Browser-/Druckprüfung und Endveröffentlichung bleiben offen. Keine automatische GitHub-Veröffentlichung.

### Mathematik-Audit: vollständiger Katalog und tatsächliche Reglerlabels

Der Audit verwendet jetzt alle 41 Mathematik-Katalogeinträge einschließlich beider Spielkapitel. Die bisherige Range-Namensheuristik ist durch Prüfung der nativen Reglerbeschriftungen ersetzt. Zusätzliche Werttexte sind nach W3C APG Slider Pattern situationsabhängig; eine pauschale Pflicht zu aria-valuetext/aria-describedby war zu weitgehend (https://www.w3.org/WAI/ARIA/apg/patterns/slider/, 09.09.2026 gelesen).

Gefundene reale Lücken korrigiert: sichtbares Label für den Winkelregler; explizite Verknüpfung der Flächenregler mit ihren vorhandenen Labels, deren vorher stehendes output-Element sonst das Label erhielt. Diese Verknüpfung erfolgt in area-lab.js zur Laufzeit. Ein erster Versuch mit neuen IDs direkt im deutschen Quelltext störte die bestehende englische Modellübernahme; die Laufzeitlösung beseitigt diese Regression, ohne Übersetzungen zu ergänzen.

Die Spielrückmeldungen haben explizite Live-/Atomic-Angaben; der Sekunden-Timer ist keine automatische Live-Meldung mehr. Bestanden: Audit über 41 Kapitel (Quellprüfung plus initialisierte Flächenlabels), Erstklasskapitel, 108 Flächengeometriefälle mit vorhandenen Sprachfassungen sowie Syntax aller 87 Kapitelskripte. Kein praktischer Screenreader- oder Browsernachweis. Der vollständige 173/173-Bericht liegt vor diesen gezielt geprüften Änderungen.


### Rechenreise: freiwilliges Zeitlimit

Neue Aufgaben beginnen standardmäßig ohne Countdown. Das Zeitlimit lässt sich für folgende Aufgaben einschalten; Abschalten beendet einen laufenden Countdown sofort. Die Einstellung gilt für die laufende Sitzung.

Die neue 174. Testsuite prüft tatsächliche Initialisierung, freiwilligen Timer, Ablauf und sofortiges Abschalten sowie Känguru-Training ohne Timer und dessen Rückmeldungsattribute. Diese Suite, Mathematik-Audit über 41 Kapitel, Flächenprüfung und Erstklassprüfung bestanden vor dem Zwischenstand-Push erneut. Der letzte Gesamtlauf umfasst weiterhin 173 Suiten; kein vollständiger 174er-Lauf oder praktischer Browser-/Screenreader-Nachweis.


### DGB 2. Klasse: Datenpakete handelnd untersuchen (13.09.2026)

Die fünf dgb6-Kapitel wurden im aktuellen Bestand textlich gelesen. Im Kommunikationskapitel blieb die Netzwerkidee bisher bei einem Puzzlevergleich ohne konkretes Material. Ergänzt sind vier nummerierte Nachrichtenkarten, ein interaktiver Empfang in frei wählbarer Reihenfolge, Erkennung fehlender/doppelter Karten und fünf Vorhersage-, Vergleichs- und Transferaufträge. Die Papierfassung enthält Karten und Ablaufaufgabe; die Vergleichsauswertung bleibt im getrennten, zunächst ausgeblendeten Lösungsteil.

Das Modell ist ausdrücklich keine Netzwerkübertragung: keine Routerwege, Bestätigungen oder automatischen Wiederholungen. Byte-Sequenznummern bei TCP sind von den Wortkarten abgegrenzt; eine Lücke beweist keinen Verlust. Primärgrundlage: RFC 9293, Abschnitte 2.2 und 3.8 (https://www.rfc-editor.org/rfc/rfc9293.html, am 13.09.2026 gelesen). Kein neuer bewerteter Quizstoff und daher keine Revisionsänderung.

Neue Suite test_dgb_packet_order.js bestanden: 341 Empfangsfolgen bis Länge vier einschließlich aller Reihenfolgen und Doppelungen, gezieltes Ergänzen fehlender Karten, Rücksetzen, Fokus/Statusverknüpfung, wiederholte Initialisierung, unveränderter Quizspeicher und tatsächliche Arbeitsblattgenerierung mit separater Lösung. Bestehende 21 DGB-Arbeitsblätter, 330 Sortier-/Filterfälle und Erstklass-Transferprüfung ebenfalls bestanden. Jetzt 175 Testdateien vorhanden; kein neuer Gesamtlauf, keine praktische Browser-/Druckprüfung, keine Übersetzungen und kein weiterer Push. Vollständige Lehrplan- und Produktabnahme weiterhin offen.


### DGB: Phishing- und Quellenfälle selbstständig bearbeiten (14.09.2026)

Dgb6_kommunikation ergänzt zwei ausdrücklich erfundene Materialfälle: eine angebliche Lernportal-Nachricht mit Zeitdruck, Passwortforderung und abweichender Beispieladresse sowie eine Kette aus drei voneinander abgeschriebenen Unterrichtsausfall-Meldungen. Vier Phishing- und fünf Quellenaufträge verlangen konkrete Belege, einen unabhängigen Prüfweg und ein begründetes Zwischenurteil. Ein zweizeiliges Belegprotokoll und getrennte optionale Vergleichslösungen sind enthalten. Die .invalid-Adressen sind nicht verlinkt; es werden keine Daten erfragt oder versendet.

Alle vier bewerteten Kapitelprüfungsfragen besitzen jetzt drei fachlich plausible Antwortmöglichkeiten mit eigener Rückmeldung. Sie prüfen Paketübertragung, die Grenzen von Stil/Quellenzeile, eine unabhängige Reaktion auf verdächtige Nachrichten und die Passung von Datum/Schule eines Belegs. Revision 1 macht alte Ergebnisse veraltet. Primärquellen, am 13.09.2026 gelesen: A-SIT Präventionsmaßnahmen gegen Phishing (https://www.onlinesicherheit.gv.at/Services/Technologie-Schwerpunkte/Phishing-und-Cybercrime/Praeventionsmassnahmen-gegen-Phishing.html) und Saferinternet.at Onlineinhalte überprüfen (https://www.saferinternet.at/wie-ueberprueft-man-onlineinhalte). Die Fallgeschichten sind eigene Übungsdaten, keine echten Meldungen.

Gezielt bestanden: zwölf Antwortwege der vier bewerteten Fragen mit Rückmeldungen und Wiederholungs-IDs, alte/aktuelle Revision, Material und separate Papierlösungen, 341 Paketfolgen, 21 DGB-Arbeitsblätter sowie bestehende Revisionsprüfungen.

Der Gesamtlauf vom 2026-09-13T21:28:34.703Z endete mit 174/175 bestandenen Suiten. Einziger Fehler: der erzeugte Titelindex enthielt noch Überschriften der veralteten Sprachfassungen dieses Kapitels. Index neu erzeugt; anschließend die fehlgeschlagene Suite test_translated_title_search.js erfolgreich ausgeführt. Alle Katalogkapitel und fünf Fremdsprachen werden darin gegen die tatsächliche Inhaltsauswahl geprüft. Keine Übersetzung ergänzt. Das ist ein Gesamtlauf mit anschließend behobenem und gezielt nachgeprüftem Fehler, kein neuer 175/175-Gesamtlauf. Browser-/Drucklayout, vollständige fachliche Abnahme und Veröffentlichung bleiben offen.


### Physik-Einstieg: Messpraxis vor Formeln (14.09.2026)

Die 20 Physikkapitel und ihre hinterlegten Vorwissensbezüge wurden im aktuellen Katalog gelesen. Kein späteres Kapitel wird als gleichfachliches Vorwissen vorausgesetzt; die vorhandene Navigationsprüfung bestätigt dies. Daraus folgt keine vollständige fachliche oder amtliche Abnahme. Erneuter Abruf der dokumentierten RIS-Anlage lieferte HTTP 503; der abschließende Abgleich bleibt offen.

In sieinheiten stand die Messpraxis bisher nach Einheiten, Umrechnungen, Geschwindigkeitsformeln und Diagrammen. Neue Reihenfolge: Zahlenwert/Einheit → eigenes Messen und Messgrenzen → SI-Größen → Umrechnungen → Diagramme → mittlere Geschwindigkeit. Die Lernweg-Erklärung und Vorwissensangabe verdeutlichen diesen Aufbau. Ein dreizeiliges Messprotokoll und vier Auswertungsaufträge ergänzen den vorhandenen Heftkantenversuch. Gegenstand, Einheit, Skalenteilung und Beobachtungsbedingungen werden festgehalten; Wiederholmessung und geänderte Blickrichtung getrennt untersucht. Die Papieralternative verwendet ausdrücklich vorgegebene Zahlen und erfindet keine eigenen Messungen.

Alle 17 Prüfungsfragen und ihre IDs bleiben erhalten, keine inhaltliche Quizrevision. Gezielte Messprüfung bestanden: Zuordnung aller sieben Abschnittsfragen in der neuen Reihenfolge, sechs Antwortwege zur Messqualität inklusive Wiederholungs-IDs und Rückmeldungen sowie bisherige Geschwindigkeits-/Diagrammfunktionen. Alle 20 Physik-Arbeitsblätter bestanden; das Messprotokoll erscheint im zweiten Abschnitt. Katalognavigation, Inventar und struktureller Quiz-Audit ebenfalls bestanden. Keine Übersetzung, Browser-/Drucklayoutprüfung, praktische Versuchserprobung oder weiterer Push.


### Wirbeltiere: ausgearbeitete Merkmalswerkstatt (14.09.2026)

Alle fünf Abschnitte von bio_1_wirbeltiere einschließlich Glossaren, Trainingsaufträgen und sechs Quizfragen wurden im aktuellen Bestand vollständig textlich gelesen. Vorhanden waren Gruppenvergleich, Angepasstheit, Sonderfälle und der Auftrag, selbst einen Schlüssel zu erstellen; ein vollständig ausgearbeiteter Entscheidungsweg fehlte.

Abschnitt 4 ergänzt fünf Merkmalskarten für erwachsene Beispieltiere, vier bekannte/unbekannte Merkmalsentscheidungen, fünf Arbeitsaufträge und einen vierstufigen Ja/Nein-Schlüssel. Der interaktive Vergleich erhält bei unbekannten Angaben alle passenden Kandidaten. Kein Treffer bedeutet nur, dass keine der fünf Karten passt; ein einzelner Treffer ist keine echte Artbestimmung. Der Schlüssel und die Merkmalsbegriffe sind ausdrücklich auf diese Sammlung begrenzt. Papieraufgabe und optionale Vergleichslösung vorhanden.

Zwei fachliche Präzisierungen nach OpenStax Concepts of Biology 15.6 (https://openstax.org/books/concepts-biology/pages/15-6-vertebrates, am 14.09.2026 geöffnet): Vögel gehören stammesgeschichtlich zu den Reptilien; die fünf schulischen Vergleichsgruppen sind keine vollständige Stammbaumdarstellung. Die pauschale Lungenangabe für alle erwachsenen Amphibien nennt nun viele erwachsene Amphibien und lungenlose Salamander als Ausnahme. Keine Änderung bewerteter Quizfragen oder Revision.

Neue Suite test_vertebrate_cards.js bestanden: 81 Kombinationen gegen unabhängig festgelegte Merkmalsmengen, unbekannte/fehlende Treffer, alle fünf Entscheidungswege, Beschriftungen/Status/Fokus, Reset, Wiederinitialisierung, unveränderte Quelldaten und Lernstand sowie tatsächliche Arbeitsblattgenerierung mit getrennten Lösungen. Ein zunächst falsch benannter Arbeitsblatt-Testselektor wurde auf ws-biology-material korrigiert; abschließender Lauf bestanden. 95 STEM-Arbeitsblätter, bestehende Physik-Kernmodelle, DGB-Paketwerkstatt und Syntax aller 87 Kapitelskripte ebenfalls bestanden. Jetzt 176 Testsuiten vorhanden; kein neuer Gesamtlauf, keine Browser-/Drucklayoutprüfung, keine Übersetzung oder Veröffentlichung. Vollständige W/E/S-Matrix und fachliche Produktabnahme bleiben offen.


### Wirbeltiere: vollständiger Prüfungspool überarbeitet (14.09.2026)

Die fünf Abschnittsfragen prüfen jetzt Körperbau, fliegende Säugetiere, funktionale Deutung, unbekannte Schlüsselmerkmale und eine noch nicht eindeutige Zuordnung. Lernziel und Zusammenfassung nennen ausdrücklich die Grenzen des Schlüssels. Beim tatsächlichen Renderer-Test wurde sichtbar, dass der bewertete Pool zusätzlich sechs Fragen aus diplom.questions enthält. Damit war die vorherige Lektüre von sechs Abschnittsfragen kein vollständiger Quizabgleich des Kapitels. Diese sechs Abschlussfragen wurden ebenfalls vollständig gelesen und überarbeitet; der bewertete Pool umfasst elf Fragen, dazu bleibt eine unbewertete Delfinübung.

Die Abschlussfragen behandeln Milchversorgung statt bloßer Körperform, vergleichbare Merkmale, Entwicklungsstadium der Kaulquappe, Beobachtung versus weitgehende Deutung, unscharfe Fotos und die begrenzte Reichweite eines Kartentreffers. Sachfremde Antwortalternativen wurden durch plausible Verwechslungen ersetzt. Auch die Größenalternative der Delfinübung ist durch die Verwechslung Lungenatmung = Säugetier ersetzt. Revision 2 kennzeichnet alte Ergebnisse als veraltet.

Erweiterte test_vertebrate_cards-Suite bestanden: alle 33 Antwortwege der elf bewerteten Fragen, 100/91-Prozent-Ergebnis, passende Rückmeldung, Wiederholungs-IDs, fünf Abschnittszuordnungen, sechs unverändert kapitelweite Zuordnungen und alte/aktuelle Revision. Der zunächst zu klein angenommene Fünf-Fragen-Test wurde auf den tatsächlich vorhandenen Pool erweitert. Bestehende 81 Merkmalskombinationen, fünf Schlüsselwege und Papiermaterial ebenfalls bestanden. 95 STEM-Arbeitsblätter, Revisionsprüfung und Quizstruktur ohne Befund. Keine neue Übersetzung oder Veröffentlichung, kein neuer Gesamtlauf und keine praktische Browser-/Drucklayoutabnahme.


### Mathematik: Zuordnungen im Graphen erkunden (14.09.2026)

Die vorhandenen Abschnitte von math2_6_prop_prozent und math3_6_zuordnungen wurden vollständig textlich gelesen. Im Drittklasskapitel waren Tabelle, Modellvorschriften und Papierzeichnungen vorhanden, aber keine interaktive Verknüpfung mit dem Graphen. Ergänzt in m36_representations: Auswahl der drei vorhandenen Modelle, ganze Eingabewerte 0–6, markiertes Wertepaar, Formel und erklärende Rückmeldung. A/C verwenden dieselbe Euro-Achse, B eine eigene Stunden-Achse. Die Auswahlmarkierung verwendet zusätzlich zur Farbe einen Ring.

B hat bei x = 0 keinen Punkt und keine Division; C erklärt (0 | 5) als mathematische Fortsetzung, nicht als Zahlung ohne Bestellung. Gezeigt werden Punkte für ganze Anzahlen, keine behaupteten Zwischenkäufe. Der versehentliche Wechsel von Personen zu Pumpen in der Beschreibung der festen Modellarbeit ist durchgehend auf Personen korrigiert. Papieralternative greift die Sonderfälle und den Modellvergleich auf. Kein neuer bewerteter Stoff und keine Quizrevision.

Erweiterte test_assignment_representations bestanden: 21 Modell-/Eingabefälle, unabhängig festgelegte Wertepaare, sämtliche Punktkoordinaten und Achsengrenzen, beide Null-Sonderfälle, Beschriftungen und Werttext, Fokus, Reset, wiederholte Initialisierung und unveränderter Lernstand; außerdem tatsächliche Papieralternative ohne aktive Steuerelemente. Bestehende 15 Quizantwortwege und Preiseingaben ebenfalls bestanden. 95 STEM-Arbeitsblätter und Mathematik-Audit über 41 Kapitel bestanden. Kein neuer Gesamtlauf, keine Übersetzung, kein Browser-/Drucklayoutnachweis und kein weiterer Push.


### Synthese und Analyse am vorhandenen Versuch unterscheiden (14.09.2026)

Die vollständigen Kerntexte von Metalle/Redox und Sauerstoff/Verbrennung wurden erneut gelesen. Der vierteilige Nagelversuch untersucht bereits die Bildung neuer Eisenverbindungen. Die bisher offene pauschale Feststellung einer fehlenden Synthese-Lerngelegenheit wird präzisiert: Ein vorhandener Reaktionsversuch war angeleitet, seine Einordnung als Aufbau von Verbindungen und Abgrenzung von chemischer Zerlegung war jedoch nicht ausgearbeitet.

RSC/Nuffield, How much oxygen is used when iron wool rusts? (https://edu.rsc.org/experiments/how-much-oxygen-is-used-when-iron-wool-rusts/453.article), am 14.09.2026 direkt per HTTPS vollständig abgerufen: erläutert Eisenoxidbildung und begrenzt die einfache Wortgleichung wegen des komplexen Rostprozesses. Der dortige zusätzliche Eisenwolle-Aufbau wird nicht übernommen. ACS Coastal Chemistry ebenfalls geprüft, dessen beschleunigte Peroxid-/Salzuntersuchung jedoch nicht eingebaut.

Metalle/Redox Abschnitt 3 verknüpft nun den bestehenden Nagelversuch mit der Bildung von Verbindungen (Synthese), der angeleiteten Peroxidzerlegung und der physikalischen Filtration. Dreizeilige Vergleichstabelle, fünf Aufgaben, getrennte Beobachtung/Deutung, begrenztes Wortschema und optionale Papierlösung. Rost wird ausdrücklich nicht als einheitlicher Reinstoff ausgegeben; sichtbare Veränderung bestimmt keine genaue Zusammensetzung. Mechanische Beschädigung und chemischer Aufbau werden getrennt. Keine neuen Chemikalien oder Durchführungsbedingungen. Ohne Versuch bleiben eigene Beobachtungen leer.

Zwei neue bewertete Fragen, Revision 3. Alle 33 Antwortwege der elf tatsächlichen Kapitelprüfungsfragen bestanden, einschließlich 100/91-Prozent-Ergebnis, Rückmeldungen, Wiederholungs-IDs, Abschnittszuordnung der Ergänzungen und alter Revision 2. Vier Rostmodellzustände mit Tastaturbedienung, Peroxidbaukasten und 95 STEM-Arbeitsblätter ebenfalls bestanden. Inventar und Quizstruktur aktualisiert: 1523 gespeicherte Frageninstanzen in den fünf priorisierten Fächern. Kein neuer Gesamtlauf, keine Übersetzung und keine Veröffentlichung.

Die didaktische Verbindung zu einer vorhandenen Syntheseuntersuchung ist damit hergestellt. Praktische Erprobung im Schulraum und Produktanalytik bleiben unbewiesen. Eine gezielte Herstellung eines einzelnen reinen Stoffes ist nicht Gegenstand dieses Rostversuchs; die gesamte Chemieabnahme bleibt offen.


### Vollständiger Funktionstest nach den Fachergänzungen

2026-09-13T22:39:31.383Z: **176/176 Funktionstestsuiten bestanden**, Exit 0. Dieser Gesamtlauf umfasst die DGB-Paket- und Quellenwerkstatt, den korrigierten Titelindex, den neu geordneten Physik-Messeinstieg, die Wirbeltier-Merkmalsauswahl samt elf überarbeiteten Prüfungsfragen, den Zuordnungsgraphen in Mathematik und den Synthese-/Analysevergleich in Chemie. Es war kein gezielter Nachlauf zur Behebung eines Fehlers erforderlich.

Zusätzlich bestanden: Syntax aller 87 Kapitelskripte, Mathematik-Audit über 41 Katalogkapitel (Quellprüfung plus initialisierte Flächenlabels) und Physik-Audit über 20 Katalogkapitel (davon drei mit gemeinsamer Laufzeit; statische Quellprüfung). Diese Prüfungen ersetzen keine tatsächliche Browser-, Screenreader- oder Drucklayoutprüfung und keine vollständige fachliche Lehrplanabnahme. Der aktuelle Lehrplan-Quellenstand ist getrennt in LEHRPLAN_QUELLENSTAND.md dokumentiert. Keine Übersetzung ergänzt und kein weiterer GitHub-Push.


### GitHub-Zwischenstand: Fachergänzungen und Diagrammprüfung (14.09.2026)

Zusätzlich zum zuletzt vollständig geprüften Stand enthält DGB, dritte Klasse (dgb7_information), eine Diagrammwerkstatt mit ausdrücklich fiktiven Gruppen: 40 bzw. 44 Ja-Antworten bei jeweils 50 Befragten. Dieselben Daten lassen sich mit Achsenbeginn 0 oder 36 darstellen. Sechs Arbeitsaufträge unterscheiden Zahlenvergleich, Darstellungswirkung und unzulässigen Ursachenschluss aus einer Befragung zur Hilfreichkeit. Papieralternative und getrennte Vergleichslösung sind vorhanden. Drei bewertete Fragen wurden angepasst; Kapitelrevision 1 kennzeichnet ältere Ergebnisse.

Gezielte Prüfung vor diesem Zwischenstand bestanden: neue test_dgb_chart_baseline-Suite (beide Skalen, Rückwechsel, unveränderte Daten, Beschriftungen/Fokus, wiederholte Initialisierung, alle elf Antwortwege der vier bewerteten Fragen, Revisionen und getrennte Arbeitsblattlösungen), 21 DGB-Arbeitsblätter, Paketwerkstatt, übersetzter Titelindex und JavaScript-Syntax von core-learning.js. Der Quiz-Audit meldet weiterhin 1523 Frageninstanzen ohne Strukturfehler. Eine anfänglich falsch geschriebene Lösungszeichenfolge im neuen Test wurde an die vorhandene Schreibweise angepasst; der abschließende Testlauf bestand.

Es gibt jetzt 177 Testsuiten. Der letzte vollständige Lauf war 176/176 erfolgreich vor der Diagrammwerkstatt; danach erfolgten die genannten gezielten Prüfungen. Keine neuen Übersetzungen. Fachliche Gesamtprüfung, Browser-/Drucklayoutabnahme und Prüfung des veröffentlichten GitHub-Pages-Stands bleiben offen. Dieser Stand ist eine Zwischensicherung, keine abschließende Produktabnahme.


### Materialplaner für DGB Klasse 3 und präzisierte Programmierfragen (14.09.2026)

Nach dem auf GitHub gesicherten Zwischenstand d7f0c57 wurde lokal weitergearbeitet. Neue ausführbare HTML-Werkstatt: Mengenplanung für einen fiktiven Klassenworkshop, drei Materialarten, null bis acht Gruppen, Datenliste und for…of-Schleife. Der Kapitelauftrag führt von Zerlegen/Muster/Abstraktion zu einer gespeicherten und ausgeführten eigenen JavaScript-Änderung sowie Testprotokoll und Materialerweiterung. Eingabefehler entfernen die alte Ergebnistabelle. Originaldaten und tatsächlich ausgeführter Code sind in der eigenen Dateiversion sichtbar. Keine Eingabenspeicherung, kein Konto und keine externen Laufzeitabhängigkeiten.

DGB3 Produktion: sechs bewertete Fragen, Revision 1. DGB4 Produktion: alle sechs bewerteten Fragen geprüft; vier generische Fragen ersetzt, insbesondere Bedingung und Wenn-dann-Anweisung sauber getrennt, Revision 3. Lernziele, Papiermaterial und aktueller Titelindex angepasst. Quiz-Audit: 1525 gespeicherte Frageninstanzen in den fünf Prioritätsfächern, keine Strukturfehler; Inventar weiterhin 197 Kapitel.

Neue test_material_programming-Suite und erweiterte test_raster_programming bestanden: 27 Materialplan-Konfigurationen, 936 Rasterkonfigurationen und jeweils alle 18 bewerteten Antwortwege; Änderungen, Grenzfälle, Revisionen und Wiederholungs-IDs. Zusätzlich bestanden: 21 DGB-Arbeitsblätter, 95 STEM-Arbeitsblätter, Titel-/Sprachauswahl und DGB-Ressourcenfilter. Jetzt 178 Testsuiten; kein erneuter Gesamtlauf. Diese Prüfungen sind DOM-/Laufzeitprüfungen, keine tatsächliche Browser-, Screenreader- oder Drucklayoutabnahme. Neue Arbeiten noch lokal, kein weiterer Push oder Übersetzungsauftrag.


### Erste tatsächliche Browserabläufe und mobile Korrekturen (14.09.2026)

Der vorherige Zielturn war Umsetzungsfortschritt; dessen Materialplaner und Prüfungsfragen bleiben im lokalen Arbeitsstand erhalten. In diesem Schritt wurde erstmals in dieser Prüfserie ein separater Chromium-Browser mit isolierten Kontexten eingesetzt. Die integrierte Browsersteuerung fiel nach lesendem Zugriff aus; dies war kein fachlicher Blocker, die Tests wurden im separaten Browser ausgeführt. Die laufende lokale Vorschau war erreichbar.

Behoben: unsichtbare Menüpunkte in der Tab-Reihenfolge bei eingeklapptem Menü, fehlende Fokusübergabe beim Schließen, Überbreite der Punkteanzeige und deren Überlagerung der Hauptnavigation auf schmalen Bildschirmen. Zusätzlich Pseudocode-Umbruch und beschriftete, per Tab/Pfeiltaste bedienbare Scrollbereiche für die beiden breiten Protokolltabellen in DGB3 Produktion. Layoutänderungen verändern keine bewerteten Antworten; keine zusätzliche Kapitelrevision erforderlich.

Browsertest vom 2026-09-13T23:18:14.511Z: sechs zentrale Abläufe bestanden, keine JavaScript-Seitenfehler. 390 × 844 und 1280 × 900: Menü/Sprachauswahl/Escape, Kapiteleinstieg, echtes Quiz mit 83-Prozent-Auswertung, sichtbarer und fokussierter Wiederholungsabschnitt, Stoffauswahl sowie Öffnen des Links in einem frischen Empfängerkontext ohne Ergebnisse des anderen Kontexts. Screenshots tatsächlich gelesen; separate Breitenmessung für das DGB-Kapitel auch bei 320 Pixeln. Einzelheiten und Reproduktion: BROWSER_PRUEFUNG.md.

Gesamtlauf 2026-09-13T23:17:55.688Z: 178/178 Funktionstestsuiten bestanden, Exit 0. Die abschließende Umstellung der beiden Protokolltabellen auf Scrollbereiche erfolgte während dieses Laufs; DGB-Arbeitsblätter und Materialplaner wurden deshalb danach zusätzlich gezielt erfolgreich geprüft. Der zuletzt ausgeführte Browsertest umfasst den fertigen Scrollbereich samt nativer Tab- und Pfeiltastenbedienung. Kein Anspruch einer unverändert eingefrorenen Quellversion während des gesamten Node-Laufs. Syntaxprüfung und git diff --check ohne Fehler.

Das ist ein Teilnachweis für Bedienbarkeit und Lernwege, keine vollständige visuelle Abnahme aller Kapitel. Systematische Kontrastprüfung, weitere Kapitel/Browser/Geräte, Screenreader, Druckausgaben und veröffentlichte Fassung bleiben offen. Neue Arbeiten lokal; kein weiterer Push und keine neuen Übersetzungen.


### Gemeinsame Tabellenansicht und lesbarere Farben (14.09.2026)

Der vorherige Zielturn brachte überprüfbare Browser- und Umsetzungsergebnisse. Der aktuelle Arbeitsstand wurde erneut geprüft; die lokale Vorschau ist erreichbar. Neuer Browser-Breitentest über sämtliche 136 Prioritätskapitel: zunächst 42 Seitenüberläufe, nach gemeinsamer Tabellenaufbereitung 2, nach SVG-/Dateinamenkorrektur 0. Der abschließende Bericht stammt von 2026-09-13T23:31:16.999Z. Alle 136 Kapitel erreichten den erwarteten Kapitelprüfungszustand; kein nicht abgefangener Seitenfehler. Das prüft anfängliche Darstellung bei 390 × 844 Pixeln, nicht alle Interaktionszustände.

Neue gemeinsame responsive-content.js für vorhandene und dynamische Tabellen; begrenzte Scrollbereiche, Beschriftung, Tab-Stopp nur bei Bedarf, Größenwechsel und unveränderte Tabelleninhalte. Tatsächlicher Browser-Regressionstest für Wirbeltier-Merkmalsauswahl/Reset und späte Tabellenänderungen bestanden. Sechs zentrale Lern-/Unterrichtsabläufe erneut erfolgreich im Browser geprüft.

Gemeinsame Überschriften-, Link-, Schaltflächen- und Fokusfarben getrennt und lesbarer gestaltet; Mathematik-Grün/Violett bleibt erkennbar. 55 gemessene Text-/Hintergrundpaare aus fünf Kapiteln in beiden Farbschemata erreichen mindestens 4,5:1 (Minimum 5.48:1). Screenshots gelesen. Einzelheiten und Grenzen in BROWSER_PRUEFUNG.md.

Gezielte Node-Prüfungen nach den Änderungen bestanden: vollständige Renderer-/Kernkapitelintegration, Wirbeltierkarten, Messgrundlagen, 21 DGB-Arbeitsblätter, Quizfokus und Betrieb bei verweigertem Speicherzugriff. Neue Skripte syntaktisch geprüft. Kein erneuter 178-Suiten-Gesamtlauf; dessen vorheriger Bericht bleibt zeitlich getrennt. Die neuen Browserprüfungen stehen außerhalb des DOM-Funktionstestrunners und benötigen Playwright sowie eine laufende Vorschau.

Keine bewertete Frage und keine Übersetzung verändert. Aktuelle Ergänzungen noch lokal. Weitere Farbpaare und Interaktionszustände, die nachrangigen Fächer, andere Browser/Geräte, Screenreader und Druckausgaben sowie fachliche Gesamtabnahme und veröffentlichte Fassung bleiben offen.

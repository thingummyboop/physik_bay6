# Browserprüfung des Lernwegs – 14.09.2026

Die anschließende Prüfung von PDF-Druckseiten, Tabellenumbrüchen und Formel-Ladezuständen ist separat in [DRUCK_PRUEFUNG.md](DRUCK_PRUEFUNG.md) dokumentiert.

Geprüft wurde die aktuelle lokale Vorschau unter `http://127.0.0.1:4173`, ausgehend von GitHub-Zwischenstand `d7f0c57` einschließlich der danach vorgenommenen lokalen Änderungen. Dies ist keine Prüfung des veröffentlichten GitHub-Pages-Stands.

## Umgebung und Umfang

Ein separater Chromium-Testbrowser (151.0.7922.34) führte die Abläufe mit frischen, isolierten Browserkontexten aus. Der vorhandene Nutzerbrowser und dessen gespeicherte Ergebnisse wurden nicht für Testeingaben verwendet. Die integrierte Browsersteuerung konnte zunächst den alten und einen neu geöffneten Tab auslesen, fiel anschließend mit einem Initialisierungsfehler aus; die Interaktion und Screenshots stammen aus dem separaten Testbrowser.

Der reproduzierbare Ablauf steht in `scripts/browser_learning_smoke.js`. Er benötigt Playwright mit installiertem Chromium und eine laufende Vorschau. Er ist bewusst kein Teil des ausschließlich auf Node/JSDOM beruhenden Funktionstestrunners.

```powershell
node scripts/browser_learning_smoke.js
```

Bei abweichender Umgebung können `SCIVERSE_PREVIEW_URL` und `SCIVERSE_BROWSER_REPORT_DIR` gesetzt werden. Playwright muss für Node auflösbar sein; bei einer separat bereitgestellten Installation kann dafür `NODE_PATH` verwendet werden. `PLAYWRIGHT_BROWSERS_PATH` wählt bei Bedarf das Verzeichnis der installierten Browser. Ohne diese Voraussetzungen behauptet das Skript keinen erfolgreichen Browserlauf.

## Beobachtete Fehler und Änderungen

- Das eingeklappte Menü lag außerhalb des Bildschirms, blieb jedoch in der Tab-Reihenfolge. Nach den beiden sichtbaren Hauptschaltflächen fokussierte Tab die unsichtbare Sprachauswahl. Ein gemeinsamer Zustandswechsel setzt nun `inert`, `aria-hidden` und `aria-expanded` zusammen. Befindet sich der Fokus im Menü, wird er vor dem Schließen auf die Menüschaltfläche gesetzt. Escape schließt zuerst eine offene Sprachauswahl und anschließend das Menü.
- Die Punkteanzeige überschritt wegen `width: 100%` plus Innenabstand die Bildschirmbreite und überlagerte auf schmalen Bildschirmen die Hauptnavigation. `border-box` begrenzt ihre Breite. Unter 761 CSS-Pixeln scrollt sie mit dem Kapitel mit; eingebettete Kapitel reservieren Platz für die äußere Navigation. Während des Kapitelquiz bleibt sie ausgeblendet.
- Im Kapitel `dgb7_produktion` erzeugten Pseudocode und zwei Protokolltabellen horizontalen Seitenüberlauf. Der Pseudocode bricht jetzt um. Die beiden breiten Tabellen besitzen beschriftete, fokussierbare Scrollbereiche; Pfeiltasten verschieben sie, ohne die gesamte Seite zu verbreitern. Die Tabelle mit den drei Materialvorgaben passt direkt in den Inhaltsbereich. Ein zunächst versuchtes Zusammenpressen aller Spalten wurde nach Screenshotprüfung wegen schlechter Wortumbrüche durch die Scrollbereiche ersetzt.

## Tatsächlich durchlaufene Fälle

1. **390 × 844:** Frischer Einstieg, native Tab-Reihenfolge vom Menü über das Zeugnis direkt in den Lernbereich, Öffnen des Menüs, Sprachauswahl und zweimal Escape mit sichtbarem Fokus.
2. **390 × 844:** DGB-Kapitel über die Fachnavigation öffnen; Menü wird geschlossen und ist nicht fokussierbar. Seitenbreite entspricht der Bildschirmbreite. Protokolltabelle per Tab/Pfeiltaste bedienen.
3. **390 × 844:** Tatsächliches Sechs-Fragen-Kapitelquiz beantworten, absichtlich eine falsche Antwort wählen, 83-Prozent-Auswertung lesen und die gespeicherte Wiederholungs-ID prüfen. Über die Rückmeldung zurück zum passenden Abschnitt; dessen Überschrift ist fokussiert und nach Ende des Scrollens unterhalb der Hauptschaltflächen sichtbar.
4. **390 × 844:** Zur Stoffliste zurückkehren, Unterrichtsmodus wählen, zwei Physikkapitel auswählen und einen Link erstellen.
5. **1280 × 900:** Diesen Link in einem weiteren frischen Browserkontext öffnen. Die Reihenfolge `sieinheiten`, `optik1` wird übernommen; die Ergebnisse des anderen Kontexts fehlen wie vorgesehen.
6. **1280 × 900:** Menü einklappen und Fokusübergabe auch im breiten Layout prüfen.

Alle sechs Abläufe bestanden ohne JavaScript-Seitenfehler. Screenshots von mobilem Einstieg, Wiederholungsziel, fokussierter Tabelle und breiter Stoffliste wurden zusätzlich visuell gelesen. Eine ergänzende Breitenmessung des DGB-Kapitels bei 320, 390 und 768 Pixeln Außenbreite zeigte keinen horizontalen Seitenüberlauf. Sie ersetzt keinen vollständigen Bedienungsdurchlauf bei allen drei Größen.

## Verbleibende Grenzen

Diese Prüfung deckt ausgewählte zentrale Abläufe und ein DGB-Kapitel ab. Alle Kapitel, unterschiedliche Endgeräte und Browser, systematische Farbkontraste, Screenreader und tatsächliche Druckausgaben sind damit nicht vollständig abgenommen. Der alte, lange offen gebliebene Vorschautab zeigte noch frühere „geplant“-Einträge; eine frisch geladene aktuelle Vorschau zeigte den heutigen Katalog. Es wurde keine automatische Aktualisierung bestehender Nutzertabs eingeführt.

Die Arbeiten und Prüfungen gehören zum lokalen Entwicklungsstand. Übersetzungen und Veröffentlichung wurden in diesem Schritt nicht erweitert.


## Erweiterung: fünf priorisierte Fächer, Tabellen und Kontraste

Am 14.09.2026 wurden mit scripts/browser_priority_layout.js alle 136 verfügbaren Kapitel aus Physik, Mathematik, Chemie, Biologie und DGB in der tatsächlichen lokalen Vorschau bei 390 × 844 CSS-Pixeln geöffnet. Der erste Durchlauf fand 42 Seiten mit horizontalem Überlauf. Die meisten Ursachen waren Tabellen; hinzu kamen lange Pseudocodezeilen, feste SVG-Größen und nicht umbrechende Beispieldateinamen.

js/responsive-content.js ergänzt begrenzte Scrollbereiche um Tabellen, die noch keinen solchen Bereich besitzen. Originaltabellen, Zellinhalte, IDs und Ereignisbindungen bleiben erhalten. Nur tatsächlich überbreite Tabellen erhalten einen Tab-Stopp und eine Regionsbeschriftung aus Bildunterschrift, Abschnittsüberschrift oder Tabellenkopf. Ein ResizeObserver und ein MutationObserver berücksichtigen Größenwechsel sowie später erzeugte oder aktualisierte Tabellen; bestehende Scrollbereiche werden nicht doppelt eingepackt. Es werden keine Lernstände geschrieben. Pseudocodezeilen und Beispieldateinamen umbrechen; SVGs mit viewBox in Abbildungen passen sich dem verfügbaren Platz an.

Der abschließende Durchlauf vom 2026-09-13T23:31:16.999Z meldet 136 geladene Kapitel, 0 horizontale Seitenüberläufe und 0 nicht abgefangene JavaScript-Seitenfehler. Diese Messung prüft die anfängliche Darstellung nach dem Rendern, nicht alle Modellzustände, Medieninhalte, Fehlerfälle oder Bildschirmgrößen. Weiterhin sichtbare horizontale Bewegung innerhalb einer begrenzten Tabelle ist beabsichtigt.

Scripts/browser_responsive_tables.js prüft außerdem im echten Browser: schmal → breit → schmal, passende Aktivierung/Entfernung des Tab-Stopps, Pfeiltasten, unveränderte Quelldaten, die weiterhin funktionierende Wirbeltierauswahl und deren Reset, spät hinzugefügte/vergrößerte Tabellen, keine verschachtelten Wrapper und keine Änderung am Quizspeicher. Der Ablauf bestand. Der bestehende sechs Fälle umfassende Browser-Lernwegtest bestand danach ebenfalls.

### Kontrastmessungen

Die bisherigen gemeinsamen orangefarbenen Überschriften und weißen Beschriftungen auf hellen Schaltflächen waren zu kontrastarm. Im Mathematikfarbschema betraf dies zusätzlich das helle Grün des Untertitels. Überschriften, Schaltflächen und Fokusränder haben nun getrennte Farbvariablen. Dekorative Akzentfarben bleiben unabhängig von den Textfarben. Das Mathematikfarbschema verwendet weiterhin Grün und Violett, mit dunkleren Flächen bzw. Texten im hellen Modus. Im dunklen Modus wurden auch ungestaltete Kapitelverweise und die blauen Fachworttitel der DGB-Karten berücksichtigt.

Scripts/browser_readability.js prüfte am 2026-09-13T23:34:39.600Z insgesamt 55 konkrete Text-/Hintergrundpaare in fünf Kapiteln und beiden Farbschemata: Abschnittsüberschrift, Untertitel, Lernwegschaltfläche, Abschnittslink, Abgabeschaltfläche sowie die vorhandenen Arbeitsblattzugänge und einen dunklen Fachworttitel. Nach dem Ende der Farbübergänge werden die tatsächlichen CSS-Farben aus dem Browser ausgewertet. Alle geprüften Paare erreichen mindestens 4,5:1; das kleinste gemessene Verhältnis beträgt 5.48:1. Helle und dunkle Screenshots wurden gelesen. Nicht sämtliche Inline-Farben, Grafiken, Hover-/Fehlerzustände und Farbpaarungen der Webseite sind damit abgenommen.

Fachliche Grundlage der Kontrastberechnung: [W3C WAI, Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), am 14.09.2026 geöffnet. Die Erläuterung nennt 4,5:1 für gewöhnlichen Text und 3:1 für ausreichend großen Text. Für diese ausgewählten gemeinsamen Elemente wurde einheitlich die strengere 4,5:1-Schwelle geprüft, ohne die Messwerte für die Pass-/Fail-Entscheidung aufzurunden. Eine vollständige WCAG-Konformität wird daraus nicht abgeleitet.

## Übungsantworten und Quellenaufgabe, 14.09.2026

Astronomie: 255 native Antwortauswahlen mit eigenen wiederholbaren Rückmeldungen und unveränderter Übungsspeicherung geprüft, vollständiger 39-Fragen-Kapitelcheck mit gezielter Wiederholung einer verschobenen Abschlussfrage. Bericht vom 2026-09-14T01:15:02.860Z. Separater Test browser_practice_feedback_contrast.js prüft richtige und falsche Schaltflächen samt Rückmeldung im hellen/dunklen CSS-Themenzustand für je ein Kapitel aller fünf Prioritätsfächer. Abschließend 40 Paare mit mindestens 7,01:1, Bericht vom 2026-09-14T01:15:43.205Z. Die vorher entdeckten transparenten Antwortflächen und vorübergehend schlecht lesbaren Farbüberblendungen wurden korrigiert. Ausgewählte Screenshots gelesen; keine globale Kontrastabnahme. Details in ASTRONOMIE_FRAGENPRUEFUNG.md.

### 14.09.2026 – Sonnensystem im Maßstab

Chromium 151.0.7922.34, Bericht 2026-09-14T01:35:56.838Z: 48 Modellzustände, proportionale tatsächlich gerenderte Balken, Tastaturauswahl und Reset/Fokus, sechs neue Übungsantworten, Papierdaten und getrennte Lösungen. Breiten 320/390/1280 ohne Seitenüberlauf. Die Modellwerttabelle passt bei 390 px und benötigt keinen Scrollfokus. Mobile Ansichten und ausgewählte Druckseiten visuell geprüft; Quellenlisten bleiben beim Seitenwechsel zusammen. Keine vollständige erneute Browserprüfung aller Astronomiefragen oder aller Fächer. Details: ASTRONOMIE_SONNENSYSTEM_MODELL.md.

### 14.09.2026 – Astronomie-Abbildungen

Alle 22 externen Bilder dekodiert; 132 Zustände über drei Bildschirmbreiten und zwei Designs auf natürliche Seitenverhältnisse und Einpassen geprüft. Bildunterschrift-/Linkkontrast mindestens 6,06:1. Nativer Tastaturlink zur Quelldatei und Rückkehrfokus erfolgreich. Konkrete vorherige Beschnittfehler an Merkur und kosmischer Zeitleiste behoben; ausgewählte Screenshots visuell verglichen. Browserbericht 2026-09-14T01:48:23.494Z, Chromium 151.0.7922.34. Umfang und Grenzen: ASTRONOMIE_ABBILDUNGEN.md.

### 14.09.2026 – Chemie-Trennplanung

Chromium 151.0.7922.34, Bericht 2026-09-14T02:04:37.667Z: 140 native Kombinationen, vollständige Vorschau gewählter Optionen, bearbeitbare Rückmeldung, Reset/Fokus und unveränderte Modellspeicherung. Neun-Fragen-Check mit 89 % und gezieltem Wiederholungsabschnitt bestanden; 320/390/1280 ohne Seitenüberlauf. Ausgewählte mobile/dunkle Screenshots und Seiten des zehnseitigen A4-Exports gelesen. Kurze Auswahlbezeichnungen mit vollständigem Erklärungstext beheben vorherige mobile Kürzungen; Papieraufträge erscheinen einmal, Versuchsüberschrift bleibt bei der Tabelle. Umfang und Grenzen: CHEMIE_TRENNPLANUNG.md.


## 14.09.2026 – Stoffliste über kopierte und gedruckte Kapitelverweise erhalten

Native Online-Kapitel-Links verwenden jetzt dieselbe Route wie die Öffnen-Knöpfe: Modus, aktuelle Kapitelreihenfolge und unbekannte Einträge bleiben auch auf einem anderen Gerät erhalten. Unterrichtsvorschau ohne Auswahl behält ihren Modus. 19 zugehörige Funktionstests bestanden; separater Chromium-Test mit sechs Kapiteln aus allen fünf priorisierten Fächern, drei Modi, neuer Empfängerumgebung, Tastaturnavigation und 320/390/1280 Breite. Vierseitiges A4-PDF vollständig visuell gelesen, alle sechs Kapitelziele in den PDF-Annotationen geprüft. Umfang, Berichte und Grenzen: [STOFFLISTEN_KAPITELLINKS.md](STOFFLISTEN_KAPITELLINKS.md). Keine Gesamtfreigabe oder neue Veröffentlichung.


## 14.09.2026 – Gesamtlauf und unabhängige Saturnkorrektur

Alle 182 vorhandenen Funktionstestsuiten bestanden im vollständigen Lauf; 197 deutsche Kapitel im gemeinsamen Renderer ohne Strukturfehler. Der anschließende Live-Screenshot-Abgleich zeigte dennoch eine falsche Zuordnung von Antwortmarkierung und Rückmeldung bei der Saturn-Quellenübung. Drei Optionen lokal korrigiert; neue, von den gespeicherten Flags unabhängige Erwartungen scheiterten davor und bestanden danach. Vollständige Astronomie-Integrationsprüfung und tatsächlicher Browserlauf erneut erfolgreich. Sieben zentrale Dateien des gepushten Zwischenstands b154b4e auf GitHub Pages verglichen; fünf Browserprüfungen dort ausgeführt. Dies ist keine fachliche Gesamtfreigabe. Details, zeitliche Trennung der Prüfläufe und verbleibender Live-Fehler: [FUNKTIONS_PRUEFUNG_2026-09-14.md](FUNKTIONS_PRUEFUNG_2026-09-14.md). Kein weiterer Push, Übersetzungen weiterhin zurückgestellt.


## 14.09.2026 – DGB3: Leseeinstellungen ausführen und prüfen

Neue eigenständige Leseanwendung mit 18 tatsächlichen Schrift-/Abstands-/Farbkombinationen, ausdrücklichem Speichern/Laden/Löschen und bedienbarer Ansicht bei gesperrtem Speicher. Kapitel- und Downloadintegration, sechs begründete Arbeitsaufträge, vier Protokollzeilen mit eigenem Schreibraum im Druck und separate Vergleichslösung. Zwei neue Prüfungsfragen, acht bewertete Fragen insgesamt, Revision 2. DOM-Prüfung der Einstellungsmöglichkeiten sowie 24 Kapitelantwortwege bestanden; 54 tatsächlich gemessene Browserzustände, Download und lokale Dateiausführung, Tastatur und Speicherzyklus geprüft. Gemeinsamer Browser-Lernweg mit aktuellem Quizpool erneut bestanden. Quellen, ausgewählte Druckseiten und genaue Grenzen: [DGB_LESEANSICHT.md](DGB_LESEANSICHT.md). Betriebssystem-/Kommunikationskonfiguration und mediale Darstellungsvergleiche bleiben eigene offene Teile. Keine Übersetzungen, kein Push und kein neuer Gesamtlauf aller jetzt 183 Suiten.


## 14.09.2026 – DGB3: System und Kommunikation gezielt einstellen

Nach dem bestätigten Push von 8415e67 zwei praktische Konfigurationsaufgaben mit acht Protokollzeilen und getrennten Lösungen ergänzt. Systemschrift und Chat-Benachrichtigungen werden mit Ziel, Ausgangswert, passendem Vorher-Nachher-Test, Ausnahmen und kontrollierter Rückkehr bearbeitet. Drei neue Transferfragen; 13 bewertete Fragen, Revision 4. Alle 39 bewerteten Antwortwege und die neuen neun nativen Tastaturantwortwege bestanden; sechs Breiten-/Designzustände ohne Seitenüberlauf, gezielte Wiederholung und gemeinsamer Browser-Lernweg geprüft. Protokollbreiten und Druckumbrüche nach Sichtprüfung verbessert. Nachweise, Quellen und Grenzen: [DGB_SYSTEM_KOMMUNIKATION.md](DGB_SYSTEM_KOMMUNIKATION.md).

Die konkrete Unterrichtserprobung mit Schulgeräten und Kommunikationskonten sowie vollständige Lehrplan-/Produktabnahmen bleiben offen. Keine Übersetzungen und kein weiterer Push. 184 Funktionstestsuiten, kein neuer Gesamtlauf. Inventar 197 Kapitel; Prioritätsaudit 1539 Frageninstanzen ohne Strukturfehler. Der Gesamtauftrag ist weiterhin aktiv.


## 14.09.2026 – Biologie-Modelle im Browser und Selektionsfragen vollständig prüfen

Vollständiger Funktionstest vor den neuen Biologie-Änderungen: 184/184 Suiten bestanden (2026-09-14T03:21:02.945Z). Danach die sechs bisher getrennten Selektions-Abschlussfragen überarbeitet und passenden Abschnitten zugeordnet. Weiterhin elf bewertete Fragen, Revision 3; 33 Antwortwege unabhängig geprüft. Die erfundene Faltertabelle ist ausdrücklich vom Papiermodell mit Verdopplungsregel getrennt. Zahleneingaben, Protokollgestaltung und Schreibraum verbessert.

Abschließender tatsächlicher Browserlauf 2026-09-14T03:28:17.244Z: 81 Merkmalskombinationen, 121 eingegebene Rechenfälle, 33 Selektionsantwortwege per Tastatur, zwei Kapitelchecks mit gezielter Wiederholung, zwölf Breiten-/Designzustände und Tabellen bis zum rechten Rand per Pfeiltasten. Mobile Ansichten sowie ausgewählte A4-Seiten tatsächlich gelesen. Gezielte Funktionstests nach den Änderungen bestanden. Umfang, Quellen, zeitliche Trennung der Tests und offene Grenzen: [BIOLOGIE_MODELLE_PRUEFUNG.md](BIOLOGIE_MODELLE_PRUEFUNG.md). Praktische Natur-/Unterrichtserprobung und vollständige fachliche Abnahme bleiben offen. Keine Übersetzungen oder Veröffentlichung; Gesamtauftrag weiterhin aktiv.


## 14.09.2026 – Evolution vollständig prüfen und eigene Aufgaben erhalten

Alle 13 bewerteten Evolutionsfragen einschließlich der acht vorher getrennten Abschlussfragen gelesen und geprüft. Sieben Abschlussfragen überarbeitet, eine passende beibehalten; alle acht passenden Abschnitten zugeordnet. Revision 3. 15 allgemeine Trainingskarten durch konkrete Aufgaben ersetzt. Der tatsächliche Renderer verdrängte diese Karten zunächst durch generierte Standardtexte; der vorhandene direkte Aufgabenmodus erhält sie jetzt. Derselbe nachgewiesene Fehler wurde für die 15 bereits ausgearbeiteten Blütenpflanzen-Aufgaben behoben.

Gezielte Tests: 72 Evolutions-/Selektionsantwortwege, genaue Übungs-/Wiederholungszuordnung, Erhaltung sämtlicher 30 Kartentexte, 121 Selektionsrechnungen und 95 STEM-Arbeitsblätter bestanden. Nativer Browserbericht 2026-09-14T03:42:33.782Z: 42 Evolutionsoptionen per Tastatur, zwei Kapitelversuche mit gezielter Wiederholung, zwölf Breiten-/Designzustände für beide Kapitel, Papierausgabe mit 13 Fragen und 20 Glossareinträgen. Ausgewählte mobile Ansichten und A4-Seiten gelesen. Details und Grenzen: [BIOLOGIE_EVOLUTION_AUFGABEN.md](BIOLOGIE_EVOLUTION_AUFGABEN.md). Kein neuer Gesamtlauf nach den Biologie-Änderungen; der letzte vollständige Lauf davor bestand mit 184/184. Keine Übersetzungen und kein Push. Vollständige Fach-/Lehrplanabnahme und Unterrichtserprobung bleiben offen.


## Blütenpflanzen – 14.09.2026

Abschließender Bericht 2026-09-14T04:05:54.818Z: 36 native Antwortwege, 24 Modell-/Breiten-/Designzustände, Tastaturauswahl und Rücksetzen, zwei 91-Prozent-Kapitelversuche mit passendem Wiederholungsfokus, Revision 2. Papieralternative mit statischem Schema, 15 Trainingskarten, 25 Glossareinträgen und Keimprotokoll geprüft. Mobile Modellansichten und ausgewählte Seiten der 24-seitigen A4-Ausgabe tatsächlich gelesen; fehlende Papiergrafik, zu kleine Beschriftungen, doppelte Hinweise und Glossarumbruch behoben. Keine Seitenfehler gemeldet. Umfang und Grenzen: [BIOLOGIE_BLUETENPFLANZEN.md](BIOLOGIE_BLUETENPFLANZEN.md).


## Lebensräume – 14.09.2026

Abschließender Bericht 2026-09-14T04:20:16.708Z: 36 native Übungsantworten, 36 Kombinationen aus Netz-Zustand, Breite und Design, Tastaturauswahl und Rücksetzen, drei passende beziehungsweise per Tastatur bis zum rechten Rand bedienbare Tabellen, zwei 91-Prozent-Kapitelversuche mit passendem Wiederholungsfokus. Papierausgabe mit elf Fragen, 15 Trainingskarten, 23 Glossareinträgen, statischem Netz und Protokoll geprüft. Mobile Darstellungen und ausgewählte Seiten der 23-seitigen A4-Ausgabe tatsächlich gelesen; Schreibspalten im Protokoll nach Sichtprüfung verbreitert. Keine gemeldeten Seitenfehler. Umfang und Grenzen: [BIOLOGIE_LEBENSRAEUME.md](BIOLOGIE_LEBENSRAEUME.md).

Separater Quellenabgleich am 14.09.2026: Die veröffentlichte deutsche Kapiteldatei auf GitHub Pages lieferte HTTP 200 und entsprach nach JSON-Auswertung vollständig lang/de.json aus Commit 7c99011. Dies bestätigt die veröffentlichte Kapitelquelle dieses Zwischenstands, nicht alle Skripte, Medien oder Browserwege. Neuere lokale Pflanzen- und Lebensraumänderungen sind darin nicht enthalten.


## 16.09.2026 – Wirbeltiere und Haustiere

Wirbeltiere erneut nach der letzten Beschriftungskorrektur geprüft: Bericht 2026-09-16T08:08:21.523Z, 81 Merkmalskombinationen, 42 native Übungsantworten, zwei Kapitelchecks, sechs Breiten-/Designzustände und Papierausgabe. Gruppen, Vergleichsfälle, Protokoll und Lösungen auf ausgewählten Druckseiten tatsächlich gelesen. [Nachweis](BIOLOGIE_WIRBELTIERE_AUFGABEN.md).

Haustiere: Bericht 2026-09-16T08:20:15.196Z, Chromium 151.0.7922.34. 39 native Übungsantworten, 18 Aussagezuordnungen per Tastatur, offene Auswahl/Korrektur/Neustart/Fokus und unveränderter Quizspeicher, sechs Breiten-/Designzustände, drei Tabellen per Tastatur bis zum rechten Rand, zwei 92-Prozent-Kapitelchecks und genaue Wiederholung bestanden. Übungstextkontrast nach abgeschlossenem Designübergang mindestens 9,08:1. Papierfassung und getrennte Lösungen geprüft, ausgewählte mobile Screenshots und A4-Seiten gelesen; Umbrüche und Schreibflächen verbessert. [Umfang und Grenzen](BIOLOGIE_HAUSTIERE.md). Neue Haustierarbeit lokal, keine vollständige Browser-/Produktabnahme.


## 16.09.2026 – Selektion: Balken und Protokollprüfung

Nativer Bericht 2026-09-16T08:41:58.706Z, Chromium 151.0.7922.34: 121 Eingabekombinationen mit unabhängig berechneten Balkenlängen, 39 Übungsantworten per Tastatur, zwei 92-Prozent-Kapitelchecks mit passender Wiederholung, sechs Breiten-/Designzustände und vier Tabellen bis zum rechten Rand bestanden. Geänderte/ungültige Eingaben und Neustart entfernen die alte Grafik. Keine Seitenfehler. Mobile Grafiken sowie die Seiten 10, 11, 12, 25 und 26 der abschließenden 26-seitigen A4-Ausgabe tatsächlich gerendert und gelesen. Beschriftungen vergrößert, Abstände korrigiert und einzelne Druckaufträge gegen Zeilentrennung geschützt. Keine Sichtprüfung aller Seiten. Details: [BIOLOGIE_SELEKTION_AUFGABEN.md](BIOLOGIE_SELEKTION_AUFGABEN.md).

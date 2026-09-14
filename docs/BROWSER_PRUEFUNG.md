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

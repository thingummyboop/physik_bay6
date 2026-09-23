# Physik: Orientierung über die drei Jahrgänge

Stand: 23.09.2026, lokale Weiterarbeit nach dem bestätigten GitHub-Zwischenstand `5a9c125`. Der vorherige Zielturn war Fortschritt: Der angeforderte Stand wurde auf `main` gesichert und mit dem Remote verglichen.

## Befund und Änderung

Der gemeinsame Katalog enthält 20 Physikkapitel: eine mehrfach nutzbare Messgrundlage, fünf Kapitel der 2. Klasse, jeweils sechs der 3. und 4. Klasse sowie zwei Zusatzkapitel. Die bereits überarbeitete Reihenfolge ist mit den hinterlegten Voraussetzungen vereinbar. Bisher fehlte auf der Lernseite eine zusammenhängende Erklärung dieses Aufbaus; die beiden Zusatzkapitel erschienen bei gesetztem Klassenfilter außerdem nicht in den Ergebnissen.

`topics/learning.html` bietet jetzt eine aufklappbare, deutschsprachige Physikübersicht. Sie zeigt die Kapitel in Katalogreihenfolge, erläutert sinnvolles Vorwissen und nennt beispielhafte Lernprodukte. Alle 20 Kapitel sind direkt erreichbar. Die Klassenknöpfe leeren die Suche, setzen den Klassenfilter und verschieben den Fokus zur Ergebniszahl. Die Zusatzkapitel bleiben innerhalb der Übersicht auch mit Klassenfilter erreichbar.

| Bereich | Lernfolge und Begründung |
|---|---|
| Gemeinsame Grundlage | Messen und Einheiten wird in allen drei Jahrgängen angeboten. Ablesen und Protokollieren können zuerst bearbeitet werden; sämtliche Rechenaufgaben sind keine Zugangsvoraussetzung für Licht und Schatten. |
| 2. Klasse | Lichtwege/Schatten → Erde/Mond/Sonne → Spiegel/Linsen → Farben → Schall. Die drei anschließenden Optikkapitel nutzen Lichtwege; Akustik greift auf Messgrößen zurück. |
| 3. Klasse | Bewegung/Kräfte → Energie → Elektrizität → Elektromagnetismus → Arbeit → Gleichgewicht/Hebel. Energie wird als Konzept vor der genaueren mechanischen Rechnung eingeführt. |
| 4. Klasse | Wärme → Wetter → Klima → Klimawandel → Strahlung → Energieversorgung. Der Klimaaufbau wird schrittweise entwickelt; Strahlung greift auf Lichtwege zurück, Kraftwerke auf Energie, Elektromagnetismus und Wärme. |
| Zusatz | Astronomie baut auf Erde/Mond/Sonne und Energie auf; zusätzliche Rechenbeispiele auf Messen und Einheiten. Beide besitzen eigene Kapitelchecks und sind ausdrücklich zusätzliche Angebote. |

Die Übersicht unterscheidet Grundstoff dieses Lernwegs, gekennzeichnete Vertiefungsabschnitte und zusätzliche Kapitel. Praktische Protokolle, Quellenbelege und begründete Entscheidungen werden als Teil der Bearbeitung sichtbar. Ein Quiz wird nicht als Nachweis eines durchgeführten Versuchs ausgegeben. Unterrichts- und Prüfungsstoff bestimmt die Lehrkraft; bestehende Stofflisten behalten ihre selbst gewählte Reihenfolge.

## Grundlage und Grenzen

Gelesen wurden die aktuellen Katalogeinträge, Lernziele, Voraussetzungen und Vertiefungsmarkierungen aller 20 Kapitel sowie die drei Jahrgangsberichte. Der vollständige Physikabschnitt des am 23.09.2026 gespeicherten RIS-Textes wurde erneut gelesen (`../lehrplan-2026-09-23.txt`, Abschnitt ab Zeichen 375336). Der erneute direkte Webabruf der RIS-Seite in diesem Arbeitsabschnitt lieferte HTTP 503 und ist kein neuer Aktualitätsnachweis. Die am selben Tag zuvor direkt abgerufene Fassung ist in den Jahrgangsberichten dokumentiert.

Der Lehrplan legt die Kompetenzbereiche fest; diese konkrete Kapitelreihenfolge und die Bezeichnung „Grundstoff dieses Lernwegs“ sind didaktische Entscheidungen der Website. Es wird keine amtliche Approbation behauptet. Die Prüfung der Reihenfolge und Voraussetzungen ist abgeschlossen; eine erneute fachliche und visuelle Prüfung aller älteren Physikfragen, Modelle und Abbildungen ist damit nicht abgeschlossen. Beim anschließenden Fragenabgleich wurde [Wärmelehre](PHYSIK_WAERME_FRAGEN.md) konkret überarbeitet.

## Funktions- und Browsernachweise

`test_physics_learning_guide.js` prüft alle 20 Kapitelzugänge und ihre geordneten Prüfungskontexte, die drei Klassenfilter, freie Zusatzangebote, Suchrücksetzung, Fokus, offenen Zustand, Fach-/Moduswechsel, blockierten Speicher und fehlgeschlagenes Nachladen. Alle als Kapitel-IDs hinterlegten Voraussetzungen existieren, bilden keine Zyklen und stehen vor dem jeweils abhängigen Kapitel. Textliche Vorwissenshinweise werden dabei nicht als Kapitel-IDs behandelt.

Zusätzlich bestanden die bestehenden Suiten `test_dgb_learning_guide`, `test_learning_flows`, `test_learning_resilience`, `test_learning_search`, `test_learning_access`, `test_learning_cross_tab`, `test_study_plan_order`, `test_study_plan_loading`, `test_plan_prerequisite_actions`, `test_learning_entry_english`, `test_learning_metadata_english`, `test_learning_section_links` und `test_study_plan_unknown_chapters`: zusammen 14 gezielte Suiten einschließlich des neuen Tests. Bestehende Sprachfunktionen wurden nur auf unbeabsichtigte Änderungen geprüft; neue Übersetzungen bleiben ausgesetzt.

`browser_physics_learning_guide.js`, finaler Lauf 23.09.2026 um 18:24:07 UTC, Chromium 151.0.7922.34: 18 Klassenwahlen in sechs Ansichten (320, 390, 1280 px, jeweils hell/dunkel), Tastatur/Fokus, unveränderte Stoffliste und Speicherung, Fach-/Moduswechsel, ausgeblendete Übersicht beim Stofflistendruck und vier echte Kapitelwechsel mit erhaltenem Kontext. Keine Browserfehler. Desktopübersicht, mobile Viertklasskarte und mobile Grundstoff-/Vertiefungshinweise visuell gelesen; Silbentrennung für lange Kapitelbezeichnungen nach dem ersten Sichtbefund ergänzt und erneut geprüft. Artefakte: `../browser-qa/physics-learning-guide/`.

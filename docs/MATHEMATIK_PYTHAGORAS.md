# Pythagoras – Begründung, Umkehrung und Anwendungen

Stand 21.09.2026. Beide Kapitel `math3_8_pythagoras` und `math4_2_pythagoras` gehören laut Navigation zur vierten Klasse (8. Schulstufe), unabhängig vom historischen Dateinamen. Beide sind auf Revision 3; Ergebnisse der Revision 2 bestätigen die neuen Fragen nicht. Der Inhaltsstand wurde mit `e03f3d6` auf ausdrücklichen Wunsch als Zwischenstand gepusht. Die anschließend abgeschlossene Druckprüfung und Fokuskorrektur sind lokal.

## Lehrplan und Lernweg

Die einschlägigen Präzisierungen der gespeicherten RIS-Fassung vom 16.09.2026 wurden gelesen: wechselnde Lagen und Bezeichnungen, Umkehrung, nachvollziehbarer Beweis, ebene Figuren und Körper einschließlich Raumdiagonalen und Pyramidenoberflächen. [Quellenstand](LEHRPLAN_QUELLENSTAND.md). Kein neuer Rechtsquellenabruf und keine amtliche Approbation.

| Anforderung | Konkretes Material |
| --- | --- |
| Seiten zuordnen, verschiedene Bezeichnungen | Einführungsfigur und PQR-Frage mit rechtem Winkel bei Q; eigener Auftrag mit u, v und w. Hypotenuse wird anhand des rechten Winkels bestimmt. |
| Einen Beweis nachvollziehen und erläutern | Vier kongruente rechtwinkelige Dreiecke in zwei gleich großen Quadraten der Seitenlänge a + b. In einer Anordnung bleibt c², in der anderen a² + b². Gleiche Dreiecksflächen werden abgezogen. Gleiche Seiten und rechte Winkel der mittleren Figur werden begründet. |
| Beispiel und Beweis unterscheiden | Das verschiebbare 3–4–5-Puzzle bleibt ausdrücklich ein einzelnes Beispiel. Der allgemeine Beweis folgt in einem eigenen Abschnitt. |
| Umkehrung anwenden | Seiten zuerst ordnen, Positivität und Dreiecksungleichung prüfen, dann Quadratsummen vergleichen. Erklärung über ein konstruiertes rechtwinkeliges Dreieck und SSS. Aufgaben enthalten auch ein nicht rechtwinkeliges und ein entartetes Dreieck sowie Grenzen gerundeter Messwerte. |
| Ebene Figuren | Hypotenuse und fehlende Kathete, Rechteckdiagonale, gleichschenkeliges Dreieck mit Höhe und Fläche, Raute mit halbierten Diagonalen, Abstand von Koordinatenpunkten. |
| Körper | Boden- und Raumdiagonale des Quaders mit zugehörigem Schnittdreieck; fehlende Höhe; idealisierter Stab im Innenraum und Modellgrenzen. Gerade quadratische Pyramide: Körperhöhe, Seitenhöhe und Seitenkante unterscheiden, Oberfläche berechnen und Höhe zurückbestimmen. |

Die alte Videoeinbettung wurde nach acht über die 15 Sekunden verteilten Stichprobenbildern mit überlagerten Beschriftungen entfernt. Die Datei wurde nicht gelöscht. Bewegliches Puzzle und eigene beschriftete Figuren übernehmen die Erklärung; die Stichproben sind keine vollständige Einzelbildprüfung des Videos.

## Aufgaben und Interaktion

Das Grundlagenkapitel enthält fünf Abschnitte, fünf Lernziele, fünf Zusammenfassungspunkte, elf bewertete Fragen mit 30 Antwortmöglichkeiten, sechs direkte Aufgaben, zwei optionale Vergleichslösungen und vier Papieralternativen. Zwei statische Beweisfiguren bleiben im Ausdruck erhalten. Sechs zusätzliche zufällige Hypotenusen-/Kathetenaufgaben besitzen passende Lösungen samt Probe.

Das Anwendungskapitel enthält sechs Abschnitte, sechs Lernziele, sechs Zusammenfassungspunkte, 14 bewertete Fragen mit 39 Antwortmöglichkeiten, neun direkte Aufgaben, drei optionale Vergleichslösungen und zwei Papieralternativen. Vier statische Figuren zeigen Dreieck, Quader, Schnittdreieck und Pyramide. Sechs zusätzliche Aufgaben wechseln zwischen Raumdiagonale und Pyramidenoberfläche; die Lösungen verwenden dieselben Zufallswerte und runden erst am Ende.

- Beweiswerkstatt: a und b von 1 bis 6 cm ergeben 36 unterschiedliche Anordnungen. Die Rechnung vergleicht äußere Quadratfläche, vier Dreiecke und Restfläche. Gesucht wird c², nicht c.
- Umkehrungswerkstatt: beliebige Seitenreihenfolge, Dezimalkomma oder Punkt, positive Werte bis 100 cm mit höchstens zwei Nachkommastellen. Intern werden Hundertstel als Ganzzahlen verarbeitet, sodass keine gerundete Gleitkomma-Gleichheit über einen rechten Winkel entscheidet. Die Eingabegenauigkeit und die Unterscheidung exakter Modelldaten von Messungen sind sichtbar.
- Puzzle: 25 einzelne Flächenteile sind mit Enter/Leertaste bedienbar. Eine zusätzliche ausreichend große Schaltfläche legt das jeweils nächste Teil um. Nach dem letzten Teil wechselt der Fokus zur Neustart-Schaltfläche; Neustart aktiviert alle Teile und setzt den Fokus auf das erste Teil. Rückmeldungen erfolgen unmittelbar und ohne verzögerten Abschluss-Timer.
- Quaderwerkstatt: je vier Grundkantenwerte und drei Höhen ergeben 48 Modelle. Die Bodenquadratsumme wird ohne Zwischenrundung weiterverwendet. Die Schrägfigur ist eine beschriftete Modellzeichnung; die Zahlenwerkstatt behauptet keine maßstäbliche dynamische 3D-Darstellung.

## Nachweise

`scripts/test_pythagoras_complete.js` prüft die vollständig gerenderten Kapitel und Arbeitsblätter: 36 Zerlegungen mit Flächen, kongruenten Dreiecken und je 169 Abdeckungsstichproben pro Anordnung; 60 geordnete/umgeordnete Seitenfälle; Fläche und Ziele aller 25 Puzzleteile; den vollständigen Ablauf der zusätzlichen Schaltfläche einschließlich Fokus und Neustart; 48 Quaderrechnungen gegen `Math.hypot`; ungültige Eingaben, Löschen, Enter und Fokus; unveränderten Lernstand beim freien Experimentieren. Alle 69 Quizantwortwege werden gegen einen unabhängig angegebenen Schlüssel, die tatsächliche Rückmeldung, Prozentwerte und Wiederholungs-IDs geprüft. Je sechs erzeugte Aufgaben/Lösungen plus insgesamt 60 kontrollierte Generatorfälle stimmen überein. Nach der Fokuskorrektur erneut bestanden.

Native Browserprüfung in Chromium 151.0.7922.34, Bericht vom 21.09.2026, 14:23:56 UTC: 36 Beweis- und 48 Quaderfälle, alle 69 Quizantwortwege, 504 Layoutfälle bei 320/390/1280 Pixeln in Hell/Dunkel, keine Seitenüberbreite, SVG-Beschriftungen innerhalb des Bildausschnitts und keine Browserfehler. Enthält außerdem Tastatur-/Reset-/Speicherprüfungen. Nach der visuellen Korrektur des Puzzleausschnitts wurden sechs endgültige Ansichten und die überarbeitete Beweisrückmeldung gezielt nachgeprüft; kleinste gemessene Beweisbeschriftung ungefähr 12,4 px. Abschließender nativer Bericht vom 14:33:27 UTC: 25 Enter-/Leertastenbetätigungen der zusätzlichen Schaltfläche, Abschlussfokus, Neustart und Druckabsatz bestanden. Diese gezielte Nachprüfung ersetzt keinen erneuten vollständigen Browserlauf.

Die vollständigen Druckfassungen wurden tatsächlich gelesen: 15 Seiten Grundlagen und 18 Seiten Anwendungen. Bei der letzten Grundlagenänderung waren zwölf gerenderte Seiten bytegleich; die drei veränderten Seiten wurden erneut gelesen. Beim letzten Anwendungsexport waren 13 Seiten bytegleich; Seiten 4, 5, 7, 17 und 18 wurden erneut gelesen. Der Hinweis zu Rundung und Modellgrenzen bleibt nun als Absatz zusammen. Die sechs gedruckten Zusatzaufgaben passen zu ihren Lösungen. Vorschauadressen in den Prüf-PDFs verweisen auf den lokalen Server; dies sind interne Prüfexemplare, keine veröffentlichten Unterrichtsdateien.

Gemeinsame Materialprüfung der 96 Mathematik-/Chemie-/Biologie-Arbeitsblätter erneut bestanden. Inventar: 198 Kapitel. Strukturprüfung der fünf priorisierten Fächer: 1.784 Frageninstanzen ohne gemeldete Strukturfehler. Die strukturellen Tests ersetzen weder Fachprüfung noch Sichtprüfung. Keine erneute vollständige Produkttestsuite in diesem Arbeitsschritt.

## Grenzen und Weiterarbeit

Dieser Nachweis schließt die konkret festgestellten Pythagoras-Lücken und ihre beschriebenen Prüfungen. Er ist keine vollständige Fach- oder Produktabnahme, keine Unterrichtserprobung und keine Aussage über sämtliche denkbaren Eingaben oder Druckereinstellungen. Als nächste direkt gelesene Lücken bleiben Darstellungswechsel und Sachgraphen im Funktionenkapitel sowie inverse Körperaufgaben und Masse/Dichte. [Gesamter Mathematik-Abgleich](MATHEMATIK_LEHRPLANABGLEICH.md). Übersetzungen bleiben zurückgestellt; der Gesamtauftrag über alle bestehenden Fächer bleibt offen.

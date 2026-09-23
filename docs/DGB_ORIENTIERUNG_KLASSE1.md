# DGB 1. Klasse: EVA, Darstellungen und Mediennutzung

Stand 23.09.2026, lokale Weiterarbeit nach `4d50180`. `dgb5_orientierung` ist auf Revision 3 überarbeitet. Vier Abschnitte enthalten zwei neue Modelle, zwei interaktive Entscheidungsfälle, 20 Arbeitsaufträge, acht bewertete Fragen und drei freie Übungen ohne Punkte. Die vier Abschnittskennungen und alle bisherigen Fragekennungen bleiben erhalten.

## Lehrplanzuordnung

Grundlage ist der vollständige Erstklassabschnitt im [amtlichen Mittelschullehrplan](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), erneut direkt abgerufen am 23.09.2026, 13:08:32 UTC, HTTP 200. Die drei Orientierungsanforderungen werden hier sinngemäß konkreten Materialien und Ergebnissen zugeordnet. Für Orientierung nennt dieser Jahrgang keine gesonderten Anwendungsbereiche.

| Anforderung | Konkrete Lerngelegenheit und Ergebnis |
| --- | --- |
| T: Eingabe, Verarbeitung und Ausgabe an Bestandteilen und Funktion eines digitalen Geräts erklären | sec1: selbst eingestellter Sensorwert, Vergleich mit veränderbarer Grenze und sichtbare Modellleuchte. Drei Schritte einzeln ausführen, Erwartungen und Ablauf vergleichen; Sensor, Prozessor mit Programm und Leuchte in einer eigenen Skizze zuordnen. Übertragung auf ein Spiel bzw. ein Schulgerät. |
| G: Digitales gegenüber Analogem erkunden und Komponenten/Funktionen an fachübergreifenden Beispielen zeigen | sec1/sec2: bereits digitalisierter Helligkeitswert und Temperaturdarstellung; kontinuierliche Skala gegenüber gerundeten einzelnen Werten. Gleiche Ausgangsvorgaben vergleichen, Rundungsverlust erklären und sichtbare Darstellung von interner Technik unterscheiden. Verbindung zu Messen und Runden. |
| I: Eigene Nutzung vergleichend untersuchen, Veränderungen benennen und Leben/Arbeit vor und nach Digitalisierung vergleichen | sec3: fünf fiktive Nutzungssituationen, Zweck/Ergebnis/Wirkung unterscheiden und eine erlaubte Änderung erproben; ohne Versuch als Plan kennzeichnen. sec4: bestehende Brief-/Festnetz-/Chatfälle mit Übermittlung, Speicherung, Erreichbarkeit und Zugang; konkrete Arbeitsschritte und erforderliche gemeinsame Regeln vergleichen. |

Dies ist eine abgeschlossene Kapitelüberarbeitung mit konkreten Lerngelegenheiten, keine vollständige Erstklass- oder Fachabnahme. Die Unterrichtsdurchführung und der Lernerfolg einzelner Kinder werden dadurch nicht behauptet.

## Fachliche Korrektur und Lernweg

Die frühere Quizrückmeldung zum Papierbuch („Es verarbeitet keine Daten“) und die verkürzte Gleichsetzung von digital mit Datenverarbeitung sind ersetzt. Information, elektronische Geräte und die Art einer Darstellung werden getrennt. Eine Flüssigkeitssäule kann Information kontinuierlich darstellen; eine digitale Anzeige verwendet einzelne Werte. Auch analoge Schaltungen können Signale verarbeiten, und eine digitale App kann eine Zeigeranzeige zeichnen. Geräte können beide Techniken verbinden.

Die Temperaturwerkstatt bezeichnet beide Bildschirmbilder ausdrücklich als digital erzeugte Modelle. Die Skalenzeichnung veranschaulicht eine kontinuierliche Darstellung; der Regler selbst stellt 61 vorgegebene Zehntelgradwerte zwischen 18,0 und 24,0 °C ein. Die zweite Darstellung rundet auf ganze Grad oder zeigt Zehntelgrad. 21,1 und 21,4 °C ergeben als ganze Zahl 21 °C, 21,5 °C ergibt 22 °C. Mehr Anzeigestellen sind kein automatischer Nachweis besserer Messgenauigkeit.

Die EVA-Werkstatt misst kein echtes Licht und schaltet keine Geräte. Der vorgegebene Wert 0–100 ist kein Luxwert. Das Unterrichtsprogramm vergleicht ihn mit 30, 50 oder 70: kleiner bedeutet an, sonst aus. Die Trennung der drei Schritte macht sichtbar, dass der eingelesene Wert, die Verarbeitung und die spätere Ausgabe verschiedene Aufgaben sind. Ein Regelwechsel beginnt den Ablauf neu; keine alte Ausgabe wird als Ergebnis des neuen Versuchs stehen gelassen.

Der vorhandene Medienwandelvergleich, seine vier Aufträge und die Zugangsfrage `dgb5_media_access` sind inhaltlich unverändert. Die Frage steht nun im vierten Abschnitt bei ihrem Material. Für die mobile Darstellung wurden lediglich Tabellenrollen ergänzt; Textinhalte bleiben erhalten. Die bisherige Vergleichshilfe wird jetzt auch als getrennte Lösung im Arbeitsblatt ausgegeben.

Die Mediennutzung wird anhand konkreter Ziele und Beobachtungen betrachtet. Für die fünf fiktiven Situationen und zwei Fälle sind keine persönlichen Nutzungsprotokolle erforderlich. Der anschließende eigene Versuch dokumentiert eine erlaubte kleine Änderung, Ergebnis und Grenzen. Die Seite gibt keine allgemeine tägliche Bildschirmzeit vor und bewertet keine Person anhand eines einzelnen Falls.

## Quellen

Am 23.09.2026 für diese Überarbeitung gelesen:

- [Micro:bit Educational Foundation: Eingaben, Ausgaben und Prozessor](https://microbit.org/get-started/features/inputs-outputs-and-processors/): Zusammenhang zwischen Eingaben, Programmverarbeitung und Ausgaben. Die Lichtwerkstatt ist ein eigenes vereinfachtes Modell, keine Nachbildung einer bestimmten Hardwarekonfiguration.
- [Analog Devices: analoge und digitale Signale](https://www.analog.com/en/resources/glossary/mixed-signal.html): kontinuierliche und diskrete Werte sowie zusammenwirkende analoge/digitale Teile. Die Zahlenfälle und Zeichnung sind eigene Unterrichtsmaterialien.
- [Technisches Museum Wien: medien.welten](https://www.technischesmuseum.at/ausstellung/medienwelten): Mediengeschichte, Übermittlung und Speicherung. Die bestehenden drei Terminvereinbarungen sind fiktive Vergleichsfälle und beanspruchen keine einheitliche Ausstattung aller Menschen einer Epoche.

## Prüfungen

- `test_orientation_models.js`: **303** vollständige EVA-Abläufe für jeden ganzen Wert 0–100 mit drei Grenzen; richtige Zwischenstände, noch ausstehende Ausgabe, Grenzwerte, ungültige Eingaben, Rücksetzen, Fokus und wiederholte Initialisierung. **122** Darstellungszustände aus 61 Werten mit zwei Genauigkeitsstufen, unabhängig festgelegte Rundungsintervalle und drei geometrisch kontrollierte Skalenpositionen.
- Dieselbe Suite prüft sechs Medienentscheidungen, alle **24 bewerteten Antwortwege** mit getrennt gepflegtem Schlüssel, genaue Wiederholungskennungen, neue Abschnittszuordnung, Revision 3, veraltete Revision 2, drei freie Übungen mit null Punkten, 20 Aufträge und vier getrennte Papierlösungen. Nach der letzten Text-/Tabellenanpassung erneut bestanden.
- `browser_orientation_models.js`: Chromium **151.0.7922.34**, Lauf **23.09.2026, 13:24:06 UTC**. 30 schrittweise EVA-Versuche, 36 Darstellungszustände, 36 Fallentscheidungen, 24 Kapitelantwortwege und neun freie Antworten; sechs Ansichten bei 320/390/1280 Pixeln, hell/dunkel. Native Eingaben und Pfeiltasten, Enter, Fokuswechsel und Fehlerkorrektur bestanden; unveränderter Lernspeicher durch die Modelle und keine erfassten Browserfehler.
- Letzte Tabellenprüfung **13:30:58 UTC**: Beide Vergleichstabellen in allen sechs Ansichten geprüft. Alle Körperzellen sind ohne seitliches Verschieben im sichtbaren Bereich; auf schmalen Bildschirmen erscheinen beschriftete Karten. Explizite Tabellenrollen bleiben erhalten. Der dauerhaft gespeicherte Browserprüfer enthält diese Zellgrenzenprüfung ebenfalls. Endgültige dunkle EVA-, Skalen-, Fall- und Tabellenansichten gesichtet. Dies ersetzt keine vollständige Screenreaderprüfung.
- Alle **15 endgültigen Druckseiten** gelesen. Einen einzelnen abgetrennten Wortrest durch einen kürzeren gleichbedeutenden Auftrag behoben; nur Seiten 3 und 4 geändert und erneut gesichtet. Die nachfolgende mobile Tabellenanpassung verändert keine der 15 Druckseiten. Bei zwei zunächst unklaren Rasteransichten wurden Schreibflächen zusätzlich in höherer Auflösung bzw. als direkt gerenderter PDF-Ausschnitt bestätigt. Alle acht Fragen besitzen Begründungsraum; Lösungen sind in der Schülerfassung zunächst verborgen.
- Arbeitsblattprüfung aller 21 DGB-Kapitel, vollständiger Quizpool, Revisionslogik, Titelindex und verbleibende Erstklass-Transferfragen bestanden. Der allgemeine Arbeitsblatttest zählt jetzt unmittelbar enthaltene Kapitelartikel, statt auch die zwei darin verschachtelten Fallartikel mitzuzählen. Das korrigiert die Prüferannahme; alle vier Kapitelabschnitte sind weiterhin erforderlich.
- Gegen `4d50180` geprüft: Nur `dgb5_orientierung` wurde als oberster Eintrag der deutschen Inhaltsdatei verändert. Der ursprüngliche Medienvergleich, die vier Aufgaben und die Zugangsfrage bleiben textlich erhalten. Inventar weiterhin 198 Kapitel; Prioritätsaudit 1.983 Frageninstanzen, davon 241 in DGB, ohne strukturellen Befund.

Der vollständige Lauf mit **266/266** Suiten um 13:12:54 UTC liegt **vor** dieser Kapitelüberarbeitung. Die Sammlung umfasst nun 267 Funktionstestsuiten; für den neuen Stand werden nur die genannten gezielten Nachweise beansprucht. Übersetzungen wurden nicht bearbeitet.

## Nächster Inhaltsschritt

Die Orientierungsbefunde 1 und 2 der [Erstklass-Sichtung](DGB_KLASSE1_ARBEITSBEFUNDE.md) sind damit bearbeitet; die übrigen Bereiche bleiben offen. Als Nächstes: `dgb5_information` mit konkretem Quellenvergleich, begründeten Entscheidungen und überarbeiteten Fragen. Die bereits vorhandenen Suchindex-, Personalisierungs- und Dateiübungen bleiben dabei erhalten. Kein weiterer Push; neue Änderungen sind lokal. Der Gesamtauftrag für alle bestehenden Fächer bleibt offen.

# DGB, 3. Klasse: Softwareeinstellungen praktisch konfigurieren

Stand 14.09.2026, Kapitel `dgb7_produktion`, Revision 2. Der vorige Zielturn war Fortschritt: gesamter bisheriger Funktionstestbestand geprüft und ein unabhängig davon gefundener Saturn-Inhaltsfehler korrigiert. Diese Runde bearbeitet eine dokumentierte DGB-Lücke; keine Übersetzungen.

## Kompetenz und Lernaufgabe

Der aktuelle RIS-Text verlangt im Produktionsbereich der dritten Klasse, Einstellungen in Softwareapplikationen persönlichen Bedürfnissen entsprechend anzupassen. Der Quellenstand ist in [LEHRPLAN_QUELLENSTAND.md](LEHRPLAN_QUELLENSTAND.md) belegt. Der vorhandene Kapiteltext erklärte Konfiguration bislang als Begriff und enthielt eine Mediengestaltungsaufgabe, aber keine eigene ausführbare Einstellungsaufgabe.

`examples/leseansicht.html` ist eine eigenständige lokale Leseanwendung mit festem fiktivem Text. Drei Schriftgrößen, drei Zeilenabstände und zwei Farbdarstellungen ergeben 18 Kombinationen. Die Auswahl verändert tatsächliche Schrift-, Zeilen- und Farbeigenschaften der Leseprobe. Der Text bleibt gleich. Die Kapitel- und Downloadlinks öffnen die Anwendung; die heruntergeladene Datei benötigt keine externen Skripte, Bilder oder Stylesheets. Ihr Rückweg verweist bei `file:` auf das öffentliche Kapitel, sonst auf die jeweilige Website.

Die Speicherung ist eine ausdrückliche Handlung: Speichern, Laden, Ausgangsansicht und Löschen haben unterscheidbare Wirkungen. Nur die drei Werte werden unter `sciverse_reading_preferences` gespeichert; bestehende Quizdaten bleiben erhalten. Die Ausgangsansicht löscht gespeicherte Werte nicht. Löschen verändert die aktuelle Ansicht nicht. Erneutes Öffnen übernimmt gültige gespeicherte Werte; fehlende, beschädigte oder gesperrte Speicherung wird verständlich behandelt. Alle Darstellungen bleiben ohne Speicherung bedienbar.

Sechs Kapitelaufträge verbinden Zielwahl, Vorhersage, Änderung jeweils einer Eigenschaft, Beobachtung, Tastatur-/Fensterprüfung, Speicherung mit erneutem Öffnen und Übertragung auf eine andere Software. Die Wiederholung derselben Suchaufgabe wird nicht als kontrollierte Lesegeschwindigkeitsmessung ausgegeben. Vorliebe, beobachtete Wirkung und allgemeine Zugänglichkeit sind getrennt. Vier Protokollzeilen und eine separate Vergleichslösung sind online und im Arbeitsblatt enthalten. Ohne tatsächliche Ausführung bleiben Beobachtungsfelder leer und der praktische Teil offen.

Zwei neue bewertete Fragen prüfen den Geltungsbereich der Einstellung und einen nachvollziehbaren Speichernachweis. Je drei vollständig zugeordnete Optionen und konkrete Rückmeldungen. Der Kapitelcheck hat jetzt acht Fragen und Revision 2; ältere Ergebnisse werden als überholt behandelt. Lernziel und Zusammenfassung ergänzen Konfiguration und Überprüfung.

## Quellen

- [W3C WAI: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), am 14.09.2026 geöffnet: Text muss bei benutzerseitig geänderten Abständen nutzbar bleiben. Die Kriterien verlangen keine für alle ideale Vorgabe und auch keinen zwingenden eigenen Einstellungsschalter.
- [W3C WAI: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), am 14.09.2026 geöffnet: veränderte Ansichtsbreiten und Vergrößerung bei erhaltener Nutzbarkeit berücksichtigen. Die Werkstatt behauptet keine vollständige WCAG-Konformität.

Die fiktive Ankündigung, Suchaufgaben und Unterrichtssequenz sind eigene didaktische Materialien, keine kopierte externe Beispielaufgabe.

## Nachweise

- `test_reading_settings.js`: 18 Einstellungszustände, unveränderter Inhalt, explizites Speichern/Laden/Zurücksetzen/Löschen, Wiederöffnung, ungültige Speicherwerte, gesperrter Speicher, unveränderte Quizdaten, lokale Dateiadresse und Kapitel-/Downloadintegration. Tatsächliche Papieraufbereitung mit sechs Aufgaben, vier Protokollzeilen und getrennten Lösungen. Bestanden.
- `test_material_programming.js`: bisherige 27 Programmierfälle erhalten; alle 24 Antwortwege des vollständigen Acht-Fragen-Pools gegen unabhängig festgelegte richtige Antwortpositionen geprüft, 100/88-Prozent-Auswertung, exakte Wiederholungs-IDs und Revision 2. Bestanden.
- Alle 21 DGB-Arbeitsblätter und die generierte Titelauswahl gegen den aktuellen Renderer bestanden. Titelindex neu erzeugt, ohne neue Übersetzungen. Inventar weiterhin 197 Kapitel; struktureller Prioritätsaudit 1.534 Frageninstanzen, davon 160 in DGB, ohne Befund.
- `browser_reading_settings.js`: Chromium 151.0.7922.34, Abschluss `2026-09-14T02:41:25.237Z`, Bericht `../browser-qa/reading-settings/report.json`. 18 Kombinationen bei 320/390/1280 Pixeln, insgesamt 54 Zustände: tatsächliche Schriftgröße, Zeilenhöhe, Farben, stabiler Text und kein Seiten-/Leseprobenüberlauf. Niedrigster gemessener Textkontrast 12,56:1. Native Tastaturbedienung, Speichern und Neuladen, Rücksetzen/Laden/Löschen, gesperrter Speicher, Downloadvergleich und Ausführung der lokalen Dateikopie bestanden. Keine Browserfehler.
- Zusätzlich Textabstände auf 1,5-fache Zeilenhöhe, 0,12 em Buchstabenabstand, 0,16 em Wortabstand und 2 em Absatzabstand gesetzt. Bei 320 Pixeln und großer Leseprobenschrift blieb der Inhalt verfügbar. Die mobile dunkle Ansicht, die veränderten Bedienfelder und die Leseprobe mit zusätzlichem Textabstand wurden visuell gelesen. Kein echter Browserzoom- oder Screenreadertest behauptet.
- `browser_learning_smoke.js` an den aktuellen Acht-Fragen-Pool angepasst und tatsächlich erneut bestanden, Bericht `2026-09-14T02:38:31.145Z`: mobile Navigation, Tastaturtabellen, 88-Prozent-Kapitelversuch mit gezieltem Wiederholen sowie Stofflisten-Teilen in einen neuen Empfängerkontext.
- A4-Export mit Material und Lösungen. Zunächst 16 Seiten; die neue Protokolltabelle war für handschriftliche Beobachtungen zu eng. Auf diesen Protokolltyp begrenzte Druckregel auf 18 mm Zeilenhöhe ergänzt. Abschließender Export 17 Seiten; Protokoll bleibt vollständig auf Seite 9. Neue Materialseiten und Lösung zuerst gelesen, nach der Layoutänderung Seiten 8–10 erneut gerendert und gelesen. Keine Sichtprüfung sämtlicher 17 Seiten.

## Verbleibende Grenzen

Die eigene Software bietet eine tatsächlich ausführbare Konfigurationsaufgabe. Sie verändert keine Betriebssystem- oder Kommunikationseinstellungen. Der Lehrplan nennt auch diese Anwendungsbereiche; die Übertragungsaufgabe macht deren praktische Erprobung nicht automatisch vollständig. Der Vergleich verschiedener medialer Darstellungsformen im selben DGB-Jahrgang bleibt ebenfalls gesondert zu bearbeiten.

Jetzt 183 Funktionstestsuiten vorhanden. Kein neuer Gesamtlauf nach den DGB-Ergänzungen; der vorige 182/182-Lauf ist in [FUNKTIONS_PRUEFUNG_2026-09-14.md](FUNKTIONS_PRUEFUNG_2026-09-14.md) eingeordnet. Keine neue Veröffentlichung und keine vollständige fachliche oder curriculare Produktabnahme.

# Arbeitsblätter und Stofflisten – Druckprüfung vom 14.09.2026

Nachfolgende fachliche Korrektur: Die unten noch als offen benannte SI-Antwortauswahl und weitere Aufgaben dieses Kapitels wurden anschließend überarbeitet; Nachweise und aktueller Stand in [SI_KAPITELPRUEFUNG.md](SI_KAPITELPRUEFUNG.md).

Geprüft wurde die lokale Vorschau ausgehend von GitHub-Zwischenstand `1f62972` mit den danach vorgenommenen Änderungen. Die Prüfung betrifft Unterrichtsmaterial auf Deutsch. Übersetzungen und GitHub Pages wurden nicht erneut geprüft oder veröffentlicht.

## Behobene Fehler

- Im DGB-Material stand „3. Werkstattauftrag“ am Ende einer Seite, während Abschnittsadresse und Inhalt auf der nächsten Seite begannen. Überschrift und Abschnittsverweis bilden jetzt einen zusammengehaltenen Kopf mit Verbindung zum folgenden Inhalt. Der neu gerenderte Auftrag beginnt auf derselben Seite wie seine Überschrift.
- Die Wirbeltier-Merkmalstabelle zerlegte selbst „Beispiel“, „Federn“ und „Eidechse“. Tabellen umbrechen nun an Wortgrenzen, ihre Zeilen bleiben zusammen; soweit eine Tabelle auf eine Seite passt, wird sie zusammengehalten. Die geprüfte Karte enthält alle fünf Tiere und unveränderte Werte ohne diese Wortzerlegungen. Das vollständige Biologiematerial umfasst dadurch 19 statt 18 Seiten.
- Die Überschrift der Chemie-Vergleichslösungen blieb ohne Erklärung am Seitenende stehen. Gemeinsame Umbruchregeln für Überschriften, Tabellenüberschriften und Tabellenköpfe berücksichtigen jetzt auch den Lösungsbereich.
- Zwei Hinweise zur Tastaturbedienung seitlich scrollender DGB-Tabellen sind ausdrücklich als Bildschirmhinweise markiert. Die Papieraufbereitung lässt sie weg; die Onlinehinweise bleiben erhalten.
- Bei blockiertem MathJax-Download war der Druckknopf für das Bruch-Arbeitsblatt aktiv, obwohl 122 rohe TeX-Markierungen sichtbar waren. Beide Skripte verwenden jetzt eine geordnete Ladefolge. Bei TeX-Inhalten wartet die Druckfreigabe auf Initialisierung, Formelsatz und Schriftladen. Bei fehlender oder fehlerhafter Formeldarstellung bleiben die Inhalte erhalten, der Knopf bleibt deaktiviert und ein Hinweis erklärt Verbindungskontrolle und Neuladen. Die mögliche Änderung generierter Übungszahlen wird genannt. Das betrifft die eigene Druckschaltfläche; ein manuell aufgerufener Browserdruck wird nicht abgefangen.

## Tatsächliche Nachweise

`scripts/browser_print_smoke.js` exportierte am `2026-09-13T23:54:24.150Z` mit Chromium 151.0.7922.34 sieben Arbeitsblattvarianten und eine Stoffliste: DGB3 Produktion mit Material bzw. Lösungen, SI-Einheiten, Mathematik-Geometrie, Mathematik-Brüche, Chemie Metalle/Redox und Biologie Wirbeltiere. Die Stoffliste enthält SI-Einheiten, Optik 1 und DGB3 Produktion. A4 mit jeweils 15 mm Rand; DOM-Breitenmessung bei 680 CSS-Pixeln entsprechend ungefähr 180 mm Inhaltsbreite. Kein Seitenüberlauf, keine rohen Formeln und keine nicht abgefangenen JavaScript-Seitenfehler in diesen Exporten. Im Bruchblatt sind 122 Formelausgaben vorhanden.

Die acht PDFs enthalten zusammen 72 Seiten. Seitentexte und Seitenzahlen wurden mit pypdf gelesen; ausgewählte Seiten wurden mit Poppler gerendert und tatsächlich visuell geprüft: DGB-Abschnittswechsel, Wirbeltier-Tabelle, Chemie-Vergleichslösung, DGB-Lösungsbeginn, erste Seiten der SI-, Geometrie- und Bruchblätter sowie beide Seiten der Stoffliste. Die Kontrollen zeigen die behobenen Umbrüche und lesbare Formeln. Nicht alle 72 Seiten wurden vollständig visuell abgenommen. Schreibraum bleibt vorgesehen; die Druckmenge wurde nicht durch verkleinerte Schrift reduziert.

`scripts/browser_print_math.js` bestand mit tatsächlichem externen Formelsatz: angehaltener Download hält den Knopf gesperrt, Freigabe erst nach Darstellung ohne TeX-Reste oder MathJax-Fehlerelemente; abgebrochener Download zeigt den Fehlerzustand, ohne die Aufgaben zu löschen; SI-Einheiten bleiben auch bei blockiertem Formeldienst druckbar. Die bestehenden DOM-Tests prüfen zusätzlich eine ausstehende bzw. abgelehnte Satz-Promise. Die reinen Inhaltsprüfungen ersetzen den externen Renderer ausdrücklich durch ein Testdouble.

Gezielt erfolgreich: allgemeine Arbeitsblätter, 95 Mathematik/Chemie/Biologie-Materialblätter, 21 DGB-Materialblätter, 20 Physik-Materialblätter, 20 Sprachmaterialblätter, 65 Werkstattblätter sowie Bruch-/Dezimalbewertung und Zuordnungsdarstellungen. Die Gruppen überlappen. Der DGB-Testselektor wurde an den zusätzlichen Abschnittskopf angepasst; seine Fachwort- und Inhaltsprüfungen bleiben bestehen. Kein erneuter Gesamtlauf aller 178 Funktionstestsuiten.

## Reproduktion und offene Abnahme

Die beiden Browser-Skripte benötigen Playwright mit installiertem Chromium sowie eine laufende Vorschau. `SCIVERSE_PREVIEW_URL` wählt deren Adresse. `SCIVERSE_PRINT_REPORT_DIR` bestimmt das Verzeichnis der vorübergehenden PDF-Exporte; der Standard liegt außerhalb des Repositorys. Diese Exporte sind Prüfmaterial, keine fertig abgenommenen Unterrichtspakete.

Grundlage zur bestehenden MathJax-3-Integration: [offizielle Dokumentation zum asynchronen Formelsatz](https://docs.mathjax.org/en/v3.2/web/typeset.html) und [Laden/Konfigurieren](https://docs.mathjax.org/en/v3.2/web/configuration.html), geöffnet am 14.09.2026. Keine Bibliotheksmigration in diesem Schritt.

Offen bleiben die vollständige Sichtprüfung aller Druckseiten und Kapitel, besonders breite Tabellen, weitere mathematische Formate, andere Browser und reale Drucker. Die zusätzliche Ladeabhängigkeit ist weiterhin extern. Die fachliche Gesamtabnahme wird durch eine lesbare Druckausgabe nicht erledigt: Bei SI-Einheiten ist zum Beispiel die erste Antwortauswahl („Weil sie schön klingen“ / „… keine Fehler gibt“) noch didaktisch und fachlich zu überarbeiten. Vollständige Lehrplanabdeckung, übrige Produktanforderungen und veröffentlichte Fassung bleiben ebenfalls Teil des Gesamtauftrags.

// Central curriculum and skill-tree data for the main app shell.
// Existing topics point to real content in lang/*.json. Planned topics build the full subject tree.
window.LEARNQUEST_CURRICULUM = {
    appName: "SciVerse",
    subjects: {
        physik: {
            label: "Physik",
            icon: "PH",
            accent: "#0f766e",
            topics: [
                { id: "sieinheiten", title: "SI-Einheiten und Messen", grade: 1, strand: "Grundlagen", available: true },
                { id: "rechenbeispiele", title: "Rechenwege in der Physik", grade: 1, strand: "Grundlagen", available: true },
                { id: "optik1", title: "Licht: Ausbreitung und Schatten", grade: 2, strand: "Optik", available: true },
                { id: "farben", title: "Farben und Sehen", grade: 2, strand: "Optik", available: true },
                { id: "linsen_spiegel", title: "Spiegel und Linsen", grade: 2, strand: "Optik", available: true },
                { id: "akustik", title: "Akustik: Schall und Hören", grade: 2, strand: "Akustik", available: true },
                { id: "kraft_und_bewegung", title: "Kraft und Bewegung", grade: 3, strand: "Mechanik", available: true },
                { id: "drehundstatik", title: "Statik und Rotation", grade: 3, strand: "Mechanik", available: true },
                { id: "arbeit", title: "Mechanische Arbeit", grade: 3, strand: "Mechanik", available: true },
                { id: "energie", title: "Energie: Umwandlung und Erhaltung", grade: 3, strand: "Mechanik", available: true },
                { id: "elektrizitaet", title: "Elektrizität: Ladung und Stromkreis", grade: 3, strand: "Elektrizität", available: true },
                { id: "elektromagnetismus", title: "Elektromagnetismus und Induktion", grade: 3, strand: "Elektrizität", available: true },
                { id: "waermelehre", title: "Wärmelehre: Temperatur und Teilchen", grade: 4, strand: "Wärme", available: true },
                { id: "wetter", title: "Wetter: Atmosphäre und Wind", grade: 4, strand: "Klima", available: true },
                { id: "klima", title: "Klima: Daten und Klimazonen", grade: 4, strand: "Klima", available: true },
                { id: "klimawandel", title: "Klimawandel verstehen", grade: 4, strand: "Klima", available: true },
                { id: "strahlung_radioaktivitaet", title: "Strahlung und Radioaktivität", grade: 4, strand: "Strahlung", available: true },
                { id: "kraftwerke_energieversorgung", title: "Kraftwerke und Energieversorgung", grade: 4, strand: "Energie", available: true },
                { id: "astronomie", title: "Astronomie", grade: 4, strand: "Kosmos", available: true }
            ]
        },
        mathematik: {
            label: "Mathematik",
            icon: "MA",
            accent: "#2563eb",
            topics: [
                { id: "math1_1_vs_wissen", title: "Mein Wissen aus der Volksschule", grade: 1, strand: "Zahlen", available: true },
                { id: "math1_2_nat_zahlen", title: "Natuerliche Zahlen", grade: 1, strand: "Zahlen", available: true },
                { id: "math1_3_add_sub", title: "Addition und Subtraktion", grade: 1, strand: "Rechnen", available: true },
                { id: "math1_4_mult_div", title: "Multiplikation und Division", grade: 1, strand: "Rechnen", available: true },
                { id: "math1_5_geo_grundbegriffe", title: "Geometrische Grundbegriffe", grade: 1, strand: "Geometrie", available: true },
                { id: "math1_6_winkel", title: "Winkel", grade: 1, strand: "Geometrie", available: true },
                { id: "math1_7_gleichungen", title: "Gleichungen und Ungleichungen", grade: 1, strand: "Algebra", available: true },
                { id: "math1_8_brueche", title: "Brueche", grade: 1, strand: "Zahlen", available: true },
                { id: "math1_9_dezimalzahlen", title: "Dezimalzahlen", grade: 1, strand: "Zahlen", available: true },
                { id: "math1_10_groessen", title: "Groessen", grade: 1, strand: "Messen", available: true },
                { id: "math1_11_figuren_koerper", title: "Figuren und Koerper", grade: 1, strand: "Geometrie", available: true },
                { id: "math2_1_teilbarkeit", title: "Teilbarkeit", grade: 2, strand: "Zahlen", available: true },
                { id: "math2_2_brueche", title: "Brueche vertiefen", grade: 2, strand: "Zahlen", available: true },
                { id: "math2_3_dezimalzahlen", title: "Dezimalzahlen vertiefen", grade: 2, strand: "Zahlen", available: true },
                { id: "math2_4_relative_zahlen", title: "Relative Zahlen", grade: 2, strand: "Zahlen", available: true },
                { id: "math2_5_var_gleichungen", title: "Variablen und Gleichungen", grade: 2, strand: "Algebra", available: true },
                { id: "math2_6_prop_prozent", title: "Proportionen und Prozent", grade: 2, strand: "Rechnen", available: true },
                { id: "math2_7_geometrie", title: "Dreiecke, Vierecke, Prismen", grade: 2, strand: "Geometrie", available: true },
                { id: "math2_8_statistik", title: "Statistik", grade: 2, strand: "Daten", available: true },
                { id: "math3_1_rationale_zahlen", title: "Rationale Zahlen", grade: 3, strand: "Zahlen", available: true },
                { id: "math3_2_potenzen_terme", title: "Potenzen und Terme", grade: 3, strand: "Algebra", available: true },
                { id: "math3_3_gleichungen", title: "Gleichungen", grade: 3, strand: "Algebra", available: true },
                { id: "math3_4_flaechensatz", title: "Flaecheninhalte", grade: 3, strand: "Geometrie", available: true },
                { id: "math3_5_verhaeltnisse", title: "Verhaeltnisse", grade: 3, strand: "Rechnen", available: true },
                { id: "math3_6_zuordnungen", title: "Zuordnungen und Funktionen", grade: 3, strand: "Algebra", available: true },
                { id: "math3_7_aehnlichkeit", title: "Aehnlichkeit", grade: 3, strand: "Geometrie", available: true },
                { id: "math3_8_pythagoras", title: "Satz des Pythagoras", grade: 3, strand: "Geometrie", available: true },
                { id: "math3_9_koerper", title: "Geometrische Koerper", grade: 3, strand: "Geometrie", available: true },
                { id: "math3_10_prozent_zins", title: "Prozent und Zins", grade: 3, strand: "Rechnen", available: true },
                { id: "math3_11_statistik", title: "Statistik vertiefen", grade: 3, strand: "Daten", available: true },
                { id: "math4_1_reelle_zahlen", title: "Reelle Zahlen und Wurzeln", grade: 4, strand: "Zahlen", available: true },
                { id: "math4_2_pythagoras", title: "Pythagoras vertiefen", grade: 4, strand: "Geometrie", available: true },
                { id: "math4_3_terme_gleichungen", title: "Terme und Gleichungen", grade: 4, strand: "Algebra", available: true },
                { id: "math4_4_funktionen_sys", title: "Lineare Funktionen", grade: 4, strand: "Algebra", available: true },
                { id: "math4_5_aehnlichkeit", title: "Aehnlichkeit und Strahlensaetze", grade: 4, strand: "Geometrie", available: true },
                { id: "math4_6_koerper", title: "Zylinder, Kegel, Kugel", grade: 4, strand: "Geometrie", available: true },
                { id: "math4_7_statistik", title: "Statistik und Wahrscheinlichkeit", grade: 4, strand: "Daten", available: true },
                { id: "math4_8_finanzmathematik", title: "Finanzmathematik", grade: 4, strand: "Rechnen", available: true },
                { id: "mathespiel", title: "Extra: Rechenreise", grade: 0, strand: "Extra", available: true },
                { id: "math_kaenguru", title: "Extra: Kaenguru der Mathematik", grade: 0, strand: "Extra", available: true }
            ]
        },
        chemie: {
            label: "Chemie",
            icon: "CH",
            accent: "#0891b2",
            topics: [
                { id: "chemie_roadmap", title: "So funktioniert Chemie", grade: 3, strand: "Anleitung", available: true },
                { id: "chemie_sicherheit", title: "Sicher experimentieren", grade: 3, strand: "Labor", available: true },
                { id: "chemie_alltag_stoffe", title: "Stoffe im Alltag", grade: 3, strand: "Stoffe", available: true },
                { id: "chemie_stoffe_eigenschaften", title: "Stoffe und Eigenschaften", grade: 3, strand: "Stoffe", available: true },
                { id: "chemie_trennverfahren", title: "Gemische trennen", grade: 3, strand: "Stoffe", available: true },
                { id: "chemie_teilchenmodell", title: "Teilchenmodell", grade: 3, strand: "Teilchen", available: true },
                { id: "chemie_salze_wasser", title: "Wasser, Loesen, Kristalle", grade: 3, strand: "Teilchen", available: true },
                { id: "chemie_reaktionen_energie", title: "Chemische Reaktionen", grade: 4, strand: "Reaktionen", available: true },
                { id: "chemie_sauerstoff_verbrennung", title: "Sauerstoff und Verbrennung", grade: 4, strand: "Reaktionen", available: true },
                { id: "chemie_saeuren_basen", title: "Saeuren, Basen und pH", grade: 4, strand: "Reaktionen", available: true },
                { id: "chemie_metalle_redox", title: "Metalle und Redox", grade: 4, strand: "Reaktionen", available: true },
                { id: "chemie_atom_periodensystem", title: "Atome und Periodensystem", grade: 4, strand: "Systematik", available: true },
                { id: "chemie_bindungen", title: "Bindungen und Strukturen", grade: 4, strand: "Systematik", available: true },
                { id: "chemie_kohlenstoff_kunststoffe", title: "Kohlenstoff und Kunststoffe", grade: 4, strand: "Systematik", available: true },
                { id: "chemie_umwelt_chemie", title: "Chemie, Umwelt und Zukunft", grade: 4, strand: "Umwelt", available: true }
            ]
        },
        dgb: {
            label: "Digitale Grundbildung",
            icon: "DG",
            accent: "#7c3aed",
            topics: [
                { id: "dgb5_orientierung", title: "Orientierung in der digitalen Welt", grade: 1, strand: "Orientierung", available: true },
                { id: "dgb5_information", title: "Information suchen und pruefen", grade: 1, strand: "Information", available: true },
                { id: "dgb5_kommunikation", title: "Digital kommunizieren", grade: 1, strand: "Kommunikation", available: true },
                { id: "dgb5_produktion", title: "Digitale Produkte erstellen", grade: 1, strand: "Produktion", available: true },
                { id: "dgb5_handeln", title: "Sicher handeln", grade: 1, strand: "Sicherheit", available: true },
                { id: "dgb6_orientierung", title: "Geraete und Systeme", grade: 2, strand: "Orientierung", available: true },
                { id: "dgb6_information", title: "Daten und Quellen", grade: 2, strand: "Information", available: true },
                { id: "dgb6_kommunikation", title: "Zusammenarbeiten online", grade: 2, strand: "Kommunikation", available: true },
                { id: "dgb6_produktion", title: "Text, Bild und Praesentation", grade: 2, strand: "Produktion", available: true },
                { id: "dgb_word_werkstatt", title: "Word-Werkstatt", grade: 2, strand: "Produktion", available: true },
                { id: "dgb6_handeln", title: "Privatsphaere und Schutz", grade: 2, strand: "Sicherheit", available: true },
                { id: "dgb7_orientierung", title: "Netzwerke und Plattformen", grade: 3, strand: "Orientierung", available: true },
                { id: "dgb7_information", title: "Recherche und Daten", grade: 3, strand: "Information", available: true },
                { id: "dgb7_kommunikation", title: "Medien und Oeffentlichkeit", grade: 3, strand: "Kommunikation", available: true },
                { id: "dgb7_produktion", title: "Medienprojekt", grade: 3, strand: "Produktion", available: true },
                { id: "dgb7_handeln", title: "Rechte, Pflichten, Cybermobbing", grade: 3, strand: "Sicherheit", available: true },
                { id: "dgb8_orientierung", title: "Informatiksysteme verstehen", grade: 4, strand: "Orientierung", available: true },
                { id: "dgb8_information", title: "Algorithmen und Daten", grade: 4, strand: "Information", available: true },
                { id: "dgb8_kommunikation", title: "Digitale Gesellschaft", grade: 4, strand: "Kommunikation", available: true },
                { id: "dgb8_produktion", title: "Abschlussprojekt", grade: 4, strand: "Produktion", available: true },
                { id: "dgb8_handeln", title: "Ethik, KI und Verantwortung", grade: 4, strand: "Sicherheit", available: true }
            ]
        },
        geographie: {
            label: "Geografie und Umwelt",
            icon: "GW",
            accent: "#16a34a",
            topics: [
                { id: "geo_oesterreich_alltag", title: "Oesterreich im Alltag", grade: 1, strand: "Orientierung", available: true },
                { id: "geo_1_karten_raeume", title: "Karten und Raeume", grade: 1, strand: "Orientierung", available: false },
                { id: "geo_2_wirtschaften", title: "Wirtschaften im Alltag", grade: 2, strand: "Wirtschaft", available: false },
                { id: "geo_3_europa", title: "Europa und Vernetzung", grade: 3, strand: "Raeume", available: false },
                { id: "geo_4_globalisierung", title: "Globalisierung und Nachhaltigkeit", grade: 4, strand: "Welt", available: false }
            ]
        },
        biologie: {
            label: "Biologie und Umweltbildung",
            icon: "BU",
            accent: "#059669",
            topics: [
                { id: "bio_koerper_gesundheit", title: "Koerper und Gesundheit", grade: 1, strand: "Mensch", available: true },
                { id: "bio_1_lebewesen", title: "Lebewesen beobachten", grade: 1, strand: "Lebewesen", available: false },
                { id: "bio_2_oekosysteme", title: "Oekosysteme und Lebensraeume", grade: 2, strand: "Umwelt", available: false },
                { id: "bio_3_humanbiologie", title: "Humanbiologie vertiefen", grade: 3, strand: "Mensch", available: false },
                { id: "bio_4_genetik_evolution", title: "Genetik, Evolution und Verantwortung", grade: 4, strand: "Entwicklung", available: false }
            ]
        },
        deutsch: {
            label: "Deutsch",
            icon: "DE",
            accent: "#dc2626",
            topics: [
                { id: "deutsch_1_lesen", title: "Lesen: Informationen finden", grade: 1, strand: "Lesen", available: false },
                { id: "deutsch_1_schreiben", title: "Saetze, Abschnitte, Erzaehlen", grade: 1, strand: "Schreiben", available: false },
                { id: "deutsch_1_sprechen", title: "Zuhoeren und Sprechen", grade: 1, strand: "Sprechen", available: false },
                { id: "deutsch_1_sprache", title: "Wortarten und Satzbau", grade: 1, strand: "Sprache", available: false },
                { id: "deutsch_2_sachtexte", title: "Sachtexte verstehen", grade: 2, strand: "Lesen", available: false },
                { id: "deutsch_2_berichte", title: "Berichten und Beschreiben", grade: 2, strand: "Schreiben", available: false },
                { id: "deutsch_2_literatur", title: "Literarische Texte", grade: 2, strand: "Literatur", available: false },
                { id: "deutsch_3_argumentieren", title: "Argumentieren und Stellung nehmen", grade: 3, strand: "Schreiben", available: false },
                { id: "deutsch_3_medien", title: "Medien kritisch nutzen", grade: 3, strand: "Medien", available: false },
                { id: "deutsch_4_bewerbung", title: "Bewerbung und formelle Texte", grade: 4, strand: "Praxis", available: false },
                { id: "deutsch_4_analyse", title: "Texte analysieren und interpretieren", grade: 4, strand: "Literatur", available: false }
            ]
        },
        englisch: {
            label: "Englisch",
            icon: "EN",
            accent: "#0284c7",
            topics: [
                { id: "englisch_1_basics", title: "Classroom English and me", grade: 1, strand: "Communication", available: false },
                { id: "englisch_1_listening", title: "Listening and speaking", grade: 1, strand: "Skills", available: false },
                { id: "englisch_1_reading", title: "Short texts and messages", grade: 1, strand: "Reading", available: false },
                { id: "englisch_2_everyday", title: "Everyday situations", grade: 2, strand: "Communication", available: false },
                { id: "englisch_2_stories", title: "Stories and descriptions", grade: 2, strand: "Writing", available: false },
                { id: "englisch_3_opinions", title: "Opinions and plans", grade: 3, strand: "Speaking", available: false },
                { id: "englisch_3_media", title: "Media and online life", grade: 3, strand: "Culture", available: false },
                { id: "englisch_4_work", title: "Work, travel and future", grade: 4, strand: "Practice", available: false },
                { id: "englisch_4_exam", title: "Reading, writing, mediation", grade: 4, strand: "Skills", available: false }
            ]
        },
        musik: {
            label: "Musik",
            icon: "MU",
            accent: "#c026d3",
            topics: [
                { id: "musik_1_stimme_rhythmus", title: "Stimme, Rhythmus, Puls", grade: 1, strand: "Musizieren", available: false },
                { id: "musik_1_hoeren", title: "Hoeren und Beschreiben", grade: 1, strand: "Hoeren", available: false },
                { id: "musik_2_instrumente", title: "Instrumente und Ensembles", grade: 2, strand: "Musikpraxis", available: false },
                { id: "musik_2_notation", title: "Notation und Formen", grade: 2, strand: "Grundlagen", available: false },
                { id: "musik_3_pop_kultur", title: "Pop, Medien und Kultur", grade: 3, strand: "Kultur", available: false },
                { id: "musik_3_gestalten", title: "Musik gestalten", grade: 3, strand: "Produktion", available: false },
                { id: "musik_4_projekt", title: "Musikprojekt und Reflexion", grade: 4, strand: "Projekt", available: false }
            ]
        },
        kunst: {
            label: "Kunst und Gestaltung",
            icon: "KG",
            accent: "#ea580c",
            topics: [
                { id: "kunst_1_linie_farbe", title: "Linie, Farbe, Form", grade: 1, strand: "Grundlagen", available: false },
                { id: "kunst_1_wahrnehmen", title: "Bilder wahrnehmen", grade: 1, strand: "Wahrnehmen", available: false },
                { id: "kunst_2_raum", title: "Raum, Koerper, Perspektive", grade: 2, strand: "Raum", available: false },
                { id: "kunst_2_design", title: "Design und Alltagsobjekte", grade: 2, strand: "Design", available: false },
                { id: "kunst_3_foto_medien", title: "Foto, Film und digitale Bilder", grade: 3, strand: "Medien", available: false },
                { id: "kunst_3_kunstgeschichte", title: "Kunst und Gesellschaft", grade: 3, strand: "Kultur", available: false },
                { id: "kunst_4_portfolio", title: "Portfolio und eigenes Projekt", grade: 4, strand: "Projekt", available: false }
            ]
        },
        ernaehrung: {
            label: "Ernaehrung und Haushalt",
            icon: "EH",
            accent: "#65a30d",
            topics: [
                { id: "eh_1_hygiene", title: "Hygiene und Sicherheit", grade: 1, strand: "Haushalt", available: false },
                { id: "eh_1_ernaehrung", title: "Essen, Trinken, Gesundheit", grade: 1, strand: "Ernaehrung", available: false },
                { id: "eh_2_einkaufen", title: "Einkaufen, Geld, Vorrat", grade: 2, strand: "Konsum", available: false },
                { id: "eh_2_zubereiten", title: "Einfache Speisen zubereiten", grade: 2, strand: "Praxis", available: false },
                { id: "eh_3_nachhaltig", title: "Nachhaltig essen und handeln", grade: 3, strand: "Nachhaltigkeit", available: false },
                { id: "eh_3_haushalt", title: "Haushalt organisieren", grade: 3, strand: "Haushalt", available: false },
                { id: "eh_4_projekt", title: "Mahlzeit planen und reflektieren", grade: 4, strand: "Projekt", available: false }
            ]
        }
    }
};

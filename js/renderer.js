// Physik-Abenteuer Topic Renderer
const UI_TRANSLATIONS = {
    en: {
        "Kapitelquiz": "Chapter quiz",
        "Übung": "Practice",
        "Für dieses Kapitel wird das Kapitelquiz gerade vorbereitet. Die Übungen im Text bleiben zum Trainieren sichtbar.": "The chapter quiz for this chapter is being prepared. The practice tasks in the text remain visible for training.",
        "Dieses Kapitelquiz wird freigeschaltet, sobald du das vorherige Kapitelquiz bestanden hast.": "This chapter quiz unlocks after you pass the previous chapter quiz.",
        "Ein weiterer Versuch füllt sich in": "Another attempt refills in",
        "Versuchen verfügbar": "attempts available",
        "Hier zählt nur dein Verständnis. Du kannst im Quiz alle Antworten ändern und gibst erst am Ende ab. Ab mehr als 70% gilt das Kapitel als geschafft.": "Only your understanding counts here. You can change all answers before submitting. More than 70% means the chapter is passed.",
        "Aufgaben": "tasks",
        "bestanden": "passed",
        "Für 25 Punkte einen Versuch auffüllen": "Refill one attempt for 25 points",
        "Kapitelquiz öffnen": "Open chapter quiz",
        "Die Lerninhalte sind während des Tests ausgeblendet. Lies genau, wähle deine Antworten und gib erst ab, wenn du fertig bist.": "The learning content is hidden during the test. Read carefully, choose your answers, and submit only when you are finished.",
        "Zurück zum Kapitel": "Back to chapter",
        "Abgeben": "Submit",
        "Kein Thema ausgewählt.": "No topic selected.",
        "Arbeitsblätter zum Üben drucken": "Print practice worksheets",
        "Fehler beim Laden des Inhalts. Bitte überprüfe deine Internetverbindung.": "Error loading the content. Please check your internet connection.",
        "Bitte beantworte zuerst Aufgabe": "Please answer task",
        "Du kannst deine Antworten vor der Abgabe noch ändern.": "You can still change your answers before submitting.",
        "Richtig": "Correct",
        "Noch nicht": "Not yet",
        "Bestanden": "Passed",
        "Noch nicht bestanden": "Not passed yet",
        "Das nächste Kapitelquiz ist jetzt freigeschaltet.": "The next chapter quiz is now unlocked.",
        "Du brauchst mehr als 70%. Übrige Versuche:": "You need more than 70%. Attempts left:",
        "Noch einmal lernen": "Study again",
        "Neuen Versuch starten": "Start a new attempt"
    },
    ar: {
        "Kapitelquiz": "اختبار الفصل",
        "Übung": "تدريب",
        "Aufgaben": "مهام",
        "bestanden": "تم النجاح",
        "Kapitelquiz öffnen": "افتح اختبار الفصل",
        "Zurück zum Kapitel": "العودة إلى الفصل",
        "Abgeben": "إرسال",
        "Kein Thema ausgewählt.": "لم يتم اختيار موضوع.",
        "Arbeitsblätter zum Üben drucken": "طباعة أوراق تدريب",
        "Richtig": "صحيح",
        "Noch nicht": "ليس بعد",
        "Bestanden": "تم النجاح",
        "Noch nicht bestanden": "لم يتم النجاح بعد",
        "Noch einmal lernen": "تعلّم مرة أخرى",
        "Neuen Versuch starten": "بدء محاولة جديدة"
    },
    uk: {
        "Kapitelquiz": "Тест до розділу",
        "Übung": "Вправа",
        "Aufgaben": "завдань",
        "bestanden": "складено",
        "Kapitelquiz öffnen": "Відкрити тест",
        "Zurück zum Kapitel": "Назад до розділу",
        "Abgeben": "Здати",
        "Kein Thema ausgewählt.": "Тему не вибрано.",
        "Arbeitsblätter zum Üben drucken": "Надрукувати вправи",
        "Richtig": "Правильно",
        "Noch nicht": "Ще ні",
        "Bestanden": "Складено",
        "Noch nicht bestanden": "Ще не складено",
        "Noch einmal lernen": "Повчитися ще",
        "Neuen Versuch starten": "Почати нову спробу"
    },
    sr: {
        "Kapitelquiz": "Квиз поглавља",
        "Übung": "Вежба",
        "Aufgaben": "задатака",
        "bestanden": "положено",
        "Kapitelquiz öffnen": "Отвори квиз",
        "Zurück zum Kapitel": "Назад на поглавље",
        "Abgeben": "Предај",
        "Kein Thema ausgewählt.": "Није изабрана тема.",
        "Arbeitsblätter zum Üben drucken": "Одштампај вежбе",
        "Richtig": "Тачно",
        "Noch nicht": "Још не",
        "Bestanden": "Положено",
        "Noch nicht bestanden": "Још није положено",
        "Noch einmal lernen": "Поново учи",
        "Neuen Versuch starten": "Покрени нови покушај"
    },
    tr: {
        "Kapitelquiz": "Bölüm testi",
        "Übung": "Alıştırma",
        "Aufgaben": "görev",
        "bestanden": "geçildi",
        "Kapitelquiz öffnen": "Bölüm testini aç",
        "Zurück zum Kapitel": "Bölüme dön",
        "Abgeben": "Teslim et",
        "Kein Thema ausgewählt.": "Konu seçilmedi.",
        "Arbeitsblätter zum Üben drucken": "Alıştırma kağıtlarını yazdır",
        "Richtig": "Doğru",
        "Noch nicht": "Henüz değil",
        "Bestanden": "Geçildi",
        "Noch nicht bestanden": "Henüz geçilmedi",
        "Noch einmal lernen": "Tekrar çalış",
        "Neuen Versuch starten": "Yeni deneme başlat"
    }
};

function uiText(text) {
    const lang = localStorage.getItem('physik_lang') || 'de';
    return (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][text]) || text;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function stripQuestionNumber(question) {
    return String(question || '').replace(/^\s*\d+\.\s*/, '');
}

function extractHtmlIds(value) {
    const ids = new Set();
    const text = String(value || '');
    const pattern = /id\s*=\s*["']([^"']+)["']/g;
    let match;

    while ((match = pattern.exec(text)) !== null) {
        ids.add(match[1]);
    }

    return ids;
}

function extractTopicHtmlIds(topic) {
    const ids = new Set();
    if (!topic || !Array.isArray(topic.sections)) return ids;

    topic.sections.forEach(section => {
        extractHtmlIds(section.content).forEach(id => ids.add(id));
    });

    return ids;
}

function topicNeedsGermanInteractiveStructure(topic, germanTopic) {
    const germanIds = extractTopicHtmlIds(germanTopic);
    if (germanIds.size < 8) return false;

    const topicIds = extractTopicHtmlIds(topic);
    let missing = 0;
    germanIds.forEach(id => {
        if (!topicIds.has(id)) missing += 1;
    });

    return missing / germanIds.size > 0.35;
}

function topLevelStructuralBlocks(root) {
    const selector = ".interactive-zone, .diagram-box, .klima-map-stage";
    return Array.from(root.querySelectorAll(selector))
        .filter(block => !block.parentElement || !block.parentElement.closest(selector));
}

function syncInteractiveBlocks(content, germanContent) {
    if (!content || !germanContent || typeof document === "undefined") return content;

    const germanTemplate = document.createElement("template");
    germanTemplate.innerHTML = germanContent;
    const germanBlocks = topLevelStructuralBlocks(germanTemplate.content)
        .filter(block => extractHtmlIds(block.outerHTML).size > 0);
    if (!germanBlocks.length) return content;

    const template = document.createElement("template");
    template.innerHTML = content;
    let changed = false;

    germanBlocks.forEach((germanBlock, index) => {
        const requiredIds = extractHtmlIds(germanBlock.outerHTML);
        const currentIds = extractHtmlIds(template.innerHTML);
        let current = topLevelStructuralBlocks(template.content)[index];

        let hasCurrentBlock = true;
        requiredIds.forEach(id => {
            if (!currentIds.has(id)) hasCurrentBlock = false;
        });

        if (hasCurrentBlock) return;

        const clone = germanBlock.cloneNode(true);
        if (current) {
            current.replaceWith(clone);
        } else {
            const reference = template.content.querySelector(".climate-source-box, .teacher-note");
            if (reference && reference.parentNode) {
                reference.parentNode.insertBefore(clone, reference);
            } else {
                template.content.appendChild(clone);
            }
        }
        changed = true;
    });

    return changed ? template.innerHTML : content;
}

function withCurrentInteractiveStructure(topic, germanTopic) {
    if (!topic || !germanTopic || topic === germanTopic) return topic;

    if (topicNeedsGermanInteractiveStructure(topic, germanTopic)) {
        return {
            ...germanTopic,
            title: topic.title || germanTopic.title,
            subtitle: topic.subtitle || germanTopic.subtitle
        };
    }

    return {
        ...topic,
        sections: (topic.sections || []).map((section, index) => {
            const germanSection = germanTopic.sections && germanTopic.sections[index];
            if (!germanSection || !germanSection.content) return section;

            const content = syncInteractiveBlocks(section.content, germanSection.content);
            return content === section.content ? section : { ...section, content };
        })
    };
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function normalizeBioLabel(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

function replaceBioTextPhrases(root) {
    const replacements = [
        [/Kompetenzbereichen/g, 'Arbeitsweisen'],
        [/Kompetenzbereiche/g, 'Arbeitsweisen'],
        [/kompetenzorientiert/g, 'an echten Situationen'],
        [/Kompetenzcheck/g, 'Kann ich das?'],
        [/Wissen, Erkenntnis und Handeln/g, 'Wissen, Verstehen und Anwenden'],
        [/Wissen, Erkenntnis oder Handeln/g, 'Wissen, Verstehen oder Anwenden'],
        [/Wissen aneignen und kommunizieren/g, 'Fachwörter nutzen und erklären'],
        [/Erkenntnisse gewinnen/g, 'untersuchen und Belege nutzen'],
        [/Standpunkte begründen und handeln/g, 'Entscheidungen begründen'],
        [/Standpunkte begruenden und handeln/g, 'Entscheidungen begründen'],
        [/Eine Kompetenz bedeutet/g, 'Anwenden bedeutet'],
        [/Kompetenz bedeutet/g, 'Anwenden bedeutet'],
        [/\bKompetenz\b/g, 'Anwenden']
    ];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        let nextValue = node.nodeValue;
        replacements.forEach(([pattern, replacement]) => {
            nextValue = nextValue.replace(pattern, replacement);
        });
        node.nodeValue = nextValue;
    });
}

function bioGoalLabelKey(value) {
    const text = normalizeBioLabel(value)
        .replace(/:$/, '')
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss');

    if (text === 'wissen' || text === 'fachcheck') return 'wissen';
    if (text === 'erkenntnis' || text === 'verstaendnischeck') return 'verstehen';
    if (text === 'handeln' || text === 'alltagscheck') return 'anwenden';
    return '';
}

function mergeBiologyLearningGoalCards(root) {
    root.querySelectorAll('.bio-competency-grid, .bio-check-grid').forEach(grid => {
        const cards = Array.from(grid.children).filter(child =>
            child.classList && (
                child.classList.contains('bio-competency-card') ||
                child.classList.contains('bio-check-card')
            )
        );
        if (cards.length < 3) return;

        const entries = cards.map(card => {
            const label = card.querySelector('strong');
            const key = bioGoalLabelKey(label?.textContent || '');
            const clone = card.cloneNode(true);
            const cloneLabel = clone.querySelector('strong');
            if (cloneLabel) cloneLabel.remove();
            return {
                key,
                text: normalizeBioLabel(clone.textContent)
            };
        });

        const hasOnlyLearningGoals = entries.every(entry => entry.key && entry.text);
        const hasAllLearningGoals = ['wissen', 'verstehen', 'anwenden']
            .every(key => entries.some(entry => entry.key === key));
        if (!hasOnlyLearningGoals || !hasAllLearningGoals) return;

        const box = document.createElement('div');
        box.className = 'bio-overview-box';
        const title = document.createElement('strong');
        title.textContent = 'Das soll ich lernen:';
        const list = document.createElement('ul');

        entries.forEach(entry => {
            const item = document.createElement('li');
            item.textContent = entry.text;
            list.appendChild(item);
        });

        box.appendChild(title);
        box.appendChild(list);
        grid.replaceWith(box);
    });

    root.querySelectorAll('.bio-overview-box > strong').forEach(label => {
        if (/Darum geht es:?|Das soll ich lernen:?/i.test(normalizeBioLabel(label.textContent))) {
            label.textContent = 'Das soll ich lernen:';
        }
    });
}

function extractBioCardText(element) {
    const clone = element.cloneNode(true);
    const label = clone.querySelector('strong, h4');
    if (label) label.remove();
    return normalizeBioLabel(clone.textContent);
}

function setBioTrainingCard(card, title, text) {
    card.replaceChildren();

    const heading = document.createElement('h4');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    card.appendChild(heading);
    card.appendChild(paragraph);
}

function ensureBioInstructionText(text, fallback) {
    const value = normalizeBioLabel(text || '');
    if (!value) return fallback;
    return /[.!?]$/.test(value) ? value : `${value}.`;
}

function findBiologyTaskForPanel(panel) {
    let candidate = panel.previousElementSibling;

    while (candidate) {
        if (candidate.classList?.contains('bio-training-panel')) break;

        const taskLabel = normalizeBioLabel(candidate.querySelector('strong')?.textContent || '');
        const isTask = candidate.classList?.contains('mini-task') &&
            /^(Arbeitsauftrag|Mini-Aufgabe)\s*:?/i.test(taskLabel);

        if (isTask) return candidate;
        candidate = candidate.previousElementSibling;
    }

    return null;
}

function matchesBioTask(text, patterns) {
    return patterns.some(pattern => pattern.test(text));
}

function buildBioGuideText(taskText) {
    const task = normalizeBioLabel(taskText || '');
    const lowerTask = task.toLowerCase();

    if (matchesBioTask(lowerTask, [/frage/, /interessiert/, /wei\u00dft/])) {
        return 'So gehst du vor: \u00dcberlege zuerst, was dich an diesem Thema interessiert oder was du noch nicht dar\u00fcber wei\u00dft. W\u00e4hle dann die Themen oder Beispiele aus, die im Arbeitsauftrag genannt sind. Schreibe deine Frage als ganzen Satz. Sie soll so klar sein, dass man sie mit dem Abschnitt, einem Lehrbuch oder einer guten Internetquelle beantworten kann.';
    }

    if (matchesBioTask(lowerTask, [/zeichne/, /skizz/, /beschrifte/, /markiere/, /pfeil/, /modell/, /stammbaum/, /diagramm/, /tabelle/, /liste/, /checkliste/, /regelkarte/, /merks/])) {
        return 'So gehst du vor: Lies den Arbeitsauftrag genau und markiere, welche Teile vorkommen m\u00fcssen. Erstelle zuerst eine einfache Skizze, Tabelle oder Liste. Beschrifte nur das, was du wirklich erkl\u00e4ren kannst. Nutze den Text, die Abbildung oder die Tabelle im Kapitel als Hilfe und erg\u00e4nze kurze Erkl\u00e4rs\u00e4tze.';
    }

    if (matchesBioTask(lowerTask, [/untersuch/, /beobacht/, /taste/, /ertaste/, /miss/, /z\u00e4hl/, /fotografiere/, /sammle/])) {
        return 'So gehst du vor: Arbeite langsam, genau und sicher. Notiere zuerst nur, was du wirklich siehst, tastest, misst oder z\u00e4hlst. Trenne Beobachtung und Vermutung. Halte deine Ergebnisse in Stichworten, einer kleinen Tabelle oder einer Skizze fest. Verwende danach passende Fachw\u00f6rter aus dem Kapitel.';
    }

    if (matchesBioTask(lowerTask, [/vergleich/, /ordne/, /unterscheide/, /sortiere/, /bestimmungsschl\u00fcssel/])) {
        return 'So gehst du vor: Sammle zuerst die Merkmale oder Hinweise aus dem Abschnitt. Ordne sie in einer Tabelle mit zwei oder mehr Spalten. Vergleiche Punkt f\u00fcr Punkt und schreibe nicht nur das Ergebnis auf, sondern auch, woran du es erkennst. Nutze Fachw\u00f6rter, wenn sie im Kapitel vorkommen.';
    }

    if (matchesBioTask(lowerTask, [/plane/, /entwirf/, /erstelle/, /entwickle/, /verbesserung/, /vor-dem-kauf/, /fall/])) {
        return 'So gehst du vor: Sammle zuerst, welche Bedingungen, Bed\u00fcrfnisse oder Probleme im Arbeitsauftrag wichtig sind. Mache daraus einen Plan, eine Checkliste oder eine konkrete L\u00f6sung. Pr\u00fcfe jeden Punkt: Ist er machbar? Passt er zum Lebewesen, zum K\u00f6rper oder zum Lebensraum? Begr\u00fcnde deine Auswahl mit dem Kapitel.';
    }

    if (matchesBioTask(lowerTask, [/quelle/, /internet/, /lehrbuch/, /recherch/, /seite/])) {
        return 'So gehst du vor: Suche zuerst im Abschnitt nach passenden Fachw\u00f6rtern. Wenn du im Lehrbuch oder Internet nachsiehst, nutze eine verl\u00e4ssliche Quelle, zum Beispiel Schule, Museum, Beh\u00f6rde oder Fachseite. Schreibe die Antwort in eigenen Worten auf und notiere, woher die Information stammt.';
    }

    if (matchesBioTask(lowerTask, [/beurteile/, /begr\u00fcnde/, /erkl\u00e4re/, /formuliere/, /verbessere/, /pr\u00fcfe/, /leite/, /bewerte/])) {
        return 'So gehst du vor: Lies den Abschnitt noch einmal und suche die Fachw\u00f6rter, die zum Arbeitsauftrag passen. Schreibe zuerst eine einfache Antwort in eigenen Worten. Erg\u00e4nze dann eine Begr\u00fcndung mit weil, denn oder daran erkenne ich. Nutze mindestens einen Hinweis aus Text, Bild, Tabelle oder Beobachtung.';
    }

    return 'So gehst du vor: Lies den Abschnitt noch einmal und markiere die wichtigsten Hinweise. Bearbeite den Arbeitsauftrag Schritt f\u00fcr Schritt. Schreibe zuerst Stichworte auf und formuliere danach ganze S\u00e4tze. Nutze passende Fachw\u00f6rter aus dem Kapitel.';
}

function buildBioEvaluationText(taskText) {
    const task = normalizeBioLabel(taskText || '');
    const lowerTask = task.toLowerCase();

    if (matchesBioTask(lowerTask, [/frage/, /interessiert/, /wei\u00dft/])) {
        return 'So wertest du aus: Pr\u00fcfe zuerst, ob deine Frage sinnvoll gestellt ist: Ist sie klar? Kann man dazu eine Antwort finden? Suche zu mindestens einer Frage eine kurze Antwort im Lehrbuch, im Abschnitt oder auf einer verl\u00e4sslichen Internetseite. Schreibe die Antwort in 2 bis 4 S\u00e4tzen auf und notiere die Quelle.';
    }

    if (matchesBioTask(lowerTask, [/zeichne/, /skizz/, /beschrifte/, /markiere/, /pfeil/, /modell/, /stammbaum/, /diagramm/, /tabelle/, /liste/, /checkliste/, /regelkarte/, /merks/])) {
        return 'So wertest du aus: Kontrolliere, ob alle geforderten Teile vorhanden und richtig beschriftet sind. Erg\u00e4nze zu deiner Skizze, Tabelle oder Liste 2 bis 4 S\u00e4tze: Was zeigt dein Ergebnis? Welche Fachw\u00f6rter passen dazu? Verbessere unklare Beschriftungen sofort.';
    }

    if (matchesBioTask(lowerTask, [/untersuch/, /beobacht/, /taste/, /ertaste/, /miss/, /z\u00e4hl/, /fotografiere/, /sammle/])) {
        return 'So wertest du aus: Fasse deine Beobachtungen in 2 bis 4 S\u00e4tzen zusammen. Schreibe zuerst, was du festgestellt hast. Danach erkl\u00e4rst du, was das biologisch bedeuten k\u00f6nnte. Nutze mindestens ein Fachwort und einen Satzanfang wie: Ich erkenne das daran, dass ...';
    }

    if (matchesBioTask(lowerTask, [/vergleich/, /ordne/, /unterscheide/, /sortiere/, /bestimmungsschl\u00fcssel/])) {
        return 'So wertest du aus: Schreibe am Ende einen Vergleichssatz oder einen Ordnungssatz. Nenne mindestens zwei Merkmale oder Hinweise, die deine Entscheidung st\u00fctzen. Pr\u00fcfe, ob jemand anderes mit deinen Angaben zum gleichen Ergebnis kommen k\u00f6nnte.';
    }

    if (matchesBioTask(lowerTask, [/plane/, /entwirf/, /erstelle/, /entwickle/, /verbesserung/, /vor-dem-kauf/, /fall/])) {
        return 'So wertest du aus: Pr\u00fcfe deinen Plan oder deine L\u00f6sung mit drei Fragen: Ist sie machbar? Hilft sie wirklich beim biologischen Problem? Ist sie fair f\u00fcr Mensch, Tier oder Umwelt? Schreibe danach eine kurze Begr\u00fcndung mit mindestens einem Fachwort.';
    }

    if (matchesBioTask(lowerTask, [/quelle/, /internet/, /lehrbuch/, /recherch/, /seite/])) {
        return 'So wertest du aus: Vergleiche deine Information mit dem Kapitel. Passt sie dazu oder widerspricht sie? Schreibe eine kurze Antwort in eigenen Worten und notiere die Quelle. Pr\u00fcfe au\u00dferdem: Ist die Quelle sachlich, aktuell und klar benannt?';
    }

    if (matchesBioTask(lowerTask, [/beurteile/, /begr\u00fcnde/, /erkl\u00e4re/, /formuliere/, /verbessere/, /pr\u00fcfe/, /leite/, /bewerte/])) {
        return 'So wertest du aus: Lies deine Antwort noch einmal. Ist sie einfach verst\u00e4ndlich? Kommt mindestens ein Fachwort vor? Gibt es eine klare Begr\u00fcndung mit einem Hinweis aus dem Kapitel? Verbessere einen Satz, wenn er nur aus Meinung besteht.';
    }

    return 'So wertest du aus: Pr\u00fcfe am Ende, ob dein Ergebnis wirklich zum Arbeitsauftrag passt. Schreibe 2 bis 4 S\u00e4tze mit Ergebnis und Begr\u00fcndung. Nutze mindestens ein Fachwort und einen Hinweis aus Text, Bild, Tabelle oder Beobachtung.';
}

function mergeBiologyWorkAssignment(root) {
    root.querySelectorAll('.bio-training-panel').forEach(panel => {
        const grid = panel.querySelector('.bio-training-grid');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('.bio-training-card'));
        while (cards.length < 3) {
            const card = document.createElement('div');
            card.className = 'bio-training-card';
            grid.appendChild(card);
            cards.push(card);
        }

        const task = findBiologyTaskForPanel(panel);
        const taskText = ensureBioInstructionText(
            task ? extractBioCardText(task) : extractBioCardText(cards[0]),
            'Bearbeite eine passende Aufgabe zum Abschnitt und begr\u00fcnde dein Ergebnis mit einem Fachwort.'
        );
        const guideText = buildBioGuideText(taskText);
        const resultText = buildBioEvaluationText(taskText);

        const title = panel.querySelector(':scope > strong');
        if (title) title.textContent = 'Arbeitsauftrag';

        setBioTrainingCard(cards[0], 'Arbeitsauftrag', taskText);
        setBioTrainingCard(cards[1], 'Anleitung', guideText);
        setBioTrainingCard(cards[2], 'Auswertung', resultText);

        if (task) task.remove();
    });
}

function softenBiologyCompetencyLanguage(root) {
    replaceBioTextPhrases(root);

    root.querySelectorAll('.bio-competency-card strong, .bio-check-card strong, .bio-data-table th').forEach(label => {
        const text = normalizeBioLabel(label.textContent);
        if (text === 'Wissen' || text === 'Fachcheck') label.textContent = 'Wissen';
        if (text === 'Erkenntnis' || text === 'Verständnischeck') label.textContent = 'Verstehen';
        if (text === 'Handeln' || text === 'Alltagscheck') label.textContent = 'Anwenden';
    });

    root.querySelectorAll('.bio-section-check > strong').forEach(label => {
        if (/Kompetenzcheck|Anwendungscheck|Kann ich das\?/.test(label.textContent)) {
            label.textContent = 'Kann ich das?';
        }
    });

    root.querySelectorAll('.bio-section-check li > strong').forEach(label => {
        const text = normalizeBioLabel(label.textContent);
        if (text === 'Wissen:' || text === 'Fachcheck:') label.textContent = 'Wissen:';
        if (text === 'Erkenntnis:' || text === 'Verständnischeck:') label.textContent = 'Verstehen:';
        if (text === 'Handeln:' || text === 'Alltagscheck:') label.textContent = 'Anwenden:';
    });

    root.querySelectorAll('.bio-training-panel > strong').forEach(label => {
        label.textContent = 'Trainiere mit echten Situationen';
    });

    root.querySelectorAll('.bio-training-card h4').forEach(label => {
        const text = normalizeBioLabel(label.textContent);
        if (text === 'Wissen trainieren') label.textContent = 'Fachwörter einsetzen';
        if (text === 'Erkenntnis trainieren') label.textContent = 'Verstehen üben';
        if (text === 'Handeln trainieren') label.textContent = 'Entscheiden begründen';
    });
}

function extractBioInsightPrompt(item) {
    const clone = item.cloneNode(true);
    const label = clone.querySelector('strong');
    if (label) label.remove();
    return normalizeBioLabel(clone.textContent).replace(/^Erkenntnis:\s*/i, '');
}

function legacyBioInsightGameSetup(prompt) {
    const lower = prompt.toLowerCase();
    if (/quelle|webseite|beleg|glaubwuerdig|glaubwürdig|autor/.test(lower)) {
        return {
            title: 'Quellen-Check',
            correct: 'Ich prüfe Autor, Belege und sachliche Sprache, bevor ich der Aussage vertraue.',
            hint: 'Eine gute Quelle nennt, woher die Information kommt und woran man sie prüfen kann.'
        };
    }
    if (/daten|mess|werte|tabelle|diagramm|puls|zeitlinie|kartiere|auswert|muster/.test(lower)) {
        return {
            title: 'Daten-Detektiv',
            correct: 'Ich suche ein Muster in fair gesammelten Daten und begründe mit einer Beobachtung oder Zahl.',
            hint: 'Erst Daten ordnen, dann eine vorsichtige Aussage daraus ableiten.'
        };
    }
    if (/modell|kladogramm|matrix|skizze|karte|beschrifte/.test(lower)) {
        return {
            title: 'Modell-Werkstatt',
            correct: 'Ich nutze das Modell als Werkzeug und sage auch, was es nicht zeigen kann.',
            hint: 'Modelle helfen beim Denken, sind aber nie die ganze Wirklichkeit.'
        };
    }
    if (/plane|untersuch|variable|frage|methode|vergleichsbeobachtung/.test(lower)) {
        return {
            title: 'Versuchsplaner',
            correct: 'Ich mache die Frage klein, verändere nur einen wichtigen Faktor und notiere meine Beobachtung.',
            hint: 'Eine faire Untersuchung ändert nicht alles gleichzeitig.'
        };
    }
    if (/vergleiche|ordne|bestimme|merkmal|gruppen|unterscheide/.test(lower)) {
        return {
            title: 'Merkmal-Sortierer',
            correct: 'Ich vergleiche mehrere Merkmale und entscheide erst, wenn die Hinweise zusammenpassen.',
            hint: 'Ein einzelnes Merkmal kann täuschen; mehrere Hinweise machen die Begründung stärker.'
        };
    }
    return {
        title: 'Forscher-Mission',
        correct: 'Ich sammle beobachtbare Hinweise und begründe meine Antwort mit dem Abschnitt.',
        hint: 'Biologie wird stark, wenn aus Beobachtung eine begründete Aussage wird.'
    };
}

function legacyRotateBioChoices(choices, topicId, sectionIndex, gameIndex) {
    const offset = (topicId.length + sectionIndex + gameIndex) % choices.length;
    return choices.slice(offset).concat(choices.slice(0, offset));
}

function legacyBuildBioInsightGame(prompt, topicId, sectionIndex, gameIndex) {
    const setup = legacyBioInsightGameSetup(prompt);
    const choices = legacyRotateBioChoices([
        { text: setup.correct, correct: true },
        { text: 'Ich rate nach dem ersten Eindruck und schreibe sofort eine sichere Antwort.', correct: false },
        { text: 'Ich lerne nur ein Fachwort auswendig und lasse Beobachtungen oder Daten weg.', correct: false }
    ], topicId, sectionIndex, gameIndex);

    const game = document.createElement('div');
    game.className = 'bio-insight-game interactive-zone';
    game.dataset.bioInsightGame = `${topicId}-${sectionIndex}-${gameIndex}`;
    game.innerHTML = `
        <div class="bio-insight-game-head">
            <span class="bio-insight-game-kicker">Anwendungsspiel</span>
            <h3>${escapeHtml(setup.title)}</h3>
        </div>
        <p class="bio-insight-mission"><strong>Auftrag:</strong> ${escapeHtml(prompt)}</p>
        <div class="bio-insight-choices" role="group" aria-label="Wähle die passende Forschungsstrategie">
            ${choices.map((choice) => `
                <button type="button" class="bio-insight-choice" data-bio-insight-choice data-correct="${choice.correct ? 'true' : 'false'}">
                    ${escapeHtml(choice.text)}
                </button>
            `).join('')}
        </div>
        <p class="bio-insight-feedback" role="status" aria-live="polite" aria-atomic="true"></p>
    `;
    game.addEventListener('click', event => {
        const button = event.target.closest('[data-bio-insight-choice]');
        if (!button) return;
        legacyHandleBioInsightChoice(button, setup.hint);
    });
    return game;
}

function legacyHandleBioInsightChoice(button, hint) {
    const game = button.closest('[data-bio-insight-game]');
    if (!game) return;
    const feedback = game.querySelector('.bio-insight-feedback');
    const isCorrect = button.dataset.correct === 'true';

    game.querySelectorAll('[data-bio-insight-choice]').forEach(choice => {
        choice.classList.remove('is-correct', 'is-wrong');
        choice.setAttribute('aria-pressed', 'false');
    });
    button.setAttribute('aria-pressed', 'true');

    if (isCorrect) {
        button.classList.add('is-correct');
        if (typeof playSuccessSound === 'function') playSuccessSound();
        if (feedback) {
            feedback.textContent = `Genau. ${hint}`;
            feedback.className = 'bio-insight-feedback is-correct';
        }
    } else {
        button.classList.add('is-wrong');
        if (feedback) {
            feedback.textContent = `Noch nicht. ${hint}`;
            feedback.className = 'bio-insight-feedback is-wrong';
        }
    }
}

// Visual biology application games. These definitions intentionally sit after the
// earlier text-only version, so the rendered games become graphic interactions.
function inferBioInsightGame(prompt) {
    const lower = prompt.toLowerCase();
    if (/quelle|webseite|beleg|glaubwuerdig|glaubwürdig|autor/.test(lower)) {
        return { type: 'source', title: 'Quellen-Scanner', hint: 'Eine gute Quelle nennt Herkunft, Belege und bleibt sachlich.' };
    }
    if (/daten|mess|werte|tabelle|diagramm|puls|zeitlinie|kartiere|auswert|muster|standort|feuchtigkeit|boden|funde/.test(lower)) {
        return { type: 'data', title: 'Daten-Lupe', hint: 'Erst alle Daten vergleichen, dann eine vorsichtige Aussage ableiten.' };
    }
    if (/modell|kladogramm|matrix|skizze|karte|beschrifte/.test(lower)) {
        return { type: 'model', title: 'Modell-Werkstatt', hint: 'Ein Modell ist ein Werkzeug und hat immer Grenzen.' };
    }
    if (/vergleich|ordne|bestimm|merkmal|gruppen|unterscheid|faktor|lebensmerkmal/.test(lower)) {
        return { type: 'sort', title: 'Merkmal-Sortierer', hint: 'Mehrere Merkmale sind stärker als der erste Eindruck.' };
    }
    if (/plane|untersuch|variable|frage|methode|vergleichsbeobachtung/.test(lower)) {
        return { type: 'experiment', title: 'Versuchsplaner', hint: 'Eine faire Untersuchung verändert nur einen wichtigen Faktor.' };
    }
    return { type: 'observe', title: 'Forscher-Mission', hint: 'Aus Beobachtung wird erst mit Beleg eine starke Aussage.' };
}

function getBioScenario(prompt, type) {
    const lower = prompt.toLowerCase();
    if (type === 'source') {
        return {
            leftTitle: 'Quelle A',
            leftBody: lower.includes('tier') ? 'Video: "Dieses Tier kann alles!"' : 'Post: "Das ist sicher so!"',
            leftMeta: 'kein Autor, keine Daten',
            rightTitle: 'Quelle B',
            rightBody: lower.includes('tier') ? 'Naturmuseum: Tiersteckbrief' : 'Fachseite mit Messdaten',
            rightMeta: 'Autor, Datum, Belege',
            focus: 'Autor + Beleg + sachliche Sprache'
        };
    }
    if (type === 'data') {
        if (/puls|atmung|sauerstoff|kreislauf/.test(lower)) {
            return { labels: ['Ruhe', 'Stiegen', 'Laufen'], values: [72, 98, 132], unit: 'Puls', conclusion: 'Mit Bewegung steigt der Puls, weil Muskeln mehr Sauerstoff brauchen.' };
        }
        if (/zeitlinie|erdgeschichte|fossil|millionen|milliarden/.test(lower)) {
            return { labels: ['kurz', 'Mio.', 'Mrd.'], values: [8, 32, 116], unit: 'Zeit', conclusion: 'Milliarden Jahre brauchen im Modell sichtbar viel mehr Platz.' };
        }
        if (/kartiere|versickerung|boden|standort|lebensraum|feuchtigkeit/.test(lower)) {
            return { labels: ['Asphalt', 'Beet', 'Laub'], values: [1, 8, 6], unit: 'Funde', conclusion: 'Feuchte, lockere und bewachsene Stellen zeigen mehr Lebensraum-Hinweise.' };
        }
        return { labels: ['A', 'B', 'C'], values: [3, 9, 5], unit: 'Daten', conclusion: 'Das Muster wird erst klar, wenn alle Werte verglichen werden.' };
    }
    if (type === 'experiment') {
        return {
            question: /keim|pflanz|licht/.test(lower) ? 'Keimen Samen im Licht anders?' : 'Welche Bedingung verändert die Beobachtung?',
            variable: /feucht|wasser/.test(lower) ? 'Wasser' : /licht/.test(lower) ? 'Licht' : 'ein Faktor',
            constantA: 'gleiche Zeit',
            constantB: 'gleiche Menge'
        };
    }
    if (type === 'model') {
        if (/kladogramm|verwandtschaft|matrix/.test(lower)) {
            return { center: 'Knoten', left: 'Fisch', middle: 'Frosch', right: 'Katze', note: 'Entscheidend ist der gemeinsame Knoten, nicht die Schönheit der Zeichnung.' };
        }
        return { center: 'Modell', left: 'zeigt', middle: 'lässt weg', right: 'Grenze', note: 'Ein Modell zeigt Wichtiges, aber nie die ganze Wirklichkeit.' };
    }
    if (type === 'sort') {
        if (/lebensraum|faktor|standort/.test(lower)) {
            return { binA: 'belebt', binB: 'unbelebt', itemsA: ['Pflanze', 'Assel'], itemsB: ['Licht', 'Wasser'] };
        }
        return { binA: 'passt', binB: 'passt nicht', itemsA: ['Merkmal', 'Beleg'], itemsB: ['Gefühl', 'Raten'] };
    }
    return { conclusion: 'Erst beobachten, dann notieren, dann begründen.' };
}

function rotateBioActions(actions, topicId, sectionIndex, gameIndex) {
    const offset = (topicId.length + sectionIndex + gameIndex) % actions.length;
    return actions.slice(offset).concat(actions.slice(0, offset));
}

function getBioInsightActions(setup, scenario, topicId, sectionIndex, gameIndex) {
    const actionsByType = {
        source: [
            { text: `Quelle B nutzen: ${scenario.focus}`, correct: true, state: 'right', note: 'Die rechte Quelle hat klare Herkunft und Belege.' },
            { text: 'Quelle A sofort übernehmen', correct: false, state: 'left', note: 'Links fehlen Autor oder Daten. Das ist zu unsicher.' },
            { text: 'Beide ohne Prüfung gleich behandeln', correct: false, state: 'middle', note: 'Quellen sind nicht automatisch gleich stark.' }
        ],
        data: [
            { text: 'Alle Werte vergleichen und mit einer Zahl begründen', correct: true, state: 'right', note: scenario.conclusion },
            { text: 'Nur den ersten Wert anschauen', correct: false, state: 'left', note: 'Ein einzelner Wert zeigt noch kein Muster.' },
            { text: 'Die Werte passend zur Meinung drehen', correct: false, state: 'middle', note: 'Daten müssen ehrlich gelesen werden.' }
        ],
        model: [
            { text: 'Modell nutzen und seine Grenze nennen', correct: true, state: 'right', note: scenario.note },
            { text: 'Das Modell wie echte Wirklichkeit behandeln', correct: false, state: 'left', note: 'Modelle sind Vereinfachungen.' },
            { text: 'Nur das schönste Bild wählen', correct: false, state: 'middle', note: 'Entscheidend ist, ob das Modell zur Frage passt.' }
        ],
        experiment: [
            { text: `Nur ${scenario.variable} verändern, den Rest gleich lassen`, correct: true, state: 'right', note: 'So bleibt die Untersuchung fair.' },
            { text: 'Alle Bedingungen gleichzeitig verändern', correct: false, state: 'left', note: 'Dann weißt du nicht, welcher Faktor wirkt.' },
            { text: 'Ohne Tabelle beobachten', correct: false, state: 'middle', note: 'Ohne Notizen gehen Daten leicht verloren.' }
        ],
        sort: [
            { text: 'Mehrere Karten vergleichen und dann begründen', correct: true, state: 'right', note: 'Mehrere Merkmale machen die Sortierung sicherer.' },
            { text: 'Nach dem ersten Eindruck sortieren', correct: false, state: 'left', note: 'Der erste Eindruck kann täuschen.' },
            { text: 'Unklare Karten einfach ignorieren', correct: false, state: 'middle', note: 'Unsichere Fälle muss man markieren und begründen.' }
        ],
        observe: [
            { text: 'Beobachtung sammeln und mit einem Beleg erklären', correct: true, state: 'right', note: scenario.conclusion },
            { text: 'Sofort eine sichere Regel behaupten', correct: false, state: 'left', note: 'Eine Regel braucht mehrere Beobachtungen.' },
            { text: 'Nur ein Fachwort auswendig nennen', correct: false, state: 'middle', note: 'Fachwörter helfen erst mit Beobachtung.' }
        ]
    };
    return rotateBioActions(actionsByType[setup.type] || actionsByType.observe, topicId, sectionIndex, gameIndex);
}

function buildBioInsightVisual(setup, scenario) {
    if (setup.type === 'source') {
        return `
            <svg viewBox="0 0 760 260" role="img" aria-label="Zwei Quellenkarten werden verglichen">
                <rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/>
                <g data-stage-target="left" class="bio-stage-target"><rect x="58" y="58" width="250" height="132" rx="14" class="bio-source-card weak"/><text x="82" y="92" class="bio-svg-title">${escapeHtml(scenario.leftTitle)}</text><text x="82" y="124" class="bio-svg-text">${escapeHtml(scenario.leftBody)}</text><text x="82" y="158" class="bio-svg-muted">${escapeHtml(scenario.leftMeta)}</text></g>
                <g data-stage-target="right" class="bio-stage-target"><rect x="452" y="58" width="250" height="132" rx="14" class="bio-source-card strong"/><text x="476" y="92" class="bio-svg-title">${escapeHtml(scenario.rightTitle)}</text><text x="476" y="124" class="bio-svg-text">${escapeHtml(scenario.rightBody)}</text><text x="476" y="158" class="bio-svg-muted">${escapeHtml(scenario.rightMeta)}</text></g>
                <path d="M336 120 L420 120" class="bio-stage-arrow"/>
                <text x="380" y="216" text-anchor="middle" class="bio-insight-graphic-label">Tippe eine Entscheidung an.</text>
            </svg>`;
    }
    if (setup.type === 'data') {
        const max = Math.max(...scenario.values, 1);
        const bars = scenario.values.map((value, index) => {
            const h = 24 + (value / max) * 118;
            const x = 158 + index * 152;
            const y = 188 - h;
            const target = value === max ? 'right' : index === 0 ? 'left' : 'middle';
            return `<g data-stage-target="${target}" class="bio-stage-target"><rect x="${x}" y="${y.toFixed(1)}" width="74" height="${h.toFixed(1)}" rx="10" class="bio-data-bar"/><text x="${x + 37}" y="${y - 10}" text-anchor="middle" class="bio-svg-title">${escapeHtml(value)}</text><text x="${x + 37}" y="220" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.labels[index])}</text></g>`;
        }).join('');
        return `<svg viewBox="0 0 760 260" role="img" aria-label="Ein kleines Balkendiagramm zum Auftrag"><rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/><line x1="110" y1="188" x2="650" y2="188" class="bio-chart-axis"/><line x1="110" y1="54" x2="110" y2="188" class="bio-chart-axis"/><text x="116" y="44" class="bio-svg-title">${escapeHtml(scenario.unit)}</text>${bars}<text x="380" y="244" text-anchor="middle" class="bio-insight-graphic-label">Welche Aussage passt zu den Daten?</text></svg>`;
    }
    if (setup.type === 'experiment') {
        return `<svg viewBox="0 0 760 260" role="img" aria-label="Versuchsaufbau mit einer veränderten Variable"><rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/><rect x="86" y="146" width="588" height="38" rx="12" class="bio-lab-table"/><g data-stage-target="right" class="bio-stage-target"><rect x="118" y="70" width="130" height="76" rx="12" class="bio-experiment-pot"/><circle cx="183" cy="96" r="20" class="bio-factor-dot active"/><text x="183" y="134" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.variable)}</text></g><g data-stage-target="middle" class="bio-stage-target"><rect x="314" y="70" width="130" height="76" rx="12" class="bio-experiment-pot"/><circle cx="379" cy="96" r="20" class="bio-factor-dot"/><text x="379" y="134" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.constantA)}</text></g><g data-stage-target="left" class="bio-stage-target"><rect x="510" y="70" width="130" height="76" rx="12" class="bio-experiment-pot"/><circle cx="575" cy="96" r="20" class="bio-factor-dot"/><text x="575" y="134" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.constantB)}</text></g><text x="380" y="216" text-anchor="middle" class="bio-insight-graphic-label">${escapeHtml(scenario.question)}</text></svg>`;
    }
    if (setup.type === 'model') {
        return `<svg viewBox="0 0 760 260" role="img" aria-label="Modellskizze mit Knoten und Grenzen"><rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/><g transform="translate(170 172)"><circle cx="0" cy="0" r="12" class="bio-model-node"/><path d="M0 0 C80 -85 165 -92 240 -128" class="bio-model-line"/><path d="M0 0 C96 -46 188 -44 292 -52" class="bio-model-line"/><path d="M0 0 C74 24 158 18 258 42" class="bio-model-line"/><g data-stage-target="left" class="bio-stage-target"><circle cx="240" cy="-128" r="28" class="bio-model-end"/><text x="240" y="-123" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.left)}</text></g><g data-stage-target="middle" class="bio-stage-target"><circle cx="292" cy="-52" r="28" class="bio-model-end"/><text x="292" y="-47" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.middle)}</text></g><g data-stage-target="right" class="bio-stage-target"><circle cx="258" cy="42" r="28" class="bio-model-end"/><text x="258" y="47" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.right)}</text></g></g><text x="380" y="226" text-anchor="middle" class="bio-insight-graphic-label">${escapeHtml(scenario.note)}</text></svg>`;
    }
    if (setup.type === 'sort') {
        return `<svg viewBox="0 0 760 260" role="img" aria-label="Karten werden in zwei Gruppen sortiert"><rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/><rect x="80" y="58" width="250" height="132" rx="16" class="bio-sort-bin"/><rect x="430" y="58" width="250" height="132" rx="16" class="bio-sort-bin"/><text x="205" y="88" text-anchor="middle" class="bio-svg-title">${escapeHtml(scenario.binA)}</text><text x="555" y="88" text-anchor="middle" class="bio-svg-title">${escapeHtml(scenario.binB)}</text><g data-stage-target="right" class="bio-stage-target"><rect x="126" y="112" width="96" height="32" rx="16" class="bio-sort-chip"/><text x="174" y="133" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.itemsA[0])}</text><rect x="236" y="112" width="74" height="32" rx="16" class="bio-sort-chip"/><text x="273" y="133" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.itemsA[1])}</text></g><g data-stage-target="left" class="bio-stage-target"><rect x="474" y="112" width="82" height="32" rx="16" class="bio-sort-chip"/><text x="515" y="133" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.itemsB[0])}</text><rect x="570" y="112" width="82" height="32" rx="16" class="bio-sort-chip"/><text x="611" y="133" text-anchor="middle" class="bio-svg-muted">${escapeHtml(scenario.itemsB[1])}</text></g><text x="380" y="216" text-anchor="middle" class="bio-insight-graphic-label">Sortiere mit Merkmalen, nicht nach Gefühl.</text></svg>`;
    }
    return `<svg viewBox="0 0 760 260" role="img" aria-label="Lupe, Notiz und Beleg als Forschungsweg"><rect x="18" y="18" width="724" height="224" rx="18" class="bio-stage-bg"/><g data-stage-target="left" class="bio-stage-target"><circle cx="210" cy="112" r="46" class="bio-observe-lens"/><line x1="244" y1="146" x2="292" y2="194" class="bio-model-line"/></g><g data-stage-target="middle" class="bio-stage-target"><rect x="340" y="66" width="108" height="128" rx="12" class="bio-note-sheet"/><line x1="362" y1="98" x2="426" y2="98" class="bio-note-line"/><line x1="362" y1="124" x2="426" y2="124" class="bio-note-line"/></g><g data-stage-target="right" class="bio-stage-target"><path d="M520 160 C555 82 608 82 642 160" class="bio-model-line"/><circle cx="520" cy="160" r="13" class="bio-model-end"/><circle cx="642" cy="160" r="13" class="bio-model-end"/></g><text x="380" y="226" text-anchor="middle" class="bio-insight-graphic-label">${escapeHtml(scenario.conclusion)}</text></svg>`;
}

function buildBioInsightGame(prompt, topicId, sectionIndex, gameIndex) {
    const setup = inferBioInsightGame(prompt);
    const scenario = getBioScenario(prompt, setup.type);
    const actions = getBioInsightActions(setup, scenario, topicId, sectionIndex, gameIndex);
    const game = document.createElement('div');
    game.className = 'bio-insight-game interactive-zone';
    game.dataset.bioInsightGame = `${topicId}-${sectionIndex}-${gameIndex}`;
    game.dataset.bioInsightHint = setup.hint;
    game.innerHTML = `
        <div class="bio-insight-game-head"><span class="bio-insight-game-kicker">Anwendungsspiel</span><h3>${escapeHtml(setup.title)}</h3></div>
        <p class="bio-insight-mission"><strong>Auftrag:</strong> ${escapeHtml(prompt)}</p>
        <div class="bio-insight-stage" data-bio-insight-stage data-state="idle">${buildBioInsightVisual(setup, scenario)}</div>
        <div class="bio-graphic-actions" role="group" aria-label="Interaktive Entscheidung zum Auftrag">
            ${actions.map(action => `<button type="button" class="bio-insight-choice" data-bio-insight-action data-correct="${action.correct ? 'true' : 'false'}" data-visual-state="${escapeHtmlAttr(action.state)}" data-note="${escapeHtmlAttr(action.note)}">${escapeHtml(action.text)}</button>`).join('')}
        </div>
        <p class="bio-insight-feedback" role="status" aria-live="polite" aria-atomic="true"></p>
    `;
    game.addEventListener('click', event => {
        const button = event.target.closest('[data-bio-insight-action]');
        if (!button) return;
        handleBioInsightChoice(button);
    });
    return game;
}

function handleBioInsightChoice(button) {
    const game = button.closest('[data-bio-insight-game]');
    if (!game) return;
    const feedback = game.querySelector('.bio-insight-feedback');
    const stage = game.querySelector('[data-bio-insight-stage]');
    const note = button.dataset.note || '';
    const state = button.dataset.visualState || 'middle';
    const hint = game.dataset.bioInsightHint || '';
    const isCorrect = button.dataset.correct === 'true';
    game.querySelectorAll('[data-bio-insight-action]').forEach(choice => {
        choice.classList.remove('is-correct', 'is-wrong');
        choice.setAttribute('aria-pressed', 'false');
    });
    button.setAttribute('aria-pressed', 'true');
    if (stage) {
        stage.dataset.state = isCorrect ? 'correct' : 'wrong';
        stage.querySelectorAll('[data-stage-target]').forEach(target => {
            target.classList.toggle('is-active', target.dataset.stageTarget === state);
        });
        const label = stage.querySelector('.bio-insight-graphic-label');
        if (label && note) label.textContent = note;
    }
    if (isCorrect) {
        button.classList.add('is-correct');
        if (typeof playSuccessSound === 'function') playSuccessSound();
        if (feedback) {
            feedback.textContent = `Genau. ${note || hint}`;
            feedback.className = 'bio-insight-feedback is-correct';
        }
    } else {
        button.classList.add('is-wrong');
        if (feedback) {
            feedback.textContent = `Noch nicht. ${note || hint}`;
            feedback.className = 'bio-insight-feedback is-wrong';
        }
    }
}

function addBioInsightGames(root, topicId, sectionIndex) {
    const insightCards = Array.from(root.querySelectorAll('.bio-competency-card, .bio-check-card'))
        .filter(card => normalizeBioLabel(card.querySelector('strong')?.textContent) === 'Erkenntnis');

    insightCards.forEach((card, gameIndex) => {
        const clone = card.cloneNode(true);
        const label = clone.querySelector('strong');
        if (label) label.remove();
        const prompt = normalizeBioLabel(clone.textContent);
        if (!prompt) return;
        const grid = card.closest('.bio-competency-grid, .bio-check-grid') || card;
        if (grid.nextElementSibling?.classList.contains('bio-insight-game')) return;
        grid.insertAdjacentElement('afterend', buildBioInsightGame(prompt, topicId, sectionIndex, gameIndex));
    });

    const insightItems = Array.from(root.querySelectorAll('.bio-section-check li'))
        .filter(item => /^Erkenntnis\s*:/i.test(normalizeBioLabel(item.textContent)));

    insightItems.forEach((item, gameIndex) => {
        const prompt = extractBioInsightPrompt(item);
        if (!prompt) return;
        const check = item.closest('.bio-section-check');
        if (!check || check.nextElementSibling?.classList.contains('bio-insight-game')) return;
        check.insertAdjacentElement('afterend', buildBioInsightGame(prompt, topicId, sectionIndex, gameIndex));
    });
}

function enhanceBiologyCard(card, topicId, sectionIndex) {
    mergeBiologyLearningGoalCards(card);
    softenBiologyCompetencyLanguage(card);
    mergeBiologyWorkAssignment(card);
}

function isCorrectAnswer(answer) {
    return answer && (answer.correct === true || answer.correct === 'true');
}

function cleanQuestionText(question) {
    return stripQuestionNumber(String(question || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function normalizeQuizQuestion(q, source, index) {
    if (!q || !Array.isArray(q.answers) || q.answers.length < 2) return null;
    const question = cleanQuestionText(q.question);
    if (!question) return null;

    const answers = q.answers
        .filter(ans => ans && ans.text)
        .map(ans => ({
            text: String(ans.text),
            correct: isCorrectAnswer(ans),
            feedback: ans.feedback ? String(ans.feedback) : ''
        }));

    if (answers.length < 2 || !answers.some(ans => ans.correct)) return null;

    return {
        id: String(q.id || `${source}_${index}`),
        source,
        question,
        answers
    };
}

function collectChapterQuizQuestions(topic) {
    const seen = new Set();
    const addUnique = (list, q) => {
        if (!q) return;
        const key = `${q.question.toLowerCase()}|${q.answers.map(ans => ans.text.toLowerCase()).join('|')}`;
        if (seen.has(key)) return;
        seen.add(key);
        list.push(q);
    };

    const sectionQuestions = [];
    (topic.sections || []).forEach((section, sectionIndex) => {
        (section.quizzes || []).forEach((q, quizIndex) => {
            if (q && q.practiceOnly) return;
            addUnique(sectionQuestions, normalizeQuizQuestion(q, `section_${sectionIndex}`, quizIndex));
        });
    });

    const topicQuestions = [];
    (topic.quizzes || []).forEach((q, quizIndex) => {
        if (q && q.practiceOnly) return;
        addUnique(topicQuestions, normalizeQuizQuestion(q, 'topic', quizIndex));
    });

    const diplomQuestions = [];
    ((topic.diplom && topic.diplom.questions) || []).forEach((q, quizIndex) => {
        addUnique(diplomQuestions, normalizeQuizQuestion(q, 'chapter', quizIndex));
    });

    const combined = [...diplomQuestions, ...sectionQuestions, ...topicQuestions];
    return combined.slice(0, 12);
}

function readChapterQuizResults() {
    try {
        return JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results') || '{}');
    } catch (error) {
        return {};
    }
}

function writeChapterQuizResults(results) {
    localStorage.setItem('sciverse_chapter_quiz_results', JSON.stringify(results || {}));
}

const CHAPTER_QUIZ_MAX_ATTEMPTS = 3;
const CHAPTER_QUIZ_REFILL_MS = 12 * 60 * 60 * 1000;

function clampChapterAttempts(value) {
    return Math.min(CHAPTER_QUIZ_MAX_ATTEMPTS, Math.max(0, Number(value) || 0));
}

function getChapterQuizResult(topicId) {
    const results = readChapterQuizResults();
    const result = results[topicId] || { attemptsUsed: 0, attempts: 0, passed: false, bestPercent: 0 };
    const now = Date.now();
    let attemptsUsed = clampChapterAttempts(result.attemptsUsed ?? result.attempts ?? 0);
    let lastAttemptAt = Number(result.lastAttemptAt || 0);
    let changed = false;

    if (!lastAttemptAt && attemptsUsed > 0) {
        lastAttemptAt = now;
        changed = true;
    }

    if (!result.passed && attemptsUsed > 0 && lastAttemptAt > 0) {
        const restored = Math.floor(Math.max(0, now - lastAttemptAt) / CHAPTER_QUIZ_REFILL_MS);
        if (restored > 0) {
            attemptsUsed = Math.max(0, attemptsUsed - restored);
            lastAttemptAt = attemptsUsed > 0 ? lastAttemptAt + restored * CHAPTER_QUIZ_REFILL_MS : 0;
            changed = true;
        }
    }

    const availableAttempts = Math.max(0, CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed);
    result.attemptsUsed = attemptsUsed;
    result.attempts = attemptsUsed;
    result.availableAttempts = availableAttempts;
    result.lastAttemptAt = lastAttemptAt;
    result.nextRefillAt = attemptsUsed > 0 ? lastAttemptAt + CHAPTER_QUIZ_REFILL_MS : 0;
    result.fullRefillAt = attemptsUsed > 0 ? lastAttemptAt + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0;
    if (result.lockUntil) {
        result.lockUntil = 0;
        changed = true;
    }

    if (changed) {
        results[topicId] = result;
        writeChapterQuizResults(results);
    }
    return result;
}

function formatWaitTime(timestamp) {
    const remaining = Math.max(0, Number(timestamp || 0) - Date.now());
    const minutes = Math.ceil(remaining / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.ceil(minutes / 60);
    return `${hours} h`;
}

function unlockChapterQuizWithPlus() {
    const quiz = window.currentChapterQuiz;
    if (!quiz) return;
    const result = getChapterQuizResult(quiz.topicId);
    if (result.passed || Number(result.availableAttempts || 0) > 0) return;

    const cost = 25;
    if (globalPhysikScore < cost) {
        alert(`Du brauchst ${cost} Punkte, um sofort einen Versuch aufzufüllen.`);
        return;
    }

    globalPhysikScore -= cost;
    localStorage.setItem('physik_score', globalPhysikScore);
    if (typeof updateScoreDisplays === 'function') updateScoreDisplays();

    const attemptsUsed = Math.max(0, clampChapterAttempts(result.attemptsUsed) - 1);
    const now = Date.now();
    const results = readChapterQuizResults();
    results[quiz.topicId] = {
        ...result,
        attemptsUsed,
        attempts: attemptsUsed,
        availableAttempts: CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed,
        lastAttemptAt: attemptsUsed > 0 ? now : 0,
        nextRefillAt: attemptsUsed > 0 ? now + CHAPTER_QUIZ_REFILL_MS : 0,
        fullRefillAt: attemptsUsed > 0 ? now + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0,
        lockUntil: 0
    };
    writeChapterQuizResults(results);
    location.reload();
}

function getTopicSequence(topicId) {
    const curriculum = (window.parent && window.parent.SCIVERSE_CURRICULUM) || window.SCIVERSE_CURRICULUM;
    if (!curriculum) return null;

    for (const subject of Object.values(curriculum)) {
        const topics = (subject.topics || []).filter(topic => topic && topic.available !== false);
        const index = topics.findIndex(topic => topic.id === topicId);
        if (index >= 0) return { topics, index };
    }
    return null;
}

function isChapterQuizUnlocked(topicId) {
    const sequence = getTopicSequence(topicId);
    if (!sequence || sequence.index <= 0) return true;

    const previous = sequence.topics[sequence.index - 1];
    if (!previous) return true;

    if (getChapterQuizResult(previous.id).passed) return true;
    try {
        const topicScores = JSON.parse(localStorage.getItem('physik_topic_scores') || '{}');
        return Number(topicScores[previous.id] || 0) > 70;
    } catch (error) {
        return false;
    }
}

function renderPracticeBox(q) {
    const normalized = normalizeQuizQuestion(q, 'practice', 0);
    if (!normalized) return '';
    const shuffledAnswers = shuffleArray([...normalized.answers]);

    return `
        <div class="practice-box" data-id="${escapeHtmlAttr(normalized.id)}">
            <p class="practice-label">${uiText('Übung')}</p>
            <p><strong>${escapeHtml(normalized.question)}</strong></p>
            ${shuffledAnswers.map(ans => `
                <button type="button" data-feedback="${escapeHtmlAttr(ans.feedback || '')}" onclick="handlePracticeAnswer(this, ${ans.correct}, this.dataset.feedback || null)">${escapeHtml(ans.text)}</button>
            `).join('')}
            <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
        </div>
    `;
}

function renderChapterQuizCard(topicId, topic, questions) {
    const result = getChapterQuizResult(topicId);
    const unlocked = isChapterQuizUnlocked(topicId);
    const attemptsAvailable = result.passed
        ? CHAPTER_QUIZ_MAX_ATTEMPTS
        : Math.max(0, Number(result.availableAttempts ?? (CHAPTER_QUIZ_MAX_ATTEMPTS - Number(result.attempts || 0))));
    const attemptsUsed = clampChapterAttempts(result.attemptsUsed ?? result.attempts ?? 0);
    const needsRefill = !result.passed && attemptsAvailable <= 0;

    if (!questions.length) {
        return `
            <div class="card chapter-quiz-card">
                <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
                <h2>Verständnischeck</h2>
                <p>${uiText('Für dieses Kapitel wird das Kapitelquiz gerade vorbereitet. Die Übungen im Text bleiben zum Trainieren sichtbar.')}</p>
            </div>
        `;
    }

    const lockText = !unlocked
        ? uiText('Dieses Kapitelquiz wird freigeschaltet, sobald du das vorherige Kapitelquiz bestanden hast.')
        : needsRefill
            ? `Du hast gerade keinen Versuch frei. Ein neuer Versuch kommt in ${formatWaitTime(result.nextRefillAt)} zurück. Wenn du nicht weiter probierst, sind in ${formatWaitTime(result.fullRefillAt)} wieder alle 3 Versuche verfügbar.`
            : (!result.passed && attemptsUsed > 0 && result.nextRefillAt)
                ? `${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(result.nextRefillAt)}.`
                : '';

    const buttonDisabled = !unlocked || needsRefill;
    const status = result.passed
        ? `Bestanden: ${Math.round(result.bestPercent || 0)}%`
        : `${attemptsAvailable} / ${CHAPTER_QUIZ_MAX_ATTEMPTS} ${uiText('Versuchen verfügbar')}`;

    return `
        <div class="card chapter-quiz-card" id="chapter-quiz-card">
            <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
            <h2>${escapeHtml(topic.chapterQuizTitle || 'Verständnischeck zum Kapitel')}</h2>
            <p>${uiText('Hier zählt nur dein Verständnis. Du kannst im Quiz alle Antworten ändern und gibst erst am Ende ab. Ab mehr als 70% gilt das Kapitel als geschafft.')}</p>
            <div class="chapter-quiz-meta">
                <span>${escapeHtml(status)}</span>
                <span>${questions.length} ${uiText('Aufgaben')}</span>
            </div>
            ${lockText ? `<p class="chapter-lock">${escapeHtml(lockText)}</p>` : ''}
            ${needsRefill ? `<button type="button" onclick="unlockChapterQuizWithPlus()">${uiText('Für 25 Punkte einen Versuch auffüllen')}</button>` : ''}
            <button id="chapter-quiz-launch" type="button" onclick="startChapterQuiz()" ${buttonDisabled ? 'disabled' : ''}>${uiText('Kapitelquiz öffnen')}</button>
        </div>
    `;
}

function renderChapterQuizPanel(topicId, topic, questions) {
    const questionHtml = questions.map((q, questionIndex) => {
        const answers = shuffleArray(q.answers.map((ans, originalIndex) => ({ ...ans, originalIndex })));
        return `
            <fieldset class="chapter-question" data-question-index="${questionIndex}">
                <legend>${questionIndex + 1}. ${escapeHtml(q.question)}</legend>
                <div class="chapter-options">
                    ${answers.map(ans => `
                        <label>
                            <input type="radio" name="chapter_q_${questionIndex}" value="${ans.originalIndex}">
                            <span>${escapeHtml(ans.text)}</span>
                        </label>
                    `).join('')}
                </div>
            </fieldset>
        `;
    }).join('');

    return `
        <div id="chapter-quiz-panel" class="chapter-quiz-panel" hidden>
            <div class="chapter-quiz-panel-header">
                <p class="chapter-quiz-kicker">${uiText('Kapitelquiz')}</p>
                <h1>${escapeHtml(topic.title || uiText('Kapitelquiz'))}</h1>
                <p>${uiText('Die Lerninhalte sind während des Tests ausgeblendet. Lies genau, wähle deine Antworten und gib erst ab, wenn du fertig bist.')}</p>
            </div>
            <form id="chapter-quiz-form">
                ${questionHtml}
                <div class="chapter-quiz-actions">
                    <button type="button" onclick="closeChapterQuiz()">${uiText('Zurück zum Kapitel')}</button>
                    <button type="button" class="chapter-submit-btn" onclick="submitChapterQuiz()">${uiText('Abgeben')}</button>
                </div>
            </form>
            <div id="chapter-quiz-result" class="chapter-result" role="status" aria-live="polite"></div>
        </div>
    `;
}

async function renderTopic() {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    const lang = localStorage.getItem('physik_lang') || 'de';
    document.documentElement.lang = lang;

    const container = document.getElementById('sections-container');

    if (!topicId) {
        showError(uiText("Kein Thema ausgewählt."));
        return;
    }

    try {
        // Fetch language data (added cache busting)
        let response = await fetch(`../lang/${lang}.json?v=8.4`);
        let langData = await response.json();
        let topic = langData[topicId];
        let germanTopic = null;

        if (lang !== 'de') {
            const deRes = await fetch(`../lang/de.json?v=8.4`);
            const deData = await deRes.json();
            germanTopic = deData[topicId];
        }

        // Fallback to German
        if (!topic && germanTopic) {
            topic = germanTopic;
        }

        if (!topic) {
            showError(`Das Thema "${topicId}" wurde nicht gefunden.`);
            return;
        }

        if (germanTopic) {
            topic = withCurrentInteractiveStructure(topic, germanTopic);
        }

        document.title = topic.title;
        document.getElementById('topic-title').innerHTML = topic.title;
        document.getElementById('topic-subtitle').innerHTML = topic.subtitle;

        container.innerHTML = "";

        if (topicId.startsWith('math')) {
            document.body.classList.add('math-theme');
            if (!['mathespiel', 'math_kaenguru'].includes(topicId)) {
                const wsBtn = document.createElement('button');
                wsBtn.innerHTML = `🖨️ ${uiText('Arbeitsblätter zum Üben drucken')}`;
                wsBtn.className = 'worksheet-btn';
                wsBtn.onclick = () => window.open('worksheet.html?topic=' + topicId, '_blank');
                container.appendChild(wsBtn);
            }
        } else {
            document.body.classList.remove('math-theme');
        }

        const topicQuizMap = new Map((topic.quizzes || []).map(q => [q.id, q]));
        const chapterQuestions = collectChapterQuizQuestions(topic);
        let practiceCount = 0;
        const configuredPracticeLimit = Number(topic.inlinePracticeLimit);
        const maxInlinePractice = Number.isFinite(configuredPracticeLimit)
            ? Math.max(0, configuredPracticeLimit)
            : Math.min(5, Math.max(2, (topic.sections || []).length));

        topic.sections.forEach((section, sectionIndex) => {
            const card = document.createElement('div');
            card.className = "card";
            
            let html = `<h2>${section.title}</h2>`;
            let content = section.content;
            const sectionQuizMap = new Map((section.quizzes || []).map(q => [q.id, q]));

            // Replace quiz placeholders from old section quizzes and newer topic-level quizzes.
            content = content.replace(/\{\{QUIZ_([^}]+)\}\}/g, (match, quizId) => {
                const q = sectionQuizMap.get(quizId) || topicQuizMap.get(quizId);
                if (!q || practiceCount >= maxInlinePractice) return '';
                practiceCount += 1;
                return renderPracticeBox(q);
            });

            html += content;
            card.innerHTML = html;
            if (topicId.startsWith('bio_')) {
                enhanceBiologyCard(card, topicId, sectionIndex);
            }
            container.appendChild(card);
        });

        // The old diploma quiz renderer is kept inactive while chapter quizzes use the new test flow.
        if (false && topic.diplom) {
            const diplomCard = document.createElement('div');
            diplomCard.className = "card";
            diplomCard.style.border = "5px solid var(--primary)";
            
            let diplomHtml = `<h2 style="text-align: center; color: var(--primary);">🎓 ${topic.diplom.title}</h2>`;
            diplomHtml += `<p style="text-align: center;">Zeige, was du gelernt hast!</p>`;
            
            topic.diplom.questions.forEach((q, i) => {
                // LIVE SHUFFLE: Randomize diplom answers too
                const shuffledAnswers = shuffleArray([...q.answers]);
                
                diplomHtml += `
                    <div class="quiz-box" data-id="${q.id}">
                        <p><strong>${i+1}. ${stripQuestionNumber(q.question)}</strong></p>
                            ${shuffledAnswers.map(ans => `
                            <button type="button" data-feedback="${escapeHtmlAttr(ans.feedback || '')}" onclick="handleAnswer(this, ${ans.correct}, ${ans.pts}, this.dataset.feedback || null)">${ans.text}</button>
                        `).join('')}
                        <p class="feedback" role="status" aria-live="polite" aria-atomic="true"></p>
                    </div>
                `;
            });
            diplomCard.innerHTML = diplomHtml;
            container.appendChild(diplomCard);
        }

        const quizWrapper = document.createElement('div');
        quizWrapper.innerHTML = renderChapterQuizCard(topicId, topic, chapterQuestions) + renderChapterQuizPanel(topicId, topic, chapterQuestions);
        container.appendChild(quizWrapper);
        window.currentChapterQuiz = { topicId, topicTitle: topic.title, questions: chapterQuestions };

        // Check which questions are already solved
        if (typeof checkAnsweredStatus === 'function') {
            checkAnsweredStatus();
        }

        // Load optional topic script
        if (topic.script !== false) {
            const script = document.createElement('script');
            script.src = `../js/topics/${topicId}.js?v=8.6`;
            script.async = false;
            script.onload = () => {
                if (typeof topicInit === 'function') {
                    try {
                        topicInit();
                    } catch (e) {
                        console.error(`Error in topicInit for ${topicId}:`, e);
                    }
                }
            };
            document.body.appendChild(script);
        }

    } catch (e) {
        console.error("Render Error:", e);
        showError(uiText("Fehler beim Laden des Inhalts. Bitte überprüfe deine Internetverbindung."));
    }
}

function setLearningContentVisible(isVisible) {
    ['topic-title', 'topic-subtitle', 'score-board'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = !isVisible;
    });

    document.querySelectorAll('#sections-container > .card, #sections-container > .worksheet-btn, #chapter-quiz-card')
        .forEach(el => {
            el.hidden = !isVisible;
        });
}

function startChapterQuiz() {
    const quiz = window.currentChapterQuiz;
    if (!quiz || !quiz.questions || !quiz.questions.length) return;
    if (!isChapterQuizUnlocked(quiz.topicId)) return;

    const result = getChapterQuizResult(quiz.topicId);
    if (!result.passed && Number(result.availableAttempts || 0) <= 0) return;

    const panel = document.getElementById('chapter-quiz-panel');
    if (!panel) return;

    setLearningContentVisible(false);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeChapterQuiz() {
    const panel = document.getElementById('chapter-quiz-panel');
    if (panel) panel.hidden = true;
    setLearningContentVisible(true);
    const card = document.getElementById('chapter-quiz-card');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitChapterQuiz() {
    const quiz = window.currentChapterQuiz;
    const form = document.getElementById('chapter-quiz-form');
    const resultBox = document.getElementById('chapter-quiz-result');
    if (!quiz || !form || !resultBox) return;

    const previousResult = getChapterQuizResult(quiz.topicId);
    if (!previousResult.passed && Number(previousResult.availableAttempts || 0) <= 0) {
        resultBox.innerHTML = `<p class="wrong">${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(previousResult.nextRefillAt)}.</p>`;
        return;
    }

    const answers = quiz.questions.map((q, index) => {
        const selected = form.querySelector(`input[name="chapter_q_${index}"]:checked`);
        return selected ? Number(selected.value) : null;
    });

    const firstMissing = answers.findIndex(value => value === null);
    if (firstMissing >= 0) {
        resultBox.innerHTML = `<p class="wrong">${uiText('Bitte beantworte zuerst Aufgabe')} ${firstMissing + 1}. ${uiText('Du kannst deine Antworten vor der Abgabe noch ändern.')}</p>`;
        return;
    }

    let correct = 0;
    const details = quiz.questions.map((q, index) => {
        const selectedAnswer = q.answers[answers[index]];
        const isCorrect = Boolean(selectedAnswer && selectedAnswer.correct);
        if (isCorrect) correct += 1;
        return { question: q, selectedAnswer, isCorrect };
    });

    const percent = Math.round((correct / quiz.questions.length) * 100);
    const passed = percent > 70;
    const now = Date.now();
    const attemptsUsed = previousResult.passed
        ? clampChapterAttempts(previousResult.attemptsUsed ?? previousResult.attempts ?? 0)
        : clampChapterAttempts((previousResult.attemptsUsed ?? previousResult.attempts ?? 0) + 1);
    const lastAttemptAt = previousResult.passed ? Number(previousResult.lastAttemptAt || 0) : now;
    const results = readChapterQuizResults();
    const nextResult = {
        ...previousResult,
        attemptsUsed,
        attempts: attemptsUsed,
        availableAttempts: CHAPTER_QUIZ_MAX_ATTEMPTS - attemptsUsed,
        lastAttemptAt,
        nextRefillAt: attemptsUsed > 0 ? lastAttemptAt + CHAPTER_QUIZ_REFILL_MS : 0,
        fullRefillAt: attemptsUsed > 0 ? lastAttemptAt + attemptsUsed * CHAPTER_QUIZ_REFILL_MS : 0,
        lockUntil: 0,
        passed: Boolean(previousResult.passed || passed),
        bestPercent: Math.max(Number(previousResult.bestPercent || 0), percent),
        lastPercent: percent,
        lastCorrect: correct,
        total: quiz.questions.length
    };
    results[quiz.topicId] = nextResult;
    writeChapterQuizResults(results);

    let topicScores = JSON.parse(localStorage.getItem('physik_topic_scores') || '{}');
    const oldTopicScore = Number(topicScores[quiz.topicId] || 0);
    const newTopicScore = Math.max(oldTopicScore, nextResult.passed ? nextResult.bestPercent : 0);
    if (newTopicScore > oldTopicScore) {
        topicScores[quiz.topicId] = newTopicScore;
        localStorage.setItem('physik_topic_scores', JSON.stringify(topicScores));
        globalPhysikScore += Math.round(newTopicScore - oldTopicScore);
        localStorage.setItem('physik_score', globalPhysikScore);
        if (typeof updateScoreDisplays === 'function') updateScoreDisplays();
    }

    form.querySelectorAll('input').forEach(input => input.disabled = true);
    const submitButton = form.querySelector('.chapter-submit-btn');
    if (submitButton) submitButton.disabled = true;

    const attemptsLeft = Math.max(0, CHAPTER_QUIZ_MAX_ATTEMPTS - nextResult.attemptsUsed);
    const detailHtml = details.slice(0, 4).map((detail, index) => `
        <li>
            <strong>${index + 1}.</strong>
            ${detail.isCorrect ? uiText('Richtig') : uiText('Noch nicht')}${detail.selectedAnswer && detail.selectedAnswer.feedback ? `: ${escapeHtml(detail.selectedAnswer.feedback)}` : ''}
        </li>
    `).join('');

    resultBox.innerHTML = `
        <div class="${passed ? 'chapter-passed' : 'chapter-failed'}">
            <h2>${passed ? uiText('Bestanden') : uiText('Noch nicht bestanden')}</h2>
            <p>${correct} von ${quiz.questions.length} richtig: <strong>${percent}%</strong>.</p>
            <p>${passed ? uiText('Das nächste Kapitelquiz ist jetzt freigeschaltet.') : attemptsLeft > 0 ? `${uiText('Du brauchst mehr als 70%. Übrige Versuche:')} ${attemptsLeft}.` : `${uiText('Ein weiterer Versuch füllt sich in')} ${formatWaitTime(nextResult.nextRefillAt)}.`}</p>
            ${detailHtml ? `<ul>${detailHtml}</ul>` : ''}
            <div class="chapter-quiz-actions">
                <button type="button" onclick="location.reload()">${passed ? uiText('Zurück zum Kapitel') : uiText('Noch einmal lernen')}</button>
                ${!passed && attemptsLeft > 0 ? `<button type="button" onclick="location.reload();">${uiText('Neuen Versuch starten')}</button>` : ''}
            </div>
        </div>
    `;
}

function showError(msg) {
    const container = document.getElementById('sections-container');
    container.innerHTML = `
        <div class="card" style="text-align: center; border-top: 4px solid #e53e3e;">
            <h2 style="color: #e53e3e;">⚠️ Hoppla!</h2>
            <p>${msg}</p>
            <button onclick="location.reload()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Seite neu laden</button>
        </div>
    `;
}

function escapeHtmlAttr(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Listen for theme changes from parent
window.addEventListener('message', (e) => {
    if (e.data.type === 'themeChange') {
        if (e.data.isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Sync initial theme
    if (localStorage.getItem('physik_dark_mode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    renderTopic();
});

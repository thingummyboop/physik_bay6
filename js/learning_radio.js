(function () {
    "use strict";

    if (window.self !== window.top) return;
    if (window.__sciverseLearningRadio) return;
    window.__sciverseLearningRadio = true;

    const STORAGE_KEY = "sciverse_learning_radio_on";
    const VOLUME_KEY = "sciverse_learning_radio_volume";
    const TRACK_SELECTION_KEY = "sciverse_learning_radio_disabled_tracks";
    const RADIO_TEXT = {
        de: {
            ready: "Lernradio bereit",
            hint: "Klick auf das violette Radio startet ruhige Lernmusik.",
            on: "Lernmusik ausschalten",
            off: "Lernmusik einschalten",
            volume: "Lautstaerke",
            volumeHelp: "Regelt nur die Lernmusik.",
            volumeValue: (value) => `${value} Prozent Lautstaerke`,
            settings: "Musikstuecke auswaehlen",
            settingsTitle: "Musikstuecke auswaehlen",
            settingsIntro: "Nimm den Haken weg, wenn ein Stueck nicht im Lernradio laufen soll.",
            closeSettings: "Fenster schliessen",
            keepOne: "Mindestens ein Musikstueck muss aktiv bleiben."
        },
        en: {
            ready: "Learning radio ready",
            hint: "Click the purple radio to start calm study music.",
            on: "Turn study music off",
            off: "Turn study music on",
            volume: "Volume",
            volumeHelp: "Controls the study music only.",
            volumeValue: (value) => `${value} percent volume`,
            settings: "Choose music tracks",
            settingsTitle: "Choose music tracks",
            settingsIntro: "Remove the check mark when a track should not play in the learning radio.",
            closeSettings: "Close window",
            keepOne: "At least one music track must stay active."
        }
    };

    const TRACKS = [
        {
            title: "Study And Relax",
            artist: "Kevin MacLeod",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Study_And_Relax_by_Kevin_MacLeod.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Study_And_Relax_by_Kevin_MacLeod.ogg"
        },
        {
            title: "Wholesome",
            artist: "Kevin MacLeod",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Wholesome_by_Kevin_MacLeod.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Wholesome_by_Kevin_MacLeod.ogg"
        },
        {
            title: "Ambient",
            artist: "Brenticus",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Brenticus_-_Ambient.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/0/01/Brenticus_-_Ambient.ogg"
        },
        {
            title: "Meditation Impromptu 01",
            artist: "Kevin MacLeod",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_01_-_Meditation_Impromptu_01.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/6/67/Kevin_MacLeod_-_01_-_Meditation_Impromptu_01.ogg"
        },
        {
            title: "Peaceful",
            artist: "Tamlin Lollis Love",
            license: "CC BY-SA 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Peaceful.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Peaceful.ogg"
        },
        {
            title: "Ambient 507050",
            artist: "Steve Combs",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Steve_Combs_-_10_-_Ambient_507050.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/8/89/Steve_Combs_-_10_-_Ambient_507050.ogg"
        },
        {
            title: "Evolution - Instrumental Version",
            artist: "Josh Woodward",
            license: "CC BY 3.0 US",
            page: "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_10_-_Evolution_Instrumental_Version.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/8/86/Josh_Woodward_-_10_-_Evolution_Instrumental_Version.ogg"
        },
        {
            title: "Tranquility",
            artist: "Kevin MacLeod",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Tranquility.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Kevin_MacLeod_-_Tranquility.ogg"
        },
        {
            title: "Inner Light",
            artist: "Kevin MacLeod",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Inner_Light.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kevin_MacLeod_-_Inner_Light.ogg"
        },
        {
            title: "Soporific",
            artist: "Kevin MacLeod",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Soporific.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Kevin_MacLeod_-_Soporific.ogg"
        },
        {
            title: "Long Trail",
            artist: "Kevin MacLeod",
            license: "Public Domain",
            page: "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Long_Trail.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Kevin_MacLeod_-_Long_Trail.ogg"
        },
        {
            title: "Direct to Video",
            artist: "Chris Zabriskie",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Chris_Zabriskie_-_01_-_Direct_to_Video.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Chris_Zabriskie_-_01_-_Direct_to_Video.ogg"
        },
        {
            title: "Prelude No. 10",
            artist: "Chris Zabriskie",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Chris_Zabriskie_-_10_-_Prelude_No_10.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Chris_Zabriskie_-_10_-_Prelude_No_10.ogg"
        },
        {
            title: "Prelude No. 18",
            artist: "Chris Zabriskie",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Chris_Zabriskie_-_18_-_Prelude_No_18.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chris_Zabriskie_-_18_-_Prelude_No_18.ogg"
        },
        {
            title: "It's Always Too Late to Start Over",
            artist: "Chris Zabriskie",
            license: "CC BY 4.0",
            page: "https://commons.wikimedia.org/wiki/File:Chris_Zabriskie_-_07_-_Its_Always_Too_Late_to_Start_Over.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Chris_Zabriskie_-_07_-_Its_Always_Too_Late_to_Start_Over.ogg"
        }
    ];

    let audio;
    let button;
    let titleEl;
    let metaEl;
    let panel;
    let settingsButton;
    let volumeEl;
    let trackDialog;
    let trackListEl;
    let trackNoticeEl;
    let closeDialogButton;
    let lastFocusedElement;
    let noticeTimer;
    let enabled = false;
    let order = [];
    let currentIndex = -1;
    let disabledTrackKeys = readDisabledTrackKeys();

    function radioText(key, value) {
        const lang = localStorage.getItem("physik_lang") || "de";
        const dict = RADIO_TEXT[lang] || RADIO_TEXT.en;
        const entry = dict[key] || RADIO_TEXT.de[key] || key;
        return typeof entry === "function" ? entry(value) : entry;
    }

    function shuffle(items) {
        const next = items.slice();
        for (let i = next.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [next[i], next[j]] = [next[j], next[i]];
        }
        return next;
    }

    function trackKey(index) {
        const track = TRACKS[index];
        return track ? track.src : String(index);
    }

    function readDisabledTrackKeys() {
        try {
            const value = JSON.parse(localStorage.getItem(TRACK_SELECTION_KEY) || "[]");
            return new Set(Array.isArray(value) ? value : []);
        } catch (error) {
            return new Set();
        }
    }

    function saveDisabledTrackKeys() {
        const orderedKeys = TRACKS.map((_, index) => trackKey(index)).filter((key) => disabledTrackKeys.has(key));
        localStorage.setItem(TRACK_SELECTION_KEY, JSON.stringify(orderedKeys));
    }

    function sanitizeDisabledTrackKeys() {
        const validKeys = new Set(TRACKS.map((_, index) => trackKey(index)));
        let changed = false;
        disabledTrackKeys.forEach((key) => {
            if (!validKeys.has(key)) {
                disabledTrackKeys.delete(key);
                changed = true;
            }
        });
        const hasEnabledTrack = TRACKS.some((_, index) => !disabledTrackKeys.has(trackKey(index)));
        if (!hasEnabledTrack) {
            disabledTrackKeys.clear();
            changed = true;
        }
        if (changed) saveDisabledTrackKeys();
    }

    function getEnabledTrackIndexes() {
        sanitizeDisabledTrackKeys();
        return TRACKS.map((_, index) => index).filter((index) => !disabledTrackKeys.has(trackKey(index)));
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function refillOrder() {
        const previous = currentIndex;
        order = shuffle(getEnabledTrackIndexes());
        if (order.length > 1 && order[0] === previous) {
            [order[0], order[1]] = [order[1], order[0]];
        }
    }

    function nextTrack() {
        if (!order.length) refillOrder();
        currentIndex = order.shift();
        if (typeof currentIndex !== "number") {
            enabled = false;
            updateUi();
            return;
        }
        const track = TRACKS[currentIndex];
        audio.src = track.src;
        audio.load();
        titleEl.textContent = track.title;
        metaEl.textContent = `${track.artist} - ${track.license}`;
        audio.play().catch(() => {
            enabled = false;
            updateUi();
        });
    }

    function updateUi() {
        button.classList.toggle("is-on", enabled);
        button.setAttribute("aria-pressed", String(enabled));
        button.setAttribute("aria-label", enabled ? radioText("on") : radioText("off"));
        panel.classList.toggle("is-on", enabled);
        if (!enabled) {
            audio.pause();
        }
        localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
    }

    function updateLanguageLabels() {
        if (currentIndex < 0 && titleEl) titleEl.textContent = radioText("ready");
        if (currentIndex < 0 && metaEl) metaEl.textContent = radioText("hint");
        if (settingsButton) {
            settingsButton.setAttribute("aria-label", radioText("settings"));
            settingsButton.setAttribute("title", radioText("settings"));
        }
        if (volumeEl) {
            volumeEl.setAttribute("aria-label", radioText("volume"));
            volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Number(volumeEl.value || 0)));
        }
        const help = document.getElementById("learningRadioVolumeHelp");
        if (help) help.textContent = radioText("volumeHelp");
        const dialogTitle = document.getElementById("learningRadioSettingsTitle");
        if (dialogTitle) dialogTitle.textContent = radioText("settingsTitle");
        const dialogIntro = document.getElementById("learningRadioSettingsIntro");
        if (dialogIntro) dialogIntro.textContent = radioText("settingsIntro");
        if (closeDialogButton) closeDialogButton.setAttribute("aria-label", radioText("closeSettings"));
        if (button) updateUi();
    }

    function toggleRadio() {
        enabled = !enabled;
        updateUi();
        if (enabled && audio.paused) {
            nextTrack();
        }
    }

    function showTrackNotice(message) {
        if (!trackNoticeEl) return;
        trackNoticeEl.textContent = message;
        trackNoticeEl.hidden = false;
        window.clearTimeout(noticeTimer);
        noticeTimer = window.setTimeout(() => {
            if (trackNoticeEl) trackNoticeEl.hidden = true;
        }, 3200);
    }

    function applyTrackSelectionChange() {
        order = order.filter((index) => !disabledTrackKeys.has(trackKey(index)));
        if (currentIndex >= 0 && disabledTrackKeys.has(trackKey(currentIndex))) {
            audio.pause();
            currentIndex = -1;
            if (enabled) {
                nextTrack();
            } else {
                titleEl.textContent = radioText("ready");
                metaEl.textContent = radioText("hint");
            }
        }
    }

    function handleTrackToggle(event) {
        const input = event.currentTarget;
        const index = Number(input.dataset.trackIndex);
        const key = trackKey(index);
        if (!input.checked) {
            if (getEnabledTrackIndexes().length <= 1) {
                input.checked = true;
                showTrackNotice(radioText("keepOne"));
                renderTrackChoices();
                return;
            }
            disabledTrackKeys.add(key);
        } else {
            disabledTrackKeys.delete(key);
        }
        saveDisabledTrackKeys();
        applyTrackSelectionChange();
        renderTrackChoices();
    }

    function renderTrackChoices() {
        if (!trackListEl) return;
        const enabledCount = getEnabledTrackIndexes().length;
        trackListEl.innerHTML = TRACKS.map((track, index) => {
            const checked = !disabledTrackKeys.has(trackKey(index));
            const locked = checked && enabledCount <= 1;
            return `
                <label class="learning-radio-track-option">
                    <input type="checkbox" data-track-index="${index}" ${checked ? "checked" : ""}${locked ? " disabled" : ""}>
                    <span>
                        <strong>${escapeHtml(track.title)}</strong>
                        <small>${escapeHtml(track.artist)} - ${escapeHtml(track.license)}</small>
                    </span>
                </label>
            `;
        }).join("");
        trackListEl.querySelectorAll("input[type='checkbox']").forEach((input) => {
            input.addEventListener("change", handleTrackToggle);
        });
    }

    function closeTrackDialog() {
        if (!trackDialog) return;
        trackDialog.classList.remove("is-open");
        trackDialog.setAttribute("hidden", "");
        document.removeEventListener("keydown", handleTrackDialogKeydown);
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function handleTrackDialogKeydown(event) {
        if (event.key === "Escape") {
            closeTrackDialog();
        }
    }

    function openTrackDialog() {
        if (!trackDialog) return;
        lastFocusedElement = document.activeElement;
        renderTrackChoices();
        trackDialog.removeAttribute("hidden");
        trackDialog.classList.add("is-open");
        document.addEventListener("keydown", handleTrackDialogKeydown);
        const firstInput = trackDialog.querySelector("input[type='checkbox']:not(:disabled)");
        const focusTarget = firstInput || closeDialogButton;
        if (focusTarget) focusTarget.focus();
    }

    function buildCredits() {
        return TRACKS.map((track) => {
            return `<a href="${track.page}" target="_blank" rel="noopener">${track.title} - ${track.artist} (${track.license})</a>`;
        }).join("");
    }

    function injectStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .learning-radio {
                align-items: center;
                background: transparent;
                border: 0;
                border-radius: 0;
                bottom: 18px;
                box-shadow: none;
                color: #fff;
                cursor: pointer;
                display: flex;
                height: 64px;
                justify-content: center;
                padding: 0;
                position: fixed;
                right: 18px;
                transition: transform 0.18s ease, box-shadow 0.18s ease;
                width: 76px;
                z-index: 5000;
            }
            .learning-radio:hover,
            .learning-radio:focus-visible {
                filter: drop-shadow(0 16px 24px rgba(88, 28, 135, 0.45));
                outline: none;
                transform: translateY(-2px);
            }
            .learning-radio.is-on {
                animation: radioPulse 1.4s ease-in-out infinite;
            }
            .learning-radio svg {
                height: 46px;
                width: 56px;
            }
            .learning-radio-panel {
                background: rgba(37, 13, 71, 0.94);
                border: 1px solid rgba(216, 180, 254, 0.65);
                border-radius: 16px;
                bottom: 86px;
                box-shadow: 0 18px 38px rgba(15, 23, 42, 0.34);
                color: #f8f0ff;
                font-family: "Segoe UI", sans-serif;
                max-width: min(320px, calc(100vw - 32px));
                opacity: 0;
                padding: 12px;
                pointer-events: none;
                position: fixed;
                right: 18px;
                transform: translateY(8px);
                transition: opacity 0.18s ease, transform 0.18s ease;
                width: 290px;
                z-index: 4999;
            }
            .learning-radio:hover + .learning-radio-panel,
            .learning-radio:focus-visible + .learning-radio-panel,
            .learning-radio-panel:hover,
            .learning-radio-panel:focus-within {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(0);
            }
            .learning-radio-heading {
                align-items: start;
                display: grid;
                gap: 8px;
                grid-template-columns: 1fr auto;
            }
            .learning-radio-title {
                display: block;
                font-size: 0.92rem;
                font-weight: 900;
                margin-bottom: 2px;
            }
            .learning-radio-meta {
                color: #e9d5ff;
                display: block;
                font-size: 0.78rem;
                line-height: 1.35;
            }
            .learning-radio-settings {
                align-items: center;
                background: rgba(250, 245, 255, 0.12);
                border: 1px solid rgba(245, 208, 254, 0.36);
                border-radius: 999px;
                color: #f8f0ff;
                cursor: pointer;
                display: inline-flex;
                flex: 0 0 auto;
                font-size: 1rem;
                height: 28px;
                justify-content: center;
                line-height: 1;
                padding: 0;
                transition: background 0.16s ease, transform 0.16s ease;
                width: 28px;
            }
            .learning-radio-settings:hover,
            .learning-radio-settings:focus-visible {
                background: rgba(250, 245, 255, 0.22);
                outline: 2px solid rgba(245, 208, 254, 0.72);
                outline-offset: 2px;
                transform: translateY(-1px);
            }
            .learning-radio-volume {
                accent-color: #c084fc;
                margin: 10px 0 6px;
                width: 100%;
            }
            .learning-radio-help {
                color: #e9d5ff;
                font-size: 0.7rem;
                line-height: 1.3;
                margin: 0 0 4px;
            }
            .learning-radio-credits {
                display: grid;
                gap: 3px;
                max-height: 86px;
                overflow: auto;
                padding-top: 6px;
            }
            .learning-radio-credits a {
                color: #f5d0fe;
                font-size: 0.68rem;
                text-decoration: none;
            }
            .learning-radio-credits a:hover {
                text-decoration: underline;
            }
            .learning-radio-dialog-backdrop {
                align-items: center;
                background: rgba(15, 23, 42, 0.42);
                display: none;
                inset: 0;
                justify-content: center;
                padding: 18px;
                position: fixed;
                z-index: 6000;
            }
            .learning-radio-dialog-backdrop.is-open {
                display: flex;
            }
            .learning-radio-dialog {
                background: #fff;
                border: 1px solid rgba(126, 34, 206, 0.18);
                border-radius: 10px;
                box-shadow: 0 24px 70px rgba(15, 23, 42, 0.32);
                color: #1f2937;
                font-family: "Segoe UI", sans-serif;
                max-height: min(680px, calc(100vh - 36px));
                overflow: hidden;
                width: min(460px, 100%);
            }
            .learning-radio-dialog-header {
                align-items: start;
                border-bottom: 1px solid #ede9fe;
                display: grid;
                gap: 12px;
                grid-template-columns: 1fr auto;
                padding: 16px 16px 12px;
            }
            .learning-radio-dialog h2 {
                color: #4c1d95;
                font-size: 1.12rem;
                line-height: 1.25;
                margin: 0 0 4px;
            }
            .learning-radio-dialog p {
                color: #4b5563;
                font-size: 0.9rem;
                line-height: 1.45;
                margin: 0;
            }
            .learning-radio-dialog-close {
                align-items: center;
                background: #f5f3ff;
                border: 1px solid #ddd6fe;
                border-radius: 999px;
                color: #4c1d95;
                cursor: pointer;
                display: inline-flex;
                font-size: 1.25rem;
                height: 32px;
                justify-content: center;
                line-height: 1;
                padding: 0 0 2px;
                width: 32px;
            }
            .learning-radio-dialog-close:hover,
            .learning-radio-dialog-close:focus-visible {
                background: #ede9fe;
                outline: 2px solid #a78bfa;
                outline-offset: 2px;
            }
            .learning-radio-track-list {
                display: grid;
                gap: 8px;
                max-height: min(430px, calc(100vh - 230px));
                overflow: auto;
                padding: 12px 16px;
            }
            .learning-radio-track-option {
                align-items: start;
                background: #fafafa;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                cursor: pointer;
                display: grid;
                gap: 10px;
                grid-template-columns: auto 1fr;
                padding: 10px;
            }
            .learning-radio-track-option:has(input:focus-visible) {
                outline: 2px solid #a78bfa;
                outline-offset: 2px;
            }
            .learning-radio-track-option input {
                accent-color: #7e22ce;
                margin-top: 3px;
            }
            .learning-radio-track-option strong {
                color: #1f2937;
                display: block;
                font-size: 0.92rem;
                line-height: 1.25;
            }
            .learning-radio-track-option small {
                color: #6b7280;
                display: block;
                font-size: 0.78rem;
                line-height: 1.35;
                margin-top: 2px;
            }
            .learning-radio-track-notice {
                background: #fef3c7;
                border-top: 1px solid #fde68a;
                color: #78350f;
                font-size: 0.84rem;
                margin: 0;
                padding: 10px 16px 12px;
            }
            @keyframes radioPulse {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-1px) scale(1.035); }
            }
            @media (max-width: 720px) {
                .learning-radio {
                    bottom: 12px;
                    right: 12px;
                }
                .learning-radio-panel {
                    bottom: 78px;
                    right: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function buildRadio() {
        injectStyles();
        audio = document.createElement("audio");
        audio.preload = "none";
        audio.volume = Number(localStorage.getItem(VOLUME_KEY) || "0.38");
        audio.addEventListener("ended", nextTrack);
        audio.addEventListener("error", () => {
            if (enabled) window.setTimeout(nextTrack, 500);
        });

        button = document.createElement("button");
        button.type = "button";
        button.className = "learning-radio";
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", "Lernmusik einschalten");
        button.innerHTML = `
            <svg viewBox="0 0 90 72" aria-hidden="true" focusable="false">
                <path d="M20 19 L62 5" stroke="#f5d0fe" stroke-width="5" stroke-linecap="round"/>
                <rect x="11" y="20" width="68" height="43" rx="13" fill="#7e22ce" stroke="#f5d0fe" stroke-width="4"/>
                <rect x="18" y="28" width="32" height="12" rx="6" fill="#d8b4fe"/>
                <circle cx="61" cy="42" r="12" fill="#581c87" stroke="#f3e8ff" stroke-width="4"/>
                <circle cx="61" cy="42" r="4" fill="#fbbf24"/>
                <path d="M23 51 H45" stroke="#f3e8ff" stroke-width="4" stroke-linecap="round"/>
                <path d="M27 58 H40" stroke="#c084fc" stroke-width="4" stroke-linecap="round"/>
                <circle cx="24" cy="34" r="3" fill="#fbbf24"/>
                <circle cx="34" cy="34" r="3" fill="#fbbf24"/>
            </svg>
        `;
        button.addEventListener("click", toggleRadio);

        panel = document.createElement("aside");
        panel.className = "learning-radio-panel";
        panel.setAttribute("role", "status");
        panel.setAttribute("aria-live", "polite");
        panel.setAttribute("aria-atomic", "true");
        panel.innerHTML = `
            <div class="learning-radio-heading">
                <span>
                    <strong class="learning-radio-title">${radioText("ready")}</strong>
                    <span class="learning-radio-meta">${radioText("hint")}</span>
                </span>
                <button class="learning-radio-settings" type="button" aria-label="${radioText("settings")}" title="${radioText("settings")}"><span aria-hidden="true">&#9881;</span></button>
            </div>
            <input class="learning-radio-volume" type="range" min="0" max="100" value="${Math.round(audio.volume * 100)}" aria-label="${radioText("volume")}" aria-describedby="learningRadioVolumeHelp">
            <p id="learningRadioVolumeHelp" class="learning-radio-help">${radioText("volumeHelp")}</p>
            <div class="learning-radio-credits">${buildCredits()}</div>
        `;
        titleEl = panel.querySelector(".learning-radio-title");
        metaEl = panel.querySelector(".learning-radio-meta");
        settingsButton = panel.querySelector(".learning-radio-settings");
        volumeEl = panel.querySelector(".learning-radio-volume");
        settingsButton.addEventListener("click", openTrackDialog);
        volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Math.round(audio.volume * 100)));
        volumeEl.addEventListener("input", () => {
            audio.volume = Number(volumeEl.value) / 100;
            volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Math.round(audio.volume * 100)));
            localStorage.setItem(VOLUME_KEY, String(audio.volume));
        });

        trackDialog = document.createElement("div");
        trackDialog.className = "learning-radio-dialog-backdrop";
        trackDialog.setAttribute("hidden", "");
        trackDialog.innerHTML = `
            <section class="learning-radio-dialog" role="dialog" aria-modal="true" aria-labelledby="learningRadioSettingsTitle" aria-describedby="learningRadioSettingsIntro">
                <div class="learning-radio-dialog-header">
                    <div>
                        <h2 id="learningRadioSettingsTitle">${radioText("settingsTitle")}</h2>
                        <p id="learningRadioSettingsIntro">${radioText("settingsIntro")}</p>
                    </div>
                    <button class="learning-radio-dialog-close" type="button" aria-label="${radioText("closeSettings")}">&times;</button>
                </div>
                <div class="learning-radio-track-list"></div>
                <p class="learning-radio-track-notice" role="status" hidden></p>
            </section>
        `;
        trackDialog.addEventListener("click", (event) => {
            if (event.target === trackDialog) closeTrackDialog();
        });
        trackListEl = trackDialog.querySelector(".learning-radio-track-list");
        trackNoticeEl = trackDialog.querySelector(".learning-radio-track-notice");
        closeDialogButton = trackDialog.querySelector(".learning-radio-dialog-close");
        closeDialogButton.addEventListener("click", closeTrackDialog);
        renderTrackChoices();

        document.body.append(audio, button, panel, trackDialog);
        window.SciverseLearningRadioApplyLanguage = updateLanguageLabels;
        updateLanguageLabels();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildRadio, { once: true });
    } else {
        buildRadio();
    }
})();

(function () {
    "use strict";

    if (window.self !== window.top) return;
    if (window.__sciverseLearningRadio) return;
    window.__sciverseLearningRadio = true;

    const STORAGE_KEY = "sciverse_learning_radio_on";
    const VOLUME_KEY = "sciverse_learning_radio_volume";
    const RADIO_TEXT = {
        de: {
            ready: "Lernradio bereit",
            hint: "Klick auf das violette Radio startet ruhige Lernmusik.",
            on: "Lernmusik ausschalten",
            off: "Lernmusik einschalten",
            volume: "Lautstaerke",
            volumeHelp: "Regelt nur die Lernmusik.",
            volumeValue: (value) => `${value} Prozent Lautstaerke`
        },
        en: {
            ready: "Learning radio ready",
            hint: "Click the purple radio to start calm study music.",
            on: "Turn study music off",
            off: "Turn study music on",
            volume: "Volume",
            volumeHelp: "Controls the study music only.",
            volumeValue: (value) => `${value} percent volume`
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
    let volumeEl;
    let enabled = false;
    let order = [];
    let currentIndex = -1;

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

    function refillOrder() {
        const previous = currentIndex;
        order = shuffle(TRACKS.map((_, index) => index));
        if (order.length > 1 && order[0] === previous) {
            [order[0], order[1]] = [order[1], order[0]];
        }
    }

    function nextTrack() {
        if (!order.length) refillOrder();
        currentIndex = order.shift();
        const track = TRACKS[currentIndex];
        audio.src = track.src;
        audio.load();
        titleEl.textContent = track.title;
        metaEl.textContent = `${track.artist} · ${track.license}`;
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
        if (volumeEl) {
            volumeEl.setAttribute("aria-label", radioText("volume"));
            volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Number(volumeEl.value || 0)));
        }
        const help = document.getElementById("learningRadioVolumeHelp");
        if (help) help.textContent = radioText("volumeHelp");
        if (button) updateUi();
    }

    function toggleRadio() {
        enabled = !enabled;
        updateUi();
        if (enabled && audio.paused) {
            nextTrack();
        }
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
            .learning-radio-panel:hover {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(0);
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
            <strong class="learning-radio-title">${radioText("ready")}</strong>
            <span class="learning-radio-meta">${radioText("hint")}</span>
            <input class="learning-radio-volume" type="range" min="0" max="100" value="${Math.round(audio.volume * 100)}" aria-label="${radioText("volume")}" aria-describedby="learningRadioVolumeHelp">
            <p id="learningRadioVolumeHelp" class="learning-radio-help">${radioText("volumeHelp")}</p>
            <div class="learning-radio-credits">${buildCredits()}</div>
        `;
        titleEl = panel.querySelector(".learning-radio-title");
        metaEl = panel.querySelector(".learning-radio-meta");
        volumeEl = panel.querySelector(".learning-radio-volume");
        volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Math.round(audio.volume * 100)));
        volumeEl.addEventListener("input", () => {
            audio.volume = Number(volumeEl.value) / 100;
            volumeEl.setAttribute("aria-valuetext", radioText("volumeValue", Math.round(audio.volume * 100)));
            localStorage.setItem(VOLUME_KEY, String(audio.volume));
        });

        document.body.append(audio, button, panel);
        window.SciverseLearningRadioApplyLanguage = updateLanguageLabels;
        updateLanguageLabels();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildRadio, { once: true });
    } else {
        buildRadio();
    }
})();

(function () {
    "use strict";

    if (window.self !== window.top) return;
    if (window.__sciverseLearningRadio) return;
    window.__sciverseLearningRadio = true;

    const STORAGE_KEY = "sciverse_learning_radio_on";
    const VOLUME_KEY = "sciverse_learning_radio_volume";

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
            title: "Trance is... Ambient Cinematic Trance",
            artist: "Whitewolf ft. cyba",
            license: "CC BY 3.0",
            page: "https://commons.wikimedia.org/wiki/File:Whitewolf225_-_Trance_is..._(Ambient_Cinematic_Trance)_10.ogg",
            src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Whitewolf225_-_Trance_is..._%28Ambient_Cinematic_Trance%29_10.ogg"
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
        button.setAttribute("aria-label", enabled ? "Lernmusik ausschalten" : "Lernmusik einschalten");
        panel.classList.toggle("is-on", enabled);
        if (!enabled) {
            audio.pause();
        }
        localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
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
                background: linear-gradient(145deg, #6d28d9, #a855f7 58%, #c084fc);
                border: 2px solid rgba(255, 255, 255, 0.82);
                border-radius: 18px;
                bottom: 18px;
                box-shadow: 0 14px 34px rgba(88, 28, 135, 0.42), inset 0 2px 0 rgba(255, 255, 255, 0.36);
                color: #fff;
                cursor: pointer;
                display: flex;
                height: 58px;
                justify-content: center;
                padding: 0;
                position: fixed;
                right: 18px;
                transition: transform 0.18s ease, box-shadow 0.18s ease;
                width: 70px;
                z-index: 5000;
            }
            .learning-radio:hover,
            .learning-radio:focus-visible {
                box-shadow: 0 18px 42px rgba(88, 28, 135, 0.52), inset 0 2px 0 rgba(255, 255, 255, 0.42);
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
        panel.setAttribute("aria-live", "polite");
        panel.innerHTML = `
            <strong class="learning-radio-title">Lernradio bereit</strong>
            <span class="learning-radio-meta">Klick auf das violette Radio startet ruhige Lernmusik.</span>
            <input class="learning-radio-volume" type="range" min="0" max="100" value="${Math.round(audio.volume * 100)}" aria-label="Lautstaerke">
            <div class="learning-radio-credits">${buildCredits()}</div>
        `;
        titleEl = panel.querySelector(".learning-radio-title");
        metaEl = panel.querySelector(".learning-radio-meta");
        volumeEl = panel.querySelector(".learning-radio-volume");
        volumeEl.addEventListener("input", () => {
            audio.volume = Number(volumeEl.value) / 100;
            localStorage.setItem(VOLUME_KEY, String(audio.volume));
        });

        document.body.append(audio, button, panel);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildRadio, { once: true });
    } else {
        buildRadio();
    }
})();

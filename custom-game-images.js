(function () {
    "use strict";

    /* =====================================================
       RAJANAGA99
       CUSTOM GAME IMAGE + HOT BADGE
       GitHub JS
    ===================================================== */

    const STYLE_ID = "rajanaga99-custom-game-style";

    const GAMES = {
        "Mahjong Wins 3 - Black Scatter":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-3.webp",

        "Mahjong Ways":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-1.webp",

        "Mahjong Ways 2":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-2.webp"
    };


    /* =====================================================
       INJECT CSS
    ===================================================== */

    function injectStyle() {

        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement("style");

        style.id = STYLE_ID;

        style.textContent = `

        /* ================================================
           CUSTOM GAME IMAGE
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]
            div[data-radix-aspect-ratio-wrapper] {

                position: relative !important;

                overflow: hidden !important;

                background-image:
                    url("${GAMES[name]}") !important;

                background-size: cover !important;

                background-position: center !important;

                background-repeat: no-repeat !important;

                isolation: isolate;

                border-radius: inherit;

                box-shadow:
                    0 0 0 1px rgba(156,255,0,.35),
                    0 0 6px rgba(156,255,0,.30),
                    0 0 14px rgba(156,255,0,.18);

                transition:
                    box-shadow .25s ease,
                    transform .25s ease;
            }
            `;
        }).join("")}


        /* ================================================
           HIDE ORIGINAL GAME IMAGE
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]
            img[data-nimg],

            [data-game-name="${name}"]
            img[src*="/_next/image"] {

                opacity: 0 !important;

                visibility: hidden !important;
            }
            `;
        }).join("")}


        /* ================================================
           HIDE ORIGINAL HOT TAG
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]
            img[src*="hot"],

            [data-game-name="${name}"]
            img[src*="HOT"],

            [data-game-name="${name}"]
            img[src*="tag"] {

                display: none !important;
            }
            `;
        }).join("")}


        /* ================================================
           RAJANAGA99 HOT BADGE
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]
            div[data-radix-aspect-ratio-wrapper]::before {

                content: "\\1F525 HOT";

                position: absolute;

                top: 6px;
                left: 6px;

                z-index: 50;

                display: flex;

                align-items: center;
                justify-content: center;

                height: 18px;

                padding: 0 7px;

                border-radius: 6px;

                background:
                    linear-gradient(
                        135deg,
                        #ff1a00 0%,
                        #ff4d00 45%,
                        #ffb300 100%
                    );

                color: #ffffff;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                font-size: 8px;

                font-weight: 900;

                line-height: 1;

                letter-spacing: .2px;

                white-space: nowrap;

                box-shadow:
                    0 0 4px rgba(255,40,0,.95),
                    0 0 9px rgba(255,80,0,.75),
                    0 2px 8px rgba(0,0,0,.65);

                text-shadow:
                    0 1px 2px rgba(0,0,0,.8);

                transform-origin: center;

                animation:
                    rajanagaHotPulse
                    1.15s
                    ease-in-out
                    infinite;
            }
            `;
        }).join("")}


        /* ================================================
           IMAGE SHINE
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]
            div[data-radix-aspect-ratio-wrapper]::after {

                content: "";

                position: absolute;

                top: 0;
                left: -80%;

                width: 45%;
                height: 100%;

                z-index: 40;

                pointer-events: none;

                background:
                    linear-gradient(
                        105deg,
                        transparent 0%,
                        rgba(255,255,255,.04) 35%,
                        rgba(255,255,255,.45) 50%,
                        rgba(255,255,255,.04) 65%,
                        transparent 100%
                    );

                transform: skewX(-18deg);

                animation:
                    rajanagaGameShine
                    3.5s
                    ease-in-out
                    infinite;
            }
            `;
        }).join("")}


        /* ================================================
           HOVER GLOW
        ================================================ */

        ${Object.keys(GAMES).map(function (name) {
            return `
            [data-game-name="${name}"]:hover
            div[data-radix-aspect-ratio-wrapper] {

                box-shadow:
                    0 0 0 1px rgba(156,255,0,.90),
                    0 0 8px rgba(156,255,0,.75),
                    0 0 18px rgba(156,255,0,.55),
                    0 0 30px rgba(156,255,0,.25);
            }
            `;
        }).join("")}


        /* ================================================
           HOT PULSE
        ================================================ */

        @keyframes rajanagaHotPulse {

            0% {
                transform: scale(1);
                filter: brightness(1);
            }

            50% {
                transform: scale(1.08);
                filter: brightness(1.35);
            }

            100% {
                transform: scale(1);
                filter: brightness(1);
            }
        }


        /* ================================================
           GAME SHINE
        ================================================ */

        @keyframes rajanagaGameShine {

            0% {
                left: -80%;
                opacity: 0;
            }

            15% {
                opacity: 1;
            }

            45% {
                left: 130%;
                opacity: 1;
            }

            55% {
                left: 130%;
                opacity: 0;
            }

            100% {
                left: 130%;
                opacity: 0;
            }
        }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       PROCESS GAME
    ===================================================== */

    function processGames() {

        Object.keys(GAMES).forEach(function (gameName) {

            const elements =
                document.querySelectorAll(
                    `[data-game-name="${gameName}"]`
                );

            elements.forEach(function (element) {

                const wrapper =
                    element.querySelector(
                        "div[data-radix-aspect-ratio-wrapper]"
                    );

                if (!wrapper) {
                    return;
                }

                wrapper.style.position = "relative";

            });

        });
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function init() {

        injectStyle();

        processGames();

    }


    /* =====================================================
       START
    ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


    /* =====================================================
       SUPPORT REACT / NEXT.JS / AJAX
    ===================================================== */

    let timer = null;

    const observer =
        new MutationObserver(function () {

            if (timer) {
                return;
            }

            timer = setTimeout(function () {

                timer = null;

                processGames();

            }, 100);

        });


    function startObserver() {

        if (!document.body) {
            return;
        }

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }


    if (document.body) {

        startObserver();

    } else {

        window.addEventListener(
            "DOMContentLoaded",
            startObserver
        );

    }

})();

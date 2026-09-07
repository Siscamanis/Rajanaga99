(function () {
    "use strict";

    const STYLE_ID = "rjn99-game-custom-style";
    const BADGE_CLASS = "rjn99-hot-badge";

    const GAMES = {
        "Mahjong Wins 3 - Black Scatter":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-3.webp",

        "Mahjong Ways":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-1.webp",

        "Mahjong Ways 2":
            "https://imgcdn.it.com/hb8fdn9z3sk9b845yd0f/external-source/ms/mahjong-2.webp"
    };

    /* =========================================
       CSS
    ========================================= */

    function injectStyle() {

        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement("style");
        style.id = STYLE_ID;

        style.textContent = `

        /* =========================================
           GAME IMAGE
        ========================================= */

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
                    0 0 0 1px rgba(156,255,0,.45),
                    0 0 7px rgba(156,255,0,.35),
                    0 0 16px rgba(156,255,0,.20);

                transition:
                    box-shadow .25s ease;
            }

            /* Hilangkan pseudo HOT lama */
            [data-game-name="${name}"]
            div[data-radix-aspect-ratio-wrapper]::before {

                content: none !important;
                display: none !important;
            }

            /* Hilangkan shine pseudo lama */
            [data-game-name="${name}"]
            div[data-radix-aspect-ratio-wrapper]::after {

                content: none !important;
                display: none !important;
            }
            `;

        }).join("")}


        /* =========================================
           ORIGINAL IMAGE
        ========================================= */

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


        /* =========================================
           ORIGINAL HOT TAG
        ========================================= */

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


        /* =========================================
           RAJANAGA99 HOT BADGE
        ========================================= */

        .${BADGE_CLASS} {

            position: absolute;

            top: 6px;
            left: 6px;

            z-index: 9999;

            display: flex;

            align-items: center;
            justify-content: center;

            height: 18px;

            padding: 0 7px;

            border-radius: 6px;

            background:
                linear-gradient(
                    135deg,
                    #ff0000 0%,
                    #ff3d00 45%,
                    #ff9d00 100%
                );

            color: #ffffff;

            font-family:
                "Segoe UI Emoji",
                "Apple Color Emoji",
                "Noto Color Emoji",
                Arial,
                sans-serif;

            font-size: 8px;

            font-weight: 900;

            line-height: 18px;

            white-space: nowrap;

            box-shadow:
                0 0 4px rgba(255,40,0,.95),
                0 0 9px rgba(255,70,0,.75),
                0 0 15px rgba(255,110,0,.45),
                0 2px 7px rgba(0,0,0,.65);

            text-shadow:
                0 1px 2px rgba(0,0,0,.8);

            pointer-events: none;

            transform-origin: center;

            animation:
                rjn99HotPulse
                1.15s
                ease-in-out
                infinite;
        }


        /* =========================================
           SHINE
        ========================================= */

        .rjn99-shine {

            position: absolute;

            top: 0;
            left: -70%;

            width: 40%;
            height: 100%;

            z-index: 9998;

            pointer-events: none;

            background:
                linear-gradient(
                    105deg,
                    transparent 0%,
                    rgba(255,255,255,.04) 35%,
                    rgba(255,255,255,.42) 50%,
                    rgba(255,255,255,.04) 65%,
                    transparent 100%
                );

            transform: skewX(-18deg);

            animation:
                rjn99Shine
                3.8s
                ease-in-out
                infinite;
        }


        /* =========================================
           HOT PULSE
        ========================================= */

        @keyframes rjn99HotPulse {

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


        /* =========================================
           SHINE ANIMATION
        ========================================= */

        @keyframes rjn99Shine {

            0% {
                left: -70%;
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


    /* =========================================
       APPLY GAME
    ========================================= */

    function processGames() {

        Object.keys(GAMES).forEach(function (gameName) {

            const elements =
                document.querySelectorAll(
                    `[data-game-name="${gameName}"]`
                );

            elements.forEach(function (game) {

                const wrapper =
                    game.querySelector(
                        "div[data-radix-aspect-ratio-wrapper]"
                    );

                if (!wrapper) {
                    return;
                }

                wrapper.style.position = "relative";

                /* ===============================
                   REMOVE OLD BADGE
                =============================== */

                wrapper
                    .querySelectorAll(
                        ".rjn99-hot-badge"
                    )
                    .forEach(function (el) {
                        el.remove();
                    });

                /* ===============================
                   CREATE REAL HOT BADGE
                =============================== */

                const badge =
                    document.createElement("div");

                badge.className =
                    BADGE_CLASS;

                badge.textContent =
                    "🔥 HOT";

                wrapper.appendChild(badge);


                /* ===============================
                   CREATE SHINE
                =============================== */

                wrapper
                    .querySelectorAll(
                        ".rjn99-shine"
                    )
                    .forEach(function (el) {
                        el.remove();
                    });

                const shine =
                    document.createElement("div");

                shine.className =
                    "rjn99-shine";

                wrapper.appendChild(shine);

            });

        });
    }


    /* =========================================
       INIT
    ========================================= */

    function init() {

        injectStyle();

        processGames();

    }


    /* =========================================
       START
    ========================================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


    /* =========================================
       NEXT.JS / REACT OBSERVER
    ========================================= */

    let timer = null;

    const observer =
        new MutationObserver(function () {

            if (timer) {
                return;
            }

            timer = setTimeout(function () {

                timer = null;

                processGames();

            }, 150);

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

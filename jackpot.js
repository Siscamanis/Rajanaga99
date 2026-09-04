"use strict";

(function () {
    const NEW_IMAGE_URL =
        "https://lh3.googleusercontent.com/d/1IWOmRQ0xrSs7RXehGVTfid0j01C3fwdx";

    const TARGET_SELECTOR = 'img[alt="jackpot-bg"]';
    const MAX_RETRY = 40;
    const RETRY_INTERVAL = 250;

    let updateScheduled = false;

    function replaceJackpotDesktop() {
        const images = document.querySelectorAll(TARGET_SELECTOR);

        images.forEach(function (image) {
            const parent = image.parentElement;

            if (!parent) return;

            parent.style.setProperty(
                "background-image",
                `url("${NEW_IMAGE_URL}")`,
                "important"
            );
            parent.style.setProperty(
                "background-size",
                "contain",
                "important"
            );
            parent.style.setProperty(
                "background-repeat",
                "no-repeat",
                "important"
            );
            parent.style.setProperty(
                "background-position",
                "center",
                "important"
            );
            parent.style.setProperty(
                "background-color",
                "transparent",
                "important"
            );

            /*
             * Gambar asli tetap mempertahankan ukuran parent,
             * tetapi tidak akan terlihat.
             */
            image.style.setProperty("opacity", "0", "important");
            image.style.setProperty("visibility", "hidden", "important");

            parent.dataset.jackpotReplaced = "1";
        });
    }

    function scheduleReplacement() {
        if (updateScheduled) return;

        updateScheduled = true;

        requestAnimationFrame(function () {
            replaceJackpotDesktop();
            updateScheduled = false;
        });
    }

    function startRetry() {
        let retryCount = 0;

        replaceJackpotDesktop();

        const retryTimer = setInterval(function () {
            replaceJackpotDesktop();
            retryCount += 1;

            if (
                retryCount >= MAX_RETRY ||
                document.querySelector(TARGET_SELECTOR)
            ) {
                clearInterval(retryTimer);
            }
        }, RETRY_INTERVAL);
    }

    function initialize() {
        startRetry();

        const observer = new MutationObserver(function () {
            scheduleReplacement();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();

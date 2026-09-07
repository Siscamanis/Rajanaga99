(function () {
    "use strict";

    function findTarget() {
        const elements = document.querySelectorAll("div, section");

        return [...elements].find(function (el) {
            const text = el.innerText || "";

            return (
                text.includes("Beranda") &&
                text.includes("Slot") &&
                el.offsetHeight < 120
            );
        });
    }

    function addSparkEffect(target) {
        if (!target) return;

        // Jangan pasang dua kali
        if (target.dataset.spark === "1") return;

        target.dataset.spark = "1";

        // Pastikan container bisa menjadi parent absolute
        target.style.position = "relative";
        target.style.overflow = "visible";

        // ==============================
        // CSS SPARK
        // ==============================

        if (!document.getElementById("gadunslot-nav-spark-style")) {
            const style = document.createElement("style");

            style.id = "gadunslot-nav-spark-style";

            style.textContent = `
                .nav-sparks {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 70px;
                    pointer-events: none;
                    z-index: 10;
                    overflow: visible;
                }

                .nav-spark {
                    position: absolute;
                    bottom: 0;

                    width: 2px;
                    height: 2px;

                    border-radius: 50%;

                    background: #9cff00;

                    box-shadow:
                        0 0 4px rgba(156, 255, 0, 0.8),
                        0 0 8px rgba(156, 255, 0, 0.5);

                    pointer-events: none;

                    animation:
                        gadunSparkUp
                        var(--d)
                        linear
                        forwards;
                }

                @keyframes gadunSparkUp {

                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }

                    10% {
                        opacity: 1;
                    }

                    100% {
                        transform: translateY(-70px);
                        opacity: 0;
                    }

                }
            `;

            document.head.appendChild(style);
        }

        // ==============================
        // SPARK CONTAINER
        // ==============================

        const sparkContainer = document.createElement("div");

        sparkContainer.className = "nav-sparks";

        target.appendChild(sparkContainer);

        // ==============================
        // CREATE SPARK
        // ==============================

        function createSpark() {
            const spark = document.createElement("div");

            spark.className = "nav-spark";

            spark.style.left =
                Math.random() * 100 + "%";

            spark.style.setProperty(
                "--d",
                1.2 + Math.random() * 1.2 + "s"
            );

            sparkContainer.appendChild(spark);

            setTimeout(function () {
                spark.remove();
            }, 3000);
        }

        // Buat spark pertama langsung
        createSpark();

        // Spark berikutnya
        setInterval(createSpark, 160);
    }

    // ==============================
    // INITIALIZE
    // ==============================

    function init() {
        const target = findTarget();

        if (target) {
            addSparkEffect(target);
        }
    }

    // Jalankan langsung
    init();

    // Kalau DOM masih loading
    document.addEventListener("DOMContentLoaded", init);

    // Kalau halaman selesai loading
    window.addEventListener("load", init);

    // Pantau perubahan DOM
    const observer = new MutationObserver(function () {
        init();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();

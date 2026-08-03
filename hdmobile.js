(function () {
    const css = `
        /* MOBILE */
        @media (max-width: 991px) {
            .c-ptpKx {
                background: url("http://plcl.me/images/sviyZ.jpg") center / cover no-repeat !important;
            }

            .c-ptpKx img[alt="header-bg"] {
                display: none !important;
            }
        }

        /* DESKTOP */
        @media (min-width: 992px) {
            .c-qiOHF {
                background: url("http://plcl.me/images/j3XRc.jpg") center center / cover no-repeat !important;
            }

            .c-qiOHF::before {
                content: "";
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.35);
                pointer-events: none;
            }

            .c-qiOHF > * {
                position: relative;
            }
        }
    `;

    const style = document.createElement("style");
    style.id = "responsive-background";
    style.textContent = css;
    document.head.appendChild(style);
})();

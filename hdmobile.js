(function () {
  const style = document.createElement("style");

  style.textContent = `
    @media screen and (max-width: 991px) {
      .c-ptpKx {
        position: relative !important;
        overflow: hidden !important;
        background:
          linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.20)),
          url("http://plcl.me/images/qQwnv.jpg")
          center center / cover no-repeat !important;
      }

      .c-ptpKx img[alt="header-bg"] {
        display: none !important;
      }

      .c-ptpKx > * {
        position: relative !important;
        z-index: 1 !important;
      }
    }
  `;

  document.head.appendChild(style);
})();

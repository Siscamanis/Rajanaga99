(function () {
  "use strict";

  function injectStyles() {
    const style = document.createElement("style");

    style.setAttribute("id", "rajanaga99-custom-styles");

    style.innerHTML = `
      /* ======================================================
         🌿 WARNA UTAMA RAJANAGA99 - HIJAU EMERALD ELEGAN
         ====================================================== */

      /* ======= TOMBOL UTAMA DAN SEKUNDER ======= */
      [class*="buttonType-primary"],
      [class*="buttonType-tertiary"],
      .c-fgjTBi-jqjBYp-buttonType-tertiary,
      .c-cLCxBz-fxzcMC-cv,
      .c-hrHkfF {
        background: linear-gradient(
          to bottom,
          #a4ff00 0%,
          #62b515 30%,
          #006c06 100%
        ) !important;

        color: #fff !important;
        border: none !important;
        transition: all 0.3s ease !important;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
      }

      /* ======= EFEK HOVER TOMBOL ======= */
      [class*="buttonType-primary"]:hover,
      [class*="buttonType-tertiary"]:hover,
      .c-fgjTBi-jqjBYp-buttonType-tertiary:hover {
        background: linear-gradient(
          0deg,
          rgba(19, 80, 0, 1) 0%,
          rgb(5, 130, 5) 49%,
          rgba(100, 200, 10, 1) 100%
        ) !important;

        filter: brightness(1.1);
        transform: scale(1.02);
      }

      /* ======= ICON DALAM TOMBOL ======= */
      [class*="buttonType-primary"] svg,
      [class*="buttonType-tertiary"] svg {
        fill: #fff !important;
      }

      /* ======= TOMBOL DAFTAR & LOGIN ======= */
      .c-cLCxBz-fxzcMC-cv,
      .c-hrHkfF {
        border-radius: 8px !important;
        font-weight: bold !important;
        padding: 8px 20px !important;
        box-shadow: 0 0 10px rgba(100, 200, 50, 0.5);
      }

      /* ======= NAVBAR ATAS (Slot, Sport, Casino, dll) ======= */
      .c-dMRyZm,
      .c-dMRyZm > a,
      .c-dMRyZm > div,
      .c-dMRyZm button {
        background: linear-gradient(
          0deg,
          rgba(13, 50, 0, 1) 0%,
          rgb(3, 102, 3) 49%,
          rgba(79, 170, 1, 1) 100%
        ) !important;

        border: none !important;
        color: #fff !important;
        transition: all 0.3s ease-in-out !important;
      }

      .c-dMRyZm svg path,
      .c-dMRyZm svg circle {
        fill: #fff !important;
      }

      .c-dMRyZm span {
        color: #fff !important;
        font-weight: 500 !important;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
      }

      .c-dMRyZm:hover {
        filter: brightness(1.2);
        transform: scale(1.05);
      }

      /* ======= NAVBAR BAWAH (Beranda, Deposit, Masuk, Promo, Chat) ======= */
      .c-hJjmHg .c-dMRyZm,
      .c-hJjmHg .c-dMRyZm > a,
      .c-hJjmHg .c-dMRyZm > div,
      .c-hJjmHg .c-dMRyZm button {
        background: transparent !important;
        box-shadow: none !important;
      }

      /* ======= TOMBOL PROFIL LINGKARAN DI NAVBAR BAWAH ======= */
      .c-kfmho {
        background: linear-gradient(
          to bottom,
          #a4ff00 0%,
          #62b515 30%,
          #006c06 100%
        ) !important;

        border-radius: 50% !important;
        width: 70px !important;
        height: 70px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 0 12px rgba(0, 255, 0, 0.6) !important;
        transition: all 0.3s ease-in-out !important;
      }

      .c-kfmho:hover {
        filter: brightness(1.3);
        transform: scale(1.08);
      }

      .c-kfmho svg path {
        fill: #fff !important;
      }

      /* ======= TAB AKTIF PROMOSI / PROVIDER ======= */
      .c-dQLatB-fxzcMC-isActive-true {
        background: linear-gradient(
          0deg,
          rgba(13, 50, 0, 1) 0%,
          rgb(3, 102, 3) 49%,
          rgba(79, 170, 1, 1) 100%
        ) !important;

        border: none !important;
        color: #fff !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out;
      }

      .c-dQLatB-fxzcMC-isActive-true span {
        color: #fff !important;
        font-weight: 600 !important;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
      }

      .c-dQLatB-fxzcMC-isActive-true:hover {
        filter: brightness(1.2);
        transform: scale(1.03);
      }

      /* ======= TRANSISI GLOBAL ======= */
      button,
      a[class*="buttonType"],
      [role="button"],
      .c-kfmho {
        transition: all 0.25s ease-in-out !important;
        cursor: pointer !important;
      }
    `;

    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectStyles);
  } else {
    injectStyles();
  }

  if (typeof window !== "undefined") {
    window.rajanaga99Styles = {
      inject: injectStyles,
      version: "1.0.0"
    };
  }
})();

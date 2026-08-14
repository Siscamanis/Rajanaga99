"use strict";

(() => {
  const CONFIG = {
    banners: [
      "http://plcl.me/images/Rc3Ca.png",
      "http://plcl.me/images/vv3HA.png",
      "http://plcl.me/images/KPFFs.png"
    ],
    slideDelay: 7000,
    gifs: [
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706101549-46c2cbd4-7bc2-4a7b-9cd9-f95d2a4878ff.gif"
      },
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706728973-7c8bd8ad-a9d5-47e0-80ce-094f326e9612.gif",
        href: "https://linkshortener.vip/rajanaga99-rtp",
        label: "Buka RTP RAJANAGA99"
      },
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706890521-a2f1bb69-ac3d-4469-95a6-1a57d56edf15.gif"
      }
    ],
    liveChat: "https://tawk.to/chat/69f47e817f14b41c33bd2abc/1jnhgsb1s",
    rtp: "https://linkshortener.vip/rajanaga99-rtp",
    storageKey: "rjn_popup_delay_1h",
    delay: 60 * 60 * 1000
  };

  const IDS = {
    style: "rjn-popup-style",
    overlay: "rjn-popup-overlay",
    popup: "rjn-popup"
  };

  const isAllowedPage = () => {
    const path = `${location.pathname}${location.hash}`
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      !path ||
      path === "/" ||
      ["home", "main", "index", "dashboard"].some((name) =>
        path.includes(name)
      )
    );
  };

  const isWaiting = () => {
    try {
      const lastClosed = Number(
        localStorage.getItem(CONFIG.storageKey) || 0
      );

      return Boolean(
        lastClosed && Date.now() - lastClosed < CONFIG.delay
      );
    } catch (_) {
      return false;
    }
  };

  const addStyle = () => {
    if (document.getElementById(IDS.style)) return;

    const style = document.createElement("style");
    style.id = IDS.style;
    style.textContent = `
      @keyframes rjnFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes rjnPopupIn {
        from { opacity: 0; transform: translateY(20px) scale(.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes rjnFloat {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -6px, 0); }
      }

      @keyframes rjnShine {
        from { background-position: 100% 0; }
        to { background-position: -150% 0; }
      }

      @keyframes rjnSmokeFade {
        0% {
          opacity: 1;
          transform: scale(1);
          filter: blur(0) brightness(1);
        }
        45% {
          opacity: .72;
          transform: scale(1.008);
          filter: blur(2px) brightness(1.05);
        }
        100% {
          opacity: 0;
          transform: scale(1.025);
          filter: blur(12px) brightness(1.12);
        }
      }

      @keyframes rjnSmokeCloud {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(.55);
        }
        35% {
          opacity: .58;
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -54%) scale(1.55);
        }
      }

      #${IDS.overlay} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        background: rgba(0, 0, 0, .72);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: rjnFadeIn .25s ease both;
      }

      #${IDS.popup} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        overflow-y: auto;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        animation: rjnPopupIn .35s ease both;
      }

      #${IDS.popup}::after {
        content: "";
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 9999;
        width: min(420px, 78vw);
        height: min(290px, 45vh);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        background:
          radial-gradient(circle at 28% 58%, rgba(255,255,255,.34), transparent 34%),
          radial-gradient(circle at 67% 38%, rgba(95,255,165,.26), transparent 38%),
          radial-gradient(circle at 52% 68%, rgba(220,255,235,.22), transparent 45%);
        filter: blur(16px);
        transform: translate(-50%, -50%) scale(.55);
      }

      #${IDS.popup}.rjn-closing > * {
        animation: rjnSmokeFade .74s cubic-bezier(.4,0,.2,1) forwards !important;
      }

      #${IDS.popup}.rjn-closing::after {
        animation: rjnSmokeCloud .78s ease-out forwards;
      }

      #${IDS.overlay}.rjn-closing {
        opacity: 0;
        transition: opacity .78s ease;
      }

      .rjn-banner-box {
        position: relative;
        display: grid;
        place-items: center;
        animation: rjnFloat 5.5s cubic-bezier(.45,0,.55,1) infinite;
        will-change: transform;
      }

      .rjn-banner {
        display: block;
        width: auto;
        height: auto;
        max-width: 92vw;
        max-height: 58vh;
        object-fit: contain;
        background: transparent;
        filter: drop-shadow(0 12px 20px rgba(0,0,0,.28));
        opacity: 1;
        transform: scale(1);
        transition: opacity .3s ease, transform .3s ease;
      }

      .rjn-banner.rjn-changing {
        opacity: .12;
        transform: scale(.992);
      }

      .rjn-nav {
        position: absolute;
        top: 50%;
        z-index: 2;
        width: 31px;
        height: 31px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 1px solid #e5c85e;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(180deg, #159947, #075e29 55%, #032511);
        box-shadow: 0 0 12px rgba(25,220,91,.35);
        font-size: 24px;
        font-weight: 900;
        cursor: pointer;
        transform: translateY(-50%);
      }

      .rjn-prev { left: 8px; }
      .rjn-next { right: 8px; }

      .rjn-dots {
        position: absolute;
        left: 50%;
        bottom: 10px;
        z-index: 2;
        display: flex;
        gap: 7px;
        padding: 5px 8px;
        border-radius: 20px;
        background: rgba(0,0,0,.35);
        transform: translateX(-50%);
      }

      .rjn-dot {
        width: 8px;
        height: 8px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(255,255,255,.55);
        cursor: pointer;
      }

      .rjn-dot.rjn-active {
        background: #e1c45a;
        box-shadow: 0 0 9px rgba(225,196,90,.9);
        transform: scale(1.35);
      }

      .rjn-close {
        position: absolute;
        top: -13px;
        right: -13px;
        z-index: 2;
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 1px solid #f1d878;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(145deg, #19a84f, #075f29 55%, #032511);
        box-shadow: 0 0 14px rgba(28,255,109,.35);
        font-size: 17px;
        font-weight: 900;
        cursor: pointer;
      }

      .rjn-gifs {
        width: min(360px, 92vw);
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
        align-items: center;
      }

      .rjn-gif,
      .rjn-gif-link {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }

      .rjn-gif-link {
        text-decoration: none;
        transition: transform .18s ease, filter .18s ease;
      }

      .rjn-gif-link:hover {
        transform: translateY(-2px) scale(1.025);
        filter: brightness(1.1);
      }

      .rjn-gif-link .rjn-gif {
        pointer-events: none;
      }

      .rjn-title {
        color: transparent;
        background: linear-gradient(
          110deg,
          #176b45 0%, #176b45 30%,
          #d62828 43%, #fff 50%, #d62828 57%,
          #176b45 70%, #176b45 100%
        );
        background-size: 250% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 15px;
        font-weight: 900;
        letter-spacing: 1.6px;
        text-align: center;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,.55));
        animation: rjnShine 4.2s linear infinite;
      }

      .rjn-buttons {
        width: min(310px, 92vw);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }

      .rjn-btn {
        width: 148px;
        padding: 12px 0;
        box-sizing: border-box;
        border: 1px solid rgba(255,225,125,.95);
        border-radius: 14px;
        color: #fff !important;
        background: linear-gradient(180deg, #52e98c, #12a956 62%, #08783b);
        box-shadow: 0 5px 14px rgba(0,0,0,.28);
        text-align: center;
        text-decoration: none;
        font-size: 12px;
        font-weight: 900;
        cursor: pointer;
      }

      .rjn-btn.rjn-gold,
      .rjn-btn.rjn-ok {
        background: linear-gradient(180deg, #ffe99a, #c99b2f 67%, #a97818);
      }

      .rjn-btn.rjn-ok {
        width: 120px;
        padding: 11px 0;
      }

      .rjn-btn:hover {
        transform: translateY(-1px) scale(1.03);
        filter: brightness(1.1);
      }

      @media (max-width: 768px) {
        #${IDS.popup} { padding: 10px; }
        .rjn-banner { max-width: 94vw; max-height: 55vh; }
        .rjn-gifs { width: min(330px, 92vw); gap: 6px; }
        .rjn-title { font-size: 13px; letter-spacing: 1.1px; }
        .rjn-btn { width: 146px; padding: 11px 0; font-size: 11px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .rjn-banner-box,
        .rjn-title { animation: none; }
      }
    `;

    document.head.appendChild(style);
  };

  const buildGifs = () =>
    CONFIG.gifs
      .map((item, index) => {
        const image = `
          <img
            class="rjn-gif"
            src="${item.src}"
            alt="RAJANAGA99 GIF ${index + 1}"
            loading="eager"
            decoding="async"
            draggable="false"
          >`;

        return item.href
          ? `<a
               class="rjn-gif-link"
               href="${item.href}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${item.label || "Buka link"}"
             >${image}</a>`
          : image;
      })
      .join("");

  const showPopup = () => {
    if (
      !document.body ||
      !isAllowedPage() ||
      isWaiting() ||
      document.getElementById(IDS.popup)
    ) {
      return;
    }

    addStyle();

    const overlay = document.createElement("div");
    overlay.id = IDS.overlay;

    const popup = document.createElement("div");
    popup.id = IDS.popup;
    popup.innerHTML = `
      <div class="rjn-banner-box">
        <button class="rjn-close" type="button" aria-label="Tutup popup">✕</button>
        <button class="rjn-nav rjn-prev" type="button" aria-label="Banner sebelumnya">‹</button>
        <img class="rjn-banner" src="${CONFIG.banners[0]}" alt="RAJANAGA99 Banner 1">
        <button class="rjn-nav rjn-next" type="button" aria-label="Banner berikutnya">›</button>
        <div class="rjn-dots" aria-label="Pilihan banner"></div>
      </div>

      <div class="rjn-gifs" aria-label="Pilihan game RAJANAGA99">
        ${buildGifs()}
      </div>

      <div class="rjn-title">RAJANAGA99 • DIRGAHAYU INDONESIA</div>

      <div class="rjn-buttons">
        <a class="rjn-btn" href="${CONFIG.liveChat}" target="_blank" rel="noopener noreferrer">
          💬 LIVE CHAT
        </a>
        <a class="rjn-btn rjn-gold" href="${CONFIG.rtp}" target="_blank" rel="noopener noreferrer">
          📊 RTP
        </a>
        <button class="rjn-btn rjn-ok" type="button">OK</button>
      </div>
    `;

    document.body.append(overlay, popup);

    CONFIG.banners.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const bannerImage = popup.querySelector(".rjn-banner");
    const dots = popup.querySelector(".rjn-dots");
    let bannerIndex = 0;
    let bannerTimer = null;
    let bannerChanging = false;

    const renderDots = () => {
      dots.innerHTML = CONFIG.banners
        .map(
          (_, index) =>
            `<button
               class="rjn-dot${index === bannerIndex ? " rjn-active" : ""}"
               type="button"
               data-index="${index}"
               aria-label="Tampilkan banner ${index + 1}"
             ></button>`
        )
        .join("");
    };

    const changeBanner = (nextIndex) => {
      if (nextIndex === bannerIndex || bannerChanging) return;

      bannerChanging = true;
      bannerImage.classList.add("rjn-changing");

      window.setTimeout(() => {
        bannerIndex =
          (nextIndex + CONFIG.banners.length) % CONFIG.banners.length;
        bannerImage.src = CONFIG.banners[bannerIndex];
        bannerImage.alt = `RAJANAGA99 Banner ${bannerIndex + 1}`;
        renderDots();

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            bannerImage.classList.remove("rjn-changing");
            bannerChanging = false;
          })
        );
      }, 220);
    };

    const startSlider = () => {
      clearInterval(bannerTimer);
      bannerTimer = window.setInterval(
        () => changeBanner(bannerIndex + 1),
        CONFIG.slideDelay
      );
    };

    const selectBanner = (index) => {
      changeBanner(index);
      startSlider();
    };

    popup.querySelector(".rjn-prev").addEventListener("click", () =>
      selectBanner(bannerIndex - 1)
    );
    popup.querySelector(".rjn-next").addEventListener("click", () =>
      selectBanner(bannerIndex + 1)
    );
    dots.addEventListener("click", (event) => {
      const dot = event.target.closest(".rjn-dot");
      if (dot) selectBanner(Number(dot.dataset.index));
    });

    renderDots();
    startSlider();

    let isClosing = false;

    const closePopup = () => {
      if (isClosing) return;
      isClosing = true;
      clearInterval(bannerTimer);

      try {
        localStorage.setItem(CONFIG.storageKey, String(Date.now()));
      } catch (_) {
        /* Popup tetap dapat ditutup jika localStorage diblokir. */
      }

      popup.classList.add("rjn-closing");
      overlay.classList.add("rjn-closing");

      window.setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 800);
    };

    popup.querySelector(".rjn-close").addEventListener("click", closePopup);
    popup.querySelector(".rjn-ok").addEventListener("click", closePopup);
    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });
  };

  const init = () => {
    showPopup();

    let currentUrl = location.href;
    new MutationObserver(() => {
      if (location.href === currentUrl) return;
      currentUrl = location.href;
      window.setTimeout(showPopup, 300);
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

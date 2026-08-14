"use strict";

(function () {
  const IMG = [
    "http://plcl.me/images/gZUYy.png",
    "",
    ""
  ];

  const DELAY_KEY = "rjn_popup_delay_1h";
  const SLIDER_INTERVAL = 7000;

  const STYLE_ID = "rjn-popup-style";
  const POPUP_ID = "rjn-popup";
  const OVERLAY_ID = "rjn-popup-overlay";

  let popupCreated = false;
  let currentIndex = 0;
  let sliderTimer = null;
  let changingSlide = false;

  function isAllowedPage() {
    const path = (location.pathname + location.hash)
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.includes("home") ||
      path.includes("main") ||
      path.includes("index") ||
      path.includes("dashboard")
    );
  }

  function canShowPopup() {
    if (!isAllowedPage()) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    return !(
      lastClosed &&
      Date.now() - lastClosed < 3600000
    );
  }

  function preloadImages() {
    return Promise.all(
      IMG.map(function (url) {
        return new Promise(function (resolve) {
          const img = new Image();

          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;

          if (img.complete) resolve();
        });
      })
    );
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `

      @keyframes rjnFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes rjnSlideIn {
        from {
          transform: translateY(25px) scale(.97);
          opacity: 0;
        }

        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }

      /* EFEK BANNER MENGAMBANG */
      @keyframes rjnBannerFloat {
        0%,
        100% {
          transform: translate3d(0, 10px, 0);
        }

        50% {
          transform: translate3d(0, -10px, 0);
        }
      }

      @keyframes rjnPortalPulse {
        0% {
          transform: translate(-50%, -50%) scale(.25);
          opacity: 0;

          box-shadow:
            0 0 0 0 rgba(20,255,110,0),
            0 0 0 0 rgba(225,196,90,0);
        }

        35% {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1);

          box-shadow:
            0 0 28px 12px rgba(20,255,110,.48),
            0 0 60px 24px rgba(12,135,63,.28),
            0 0 90px 30px rgba(225,196,90,.10);
        }

        100% {
          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(1.45);

          box-shadow:
            0 0 12px 2px rgba(20,255,110,0),
            0 0 20px 4px rgba(12,135,63,0),
            0 0 28px 6px rgba(225,196,90,0);
        }
      }

      @keyframes rjnPopupExit {
        0% {
          transform:
            translateY(0)
            scale(1);

          opacity: 1;

          filter:
            blur(0)
            brightness(1);
        }

        28% {
          transform:
            translateY(-3px)
            scale(1.018);

          opacity: 1;

          filter:
            blur(0)
            brightness(1.12);
        }

        100% {
          transform:
            translateY(0)
            scale(.18);

          opacity: 0;

          filter:
            blur(7px)
            brightness(.85);
        }
      }

      @keyframes rjnOverlayExit {
        0% {
          opacity: 1;

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        55% {
          opacity: .78;

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        100% {
          opacity: 0;

          backdrop-filter: blur(0);
          -webkit-backdrop-filter: blur(0);
        }
      }

      @keyframes rjnShine {
        0% {
          left: -50%;
        }

        100% {
          left: 130%;
        }
      }

      @keyframes rjnTitleShine {
        0% {
          background-position: 100% 0;
        }

        100% {
          background-position: -160% 0;
        }
      }

      /* PORTAL PENUTUP */

      #${POPUP_ID}::after {
        content: "";

        position: fixed;

        left: 50%;
        top: 50%;

        width: 190px;
        height: 190px;

        border-radius: 50%;

        border:
          2px solid
          rgba(30,255,125,0);

        background:
          radial-gradient(
            circle,
            rgba(35,255,125,.24) 0%,
            rgba(12,145,62,.16) 32%,
            rgba(3,40,18,.04) 58%,
            transparent 72%
          );

        opacity: 0;

        pointer-events: none;

        z-index: 2147483647;

        transform:
          translate(-50%, -50%)
          scale(.25);
      }

      #${POPUP_ID}.pull-up::after {
        animation:
          rjnPortalPulse .72s
          cubic-bezier(.22,.78,.18,1)
          forwards;
      }

      /* OVERLAY */

      #${OVERLAY_ID} {
        position: fixed;

        inset: 0;

        z-index: 2147483646;

        background:
          radial-gradient(
            circle at center,
            rgba(6,70,30,.15),
            transparent 45%
          ),
          linear-gradient(
            180deg,
            rgba(0,0,0,.45),
            rgba(0,0,0,.88)
          );

        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);

        animation:
          rjnFadeIn .35s
          ease forwards;
      }

      #${OVERLAY_ID}.fade-out {
        animation:
          rjnOverlayExit .72s
          cubic-bezier(.22,.78,.18,1)
          forwards;
      }

      /* POPUP */

      #${POPUP_ID} {
        position: fixed;

        inset: 0;

        z-index: 2147483647;

        display: flex;

        align-items: center;
        justify-content: center;

        flex-direction: column;

        gap: 9px;

        padding: 12px;

        box-sizing: border-box;

        background: transparent;

        overflow-y: auto;
      }

      #${POPUP_ID}.pull-up {
        pointer-events: none;
      }

      #${POPUP_ID}.pull-up > * {
        animation:
          rjnPopupExit .72s
          cubic-bezier(.22,.78,.18,1)
          forwards;

        transform-origin:
          center center;

        will-change:
          transform,
          opacity,
          filter;
      }

      /* BANNER + EFEK MENGAMBANG */

      #rjn-popup-box {
        position: relative;

        animation:
          rjnSlideIn .45s ease forwards,
          rjnBannerFloat 5s
          ease-in-out .45s infinite;

        background: transparent;

        border: none;

        box-shadow: none;

        filter:
          drop-shadow(
            0 12px 20px
            rgba(0,0,0,.26)
          )
          drop-shadow(
            0 0 9px
            rgba(23,107,69,.13)
          );

        will-change: transform;
      }

      /* TOMBOL CLOSE */

      #rjn-close {
        position: absolute;

        top: -13px;
        right: -13px;

        width: 34px;
        height: 34px;

        display: flex;

        align-items: center;
        justify-content: center;

        border-radius: 50%;

        cursor: pointer;

        z-index: 9999;

        color: #ffffff;

        font-size: 17px;
        font-weight: 900;

        border:
          1px solid #f1d878;

        background:
          linear-gradient(
            145deg,
            #19a84f,
            #075f29 55%,
            #032511
          );

        box-shadow:
          0 0 10px rgba(28,255,109,.35),
          0 0 18px rgba(218,185,75,.30),
          0 5px 15px rgba(0,0,0,.55);

        transition:
          transform .2s ease,
          filter .2s ease;
      }

      #rjn-close:hover {
        transform: scale(1.08);

        filter:
          brightness(1.15);
      }

      /* GAMBAR BANNER */

      #rjn-image-stage {
        position: relative;

        display: grid;

        place-items: center;

        max-width: 92vw;
        max-height: 58vh;

        overflow: hidden;

        background: transparent;
      }

      #rjn-popup-img,
      #rjn-popup-img-next {
        grid-area: 1 / 1;

        display: block;

        max-width: 92vw;
        max-height: 58vh;

        width: auto;
        height: auto;

        object-fit: contain;

        border: none;
        border-radius: 0;

        background: transparent;

        box-shadow: none;

        will-change:
          transform,
          opacity;
      }

      #rjn-popup-img {
        position: relative;

        z-index: 1;

        opacity: 1;

        transform:
          translateX(0);
      }

      #rjn-popup-img-next {
        position: relative;

        z-index: 2;

        opacity: 0;

        transform:
          translateX(100%);

        pointer-events: none;
      }

      #rjn-popup-img-next.slide-rtl {
        opacity: 1;

        transform:
          translateX(0);

        transition:
          transform .7s
          cubic-bezier(.22,.8,.28,1),
          opacity .3s ease;
      }

      #rjn-popup-img.slide-old-left {
        opacity: .25;

        transform:
          translateX(-18%);

        transition:
          transform .7s
          cubic-bezier(.22,.8,.28,1),
          opacity .55s ease;
      }

      /* NAVIGASI BANNER */

      .rjn-nav {
        position: absolute;

        top: 50%;

        transform:
          translateY(-50%);

        width: 31px;
        height: 31px;

        display: flex;

        align-items: center;
        justify-content: center;

        padding: 0;

        border-radius: 50%;

        border:
          1px solid #e5c85e;

        background:
          linear-gradient(
            180deg,
            #159947,
            #075e29 55%,
            #032511
          );

        color: #ffffff;

        font-size: 24px;
        font-weight: 900;

        cursor: pointer;

        z-index: 9998;

        box-shadow:
          0 0 12px rgba(25,220,91,.35),
          0 0 18px rgba(214,184,79,.25);

        transition:
          transform .2s ease,
          filter .2s ease;
      }

      .rjn-nav:hover {
        filter:
          brightness(1.15);
      }

      #rjn-prev {
        left: 8px;
      }

      #rjn-next {
        right: 8px;
      }

      /* DOT SLIDER */

      #rjn-dots {
        position: absolute;

        left: 50%;
        bottom: 10px;

        transform:
          translateX(-50%);

        display: flex;

        align-items: center;
        justify-content: center;

        gap: 7px;

        z-index: 9998;

        padding: 5px 8px;

        border-radius: 20px;

        background:
          rgba(0,0,0,.35);

        backdrop-filter:
          blur(5px);

        -webkit-backdrop-filter:
          blur(5px);
      }

      .rjn-dot {
        width: 8px;
        height: 8px;

        min-width: 8px;

        padding: 0;

        border: none;

        border-radius: 50%;

        background:
          rgba(255,255,255,.55);

        cursor: pointer;

        transition:
          transform .2s ease,
          background .2s ease;
      }

      .rjn-dot.active {
        background:
          #e1c45a;

        transform:
          scale(1.35);

        box-shadow:
          0 0 10px
          rgba(225,196,90,.9);
      }

      /* JUDUL MERAH PUTIH HIJAU */

      #rjn-title {
        display: inline-block;

        font-size: 15px;
        font-weight: 900;

        letter-spacing: 1.8px;

        text-align: center;

        color: #ffffff;

        background:
          linear-gradient(
            110deg,
            #176b45 0%,
            #176b45 30%,
            #d62828 43%,
            #ffffff 50%,
            #d62828 57%,
            #176b45 70%,
            #176b45 100%
          );

        background-size:
          260% 100%;

        background-position:
          100% 0;

        -webkit-background-clip:
          text;

        background-clip:
          text;

        -webkit-text-fill-color:
          transparent;

        -webkit-text-stroke:
          .25px
          rgba(255,255,255,.18);

        text-shadow:
          0 1px 2px rgba(0,0,0,.72),
          0 0 8px rgba(23,107,69,.22);

        filter:
          drop-shadow(
            0 1px 1px
            rgba(0,0,0,.62)
          )
          drop-shadow(
            0 0 5px
            rgba(214,40,40,.16)
          );

        animation:
          rjnTitleShine 4.2s
          cubic-bezier(.45,0,.55,1)
          infinite;

        will-change:
          background-position;
      }

      /* BUTTON */

      .rjn-btn-row {
        width: 310px;

        display: flex;

        flex-wrap: wrap;

        gap: 8px;

        align-items: center;
        justify-content: center;

        margin-top: 2px;
      }

      .rjn-btn,
      .rjn-ok {
        position: relative;

        overflow: hidden;

        cursor: pointer;

        text-align: center;

        font-weight: 900;

        color: #ffffff !important;

        box-sizing: border-box;

        transition:
          transform .18s ease,
          filter .18s ease;
      }

      .rjn-btn {
        width: 148px;

        padding: 12px 0;

        border-radius: 14px;

        font-size: 12px;

        white-space: nowrap;

        text-decoration: none;

        letter-spacing: .4px;

        background:
          linear-gradient(
            180deg,
            #52e98c 0%,
            #27c96b 28%,
            #12a956 62%,
            #08783b 100%
          );

        border:
          1px solid
          rgba(255,225,125,.95);

        box-shadow:
          0 0 12px rgba(55,230,125,.32),
          0 5px 14px rgba(0,0,0,.28),
          inset 0 1px 0 rgba(255,255,255,.42),
          inset 0 -2px 5px rgba(0,95,42,.20);
      }

      .rjn-btn.rjn-rtp {
        background:
          linear-gradient(
            180deg,
            #ffe99a 0%,
            #e8c75f 30%,
            #c99b2f 67%,
            #a97818 100%
          );

        color:
          #ffffff !important;

        border:
          1px solid
          rgba(255,244,190,.98);

        box-shadow:
          0 0 12px rgba(244,210,100,.30),
          0 5px 14px rgba(0,0,0,.26),
          inset 0 1px 0 rgba(255,255,255,.60),
          inset 0 -2px 5px rgba(120,78,0,.18);

        text-shadow:
          0 1px 3px
          rgba(85,55,0,.45);
      }

      .rjn-ok {
        width: 120px;

        padding: 11px 0;

        border-radius: 14px;

        font-size: 13px;

        background:
          linear-gradient(
            180deg,
            #fff0ad 0%,
            #e9ca68 32%,
            #c99d35 68%,
            #a9791d 100%
          );

        border:
          1px solid #fff7cf;

        box-shadow:
          0 0 12px rgba(232,202,104,.34),
          0 5px 14px rgba(0,0,0,.25),
          inset 0 1px 0 rgba(255,255,255,.62),
          inset 0 -2px 5px rgba(120,78,0,.16);

        text-shadow:
          0 1px 3px
          rgba(85,55,0,.42);
      }

      .rjn-btn:hover,
      .rjn-ok:hover {
        transform:
          translateY(-1px)
          scale(1.035);

        filter:
          brightness(1.12);
      }

      .rjn-btn:active,
      .rjn-ok:active {
        transform:
          scale(.96);
      }

      .rjn-btn::before,
      .rjn-ok::before {
        content: "";

        position: absolute;

        top: 0;
        left: -50%;

        width: 28%;
        height: 100%;

        background:
          linear-gradient(
            120deg,
            rgba(255,255,255,0),
            rgba(255,242,181,.9),
            rgba(255,255,255,0)
          );

        transform:
          skewX(-25deg);

        animation:
          rjnShine 1.8s
          linear infinite;
      }

      /* MATIKAN ANIMASI JIKA PERANGKAT MEMINTA */

      @media (prefers-reduced-motion: reduce) {
        #rjn-title {
          animation: none;

          background-position:
            50% 0;
        }

        #rjn-popup-box {
          animation:
            rjnSlideIn .45s
            ease forwards;
        }
      }

      /* MOBILE */

      @media (max-width: 768px) {
        #${POPUP_ID} {
          gap: 8px;

          padding: 10px;
        }

        #rjn-image-stage,
        #rjn-popup-img,
        #rjn-popup-img-next {
          max-width: 94vw;
          max-height: 55vh;
        }

        .rjn-btn-row {
          width:
            min(310px, 94vw);

          gap: 7px;
        }

        .rjn-btn {
          width: 146px;

          padding: 11px 0;

          font-size: 11px;
        }

        .rjn-ok {
          width: 115px;

          padding: 10px 0;
        }

        #rjn-title {
          font-size: 13px;

          letter-spacing: 1.2px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  async function createPopup() {
    if (
      popupCreated ||
      !canShowPopup() ||
      !document.body
    ) {
      return;
    }

    popupCreated = true;

    injectStyle();

    await preloadImages();

    if (document.getElementById(POPUP_ID)) {
      popupCreated = false;
      return;
    }

    const overlay =
      document.createElement("div");

    overlay.id =
      OVERLAY_ID;

    const popup =
      document.createElement("div");

    popup.id =
      POPUP_ID;

    popup.innerHTML = `
      <div id="rjn-popup-box">

        <div
          id="rjn-close"
          title="Tutup"
          role="button"
          aria-label="Tutup popup"
        >
          ✕
        </div>

        <button
          type="button"
          class="rjn-nav"
          id="rjn-prev"
          aria-label="Banner sebelumnya"
        >
          ‹
        </button>

        <div id="rjn-image-stage">

          <img
            id="rjn-popup-img"
            src="${IMG[0]}"
            alt="RAJANAGA99 Banner 1"
          >

          <img
            id="rjn-popup-img-next"
            src=""
            alt=""
            aria-hidden="true"
          >

        </div>

        <button
          type="button"
          class="rjn-nav"
          id="rjn-next"
          aria-label="Banner berikutnya"
        >
          ›
        </button>

        <div id="rjn-dots"></div>

      </div>

      <div id="rjn-title">
        RAJANAGA99 • DIRGAHAYU INDONESIA
      </div>

      <div class="rjn-btn-row">

        <a
          class="rjn-btn"
          href="https://linkshortener.vip/rajanaga99-livechat"
          target="_blank"
          rel="noopener noreferrer"
        >
          🎁 CLAIM BONUS
        </a>

        <a
          class="rjn-btn rjn-rtp"
          href="https://linkshortener.vip/rajanaga99-rtp"
          target="_blank"
          rel="noopener noreferrer"
        >
          📊 RTP
        </a>

        <button
          type="button"
          class="rjn-ok"
          id="rjn-ok"
        >
          OK
        </button>

      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    const sliderImage =
      document.getElementById(
        "rjn-popup-img"
      );

    const nextSliderImage =
      document.getElementById(
        "rjn-popup-img-next"
      );

    const dotsContainer =
      document.getElementById(
        "rjn-dots"
      );

    function renderDots() {
      dotsContainer.innerHTML = "";

      IMG.forEach(
        function (_, imageIndex) {
          const dot =
            document.createElement(
              "button"
            );

          dot.type =
            "button";

          dot.className =
            "rjn-dot" +
            (
              imageIndex === currentIndex
                ? " active"
                : ""
            );

          dot.setAttribute(
            "aria-label",
            "Tampilkan banner " +
              (imageIndex + 1)
          );

          dot.addEventListener(
            "click",
            function () {
              changeSlide(imageIndex);
              resetSliderTimer();
            }
          );

          dotsContainer.appendChild(dot);
        }
      );
    }

    function changeSlide(newIndex) {
      if (
        changingSlide ||
        newIndex < 0 ||
        newIndex >= IMG.length ||
        newIndex === currentIndex
      ) {
        return;
      }

      changingSlide = true;

      nextSliderImage.classList.remove(
        "slide-rtl"
      );

      sliderImage.classList.remove(
        "slide-old-left"
      );

      nextSliderImage.src =
        IMG[newIndex];

      nextSliderImage.alt =
        "RAJANAGA99 Banner " +
        (newIndex + 1);

      nextSliderImage.style.transition =
        "none";

      nextSliderImage.style.opacity =
        "0";

      nextSliderImage.style.transform =
        "translateX(100%)";

      void nextSliderImage.offsetWidth;

      nextSliderImage.style.transition =
        "";

      nextSliderImage.style.opacity =
        "";

      nextSliderImage.style.transform =
        "";

      sliderImage.classList.add(
        "slide-old-left"
      );

      nextSliderImage.classList.add(
        "slide-rtl"
      );

      let finished = false;

      function finishSlide() {
        if (finished) return;

        finished = true;

        nextSliderImage.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );

        currentIndex =
          newIndex;

        sliderImage.src =
          IMG[currentIndex];

        sliderImage.alt =
          "RAJANAGA99 Banner " +
          (currentIndex + 1);

        sliderImage.classList.remove(
          "slide-old-left"
        );

        sliderImage.style.transition =
          "none";

        sliderImage.style.opacity =
          "1";

        sliderImage.style.transform =
          "translateX(0)";

        requestAnimationFrame(
          function () {
            requestAnimationFrame(
              function () {
                nextSliderImage.style.transition =
                  "none";

                nextSliderImage.classList.remove(
                  "slide-rtl"
                );

                nextSliderImage.style.opacity =
                  "0";

                nextSliderImage.style.transform =
                  "translateX(100%)";

                nextSliderImage.src =
                  "";

                nextSliderImage.alt =
                  "";

                requestAnimationFrame(
                  function () {
                    sliderImage.style.transition =
                      "";

                    sliderImage.style.opacity =
                      "";

                    sliderImage.style.transform =
                      "";

                    nextSliderImage.style.transition =
                      "";

                    nextSliderImage.style.opacity =
                      "";

                    nextSliderImage.style.transform =
                      "";

                    changingSlide =
                      false;
                  }
                );
              }
            );
          }
        );

        renderDots();
      }

      function handleTransitionEnd(event) {
        if (
          event.target === nextSliderImage &&
          event.propertyName === "transform"
        ) {
          finishSlide();
        }
      }

      nextSliderImage.addEventListener(
        "transitionend",
        handleTransitionEnd
      );

      window.setTimeout(
        finishSlide,
        900
      );
    }

    function nextSlide() {
      const nextIndex =
        (currentIndex + 1) %
        IMG.length;

      changeSlide(nextIndex);
    }

    function previousSlide() {
      const previousIndex =
        (
          currentIndex -
          1 +
          IMG.length
        ) % IMG.length;

      changeSlide(previousIndex);
    }

    function startSliderTimer() {
      clearInterval(sliderTimer);

      if (IMG.length <= 1) return;

      sliderTimer =
        setInterval(
          nextSlide,
          SLIDER_INTERVAL
        );
    }

    function resetSliderTimer() {
      startSliderTimer();
    }

    function closePopup() {
      clearInterval(sliderTimer);

      popup.classList.add(
        "pull-up"
      );

      overlay.classList.add(
        "fade-out"
      );

      try {
        localStorage.setItem(
          DELAY_KEY,
          String(Date.now())
        );
      } catch (error) {
        /* Abaikan jika localStorage diblokir */
      }

      setTimeout(
        function () {
          popup.remove();
          overlay.remove();

          popupCreated = false;
        },
        740
      );
    }

    document
      .getElementById("rjn-prev")
      .addEventListener(
        "click",
        function () {
          previousSlide();
          resetSliderTimer();
        }
      );

    document
      .getElementById("rjn-next")
      .addEventListener(
        "click",
        function () {
          nextSlide();
          resetSliderTimer();
        }
      );

    document
      .getElementById("rjn-close")
      .addEventListener(
        "click",
        closePopup
      );

    document
      .getElementById("rjn-ok")
      .addEventListener(
        "click",
        closePopup
      );

    overlay.addEventListener(
      "click",
      closePopup
    );

    renderDots();

    if (IMG.length > 1) {
      startSliderTimer();
    }
  }

  function initPopup() {
    if (!document.body) return;

    createPopup();
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initPopup,
      { once: true }
    );
  } else {
    initPopup();
  }

  let lastPath =
    location.pathname;

  const observer =
    new MutationObserver(
      function () {
        if (
          location.pathname !== lastPath
        ) {
          lastPath =
            location.pathname;

          window.setTimeout(
            function () {
              if (
                !document.getElementById(
                  POPUP_ID
                )
              ) {
                createPopup();
              }
            },
            300
          );
        }
      }
    );

  observer.observe(
    document.documentElement,
    {
      childList: true,
      subtree: true
    }
  );
})();

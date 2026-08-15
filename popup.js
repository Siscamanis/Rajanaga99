"use strict";

(function () {
  const CONFIG = {
    images: [
      "http://plcl.me/images/Rc3Ca.png",
      "http://plcl.me/images/vv3HA.png",
      "http://plcl.me/images/KPFFs.png"
    ],

    gifs: [
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706101549-46c2cbd4-7bc2-4a7b-9cd9-f95d2a4878ff.gif",
        alt: "RAJANAGA99 GIF 1"
      },
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706728973-7c8bd8ad-a9d5-47e0-80ce-094f326e9612.gif",
        alt: "RAJANAGA99 GIF 2"
      },
      {
        src: "https://www.image2url.com/r2/default/gifs/1786706890521-a2f1bb69-ac3d-4469-95a6-1a57d56edf15.gif",
        alt: "RAJANAGA99 GIF 3"
      }
    ],

    title: "RAJANAGA99 • DIRGAHAYU INDONESIA",

    buttons: [
      {
        label: "📊 RTP RAJANAGA99",
        href: "https://linkshortener.vip/rajanaga99-rtp"
      },
      {
        label: "💬 LIVE CHAT",
        href: "https://tawk.to/chat/69f47e817f14b41c33bd2abc/1jnhgsb1s"
      }
    ],

    sliderInterval: 7000,
    showAgainAfter: 60 * 60 * 1000
  };

  const DELAY_KEY = "rjn_popup_delay_1h";
  const STYLE_ID = "rjn-popup-style";
  const POPUP_ID = "rjn-popup";
  const OVERLAY_ID = "rjn-popup-overlay";

  let currentIndex = 0;
  let sliderTimer = null;
  let changingSlide = false;
  let closing = false;

  function isAllowedPage() {
    const path = location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.includes("home")
    );
  }

  function canShowPopup() {
    if (!isAllowedPage()) return false;
    if (document.getElementById(POPUP_ID)) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    return (
      !lastClosed ||
      Date.now() - lastClosed >= CONFIG.showAgainAfter
    );
  }

  function preloadImages() {
    const urls = CONFIG.images.concat(
      CONFIG.gifs.map(function (gif) {
        return gif.src;
      })
    );

    return Promise.all(
      urls.map(function (url) {
        return new Promise(function (resolve) {
          const image = new Image();

          image.onload = resolve;
          image.onerror = resolve;
          image.src = url;

          if (image.complete) resolve();
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

      @keyframes rjnFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes rjnSlideIn {
        from {
          transform: translateY(25px);
          opacity: 0;
        }

        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes rjnPopupShatter {
        0% {
          transform: scale(1);
          opacity: 1;
          filter: blur(0);
        }

        35% {
          transform: scale(1.025);
          opacity: .92;
          filter: blur(0);
        }

        100% {
          transform: scale(.82);
          opacity: 0;
          filter: blur(7px);
        }
      }

      @keyframes rjnScaleShardBurst {
        0% {
          transform:
            translate3d(0, 0, 0)
            rotate(0deg)
            scale(1);

          opacity: 0;
        }

        12% {
          opacity: 1;
        }

        100% {
          transform:
            translate3d(
              var(--rjn-shard-x),
              var(--rjn-shard-y),
              0
            )
            rotate(var(--rjn-shard-rotate))
            scale(.18);

          opacity: 0;
        }
      }

      @keyframes rjnShine {
        0% {
          left: -40%;
        }

        100% {
          left: 125%;
        }
      }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;

        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, .35),
            rgba(0, 0, 0, .84)
          );

        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);

        animation:
          rjnFadeIn .35s ease forwards;
      }

      #${OVERLAY_ID}.fade-out {
        animation:
          rjnFadeOut .35s ease forwards;
      }

      #${POPUP_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        gap: 10px;
        padding: 12px;

        box-sizing: border-box;
        overflow-y: auto;
        background: transparent;
      }

      #${POPUP_ID}.shatter-out {
        pointer-events: none;

        animation:
          rjnPopupShatter .58s
          cubic-bezier(.55, .05, .25, 1)
          forwards;
      }

      .rjn-shard-layer {
        position: fixed;
        z-index: 2147483647;
        overflow: visible;
        pointer-events: none;
      }

      .rjn-scale-shard {
        position: absolute;

        left: var(--rjn-shard-left);
        top: var(--rjn-shard-top);

        width: var(--rjn-shard-size);
        height:
          calc(var(--rjn-shard-size) * 1.24);

        opacity: 0;

        clip-path:
          polygon(
            50% 0,
            94% 24%,
            82% 78%,
            50% 100%,
            18% 78%,
            6% 24%
          );

        background:
          radial-gradient(
            circle at 35% 22%,
            rgba(255, 255, 255, .95),
            transparent 18%
          ),
          linear-gradient(
            145deg,
            #fff1ac 0%,
            #d6b85a 25%,
            #2d8a5d 48%,
            #176b45 74%,
            #031407 100%
          );

        box-shadow:
          0 0 7px
          rgba(244, 215, 125, .85),

          0 0 14px
          rgba(45, 138, 93, .68);

        animation:
          rjnScaleShardBurst
          var(--rjn-shard-duration)
          cubic-bezier(.18, .7, .25, 1)
          var(--rjn-shard-delay)
          forwards;

        will-change:
          transform,
          opacity;
      }

      #rjn-popup-box {
        position: relative;

        animation:
          rjnSlideIn .45s ease forwards;

        background: transparent;
        border: none;
        box-shadow: none;
      }

      #rjn-close {
        position: absolute;
        top: -12px;
        right: -12px;
        z-index: 9999;

        width: 32px;
        height: 32px;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        border:
          1px solid #f4d77d;

        border-radius: 50%;

        background:
          linear-gradient(
            180deg,
            #8b5cf6,
            #4c1d95 62%,
            #111
          );

        color: #fff;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;

        box-shadow:
          0 0 16px
          rgba(244, 215, 125, .58);
      }

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

        width: auto;
        height: auto;

        max-width: 92vw;
        max-height: 58vh;

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
        transform: translateX(0);
      }

      #rjn-popup-img-next {
        position: relative;
        z-index: 2;

        opacity: 0;
        transform: translateX(100%);
        pointer-events: none;
      }

      #rjn-popup-img-next.slide-rtl {
        opacity: 1;
        transform: translateX(0);

        transition:
          transform .7s
          cubic-bezier(.22, .8, .28, 1),

          opacity .3s ease;
      }

      #rjn-popup-img.slide-old-left {
        opacity: .28;
        transform: translateX(-18%);

        transition:
          transform .7s
          cubic-bezier(.22, .8, .28, 1),

          opacity .55s ease;
      }

      .rjn-nav {
        position: absolute;
        top: 50%;
        z-index: 9998;

        width: 30px;
        height: 30px;
        padding: 0;

        transform: translateY(-50%);

        border:
          1px solid #f4d77d;

        border-radius: 50%;

        background:
          linear-gradient(
            180deg,
            #7c3aed,
            #2e1065
          );

        color: #fff;
        font-size: 24px;
        font-weight: 900;
        line-height: 22px;
        cursor: pointer;

        box-shadow:
          0 0 14px
          rgba(244, 215, 125, .45);
      }

      #rjn-prev {
        left: 8px;
      }

      #rjn-next {
        right: 8px;
      }

      #rjn-dots {
        position: absolute;
        left: 50%;
        bottom: 10px;
        z-index: 9998;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 7px;
        padding: 5px 8px;

        transform: translateX(-50%);

        border-radius: 20px;
        background: rgba(0, 0, 0, .25);
      }

      .rjn-dot {
        width: 8px;
        min-width: 8px;
        height: 8px;
        padding: 0;

        border: none;
        border-radius: 50%;

        background:
          rgba(255, 255, 255, .5);

        cursor: pointer;

        transition:
          transform .2s ease,
          background .2s ease;
      }

      .rjn-dot.active {
        background: #f4d77d;
        transform: scale(1.3);

        box-shadow:
          0 0 10px #f4d77d;
      }

      #rjn-title {
        color: #f5df98;

        font-size: 16px;
        font-weight: 900;
        letter-spacing: 1.4px;
        text-align: center;

        text-shadow:
          0 0 10px
          rgba(168, 85, 247, .9),

          0 0 24px
          rgba(244, 215, 125, .45);
      }

      .rjn-gif-row {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 10px;
      }

      .rjn-gif-box {
        position: relative;
        width: 90px;

        overflow: visible;

        border: none;
        outline: none;

        background: transparent;
        box-shadow: none;
      }

      .rjn-gif-box img {
        display: block;
        width: 100%;

        pointer-events: none;

        border: none;
        border-radius: 0;
        outline: none;

        background: transparent;
        box-shadow: none;
        filter: none;
      }

      .rjn-btn-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        width: 310px;
        gap: 8px;
        margin-top: 2px;
      }

      .rjn-btn,
      .rjn-ok {
        position: relative;
        overflow: hidden;

        box-sizing: border-box;

        color: #fff !important;
        text-align: center;
        font-weight: 900;
        cursor: pointer;

        transition:
          transform .18s ease,
          filter .18s ease;
      }

      .rjn-btn {
        width: 148px;
        padding: 12px 0;

        border:
          1px solid #d9bd64;

        border-radius: 15px;

        background:
          linear-gradient(
            180deg,
            #8b5cf6 0%,
            #6d28d9 30%,
            #3b0764 70%,
            #111 100%
          );

        font-size: 11px;
        letter-spacing: .35px;
        text-decoration: none;
        white-space: nowrap;

        box-shadow:
          0 0 12px
          rgba(139, 92, 246, .65),

          0 0 25px
          rgba(217, 189, 100, .26),

          0 9px 22px
          rgba(0, 0, 0, .55),

          inset 0 1px 0
          rgba(255, 255, 255, .2);
      }

      .rjn-ok {
        width: 120px;
        padding: 11px 0;

        border:
          1px solid #f4d77d;

        border-radius: 14px;

        background:
          linear-gradient(
            180deg,
            #a855f7 0%,
            #6d28d9 38%,
            #3b0764 75%,
            #111 100%
          );

        font-size: 14px;

        box-shadow:
          0 0 12px
          rgba(168, 85, 247, .75),

          0 0 25px
          rgba(244, 215, 125, .32),

          0 8px 20px
          rgba(0, 0, 0, .5),

          inset 0 1px 0
          rgba(255, 255, 255, .2);
      }

      .rjn-btn:hover,
      .rjn-ok:hover {
        transform: scale(1.045);
        filter: brightness(1.18);
      }

      .rjn-btn:active,
      .rjn-ok:active {
        transform: scale(.96);
      }

      .rjn-btn::before,
      .rjn-ok::before {
        content: "";

        position: absolute;
        top: 0;
        left: -40%;

        width: 25%;
        height: 100%;

        background:
          linear-gradient(
            120deg,
            transparent,
            rgba(244, 215, 125, .95),
            transparent
          );

        transform: skewX(-25deg);

        animation:
          rjnShine 2s infinite;
      }

      @media (max-width: 768px) {
        #${POPUP_ID} {
          gap: 8px;
        }

        #rjn-image-stage,
        #rjn-popup-img,
        #rjn-popup-img-next {
          max-width: 94vw;
          max-height: 55vh;
        }

        .rjn-gif-box {
          width: 78px;
        }

        .rjn-btn-row {
          width: 310px;
          gap: 8px;
        }

        .rjn-btn {
          width: 148px;
          padding: 11px 0;
          font-size: 11px;
        }

        .rjn-ok {
          width: 115px;
          padding: 10px 0;
          font-size: 13px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #${OVERLAY_ID},
        #${POPUP_ID},
        #rjn-popup-box,
        .rjn-btn::before,
        .rjn-ok::before,
        .rjn-scale-shard {
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function renderGifItems() {
    return CONFIG.gifs
      .map(function (gif) {
        return `
          <div class="rjn-gif-box">
            <img
              src="${gif.src}"
              alt="${gif.alt}"
            >
          </div>
        `;
      })
      .join("");
  }

  function renderButtonItems() {
    return CONFIG.buttons
      .map(function (button) {
        return `
          <a
            class="rjn-btn"
            href="${button.href}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${button.label}
          </a>
        `;
      })
      .join("");
  }

  async function createPopup() {
    if (!canShowPopup()) return;
    if (!document.body) return;
    if (!CONFIG.images.length) return;

    injectStyle();
    await preloadImages();

    if (!canShowPopup()) return;

    const overlay =
      document.createElement("div");

    overlay.id = OVERLAY_ID;

    const popup =
      document.createElement("div");

    popup.id = POPUP_ID;

    popup.setAttribute(
      "role",
      "dialog"
    );

    popup.setAttribute(
      "aria-modal",
      "true"
    );

    popup.setAttribute(
      "aria-label",
      "Promo RAJANAGA99"
    );

    popup.innerHTML = `
      <div id="rjn-popup-box">

        <button
          type="button"
          id="rjn-close"
          title="Tutup"
          aria-label="Tutup popup"
        >
          ✕
        </button>

        <button
          type="button"
          class="rjn-nav"
          id="rjn-prev"
          aria-label="Gambar sebelumnya"
        >
          ‹
        </button>

        <div id="rjn-image-stage">

          <img
            id="rjn-popup-img"
            src="${CONFIG.images[0]}"
            alt="Promo RAJANAGA99 Slide 1"
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
          aria-label="Gambar berikutnya"
        >
          ›
        </button>

        <div id="rjn-dots"></div>

      </div>

      <div id="rjn-title">
        ${CONFIG.title}
      </div>

      <div class="rjn-gif-row">
        ${renderGifItems()}
      </div>

      <div class="rjn-btn-row">

        ${renderButtonItems()}

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

    const popupBox =
      document.getElementById("rjn-popup-box");

    const sliderImage =
      document.getElementById("rjn-popup-img");

    const nextSliderImage =
      document.getElementById(
        "rjn-popup-img-next"
      );

    const dotsContainer =
      document.getElementById("rjn-dots");

    const closeButton =
      document.getElementById("rjn-close");

    const okButton =
      document.getElementById("rjn-ok");

    const previousButton =
      document.getElementById("rjn-prev");

    const nextButton =
      document.getElementById("rjn-next");

    function renderDots() {
      dotsContainer.innerHTML = "";

      CONFIG.images.forEach(
        function (_, imageIndex) {
          const dot =
            document.createElement("button");

          dot.type = "button";

          dot.className =
            "rjn-dot" +
            (
              imageIndex === currentIndex
                ? " active"
                : ""
            );

          dot.setAttribute(
            "aria-label",
            "Tampilkan gambar " +
            (imageIndex + 1)
          );

          dot.addEventListener(
            "click",
            function () {
              changeSlide(imageIndex);
              restartSlider();
            }
          );

          dotsContainer.appendChild(dot);
        }
      );
    }

    function changeSlide(newIndex) {
      if (
        changingSlide ||
        closing ||
        newIndex < 0 ||
        newIndex >= CONFIG.images.length ||
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
        CONFIG.images[newIndex];

      nextSliderImage.alt =
        "Promo RAJANAGA99 Slide " +
        (newIndex + 1);

      nextSliderImage.style.transition =
        "none";

      nextSliderImage.style.opacity = "0";

      nextSliderImage.style.transform =
        "translateX(100%)";

      void nextSliderImage.offsetWidth;

      nextSliderImage.style.transition = "";
      nextSliderImage.style.opacity = "";
      nextSliderImage.style.transform = "";

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

        currentIndex = newIndex;

        sliderImage.src =
          CONFIG.images[currentIndex];

        sliderImage.alt =
          "Promo RAJANAGA99 Slide " +
          (currentIndex + 1);

        sliderImage.classList.remove(
          "slide-old-left"
        );

        sliderImage.style.transition =
          "none";

        sliderImage.style.opacity = "1";

        sliderImage.style.transform =
          "translateX(0)";

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nextSliderImage.style.transition =
              "none";

            nextSliderImage.classList.remove(
              "slide-rtl"
            );

            nextSliderImage.style.opacity =
              "0";

            nextSliderImage.style.transform =
              "translateX(100%)";

            nextSliderImage.src = "";
            nextSliderImage.alt = "";

            requestAnimationFrame(function () {
              sliderImage.style.transition = "";
              sliderImage.style.opacity = "";
              sliderImage.style.transform = "";

              nextSliderImage.style.transition =
                "";

              nextSliderImage.style.opacity =
                "";

              nextSliderImage.style.transform =
                "";

              changingSlide = false;
            });
          });
        });

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
        (
          currentIndex + 1
        ) % CONFIG.images.length;

      changeSlide(nextIndex);
    }

    function previousSlide() {
      const previousIndex =
        (
          currentIndex -
          1 +
          CONFIG.images.length
        ) % CONFIG.images.length;

      changeSlide(previousIndex);
    }

    function startSlider() {
      clearInterval(sliderTimer);

      if (CONFIG.images.length < 2) return;

      sliderTimer =
        window.setInterval(
          nextSlide,
          CONFIG.sliderInterval
        );
    }

    function restartSlider() {
      startSlider();
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        closePopup();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
        restartSlider();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
        restartSlider();
      }
    }

    function createDragonScaleShards() {
      const elements =
        Array.from(popup.children);

      const rectangles =
        elements
          .map(function (element) {
            return element
              .getBoundingClientRect();
          })
          .filter(function (rect) {
            return (
              rect.width > 0 &&
              rect.height > 0
            );
          });

      if (!rectangles.length) {
        return null;
      }

      const left = Math.min.apply(
        null,
        rectangles.map(function (rect) {
          return rect.left;
        })
      );

      const top = Math.min.apply(
        null,
        rectangles.map(function (rect) {
          return rect.top;
        })
      );

      const right = Math.max.apply(
        null,
        rectangles.map(function (rect) {
          return rect.right;
        })
      );

      const bottom = Math.max.apply(
        null,
        rectangles.map(function (rect) {
          return rect.bottom;
        })
      );

      const width = right - left;
      const height = bottom - top;

      const layer =
        document.createElement("div");

      layer.className =
        "rjn-shard-layer";

      layer.setAttribute(
        "aria-hidden",
        "true"
      );

      layer.style.left =
        left + "px";

      layer.style.top =
        top + "px";

      layer.style.width =
        width + "px";

      layer.style.height =
        height + "px";

      const shardCount =
        window.innerWidth <= 768
          ? 28
          : 42;

      for (
        let index = 0;
        index < shardCount;
        index += 1
      ) {
        const shard =
          document.createElement("span");

        const shardLeft =
          6 + Math.random() * 88;

        const shardTop =
          5 + Math.random() * 90;

        const size =
          8 + Math.random() * 15;

        const directionX =
          shardLeft < 50 ? -1 : 1;

        const travelX =
          directionX *
          (45 + Math.random() * 150);

        const travelY =
          -90 + Math.random() * 230;

        const rotation =
          -260 + Math.random() * 520;

        const duration =
          .62 + Math.random() * .34;

        const delay =
          Math.random() * .12;

        shard.className =
          "rjn-scale-shard";

        shard.style.setProperty(
          "--rjn-shard-left",
          shardLeft + "%"
        );

        shard.style.setProperty(
          "--rjn-shard-top",
          shardTop + "%"
        );

        shard.style.setProperty(
          "--rjn-shard-size",
          size + "px"
        );

        shard.style.setProperty(
          "--rjn-shard-x",
          travelX + "px"
        );

        shard.style.setProperty(
          "--rjn-shard-y",
          travelY + "px"
        );

        shard.style.setProperty(
          "--rjn-shard-rotate",
          rotation + "deg"
        );

        shard.style.setProperty(
          "--rjn-shard-duration",
          duration + "s"
        );

        shard.style.setProperty(
          "--rjn-shard-delay",
          delay + "s"
        );

        layer.appendChild(shard);
      }

      document.body.appendChild(layer);

      return layer;
    }

    function closePopup() {
      if (closing) return;

      closing = true;

      clearInterval(sliderTimer);

      document.removeEventListener(
        "keydown",
        handleKeydown
      );

      const shardLayer =
        createDragonScaleShards();

      popup.classList.add(
        "shatter-out"
      );

      overlay.classList.add(
        "fade-out"
      );

      localStorage.setItem(
        DELAY_KEY,
        String(Date.now())
      );

      window.setTimeout(function () {
        popup.remove();
        overlay.remove();

        if (shardLayer) {
          shardLayer.remove();
        }
      }, 1100);
    }

    closeButton.addEventListener(
      "click",
      closePopup
    );

    okButton.addEventListener(
      "click",
      closePopup
    );

    overlay.addEventListener(
      "click",
      closePopup
    );

    previousButton.addEventListener(
      "click",
      function () {
        previousSlide();
        restartSlider();
      }
    );

    nextButton.addEventListener(
      "click",
      function () {
        nextSlide();
        restartSlider();
      }
    );

    popupBox.addEventListener(
      "mouseenter",
      function () {
        clearInterval(sliderTimer);
      }
    );

    popupBox.addEventListener(
      "mouseleave",
      startSlider
    );

    document.addEventListener(
      "keydown",
      handleKeydown
    );

    renderDots();
    startSlider();

    closeButton.focus({
      preventScroll: true
    });
  }

  function init() {
    if (!canShowPopup()) return;

    createPopup().catch(
      function (error) {
        console.error(
          "[RAJANAGA99 Popup] Gagal:",
          error
        );
      }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();

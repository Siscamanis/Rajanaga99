(function () {
  "use strict";

  const JACKPOT_IMAGE =
    "http://plcl.me/images/maqyZ.png";

  function replaceJackpotBackground() {
    const jackpotImages = document.querySelectorAll(
      'img[alt="jackpot-bg"]'
    );

    if (!jackpotImages.length) return;

    jackpotImages.forEach(function (image) {
      const parent = image.parentElement;

      if (!parent || parent.dataset.jackpotReplaced === "1") {
        return;
      }

      // Mengganti gambar jackpot pada bagian parent
      parent.style.backgroundImage = `url(${JACKPOT_IMAGE})`;
      parent.style.backgroundSize = "contain";
      parent.style.backgroundRepeat = "no-repeat";
      parent.style.backgroundPosition = "center";
      parent.style.backgroundColor = "transparent";

      // Menyembunyikan gambar jackpot bawaan
      image.style.opacity = "0";
      image.style.visibility = "hidden";

      // Menandai elemen agar tidak diproses berulang kali
      parent.dataset.jackpotReplaced = "1";

      console.log(
        "[✅] Jackpot desktop diganti di parent:",
        parent
      );
    });
  }

  function startJackpotReplacement() {
    let attempts = 0;
    const maxAttempts = 40;

    const replacementInterval = setInterval(function () {
      replaceJackpotBackground();
      attempts++;

      if (attempts >= maxAttempts) {
        clearInterval(replacementInterval);
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startJackpotReplacement
    );
  } else {
    startJackpotReplacement();
  }

  // Memantau elemen jackpot yang dimuat secara dinamis
  const jackpotObserver = new MutationObserver(function () {
    replaceJackpotBackground();
  });

  jackpotObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();

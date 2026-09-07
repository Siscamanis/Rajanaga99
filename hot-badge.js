<style>
/* =========================================
   RAJANAGA99 — HOT BADGE
========================================= */

div[data-radix-aspect-ratio-wrapper] {
    position: relative;
}

/* HOT BADGE */
div[data-radix-aspect-ratio-wrapper]
:has(img[src*="/asset/gametag/"])::after {
    content: "\1F525 HOT";

    position: absolute;
    top: 6px;
    left: 6px;

    background: linear-gradient(135deg, #ff0000, #ff9900);
    color: #ffffff;

    font-size: 7px;
    font-weight: 800;

    padding: 2px 5px;
    border-radius: 4px;

    z-index: 30;

    box-shadow:
        0 2px 6px rgba(0,0,0,.45),
        0 0 5px rgba(255,80,0,.45);

    pointer-events: none;

    animation: hotPulse 1.3s infinite;
}

@keyframes hotPulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.08);
    }

    100% {
        transform: scale(1);
    }
}
</style>

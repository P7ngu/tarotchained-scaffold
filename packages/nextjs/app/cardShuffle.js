import initKaplay from "~~/app/kaplayContext.js";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "~~/app/store/store.js";

export default async function cardShuffle() {
  // 1) Initialize Kaplay once
  if (!window._kaplayInstance) {
    window._kaplayInstance = initKaplay();
  }
  const k = window._kaplayInstance;

  // 2) Inject all required CSS (including your keyframes) one-time
  if (!document.getElementById("overlayStyles")) {
    const style = document.createElement("style");
    style.id = "overlayStyles";
    style.textContent = `
      body { background-color: #f7f7f7; }

      #htmlOverlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.7);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 2000;
      }

      .stack {
        position: relative;
        width: 340px;
        height: 440px;
        margin: auto;
      }

      .card {
        width: 300px; height: 400px;
        background: linear-gradient(to bottom, rgba(235,236,240,1) 0%, rgba(255,255,255,1) 60%);
        border: 1px solid #ccc;
        border-radius: 12px;
        position: absolute;
        animation-duration: 6s;
        animation-delay: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        box-shadow: 4px 4px 8px rgba(180,181,185,0.5);
      }

      .card.one   { left:   0; top:   0; z-index: 2; animation-name: onTop; }
      .card.two   { left:  20px; top:  20px; z-index: 1; animation-name: onMiddle; }
      .card.three { left:  40px; top:  40px; z-index: 0; animation-name: onBottom; }

      .card span {
        font-size: 24px;
        font-family: "Lucida Grande",sans-serif;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
      }

      @keyframes onTop {
        5%  { transform: translateY(-300px); z-index:1; left:20px; top:20px; }
        10% { transform: translateY(0);      z-index:0; left:40px; top:40px; }
        40% { /* hold */ }
        50% { transform: translateY(0);      z-index:1; left:20px; top:20px; }
        70% { /* hold */ }
        80% { transform: translateY(0);      z-index:2; left:0;   top:0;   }
      }

      @keyframes onMiddle {
        10% { transform: translateY(0);      z-index:2; left:0;   top:0;   }
        40% { /* hold */ }
        45% { transform: translateY(-300px); z-index:1; left:20px; top:20px; }
        50% { transform: translateY(0);      z-index:0; left:40px; top:40px; }
        70% { /* hold */ }
        80% { transform: translateY(0);      z-index:1; left:20px; top:20px; }
      }

      @keyframes onBottom {
        10% { transform: translateY(0);      z-index:0; left:20px; top:20px; }
        40% { /* hold */ }
        50% { transform: translateY(0);      z-index:2; left:0;   top:0;   }
        70% { /* hold */ }
        75% { transform: translateY(-300px); z-index:1; left:20px; top:20px; }
        80% { transform: translateY(0);      z-index:0; left:40px; top:40px; }
      }
    `;
    document.head.appendChild(style);
  }

  // 3) Create the “Start Shuffle” button and overlay only once
  if (!document.getElementById("startShuffle")) {
    // Start button
    const btn = document.createElement("button");
    btn.id = "startShuffle";
    btn.textContent = "Start Shuffle";
    Object.assign(btn.style, {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      zIndex: "1000",
      fontSize: "16px",
      cursor: "pointer",
    });
    document.body.appendChild(btn);

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = "htmlOverlay";
    overlay.innerHTML = `
      <figure class="stack">
        <div class="card one"><span>Top</span></div>
        <div class="card two"><span>Middle</span></div>
        <div class="card three"><span>Bottom</span></div>
      </figure>
      <button id="closeOverlay" style="
        position:absolute; top:20px; right:20px;
        padding:8px 12px; font-size:14px; cursor:pointer;
      ">Close</button>
    `;
    document.body.appendChild(overlay);

    // Show overlay
    btn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    // Hide overlay
    overlay.querySelector("#closeOverlay").addEventListener("click", () => {
      overlay.style.display = "none";
    });
  }
}

'use client'
import React from "react";
import { createRoot } from "react-dom/client";
import initKaplay from "~~/app/kaplayContext.js";
import WalletOverlay from "~~/components/scaffold-eth/WalletOverlay";

export default async function cardShuffle() {
  // init Kaplay...
  if (!window._kaplayInstance) {
    window._kaplayInstance = initKaplay();
  }
  const k = window._kaplayInstance;

  // create container
  let container = document.getElementById("kaplay-wallet-overlay");
  if (!container) {
    container = document.createElement("div");
    container.id = "kaplay-wallet-overlay";
    Object.assign(container.style, {
      position: "fixed",
      top: "1rem",
      right: "1rem",
      zIndex: 9999,
    });
    document.body.appendChild(container);
  }

  // mount the React component into it
  const root = createRoot(container);
  root.render(<WalletOverlay />);
}
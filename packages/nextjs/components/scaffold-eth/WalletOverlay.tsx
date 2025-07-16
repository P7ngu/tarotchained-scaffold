"use client";

import { WalletButton } from "@rainbow-me/rainbowkit";

export default function WalletOverlay() {
  return (
    <div
      id="kaplay-wallet-overlay"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
      }}
    >
      <WalletButton wallet="metamask" />
    </div>
  );
}

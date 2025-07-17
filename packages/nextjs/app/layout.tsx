"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
// app/layout.tsx  (server component)
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { JustProviders, queryClient } from "~~/components/JustProviders";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
//import ClientProviders from "~~/app/ClientProvider";
//import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
// ← client component
import "~~/styles/globals.css";

//export const metadata = {
// title: "The Fool's Journey",
// description: "A Journey of Self-Discovery and Freedom, tarot chained.",
//};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider avatar={BlockieAvatar}>
              {/*<ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>*/}
              {/*<ClientProviders>{children}</ClientProviders>*/}

              <JustProviders>{children}</JustProviders>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

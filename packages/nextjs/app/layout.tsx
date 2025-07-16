// app/layout.tsx
"use client";

// Usa questa direttiva per dichiarare il componente client-side
import type { ReactNode } from "react";
import AppWrapper from "./AppWrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import "~~/styles/index.css";

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

// app/layout.tsx

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Crea l'istanza di QueryClient
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config} reconnectOnMount={false}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <ConnectButton />
              <AppWrapper>{children}</AppWrapper>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

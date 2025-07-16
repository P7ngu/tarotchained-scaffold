// app/layout.tsx
import type { ReactNode } from "react";
import AppWrapper from "~~/app/AppWrapper";
import "~~/styles/index.css";

//import { ScaffoldEthAppWithProviders } from "~~/components/scaffold-eth/ScaffoldEthAppWithProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

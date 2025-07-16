// app/layout.tsx  (server component)
import "@rainbow-me/rainbowkit/styles.css";
import ClientProviders from "~~/app/ClientProvider";
// ← client component
import "~~/styles/globals.css";

export const metadata = {
  title: "Game title",
  description: "Built with 🏗 Scaffold-ETH 2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

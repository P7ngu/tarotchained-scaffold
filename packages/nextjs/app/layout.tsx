// app/layout.tsx  (server component)
import "@rainbow-me/rainbowkit/styles.css";
//import ClientProviders from "~~/app/ClientProvider";
//import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
// ← client component
import "~~/styles/globals.css";

export const metadata = {
  title: "The Fool's Journey",
  description: "A Journey of Self-Discovery and Freedom, tarot chained.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        {/*<ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>*/}
        {/*<ClientProviders>{children}</ClientProviders>*/}
        {children}
      </body>
    </html>
  );
}

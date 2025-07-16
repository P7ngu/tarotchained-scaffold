// app/layout.tsx  (server component)
import "@rainbow-me/rainbowkit/styles.css";
import ClientProviders from "~~/app/ClientProvider";
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

// app/ClientProviders.tsx  (client component)
"use client";

// ← this file runs in the browser
import { useEffect } from "react";
import initPrologue from "~~/app/initPrologue.js";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

// app/ClientProviders.tsx  (client component)

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPrologue();
  }, []);

  return <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>;
}

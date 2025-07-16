// app/ClientProviders.tsx  (client component)
"use client";

// ← this file runs in the browser
import { useEffect, useRef } from "react";
import { Provider } from "jotai";
import initGame from "~~/app/initGame.js";
import initPrologue from "~~/app/initPrologue.js";
import ReactUI from "~~/app/reactUI.jsx";
import { store } from "~~/app/store/store.js";
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
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ui = uiRef.current;
    if (!ui || !ui.parentElement) return;

    const resize = () => {
      document.documentElement.style.setProperty(
        "--scale",
        String(
          Math.min(ui.parentElement!.offsetWidth / ui.offsetWidth, ui.parentElement!.offsetHeight / ui.offsetHeight),
        ),
      );
    };

    const observer = new ResizeObserver(resize);
    observer.observe(ui.parentElement);
    resize();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    initPrologue();
  }, []);

  //TODO: THIS IS ONLY FOR DEBUG PURPOSE, REMOVE IT!!!
  if (2 < 1) {
    initGame();
  }

  return (
    <Provider store={store}>
      <>
        <div id="ui" ref={uiRef} />
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        <ReactUI />
      </>
    </Provider>
  );
}

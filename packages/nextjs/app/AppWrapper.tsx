"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Provider } from "jotai";
import initGame from "~~/app/initGame.js";
import ReactUI from "~~/app/reactUI.jsx";
import { store } from "~~/app/store/store.js";

export default function AppWrapper({ children }: { children: ReactNode }) {
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
    initGame();
  }, []);

  return (
    <Provider store={store}>
      <div id="ui" ref={uiRef}>
        {children}
        <ReactUI />
      </div>
    </Provider>
  );
}

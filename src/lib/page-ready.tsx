"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type PageReadyContext = {
  ready: boolean;
  signalReady: () => void;
};

const Context = createContext<PageReadyContext>({ ready: false, signalReady: () => {} });

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const signalReady = useCallback(() => setReady(true), []);
  return <Context.Provider value={{ ready, signalReady }}>{children}</Context.Provider>;
}

export function usePageReady() {
  return useContext(Context);
}

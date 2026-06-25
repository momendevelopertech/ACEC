"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { PageReadyProvider } from "@/lib/page-ready";

const PageLoader = dynamic(
  () => import("@/components/ui/PageLoader").then((m) => m.PageLoader),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const PageTransitionWrapper = dynamic(
  () => import("@/components/layout/PageTransitionWrapper").then((m) => m.PageTransitionWrapper),
  { ssr: false }
);

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <PageReadyProvider>
      <PageLoader />
      <CustomCursor />
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
    </PageReadyProvider>
  );
}

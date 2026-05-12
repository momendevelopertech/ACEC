"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export function LocaleProvider() {
  const locale = useLocale();

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return null;
}

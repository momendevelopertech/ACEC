"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">500</div>
        <h1 className="font-heading">
          {isAr ? "حدث خطأ ما" : "Something Went Wrong"}
        </h1>
        <p>
          {isAr
            ? "عذراً، حدث خطأ غير متوقع. حاول مرة أخرى أو عد للرئيسية."
            : "Sorry, an unexpected error occurred. Please try again or return home."}
        </p>
        <div className="not-found-actions">
          <button onClick={reset} className="magnetic-btn magnetic-btn-primary">
            {isAr ? "حاول مرة أخرى" : "Try Again"}
          </button>
          <Link href={`/${locale}`} className="btn-contact">
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

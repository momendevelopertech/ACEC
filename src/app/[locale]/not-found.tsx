"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="font-heading">
          {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <p>
          {isAr
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "Sorry, the page you are looking for does not exist or has been moved."}
        </p>
        <div className="not-found-actions">
          <Link href={`/${locale}`} className="magnetic-btn magnetic-btn-primary">
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-contact">
            {isAr ? "اتصل بنا" : "Contact Us"}
          </Link>
        </div>
      </div>
    </div>
  );
}

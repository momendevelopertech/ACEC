"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  href?: string;
}

export function Logo({ size = "md", showSubtitle = true, href }: LogoProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const sizeMap = {
    sm: { svg: "w-8 h-8", text: "text-lg", gap: "gap-2" },
    md: { svg: "w-10 h-10", text: "text-xl", gap: "gap-3" },
    lg: { svg: "w-12 h-12", text: "text-2xl", gap: "gap-4" },
  };

  const dimensions = sizeMap[size];

  const content = (
    <div className={`flex items-center ${dimensions.gap}`}>
      {/* Logo SVG */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={`${dimensions.svg} text-gold-600 flex-shrink-0`}
        preserveAspectRatio="xMinYMid meet"
      >
        <g fill="currentColor">
          <rect x="5" y="10" width="8" height="8" />
          <rect x="15" y="10" width="8" height="8" />
          <rect x="25" y="10" width="8" height="8" />
          <rect x="5" y="20" width="8" height="8" />
          <rect x="15" y="20" width="8" height="8" />
          <rect x="5" y="30" width="8" height="8" />
        </g>
      </svg>

      {/* Text content */}
      {showSubtitle && (
        <>
          <div
            className="w-px h-6 bg-gold-600/30 hidden sm:block"
            style={{ opacity: 0.3 }}
          />
          <div className="hidden sm:flex flex-col">
            <span
              className="text-xs font-bold text-gold-600/80 leading-tight"
              style={{
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {isRTL
                ? "الميثاق العربي\nللاستشارات"
                : "Arab Charter\nEngineering"}
            </span>
          </div>
        </>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center text-decoration-none transition-opacity duration-200 hover:opacity-80"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{content}</div>;
}

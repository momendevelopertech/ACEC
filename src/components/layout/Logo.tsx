"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { AcecLogoSVG } from "./AcecLogoSVG";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function Logo({ size = "md", href, className = "" }: LogoProps) {
  const locale = useLocale();

  const sizeMap = {
    sm: { width: 200, height: 60 },
    md: { width: 320, height: 96 },
    lg: { width: 400, height: 120 },
  };

  const dimensions = sizeMap[size];

  const content = (
    <AcecLogoSVG
      width={dimensions.width}
      height={dimensions.height}
      className={`transition-opacity duration-200 hover:opacity-80 ${className}`}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center no-underline"
        aria-label="ACEC - Arab Charter Engineering Consultants"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{content}</div>;
}

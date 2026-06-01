"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function Logo({ size = "md", href, className = "" }: LogoProps) {
  const locale = useLocale();

  const sizeMap = {
    sm: { width: 150, height: 45 },
    md: { width: 220, height: 66 },
    lg: { width: 320, height: 96 },
  };

  const dimensions = sizeMap[size];

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  const content = (
    <Image
      src="/images/logo.png"
      alt="ACEC - Arabian Covenant Engineering Consultants"
      width={dimensions.width}
      height={dimensions.height}
      className={`object-contain transition-opacity duration-200 hover:opacity-80 ${className}`}
      style={{ width: "auto", height: "auto" }}
      priority
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center no-underline"
        aria-label="ACEC - Arabian Covenant Engineering Consultants"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{content}</div>;
}

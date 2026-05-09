"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function Logo({ size = "md", href, className = "" }: LogoProps) {
  const locale = useLocale();

  const sizeMap = {
    sm: { width: 160, height: 50 },
    md: { width: 220, height: 70 },
    lg: { width: 280, height: 90 },
  };

  const dimensions = sizeMap[size];

  const content = (
    <Image
      src="/images/logo.svg"
      alt="ACEC - Arab Charter Engineering Consultants"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={`transition-opacity duration-200 hover:opacity-80 ${className}`}
      style={{
        width: "auto",
        height: dimensions.height,
        maxWidth: dimensions.width,
      }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center no-underline"
        aria-label="ACEC Home"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{content}</div>;
}

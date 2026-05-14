"use client";

interface AcecLogoSVGProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AcecLogoSVG({ className = "", width, height }: AcecLogoSVGProps) {
  return (
    <svg 
      width={width || "400"} 
      height={height || "120"} 
      viewBox="0 0 400 120" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      preserveAspectRatio="xMinYMid meet"
      className={className}
      style={{
        width: width ? "auto" : "100%",
        height: "auto",
        maxWidth: "100%",
        maxHeight: height || 120,
      }}
    >
      {/* Grid Icon (left side) - Brand Accent */}
      <g fill="var(--color-accent)">
        <rect x="8" y="15" width="18" height="18" rx="2"/>
        <rect x="30" y="15" width="18" height="18" rx="2"/>
        <rect x="52" y="15" width="18" height="18" rx="2"/>
        <rect x="8" y="37" width="18" height="18" rx="2"/>
        <rect x="30" y="37" width="18" height="18" rx="2"/>
        <rect x="8" y="59" width="18" height="18" rx="2"/>
      </g>

      {/* ACEC Text (larger, bold, primary text color for max contrast) */}
      <text x="85" y="68" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="52" fontWeight="900" fill="var(--color-text-primary)" letterSpacing="2">ACEC</text>

      {/* Arabic Subtitle - Brand Accent */}
      <text x="85" y="90" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="13" fontWeight="700" fill="var(--color-accent)">
        الميثاق العربي للاستشارات الهندسية وهندسة السلامة
      </text>

      {/* English Subtitle - Muted Text */}
      <text x="85" y="108" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="11" fontWeight="500" fill="var(--color-text-muted)">
        By Eng. Majid Al Thubaity
      </text>
    </svg>
  );
}

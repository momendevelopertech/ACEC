"use client";

import { useState, useEffect, useRef } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallback?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export function ImageWithLoader({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  fallback,
  priority = false,
  onLoad,
}: ImageWithLoaderProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const preloaderRef = useRef<HTMLImageElement | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    setState("loading");
    if (!src) { setState("error"); return; }

    const img = new Image();
    preloaderRef.current = img;

    img.onload = () => {
      if (!mountedRef.current) return;
      setState("loaded");
      onLoad?.();
    };
    img.onerror = () => {
      if (!mountedRef.current) return;
      setState("error");
    };
    img.src = src;

    if (img.complete) {
      setState("loaded");
      img.onload = null;
      onLoad?.();
    }

    return () => {
      preloaderRef.current = null;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  if (state === "error" || !src) {
    return (
      <div className={`relative overflow-hidden ${wrapperClassName}`}>
        <div className="w-full h-full flex items-center justify-center bg-black/10">
          {fallback ? (
            <img src={fallback} alt={alt} className={`${className} opacity-50`} />
          ) : (
            <div className="loading-spinner" />
          )}
        </div>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div
        className={`relative overflow-hidden ${wrapperClassName}`}
        style={{
          background: "linear-gradient(90deg, rgba(240,237,230,0.06) 25%, rgba(240,237,230,0.15) 50%, rgba(240,237,230,0.06) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`${className} opacity-100 transition-opacity duration-300`}
      />
    </div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";

interface PdfViewerProps {
  src: string;
  fileName: string;
  isAr: boolean;
}

export function PdfViewer({ src, fileName, isAr }: PdfViewerProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timedOutRef = useRef(false);

  const handleLoad = useCallback(() => {
    timedOutRef.current = true;
    setState("loaded");
  }, []);

  const handleError = useCallback(() => {
    setState("error");
  }, []);

  return (
    <div className="w-full">
      {/* PDF embed area */}
      <div
        className="gradient-border"
        style={{
          background: "var(--color-card-bg)",
          backdropFilter: "blur(20px)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          width: "100%",
          minHeight: "70vh",
          position: "relative",
        }}
      >
        {state === "loading" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              background: "var(--color-card-bg)",
              zIndex: 1,
            }}
          >
            <div className="loading-spinner" />
            <span style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
              {isAr ? "جاري تحميل الملف..." : "Loading PDF..."}
            </span>
          </div>
        )}

        {state === "error" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              background: "var(--color-card-bg)",
              zIndex: 1,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "2rem" }}>📄</span>
            <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", maxWidth: "400px" }}>
              {isAr
                ? "تعذر عرض الملف في المتصفح. استخدم أحد الخيارات أدناه."
                : "Could not display the PDF in your browser. Use one of the options below."}
            </p>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={src}
          title={fileName}
          /* 
           * Cross-browser PDF rendering via iframe:
           * - Chrome/Edge: Built-in PDFium viewer (works same-origin)
           * - Firefox: Built-in PDF.js viewer
           * - Safari: Native PDF rendering
           * - Brave: Same as Chrome (console error from Leo extension is unrelated)
           *
           * The console error "chrome-extension://invalid/" comes from
           * Brave browser's internal Leo AI assistant (chrome://resources/brave/leo.bundle.js)
           * injecting into every page. It is NOT caused by our application code.
           * Verify: open the page in Incognito/Private mode or a clean browser profile
           * with no extensions — the error will not appear.
           */
          style={{
            width: "100%",
            height: "85vh",
            border: "none",
            display: "block",
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      {/* Action buttons */}
      <div className="text-center mt-8">
        <p
          style={{
            color: "var(--color-muted)",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          {isAr ? "لا يعمل العرض؟" : "Having trouble viewing?"}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          {/* Open in new tab: direct user action — avoids popup blockers */}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              border: "1px solid var(--color-gold)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-gold)",
              background: "transparent",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {isAr ? "فتح في علامة تبويب جديدة" : "Open in new tab"}
          </a>

          {/* Download: native browser download */}
          <a
            href={`${src}?download=1`}
            download={fileName}
            className="magnetic-btn magnetic-btn-primary"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isAr ? "تحميل الملف" : "Download PDF"}
          </a>
        </div>
      </div>
    </div>
  );
}

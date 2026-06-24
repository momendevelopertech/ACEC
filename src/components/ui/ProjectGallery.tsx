"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ProjectGalleryProps = {
  images: string[];
  apiBase: string;
  label?: string;
};

function ProjectGallery({ images, apiBase, label }: ProjectGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const open = useCallback((i: number) => setSelected(i), []);
  const close = useCallback(() => setSelected(null), []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (selected === null) return;
      const next = (selected + dir + images.length) % images.length;
      setSelected(next);
    },
    [selected, images.length]
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, go]);

  const thumbnails = useMemo(
    () =>
      images.map((src, i) => (
        <motion.button
          key={src}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          onClick={() => open(i)}
          className="group relative overflow-hidden rounded-xl cursor-pointer"
          style={{
            aspectRatio: "4/3",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            flexShrink: 0,
            width: "100%",
          }}
        >
          <img
            src={`${apiBase}/storage/${src}`}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.button>
      )),
    [images, apiBase, open]
  );

  return (
    <section style={{ padding: "0 1.5rem 4rem" }}>
      <div className="container-custom">
        {label && (
          <div className="section-label justify-center mb-4">
            {label}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {thumbnails}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={close}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Close"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              style={{
                position: "absolute",
                left: "1.5rem",
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={`${apiBase}/storage/${images[selected]}`}
                alt={`Gallery image ${selected + 1}`}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              style={{
                position: "absolute",
                right: "1.5rem",
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Next"
            >
              ›
            </button>

            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(i);
                  }}
                  style={{
                    width: i === selected ? 28 : 10,
                    height: 10,
                    borderRadius: 5,
                    border: "none",
                    background:
                      i === selected
                        ? "var(--color-gold, #c9a84c)"
                        : "rgba(255,255,255,0.35)",
                    cursor: "pointer",
                    transition: "width 0.3s, background 0.3s",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { ProjectGallery };
export type { ProjectGalleryProps };

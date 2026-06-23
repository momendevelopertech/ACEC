"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

interface Cert {
  id: number;
  name: string;
  description: string;
  issuer: string;
  image: string | null;
  issue_date?: string;
  expiry_date?: string;
}

export function CertificationsGallery({ certs }: { certs: Cert[] }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [selected, setSelected] = useState<Cert | null>(null);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="certs-grid">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-border cert-card"
            onClick={() => setSelected(cert)}
          >
            <div className="cert-card-image">
              {cert.image ? (
                <img
                  src={`${API_BASE}/storage/${cert.image}`}
                  alt={cert.name}
                  className="cert-card-img"
                />
              ) : (
                <div className="cert-card-placeholder">🏅</div>
              )}
            </div>
            <div className="cert-card-body">
              <h3 className="cert-card-name">{cert.name}</h3>
              {cert.issuer && (
                <p className="cert-card-issuer">{cert.issuer}</p>
              )}
              {cert.description && (
                <p className="cert-card-desc">{cert.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lightbox-overlay"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lightbox-content"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelected(null)}
                aria-label={isAr ? "إغلاق" : "Close"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {selected.image ? (
                <img
                  src={`${API_BASE}/storage/${selected.image}`}
                  alt={selected.name}
                  className="lightbox-img"
                />
              ) : (
                <div className="lightbox-placeholder">🏅</div>
              )}
              <div className="lightbox-info">
                <h3 className="lightbox-title">{selected.name}</h3>
                {selected.issuer && (
                  <p className="lightbox-issuer">{selected.issuer}</p>
                )}
                {selected.description && (
                  <p className="lightbox-desc">{selected.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .certs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 600px) {
          .certs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1000px) {
          .certs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .cert-card {
          background: var(--color-card-bg, #f0ede6);
          backdrop-filter: blur(20px);
          border-radius: var(--radius-lg, 12px);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-card:hover {
          transform: translateY(-4px);
        }

        .cert-card-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(var(--color-accent-rgb, 198 166 107), 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1.5rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-card:hover .cert-card-img {
          transform: scale(1.05);
        }

        .cert-card-placeholder {
          font-size: 3rem;
          opacity: 0.6;
        }

        .cert-card-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .cert-card-name {
          font-family: var(--font-heading, Georgia, serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-text-primary, #2e2b26);
          margin: 0 0 0.35rem;
          line-height: 1.3;
        }

        .cert-card-issuer {
          color: var(--color-gold, #C6A66B);
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .cert-card-desc {
          color: var(--color-muted, #8a8278);
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .lightbox-content {
          background: var(--color-card-bg, #f0ede6);
          border-radius: var(--radius-lg, 12px);
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .lightbox-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
        }

        .lightbox-close:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .lightbox-img {
          width: 100%;
          max-height: 55vh;
          object-fit: contain;
          display: block;
          background: rgba(0, 0, 0, 0.03);
        }

        .lightbox-placeholder {
          font-size: 5rem;
          text-align: center;
          padding: 4rem;
        }

        .lightbox-info {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .lightbox-title {
          font-family: var(--font-heading, Georgia, serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-text-primary, #2e2b26);
          margin: 0 0 0.35rem;
        }

        .lightbox-issuer {
          color: var(--color-gold, #C6A66B);
          font-size: 0.825rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .lightbox-desc {
          color: var(--color-muted, #8a8278);
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </>
  );
}

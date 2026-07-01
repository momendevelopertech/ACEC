"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";
import { usePageReady } from "@/lib/page-ready";

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  is_featured: boolean;
}

interface ServicesSectionProps {
    showAll?: boolean;
}

const DISPLAY_LIMIT = 6;

export function ServicesSection({ showAll }: ServicesSectionProps = {}) {
    const t = useTranslations("services");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const locale = useLocale();
    const isRtl = locale === "ar";
    const { signalReady } = usePageReady();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
        fetch(`${API_BASE}/api/v1/services/${locale}`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setServices(data.data);
                } else {
                    setError(true);
                }
                setLoading(false);
                signalReady();
            })
            .catch(() => {
                setError(true);
                setLoading(false);
                signalReady();
            });
    }, [locale]);

    const displayServices = showAll
        ? services
        : (() => {
            const featured = services.filter(s => s.is_featured);
            const rest = services.filter(s => !s.is_featured);
            return [...featured, ...rest].slice(0, DISPLAY_LIMIT);
        })();

    return (
        <section
            ref={ref}
            className="section-pad relative overflow-hidden"
            id="services"
            dir={isRtl ? "rtl" : "ltr"}
        >
            <div className="container-edit">
                {loading ? (
                    <div className="text-center py-24 flex flex-col items-center gap-6">
                        <div className="w-10 h-10 rounded-full border-2 border-r-transparent animate-spin" style={{ borderColor: "#C6A66B", borderRightColor: "transparent" }}></div>
                        <p style={{ color: "rgba(240,237,230,0.5)", fontSize: "0.9rem" }}>
                            {t("loading")}
                        </p>
                    </div>
                ) : error ? (
                    <div className="text-center py-24">
                        <p style={{ color: "rgba(74,69,64,0.7)", fontSize: "0.9rem" }}>
                            {t("loading")}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Section Header — above the grid */}
                        <div className="services-header">
                            <div className="services-header-col">
                                <div className="service-eyebrow">
                                    {t("practice_label")}
                                </div>
                                <h2 className="service-section-heading">
                                    {locale === "ar" ? `${displayServices.length} تخصصات.` : `${displayServices.length} disciplines.`} <br />
                                    <strong>{t("heading_line2")}</strong>
                                </h2>
                            </div>
                            <div className="services-header-col services-header-col-desc">
                                <p className="service-section-desc">
                                    {t("description_line")}
                                </p>
                            </div>
                        </div>

                        {/* Service Cards Grid */}
                        <div className="services-grid">
                            {displayServices.map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    variants={fadeUpVariant}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    className="service-card"
                                >
                                    <div>
                                        <div className="service-number">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </div>
                                        <h3 className="service-title">
                                            {service.title}
                                        </h3>
                                        <p className="service-desc">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="service-link">
                                        <Link
                                            href={`/${locale}/services/${service.slug}`}
                                            className="service-link-a"
                                        >
                                            {t("learnMore")}
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="service-arrow">
                                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {!showAll && (
                            <div className="services-footer">
                                <Link
                                    href={`/${locale}/services`}
                                    className="services-view-all-btn"
                                >
                                    {t("all_services")}
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="service-arrow">
                                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        )}

                        <style>{`
                            .services-header {
                                display: flex;
                                align-items: flex-end;
                                justify-content: space-between;
                                gap: 2rem;
                                margin-bottom: 4rem;
                            }

                            .services-header-col {
                                flex: 1;
                            }

                            .services-header-col-desc {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                gap: 1rem;
                                max-width: 420px;
                            }

                            .service-eyebrow {
                                color: #8a7a5a;
                                font-size: 0.75rem;
                                font-weight: 600;
                                letter-spacing: 0.2em;
                                text-transform: uppercase;
                                margin-bottom: 1rem;
                                display: flex;
                                align-items: center;
                                gap: 0.75rem;
                            }

                            .service-eyebrow::before {
                                content: "";
                                display: block;
                                width: 2rem;
                                height: 1px;
                                background-color: #8a7a5a;
                            }

                            [dir=rtl] .service-eyebrow {
                                letter-spacing: 0;
                            }

                            .service-section-heading {
                                font-size: clamp(2rem, 4vw, 3rem);
                                font-family: var(--font-serif, Georgia, serif);
                                color: #2e2b26;
                                line-height: 1.2;
                                font-weight: 400;
                                margin: 0;
                            }

                            .service-section-heading strong {
                                font-family: var(--font-serif, Georgia, serif);
                                font-weight: 400;
                                font-style: italic;
                                color: #8a7a5a;
                            }

                            [dir=rtl] .service-section-heading {
                                text-align: right;
                            }

                            .service-section-desc {
                                font-size: 1rem;
                                color: #4a4540;
                                line-height: 1.7;
                                margin: 0;
                            }

                            [dir=rtl] .service-section-desc {
                                text-align: right;
                            }

                            [dir=rtl] .services-header-col-desc {
                                align-items: flex-end;
                            }

                            .service-all-link {
                                color: #4a4540;
                                font-size: 0.75rem;
                                font-weight: 600;
                                letter-spacing: 0.15em;
                                text-transform: uppercase;
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 0.5rem;
                                padding-bottom: 0.25rem;
                                border-bottom: 1px solid rgba(74,69,64,0.3);
                                transition: color 0.2s, border-color 0.2s;
                            }

                            .service-all-link:hover {
                                color: #8a7a5a;
                                border-bottom-color: rgba(138,122,90,0.3);
                            }

                            [dir=rtl] .service-all-link {
                                letter-spacing: 0;
                            }

                            .service-arrow {
                                transition: transform 0.2s ease;
                            }

                            [dir=rtl] .service-arrow {
                                transform: scaleX(-1);
                            }

                            .service-all-link:hover .service-arrow {
                                transform: translateX(3px);
                            }

                            [dir=rtl] .service-all-link:hover .service-arrow {
                                transform: scaleX(-1) translateX(-3px);
                            }

                            .services-grid {
                                display: grid;
                                grid-template-columns: 1fr;
                                gap: 1px;
                                border-radius: 0.5rem;
                                overflow: hidden;
                                background-color: rgba(74,69,64,0.15);
                                border: 1px solid rgba(74,69,64,0.1);
                            }

                            @media (min-width: 768px) {
                                .services-grid {
                                    grid-template-columns: repeat(2, 1fr);
                                }
                            }

                            @media (min-width: 1024px) {
                                .services-grid {
                                    grid-template-columns: repeat(3, 1fr);
                                }
                            }

                            .service-card {
                                background-color: #4a4540;
                                padding: 2rem;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                min-height: 320px;
                                transition: background-color 0.3s ease;
                            }

                            @media (min-width: 768px) {
                                .service-card {
                                    padding: 2.5rem;
                                }
                            }

                            .service-card:hover {
                                background-color: #5c5850;
                            }

                            .service-card ::selection {
                                background: rgba(240, 237, 230, 0.3);
                                color: #f0ede6;
                            }

                            [dir=rtl] .service-card {
                                text-align: right;
                            }

                            .services-footer {
                                display: flex;
                                justify-content: center;
                                margin-top: 3rem;
                            }

                            .services-view-all-btn {
                                display: inline-flex;
                                align-items: center;
                                gap: 0.75rem;
                                padding: 1rem 2.5rem;
                                background-color: #3d3a34;
                                color: #f0ede6;
                                font-size: 0.85rem;
                                font-weight: 600;
                                letter-spacing: 0.12em;
                                text-transform: uppercase;
                                text-decoration: none;
                                border-radius: 0.375rem;
                                border: none;
                                cursor: pointer;
                                transition: background-color 0.2s ease, transform 0.2s ease;
                                box-shadow: 0 4px 14px rgba(74,69,64,0.15);
                            }

                            .services-view-all-btn:hover {
                                background-color: #4a4540;
                                transform: translateY(-2px);
                            }

                            [dir=rtl] .services-view-all-btn {
                                letter-spacing: 0;
                            }

                            .service-number {
                                font-size: 0.875rem;
                                font-family: var(--font-mono, monospace);
                                color: rgba(240,237,230,0.4);
                                font-weight: 600;
                                letter-spacing: 0.05em;
                            }

                            .service-title {
                                font-size: 1.25rem;
                                color: #f0ede6;
                                margin-top: 1.5rem;
                                margin-bottom: 1rem;
                                font-weight: 600;
                                line-height: 1.3;
                            }

                            .service-desc {
                                font-size: 0.875rem;
                                color: rgba(240,237,230,0.7);
                                line-height: 1.6;
                                margin-top: 0.75rem;
                            }

                            .service-link {
                                margin-top: 2rem;
                                opacity: 0.7;
                                transition: opacity 0.3s ease;
                            }

                            .service-card:hover .service-link {
                                opacity: 1;
                            }

                            .service-link-a {
                                color: #f0ede6;
                                text-decoration: none;
                                font-size: 0.875rem;
                                font-weight: 500;
                                display: inline-flex;
                                align-items: center;
                                gap: 0.375rem;
                                padding-bottom: 0.25rem;
                                border-bottom: 1px solid rgba(240,237,230,0.2);
                                transition: color 0.2s ease;
                            }

                            .service-link-a:hover {
                                color: #C6A66B;
                            }

                            [dir=rtl] .service-link-a:hover .service-arrow {
                                transform: scaleX(-1) translateX(-3px);
                            }
                        `}</style>
                    </>
                )}
            </div>
        </section>
    );
}

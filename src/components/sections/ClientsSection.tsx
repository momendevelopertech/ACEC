"use client";

import { useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

interface Client {
  id: number;
  name_ar: string;
  name_en: string;
  logo: string;
  website: string;
  order: number;
  is_active: string;
}

export function ClientsSection() {
    const locale = useLocale();
    const isArabic = locale === "ar";
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            try {
                const res = await fetch(`${API_BASE}/api/v1/clients`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.success && json.data) {
                        setClients(json.data);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch clients:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, []);

    const displayClients = clients.map((c: Client) => ({ 
        name: isArabic ? c.name_ar : c.name_en, 
        logo: c.logo ? `${API_BASE}/storage/${c.logo}` : "/images/client-logo.svg",
        website: c.website
    }));

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    if (loading) {
        return (
            <section className="py-24 px-6 bg-[linear-gradient(180deg,transparent_0%,rgba(var(--color-accent-rgb),0.02)_100%)] border-t border-border-default min-h-[500px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

    if (clients.length === 0) {
        return (
            <section className="py-24 px-6 bg-[linear-gradient(180deg,transparent_0%,rgba(var(--color-accent-rgb),0.02)_100%)] border-t border-border-default">
                <div className="container-custom text-center">
                    <div className="section-label justify-center mb-4">
                        {isArabic ? "عملاؤنا" : "Our Clients"}
                    </div>
                    <p className="text-text-muted mt-8">
                        {isArabic ? "لا يوجد عملاء مضافين في قاعدة البيانات حالياً." : "No clients added in the database yet."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-6 bg-[linear-gradient(180deg,transparent_0%,rgba(var(--color-accent-rgb),0.02)_100%)] border-t border-border-default">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="section-label justify-center mb-4">
                        {isArabic ? "عملاؤنا" : "Our Clients"}
                    </div>
                    <h2 className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold text-text-primary mb-4">
                        {isArabic ? (
                            <>
                                عملاؤنا{" "}
                                <span className="text-accent">بفخر</span>
                            </>
                        ) : (
                            <>
                                {" "}
                                Our <span className="text-accent">Clients</span>
                            </>
                        )}
                    </h2>
                    <p className="text-[1.0625rem] text-text-muted max-w-[600px] mx-auto leading-[1.6]">
                        {isArabic
                            ? "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة العربية السعودية"
                            : "We are proud to partner with leading companies and organizations in Saudi Arabia"}
                    </p>
                </motion.div>

                {/* Infinite Marquee */}
                <div className="relative w-full overflow-hidden flex items-center py-8 group" dir="ltr">
                    <div className="marquee-content flex flex-nowrap gap-4 md:gap-8 min-w-max">
                        {/* Render the clients multiple times to ensure seamless scrolling */}
                        {[...displayClients, ...displayClients, ...displayClients].map((client, idx) => {
                            const CardWrapper = client.website ? "a" : "div";
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className="relative flex flex-col items-center justify-center p-4 md:p-8 rounded-2xl bg-surface border border-border-default transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer w-[160px] md:w-[220px] h-[100px] md:h-[140px] hover:border-accent hover:bg-surface-hover shrink-0"
                                >
                                    <CardWrapper
                                        href={client.website || undefined}
                                        target={client.website ? "_blank" : undefined}
                                        rel={client.website ? "noopener noreferrer" : undefined}
                                        className="absolute inset-0 w-full h-full z-10 block"
                                    />

                                    {/* Client Logo/Name */}
                                    <div className="relative z-[5] text-center flex flex-col items-center gap-4 w-full">
                                        <div className="w-full h-[40px] md:h-[50px] relative flex items-center justify-center mix-blend-luminosity opacity-60 transition-all duration-300 group-hover:mix-blend-normal group-hover:opacity-100">
                                            <Image
                                                src={client.logo}
                                                alt={client.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 150px, 200px"
                                            />
                                        </div>
                                        <span className="text-[0.7rem] md:text-sm font-semibold text-text-muted transition-colors duration-300 group-hover:text-accent whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                            {client.name}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 pt-12 border-t border-border-default"
                >
                    <p className="text-base text-text-muted mb-6">
                        {isArabic
                            ? "هل تريد أن تكون من عملائنا المميزين؟"
                            : "Want to become one of our valued clients?"}
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link 
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 py-3.5 px-10 bg-[linear-gradient(135deg,var(--color-accent)_0%,rgba(var(--color-accent-rgb),0.8)_100%)] border-none rounded-lg text-text-on-accent font-semibold text-base cursor-pointer no-underline shadow-[0_4px_15px_rgba(var(--color-accent-rgb),0.3)] transition-all duration-300"
                        >
                            {isArabic ? "احجز استشارة" : "Book Consultation"}
                            <span>{isArabic ? "←" : "→"}</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-33.33% - 1.5rem)); }
                }
                .marquee-content {
                    animation: scroll 30s linear infinite;
                }
                .group:hover .marquee-content {
                    animation-play-state: paused;
                }
                /* Fade edges for the marquee */
                .relative.w-full.overflow-hidden::before,
                .relative.w-full.overflow-hidden::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 100px;
                    z-index: 10;
                    pointer-events: none;
                }
                .relative.w-full.overflow-hidden::before {
                    left: 0;
                    background: linear-gradient(to right, var(--color-background) 0%, transparent 100%);
                }
                .relative.w-full.overflow-hidden::after {
                    right: 0;
                    background: linear-gradient(to left, var(--color-background) 0%, transparent 100%);
                }
            `}</style>
        </section>
    );
}

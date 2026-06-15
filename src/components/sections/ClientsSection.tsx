"use client";

import { useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

interface Client {
  id: number;
  name_ar: string;
  name_en: string;
  logo: string;
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
            <section className="py-24 px-6 min-h-[500px] flex items-center justify-center" style={{ background: "#f0ede6" }}>
                <div className="w-8 h-8 border-4 border-[#C6A66B] border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

    if (clients.length === 0) {
        return (
            <section className="py-24 px-6" style={{ background: "#f0ede6" }}>
                <div className="container-custom text-center">
                    <div className="section-label justify-center mb-4" style={{ color: "#C6A66B" }}>
                        {isArabic ? "عملاؤنا" : "Our Clients"}
                    </div>
                    <p className="mt-8" style={{ color: "#8a8278" }}>
                        {isArabic ? "لا يوجد عملاء مضافين في قاعدة البيانات حالياً." : "No clients added in the database yet."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-6" style={{ background: "#f0ede6" }}>
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="section-label justify-center mb-4" style={{ color: "#C6A66B" }}>
                        {isArabic ? "عملاؤنا" : "Our Clients"}
                    </div>
                    <h2 className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold mb-4" style={{ color: "#4a4540" }}>
                        {isArabic ? (
                            <>
                                عملاؤنا{" "}
                                <span style={{ color: "#C6A66B" }}>بفخر</span>
                            </>
                        ) : (
                            <>
                                {" "}
                                Our <span style={{ color: "#C6A66B" }}>Clients</span>
                            </>
                        )}
                    </h2>
                    <p className="text-[1.0625rem] max-w-[600px] mx-auto leading-[1.6]" style={{ color: "#8a8278" }}>
                        {isArabic
                            ? "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة العربية السعودية"
                            : "We are proud to partner with leading companies and organizations in Saudi Arabia"}
                    </p>
                </motion.div>

                {/* Infinite Marquee */}
                <div className="relative w-full overflow-hidden flex items-center py-8 group" dir="ltr">
                    <div className="marquee-content flex flex-nowrap gap-4 md:gap-8 min-w-max">
                        {[...displayClients, ...displayClients, ...displayClients].map((client, idx) => {
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className="relative flex flex-col items-center justify-center p-4 md:p-8 rounded-2xl w-[160px] md:w-[220px] h-[100px] md:h-[140px] shrink-0"
                                    style={{ background: "#FFFFFF", border: "1px solid rgba(200,195,185,0.4)", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#C6A66B";
                                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                                        const wrapper = e.currentTarget.querySelector('.client-img-wrapper') as HTMLElement;
                                        if (wrapper) { wrapper.style.opacity = '1'; wrapper.style.filter = 'grayscale(0)'; }
                                        const span = e.currentTarget.querySelector('.client-name') as HTMLElement;
                                        if (span) { span.style.color = '#C6A66B'; }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(200,195,185,0.4)";
                                        e.currentTarget.style.boxShadow = "none";
                                        const wrapper = e.currentTarget.querySelector('.client-img-wrapper') as HTMLElement;
                                        if (wrapper) { wrapper.style.opacity = '0.75'; wrapper.style.filter = 'grayscale(1)'; }
                                        const span = e.currentTarget.querySelector('.client-name') as HTMLElement;
                                        if (span) { span.style.color = '#8a8278'; }
                                    }}
                                >
                                    <div className="relative z-[5] text-center flex flex-col items-center gap-4 w-full">
                                        <div className="client-img-wrapper w-full h-[40px] md:h-[50px] relative flex items-center justify-center" style={{ opacity: 0.75, filter: "grayscale(1)", transition: "all 0.3s" }}>
                                            <Image
                                                src={client.logo}
                                                alt={client.name}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 150px, 200px"
                                            />
                                        </div>
                                        <span className="client-name text-[0.7rem] md:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full" style={{ color: "#8a8278", transition: "color 0.3s" }}>
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
                    className="text-center mt-16 pt-12"
                    style={{ borderTop: "1px solid rgba(200,195,185,0.4)" }}
                >
                    <p className="text-base mb-6" style={{ color: "#8a8278" }}>
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
                            className="inline-flex items-center gap-3 py-3.5 px-10 border-none rounded-lg font-semibold text-base cursor-pointer no-underline transition-all duration-300"
                            style={{ background: "linear-gradient(135deg, #C6A66B 0%, rgba(198,166,107,0.8) 100%)", color: "#FFFFFF", boxShadow: "0 4px 15px rgba(198,166,107,0.3)" }}
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
                    background: linear-gradient(to right, #f0ede6 0%, transparent 100%);
                }
                .relative.w-full.overflow-hidden::after {
                    right: 0;
                    background: linear-gradient(to left, #f0ede6 0%, transparent 100%);
                }
            `}</style>
        </section>
    );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Logo } from "./Logo";
import { motion } from "framer-motion";

export function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");
    const services = useTranslations("services");
    const locale = useLocale();

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: `/${locale}/services`, label: nav("services") },
        { href: `/${locale}/projects`, label: nav("projects") },
        { href: `/${locale}/about`, label: nav("about") },
        { href: `/${locale}/team`, label: nav("team") },
        { href: `/${locale}/clients`, label: nav("clients") },
    ];

    const serviceLinks = [
        { href: `/${locale}/services/design`, label: services("items.design.title") },
        { href: `/${locale}/services/interior`, label: services("items.interior.title") },
        { href: `/${locale}/services/supervision`, label: services("items.supervision.title") },
        { href: `/${locale}/services/fire-protection`, label: services("items.fire.title") },
        { href: `/${locale}/services/land-surveying`, label: services("items.surveying.title") },
        { href: `/${locale}/services/consulting`, label: services("items.consulting.title") },
    ];

    const contactDetails = [
        {
            title: t("address_title"),
            value: t("address_value"),
            href: null,
        },
        {
            title: t("phone_title"),
            value: "+966 500 037 049",
            href: "tel:+966500037049",
        },
        {
            title: t("whatsapp_title"),
            value: "+966 500 037 049",
            href: "https://wa.me/966500037049",
        },
        {
            title: t("email_title"),
            value: "info@ac-ec.com.sa",
            href: "mailto:info@ac-ec.com.sa",
        },
    ];

    const socialLinks = [
        {
            name: "WhatsApp",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.046 21.677c-1.745 0-3.455-.467-4.953-1.35l-.354-.212-3.712 1.003 1.077-3.282-.232-.371C2.406 14.502 1.5 12.5 1.5 10.396 1.5 5.805 5.372 2 10.046 2c2.688 0 5.215 1.046 7.105 2.943C19.04 6.94 20 9.34 20 11.863c0 4.592-3.872 8.814-7.954 9.814zm8.454-18.414C18.068.954 14.568 0 10.046 0 4.588 0 .5 4.03.5 10.396c0 2.212.738 4.291 2.167 6.025l-1.42 4.318 4.511-1.215c1.427.741 3.02 1.132 4.653 1.132 5.458 0 10.046-3.03 10.046-8.814 0-2.35-.918-4.555-2.589-6.224z"/>
                </svg>
            ),
            href: "https://wa.me/966500037049",
        },
        {
            name: "Email",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            ),
            href: "mailto:info@ac-ec.com.sa",
        },
        {
            name: "Phone",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
            ),
            href: "tel:+966500037049",
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#e8e4dc] pt-20 pb-8 px-6 border-t border-[#ddd8d0]">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-12 mb-16">
                    {/* Column 1: Logo + Description + Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-5">
                            <Logo size="md" href={`/${locale}`} />
                        </div>
                        <p className="text-[#4a4540]/70 text-[0.9rem] leading-[1.8] mb-6">
                            {t("description")}
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    title={social.name}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-[40px] h-[40px] rounded-full bg-[rgba(198,166,107,0.12)] border border-[rgba(198,166,107,0.2)] flex items-center justify-center text-[#4a4540]/60 no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[rgba(198,166,107,0.2)] hover:border-[#C6A66B] hover:text-[#C6A66B]"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Navigate */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-[#C6A66B] text-xs font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
                            <span className="w-5 h-px bg-[#C6A66B]" />
                            {t("quickLinks")}
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {quickLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-[#4a4540]/70 no-underline text-[0.875rem] transition-colors duration-200 inline-flex items-center gap-2 hover:text-[#C6A66B] group"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Column 3: Get in Touch */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-[#C6A66B] text-xs font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
                            <span className="w-5 h-px bg-[#C6A66B]" />
                            {t("contactInfo")}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {contactDetails.map((item) => (
                                <div key={item.title} className="flex flex-col gap-0.5">
                                    <div className="text-[0.6rem] text-[#C6A66B] font-semibold tracking-[0.1em] uppercase">
                                        {item.title}
                                    </div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-[#4a4540] no-underline text-[0.875rem] transition-colors duration-200 leading-[1.5] hover:text-[#C6A66B]"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-[#4a4540] text-[0.875rem] leading-[1.5]">
                                            {item.value}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-[#ddd8d0] my-12 origin-center"
                />

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-between flex-wrap gap-4 pb-4"
                >
                    <p className="text-[#4a4540]/60 text-[0.8125rem] m-0">
                        © {currentYear} {t("company")} — {t("rights")}
                    </p>
                    <p className="text-[#4a4540]/60 text-[0.8125rem] m-0">
                        {t("crafted")}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

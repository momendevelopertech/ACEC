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
    const isArabic = locale === "ar";

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: `/${locale}/services`, label: nav("services") },
        { href: `/${locale}/projects`, label: nav("projects") },
        { href: `/${locale}/about`, label: nav("about") },
        { href: `/${locale}/team`, label: nav("team") },
        { href: `/${locale}/clients`, label: nav("clients") },
    ];

    const serviceLinks = [
        { href: `/${locale}/services`, label: services("items.consulting.title") },
        { href: `/${locale}/services`, label: services("items.safety.title") },
        { href: `/${locale}/services`, label: services("items.supervision.title") },
        { href: `/${locale}/services`, label: services("items.interior.title") },
        { href: `/${locale}/services`, label: services("items.factory.title") },
    ];

    const contactDetails = [
        {
            icon: "📍",
            title: isArabic ? "العنوان" : "Address",
            value: isArabic
                ? "شارع عمر بن عبدالعزيز، ح الزهراء، الرياض"
                : "Omar Bin Abdulaziz St, Al Zahraa, Riyadh, KSA",
            href: null,
        },
        {
            icon: "📞",
            title: isArabic ? "الهاتف" : "Phone",
            value: "+966 500 037 049",
            href: "tel:+966500037049",
        },
        {
            icon: "💬",
            title: "WhatsApp",
            value: "+966 500 037 049",
            href: "https://wa.me/966500037049",
        },
        {
            icon: "📧",
            title: isArabic ? "البريد الإلكتروني" : "Email",
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
            hoverClass: "hover:bg-[#25D366]/20 hover:border-[#25D366] hover:text-[#25D366]",
        },
        {
            name: "Email",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            ),
            href: "mailto:info@ac-ec.com.sa",
            hoverClass: "hover:bg-accent/20 hover:border-accent hover:text-accent",
        },
        {
            name: "Phone",
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
            ),
            href: "tel:+966500037049",
            hoverClass: "hover:bg-accent/20 hover:border-accent hover:text-accent",
        },
    ];

    return (
        <footer className="relative overflow-hidden pt-20 pb-8 px-6 border-t border-border-default bg-gradient-to-b from-surface to-background/95">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(var(--color-accent-rgb),0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(var(--color-accent-rgb),0.03)_0%,transparent_50%)]" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 mb-16">
                    {/* Column 1: Logo + Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-5">
                            <Logo size="md" href={`/${locale}`} />
                        </div>
                        <p className="text-text-muted text-[0.9rem] leading-[1.8] mb-6">
                            {t("description")}
                        </p>

                        {/* Social links with animations */}
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
                                    className={`w-[42px] h-[42px] rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-text-muted no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${social.hoverClass}`}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
                            <span className="w-5 h-px bg-accent" />
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
                                        className="text-text-muted no-underline text-[0.9rem] transition-colors duration-200 inline-flex items-center gap-2 hover:text-text-primary group"
                                    >
                                        <span className="opacity-0 transition-opacity duration-200 text-[0.7rem] group-hover:opacity-100">
                                            {isArabic ? "←" : "→"}
                                        </span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Column 3: Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
                            <span className="w-5 h-px bg-accent" />
                            {services("title")}
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {serviceLinks.map((link, index) => (
                                <motion.div
                                    key={link.href + index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-text-muted no-underline text-[0.9rem] transition-colors duration-200 inline-flex items-center gap-2 hover:text-text-primary group"
                                    >
                                        <span className="opacity-0 transition-opacity duration-200 text-[0.7rem] group-hover:opacity-100">
                                            {isArabic ? "←" : "→"}
                                        </span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Column 4: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
                            <span className="w-5 h-px bg-accent" />
                            {t("contactInfo")}
                        </h3>
                        <div className="flex flex-col gap-5">
                            {contactDetails.map((item) => (
                                <div key={item.title} className="flex gap-3.5 items-start">
                                    <span className="text-[1.1rem] shrink-0 inline-flex mt-0.5">
                                        {item.icon}
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-[0.7rem] text-accent font-semibold tracking-[0.1em] uppercase mb-1">
                                            {item.title}
                                        </div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-text-primary no-underline text-[0.875rem] transition-colors duration-200 inline-block leading-[1.5] hover:text-accent"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-text-primary text-[0.875rem] block leading-[1.5]">
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
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
                    className="border-t border-border-default my-12 origin-center"
                />

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-between flex-wrap gap-4 pb-4"
                >
                    <p className="text-text-muted text-[0.8125rem] m-0">
                        © {currentYear} {t("company")} — {t("rights")}
                    </p>
                    <p className="text-text-muted text-[0.8125rem] m-0">
                        {isArabic ? "تصميم وتطوير" : "Designed & Developed"}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

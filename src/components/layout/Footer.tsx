"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");
    const locale = useLocale();
    const isArabic = locale === "ar";

    const currentYear = new Date().getFullYear();

    const navLinks = [
        { href: `/${locale}/services`, label: nav("services") },
        { href: `/${locale}/projects`, label: nav("projects") },
        { href: `/${locale}/about`, label: nav("about") },
        { href: `/${locale}/contact`, label: nav("contact") },
    ];

    const contactDetails = [
        {
            icon: "📍",
            title: isArabic ? "العنوان" : "Address",
            value: isArabic
                ? "شارع عمر بن عبدالعزيز، ح الزهراء، الرياض، المملكة العربية السعودية"
                : "Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia",
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
        {
            icon: "🕐",
            title: isArabic ? "ساعات العمل" : "Working Hours",
            value: isArabic
                ? "الأحد إلى الخميس، 9:00 ص - 6:00 م"
                : "Sunday to Thursday, 9:00 AM - 6:00 PM",
            href: null,
        },
    ];

    return (
        <footer
            style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                padding: "5rem 1.5rem 3rem",
            }}
        >
            <div className="container-custom">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1fr 2fr",
                        gap: "4rem",
                        marginBottom: "4rem",
                    }}
                    className="footer-grid"
                >
                    {/* Brand Section */}
                    <div>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <Logo size="md" href={`/${locale}`} />
                        </div>
                        <p
                            style={{
                                color: "var(--color-muted)",
                                fontSize: "0.875rem",
                                lineHeight: 1.8,
                                marginBottom: "1.5rem",
                            }}
                        >
                            {isArabic
                                ? "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة"
                                : "Arab Charter Engineering Consultancy & Safety Engineering"}
                        </p>

                        {/* Social links */}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                            {[
                                {
                                    name: "WhatsApp",
                                    icon: "W",
                                    href: "https://wa.me/966500037049",
                                    color: "#25D366",
                                },
                                { name: "phone", icon: "☎", href: "tel:+966500037049" },
                                {
                                    name: "email",
                                    icon: "✉",
                                    href: "mailto:info@ac-ec.com.sa",
                                },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    title={social.name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: "rgba(201, 168, 76, 0.08)",
                                        border: "1px solid rgba(201, 168, 76, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--color-muted)",
                                        textDecoration: "none",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                    }}
                                    className="social-btn"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(201, 168, 76, 0.18)";
                                        e.currentTarget.style.borderColor = "var(--color-gold)";
                                        e.currentTarget.style.color = "var(--color-gold)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(201, 168, 76, 0.08)";
                                        e.currentTarget.style.borderColor =
                                            "rgba(201, 168, 76, 0.15)";
                                        e.currentTarget.style.color = "var(--color-muted)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            style={{
                                color: "var(--color-gold)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {isArabic ? "الروابط السريعة" : "Quick Links"}
                        </h3>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        color: "var(--color-muted)",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "var(--color-white)";
                                        e.currentTarget.style.paddingInlineStart = "4px";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "var(--color-muted)";
                                        e.currentTarget.style.paddingInlineStart = "0";
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3
                            style={{
                                color: "var(--color-gold)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {isArabic ? "معلومات التواصل" : "Contact Info"}
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            {contactDetails.map((item) => (
                                <div
                                    key={item.title}
                                    style={{
                                        display: "flex",
                                        gap: "0.875rem",
                                        alignItems: isArabic ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "1rem",
                                            flexShrink: 0,
                                            display: "inline-flex",
                                        }}
                                    >
                                        {item.icon}
                                    </span>
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                fontSize: "0.7rem",
                                                color: "var(--color-gold)",
                                                fontWeight: 600,
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                marginBottom: "0.25rem",
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                style={{
                                                    color: "var(--color-white)",
                                                    textDecoration: "none",
                                                    fontSize: "0.875rem",
                                                    transition: "color 0.2s",
                                                    display: "inline-block",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color =
                                                        "var(--color-gold)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color =
                                                        "var(--color-white)";
                                                }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "var(--color-white)",
                                                    fontSize: "0.875rem",
                                                    display: "block",
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid var(--color-border)", margin: "3rem 0" }} />

                {/* Bottom bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem" }}>
                        © {currentYear} ACEC —{" "}
                        {isArabic
                            ? "جميع الحقوق محفوظة"
                            : "All rights reserved"}
                    </p>
                    <p style={{ color: "var(--color-muted)", fontSize: "0.8125rem" }}>
                        {isArabic ? "تصميم وتطوير متقدم" : "Advanced Design & Development"}
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </footer>
    );
}

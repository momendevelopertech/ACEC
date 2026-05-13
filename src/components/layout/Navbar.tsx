"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";

export function Navbar() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const isRTL = locale === "ar";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            if (top) {
                window.scrollTo(0, parseInt(top || "0", 10) * -1);
            }
        }
        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const switchLocale = () => {
        const newLocale = locale === "ar" ? "en" : "ar";
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/") || `/${newLocale}`);
    };

    // High priority links - shown in main nav
    const mainNavLinks = [
        { href: `/${locale}/services`, label: t("services") },
        { href: `/${locale}/projects`, label: t("projects") },
        { href: `/${locale}/about`, label: t("about") },
        { href: `/${locale}/team`, label: t("team") },
        { href: `/${locale}/clients`, label: t("clients") },
    ];

    // Secondary links - shown in mobile menu or footer
    const secondaryNavLinks = [
        { href: `/${locale}/blog`, label: t("blog") },
        { href: `/${locale}/certifications`, label: t("certifications") },
        { href: `/${locale}/career`, label: t("career") },
        { href: `/${locale}/contact`, label: t("contact") },
    ];

    const allNavItems = [
        { href: `/${locale}/services`, label: t("services"), icon: "⚙️" },
        { href: `/${locale}/projects`, label: t("projects"), icon: "🏗️" },
        { href: `/${locale}/about`, label: t("about"), icon: "🏛️" },
        { href: `/${locale}/team`, label: t("team"), icon: "👥" },
        { href: `/${locale}/clients`, label: t("clients"), icon: "🤝" },
        { href: `/${locale}/blog`, label: t("blog"), icon: "📝" },
        { href: `/${locale}/certifications`, label: t("certifications"), icon: "🏅" },
        { href: `/${locale}/career`, label: t("career"), icon: "💼" },
        { href: `/${locale}/contact`, label: t("contact"), icon: "📞" },
    ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                padding: scrolled ? "0.75rem 1rem" : "1rem 1rem",
                background: "var(--color-header-bg)",
                backdropFilter: scrolled ? "blur(24px)" : "none",
                borderBottom: scrolled
                    ? "1px solid var(--color-border-gold)"
                    : "none",
            }}
        >
            <div
                className="container-custom"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.85rem",
                    flexWrap: "nowrap",
                    minHeight: isMobile ? "3.6rem" : "auto",
                    width: "100%",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                    <Logo size={isMobile ? "sm" : "md"} href={`/${locale}`} />
                </div>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        position: "relative",
                    }}
                    className="hidden-mobile"
                >
                    {mainNavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: "var(--color-text)",
                                textDecoration: "none",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                padding: "0.5rem 1rem",
                                borderRadius: "9999px",
                                transition: "all 0.2s",
                                letterSpacing: isRTL ? "0" : "0.01em",
                            }}
                            className="nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {/* More dropdown for secondary links */}
                    <div style={{ position: "relative" }} className="more-dropdown hidden-mobile">
                        <button
                            onClick={() => setMoreOpen(!moreOpen)}
                            style={{
                                background: "var(--color-gold-dim)",
                                border: "1px solid var(--color-border-gold)",
                                borderRadius: "9999px",
                                color: "var(--color-text)",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                            aria-haspopup="true"
                            aria-expanded={moreOpen}
                        >
                            {t("more")}
                        </button>
                        {moreOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        [isRTL ? "right" : "left"]: 0,
                                    background: "var(--color-bg)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "0.5rem",
                                    padding: "0.5rem",
                                    marginTop: "0.25rem",
                                    zIndex: 20,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }}
                            >
                                {secondaryNavLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            display: "block",
                                            color: "var(--color-text)",
                                            textDecoration: "none",
                                            padding: "0.25rem 0.5rem",
                                            fontSize: "0.9rem",
                                        }}
                                        className="nav-link"
                                        onClick={() => setMoreOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right side actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "nowrap", justifyContent: "flex-end", minWidth: 0 }}>
                    {/* Language switcher */}
                    <button
                        onClick={switchLocale}
                        style={{
                            background: "var(--color-gold-dim)",
                            border: "1px solid var(--color-border-gold)",
                            borderRadius: "9999px",
                            color: "var(--color-gold)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            padding: "0.45rem 1rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {locale === "ar" ? "EN" : "عربي"}
                    </button>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="magnetic-btn magnetic-btn-primary hidden-mobile"
                        style={{ fontSize: "0.875rem", padding: "0.625rem 1.4rem" }}
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "var(--color-gold-dim)",
                            border: "1px solid var(--color-border-gold)",
                            borderRadius: "999px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            padding: "0.75rem 0.85rem",
                            minWidth: "3.5rem",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className="show-mobile"
                        aria-label={menuOpen ? (locale === "ar" ? "إغلاق" : "Close") : (locale === "ar" ? "افتح" : "Open")}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: "22px",
                                    height: "2px",
                                    background: "var(--color-gold)",
                                    borderRadius: "2px",
                                    transition: "all 0.3s",
                                    transform:
                                        menuOpen && i === 0
                                            ? "translateY(6px) rotate(45deg)"
                                            : menuOpen && i === 2
                                                ? "translateY(-6px) rotate(-45deg)"
                                                : menuOpen && i === 1
                                                    ? "scaleX(0)"
                                                    : "none",
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 65,
                        backgroundColor: "var(--color-bg)",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem 1.5rem",
                            borderBottom: "1px solid var(--color-border)",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "var(--color-bg)",
                            zIndex: 1,
                        }}
                    >
                        <span style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1.125rem" }}>
                            ACEC
                        </span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                borderRadius: "50%",
                                border: "1px solid var(--color-border)",
                                backgroundColor: "var(--color-surface)",
                                color: "var(--color-text)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "1.25rem",
                                flexShrink: 0,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <nav style={{ flex: 1, padding: "0.5rem 0" }}>
                        {allNavItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "1rem 1.5rem",
                                    borderBottom: "1px solid var(--color-border)",
                                    color: "var(--color-text)",
                                    textDecoration: "none",
                                    fontSize: "1.125rem",
                                    fontWeight: 500,
                                    transition: "background-color 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                                }}
                            >
                                <span
                                    style={{
                                        width: "2.25rem",
                                        height: "2.25rem",
                                        borderRadius: "0.5rem",
                                        backgroundColor: "var(--color-gold-dim)",
                                        border: "1px solid var(--color-border-gold)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                                <span
                                    style={{
                                        marginInlineStart: "auto",
                                        color: "var(--color-text-muted, var(--color-text))",
                                        fontSize: "0.875rem",
                                        opacity: 0.5,
                                    }}
                                >
                                    {isRTL ? "←" : "→"}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div
                        style={{
                            padding: "1.5rem",
                            borderTop: "1px solid var(--color-border)",
                            backgroundColor: "var(--color-bg)",
                            position: "sticky",
                            bottom: 0,
                        }}
                    >
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "0.875rem",
                                backgroundColor: "var(--color-gold)",
                                color: "var(--color-accent-text)",
                                borderRadius: "9999px",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "1rem",
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                        >
                            {t("consultation")}
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .nav-link:hover {
          color: var(--color-text) !important;
          background: var(--color-gold-dim);
        }
      `}</style>
        </header>
    );
}

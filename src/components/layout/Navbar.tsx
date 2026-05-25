"use client";

import { useState, useEffect, useRef } from "react";
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
    const [moreOpen, setMoreOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isRTL = locale === "ar";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMoreOpen(false);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMoreOpen(false);
        };
        const handleScroll = () => {
            if (moreOpen) setMoreOpen(false);
        };

        if (moreOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            window.addEventListener("scroll", handleScroll, { passive: true });
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [moreOpen]);

    const mainNavLinks = [
        { href: `/${locale}/services`, label: t("services") },
        { href: `/${locale}/projects`, label: t("projects") },
        { href: `/${locale}/about`, label: t("about") },
        { href: `/${locale}/team`, label: t("team") },
        { href: `/${locale}/clients`, label: t("clients") },
    ];

    const secondaryNavLinks = [
        { href: `/${locale}/blog`, label: t("blog") },
        { href: `/${locale}/profile`, label: t("profile") },
        { href: `/${locale}/certifications`, label: t("certifications") },
        { href: `/${locale}/career`, label: t("career") },
        { href: `/${locale}/contact`, label: t("contact") },
    ];

    const allNavItems = [
        { href: `/${locale}/services`, label: t("services") },
        { href: `/${locale}/projects`, label: t("projects") },
        { href: `/${locale}/about`, label: t("about") },
        { href: `/${locale}/team`, label: t("team") },
        { href: `/${locale}/clients`, label: t("clients") },
        { href: `/${locale}/blog`, label: t("blog") },
        { href: `/${locale}/certifications`, label: t("certifications") },
        { href: `/${locale}/profile`, label: t("profile") },
        { href: `/${locale}/career`, label: t("career") },
        { href: `/${locale}/contact`, label: t("contact") },
    ];

    const isActive = (href: string) => {
        const pathSegments = pathname.split("/").filter(Boolean);
        const hrefSegments = href.split("/").filter(Boolean);
        if (hrefSegments.length < 2) return false;
        const pageSlug = hrefSegments[1];
        return pathSegments[1] === pageSlug;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#474A4D] ${
                scrolled ? "py-2 px-4 backdrop-blur-2xl border-b border-[rgba(198,166,107,0.2)]" : "py-3 px-4 backdrop-blur-none border-transparent"
            }`}
        >
            <div dir="ltr" className="container-custom flex items-center justify-between gap-3 flex-nowrap min-h-[3.4rem] md:min-h-auto w-full">
                {/* Logo */}
                <div className="flex items-center min-w-0">
                    <Logo size="md" href={`/${locale}`} className="navbar-logo" />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-nowrap relative min-w-0 flex-1 justify-center">
                    {mainNavLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`no-underline text-[0.9rem] xl:text-[0.925rem] font-medium py-2 px-3 xl:px-3.5 rounded-lg transition-all duration-200 tracking-[0.01em] whitespace-nowrap ${
                                    active
                                        ? "text-[#D4B06A] bg-white/[0.07]"
                                        : "text-[#F5F1E8] hover:text-[#C6A66B] hover:bg-white/[0.06]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {/* More dropdown for secondary links */}
                    <div className="relative hidden lg:block" ref={dropdownRef}>
                        <button
                            onClick={() => setMoreOpen(!moreOpen)}
                            className="border border-[#F5F1E8]/40 rounded-lg text-[#F5F1E8] text-[0.9rem] font-medium py-2 px-3.5 cursor-pointer transition-all duration-200 bg-transparent hover:bg-white/[0.06] hover:text-[#C6A66B] hover:border-[#C6A66B]"
                            aria-haspopup="true"
                            aria-expanded={moreOpen}
                        >
                            {t("more")}
                        </button>
                        {moreOpen && (
                            <div className="more-dropdown">
                                {secondaryNavLinks.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={active ? "active" : ""}
                                            onClick={() => setMoreOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-2 xl:gap-3 flex-nowrap justify-end min-w-0 flex-shrink-0">
                    {/* Language switcher — text only, no flags */}
                    <div className="lang-switcher">
                      <button
                        onClick={() => { if (locale !== "ar") { const newLocale = "ar"; const segs = pathname.split("/"); segs[1] = newLocale; router.push(segs.join("/") || `/${newLocale}`); }}}
                        className={`lang-btn ${locale === "ar" ? "active" : ""}`}
                      >
                        AR
                      </button>
                      <button
                        onClick={() => { if (locale !== "en") { const newLocale = "en"; const segs = pathname.split("/"); segs[1] = newLocale; router.push(segs.join("/") || `/${newLocale}`); }}}
                        className={`lang-btn ${locale === "en" ? "active" : ""}`}
                      >
                        EN
                      </button>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="hidden lg:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#6B695A] hover:bg-[#C6A66B] transition-all duration-200 whitespace-nowrap no-underline"
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden border border-[#F5F1E8]/40 rounded-lg cursor-pointer flex flex-col gap-1 py-2.5 px-3 min-w-[3.2rem] items-center justify-center bg-transparent hover:bg-white/[0.08] transition-colors"
                        aria-label={menuOpen ? (locale === "ar" ? "إغلاق" : "Close") : (locale === "ar" ? "افتح" : "Open")}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className={`block w-[20px] h-[2px] bg-[#F5F1E8] rounded-[2px] transition-all duration-300 ${
                                    menuOpen && i === 0 ? "translate-y-[6px] rotate-45" :
                                    menuOpen && i === 2 ? "-translate-y-[6px] -rotate-45" :
                                    menuOpen && i === 1 ? "scale-x-0" : ""
                                }`}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[65] bg-[#474A4D] flex flex-col overflow-y-auto overflow-x-hidden lg:hidden">
                    <div className="flex items-center justify-between p-4 px-6 border-b border-[rgba(198,166,107,0.15)] sticky top-0 bg-[#474A4D] z-10">
                        <span className="text-[#F5F1E8] font-bold text-lg tracking-wide">ACEC</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                            className="w-10 h-10 rounded-lg border border-[rgba(198,166,107,0.25)] bg-white/[0.06] text-[#F5F1E8] flex items-center justify-center cursor-pointer text-xl flex-shrink-0 hover:bg-white/[0.12] transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex-1 py-4">
                        {allNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-4 py-3.5 px-6 border-b border-[rgba(198,166,107,0.08)] text-[#F5F1E8] no-underline text-base font-medium transition-colors hover:bg-white/[0.06]"
                            >
                                <span>{item.label}</span>
                                <span className="ms-auto text-[#C6A66B]/60 text-sm">
                                    {isRTL ? "←" : "→"}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-[rgba(198,166,107,0.15)] bg-[#474A4D] sticky bottom-0 flex flex-col gap-3">
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMenuOpen(false)}
                            className="block w-full py-3.5 bg-[#6B695A] text-white rounded-lg text-center font-semibold text-base no-underline cursor-pointer hover:bg-[#C6A66B] transition-colors"
                        >
                            {t("consultation")}
                        </Link>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => { setMenuOpen(false); const segs = pathname.split("/"); segs[1] = "ar"; router.push(segs.join("/")); }}
                                className={`lang-btn ${locale === "ar" ? "active" : ""}`}
                            >
                                AR
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); const segs = pathname.split("/"); segs[1] = "en"; router.push(segs.join("/")); }}
                                className={`lang-btn ${locale === "en" ? "active" : ""}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#f0ede6] ${
                scrolled ? "py-2 px-4 shadow-soft border-b border-[#ddd8d0]" : "py-3 px-4 border-b border-[#ddd8d0]"
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
                                className={`no-underline text-[0.875rem] xl:text-[0.9rem] font-medium py-2 px-3 xl:px-3.5 rounded-lg transition-all duration-200 tracking-[0.01em] whitespace-nowrap ${
                                    active
                                        ? "text-[#C6A66B] bg-[#C6A66B]/10"
                                        : "text-[#4a4540]/70 hover:text-[#4a4540] hover:bg-[#e8e4dc]"
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
                            className="border border-[#ddd8d0] rounded-lg text-[#4a4540] text-[0.875rem] font-medium py-2 px-3.5 cursor-pointer transition-all duration-200 bg-transparent hover:bg-[#e8e4dc] hover:text-[#4a4540] hover:border-[#C6A66B]"
                            aria-haspopup="true"
                            aria-expanded={moreOpen}
                        >
                            {t("more")}
                        </button>
                        {moreOpen && (
                            <div
                                className={`absolute top-full mt-1 bg-[#f0ede6] border border-[#ddd8d0] rounded-lg shadow-lg min-w-[200px] py-2 z-50 ${isRTL ? "left-0" : "right-0"}`}
                                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
                            >
                                {secondaryNavLinks.map((link, i) => {
                                    const active = isActive(link.href);
                                    const showSep = secondaryNavLinks.length > 4 && i === 4;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`block px-5 py-3 text-[0.875rem] tracking-wide text-[#4a4540] no-underline transition-all duration-200 ${
                                                active
                                                    ? "text-[#C6A66B] bg-[#C6A66B]/10 font-semibold"
                                                    : "hover:bg-[#e8e4dc] hover:text-[#2e2b26]"
                                            } ${showSep ? "border-b border-[rgba(0,0,0,0.06)] pb-3 mb-1" : ""}`}
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
                    {/* Language switcher */}
                    <div className="flex items-center border border-[#ddd8d0] bg-[#e8e4dc] rounded-full p-0.5">
                      <button
                        onClick={() => { if (locale !== "ar") { const newLocale = "ar"; const segs = pathname.split("/"); segs[1] = newLocale; router.push(segs.join("/") || `/${newLocale}`); }}}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                          locale === "ar" ? "bg-[#4a4540] text-[#f0ede6]" : "text-[#4a4540]/60 hover:text-[#4a4540]"
                        }`}
                      >
                        AR
                      </button>
                      <button
                        onClick={() => { if (locale !== "en") { const newLocale = "en"; const segs = pathname.split("/"); segs[1] = newLocale; router.push(segs.join("/") || `/${newLocale}`); }}}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                          locale === "en" ? "bg-[#4a4540] text-[#f0ede6]" : "text-[#4a4540]/60 hover:text-[#4a4540]"
                        }`}
                      >
                        EN
                      </button>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="hidden lg:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#f0ede6] bg-[#3d3a34] hover:bg-[#4a4540] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap no-underline shadow-soft"
                    >
                        {t("consultation")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden border border-[#ddd8d0] rounded-lg cursor-pointer flex flex-col gap-1 py-2.5 px-3 min-w-[3.2rem] items-center justify-center bg-transparent hover:bg-[#e8e4dc] transition-colors"
                        aria-label={menuOpen ? (locale === "ar" ? "إغلاق" : "Close") : (locale === "ar" ? "افتح" : "Open")}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className={`block w-[20px] h-[2px] bg-[#4a4540] rounded-[2px] transition-all duration-300 ${
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
                <div className="fixed inset-0 z-[65] bg-[#f0ede6] flex flex-col overflow-y-auto overflow-x-hidden lg:hidden">
                    <div className="flex items-center justify-between p-4 px-6 border-b border-[#ddd8d0] sticky top-0 bg-[#f0ede6] z-10">
                        <span className="text-[#4a4540] font-serif font-bold text-xl tracking-wide">ACEC</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                            className="w-10 h-10 rounded-lg border border-[#ddd8d0] bg-[#e8e4dc] text-[#4a4540] flex items-center justify-center cursor-pointer text-xl flex-shrink-0 hover:bg-[#ddd8d0] transition-colors"
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
                                className="flex items-center gap-4 py-3.5 px-6 border-b border-[#ddd8d0]/50 text-[#4a4540] no-underline text-base font-medium transition-colors hover:bg-[#e8e4dc]"
                            >
                                <span>{item.label}</span>
                                <span className="ms-auto text-[#8a8278] text-sm">
                                    {isRTL ? "←" : "→"}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-[#ddd8d0] bg-[#f0ede6] sticky bottom-0 flex flex-col gap-3">
                        <Link
                            href={`/${locale}/contact`}
                            onClick={() => setMenuOpen(false)}
                            className="block w-full py-3.5 bg-[#3d3a34] text-[#f0ede6] rounded-lg text-center font-semibold text-base no-underline cursor-pointer hover:bg-[#4a4540] transition-colors shadow-soft"
                        >
                            {t("consultation")}
                        </Link>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => { setMenuOpen(false); const segs = pathname.split("/"); segs[1] = "ar"; router.push(segs.join("/")); }}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                                  locale === "ar" ? "bg-[#4a4540] text-[#f0ede6]" : "text-[#4a4540]/60 hover:text-[#4a4540] hover:bg-[#e8e4dc]"
                                }`}
                            >
                                AR
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); const segs = pathname.split("/"); segs[1] = "en"; router.push(segs.join("/")); }}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                                  locale === "en" ? "bg-[#4a4540] text-[#f0ede6]" : "text-[#4a4540]/60 hover:text-[#4a4540] hover:bg-[#e8e4dc]"
                                }`}
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

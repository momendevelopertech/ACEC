"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Theme } from "@/lib/theme-types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export const dynamic = "force-static";

export default function DashboardPage() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { switchTheme } = useTheme();

  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    fetchThemes();
  }, []);

  async function fetchThemes() {
    try {
      const res = await fetch(`${API_BASE}/api/themes`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setThemes(json.data);
          const active = json.data.find((t: Theme) => t.is_active);
          if (active) setActiveId(active.id);
        }
      }
    } catch (e) {
      console.error("Failed to fetch themes:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleActivate(themeId: number) {
    await switchTheme(themeId);
    setActiveId(themeId);
    alert(isArabic ? "تم تفعيل الثيم بنجاح" : "Theme activated successfully");
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <section className="section-padding">
          <div className="container-custom">
            <div className="section-label" style={{ marginBottom: "1rem", justifyContent: "center" }}>
              ACEC DASHBOARD
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              Theme <span className="gold-text">Management</span>
            </h1>

            {loading ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "var(--color-muted)" }}>
                  {isArabic ? "جاري التحميل..." : "Loading..."}
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "2rem",
                }}
              >
                {themes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      background: "var(--color-surface)",
                      border: `1px solid ${activeId === theme.id ? "var(--color-gold)" : "var(--color-border)"}`,
                      borderRadius: "var(--radius-lg)",
                      padding: "2rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {activeId === theme.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: isArabic ? "auto" : "1rem",
                          left: isArabic ? "1rem" : "auto",
                          background: "var(--color-gold)",
                          color: "var(--color-bg)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {isArabic ? "نشط" : "Active"}
                      </div>
                    )}

                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {isArabic ? theme.name_ar : theme.name}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "1.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {theme.colors &&
                        Object.entries(theme.colors)
                          .slice(0, 5)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              title={`${key}: ${value}`}
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: value,
                                border: "2px solid var(--color-border)",
                              }}
                            />
                          ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {activeId !== theme.id && (
                        <button
                          onClick={() => handleActivate(theme.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "var(--color-gold)",
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--color-bg)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {isArabic ? "تفعيل" : "Activate"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div
              style={{
                background: "rgba(var(--color-gold-rgb), 0.05)",
                border: "1px solid rgba(var(--color-gold-rgb), 0.2)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                textAlign: "center",
                marginTop: "3rem",
              }}
            >
              <p style={{ color: "var(--color-gold)", fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {isArabic ? "إدارة الثيمات" : "Theme Management"}
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
                {isArabic
                  ? "اختر الثيم الذي تريد تفعيله وانقر على تفعيل"
                  : "Select a theme and click Activate to apply it site-wide"}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { use } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getTeamData(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/team/${locale}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "فريقنا | الميثاق العربي" : "Our Team | ACEC",
    description: isAr
      ? "فريق من المهندسين المتخصصين ذوي الخبرة العالية"
      : "A team of highly experienced specialized engineers",
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("nav");
  const teamData = await getTeamData(locale);
  const isAr = locale === "ar";

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "var(--color-olive-deep)",
          }}
        >
          <div className="container-custom">
            <div
              className="section-label justify-center mb-4"
              style={{ color: "rgba(198,166,107,0.8)" }}
            >
              {isAr ? "فريقنا" : "Our Team"}
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "#FFFFFF",
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              {isAr ? (
                <>
                  فريق من{" "}
                  <strong style={{ color: "#C6A66B" }}>المتخصصين</strong>
                </>
              ) : (
                <>
                  A Team of{" "}
                  <strong style={{ color: "#C6A66B" }}>Specialists</strong>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {isAr
                ? "فريق من المهندسين المتخصصين ذوي الخبرة العالية في مختلف التخصصات الهندسية"
                : "A team of highly experienced specialized engineers across various engineering disciplines"}
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 px-6 md:pb-24">
          <div className="container-custom">
            {teamData && teamData.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "2rem",
                }}
              >
                {teamData.map((member: any) => (
                  <div
                    key={member.id}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "16px",
                      padding: "2rem",
                      textAlign: "center",
                      transition: "transform 0.3s, border-color 0.3s",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "rgba(198,166,107,0.08)",
                        border: "2px solid rgba(198,166,107,0.2)",
                        margin: "0 auto 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        color: "#C6A66B",
                        overflow: "hidden",
                      }}
                    >
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        color: "#C6A66B",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                      }}
                    >
                      {member.position}
                    </p>
                    {member.bio && (
                      <p
                        style={{
                          color: "#888888",
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {member.bio}
                      </p>
                    )}
                    <div className="flex justify-center gap-3 mt-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                           className="text-blue-500 hover:text-blue-700 transition-colors">
                          LinkedIn ↗
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`}
                           className="text-[#C6A66B] hover:text-[#B89555] transition-colors">
                          Email ✉
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl" style={{ color: "#8a8278" }}>
                  {isAr ? "قريباً..." : "Coming Soon..."}
                </p>
              </div>
            )}

            {/* Back link */}
            <div className="text-center mt-12">
              <Link
                href={`/${locale}`}
                style={{
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {isAr ? "العودة للرئيسية" : "Back to Home"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ transform: isAr ? "rotate(180deg)" : "none" }}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransitionWrapper>
  );
}

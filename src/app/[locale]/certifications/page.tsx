import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";
import { CertificationsGallery } from "@/components/sections/CertificationsGallery";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getCertifications(locale: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/certifications/${locale}`, {
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
    title: isAr ? "الشهادات والاعتمادات | الميثاق العربي" : "Certifications & Accreditations | ACEC",
  };
}

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const certs = await getCertifications(locale);
  const isAr = locale === "ar";

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main className="pt-24">
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
          }}
        >
          <div className="container-custom">
            <div className="section-label justify-center mb-4">
              {isAr ? "الشهادات والاعتمادات" : "Certifications & Accreditations"}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              {isAr ? (
                <>
                  شهادات{" "}
                  <span className="gold-text">معتمدة</span>
                </>
              ) : (
                <>
                  Accredited{" "}
                  <span className="gold-text">Certifications</span>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-muted)",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {isAr
                ? "نفخر باعتمادنا من أبرز الجهات الوطنية والدولية في مجال الاستشارات الهندسية والسلامة"
                : "We are proud to be accredited by leading national and international authorities in engineering consultancy and safety"}
            </p>
          </div>
        </section>

        {/* License Gallery */}
        {certs && certs.length > 0 && (
          <section className="py-16 px-6 md:pb-24 bg-[linear-gradient(180deg,transparent_0%,rgba(var(--color-accent-rgb),0.02)_100%)]">
            <div className="container-custom">
              <div className="section-label mb-6">{isAr ? "صور الشهادات" : "License Gallery"}</div>
              <h2 className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-text-primary mb-10">
                {isAr ? "شهادات الترخيص" : "License Certificates"}
              </h2>
              <CertificationsGallery certs={certs} />
            </div>
          </section>
        )}

        <section className="py-16 px-6">
          <div className="container-custom">
            <div className="text-center mt-8">
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

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";
import { PdfViewer } from "@/components/ui/PdfViewer";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

async function getActiveProfilePdf() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/profile-pdf/active`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

const PDF_PROXY_URL = "/api/pdf/profile";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "ملف المكتب التعريفي | ACEC" : "Company Profile | ACEC",
    description: isAr
      ? "الملف التعريفي للميثاق العربي للاستشارات الهندسية وهندسة السلامة"
      : "Arabian Covenant Engineering Consultants (ACEC) — official company profile",
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const pdf = await getActiveProfilePdf();
  const hasPdf = pdf !== null;

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section
          style={{
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
          }}
        >
          <div className="container-custom">
            <div className="section-label justify-center mb-4">
              {isAr ? "ملف المكتب" : "Company Profile"}
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
                  ملف{" "}
                  <span className="gold-text">تعريفي</span>
                </>
              ) : (
                <>
                  Company{" "}
                  <span className="gold-text">Profile</span>
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
                ? "تعرف على الميثاق العربي للاستشارات الهندسية — رؤيتنا، رسالتنا، خدماتنا، ومشاريعنا"
                : "Discover Arabian Covenant Engineering Consultants (ACEC) — our vision, mission, services, and projects"}
            </p>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className="pb-16 px-6 md:pb-24">
          <div className="container-custom">
            {hasPdf ? (
              <PdfViewer
                src={PDF_PROXY_URL}
                fileName={pdf?.name ? `${pdf.name}.pdf` : "ACEC-Profile.pdf"}
                isAr={isAr}
              />
            ) : (
              <div className="text-center py-24">
                <div
                  className="gradient-border mx-auto"
                  style={{
                    maxWidth: "500px",
                    background: "var(--color-card-bg)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "var(--radius-lg)",
                    padding: "4rem 2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1.5rem",
                      opacity: 0.7,
                    }}
                  >
                    📄
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {isAr ? "لا يوجد ملف تعريف بعد" : "No Profile PDF Yet"}
                  </h2>
                  <p
                    style={{
                      color: "var(--color-muted)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {isAr
                      ? "سيتم إضافة الملف التعريفي للمكتب قريبًا"
                      : "The company profile PDF will be available soon"}
                  </p>
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="text-center mt-12">
              <a
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
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransitionWrapper>
  );
}

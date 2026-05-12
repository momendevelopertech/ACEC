import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المشاريع | ACEC" : "Projects | ACEC",
    description:
      locale === "ar"
        ? "مشاريعنا المميزة في المملكة العربية السعودية"
        : "Our featured projects across Saudi Arabia",
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <div
          style={{
            padding: "5rem 1.5rem 2rem",
            background:
              "linear-gradient(180deg, rgba(var(--color-gold-rgb), 0.04) 0%, transparent 100%)",
            borderBottom: "1px solid var(--color-border)",
            textAlign: "center",
          }}
        >
          <div className="container-custom">
            <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
              ACEC
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {isArabic ? "مشاريعنا " : "Our "}
              <span className="gold-text">{isArabic ? "المميزة" : "Projects"}</span>
            </h1>
          </div>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "عن المكتب | ACEC" : "About Us | ACEC",
    description:
      locale === "ar"
        ? "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة — تعرف على مكتبنا وفريقنا"
        : "Arab Charter Engineering Consultants — learn about our office and team",
  };
}

export default async function AboutPage({ params }: Props) {
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
              "linear-gradient(180deg, rgba(201, 168, 76, 0.04) 0%, transparent 100%)",
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
                color: "var(--color-white)",
              }}
            >
              {isArabic ? "عن " : "About "}
              <span className="gold-text">{isArabic ? "مكتبنا" : "Us"}</span>
            </h1>
          </div>
        </div>
        <AboutSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
}

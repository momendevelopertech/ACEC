import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "خدماتنا | ACEC" : "Our Services | ACEC",
    description:
      locale === "ar"
        ? "خدماتنا الهندسية المتكاملة — استشارات، سلامة، إشراف، تصميم داخلي، وتصميم مصانع"
        : "Our comprehensive engineering services — consultancy, safety, supervision, interior design, and factory design",
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
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
              {isArabic ? "خدماتنا " : "Our "}
              <span className="gold-text">{isArabic ? "الهندسية" : "Services"}</span>
            </h1>
          </div>
        </div>
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}

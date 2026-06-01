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
    title: locale === "ar" ? "خدماتنا" : "Our Services",
    description:
      locale === "ar"
        ? "خدماتنا الهندسية المتكاملة — تصميم، تصميم داخلي، إشراف، حماية من الحريق، مساحة، واستشارات شاملة"
        : "Our comprehensive engineering services — design, interior design, supervision, fire protection, land surveying, and full consulting",
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const isArabic = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="pt-[80px]">
        <div
          style={{
            padding: "5rem 1.5rem 2rem",
            background: "var(--color-olive-deep)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          <div className="container-custom">
            <div className="section-label justify-center mb-4" style={{ color: "rgba(198,166,107,0.8)" }}>
              ACEC
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              {isArabic ? "خدماتنا " : "Our "}
              <strong style={{ color: "#C6A66B" }}>{isArabic ? "الهندسية" : "Services"}</strong>
            </h1>
          </div>
        </div>
        <ServicesSection showAll={true} />
      </main>
      <Footer />
    </>
  );
}

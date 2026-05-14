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
      <main className="pt-[80px]">
        <div className="pt-20 pb-8 px-6 bg-[linear-gradient(180deg,rgba(var(--color-accent-rgb),0.04)_0%,transparent_100%)] border-b border-border-default text-center">
          <div className="container-custom">
            <div className="section-label justify-center mb-4">
              ACEC
            </div>
            <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-bold text-text-primary">
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

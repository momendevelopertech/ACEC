import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المشاريع" : "Projects",
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
      <main style={{ backgroundColor: "#f0ede6", minHeight: "100vh", paddingTop: "80px" }}>
        <ProjectsSection showHeader />
      </main>
      <Footer />
    </>
  );
}

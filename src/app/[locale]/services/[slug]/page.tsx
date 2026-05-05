import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetailClient } from "./ServiceDetailClient";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "الخدمة غير موجودة | Service Not Found",
    };
  }

  const isArabic = locale === "ar";
  const title = isArabic ? service.title.ar : service.title.en;
  const description = isArabic ? service.description.ar : service.description.en;

  return {
    title: `${title} | ACEC`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [service.image],
    },
  };
}

export function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  const locales = routing.locales;

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <ServiceDetailClient service={service} />
      </main>
      <Footer />
    </>
  );
}

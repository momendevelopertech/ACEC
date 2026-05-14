import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const locales = ["ar", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const res = await fetch(`${API_BASE}/api/v1/services/${locale}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          for (const service of json.data) {
            params.push({ locale, slug: service.slug });
          }
        }
      }
    } catch {}
  }
  return params;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const isAr = locale === "ar";

  try {
    const res = await fetch(`${API_BASE}/api/v1/services/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };
    const json = await res.json();
    const service = json.data;
    if (!service) return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };

    return {
      title: `${service.title} | ACEC`,
      description: service.description,
    };
  } catch {
    return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const isAr = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  let service = null;
  try {
    const res = await fetch(`${API_BASE}/api/v1/services/${slug}/${locale}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      service = json.data;
    }
  } catch {}

  if (!service) {
    notFound();
  }

  return (
    <PageTransitionWrapper>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section
          style={{
            padding: "4rem 1.5rem 3rem",
            background: "linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div className="container-custom max-w-[800px] mx-auto">
            <div
              className="section-label justify-center mb-4"
            >
              ACEC SERVICE
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--color-white)",
                marginBottom: "1rem",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {service.title}
            </h1>
            {service.meta_title && (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--color-gold)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                {service.meta_title}
              </p>
            )}
          </div>
        </section>

        {/* Service Content */}
        <section className="py-16 px-6 md:pb-24">
          <div className="container-custom max-w-[800px] mx-auto">
            {service.image && (
              <div
                style={{
                  height: "400px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  marginBottom: "3rem",
                }}
                className="responsive-height"
              >
                <img
                  src={`${API_BASE}/storage/${service.image}`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <article
              style={{
                color: "rgba(var(--color-text-rgb), 0.8)",
                lineHeight: 1.8,
                fontSize: "1.125rem",
                textAlign: isAr ? "right" : "left",
              }}
              dangerouslySetInnerHTML={{ __html: service.content || service.description }}
            />

            {/* Back to services */}
            <div className="text-center mt-12">
              <a
                href={`/${locale}/services`}
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
                {isAr ? "العودة للخدمات" : "Back to Services"}
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

      <style>{`
        @media (max-width: 768px) {
          .responsive-height {
            height: 300px !important;
          }
        }
        @media (max-width: 768px) {
          .responsive-height {
            height: 250px !important;
          }
        }
        article h2, article h3, article h4 {
          color: var(--color-white);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        article p {
          margin-bottom: 1.5rem;
        }
        article ul, article ol {
          margin-bottom: 1.5rem;
          paddingInlineStart: 2rem;
        }
        article img {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius-md);
          margin: 2rem 0;
        }
      `}</style>
    </PageTransitionWrapper>
  );
}

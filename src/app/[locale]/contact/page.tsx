import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "تواصل معنا" : "Contact Us",
    description:
      locale === "ar"
        ? "تواصل مع الميثاق العربي للاستشارات الهندسية — نحن هنا للإجابة على جميع استفساراتك"
        : "Contact Arabian Covenant Engineering Consultants — we are here to answer all your inquiries",
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const isArabic = locale === "ar";

  const contactItems = [
    {
      icon: "📞",
      title: isArabic ? "الهاتف 1" : "Phone 1",
      value: "+966 500 037 049",
      href: "tel:+966500037049",
    },
    {
      icon: "📞",
      title: isArabic ? "الهاتف 2" : "Phone 2",
      value: "+966 545 541 210",
      href: "tel:+966545541210",
    },
    {
      icon: "✉️",
      title: "Email",
      value: "info@ac-ec.com.sa",
      href: "mailto:info@ac-ec.com.sa",
    },
    {
      icon: "📍",
      title: isArabic ? "الموقع" : "Location",
      value: isArabic
        ? "الرياض – حي الزهراء – شارع عمر بن عبد العزيز"
        : "Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia",
      href: null,
    },
  ];

  const workingHours = [
    { day: isArabic ? "الأحد – الخميس" : "Sunday – Thursday", hours: "9:00 AM – 6:00 PM" },
    { day: isArabic ? "الجمعة – السبت" : "Friday – Saturday", hours: isArabic ? "مغلق" : "Closed" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-[80px]">
        <section className="section-padding">
          <div className="container-custom">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "5rem",
                alignItems: "start",
              }}
              className="contact-grid"
            >
              <div>
                <div className="section-label" style={{ marginBottom: "1rem" }}>
                  ACEC
                </div>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 300,
                    color: "#1A1A1A",
                    lineHeight: 1.2,
                    marginBottom: "1.5rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isArabic ? "تواصل " : "Contact "}
                  <strong style={{ color: "#C6A66B" }}>{isArabic ? "معنا" : "Us"}</strong>
                </h1>
                <p
                  style={{
                    color: "#888888",
                    lineHeight: 1.8,
                    marginBottom: "3rem",
                    fontSize: "1rem",
                  }}
                >
                  {t("subtitle")}
                </p>

                <div className="flex flex-col gap-6">
                  {contactItems.map((item) => (
                    <div
                      key={item.title}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          background: "rgba(198,166,107,0.06)",
                          border: "1px solid rgba(198,166,107,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#888888",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.title}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            style={{
                              color: "#1A1A1A",
                              textDecoration: "none",
                              fontSize: "0.9375rem",
                              transition: "color 0.2s",
                            }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span
                            style={{
                              color: "#1A1A1A",
                              fontSize: "0.9375rem",
                            }}
                          >
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Working Hours */}
                <div className="mt-10">
                  <h3
                    style={{
                      fontSize: "0.75rem",
                      color: "#C6A66B",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    {isArabic ? "ساعات العمل" : "Working Hours"}
                  </h3>
                  <div
                    style={{
                      background: "rgba(198,166,107,0.03)",
                      border: "1px solid rgba(198,166,107,0.08)",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {workingHours.map((wh, i) => (
                      <div
                        key={wh.day}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0.875rem 1.25rem",
                          borderBottom: i < workingHours.length - 1 ? "1px solid rgba(198,166,107,0.06)" : "none",
                        }}
                      >
                        <span style={{ color: "#1A1A1A", fontSize: "0.875rem", fontWeight: 500 }}>
                          {wh.day}
                        </span>
                        <span style={{ color: "#888888", fontSize: "0.875rem" }}>
                          {wh.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
}

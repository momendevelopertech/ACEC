import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor)
);

export const metadata: Metadata = {
  title: {
    default: "ACEC — الميثاق العربي للاستشارات الهندسية",
    template: "%s | ACEC",
  },
  description:
    "الميثاق العربي للاستشارات الهندسية وهندسة السلامة — استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  keywords: [
    "استشارات هندسية",
    "هندسة السلامة",
    "تصميم معماري",
    "ACEC",
    "المملكة العربية السعودية",
    "engineering consultancy",
    "safety engineering",
    "Saudi Arabia",
  ],
  authors: [{ name: "ACEC" }],
  creator: "Arabian Covenant Engineering Consultants",
  metadataBase: new URL("https://ac-ec.com.sa"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://ac-ec.com.sa",
    siteName: "ACEC",
    title: "الميثاق العربي للاستشارات الهندسية وهندسة السلامة",
    description:
      "استشارات هندسية وهندسة سلامة متكاملة في المملكة العربية السعودية",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACEC — الميثاق العربي للاستشارات الهندسية",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

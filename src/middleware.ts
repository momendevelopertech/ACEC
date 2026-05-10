// Next.js middleware for locale redirection based on Accept-Language header
// Places the user on the appropriate language route (e.g., /ar or /en) when visiting the root URL.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define supported locales – keep in sync with src/i18n/routing.ts
const locales = ["ar", "en"]; // defaultLocale is "ar"
const defaultLocale = "ar";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path already contains a locale segment, do nothing.
  const firstSegment = pathname.split("/")[1];
  if (locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Only handle the root path ("/"), otherwise let Next.js handle 404/not-found.
  if (pathname !== "/") {
    return NextResponse.next();
  }

  // Determine locale from Accept-Language header or fall back to default.
  const acceptLang = request.headers.get("accept-language");
  let locale = defaultLocale;
  if (acceptLang) {
    const preferred = acceptLang.split(",")[0].trim().toLowerCase();
    if (locales.includes(preferred)) {
      locale = preferred;
    } else if (preferred.startsWith("ar")) {
      locale = "ar";
    } else if (preferred.startsWith("en")) {
      locale = "en";
    }
  }

  // Redirect to the locale‑prefixed homepage.
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/", // Run only for the root path
};

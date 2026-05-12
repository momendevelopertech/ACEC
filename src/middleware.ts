// Next.js middleware for locale redirection based on Accept-Language header
// Places the user on the appropriate language route (e.g., /ar or /en) when visiting the root URL.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define supported locales – keep in sync with src/i18n/routing.ts
const locales = ["ar", "en"]; // defaultLocale is "ar"
const defaultLocale = "ar";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path already contains a locale segment, refresh cookie.
  const firstSegment = pathname.split("/")[1];
  if (locales.includes(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
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

  // Redirect to the locale‑prefixed homepage and set cookie.
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: "/", // Run only for the root path
};

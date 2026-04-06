import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API
  if (pathname.startsWith("/login") || pathname === "/api/auth") {
    return NextResponse.next();
  }

  // Allow static assets and public icons (needed for email signature images)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/api/logout")
  ) {
    return NextResponse.next();
  }

  // Check auth cookie
  const authToken = request.cookies.get("auth-token")?.value;
  const authSecret = process.env.AUTH_SECRET ?? "change-this-to-a-long-random-secret";

  if (authToken !== authSecret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

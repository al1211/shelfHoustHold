import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const path = req.nextUrl.pathname;

  // Auth pages
  const isAuthPage =
    path === "/signin" || path === "/signup";

  // Agar login hai aur signin/signup par ja raha hai
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  // Protected routes
  const isProtectedRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/household") ||
    path.startsWith("/items") ||
    path.startsWith("/add-item");

  // Login nahi hai aur protected route access kar raha hai
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/signin", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/dashboard/:path*",
    "/household/:path*",
    "/items/:path*",
    "/additem/:path*",
  ],
};
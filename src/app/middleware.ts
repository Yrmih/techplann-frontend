import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verifica o cookie ou token (Middleware não lê localStorage,
  // por isso o DashboardLayout ainda é importante como segunda camada)
  const token = request.cookies.get("next-auth.session-token"); // Exemplo se usar cookies

  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

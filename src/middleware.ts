import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Configuração das rotas que o Middleware deve observar.
 * Usamos um Regex para ignorar arquivos de sistema, imagens e APIs.
 */
export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};

export function middleware(req: NextRequest) {

  // 2. ADICIONE ESTA LINHA ABAIXO PARA LIBERAR TUDO:
  return NextResponse.next(); 

  // --- O resto do código abaixo ficará "morto" enquanto a linha acima existir ---
  const { pathname } = req.nextUrl;

  // 1. Busca o token nos Cookies.
  // O Middleware roda no servidor, por isso não acessa localStorage.
  const token = req.cookies.get("@TechPlann:token")?.value;

  // 2. Definição das rotas
  const isPublicRoute =
    pathname.startsWith("/login") || pathname.startsWith("/onboarding");

  // Consideramos o Dashboard e a Home (/) como rotas protegidas
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname === "/";

  // 3. REDIRECIONAMENTO: Usuário não logado tentando acessar área restrita
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. REDIRECIONAMENTO: Usuário já logado tentando acessar Login ou Onboarding
  // Isso evita que ele veja a tela de login estando autenticado
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

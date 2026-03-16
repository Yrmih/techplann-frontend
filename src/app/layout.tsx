import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

// 2. Configuramos a fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Nome da variável que o Tailwind vai ler
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Aplicamos a variável no HTML e as classes de otimização no BODY
    <html lang="pt-br" className={inter.variable}>
      <body className="antialiased font-sans">
        {/* 'antialiased' torna a fonte mais nítida
            'font-sans' aplica a Inter como fonte padrão
        */}
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
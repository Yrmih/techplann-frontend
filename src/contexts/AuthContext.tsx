"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Organization {
  name: string;
  cnpj: string;
}

interface User {
  id: string;
  nome: string;
  email: string;
  tenantId: string;
  role?: string;
  cargo?: string;
  organization?: Organization;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const recoveredUser = localStorage.getItem("@TechPlann:user");
      if (recoveredUser) {
        try {
          return JSON.parse(recoveredUser);
        } catch {
          localStorage.removeItem("@TechPlann:user");
          return null;
        }
      }
    }
    return null;
  });

  const [loading] = useState(false);
  const isAuthenticated = !!user;

  const login = (token: string, user: User) => {
    // 1. Salva no localStorage para uso do Client-side (UI, Requests)
    localStorage.setItem("@TechPlann:token", token);
    localStorage.setItem("@TechPlann:user", JSON.stringify(user));

    // 2. 🚀 Salva no Cookie para o Middleware (Server-side) conseguir ler
    // O nome deve ser EXATAMENTE o mesmo que você colocou no middleware.ts
    Cookies.set("@TechPlann:token", token, {
      expires: 7, // Expira em 7 dias
      path: "/", // Disponível em todo o site
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    setUser(user);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("@TechPlann:token");
    localStorage.removeItem("@TechPlann:user");

    // 🚀 Remove o cookie no logout
    Cookies.remove("@TechPlann:token", { path: "/" });

    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

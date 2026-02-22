"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  nome: string;
  email: string;
  tenantId: string;
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

  /**
   * ESTADO INICIALIZADO DIRETAMENTE
   * Verificamos o localStorage já na criação do estado.
   * Isso evita "cascading renders" e o aviso do React.
   */
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const recoveredUser = localStorage.getItem("@TechPlann:user");
      if (recoveredUser) {
        try {
          return JSON.parse(recoveredUser);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Como o 'user' é resolvido instantaneamente, o loading já pode começar como false
  const [loading] = useState(false);

  const isAuthenticated = !!user;

  const login = (token: string, user: User) => {
    localStorage.setItem("@TechPlann:token", token);
    localStorage.setItem("@TechPlann:user", JSON.stringify(user));

    setUser(user);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("@TechPlann:token");
    localStorage.removeItem("@TechPlann:user");
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

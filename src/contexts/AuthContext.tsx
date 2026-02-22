"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Interface para os dados da Organização.
 * Necessária para alimentar o card da empresa na Sidebar (Clone do Figma).
 */
interface Organization {
  name: string;
  cnpj: string;
}

/**
 * Interface do Usuário expandida.
 * Inclui o objeto organization para suportar a exibição de dados dinâmicos.
 */
interface User {
  id: string;
  nome: string;
  email: string;
  tenantId: string;
  role?: string;
  cargo?: string;
  organization?: Organization; // 🚀 Vital para o card da Sidebar
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
   * Verificamos o localStorage já na criação do estado para evitar "piscadas" de UI.
   */
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const recoveredUser = localStorage.getItem("@TechPlann:user");
      if (recoveredUser) {
        try {
          return JSON.parse(recoveredUser);
        } catch {
          // 🛡️ Se o JSON estiver inválido, removemos do storage para evitar erros
          localStorage.removeItem("@TechPlann:user");
          localStorage.removeItem("@TechPlann:token");
          return null;
        }
      }
    }
    return null;
  });

  // O loading começa como false pois a carga do localStorage é síncrona
  const [loading] = useState(false);

  const isAuthenticated = !!user;

  /**
   * Função de Login
   * Persiste a sessão e redireciona para o Dashboard.
   * Utilizada tanto no LoginForm quanto na finalização do Onboarding.
   */
  const login = (token: string, user: User) => {
    localStorage.setItem("@TechPlann:token", token);
    localStorage.setItem("@TechPlann:user", JSON.stringify(user));

    setUser(user);
    router.push("/dashboard");
  };

  /**
   * Função de Logout
   * Limpa os dados sensíveis e volta para a tela de acesso.
   */
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

/**
 * Hook personalizado useAuth
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

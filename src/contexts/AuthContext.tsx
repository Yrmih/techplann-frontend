"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Interface para os dados da Organização.
 * Necessária para alimentar o card da empresa na Sidebar.
 */
interface Organization {
  name: string;
  cnpj: string;
}

/**
 * Interface do Usuário expandida.
 * Inclui o objeto opcional organization para suportar o Auto-Login completo.
 */
interface User {
  id: string;
  nome: string;
  email: string;
  tenantId: string;
  organization?: Organization; // 💡 Adicionado para o layout da Sidebar
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
   * Isso evita "cascading renders" e garante performance no carregamento.
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

  // Estado de loading inicializado como false pois a carga do localStorage é síncrona
  const [loading] = useState(false);

  const isAuthenticated = !!user;

  /**
   * Função de Login
   * Salva o Token JWT e os dados do Usuário (com a Empresa) no LocalStorage.
   */
  const login = (token: string, user: User) => {
    localStorage.setItem("@TechPlann:token", token);
    localStorage.setItem("@TechPlann:user", JSON.stringify(user));

    setUser(user);
    router.push("/dashboard");
  };

  /**
   * Função de Logout
   * Limpa as credenciais e redireciona para a página de login.
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
 * Facilita o acesso ao contexto em qualquer componente da aplicação.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

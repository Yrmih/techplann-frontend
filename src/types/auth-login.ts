import { z } from "zod";
// Certifique-se de que o caminho aponta para o seu schema atualizado com 'password'
import { authLoginSchema } from "@/lib/validators/auth-login.schema";

/**
 * 🚀 Geramos o tipo de credenciais (email/password) automaticamente.
 * Isso resolve o erro no useForm<AuthLoginCredentials> e sincroniza com o Zod.
 */
export type AuthLoginCredentials = z.infer<typeof authLoginSchema>;

/**
 * 👤 Interface para o Usuário.
 * Essencial para o AuthContext e para exibir os dados na Sidebar.
 * Reflete exatamente o que o Backend (NestJS) retorna no login.
 */
export interface User {
  id: string;
  nome: string;
  email: string;
  tenantId: string;
  role: string;
  cargo: string;
  /**
   * Objeto opcional da organização para suportar o card da Sidebar.
   * Contém o Nome e CNPJ da empresa vinculada ao usuário.
   */
  organization?: {
    name: string;
    cnpj: string;
  };
}

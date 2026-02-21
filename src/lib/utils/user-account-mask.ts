/**
 * Utilitários para o formulário de Conta (Step 5)
 */

export const sanitizeFullName = (value: string) => {
  // Remove números e caracteres especiais, mantendo apenas letras e espaços
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
};

/**
 * Regras de Senha (para exibir no Frontend se desejar):
 * - Mínimo 6 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um número
 */
export const passwordRules = {
  minLength: 6,
  requiredUppercase: /[A-Z]/,
  requiredNumber: /[0-9]/,
};

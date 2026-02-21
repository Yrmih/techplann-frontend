/**
 * Máscaras específicas para o formulário de Responsável (Step 2)
 * Garante a formatação visual do CPF e Telefone conforme o padrão brasileiro.
 */

export const maskResponsibleCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14); // Limite do CPF formatado 000.000.000-00
};

/**
 * Máscara dinâmica para Telefone ou Celular.
 * Aplica automaticamente o formato (91) 3333-3333 ou (91) 98888-8888.
 */
export const maskResponsiblePhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, ""); //

  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }
  return cleanValue
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

/**
 * Nota sobre E-mail:
 * Para campos de e-mail, geralmente não aplicamos máscara de digitação,
 * pois pode atrapalhar o usuário. Apenas garantimos que o valor seja
 * validado pelo Schema do Zod no onSubmit.
 */


/**
 * Máscaras específicas para o formulário de Organização (Step 1)
 * Estas funções garantem a formatação visual enquanto limitam a entrada do usuário.
 */

export const maskOrganizationCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é número
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18); // Trava no limite do CNPJ formatado
};

export const maskOrganizationCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9); // Formato 00000-000
};

export const maskOrganizationPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, "");
  
  // Ajuste dinâmico para fixo (10 dígitos) ou celular (11 dígitos)
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

export const maskIE = (value: string) => {
  // Inscrição Estadual costuma variar por estado, mas geralmente removemos apenas letras
  return value.replace(/[^0-9.-]/g, "").slice(0, 20);
};
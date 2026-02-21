/**
 * Máscaras para o formulário de Pagamento (Step 4)
 */

export const maskCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é número
    .replace(/(\d{4})(\d)/, "$1 $2") // Agrupa de 4 em 4
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .slice(0, 19); // Limite de 16 números + 3 espaços
};

export const maskExpiryDate = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 5); // Formato MM/AA
};

export const maskCVV = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 4); // Limita a 4 dígitos (Amex usa 4, outros usam 3)
};

export const maskAgency = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 4);
};

export const maskBankAccount = (value: string) => {
  return value.replace(/\D/g, "").replace(/(\d)(\d)$/, "$1-$2"); // Coloca o dígito verificador
};

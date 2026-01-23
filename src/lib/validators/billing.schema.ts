import { z } from "zod";

export const billingSchema = z.object({
  paymentMethod: z.enum(["credit_card", "boleto"]),
  // Dados do Cartão (Obrigatórios apenas se o método for credit_card)
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
  // Dados Bancários (Opcionais conforme image_b1348a)
  bankName: z.string().optional(),
  agency: z.string().optional(),
  accountNumber: z.string().optional(),
  accountType: z.enum(["corrente", "poupanca"]).optional(),
}).refine((data) => {
  if (data.paymentMethod === "credit_card") {
    return !!data.cardNumber && !!data.cardName && !!data.expiry && !!data.cvv;
  }
  return true;
}, {
  message: "Preencha todos os campos do cartão",
  path: ["cardNumber"],
});

export type BillingData = z.infer<typeof billingSchema>;
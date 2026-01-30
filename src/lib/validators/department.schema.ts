import * as z from "zod";


export const departmentSchema = z.object({
 
  nome: z.string().min(2, "O nome do departamento deve ter pelo menos 2 caracteres"),
  
  tipo: z.string().min(1, "Selecione o tipo de departamento"),
  
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
  
  status: z.string().min(1, "Selecione a situação atual"),
});


export type DepartmentFormValues = z.infer<typeof departmentSchema>;
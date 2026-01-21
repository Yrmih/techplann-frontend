
import { z } from "zod";
import { authLoginSchema } from "@/lib/validators/schema";

/**
 * Representa os dados validados para a tentativa de login.
 */
export type AuthLoginCredentials = z.infer<typeof authLoginSchema>;

import { z } from "zod";
import { authLoginSchema } from "@/lib/validators/schema";

export type AuthLoginCredentials = z.infer<typeof authLoginSchema>;
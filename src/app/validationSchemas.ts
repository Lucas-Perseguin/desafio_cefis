import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(5, "Nome é obrigatório.").max(40),
  password: z.string().min(5, "Senha é obrigatório.").max(40),
});

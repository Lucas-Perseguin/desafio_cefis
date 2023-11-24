import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório.").max(40),
  password: z.string().min(1, "Senha é obrigatório.").max(40),
});

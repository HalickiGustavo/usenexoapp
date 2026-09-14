import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo.").max(100, "O nome deve ter até 100 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido.").max(255, "O e-mail deve ter até 255 caracteres."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Informe seu WhatsApp.")
    .max(20, "O WhatsApp deve ter até 20 caracteres.")
    .refine((value) => /^\d{10,11}$/.test(value.replace(/\D/g, "")), {
      message: "Informe um WhatsApp válido com DDD.",
    }),
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.schema";

export const saveSiteContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contatos_site").insert({
      nome: data.nome.trim(),
      email: data.email.trim().toLowerCase(),
      whatsapp: data.whatsapp.replace(/\D/g, ""),
      origem: "pagina_vendas",
    });

    if (error) {
      console.error("[contato] falha ao salvar contato", error.code);
      return {
        ok: false as const,
        error: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    }

    return { ok: true as const };
  });

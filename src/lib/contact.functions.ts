import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.schema";

export const saveSiteContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true as const };
    }

    const rawUrl = process.env["EXTERNAL_SUPABASE_URL"];
    const key = process.env["EXTERNAL_SUPABASE_SERVICE_ROLE_KEY"];
    if (!rawUrl || !key) {
      console.error("[contato] credenciais do banco externo ausentes");
      return {
        ok: false as const,
        error: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    }

    const url = rawUrl
      .trim()
      .replace(/^db\./, "")
      .replace(/^(?!https?:\/\/)/, "https://")
      .replace(/\/$/, "");

    const row = {
      nome: data.nome.trim(),
      email: data.email.trim().toLowerCase(),
      whatsapp: data.whatsapp.replace(/\D/g, ""),
      origem: "pagina_vendas",
    };

    try {
      const response = await fetch(`${url}/rest/v1/contatos_site`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
      });

      if (response.ok) {
        return { ok: true as const };
      }

      console.error("[contato] falha ao salvar no banco externo", response.status, await response.text());
      return {
        ok: false as const,
        error: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    } catch (error) {
      console.error("[contato] falha de conexão com o banco externo", error);
      return {
        ok: false as const,
        error: "Não foi possível enviar agora. Tente novamente em instantes.",
      };
    }
  });

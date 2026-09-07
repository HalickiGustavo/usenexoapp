import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const moduleScoreSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
});

const payloadSchema = z.object({
  nome: z.string().min(1).max(200),
  empresa: z.string().max(200).optional().default(""),
  email: z.string().email().max(200),
  whatsapp: z.string().min(6).max(40),
  imoveis: z.string().max(80).optional().default(""),
  colaboradores: z.string().max(20).optional().default(""),
  cidade: z.string().max(120).optional().default(""),
  estado: z.string().max(40).optional().default(""),
  pontuacao: z.number().min(0).max(100),
  nivel: z.string().max(80),
  horasDesperdicadas: z.number().min(0).max(1000),
  moduleScores: z.array(moduleScoreSchema).max(40),
  respostas: z.record(z.string(), z.number()).optional().default({}),
});

export type DiagnosticoPayload = z.infer<typeof payloadSchema>;

function faixaImoveisPeso(imoveis: string) {
  if (imoveis.includes("1000")) return 5;
  if (imoveis.includes("500")) return 4;
  if (imoveis.includes("200")) return 3;
  if (imoveis.includes("50")) return 2;
  return 1;
}

export function montarObservacaoCloser(d: DiagnosticoPayload) {
  const peso = faixaImoveisPeso(d.imoveis);
  const prioridade =
    peso >= 4 && d.pontuacao <= 75
      ? "ALTA"
      : peso >= 3 && d.pontuacao <= 55
        ? "ALTA"
        : d.pontuacao <= 55
          ? "MÉDIA"
          : peso >= 3
            ? "MÉDIA"
            : "BAIXA";

  const fracos = [...d.moduleScores].sort((a, b) => a.score - b.score).slice(0, 3);
  const fortes = [...d.moduleScores].sort((a, b) => b.score - a.score).slice(0, 2);

  const abordagem =
    d.pontuacao <= 30
      ? "Operação muito manual: focar em dor imediata (retrabalho, inadimplência e falta de controle). Mostrar ganho rápido com boleto, split e cobrança automática."
      : d.pontuacao <= 55
        ? "Já tem alguma estrutura, mas com gargalos claros. Focar em centralização de informações e automação da cobrança e dos repasses."
        : d.pontuacao <= 75
          ? "Operação organizada: vender escala e diferencial competitivo (portal do inquilino, anúncios integrados com ImovelWeb, Zap e Viva Real)."
          : "Alta maturidade: posicionar a Nexo como camada de escala e experiência do inquilino, sem custo para a imobiliária.";

  return [
    `PRIORIDADE: ${prioridade}`,
    `Score ${d.pontuacao}/100 — ${d.nivel}.`,
    `Porte: ${d.imoveis || "não informado"} imóveis, ${d.colaboradores || "?"} colaborador(es), ${d.cidade || "?"}/${d.estado || "?"}.`,
    `Pontos mais fracos: ${fracos.map((m) => `${m.name} (${m.score})`).join(", ") || "—"}.`,
    `Pontos mais fortes: ${fortes.map((m) => `${m.name} (${m.score})`).join(", ") || "—"}.`,
    `Desperdício estimado: ~${d.horasDesperdicadas}h/mês de trabalho manual.`,
    `Abordagem sugerida: ${abordagem}`,
    `Gancho: a Nexo é gratuita para a imobiliária e o proprietário — o único pagamento é a Taxa de Gestão Digital da Locação (R$ 24,90), já inclusa no boleto do inquilino, com split automático.`,
  ].join("\n");
}

export const salvarDiagnosticoLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => payloadSchema.parse(data))
  .handler(async ({ data }) => {
    const rawUrl = process.env["EXTERNAL_SUPABASE_URL"];
    const key = process.env["EXTERNAL_SUPABASE_SERVICE_ROLE_KEY"];
    if (!rawUrl || !key) {
      console.error("[diagnostico] credenciais do banco externo ausentes");
      return { ok: false as const, error: "Não foi possível salvar o diagnóstico agora." };
    }
    const url = rawUrl
      .trim()
      .replace(/^db\./, "")
      .replace(/^(?!https?:\/\/)/, "https://")
      .replace(/\/$/, "");


    const observacao = montarObservacaoCloser(data);
    const modulos = Object.fromEntries(data.moduleScores.map((m) => [m.id, m.score]));

    const row = {
      nome_completo: data.nome,
      empresa: data.empresa || null,
      email: data.email,
      whatsapp: data.whatsapp,
      imoveis_administrados: data.imoveis || null,
      colaboradores: data.colaboradores ? Number(data.colaboradores) || null : null,
      cidade: data.cidade || null,
      estado: data.estado ? data.estado.toUpperCase().slice(0, 2) : null,
      pontuacao_final: data.pontuacao,
      nivel_maturidade: data.nivel,
      pontuacoes_modulos: modulos,
      respostas: data.respostas,
      horas_desperdicadas: data.horasDesperdicadas,
      observacao_closer: observacao,
    };

    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/diagnostico_leads`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(row),
      });
      if (!res.ok) {
        console.error("[diagnostico] erro REST ao salvar lead:", res.status, await res.text());
        return { ok: false as const, error: "Não foi possível salvar o diagnóstico agora." };
      }
      const rows = (await res.json()) as { id?: string }[];
      return { ok: true as const, id: rows?.[0]?.id ?? null };
    } catch (err) {
      console.error("[diagnostico] falha ao salvar lead:", err);
      return { ok: false as const, error: "Não foi possível salvar o diagnóstico agora." };
    }
  });


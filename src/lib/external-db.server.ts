import { Client } from "pg";

export function getExternalDbConfig() {
  const host = process.env["EXTERNAL_DB_HOST"];
  const database = process.env["EXTERNAL_DB_NAME"];
  const user = process.env["EXTERNAL_DB_USER"];
  const password = process.env["EXTERNAL_DB_PASSWORD"];
  if (!host || !database || !user || !password) return null;
  const port = Number(process.env["EXTERNAL_DB_PORT"] ?? "5432");
  const sslRaw = (process.env["EXTERNAL_DB_SSL"] ?? "true").toLowerCase();
  const ssl = ["false", "0", "no", "disable"].includes(sslRaw)
    ? undefined
    : { rejectUnauthorized: false };
  return { host, port, database, user, password, ssl };
}

export async function withExternalDb<T>(fn: (client: Client) => Promise<T>): Promise<T> {
  const config = getExternalDbConfig();
  if (!config) throw new Error("Conexão com o banco externo não configurada.");
  const client = new Client(config);
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end().catch(() => {});
  }
}

let schemaReady = false;

const SCHEMA_SQL = `
create table if not exists public.diagnostico_leads (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  nome_completo         text not null,
  empresa               text,
  email                 text not null,
  whatsapp              text not null,
  imoveis_administrados text,
  colaboradores         integer,
  cidade                text,
  estado                text,
  pontuacao_final       integer not null,
  nivel_maturidade      text,
  pontuacoes_modulos    jsonb not null default '{}'::jsonb,
  respostas             jsonb not null default '{}'::jsonb,
  horas_desperdicadas   integer,
  observacao_closer     text,
  observacao_manual     text,
  status                text not null default 'novo',
  responsavel           text
);
create index if not exists diagnostico_leads_created_at_idx on public.diagnostico_leads (created_at desc);
create index if not exists diagnostico_leads_status_idx on public.diagnostico_leads (status);
create index if not exists diagnostico_leads_email_idx on public.diagnostico_leads (email);
`;

export async function ensureDiagnosticoSchema(client: Client) {
  if (schemaReady) return;
  await client.query(SCHEMA_SQL);
  schemaReady = true;
}

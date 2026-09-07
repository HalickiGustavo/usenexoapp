import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/db-check")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { withExternalDb } = await import("@/lib/external-db.server");
          const now = await withExternalDb(async (client) => {
            const r = await client.query<{ now: string }>("select now() as now");
            return r.rows[0]?.now ?? null;
          });
          return Response.json({ ok: true, now });
        } catch (err) {
          return Response.json({ ok: false, error: (err as Error).message });
        }
      },
    },
  },
});

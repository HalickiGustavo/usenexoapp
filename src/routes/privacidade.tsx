import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Nexo" },
      { name: "description", content: "Saiba como a Nexo trata dados pessoais e cookies de publicidade." },
      { property: "og:title", content: "Política de Privacidade | Nexo" },
      { property: "og:description", content: "Informações sobre dados pessoais e cookies usados pela Nexo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <article className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm font-medium text-primary-glow">← Voltar para a Nexo</Link>
        <h1 className="mt-8 font-display text-4xl font-bold">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-muted-foreground">Última atualização: 14 de setembro de 2026</p>

        <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Dados enviados por você</h2>
            <p className="mt-2">Ao preencher nossos formulários, tratamos nome, e-mail, WhatsApp e informações da sua operação para responder ao contato, preparar o diagnóstico solicitado e prestar atendimento.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Medição de publicidade</h2>
            <p className="mt-2">Com sua autorização, a Google recebe dados técnicos sobre visitas e conversões para medir o desempenho dos anúncios e melhorar campanhas. Não enviamos nome, e-mail ou WhatsApp nessa medição.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Suas escolhas</h2>
            <p className="mt-2">Quando exigido na sua região, a medição publicitária permanece desativada até sua escolha. Você pode recusar sem prejuízo ao uso do site e alterar a decisão posteriormente.</p>
            <button type="button" className="mt-3 text-sm font-semibold text-primary-glow underline underline-offset-4" onClick={() => window.dispatchEvent(new Event("nexo:cookie-settings"))}>
              Alterar preferências de cookies
            </button>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Seus direitos</h2>
            <p className="mt-2">Você pode solicitar acesso, correção ou exclusão dos seus dados e retirar autorizações concedidas. Para isso, entre em contato pelos canais oficiais da Nexo.</p>
          </section>
        </div>
      </article>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/nexo-logo.png.asset.json";
import {
  Building2,
  Users,
  Wallet,
  FileText,
  Bell,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Check,
  ArrowRight,
  Sparkles,
  KeyRound,
  MessageSquare,
  Star,
  X,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexo — Gestão de imóveis alugados, 100% gratuita" },
      {
        name: "description",
        content:
          "App de gestão de aluguéis para imobiliárias e proprietários autônomos. Contratos, cobranças, repasses e inquilinos em um só lugar. Sem custo.",
      },
      { property: "og:title", content: "Nexo — Gestão de imóveis alugados" },
      {
        property: "og:description",
        content:
          "Toda a gestão dos seus aluguéis feita pelo app. Grátis para imobiliárias e proprietários.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <ForWho />
        <Testimonials />
        <Pricing />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <LiveToast />
    </div>
  );
}

function LiveToast() {
  const messages = [
    "+1 inquilino usando a Nexo nesse exato momento",
    "+1 imobiliária acabou de se cadastrar",
    "+1 proprietário começou a usar agora",
    "+1 contrato assinado pelo app",
    "+1 boleto pago através da Nexo",
  ];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const show = () => {
      setVisible(true);
      timeoutId = setTimeout(() => {
        setVisible(false);
        timeoutId = setTimeout(() => {
          setIndex((i) => (i + 1) % messages.length);
          show();
        }, 18000);
      }, 6000);
    };
    const initial = setTimeout(show, 5000);
    return () => {
      clearTimeout(initial);
      clearTimeout(timeoutId);
    };
  }, [dismissed, messages.length]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 sm:max-w-sm ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-elevated/95 p-3 pr-2 shadow-card backdrop-blur-xl">
        <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
          <UserPlus className="h-4 w-4 text-primary-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-tight text-foreground">{messages[index]}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Atividade ao vivo · agora mesmo</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-surface hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TopBanner() {
  return (
    <div className="relative z-50 border-b border-primary/20 bg-gradient-brand">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-medium text-primary-foreground sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
        <span>
          <strong>100% grátis</strong> para proprietários e imobiliárias — pague apenas a{" "}
          <strong>Taxa de Gestão Digital da Locação</strong>, já inclusa no boleto do inquilino.
        </span>
      </div>
    </div>
  );
}

function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="Nexo"
      width={size}
      height={size}
      className="rounded-xl"
      style={{ width: size, height: size }}
    />
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <span className="font-display text-xl font-bold tracking-tight">
            NE<span className="text-primary-glow">X</span>O
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#recursos" className="transition hover:text-foreground">Recursos</a>
          <a href="#para-quem" className="transition hover:text-foreground">Para quem é</a>
          <a href="#precos" className="transition hover:text-foreground">Preços</a>
          <a href="#como-funciona" className="transition hover:text-foreground">Como funciona</a>
          <a href="#faq" className="transition hover:text-foreground">FAQ</a>
        </nav>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
        >
          Baixar grátis
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-32 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-28 text-center">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          A gestão dos seus{" "}
          <span className="text-gradient">aluguéis</span>,
          <br />
          em um só lugar.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          O Nexo conecta proprietários, imobiliárias e inquilinos em uma plataforma simples.
          Contratos, cobranças e repasses — tudo no seu celular.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Começar agora — é grátis
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface"
          >
            Ver como funciona
          </a>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="animate-float opacity-90">
            <Logo size={96} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "R$ 0", label: "de mensalidade" },
    { value: "100%", label: "gestão pelo app" },
    { value: "24/7", label: "acesso de qualquer lugar" },
    { value: "1 app", label: "para tudo" },
  ];
  return (
    <section className="border-y border-border/40 bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-bold text-foreground md:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Building2,
      title: "Cadastro de imóveis",
      desc: "Organize todo o seu portfólio com fotos, documentos e status em tempo real.",
    },
    {
      icon: FileText,
      title: "Contratos digitais",
      desc: "Crie, gerencie e assine contratos de locação direto no app, com total segurança.",
    },
    {
      icon: Wallet,
      title: "Cobranças automáticas",
      desc: "Boletos, Pix e repasses gerados automaticamente. Você só acompanha.",
    },
    {
      icon: Users,
      title: "Gestão de inquilinos",
      desc: "Histórico, contatos, pagamentos e ocorrências de cada inquilino organizados.",
    },
    {
      icon: Bell,
      title: "Notificações inteligentes",
      desc: "Avisos de vencimento, atrasos e renovações para você nunca perder um prazo.",
    },
    {
      icon: BarChart3,
      title: "Relatórios completos",
      desc: "Acompanhe receita, inadimplência e desempenho de cada imóvel em segundos.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação centralizada",
      desc: "Converse com inquilinos e proprietários sem sair do app.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança total",
      desc: "Seus dados e contratos protegidos com criptografia de ponta a ponta.",
    },
  ];

  return (
    <section id="recursos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Recursos
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tudo o que você precisa para gerir aluguéis
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma plataforma completa, pensada para quem vive de locação — sem planilhas,
            sem papelada, sem dor de cabeça.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-surface p-6 transition hover:border-primary/50 hover:bg-surface-elevated"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const cards = [
    {
      icon: KeyRound,
      title: "Proprietários autônomos",
      bullets: [
        "Gerencie seus próprios imóveis sem depender de imobiliária",
        "Receba pagamentos diretamente, sem taxas escondidas",
        "Controle financeiro completo na palma da mão",
      ],
    },
    {
      icon: Building2,
      title: "Imobiliárias",
      bullets: [
        "Centralize toda a carteira de imóveis e clientes",
        "Equipe organizada com permissões e tarefas",
        "Mais produtividade, menos planilhas",
      ],
    },
  ];

  return (
    <section id="para-quem" className="relative py-28">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Para quem é
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Feito para quem aluga.
            <br /> Grátis para todos.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="glass rounded-3xl p-8 shadow-card transition hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
                <c.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold">{c.title}</h3>
              <ul className="mt-6 space-y-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-glow" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Carolina Mendes",
      role: "Proprietária autônoma · 4 imóveis",
      city: "São Paulo, SP",
      quote:
        "Saí das planilhas e nunca mais voltei. Recebo o repasse direto na conta e acompanho tudo do celular. O melhor: não pago nada.",
      initials: "CM",
    },
    {
      name: "Imobiliária Vértice",
      role: "Rafael Souza · Diretor",
      city: "Curitiba, PR",
      quote:
        "Em 2 meses migramos toda a carteira para o Nexo. A equipe ficou mais produtiva e os proprietários adoram a transparência do split.",
      initials: "IV",
    },
    {
      name: "Juliana Tavares",
      role: "Proprietária autônoma · 2 imóveis",
      city: "Belo Horizonte, MG",
      quote:
        "Os inquilinos pagam sem reclamar porque tudo é claro. A taxa já vem no boleto e eu recebo o líquido na hora. Simples assim.",
      initials: "JT",
    },
    {
      name: "Habitat Imóveis",
      role: "Marina Lopes · Gestora de locação",
      city: "Florianópolis, SC",
      quote:
        "O split automático resolveu nosso maior problema: conciliação. Cada parte recebe direto e a cobrança é praticamente automática.",
      initials: "HI",
    },
    {
      name: "Eduardo Pacheco",
      role: "Proprietário autônomo · 1 imóvel",
      city: "Porto Alegre, RS",
      quote:
        "Tenho apenas um apartamento alugado e o Nexo me dá controle total. Contrato digital, boleto e relatório, tudo no app.",
      initials: "EP",
    },
    {
      name: "Aliança Negócios Imobiliários",
      role: "Patrícia Reis · CEO",
      city: "Recife, PE",
      quote:
        "Atendimento próximo e plataforma estável. Os proprietários da nossa carteira passaram a confiar muito mais no processo.",
      initials: "AN",
    },
  ];

  return (
    <section id="depoimentos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Quem usa, aprova
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Imobiliárias e proprietários
            <br /> que já vivem a Nexo
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary-glow text-primary-glow" />
              ))}
            </div>
            <span className="text-sm">
              <strong className="text-foreground">4.9/5</strong> de satisfação
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 transition hover:border-primary/40 hover:bg-surface-elevated"
            >
              <div className="mb-3 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-primary-foreground">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {t.role} · {t.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const parts = [
    { label: "Nexo", desc: "Taxa de serviço da plataforma" },
    { label: "Imobiliária", desc: "Comissão de administração (quando houver)" },
    { label: "Proprietário", desc: "Valor líquido do aluguel" },
  ];
  return (
    <section id="precos" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Modelo de cobrança
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Grátis para você.
            <br /> Pago pelo inquilino.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Proprietários e imobiliárias <strong className="text-foreground">não pagam nada</strong> para usar o Nexo.
            O inquilino paga a <strong className="text-foreground">Taxa de Gestão Digital da Locação</strong> —
            apenas <strong className="text-foreground">R$ 24,90</strong>, já inclusa automaticamente no boleto do aluguel.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-surface p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated">
              <Wallet className="h-6 w-6 text-primary-glow" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Taxa de Gestão Digital da Locação
            </div>
            <h3 className="mt-2 font-display text-3xl font-semibold">R$ 24,90 <span className="text-base font-normal text-muted-foreground">/ inquilino</span></h3>
            <p className="mt-3 text-muted-foreground">
              Uma taxa única e transparente, cobrada do inquilino dentro do próprio boleto.
              Sem mensalidade, sem setup, sem surpresas para você.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Proprietário não paga nada",
                "Imobiliária não paga nada",
                "Taxa já embutida no boleto do aluguel",
                "Sem cobranças escondidas",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-glow" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/60 bg-surface p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated">
              <ShieldCheck className="h-6 w-6 text-primary-glow" />
            </div>
            <h3 className="font-display text-2xl font-semibold">Split automático de pagamentos</h3>
            <p className="mt-3 text-muted-foreground">
              O inquilino paga um único boleto. Nosso sistema divide o valor automaticamente
              entre as 3 partes — o dinheiro <strong className="text-foreground">nunca passa pela conta da Nexo</strong>.
            </p>
            <div className="mt-6 space-y-3">
              {parts.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3"
                >
                  <div>
                    <div className="font-semibold">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                  <Check className="h-5 w-5 text-primary-glow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Modelo 100% transparente: cada parte recebe direto na sua conta, sem intermediação financeira da Nexo.
        </p>
      </div>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Baixe o app",
      desc: "Disponível para Android e iOS. Crie sua conta em menos de 1 minuto.",
    },
    {
      n: "02",
      title: "Cadastre seus imóveis",
      desc: "Adicione propriedades, inquilinos e contratos com poucos toques.",
    },
    {
      n: "03",
      title: "Gerencie tudo pelo celular",
      desc: "Cobranças, repasses e comunicação acontecem automaticamente no app.",
    },
  ];

  return (
    <section id="como-funciona" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Começar leva menos de 5 minutos
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-2xl border border-border/60 bg-surface p-8">
                <div className="font-display text-5xl font-bold text-gradient">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary-glow md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "O Nexo é realmente gratuito para mim?",
      a: "Sim. Proprietários e imobiliárias não pagam nada. O inquilino paga a Taxa de Gestão Digital da Locação — R$ 24,90 — que já vem inclusa automaticamente no boleto do aluguel.",
    },
    {
      q: "Como funciona o split de pagamentos?",
      a: "O inquilino paga um único boleto e nosso sistema divide o valor automaticamente em 3 partes: Nexo, imobiliária e proprietário. O dinheiro nunca passa pela conta da Nexo — cada parte recebe direto na sua conta.",
    },
    {
      q: "Preciso de equipamento ou sistema adicional?",
      a: "Não. Tudo funciona direto no seu celular — basta baixar o app e cadastrar seus imóveis.",
    },
    {
      q: "Posso usar mesmo tendo apenas 1 imóvel?",
      a: "Sim! O Nexo é ideal tanto para proprietários autônomos com 1 imóvel quanto para imobiliárias com grandes carteiras.",
    },
    {
      q: "Como funcionam as cobranças?",
      a: "Geramos boletos e Pix automaticamente para os inquilinos e organizamos o repasse para o proprietário, tudo dentro do app.",
    },
    {
      q: "Meus dados estão seguros?",
      a: "Sim. Usamos criptografia de ponta e seguimos as melhores práticas de segurança e LGPD.",
    },
  ];

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Dúvidas frequentes
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border/60 bg-surface p-6 transition open:bg-surface-elevated"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold">
                {item.q}
                <span className="ml-4 text-primary-glow transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Smartphone className="mx-auto mb-6 h-12 w-12 text-primary-glow" />
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          Sua gestão de aluguéis,
          <br />
          <span className="text-gradient">simples como deveria ser.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Junte-se a milhares de proprietários e imobiliárias que já trocaram planilhas
          pelo Nexo. Sem custos. Sem complicação.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            Baixar para Android
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-8 py-4 text-base font-semibold text-foreground transition hover:bg-surface-elevated"
          >
            Baixar para iOS
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          100% gratuito • Sem cartão de crédito • Cancele quando quiser
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display font-bold">
            NE<span className="text-primary-glow">X</span>O
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nexo. Gestão de imóveis alugados.
        </p>
      </div>
    </footer>
  );
}

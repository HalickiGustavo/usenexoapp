import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/nexo-logo-v4.png.asset.json";
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
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <WhatsAppFloat />
    </div>
  );
}

function WhatsAppFloat() {
  const phone = "5541998766169";
  const message = encodeURIComponent(
    "Olá! Vim pelo site da Nexo e gostaria de tirar algumas dúvidas."
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com atendente da Nexo no WhatsApp"
      className="group fixed bottom-4 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="hidden rounded-full border border-[#25D366]/30 bg-white px-4 py-2 text-sm font-medium text-[#0a0e2a] shadow-card sm:inline-block">
        Envie uma mensagem aqui 👋
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow transition hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 opacity-40" />
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.99 2.722.99.358 0 2.13-.5 2.13-1.49 0-.043 0-.115-.03-.158-.1-.172-2.05-.93-2.236-.93zM16.225 4C9.466 4 4 9.466 4 16.225c0 2.4.71 4.643 1.926 6.527L4 28.225l5.652-1.842a12.057 12.057 0 0 0 6.573 1.913c6.76 0 12.226-5.466 12.226-12.225C28.45 9.466 22.984 4 16.225 4zm0 22.398a10.13 10.13 0 0 1-5.523-1.626l-.4-.243-3.353 1.075 1.09-3.267-.258-.415a10.097 10.097 0 0 1-1.555-5.397c0-5.59 4.547-10.137 10.138-10.137 5.59 0 10.137 4.547 10.137 10.137 0 5.59-4.547 10.137-10.275 10.137z" />
        </svg>
      </span>
    </a>
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
          <strong>100% grátis</strong> para proprietários e imobiliárias —
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 bg-slate-50">
        <a href="#" className="flex w-1/2 items-center">
          <img
            src={logoAsset.url}
            alt="Nexo"
            className="h-auto w-full max-w-[260px] object-contain"
          />
          <span className="sr-only">Nexo</span>
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

      <div className="relative mx-auto max-w-5xl px-6 pt-6 pb-20 sm:pt-10 sm:pb-28 text-center">
        <h1 className="mx-auto max-w-3xl font-display text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
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
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition hover:opacity-90 text-slate-50 bg-[#7C51FE]"
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
    {
      icon: Wallet,
      value: "R$ 0",
      label: "de mensalidade",
      desc: "Sem taxa fixa, sem fidelidade. Você só paga se receber.",
    },
    {
      icon: Smartphone,
      value: "100%",
      label: "gestão pelo app",
      desc: "Cobrança, repasse, contratos e inquilinos no seu bolso.",
    },
    {
      icon: ShieldCheck,
      value: "24/7",
      label: "acesso de qualquer lugar",
      desc: "Dados protegidos e disponíveis quando você precisar.",
    },
    {
      icon: Sparkles,
      value: "1 app",
      label: "para tudo",
      desc: "Substitui planilhas, grupos de WhatsApp e sistemas antigos.",
    },
  ];

  const benefits = [
    { icon: Check, title: "Reduz inadimplência", desc: "Lembretes automáticos por WhatsApp, e-mail e push." },
    { icon: Check, title: "Economiza horas por semana", desc: "Boletos, recibos e repasses gerados sozinhos." },
    { icon: Check, title: "Zero papelada", desc: "Contratos digitais com assinatura eletrônica válida." },
    { icon: Check, title: "Decisões com dados", desc: "Veja receita, ocupação e atrasos em tempo real." },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Por que escolher a Nexo
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Tudo que você precisa para alugar sem dor de cabeça
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Feito para proprietários autônomos e imobiliárias que querem profissionalizar
            a gestão sem gastar mais por isso.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {stats.map((s, i) => (
              <CarouselItem key={s.label} className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/4">
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated/80 p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-foreground">{s.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        <div className="mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-surface-elevated/60 p-4 backdrop-blur-sm sm:grid-cols-4 lg:p-5">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-2">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <b.icon className="h-3 w-3" strokeWidth={3} />
              </div>
              <div>
                <div className="text-xs font-semibold leading-tight text-foreground">{b.title}</div>
                <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
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
    <section id="recursos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Recursos
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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
    <section id="para-quem" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Para quem é
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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
    <section id="depoimentos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Quem usa, aprova
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}

function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: {
    name: string;
    role: string;
    city: string;
    quote: string;
    initials: string;
  }[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  return (
    <div
      className="mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="w-full flex-shrink-0 px-2 sm:px-6">
              <figure className="mx-auto flex max-w-3xl flex-col rounded-3xl border border-border/60 bg-surface p-8 md:p-10">
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-glow text-primary-glow" />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border/40 pt-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-base font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{t.name}</div>
                    <div className="truncate text-sm text-muted-foreground">
                      {t.role} · {t.city}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-surface-elevated"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-primary-glow" : "w-2 bg-border hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Próximo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-surface-elevated"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}


function Pricing() {
  const parts = [
    { label: "Nexo", desc: "Taxa de serviço da plataforma" },
    { label: "Imobiliária", desc: "Comissão de administração (quando houver)" },
    { label: "Proprietário", desc: "Valor líquido do aluguel" },
  ];
  return (
    <section id="precos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Modelo de cobrança
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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
    <section id="como-funciona" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-glow">
            Dúvidas frequentes
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
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
    <section id="cta" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Smartphone className="mx-auto mb-6 h-12 w-12 text-primary-glow" />
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl">
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Clock,
  Shield,
  Gauge,
  Building2,
  MessageSquare,
  Wallet,
  Bell,
  Workflow,
  Cpu,
  TrendingUp,
  User,
  KeyRound,
  BarChart3,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico NEXO 360 — Avalie a eficiência da sua imobiliária" },
      {
        name: "description",
        content:
          "Em 5 minutos receba um diagnóstico completo da sua imobiliária com nota, análise por setor e recomendações para escalar.",
      },
      {
        property: "og:title",
        content: "Diagnóstico NEXO 360",
      },
      {
        property: "og:description",
        content:
          "Diagnóstico gratuito de maturidade digital para imobiliárias — análise por setor, gargalos e oportunidades.",
      },
    ],
  }),
  component: DiagnosticoPage,
});

// ---------- Data ----------

type Option = { label: string; score: number };
type Question = { id: string; text: string; options: Option[] };
type Module = {
  id: string;
  name: string;
  icon: typeof Building2;
  description: string;
  questions: Question[];
};

const FREQ5: Option[] = [
  { label: "Nunca", score: 100 },
  { label: "Raramente", score: 80 },
  { label: "Às vezes", score: 55 },
  { label: "Frequentemente", score: 25 },
  { label: "Sempre", score: 0 },
];
const FREQ5_POS: Option[] = [
  { label: "Sempre", score: 100 },
  { label: "Na maioria", score: 75 },
  { label: "Às vezes", score: 50 },
  { label: "Poucas vezes", score: 25 },
  { label: "Nunca", score: 0 },
];
const YESPART: Option[] = [
  { label: "Sim", score: 100 },
  { label: "Parcialmente", score: 50 },
  { label: "Não", score: 0 },
];
const YESNO: Option[] = [
  { label: "Sim", score: 100 },
  { label: "Não", score: 0 },
];
const TIME: Option[] = [
  { label: "Menos de 5 min", score: 100 },
  { label: "Até 30 min", score: 70 },
  { label: "Até 1 hora", score: 40 },
  { label: "Mais de 1 hora", score: 10 },
];

const modules: Module[] = [
  {
    id: "organizacao",
    name: "Organização",
    icon: Building2,
    description: "Como suas informações e documentos estão estruturados.",
    questions: [
      { id: "o1", text: "Você utiliza planilhas para controlar processos?", options: FREQ5 },
      { id: "o2", text: "As informações ficam espalhadas entre WhatsApp, e-mails e documentos?", options: [
        { label: "Nunca", score: 100 }, { label: "Pouco", score: 75 }, { label: "Médio", score: 50 }, { label: "Muito", score: 25 }, { label: "Sempre", score: 0 },
      ] },
      { id: "o3", text: "Os contratos estão centralizados em um só lugar?", options: YESPART },
      { id: "o4", text: "Você já perdeu documentos importantes?", options: [
        { label: "Nunca", score: 100 }, { label: "Algumas vezes", score: 50 }, { label: "Frequentemente", score: 0 },
      ] },
      { id: "o5", text: "Sua equipe encontra rapidamente qualquer informação?", options: FREQ5_POS },
    ],
  },
  {
    id: "atendimento",
    name: "Atendimento",
    icon: MessageSquare,
    description: "Qualidade e centralização da comunicação com clientes.",
    questions: [
      { id: "a1", text: "O atendimento acontece em um único canal centralizado?", options: YESPART },
      { id: "a2", text: "Quanto tempo, em média, sua equipe leva para responder clientes?", options: [
        { label: "Imediato", score: 100 }, { label: "Em até 1h", score: 75 }, { label: "No mesmo dia", score: 45 }, { label: "Mais de 1 dia", score: 10 },
      ] },
      { id: "a3", text: "Os clientes precisam repetir informações ao falar com a equipe?", options: FREQ5 },
      { id: "a4", text: "Existe histórico organizado de cada cliente?", options: YESPART },
      { id: "a5", text: "Proprietários ligam frequentemente para pedir informações?", options: FREQ5 },
    ],
  },
  {
    id: "financeiro",
    name: "Financeiro",
    icon: Wallet,
    description: "Eficiência na emissão, conciliação e controle financeiro.",
    questions: [
      { id: "f1", text: "Como os boletos são emitidos?", options: [
        { label: "Automático", score: 100 }, { label: "Terceirizado", score: 60 }, { label: "Manual", score: 10 },
      ] },
      { id: "f2", text: "Existe conciliação bancária automática?", options: YESPART },
      { id: "f3", text: "Quanto tempo é gasto por semana cobrando inadimplentes?", options: [
        { label: "Pouco — quase tudo automático", score: 100 }, { label: "Algumas horas", score: 60 }, { label: "Muitas horas", score: 20 }, { label: "Praticamente o tempo todo", score: 0 },
      ] },
      { id: "f4", text: "Existe controle financeiro em tempo real?", options: YESPART },
    ],
  },
  {
    id: "cobranca",
    name: "Cobrança",
    icon: Bell,
    description: "Nível de automação na régua de cobrança e notificações.",
    questions: [
      { id: "c1", text: "Existe régua de cobrança automática?", options: YESNO },
      { id: "c2", text: "Notificações automáticas para inquilinos?", options: YESNO },
      { id: "c3", text: "Multas calculadas automaticamente?", options: YESNO },
      { id: "c4", text: "Juros calculados automaticamente?", options: YESNO },
      { id: "c5", text: "Cobrança via WhatsApp automatizada?", options: YESNO },
      { id: "c6", text: "Cobrança via e-mail automatizada?", options: YESNO },
    ],
  },
  {
    id: "processos",
    name: "Processos",
    icon: Workflow,
    description: "Padronização, treinamentos e dependência operacional.",
    questions: [
      { id: "p1", text: "Existe checklist documentado para os principais processos?", options: YESPART },
      { id: "p2", text: "Os fluxos são padronizados entre a equipe?", options: YESPART },
      { id: "p3", text: "Há treinamentos recorrentes para colaboradores?", options: YESPART },
      { id: "p4", text: "Sua operação depende de pessoas específicas para funcionar?", options: FREQ5 },
      { id: "p5", text: "Há retrabalho frequente?", options: FREQ5 },
    ],
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    icon: Cpu,
    description: "Quais ferramentas digitais sua imobiliária utiliza hoje.",
    questions: [
      { id: "t1", text: "Vocês utilizam planilhas como base principal de gestão?", options: FREQ5 },
      { id: "t2", text: "Utilizam um sistema ERP imobiliário?", options: YESPART },
      { id: "t3", text: "Utilizam assinatura digital de contratos?", options: YESNO },
      { id: "t4", text: "Possuem portal do proprietário?", options: YESNO },
      { id: "t5", text: "Possuem portal do inquilino?", options: YESNO },
      { id: "t6", text: "Possuem aplicativo para clientes?", options: YESNO },
    ],
  },
  {
    id: "escalabilidade",
    name: "Escalabilidade",
    icon: TrendingUp,
    description: "Tempo médio para executar tarefas-chave.",
    questions: [
      { id: "e1", text: "Quanto tempo leva para cadastrar um contrato?", options: TIME },
      { id: "e2", text: "Quanto tempo leva para abrir uma manutenção?", options: TIME },
      { id: "e3", text: "Quanto tempo leva para emitir um boleto?", options: TIME },
      { id: "e4", text: "Quanto tempo leva para localizar um documento?", options: TIME },
      { id: "e5", text: "Quanto tempo leva para fechar uma locação?", options: [
        { label: "Mesmo dia", score: 100 }, { label: "Até 3 dias", score: 70 }, { label: "Até 1 semana", score: 40 }, { label: "Mais de 1 semana", score: 10 },
      ] },
    ],
  },
  {
    id: "proprietario",
    name: "Experiência do Proprietário",
    icon: User,
    description: "O que o proprietário consegue acompanhar online.",
    questions: [
      { id: "pr1", text: "O proprietário acompanha recebimentos online?", options: YESPART },
      { id: "pr2", text: "Tem acesso a extratos digitais?", options: YESPART },
      { id: "pr3", text: "Tem acesso aos documentos online?", options: YESPART },
      { id: "pr4", text: "Pode acompanhar chamados/manutenções?", options: YESPART },
      { id: "pr5", text: "Pode visualizar contratos online?", options: YESPART },
    ],
  },
  {
    id: "inquilino",
    name: "Experiência do Inquilino",
    icon: KeyRound,
    description: "O que o inquilino consegue resolver sozinho.",
    questions: [
      { id: "in1", text: "Inquilino consegue emitir 2ª via de boleto sozinho?", options: YESNO },
      { id: "in2", text: "Pode abrir manutenção pelo app/portal?", options: YESNO },
      { id: "in3", text: "Pode enviar documentos digitalmente?", options: YESNO },
      { id: "in4", text: "Pode conversar diretamente com a imobiliária pelo app?", options: YESNO },
      { id: "in5", text: "Recebe notificações automáticas?", options: YESNO },
    ],
  },
  {
    id: "gestao",
    name: "Gestão",
    icon: BarChart3,
    description: "Indicadores que o gestor acompanha em tempo real.",
    questions: [
      { id: "g1", text: "O gestor acompanha vacância em tempo real?", options: YESPART },
      { id: "g2", text: "Acompanha inadimplência em tempo real?", options: YESPART },
      { id: "g3", text: "Acompanha receita e lucro consolidados?", options: YESPART },
      { id: "g4", text: "Acompanha produtividade da equipe?", options: YESPART },
      { id: "g5", text: "Possui dashboard de indicadores estratégicos?", options: YESPART },
    ],
  },
];

type LeadInfo = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  imoveis: string;
  colaboradores: string;
  cidade: string;
  estado: string;
};

const STORAGE_KEY = "nexo-diagnostico-v1";

// ---------- Page ----------

function DiagnosticoPage() {
  const totalSteps = 1 + modules.length + 1; // lead + modules + result
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<LeadInfo>({
    nome: "", empresa: "", email: "", whatsapp: "", imoveis: "", colaboradores: "", cidade: "", estado: "",
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [started, setStarted] = useState(false);

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.lead) setLead(data.lead);
        if (data.answers) setAnswers(data.answers);
      }
    } catch {}
  }, []);

  // Save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lead, answers }));
    } catch {}
  }, [lead, answers]);

  const moduleScores = useMemo(() => {
    return modules.map((m) => {
      const scores = m.questions
        .map((q) => answers[q.id])
        .filter((v) => typeof v === "number");
      const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      return { id: m.id, name: m.name, score: Math.round(avg) };
    });
  }, [answers]);

  const overall = useMemo(() => {
    const valid = moduleScores.filter((m) => m.score > 0 || answers[modules.find(mm => mm.id === m.id)!.questions[0].id] !== undefined);
    const arr = valid.length ? valid : moduleScores;
    return Math.round(arr.reduce((a, b) => a + b.score, 0) / (arr.length || 1));
  }, [moduleScores, answers]);

  if (!started) {
    return <Landing onStart={() => setStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Topbar />
      <ProgressBar current={step + 1} total={totalSteps} />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {step === 0 && (
          <LeadStep
            lead={lead}
            setLead={setLead}
            onNext={() => setStep(1)}
          />
        )}
        {step >= 1 && step <= modules.length && (
          <ModuleStep
            key={modules[step - 1].id}
            module={modules[step - 1]}
            answers={answers}
            setAnswers={setAnswers}
            onBack={() => setStep((s) => s - 1)}
            onNext={() => setStep((s) => s + 1)}
            index={step}
            total={modules.length}
          />
        )}
        {step === totalSteps - 1 && (
          <ResultStep
            lead={lead}
            moduleScores={moduleScores}
            overall={overall}
          />
        )}
      </main>
    </div>
  );
}

// ---------- Landing ----------

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Topbar />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            Diagnóstico NEXO 360
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Descubra o nível de eficiência da sua imobiliária.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Em apenas 5 minutos você receberá gratuitamente um diagnóstico completo dos processos da sua imobiliária, com uma nota geral, análise por setor e recomendações para aumentar produtividade e reduzir custos.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
          >
            Iniciar Diagnóstico Gratuito
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
            {["Gratuito", "Leva apenas 5 minutos", "Resultado imediato", "Sem compromisso"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-violet-600" /> {t}
              </span>
            ))}
          </div>
        </div>
        <DashboardIllustration />
      </section>
    </div>
  );
}

function DashboardIllustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-200/60 via-violet-100/40 to-transparent blur-2xl" />
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-violet-900/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Eficiência</div>
            <div className="mt-1 text-3xl font-semibold text-slate-900">82<span className="text-base text-slate-400">/100</span></div>
          </div>
          <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Alta performance</div>
        </div>
        <div className="mt-6 space-y-3">
          {[
            { label: "Organização", v: 88 },
            { label: "Financeiro", v: 76 },
            { label: "Atendimento", v: 71 },
            { label: "Cobrança", v: 93 },
            { label: "Gestão", v: 80 },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-xs text-slate-600">
                <span>{b.label}</span><span className="font-medium">{b.v}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-violet-600" style={{ width: `${b.v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
          {[
            { i: Clock, t: "−148h", s: "/mês" },
            { i: Shield, t: "0", s: "perdas" },
            { i: Gauge, t: "4.8x", s: "eficiência" },
          ].map((x, idx) => (
            <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <x.i className="h-4 w-4 text-violet-600" />
              <div className="mt-1 text-sm font-semibold text-slate-900">{x.t}</div>
              <div className="text-[11px] text-slate-500">{x.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Shared UI ----------

function Topbar() {
  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">N</div>
          <span className="text-sm font-semibold tracking-tight">NEXO 360</span>
        </Link>
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">Voltar ao site</Link>
      </div>
    </header>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex justify-between text-xs font-medium text-slate-500">
          <span>Etapa {current} de {total}</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-violet-600 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ---------- Lead step ----------

function LeadStep({
  lead, setLead, onNext,
}: { lead: LeadInfo; setLead: (l: LeadInfo) => void; onNext: () => void }) {
  const required: (keyof LeadInfo)[] = ["nome", "empresa", "email", "whatsapp", "imoveis", "colaboradores", "cidade", "estado"];
  const isValid = required.every((k) => lead[k].trim() !== "");

  const update = (k: keyof LeadInfo, v: string) => setLead({ ...lead, [k]: v });

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-semibold tracking-tight">Antes de começar</h2>
      <p className="mt-2 text-slate-600">Precisamos de alguns dados para personalizar o seu diagnóstico.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" value={lead.nome} onChange={(v) => update("nome", v)} />
        <Field label="Empresa" value={lead.empresa} onChange={(v) => update("empresa", v)} />
        <Field label="E-mail" type="email" value={lead.email} onChange={(v) => update("email", v)} />
        <Field label="WhatsApp" value={lead.whatsapp} onChange={(v) => update("whatsapp", v)} placeholder="(11) 99999-9999" />
        <SelectField
          label="Imóveis administrados"
          value={lead.imoveis}
          onChange={(v) => update("imoveis", v)}
          options={["Até 50", "50–200", "200–500", "500–1000", "1000+"]}
        />
        <Field label="Quantidade de colaboradores" type="number" value={lead.colaboradores} onChange={(v) => update("colaboradores", v)} />
        <Field label="Cidade" value={lead.cidade} onChange={(v) => update("cidade", v)} />
        <Field label="Estado" value={lead.estado} onChange={(v) => update("estado", v)} placeholder="UF" />
      </div>
      <div className="mt-10 flex justify-end">
        <button
          disabled={!isValid}
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          Começar diagnóstico
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-violet-500/0 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />
    </label>
  );
}

function SelectField({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      >
        <option value="">Selecione...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

// ---------- Module step ----------

function ModuleStep({
  module, answers, setAnswers, onBack, onNext, index, total,
}: {
  module: Module;
  answers: Record<string, number>;
  setAnswers: (a: Record<string, number>) => void;
  onBack: () => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  const Icon = module.icon;
  const allAnswered = module.questions.every((q) => typeof answers[q.id] === "number");
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-violet-700">
              Módulo {index} de {total}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{module.name}</h2>
          </div>
        </div>
        <p className="mt-3 text-slate-600">{module.description}</p>

        <div className="mt-8 space-y-8">
          {module.questions.map((q, qi) => (
            <div key={q.id}>
              <div className="text-sm font-medium text-slate-900">
                <span className="text-violet-600">{qi + 1}.</span> {q.text}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setAnswers({ ...answers, [q.id]: opt.score })}
                      className={[
                        "group flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition",
                        selected
                          ? "border-violet-500 bg-violet-50 text-violet-900 ring-2 ring-violet-500/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/40",
                      ].join(" ")}
                    >
                      <span>{opt.label}</span>
                      <span className={[
                        "flex h-5 w-5 items-center justify-center rounded-full border transition",
                        selected ? "border-violet-600 bg-violet-600 text-white" : "border-slate-300 bg-white",
                      ].join(" ")}>
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <button
            disabled={!allAnswered}
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {index === total ? "Ver resultado" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Result ----------

function getMaturityLevel(score: number) {
  if (score <= 30) return { label: "Operação Crítica", emoji: "🔴", color: "bg-red-100 text-red-700 border-red-200", description: "Muitos processos manuais e alto risco operacional." };
  if (score <= 55) return { label: "Em Transição", emoji: "🟠", color: "bg-orange-100 text-orange-700 border-orange-200", description: "Alguns processos estruturados, mas ainda há gargalos importantes." };
  if (score <= 75) return { label: "Em Evolução", emoji: "🟡", color: "bg-yellow-100 text-yellow-700 border-yellow-200", description: "Boa organização, com oportunidades claras de automação." };
  if (score <= 90) return { label: "Alta Performance", emoji: "🟢", color: "bg-emerald-100 text-emerald-700 border-emerald-200", description: "Operação eficiente e bem estruturada." };
  return { label: "Referência Digital", emoji: "🟣", color: "bg-violet-100 text-violet-700 border-violet-200", description: "Imobiliária altamente escalável e orientada por dados." };
}

function ResultStep({
  lead, moduleScores, overall,
}: {
  lead: LeadInfo;
  moduleScores: { id: string; name: string; score: number }[];
  overall: number;
}) {
  const level = getMaturityLevel(overall);
  const lowest = [...moduleScores].sort((a, b) => a.score - b.score).slice(0, 5);

  // Hours wasted estimate: linear from 200h @ score 0 to 10h @ score 100
  const hoursWasted = Math.max(10, Math.round(200 - (overall * 190) / 100));
  const ftePct = Math.round((hoursWasted / 176) * 100);

  const radarData = moduleScores.map((m) => ({ subject: m.name, value: m.score, fullMark: 100 }));

  const wppMsg = encodeURIComponent(
    `Olá! Acabei de fazer o Diagnóstico NEXO 360. Minha empresa é ${lead.empresa || "—"} e minha nota foi ${overall}/100 (${level.label}). Gostaria de uma consultoria gratuita.`
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${level.color}`}>
          <span>{level.emoji}</span> {level.label}
        </div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Seu diagnóstico está pronto{lead.nome ? `, ${lead.nome.split(" ")[0]}` : ""}.
        </h2>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-white p-8 text-center shadow-sm sm:p-12">
        <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Score geral</div>
        <div className="mt-3 flex items-end justify-center gap-2">
          <span className="bg-gradient-to-br from-violet-700 to-violet-500 bg-clip-text text-7xl font-bold tracking-tighter text-transparent sm:text-8xl">{overall}</span>
          <span className="mb-3 text-2xl font-medium text-slate-400">/100</span>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          {overall < 56
            ? "Sua imobiliária possui um grande potencial de crescimento, porém identificamos gargalos operacionais que estão limitando sua produtividade."
            : overall < 76
            ? "Sua imobiliária já está bem estruturada, mas existem oportunidades claras para automatizar e escalar com mais eficiência."
            : "Sua operação está em alto nível. Vamos identificar oportunidades finas para consolidar a liderança no mercado."}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-semibold text-slate-900">Análise por setor</h3>
          <p className="text-sm text-slate-500">Veja como sua imobiliária se comporta em cada área avaliada.</p>
          <div className="mt-4 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="78%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} angle={90} />
                <Radar dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.35} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Principais gargalos
          </h3>
          <p className="text-sm text-slate-500">Áreas que mais limitam sua produtividade.</p>
          <div className="mt-4 space-y-2">
            {lowest.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-800">{m.name}</span>
                <span className="text-sm font-semibold text-slate-600">{m.score}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-2 text-violet-700"><Clock className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold text-slate-900">Tempo desperdiçado</h3>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Com base nas respostas informadas, estimamos que sua equipe desperdice aproximadamente:
          </p>
          <div className="mt-4 text-4xl font-bold text-slate-900">{hoursWasted}h<span className="text-base font-medium text-slate-400">/mês</span></div>
          <p className="mt-2 text-sm text-slate-500">em tarefas operacionais que poderiam ser automatizadas.</p>
        </div>
        <div className="rounded-3xl border border-violet-200 bg-violet-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2 text-white"><User className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold text-slate-900">Equivalente em pessoas</h3>
          </div>
          <p className="mt-3 text-sm text-slate-700">Essa perda representa aproximadamente:</p>
          <div className="mt-4 text-4xl font-bold text-violet-700">{(ftePct / 100).toFixed(1)} FTE</div>
          <p className="mt-2 text-sm text-slate-600">funcionário(s) em tempo integral dedicados apenas a processos repetitivos.</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Lightbulb className="h-5 w-5 text-violet-600" /> Oportunidades identificadas
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Automação financeira",
            "Centralização do atendimento",
            "Portal do proprietário",
            "Portal do inquilino",
            "Gestão inteligente",
            "Indicadores em tempo real",
          ].map((o) => (
            <div key={o} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">
              <Check className="h-4 w-4 text-violet-600" /> {o}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-8 text-center text-white shadow-2xl shadow-violet-700/30 sm:p-14">
        <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">Receba uma consultoria gratuita</h3>
        <p className="mx-auto mt-3 max-w-xl text-violet-100">
          Um especialista da NEXO irá analisar seu diagnóstico e apresentar oportunidades reais para aumentar a eficiência da sua operação.
        </p>
        <a
          href={`https://wa.me/5541999326209?text=${wppMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-violet-700 shadow-lg transition hover:bg-violet-50"
        >
          Falar com um especialista
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

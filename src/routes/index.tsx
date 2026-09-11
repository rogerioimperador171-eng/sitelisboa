import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import age18 from "@/assets/age-18-29-B0eLVV9c.webp.asset.json";
import age30 from "@/assets/age-30-39-DVhSF8y1.webp.asset.json";
import age40 from "@/assets/age-40-49-BZu1qR4K.webp.asset.json";
import age50 from "@/assets/age-50-plus-gMz1upqS.webp.asset.json";
import athletic from "@/assets/athletic-CGdrfS1O.webp.asset.json";
import defined from "@/assets/definied-Wrdw0qgP.webp.asset.json";
import strong from "@/assets/fuerte-B1Yz6GbB.webp.asset.json";
import slim from "@/assets/slim-cu9Pdo5-.webp.asset.json";
import bodyStrong from "@/assets/body-fuerte-final-BLl7dzYT.webp.asset.json";
import bodySoft from "@/assets/body-gelatina-CPG_ZEki.webp.asset.json";
import bodyOverweight from "@/assets/body-sobrepeso-DrHNUHQ2.webp.asset.json";
import bodySlim from "@/assets/body-slim-BOH2fEFZ.webp.asset.json";
import resultOne from "@/assets/transform-1-Ct1cnP5c.webp.asset.json";
import resultTwo from "@/assets/transform-2-Nb7vCTiU.webp.asset.json";
import resultThree from "@/assets/transform-3-B6XrRqoA.webp.asset.json";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://seguroamplopay.com/checkout/cmtvzevt9002k01psfvnz7p0i?offer=F7NZQ6X";

type Option = { label: string; detail?: string; emoji?: string; image?: string };
type Question = { id: string; question: string; options?: Option[]; fields?: { label: string; key: string; placeholder: string }[] };

const questions: Question[] = [
  { id: "age", question: "Select your age range to begin", options: [
    { label: "18–29 years", image: age18.url }, { label: "30–39 years", image: age30.url },
    { label: "40–49 years", image: age40.url }, { label: "50+ years", image: age50.url },
  ] },
  { id: "goal", question: "What is your main goal?", options: [
    { label: "Lose weight", detail: "Focus on fat loss and definition", emoji: "⚖️" },
    { label: "Build muscle", detail: "Hypertrophy and a strong foundation", emoji: "💪" },
    { label: "Lose fat and build muscle", detail: "Tactical body recomposition", emoji: "🔥" },
    { label: "Improve overall fitness", detail: "Energy, stamina, and daily performance", emoji: "⚡" },
  ] },
  { id: "body", question: "Which physique is closest to your ultimate goal?", options: [
    { label: "LEAN", image: slim.url }, { label: "ATHLETIC", image: athletic.url },
    { label: "DEFINED", image: defined.url }, { label: "STRONG", image: strong.url },
  ] },
  { id: "motivation", question: "What is your main motivation today?", options: [
    { label: "Look more attractive", emoji: "🔥" }, { label: "Have more energy", emoji: "⚡" },
    { label: "Project respect and authority", emoji: "🎖️" }, { label: "Health and longevity", emoji: "🛡️" },
  ] },
  { id: "frequency", question: "How often have you trained in the last 3 months?", options: [
    { label: "Almost every day", detail: "Maintaining high performance", emoji: "💪" },
    { label: "A few times a week", detail: "Trying to stay consistent", emoji: "🕒" },
    { label: "I trained, but stopped", detail: "My progress stalled", emoji: "⏳" },
    { label: "I am sedentary", detail: "I need a fresh starting point", emoji: "🛋️" },
  ] },
  { id: "water", question: "How many glasses of water do you drink per day?", options: [
    { label: "Fewer than 3", emoji: "🥵" }, { label: "4 to 6", emoji: "🧊" },
    { label: "7 to 10", emoji: "💧" }, { label: "More than 10", emoji: "🌊" },
  ] },
  { id: "sleep", question: "How would you rate your sleep after an exhausting workday?", options: [
    { label: "I wake up feeling crushed", detail: "My body still feels heavy", emoji: "😩" },
    { label: "Light and restless sleep", detail: "I cannot switch off from work", emoji: "😖" },
    { label: "I crash on the couch", detail: "I fall asleep before I can train", emoji: "😴" },
    { label: "Deep sleep, but no energy", detail: "I wake up drained", emoji: "🛌" },
  ] },
  { id: "weekly", question: "How many times a week do you plan to train?", options: [
    { label: "1–2 times", emoji: "📅" }, { label: "3–4 times", emoji: "💪" },
    { label: "5–6 times", emoji: "🔥" }, { label: "Every day", emoji: "🎖️" },
  ] },
  { id: "current", question: "How would you describe your current physique?", options: [
    { label: "SKINNY FAT", image: bodySlim.url }, { label: "SOFT BODY", image: bodySoft.url },
    { label: "OVERWEIGHT", image: bodyOverweight.url }, { label: "OUT OF SHAPE", image: bodyStrong.url },
  ] },
  { id: "stairs", question: "After climbing two flights of stairs, how does your body react?", options: [
    { label: "My heart races and I lose my breath", emoji: "🫁" },
    { label: "My legs feel heavy and weak", emoji: "🦵" },
    { label: "I make it, but feel exhausted", emoji: "💦" },
    { label: "I avoid the effort", emoji: "🚫" },
  ] },
  { id: "obstacle", question: "What has kept you from getting in shape?", options: [
    { label: "Toxic gym environment", emoji: "🏢" }, { label: "Mental exhaustion after work", emoji: "🧠" },
    { label: "No clear method", emoji: "🧭" }, { label: "No defined goal", emoji: "🎯" },
  ] },
  { id: "impact", question: "How does your current fitness affect your daily life?", options: [
    { label: "My clothes no longer fit", emoji: "👕" }, { label: "Fatigue and poor sleep", emoji: "😴" },
    { label: "Low self-esteem", emoji: "📉" }, { label: "Lack of energy and drive", emoji: "🔋" },
  ] },
  { id: "height", question: "What is your height?", fields: [{ label: "Height (cm)", key: "height", placeholder: "Example: 175" }] },
  { id: "weight", question: "What are your current and target weights?", fields: [
    { label: "Current weight (kg)", key: "currentWeight", placeholder: "Example: 90" },
    { label: "Target weight (kg)", key: "targetWeight", placeholder: "Example: 78" },
  ] },
  { id: "commitment", question: "How committed are you to transforming your body in the next 21 days?", options: [
    { label: "It is my #1 priority", emoji: "⚔️" }, { label: "I am 100% committed", emoji: "🛡️" },
  ] },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "The Recruit's Trick — 21-Day Fitness Assessment" },
    { name: "description", content: "Take the fitness assessment and discover your personalized 21-day tactical calisthenics plan." },
    { property: "og:title", content: "The Recruit's Trick — 21-Day Fitness Assessment" },
    { property: "og:description", content: "Discover your personalized 21-day tactical calisthenics plan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function checkoutWithTracking() {
  const target = new URL(CHECKOUT_URL);
  const current = new URLSearchParams(window.location.search);
  current.forEach((value, key) => {
    if (key.startsWith("utm_") || ["fbclid", "gclid", "src"].includes(key)) target.searchParams.set(key, value);
  });
  window.location.assign(target.toString());
}

function Index() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const question = questions[step];
  const progress = started ? Math.round(((step + 1) / questions.length) * 100) : 0;
  const selected = question ? answers[question.id] : undefined;
  const valuesReady = useMemo(() => question?.fields?.every((field) => answers[field.key]?.trim()) ?? false, [answers, question]);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [step, started, complete]);

  const advance = () => {
    if (step < questions.length - 1) setStep((value) => value + 1);
    else {
      setProcessing(true);
      window.setTimeout(() => { setProcessing(false); setComplete(true); }, 1800);
    }
  };

  const choose = (value: string) => {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
    window.setTimeout(advance, 240);
  };

  if (!started) return <Intro onStart={() => setStarted(true)} />;
  if (processing) return <Processing />;
  if (complete) return <Results onCheckout={checkoutWithTracking} />;
  if (!question) return null;

  return (
    <main className="quiz-shell min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-12 pt-5 sm:px-6 sm:pt-8">
        <header className="mb-8 flex items-center gap-4">
          <Button variant="ghost" aria-label="Go back" className="size-11 shrink-0 p-0" onClick={() => step > 0 ? setStep(step - 1) : setStarted(false)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
          <span className="w-10 text-right text-xs font-bold text-muted-foreground">{progress}%</span>
        </header>

        <section className="flex flex-1 flex-col" aria-labelledby="question-title">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-primary">Recruit assessment · {step + 1}/{questions.length}</p>
          <h1 id="question-title" className="mx-auto mb-7 max-w-xl text-center text-2xl font-black uppercase leading-tight sm:text-3xl">{question.question}</h1>

          {question.options && (
            <div className={`grid gap-3 ${question.options.some((item) => item.image) ? "grid-cols-2" : "grid-cols-1"}`}>
              {question.options.map((option) => (
                <Button key={option.label} variant="choice" onClick={() => choose(option.label)} aria-pressed={selected === option.label}
                  className={`relative h-auto w-full overflow-hidden ${option.image ? "flex-col p-0" : "justify-start"} ${selected === option.label ? "border-primary bg-accent" : ""}`}>
                  {option.image ? <img src={option.image} alt="" className="aspect-square w-full object-cover" /> : <span className="text-2xl" aria-hidden="true">{option.emoji}</span>}
                  <span className={option.image ? "flex min-h-14 w-full items-center justify-center px-2 text-center text-xs sm:text-sm" : "flex-1 py-0.5 text-left"}>
                    <span><strong className="block">{option.label}</strong>{option.detail && <small className="mt-1 block font-normal text-muted-foreground">{option.detail}</small>}</span>
                  </span>
                  {!option.image && <ChevronRight className="text-primary" size={19} />}
                </Button>
              ))}
            </div>
          )}

          {question.fields && (
            <div className="mx-auto w-full max-w-md space-y-5">
              {question.fields.map((field) => <label key={field.key} className="block text-sm font-bold text-muted-foreground">{field.label}
                <input inputMode="numeric" value={answers[field.key] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value.replace(/\D/g, "") }))}
                  placeholder={field.placeholder} className="mt-2 h-14 w-full rounded-lg border border-border bg-card px-4 text-lg text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring" />
              </label>)}
              <Button className="w-full" disabled={!valuesReady} onClick={advance}>Continue <ArrowRight size={19} /></Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return <main className="hero-surface min-h-screen px-4 py-8 sm:py-12">
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      <div className="status-badge mb-6"><span /> Recruitment open</div>
      <h1 className="max-w-3xl text-3xl font-black uppercase leading-tight sm:text-5xl">Fitness assessment: discover whether your body can activate <em>“The Recruit's Trick”</em> and armor your physique in <em>21 days.</em></h1>
      <div className="my-5 h-px w-16 bg-primary" />
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Answer these short questions to receive a <strong className="text-primary">personalized step-by-step plan</strong>, designed for your current level and fitness goal.</p>
      <div className="my-7 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card shadow-2xl"><img src={resultOne.url} alt="Before and after result from the 21-day training method" className="aspect-square w-full object-cover" /></div>
      <Button onClick={onStart} className="w-full max-w-sm">Start my assessment <ArrowRight size={20} /></Button>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole size={14} /> Free assessment · Your answers remain private</p>
      <Link to="/privacy" className="mt-8 text-xs text-muted-foreground underline underline-offset-4">Privacy Policy</Link>
    </section>
  </main>;
}

function Processing() {
  const [percent, setPercent] = useState(12);
  useEffect(() => { const timer = window.setInterval(() => setPercent((value) => Math.min(98, value + 7)), 120); return () => window.clearInterval(timer); }, []);
  return <main className="quiz-shell flex min-h-screen items-center justify-center px-5 text-center"><section className="w-full max-w-md">
    <ShieldCheck className="mx-auto mb-6 text-primary" size={50} /><p className="text-xs font-bold uppercase tracking-widest text-primary">The Recruit's Trick · 2026</p>
    <h1 className="mt-3 text-3xl font-black uppercase">Processing<br />recruitment</h1><p className="mt-3 text-muted-foreground">Verifying operational compatibility...</p>
    <div className="mt-8 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} /></div><p className="mt-3 font-mono text-sm text-primary">STATUS: ANALYZING · {percent}%</p>
  </section></main>;
}

function Results({ onCheckout }: { onCheckout: () => void }) {
  return <main className="quiz-shell min-h-screen px-4 py-8 sm:py-12"><section className="mx-auto w-full max-w-3xl text-center">
    <div className="status-badge mb-5"><span /> Profile approved</div>
    <h1 className="text-3xl font-black uppercase leading-tight sm:text-5xl">Your body is compatible with the <em>21-day tactical protocol.</em></h1>
    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Your answers show that a progressive bodyweight plan can help you rebuild strength, reduce body fat, and restore your energy at home.</p>
    <div className="my-8 grid grid-cols-3 gap-2 sm:gap-4">
      {[resultOne, resultTwo, resultThree].map((asset, index) => <img key={asset.url} src={asset.url} alt={`Student transformation result ${index + 1}`} className="aspect-[3/4] w-full rounded-md border border-border object-cover" />)}
    </div>
    <div className="mx-auto max-w-xl border-y border-border py-7 text-left"><h2 className="mb-5 text-center text-xl font-black uppercase">Your mission includes</h2>
      <ul className="space-y-4">{["A complete 21-day bodyweight training plan", "Short sessions designed for your current level", "Progressive movements you can perform at home", "A clear daily roadmap with no guesswork"].map((item) => <li key={item} className="flex gap-3"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check size={13} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>
    </div>
    <Button onClick={onCheckout} className="mt-8 w-full max-w-xl py-5 text-base sm:text-lg">Get instant access <ArrowRight size={21} /></Button>
    <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole size={14} /> Secure checkout · Immediate access</p>
    <Link to="/privacy" className="mt-8 inline-block text-xs text-muted-foreground underline underline-offset-4">Privacy Policy</Link>
  </section></main>;
}

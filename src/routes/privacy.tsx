import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — The Recruit's Trick" },
    { name: "description", content: "Privacy policy for The Recruit's Trick fitness assessment." },
    { property: "og:title", content: "Privacy Policy — The Recruit's Trick" },
    { property: "og:description", content: "How data is handled during The Recruit's Trick fitness assessment." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <main className="quiz-shell min-h-screen px-5 py-10"><article className="mx-auto max-w-2xl">
    <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={18} /> Back to assessment</Link>
    <h1 className="text-3xl font-black uppercase">Privacy Policy</h1><p className="mt-2 text-sm text-muted-foreground">Last updated: September 11, 2026</p>
    <div className="legal-copy mt-8 space-y-7">
      <section><h2>1. About this policy</h2><p>At The Recruit's Trick, we respect your privacy. This policy explains what information may be collected when you use our fitness assessment and how it is used.</p></section>
      <section><h2>2. Information we collect</h2><p>We may process your quiz answers, device type, campaign parameters, and navigation timestamps. The assessment does not ask for your name, email address, or phone number.</p></section>
      <section><h2>3. Cookies and tracking</h2><p>Cookies and advertising measurement tools may be used to understand campaign performance and improve the experience. You can disable cookies in your browser settings.</p></section>
      <section><h2>4. How information is used</h2><p>Information is used to personalize the assessment result, understand site performance, and measure advertising campaigns.</p></section>
      <section><h2>5. Service providers</h2><p>Limited technical data may be shared with providers that support site hosting, analytics, campaign attribution, and secure payment processing. We do not sell your personal information.</p></section>
      <section><h2>6. Your rights</h2><p>Depending on your location, you may have rights to access, correct, delete, or object to the processing of your personal information.</p></section>
      <section><h2>7. Age requirement</h2><p>This site is intended for adults aged 18 or older.</p></section>
      <section><h2>8. Updates</h2><p>We may update this policy periodically. The current version and its update date will always be shown on this page.</p></section>
    </div>
  </article></main>;
}
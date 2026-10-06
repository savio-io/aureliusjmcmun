import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGlobe from "@/assets/hero-globe.jpg";

export const Route = createFileRoute("/school-delegation")({
  head: () => ({
    meta: [
      { title: "School Delegation — Coming Soon · Aurelius MUN 2026" },
      { name: "description", content: "School Delegation registration for Aurelius MUN 2026 is coming soon." },
      { property: "og:title", content: "School Delegation — Coming Soon · Aurelius MUN 2026" },
      { property: "og:description", content: "School Delegation registration for Aurelius MUN 2026 opens soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchoolDelegationPage,
});

function SchoolDelegationPage() {
  return (
    <main className="surface-dark relative isolate flex min-h-screen flex-col overflow-hidden">
      <img src={heroGlobe} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col px-5 sm:px-8 lg:px-12">
        <header className="flex h-20 items-center justify-between gap-4 border-b border-line-dark">
          <Link to="/" className="display text-2xl text-ivory transition-colors hover:text-gold">AURELIUS <span className="text-gold">MUN</span></Link>
          <Link to="/" className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"><ArrowLeft size={14} /> Back</Link>
        </header>
        <div className="flex flex-1 flex-col justify-center py-20 animate-fade-up">
          <p className="eyebrow text-gold">School Delegation · Aurelius MUN 2026</p>
          <h1 className="display mt-7 max-w-4xl text-6xl sm:text-8xl lg:text-9xl">Coming <em className="text-gold">soon.</em></h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">School Delegation registration is coming soon. Please check back shortly.</p>
          <div className="mt-10">
            <Button asChild variant="bare" className="btn-gold w-full sm:w-auto"><Link to="/"><ArrowLeft size={16} /> Return to Homepage</Link></Button>
          </div>
        </div>
      </div>
      <footer className="px-5 py-8 text-center text-xs text-ivory/50">© 2026 Aurelius MUN</footer>
    </main>
  );
}

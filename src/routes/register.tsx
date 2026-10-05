import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { conference, fees } from "@/data/conference";
import heroGlobe from "@/assets/hero-globe.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registration — Aurelius MUN 2026" },
      { name: "description", content: "Registration information and delegate fees for Aurelius MUN 2026, 18–19 November in Greater Noida." },
      { property: "og:title", content: "Registration — Aurelius MUN 2026" },
      { property: "og:description", content: "Delegate registration information for Aurelius MUN 2026 in Greater Noida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="surface-dark relative isolate overflow-hidden">
        <img src={heroGlobe} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <header className="flex h-20 items-center justify-between gap-4 border-b border-line-dark">
            <Link to="/" className="display text-2xl text-ivory transition-colors hover:text-gold">AURELIUS <span className="text-gold">MUN</span></Link>
            <Link to="/" className="eyebrow inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold"><ArrowLeft size={14} /> <span className="hidden sm:inline">Back to conference</span><span className="sm:hidden">Back</span></Link>
          </header>
          <div className="pb-16 pt-20 sm:pb-24 sm:pt-28">
            <p className="eyebrow text-gold">Aurelius MUN · 18—19 November 2026</p>
            <h1 className="display mt-7 max-w-4xl text-6xl sm:text-8xl lg:text-9xl">Join the <em className="text-gold">conversation.</em></h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">Registration for the first edition of Aurelius MUN. We look forward to welcoming you to two days of debate, diplomacy and collaboration.</p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <p className="eyebrow text-gold">Registration · 2026</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl">Your place at <em>Aurelius.</em></h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{conference.dates} at {conference.venue.name}, {conference.venue.city}.</p>
            <div className="mt-10 border-t border-border pt-8">
              {conference.registrationUrl ? (
                <Button asChild variant="bare" className="btn-ink w-full sm:w-auto">
                  <a href={conference.registrationUrl} target="_blank" rel="noopener noreferrer">Proceed to Registration <ArrowUpRight size={16} /></a>
                </Button>
              ) : (
                <>
                  <Button variant="bare" className="btn-ink w-full opacity-60 sm:w-auto" disabled>Proceed to Registration <ArrowUpRight size={16} /></Button>
                  <p className="eyebrow mt-4 text-muted-foreground">Registration link coming soon</p>
                </>
              )}
            </div>
          </div>
          <div className="border-t border-border">
            <p className="eyebrow py-5 text-muted-foreground">Delegate fees</p>
            {fees.map((fee) => (
              <div key={fee.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-t border-border py-7">
                <div className="min-w-0">
                  <h3 className="display text-3xl sm:text-4xl">{fee.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{fee.note}</p>
                </div>
                <p className="display shrink-0 text-3xl text-gold sm:text-5xl">{fee.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="surface-dark px-5 py-8 text-center text-xs text-ivory/50">© 2026 Aurelius MUN</footer>
    </main>
  );
}
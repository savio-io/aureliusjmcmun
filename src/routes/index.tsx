import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGlobe from "@/assets/hero-globe.jpg";
import logo from "@/assets/aurelius-hero-logo.jpg";
import { Awards } from "@/components/Awards";
import dayWestern from "@/assets/day-western.jpg";
import dayTraditional from "@/assets/day-traditional.jpg";
import {
  conference,
  fees,
  schoolDelegation,
  feeNotes,
  registrationDates,
  committeePolicy,
  committees,
  days,
  secretariat,
  executiveBoard,
  schedule,
  navLinks,
} from "@/data/conference";
import { PORTRAIT_COLOR_DURATION_MS } from "@/lib/presentation-rules";
import { useRevealAll } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelius MUN 2026 — 18–19 November, Greater Noida" },
      {
        name: "description",
        content:
          "Aurelius MUN 2026: a two-day Model United Nations conference at Jesus and Mary Convent School, Greater Noida. UNGA, WHO and AIPPM.",
      },
      { property: "og:title", content: "Aurelius MUN 2026" },
      {
        property: "og:description",
        content: "Two days of debate and diplomacy. 18–19 November 2026, Greater Noida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const dayImages = [dayTraditional, dayWestern];

function Index() {
  useRevealAll();
  return (
    <div className="overflow-x-clip">
      <Nav />
      <Hero />
      <About />
      <Details />
      <Committees />
      <Days />
      <Register />
      <Secretariat />
      <ExecutiveBoard />
      <Schedule />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- helpers ---------------- */

const REG_URL = conference.registrationUrl ?? "/register";
/** Top-bar menu links — Committees is deliberately not offered in the header. */
const topBarLinks = navLinks.filter((l) => l.href !== "#committees");

function SectionHead({
  index,
  label,
  title,
  dark,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="reveal mb-14 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="eyebrow text-gold">{index}</span>
        <span className={`h-px w-12 ${dark ? "bg-line-dark" : "bg-border"}`} />
        <span className={`eyebrow ${dark ? "text-ivory/60" : "text-muted-foreground"}`}>{label}</span>
      </div>
      <h2 className="display mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{title}</h2>
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/* ---------------- nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ivory transition-all duration-500 ${
        open ? "bg-ink lg:bg-transparent" : ""
      } ${
        open ? "border-b border-line-dark" : scrolled ? "border-b border-line-dark bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex shrink-0 items-baseline gap-2">
          <span className="display text-2xl tracking-[0.12em]">AURELIUS</span>
          <span className="eyebrow text-gold">MUN</span>
        </a>
        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
          {topBarLinks.map((l) => (
            <a key={l.href} href={l.href} className="eyebrow link-underline text-[0.62rem] tracking-[0.22em] text-ivory/75 hover:text-ivory">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="bare" className="btn-gold hidden sm:inline-flex"><a href="#register">Register Now</a></Button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="relative grid h-12 w-12 place-items-center lg:hidden"
          >
            <span className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </Container>
    </header>

      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain surface-dark transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex min-h-full flex-col justify-between gap-8 pb-10 pt-8">
          <ul className="space-y-1">
            {topBarLinks.map((l, i) => (
              <li key={l.href} className="border-b border-line-dark">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="display text-4xl">{l.label}</span>
                  <span className="eyebrow text-gold">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="bare" className="btn-gold w-full"><a href="#register" onClick={() => setOpen(false)}>Register Now</a></Button>
        </Container>
      </div>
    </>
  );
}

/* ---------------- hero ---------------- */

const OPENING_TIME = new Date("2026-11-18T00:00:00+05:30").getTime();

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, OPENING_TIME - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const totalSeconds = Math.floor((remaining ?? 0) / 1000);
  const values = [
    { label: "Days", value: Math.floor(totalSeconds / 86400) },
    { label: "Hours", value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((totalSeconds % 3600) / 60) },
    { label: "Seconds", value: totalSeconds % 60 },
  ];
  return (
    <div className="mt-8 md:mt-10" aria-label="Time until 18 November 2026">
      <p className="eyebrow mb-4 text-gold">Until the first edition</p>
      <div className="flex items-start gap-2 sm:gap-5">
        {values.map((item, i) => (
          <div key={item.label} className="flex items-start gap-2 sm:gap-5">
            {i > 0 && <span aria-hidden="true" className="display text-2xl text-gold/70 sm:text-4xl">:</span>}
            <div className="min-w-10 text-center sm:min-w-16">
              <span className="display block tabular-nums text-3xl text-ivory sm:text-5xl" suppressHydrationWarning>{remaining === null ? "--" : String(item.value).padStart(2, "0")}</span>
              <span className="mt-2 block text-[0.55rem] font-semibold uppercase tracking-widest text-ivory/60 sm:text-[0.65rem]">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="surface-dark relative isolate flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_oklch,var(--gold)_14%,transparent),transparent_60%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div ref={ref} className="h-[62%] max-h-[62%]">
          <div className="hero-logo-motion flex h-full items-center justify-center">
            <img
              src={logo}
              alt=""
              width={768}
              height={986}
              className="hero-background-logo block h-full w-auto max-w-none"
            />
          </div>
        </div>
      </div>

      <Container className="relative flex flex-1 flex-col justify-end pb-6 pt-24 md:pb-20 md:pt-32">
        <div className="relative">
          <div className="relative z-10">
        <div className="eyebrow mb-6 flex items-center gap-4 text-gold md:mb-8">
          <span className="h-px w-10 bg-gold" /> Model United Nations
        </div>
        <h1 className="display text-[22vw] sm:text-[17vw] lg:text-[13.5rem]">
          <span className="block overflow-hidden"><span className="animate-rise block">Aurelius</span></span>
          <span className="block overflow-hidden">
            <span className="animate-rise block italic text-gold" style={{ animationDelay: "0.15s" }}>
              MUN 2026
            </span>
          </span>
        </h1>
        <span className="sr-only">Aurelius MUN official logo</span>

        <Countdown />
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-line-dark pt-6 md:mt-8 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-6">
          <div>
            <p className="eyebrow text-ivory/50">Dates</p>
            <p className="mt-2 text-lg tracking-wide">{conference.datesShort}</p>
          </div>
          <div>
            <p className="eyebrow text-ivory/50">Venue</p>
            <p className="mt-2 text-lg tracking-wide">
              {conference.venue.name}, {conference.venue.city}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="bare" className="btn-gold"><a href="#register">Register Now</a></Button>
            <a href="#about" className="btn-ghost">Explore the Conference</a>
          </div>
        </div>
      </Container>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.6rem] text-ivory/50">Scroll</span>
        <span className="animate-line block h-10 w-px bg-gold" />
      </a>
    </section>
  );
}

/* ---------------- about ---------------- */

function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="reveal flex items-center gap-4">
            <span className="eyebrow text-gold">I</span>
            <span className="h-px w-12 bg-border" />
            <span className="eyebrow text-muted-foreground">About Aurelius</span>
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="reveal display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            Two days of structured debate, <em className="text-gold">diplomacy</em> and considered discussion.
          </p>
          <div className="reveal mt-12 grid gap-8 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
            <p>
              Aurelius MUN 2026 is a Model United Nations conference hosted at Jesus and Mary Convent School,
              Greater Noida, on 18 and 19 November 2026.
            </p>
            <p>
              Across three committees, delegates will represent nations and leaders, negotiate positions,
              and work toward resolutions through the procedures of formal debate.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- details ---------------- */

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{String(n).padStart(2, "0")}</span>;
}

function Details() {
  const stats = [
    { n: 3, label: "Committees" },
    { n: 2, label: "Days" },
  ];
  return (
    <section id="conference" className="surface-dark py-24 md:py-36">
      <Container>
        <SectionHead index="II" label="The Conference" title={<>18 — 19<br /><em className="text-gold">November</em> 2026</>} dark />
        <div className="grid gap-12 border-t border-line-dark pt-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow text-ivory/50">Venue</p>
            <p className="display mt-4 text-3xl md:text-4xl">{conference.venue.name}</p>
            {conference.venue.lines.map((l) => (
              <p key={l} className="mt-2 text-ivory/70">{l}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            {stats.map((s, i) => (
              <div key={s.label} className="reveal border-l border-line-dark pl-4 md:pl-6" style={{ transitionDelay: `${i * 120}ms` }}>
                <p className="display text-6xl text-gold md:text-8xl"><Counter to={s.n} /></p>
                <p className="eyebrow mt-3 text-[0.6rem] text-ivory/60 md:text-[0.7rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- committees ---------------- */

function Committees() {
  return (
    <section id="committees" className="py-24 md:py-36">
      <Container>
        <SectionHead index="III" label="Committees" title={<>Three <em className="text-gold">chambers</em></>} />
        <div className="grid border-t border-border md:grid-cols-3">
          {committees.map((c, i) => (
            <article
              key={c.short}
              className="reveal group relative flex min-h-[460px] flex-col border-b border-border p-6 transition-colors duration-700 hover:bg-ink hover:text-ivory md:border-b-0 md:border-r md:p-10 md:last:border-r-0"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-gold">{c.index}</span>
                <span className="eyebrow text-muted-foreground transition-colors group-hover:text-ivory/50">Committee</span>
              </div>
              <h3 className="display mt-10 text-7xl transition-transform duration-700 group-hover:-translate-y-1 md:text-8xl">
                {c.short}
              </h3>
              <p className="eyebrow mt-4 leading-relaxed">{c.name}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-ivory/70">
                {c.description}
              </p>
              <div className="mt-auto pt-10">
                <div className="h-px w-full bg-border transition-colors group-hover:bg-gold" />
                <p className="eyebrow mt-4 text-gold">Agenda</p>
                <p className="mt-2 text-sm leading-relaxed">{c.agenda ?? "To Be Announced"}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ---------------- days ---------------- */

function Days() {
  return (
    <section className="bg-secondary py-24 md:py-36">
      <Container>
        <SectionHead index="IV" label="Two Days · Dress Code" title={<>The <em className="text-gold">two</em> days</>} />
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {days.map((d, i) => (
            <div key={d.index} className={`reveal ${i === 1 ? "md:mt-32" : ""}`}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <img
                  src={dayImages[i]}
                  alt={`${d.dress} attire`}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />
                <span className="display absolute -bottom-6 right-4 text-[9rem] leading-none text-ivory/90 md:text-[12rem]">
                  {d.index}
                </span>
              </div>
              <div className="mt-8 flex items-end justify-between border-t border-border pt-6">
                <div>
                  <p className="eyebrow text-muted-foreground">Day {d.index} · {d.date}</p>
                  <p className="display mt-3 text-4xl md:text-5xl">{d.dress}</p>
                </div>
                <span className="eyebrow text-gold">Dress code</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- register ---------------- */

function Register() {
  return (
    <section id="register" className="surface-dark py-24 md:py-36">
      <Container>
        <div className="reveal text-center">
          <p className="eyebrow text-gold">V · Registration</p>
          <h2 className="display mt-6 text-6xl sm:text-7xl md:text-9xl">
            Join <em className="text-gold">Aurelius</em>
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl border border-line-dark md:grid-cols-2">
          {fees.map((f, i) => (
            <div
              key={f.id}
              className={`reveal group flex flex-col p-8 transition-colors duration-700 hover:bg-ink-soft md:p-12 ${
                i === 0 ? "border-b border-line-dark md:border-b-0 md:border-r" : ""
              }`}
            >
              <p className="eyebrow text-ivory/60">{f.label}</p>
              <p className="display mt-8 text-7xl text-gold md:text-8xl">{f.price}</p>
              <p className="eyebrow mt-6 text-gold">{f.earlyBird}</p>
              <p className="mt-4 min-h-12 text-ivory/70">{f.note}</p>
              <Button asChild variant="bare" className="btn-gold mt-10 w-full"><a href={(f.id === "external" ? conference.externalRegistrationUrl : REG_URL) ?? REG_URL} target="_blank" rel="noopener noreferrer">Register Now <span aria-hidden>→</span></a></Button>
            </div>
          ))}
        </div>
        <div className="reveal mx-auto max-w-5xl border border-t-0 border-line-dark p-8 transition-colors duration-700 hover:bg-ink-soft md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12 md:p-12">
          <div>
            <p className="eyebrow text-ivory/60">{schoolDelegation.label}</p>
            <p className="display mt-8 text-6xl text-gold md:text-7xl">{schoolDelegation.price}</p>
            <p className="eyebrow mt-6 text-gold">{schoolDelegation.priceNote}</p>
          </div>
          <ul className="mt-8 space-y-4 md:mt-0">
            {schoolDelegation.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-ivory/70"><span className="text-gold" aria-hidden>—</span><span>{pt}</span></li>
            ))}
            <li className="pt-4"><Button asChild variant="bare" className="btn-gold w-full sm:w-auto"><a href={REG_URL} target="_blank" rel="noopener noreferrer">Register Now <span aria-hidden>→</span></a></Button></li>
          </ul>
        </div>
        <dl className="mx-auto mt-10 grid max-w-5xl border border-line-dark sm:grid-cols-2">
          {registrationDates.map((r, i) => (
            <div key={r.label} className={`p-6 text-center ${i ? "border-t border-line-dark sm:border-l sm:border-t-0" : ""}`}>
              <dt className="eyebrow text-ivory/60">{r.label}</dt>
              <dd className="display mt-3 text-3xl text-gold">{r.date}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-ivory/75">
          <span className="eyebrow mr-2 text-gold">{committeePolicy.title}</span>{committeePolicy.text}
        </p>
        <div className="mx-auto mt-6 max-w-5xl space-y-1 text-center text-xs text-ivory/50">
          {feeNotes.map((n) => <p key={n}>{n}</p>)}
          <p className="pt-3"><a href={conference.delegateMatrixUrl} target="_blank" rel="noopener noreferrer" className="eyebrow inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-gold transition-colors hover:text-ivory">View Delegate Matrix <span aria-hidden>↗</span></a></p>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- secretariat ---------------- */

function Initials({ name }: { name: string }) {
  const i = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <span className="display text-7xl text-gold/80">{i}</span>;
}

function useCanHover() {
  const [can, setCan] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCan(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return can;
}

function SecretariatCard({
  p, i, active, dimmed, canHover, onHover, onToggle,
}: {
  p: (typeof secretariat)[number];
  i: number;
  active: boolean;
  dimmed: boolean;
  canHover: boolean;
  onHover: () => void;
  onToggle: () => void;
}) {
  return (
    <figure className="reveal group relative isolate aspect-[4/5] overflow-hidden bg-ink" style={{ transitionDelay: `${(i % 3) * 120}ms` }} onMouseEnter={canHover ? onHover : undefined}>
      <Button
        variant="bare"
        type="button"
        aria-pressed={active}
        aria-label={`Emphasise ${p.name}'s photograph`}
        onClick={canHover ? undefined : onToggle}
        onFocus={(e) => {
          if (canHover && e.target.matches(":focus-visible")) onHover();
        }}
        className="absolute inset-0 grid h-full w-full place-items-center overflow-hidden rounded-none p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        {p.photo ? (
          <img src={p.photo} alt={p.name} loading="lazy" style={{ objectPosition: p.focus }} data-color={!dimmed} className="portrait h-full w-full object-cover" />
        ) : <Initials name={p.name} />}
      </Button>
      <figcaption className="secretariat-overlay pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-4 pt-12 text-ivory sm:px-4 sm:pb-3 lg:px-5 lg:pb-4">
        <p className="display break-words text-3xl leading-tight sm:text-2xl lg:text-3xl">{p.name}</p>
        <p className="mt-1 break-words text-[0.65rem] font-semibold uppercase leading-snug text-gold sm:text-[0.6rem] lg:text-[0.65rem]">{p.role}</p>
        {(p.phone || p.instagram) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
            {p.phone && (
              <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="pointer-events-auto inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-xs text-ivory/90 transition-colors hover:text-gold" onClick={(e) => e.stopPropagation()}>
                <Phone size={14} className="shrink-0 text-gold" aria-hidden="true" />{p.phone}
              </a>
            )}
            {p.instagram && (
              <a href={p.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name}'s Instagram`} title={`${p.name} on Instagram`} onClick={(e) => e.stopPropagation()} className="pointer-events-auto inline-flex h-11 w-11 shrink-0 items-center justify-center text-gold transition-colors hover:text-ivory">
                <Instagram size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

function SocialsStrip() {
  return (
    <section
      aria-labelledby="socials-title"
      className="reveal surface-dark group/soc relative isolate mt-24 overflow-hidden border border-gold/25 px-6 py-14 sm:px-10 md:mt-32 md:px-16 md:py-24"
    >
      <div aria-hidden="true" className="socials-glow pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 border border-line-dark transition-colors duration-700 group-hover/soc:border-gold/30 md:inset-5" />
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end md:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold transition-all duration-700 group-hover/soc:w-16" />
            <p className="eyebrow text-gold">Music · Dance · Connection</p>
          </div>
          <h3 id="socials-title" className="display mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
            Aurelius
            <em className="block text-gold">Socials</em>
          </h3>
        </div>
        <div>
          <p className="text-base leading-relaxed text-ivory/75 md:text-lg">
            “Beyond debate, discover the other side of Aurelius. Aurelius Socials brings delegates together through music, dance, and shared experiences, creating the perfect space to meet new people, make connections, and enjoy the conference beyond committee rooms.”
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line-dark pt-6">
            {["Music", "Dance", "New Connections"].map((t) => (
              <li key={t} className="eyebrow text-ivory/60 transition-colors duration-500 hover:text-gold">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SecretariatGrid() {
  const [active, setActive] = useState<number | null>(null);
  const canHover = useCanHover();
  const gridRef = useRef<HTMLDivElement>(null);
  // Touch devices: photos start grayscale; a tapped photo turns colour for ~2s after the last tap.
  const [touchActive, setTouchActive] = useState<number | null>(null);
  const touchTimer = useRef<number | null>(null);

  const clearTouchTimer = () => {
    if (touchTimer.current !== null) {
      window.clearTimeout(touchTimer.current);
      touchTimer.current = null;
    }
  };

  const tapPhoto = (i: number) => {
    clearTouchTimer();
    setTouchActive(i);
    touchTimer.current = window.setTimeout(() => {
      setTouchActive(null);
      touchTimer.current = null;
    }, PORTRAIT_COLOR_DURATION_MS);
  };

  // Clean up the timer if the gallery unmounts so no photo stays coloured.
  useEffect(() => clearTouchTimer, []);

  // Tapping (or clicking) outside the image group resets every portrait to grayscale.
  useEffect(() => {
    if (active === null || !canHover) return;
    const onDocPointer = (e: PointerEvent) => {
      if (!gridRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [active, canHover]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3"
      onMouseLeave={canHover ? () => setActive(null) : undefined}
    >
      {secretariat.map((p, i) => (
        <SecretariatCard
          key={p.name}
          p={p}
          i={i}
          active={canHover ? active === i : touchActive === i}
          dimmed={canHover === null ? false : canHover ? active !== null && active !== i : touchActive !== i}
          canHover={!!canHover}
          onHover={() => setActive(i)}
          onToggle={() => tapPhoto(i)}
        />
      ))}
    </div>
  );
}

function Secretariat() {
  return (
    <section id="secretariat" className="py-24 md:py-36">
      <Container>
        <SectionHead index="VI" label="First Edition" title={<>Message from the <em className="text-gold">Secretariat</em></>} />
        <div className="reveal mb-16 grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-16">
          <p className="eyebrow text-gold">A new beginning</p>
          <div className="max-w-3xl">
            <p className="display text-3xl leading-[1.15] sm:text-4xl md:text-5xl">“Every great legacy begins with a single, daring spark, turning ordinary moments into gold.</p>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">As we step into the inaugural edition of <strong className="text-foreground">Aurelius MUN</strong>, we aren’t just launching a conference—we are breathing life into a shared vision and setting the cornerstone for a remarkable tradition. This very first edition means everything to us. It represents the courage to start from scratch, the boldness to dream without limits, and the unwavering belief that young minds hold the power to shape a better tomorrow.</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">The name <strong className="text-foreground">Aurelius</strong>—derived from the Latin word meaning <em>golden</em> or <em>gilded</em>—carries a profound legacy of wisdom, resilience, and quiet strength. Just like the name implies, we believe that true brilliance isn't just about eloquence; it is forged through thoughtful debate, empathy, and the pursuit of truth under pressure. This name reflects the kind of leaders we strive to cultivate: grounded yet radiant, resilient in the face of complex global challenges, and deeply committed to uplifting one another.</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">To every single delegate, advisor, and team member joining us on this journey: you are not just attending an event. You are writing page one of our golden story. Let this month remind you that every global change starts with a local voice willing to speak up. Let’s embrace the challenge, inspire one another, and make our debut truly legendary!”</p>
          </div>
        </div>
        <SecretariatGrid />
        <SocialsStrip />
      </Container>
    </section>
  );
}

/* ---------------- EB ---------------- */

function ExecutiveBoard() {
  return (
    <section className="border-t border-border bg-secondary py-24 md:py-32">
      <Container>
        <SectionHead index="VII" label="Executive Board" title={<>Executive <em className="text-gold">Board</em></>} />
        {executiveBoard.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {executiveBoard.map((m) => (
              <div key={m.name} className="reveal">
                <div className="surface-dark grid aspect-[4/5] place-items-center">
                  {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : <Initials name={m.name} />}
                </div>
                <p className="eyebrow mt-5 text-gold">{m.committee}</p>
                <p className="display mt-2 text-2xl">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid border-t border-border md:grid-cols-3">
            {committees.map((c) => (
              <div key={c.short} className="reveal border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <p className="eyebrow text-gold">{c.short}</p>
                <p className="display mt-4 text-3xl text-muted-foreground">To Be Announced</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ---------------- schedule ---------------- */

function Schedule() {
  return (
    <section id="itinerary" className="py-24 md:py-36">
      <Container>
        <SectionHead index="VIII" label="AURELIUS MUN '26" title={<>Itinerary</>} />
        <p className="reveal eyebrow -mt-8 mb-12 text-gold md:-mt-12">“AUT VERITA TE AUT NUDUS”</p>
        <div className="grid gap-12 md:grid-cols-2">
          {schedule.map((d, di) => (
            <div key={d.day} className="reveal" style={{ transitionDelay: `${di * 120}ms` }}>
              <div className="flex min-h-[3.25rem] flex-col justify-end gap-2">
                <p className="eyebrow text-gold">{d.day}</p>
                {d.dress && (
                  <p className="eyebrow text-muted-foreground">
                    Dress Code · <span className="text-foreground">{d.dress}</span>
                  </p>
                )}
              </div>
              <ul className="mt-6 border-t border-border">
                {d.items.map((it, i) => (
                  <li
                    key={i}
                    className={`flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-5 ${
                      it.highlight ? "border-gold/30 bg-gradient-to-r from-gold/[0.07] to-transparent" : "border-border"
                    }`}
                  >
                    <span className={`display text-2xl [font-variant-numeric:lining-nums] md:text-3xl ${it.highlight ? "text-gold" : ""}`}>
                      {it.title}
                    </span>
                    {it.time && (
                      <span
                        className={`shrink-0 text-sm font-medium tracking-wide tabular-nums ${
                          it.highlight ? "text-gold/80" : "text-muted-foreground"
                        }`}
                      >
                        {it.time}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- contact ---------------- */

function Contact() {
  const c = conference.contact;
  const rows = [
    { label: "Official email", value: c.email, href: c.email ? `mailto:${c.email}` : null, external: false },
    { label: "Instagram", value: c.instagram ? "@aureliusjmcmun" : null, href: c.instagram, external: true },
    { label: "Phone", value: c.phone, href: c.phone ? `tel:${c.phone.replace(/\s/g, "")}` : null, external: false },
    { label: "Location", value: "Open in Google Maps", href: conference.venue.mapsUrl, external: true },
  ];
  return (
    <section id="contact" className="py-24 md:py-36">
      <Container>
        <SectionHead index="X" label="Contact" title={<>Find <em className="text-gold">us</em></>} />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow text-muted-foreground">Venue</p>
            <p className="display mt-4 text-4xl">{conference.venue.name}</p>
            {conference.venue.lines.map((l) => (
              <p key={l} className="mt-1 text-muted-foreground">{l}</p>
            ))}
            <dl className="mt-12 border-t border-border">
              {rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-border py-5">
                  <dt className="eyebrow text-muted-foreground">{r.label}</dt>
                  <dd className="break-all text-right">
                    {r.value ? (
                      r.href ? <a href={r.href} className="link-underline" {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{r.value}</a> : r.value
                    ) : (
                      <span className="eyebrow text-gold">To Be Announced</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal surface-dark relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            {conference.venue.mapEmbedUrl ? (
              <iframe title="Venue map" src={conference.venue.mapEmbedUrl} loading="lazy" className="h-full w-full border-0" />
            ) : (
              <>
                <img src={heroGlobe} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-40" />
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                  <span className="mb-6 block h-3 w-3 rounded-full bg-gold ring-8 ring-gold/20" />
                  <p className="display text-3xl">Greater Noida</p>
                  <a href={conference.venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">View on Google Maps</a>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="surface-dark pt-20">
      <Container>
        <div className="grid gap-12 border-b border-line-dark pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display text-5xl md:text-7xl">
              Aurelius <em className="text-gold">MUN</em> 2026
            </p>
            <p className="eyebrow mt-6 text-ivory/60">{conference.dates}</p>
            <p className="eyebrow mt-2 text-ivory/60">{conference.venue.name} · {conference.venue.city}</p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="link-underline text-ivory/70 hover:text-ivory">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Connect</p>
            <ul className="mt-5 space-y-3 text-ivory/70">
              <li>Instagram — {conference.contact.instagram ? <a className="link-underline" href={conference.contact.instagram} target="_blank" rel="noopener noreferrer">Follow</a> : "TBA"}</li>
              <li>Email — {conference.contact.email ? <a className="link-underline" href={`mailto:${conference.contact.email}`}>{conference.contact.email}</a> : "TBA"}</li>
              <li>Phone — {conference.contact.phone ? <a className="link-underline" href={`tel:${conference.contact.phone.replace(/\s/g, "")}`}>{conference.contact.phone}</a> : "TBA"}</li>
            </ul>
            <Button asChild variant="bare" className="btn-gold mt-8"><a href={REG_URL} target="_blank" rel="noopener noreferrer">Register Now</a></Button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 py-8 text-xs text-ivory/40 sm:flex-row">
          <span>© 2026 Aurelius MUN</span>
          <a href="#home" className="link-underline">Back to top ↑</a>
        </div>
      </Container>
    </footer>
  );
}

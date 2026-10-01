import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroGlobe from "@/assets/hero-globe.jpg";
import dayWestern from "@/assets/day-western.jpg";
import dayTraditional from "@/assets/day-traditional.jpg";
import {
  conference,
  fees,
  committees,
  days,
  secretariat,
  executiveBoard,
  schedule,
  faqs,
  navLinks,
} from "@/data/conference";
import { useRevealAll } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelius MUN 2026 — 11–12 November, Greater Noida" },
      {
        name: "description",
        content:
          "Aurelius MUN 2026: a two-day Model United Nations conference at Jesus and Mary Convent School, Greater Noida. UNGA, WHO and AIPPM.",
      },
      { property: "og:title", content: "Aurelius MUN 2026" },
      {
        property: "og:description",
        content: "Two days of debate and diplomacy. 11–12 November 2026, Greater Noida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const dayImages = [dayWestern, dayTraditional];

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
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- helpers ---------------- */

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
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ivory transition-all duration-500 ${
        scrolled ? "border-b border-line-dark bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex shrink-0 items-baseline gap-2">
          <span className="display text-2xl tracking-[0.12em]">AURELIUS</span>
          <span className="eyebrow text-gold">MUN</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="eyebrow link-underline text-ivory/75 hover:text-ivory">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="bare" className="btn-gold hidden sm:inline-flex"><Link to="/register">Register Now</Link></Button>
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

      <div
        className={`fixed inset-0 top-16 z-40 surface-dark transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex h-full flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
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
          <Button asChild variant="bare" className="btn-gold w-full"><Link to="/register" onClick={() => setOpen(false)}>Register Now</Link></Button>
        </Container>
      </div>
    </header>
  );
}

/* ---------------- hero ---------------- */

const OPENING_TIME = new Date("2026-11-11T00:00:00+05:30").getTime();

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
    <div className="mt-8 md:mt-10" aria-label="Time until 11 November 2026">
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
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const on = () => {
      if (ref.current) ref.current.style.translate = `0 ${window.scrollY * 0.25}px`;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="home" className="surface-dark relative flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <img
          ref={ref}
          src={heroGlobe}
          alt=""
          width={1920}
          height={1088}
          className="animate-drift h-full w-full object-cover object-center opacity-70 md:object-[70%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      </div>

      <Container className="relative flex flex-1 flex-col justify-end pb-6 pt-20 md:pb-20 md:pt-32">
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

        <Countdown />

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
            <Button asChild variant="bare" className="btn-gold"><Link to="/register">Register Now</Link></Button>
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
              Greater Noida, on 11 and 12 November 2026.
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
        <SectionHead index="II" label="The Conference" title={<>11 — 12<br /><em className="text-gold">November</em> 2026</>} dark />
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
                <p className="eyebrow mt-4">
                  Agenda — <span className="text-gold">{c.agenda ?? "To Be Announced"}</span>
                </p>
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
              <p className="mt-6 min-h-12 text-ivory/70">{f.note}</p>
              <Button asChild variant="bare" className="btn-gold mt-10 w-full"><Link to="/register">Register Now <span aria-hidden>→</span></Link></Button>
            </div>
          ))}
        </div>
        <p className="reveal mt-10 text-center text-sm text-ivory/50">
          Registration details and further conference information will be updated shortly.
        </p>
      </Container>
    </section>
  );
}

/* ---------------- secretariat ---------------- */

function Initials({ name }: { name: string }) {
  const i = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <span className="display text-7xl text-gold/80">{i}</span>;
}

function Secretariat() {
  return (
    <section id="secretariat" className="py-24 md:py-36">
      <Container>
        <SectionHead index="VI" label="First Edition" title={<>Message from the <em className="text-gold">Secretariat</em></>} />
        <div className="reveal mb-16 grid gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-16">
          <p className="eyebrow text-gold">A new beginning</p>
          <div className="max-w-3xl">
            <p className="display text-3xl leading-[1.15] sm:text-4xl md:text-5xl">Welcome to the first edition of Aurelius MUN.</p>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">As a new initiative, Aurelius MUN is an invitation to listen closely, speak thoughtfully and meet different perspectives with curiosity. We hope these two days make room for meaningful debate, diplomacy and collaboration.</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">We look forward to welcoming you to the conversation.</p>
            <p className="eyebrow mt-8 text-gold">Savio Jose &amp; Aditya Kumar Singh</p>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:max-w-4xl">
          {secretariat.map((p, i) => (
            <figure key={p.name} className="reveal group" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="surface-dark relative grid aspect-[4/5] place-items-center overflow-hidden">
                {p.photo ? (
                  <img src={p.photo} alt={p.name} loading="lazy" className="h-full w-full object-cover grayscale transition duration-1000 group-hover:grayscale-0" />
                ) : (
                  <>
                    <div className="absolute inset-6 border border-line-dark transition-all duration-700 group-hover:inset-4 group-hover:border-gold/40" />
                    <Initials name={p.name} />
                  </>
                )}
              </div>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="display text-3xl">{p.name}</p>
                <p className="eyebrow mt-2 text-muted-foreground">{p.role ?? "Photo coming soon"}</p>
              </figcaption>
            </figure>
          ))}
        </div>
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
    <section className="py-24 md:py-36">
      <Container>
        <SectionHead index="VIII" label="Conference Schedule" title={<>Schedule <em className="text-gold">coming soon</em></>} />
        <div className="grid gap-12 md:grid-cols-2">
          {schedule.map((d) => (
            <div key={d.day} className="reveal">
              <p className="eyebrow text-gold">{d.day}</p>
              <ul className="mt-6 border-t border-border">
                {d.items.map((it, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-6 border-b border-border py-5">
                    <span className="display text-2xl md:text-3xl">{it.title}</span>
                    <span className="eyebrow shrink-0 text-muted-foreground">{it.time ?? "TBA"}</span>
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

/* ---------------- FAQ ---------------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="surface-dark py-24 md:py-36">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead index="IX" label="FAQ" title={<>Questions</>} dark />
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="reveal border-b border-line-dark first:border-t">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display text-2xl md:text-3xl">{f.q}</span>
                  <span className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-gold" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-gold" />
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 text-ivory/70">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- contact ---------------- */

function Contact() {
  const c = conference.contact;
  const rows = [
    { label: "Official email", value: c.email, href: c.email ? `mailto:${c.email}` : null },
    { label: "Instagram", value: c.instagram, href: c.instagram },
    { label: "Phone", value: c.phone, href: c.phone ? `tel:${c.phone}` : null },
    { label: "Registration contact", value: c.registrationContact, href: null },
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
                  <dd className="text-right">
                    {r.value ? (
                      r.href ? <a href={r.href} className="link-underline">{r.value}</a> : r.value
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
                  <p className="eyebrow mt-3 text-ivory/60">Map coming soon</p>
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
              <li>Instagram — {conference.contact.instagram ? <a className="link-underline" href={conference.contact.instagram}>Follow</a> : "TBA"}</li>
              <li>Email — {conference.contact.email ?? "TBA"}</li>
              <li>Phone — {conference.contact.phone ?? "TBA"}</li>
            </ul>
            <Button asChild variant="bare" className="btn-gold mt-8"><Link to="/register">Register Now</Link></Button>
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

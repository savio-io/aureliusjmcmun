import { awards } from "@/data/conference";

export function Awards() {
  return (
    <section id="awards" className="surface-dark py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="reveal mb-14 flex items-center gap-4">
          <span className="eyebrow text-gold">Honours</span>
          <span className="h-px w-12 bg-line-dark" />
          <span className="eyebrow text-ivory/60">Awards</span>
        </div>
        <h2 className="reveal display mb-16 text-5xl sm:text-6xl md:text-7xl">
          Recognising <em className="text-gold">excellence</em>
        </h2>
        <ol className="border-t border-line-dark">
          {awards.map((a, i) => (
            <li
              key={a.title}
              className="reveal group grid gap-3 border-b border-line-dark py-8 transition-colors duration-500 hover:bg-ivory/[0.03] md:grid-cols-[5rem_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-8"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="eyebrow text-gold">0{i + 1}</span>
              <span className={`display transition-colors duration-500 group-hover:text-gold ${i === 0 ? "text-5xl md:text-6xl" : i < 3 ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>
                {a.title}
              </span>
              <span className="text-sm text-ivory/60">{a.count}</span>
              <span className="eyebrow text-ivory/80 md:text-right">{a.prize}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

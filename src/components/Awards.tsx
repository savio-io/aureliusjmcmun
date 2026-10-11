import { awards, schoolAward } from "@/data/conference";

export function Awards() {
  return (
    <section id="awards" className="surface-dark py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="reveal mb-8 flex items-center gap-4">
          <span className="eyebrow text-gold">Honours</span>
          <span className="eyebrow text-ivory/60">Awards</span>
        </div>
        <h2 className="reveal display mb-10 text-4xl sm:text-5xl md:text-6xl">
          Recognising <em className="text-gold">excellence</em>
        </h2>
        <ol className="border-t border-line-dark">
          {awards.map((a, i) => (
            <li
              key={a.title}
              className="reveal group grid gap-3 border-b border-line-dark py-7 md:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="eyebrow text-gold">0{i + 1}</span>
              <span className="display text-3xl transition-colors duration-300 group-hover:text-gold md:text-4xl">
                {a.title}
              </span>
              <span className="text-sm text-ivory/60">{a.count}</span>
              <span className="eyebrow text-ivory/80 md:text-right">{a.prize}</span>
            </li>
          ))}
        </ol>
        <div className="reveal pt-10 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <div>
            <span className="eyebrow text-gold">School Recognition</span>
            <h3 className="display mt-5 text-3xl md:text-4xl">{schoolAward.title}</h3>
            <p className="mt-5 max-w-xl text-ivory/70">{schoolAward.description}</p>
          </div>
          <p className="eyebrow mt-8 text-ivory/80 md:mt-0 md:text-right">{schoolAward.prize}</p>
        </div>
      </div>
    </section>
  );
}

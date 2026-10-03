import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, PROJECTS } from "@/lib/projectsData";
import { reveal, drawLine } from "@/lib/motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const titleRef = React.useRef(null);
  const lineRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (titleRef.current) reveal(titleRef.current.querySelectorAll(".reveal-el"), { delay: 80 });
            if (lineRef.current) drawLine(lineRef.current, { delay: 200 });
            if (bodyRef.current) reveal(bodyRef.current.querySelectorAll(".reveal-el"), { delay: 120, y: 50 });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
          404 · Proyecto no encontrado
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground hover:text-primary focus-ring"
        >
          <ArrowLeft className="h-5 w-5" /> Volver al inicio
        </Link>
      </div>
    );
  }

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-foreground/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10">
          <Link
            to="/#proyectos"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Proyectos
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.id} · {project.tag}
          </span>
        </div>
      </div>

      {/* Hero */}
      <header ref={titleRef} className="relative w-full px-6 pt-[14vh] md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">{project.tag}</span>
            <span className="h-px w-16 bg-border" />
          </div>
          <h1 className="reveal-el font-display text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.85] tracking-tight text-foreground">
            {project.name}
          </h1>
          <svg className="reveal-el mt-3 h-10 w-[320px] max-w-full" viewBox="0 0 320 40" fill="none" preserveAspectRatio="none">
            <path
              ref={lineRef}
              d="M0 20 L 60 20 Q 120 20 140 8 T 240 20 L 320 20"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="reveal-el mt-10 overflow-hidden rounded-[14px] ring-1 ring-border">
            <img src={project.img} alt={project.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* Body */}
      <section ref={bodyRef} className="w-full px-6 py-[12vh] md:px-10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="reveal-el sticky top-24 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Stack</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-[6px] border border-foreground/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-primary px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.04]"
              >
                Ver sitio <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="reveal-el">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">01 / Resumen</div>
              <p className="text-balance font-display text-[clamp(1.4rem,3vw,2rem)] font-medium leading-snug text-foreground">
                {project.desc}
              </p>
            </div>

            <div className="reveal-el mt-12">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">02 / Detalle</div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.longDesc}</p>
            </div>

            <div className="reveal-el mt-12">
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">03 / Características</div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-[10px] border border-foreground/10 bg-card p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-base text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="border-t border-foreground/10 px-6 py-[10vh] md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">05 / Siguiente</span>
            <span className="h-px w-16 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/proyectos/${p.slug}`}
                className="focus-ring group flex items-center justify-between rounded-[12px] border border-foreground/10 p-6 transition-colors hover:border-foreground/30"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {p.id} · {p.tag}
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-foreground group-hover:text-primary">
                    {p.name}
                  </div>
                </div>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
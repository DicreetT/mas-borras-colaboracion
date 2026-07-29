const principles = [
  {
    title: "Cuidado",
    text: "Trabajamos con atención hacia el lugar y hacia las personas.",
  },
  {
    title: "Comunidad",
    text: "Compartimos tareas, tiempos y aprendizajes.",
  },
  {
    title: "Legado",
    text: "Protegemos aquello que merece seguir siendo transmitido.",
  },
];

export function ProgramPhilosophy() {
  return (
    <section className="py-12">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
            Filosofía del programa
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-tight">
            Cuidar un lugar también es formar parte de su historia
          </h2>
        </div>
        <div className="grid gap-6">
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Las estancias de colaboración nacen para reunir a personas que
            desean aportar tiempo, conocimiento y presencia al cuidado de Mas
            Borràs. Cada proyecto tiene unas necesidades distintas, pero todos
            comparten el mismo propósito: preservar el lugar, fortalecer su
            comunidad y mantener vivo su legado.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[8px] border border-line bg-surface p-5"
              >
                <h3 className="text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

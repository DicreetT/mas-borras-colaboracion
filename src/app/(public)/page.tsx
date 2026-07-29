import { ArrowRight, CalendarCheck, HandHeart, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project/project-card";
import { ProgramPhilosophy } from "@/components/program/program-philosophy";
import { ButtonLink } from "@/components/ui/button-link";
import { getPublishedProjects } from "@/data/projects";

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <div className="content-grid">
      <section className="full-bleed relative min-h-[88svh] overflow-hidden">
        <Image
          src="/images/mas-borras-home.png"
          alt="El Mas de Borràs entre montañas y árboles de otoño al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211a12]/72 via-[#211a12]/38 to-transparent" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl items-center px-4 py-20 sm:px-6">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4dfc7]">
              El Mas de Borràs
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] sm:text-7xl">
              Programa de Colaboración
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/proyectos">Explorar proyectos</ButtonLink>
              <ButtonLink href="/programa" tone="secondary">
                Conocer el programa
              </ButtonLink>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#f4dfc7]">
              Encuentra la estancia que resuene contigo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              Una invitación cuidada
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight">
              Colaborar sin prisa, con fechas claras y acuerdos honestos.
            </h2>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-muted">
            <p>
              El Mas de Borràs abre sus instalaciones a personas voluntarias que
              deseen colaborar en los proyectos y tareas requeridos por el lugar.
              A cambio de su ayuda, podrán alojarse en un entorno natural y
              tranquilo, participar en la vida cotidiana del espacio y disfrutar
              de sus instalaciones.
            </p>
            <p>
              La propuesta combina unas horas de colaboración con tiempo libre
              para descansar, caminar, leer o permanecer en contacto con la
              naturaleza. Durante ese tiempo, se invita especialmente a las
              personas voluntarias a utilizar la sala de meditación, tanto si ya
              cuentan con una práctica propia como si simplemente desean acercarse
              al silencio y la calma.
            </p>
            <p>
              Buscamos personas responsables, respetuosas y dispuestas a
              colaborar en tareas de mantenimiento, cuidado de exteriores,
              organización y mejora de los espacios, dentro de una experiencia
              basada en la convivencia, el cuidado mutuo y el respeto por el
              ritmo de cada participante. Todo esto sin perder el foco en buscar
              el contacto con el silencio interior.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Proyectos con cupo", CalendarCheck],
            ["Cuidado del legado", HandHeart],
            ["Naturaleza y silencio", Trees],
          ].map(([label, Icon]) => (
            <div
              key={String(label)}
              className="rounded-[8px] border border-line bg-surface p-5"
            >
              <Icon className="h-6 w-6 text-olive" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{String(label)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Un lenguaje visual y funcional pensado para grupos pequeños,
                revisión humana y estancias con sentido.
              </p>
            </div>
          ))}
        </div>
      </section>

      <ProgramPhilosophy />

      <section className="py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              Proyectos disponibles
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              Primeras estancias publicadas
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-olive-dark underline"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

import { ArrowLeft, CalendarDays, Home, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationMotivationPrompt } from "@/components/project/application-motivation-prompt";
import { ModalityCalculator } from "@/components/project/modality-calculator";
import { ProjectGallery } from "@/components/project/project-gallery";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { mockProjects } from "@/data/mock";
import { getProjectBySlug } from "@/data/projects";
import {
  difficultyLabels,
  programTypeLabels,
} from "@/domain/collaboration/labels";

export function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="content-grid pb-16">
      <section className="full-bleed relative min-h-[54svh] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211a12]/78 via-[#211a12]/42 to-transparent" />
        <div className="relative mx-auto flex min-h-[54svh] max-w-6xl items-end px-4 py-12 text-white sm:px-6">
          <div className="max-w-3xl">
            <Link
              href="/proyectos"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a proyectos
            </Link>
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">{programTypeLabels[project.type]}</Badge>
              <Badge tone="clay">{difficultyLabels[project.difficulty]}</Badge>
            </div>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#fff8ed]">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_26rem]">
        <article className="grid gap-8">
          {project.purpose ? (
            <section className="rounded-[8px] border border-line bg-surface p-6">
              <h2 className="font-serif text-3xl font-semibold">
                ¿Por qué existe esta estancia?
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-muted">
                {project.purpose}
              </p>
            </section>
          ) : null}

          {project.coordinatorMessage ? (
            <section className="rounded-[8px] border border-line bg-surface-soft p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
                Una nota de quien acompaña esta estancia
              </p>
              <p className="mt-4 max-w-3xl font-serif text-2xl leading-9 text-foreground">
                “{project.coordinatorMessage}”
              </p>
            </section>
          ) : null}

          <section className="rounded-[8px] border border-line bg-surface p-6">
            <h2 className="font-serif text-3xl font-semibold">Detalle</h2>
            <p className="mt-4 leading-8 text-muted">{project.description}</p>
            <dl className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-3">
              <div className="flex gap-2">
                <CalendarDays className="h-4 w-4 text-olive" aria-hidden />
                <div>
                  <dt className="font-semibold text-foreground">Fechas</dt>
                  <dd>{project.dates[0]?.label}</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <UsersRound className="h-4 w-4 text-olive" aria-hidden />
                <div>
                  <dt className="font-semibold text-foreground">Cupo</dt>
                  <dd>{project.capacity} personas</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <Home className="h-4 w-4 text-olive" aria-hidden />
                <div>
                  <dt className="font-semibold text-foreground">Lugar</dt>
                  <dd>{project.location}</dd>
                </div>
              </div>
            </dl>
            <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-sm text-muted sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-foreground">
                  Plazas disponibles
                </dt>
                <dd>
                  {Math.max(project.capacity - project.occupiedPlaces, 0)} de{" "}
                  {project.capacity}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Participantes confirmados
                </dt>
                <dd>
                  {project.communityStats?.confirmedParticipants ??
                    project.occupiedPlaces}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Estado del proyecto
                </dt>
                <dd>{project.status === "published" ? "Publicado" : project.status}</dd>
              </div>
              {project.communityStats?.pastParticipants ? (
                <div>
                  <dt className="font-semibold text-foreground">
                    Recorrido compartido
                  </dt>
                  <dd>
                    {project.communityStats.pastParticipants} personas ya han
                    formado parte
                  </dd>
                </div>
              ) : null}
              {project.communityStats?.lastEditionLabel ? (
                <div>
                  <dt className="font-semibold text-foreground">
                    Última edición
                  </dt>
                  <dd>{project.communityStats.lastEditionLabel}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-semibold text-foreground">Próxima fecha</dt>
                <dd>{project.dates[0]?.label ?? "Por confirmar"}</dd>
              </div>
            </dl>
            {project.type === "specialized_maintenance" ? (
              <p className="mt-6 rounded-[8px] border border-line bg-mist p-4 text-sm leading-6 text-olive-dark">
                Algunas tareas requieren experiencia previa o una conversación
                con el equipo antes de confirmar la participación.
              </p>
            ) : null}
          </section>

          {project.tasks?.length ? (
            <section className="rounded-[8px] border border-line bg-surface p-6">
              <h2 className="font-serif text-3xl font-semibold">
                Tareas previstas
              </h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                {project.tasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[8px] border border-line bg-surface p-6">
              <h2 className="font-serif text-3xl font-semibold">Requisitos</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                {project.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[8px] border border-line bg-surface p-6">
              <h2 className="font-serif text-3xl font-semibold">Incluye</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
                {project.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <ProjectGallery images={project.gallery} />
        </article>

        <div className="grid h-fit gap-5 lg:sticky lg:top-24">
          <ModalityCalculator project={project} />
          <ApplicationMotivationPrompt />
          <ButtonLink href="/acceso" className="w-full">
            Solicitar plaza
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

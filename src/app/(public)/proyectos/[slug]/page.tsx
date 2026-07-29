import { ArrowLeft, CalendarDays, Home, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModalityCalculator } from "@/components/project/modality-calculator";
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
          </section>

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
        </article>

        <div className="grid h-fit gap-5 lg:sticky lg:top-24">
          <ModalityCalculator project={project} />
          <ButtonLink href="/acceso" className="w-full">
            Solicitar plaza
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

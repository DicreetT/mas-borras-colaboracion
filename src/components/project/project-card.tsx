import { CalendarDays, Home, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  difficultyLabels,
  programTypeLabels,
} from "@/domain/collaboration/labels";
import type { Project } from "@/domain/collaboration/types";

export function ProjectCard({ project }: { project: Project }) {
  const dateLabel = project.dates[0]?.label ?? "Fechas por confirmar";
  const hasLodging = project.modalities.some((modality) => modality.lodgingIncluded);
  const placesLeft = project.capacity - project.occupiedPlaces;

  return (
    <article className="overflow-hidden rounded-[8px] border border-line bg-surface soft-shadow">
      <Link href={`/proyectos/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
          <Image
            src={project.heroImage}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="green">{programTypeLabels[project.type]}</Badge>
          <Badge tone="clay">{difficultyLabels[project.difficulty]}</Badge>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold leading-tight">
            <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
        </div>
        <dl className="grid gap-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-olive" aria-hidden="true" />
            <dt className="sr-only">Fechas</dt>
            <dd>{dateLabel}</dd>
          </div>
          <div className="flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-olive" aria-hidden="true" />
            <dt className="sr-only">Cupo</dt>
            <dd>
              {placesLeft > 0
                ? `${placesLeft} de ${project.capacity} plazas disponibles`
                : "Cupo completo"}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-olive" aria-hidden="true" />
            <dt className="sr-only">Alojamiento</dt>
            <dd>{hasLodging ? "Con opción de alojamiento incluido" : "Condiciones a revisar"}</dd>
          </div>
        </dl>
        <Link
          href={`/proyectos/${project.slug}`}
          className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full border border-olive px-5 text-sm font-semibold text-olive-dark transition hover:bg-mist"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

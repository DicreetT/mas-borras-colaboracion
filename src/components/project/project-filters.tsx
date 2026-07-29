"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project/project-card";
import { StateBlock } from "@/components/ui/state-block";
import {
  difficultyLabels,
  programTypeLabels,
} from "@/domain/collaboration/labels";
import type { Difficulty, ProgramType, Project } from "@/domain/collaboration/types";

type DateFilter = "all" | "scheduled" | "flexible";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [type, setType] = useState<ProgramType | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [lodgingIncluded, setLodgingIncluded] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType = type === "all" || project.type === type;
      const matchesDifficulty =
        difficulty === "all" || project.difficulty === difficulty;
      const matchesLodging =
        !lodgingIncluded ||
        project.modalities.some((modality) => modality.lodgingIncluded);
      const hasFlexibleDate = project.dates.some((date) => date.isFlexible);
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "flexible" && hasFlexibleDate) ||
        (dateFilter === "scheduled" && !hasFlexibleDate);

      return matchesType && matchesDifficulty && matchesLodging && matchesDate;
    });
  }, [dateFilter, difficulty, lodgingIncluded, projects, type]);

  return (
    <section aria-labelledby="project-list-title" className="grid gap-6">
      <div className="rounded-[8px] border border-line bg-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-olive-dark">
          <Search className="h-4 w-4" aria-hidden="true" />
          Filtros
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-medium">
            Tipo de programa
            <select
              value={type}
              onChange={(event) => setType(event.target.value as ProgramType | "all")}
              className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            >
              <option value="all">Todos</option>
              {Object.entries(programTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Fechas
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value as DateFilter)}
              className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            >
              <option value="all">Todas</option>
              <option value="scheduled">Con fechas publicadas</option>
              <option value="flexible">Por acordar</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Dificultad
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as Difficulty | "all")}
              className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            >
              <option value="all">Todas</option>
              {Object.entries(difficultyLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-h-11 items-end gap-3 rounded-[8px] border border-line bg-background px-3 py-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={lodgingIncluded}
              onChange={(event) => setLodgingIncluded(event.target.checked)}
              className="h-5 w-5 accent-olive"
            />
            Alojamiento incluido
          </label>
        </div>
      </div>

      <h2 id="project-list-title" className="sr-only">
        Proyectos disponibles
      </h2>
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <StateBlock type="empty" title="No hay proyectos con esos filtros">
          Prueba a ampliar fechas, dificultad o tipo de programa. En la versión
          con base de datos estos filtros consultarán proyectos publicados.
        </StateBlock>
      )}
    </section>
  );
}

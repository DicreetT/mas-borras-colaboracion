import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAdminProjects } from "@/data/projects";
import { difficultyLabels, programTypeLabels } from "@/domain/collaboration/labels";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
            Proyectos
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold">
            Gestión de proyectos
          </h1>
        </div>
        <Link
          href="/admin/proyectos/nuevo"
          className="rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white"
        >
          Crear proyecto
        </Link>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="rounded-[8px] border border-line bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  {project.summary}
                </p>
              </div>
              <Link
                href={`/admin/proyectos/${project.slug}/editar`}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist"
              >
                Editar
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="green">{programTypeLabels[project.type]}</Badge>
              <Badge tone="clay">{difficultyLabels[project.difficulty]}</Badge>
              <Badge>{project.status}</Badge>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

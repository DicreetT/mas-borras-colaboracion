import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/forms/project-form";
import { mockProjects } from "@/data/mock";
import { getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }));
}

export default async function EditProjectPage({
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
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          Editar proyecto
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">
          {project.title}
        </h1>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}

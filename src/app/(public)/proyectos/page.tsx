import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectFilters } from "@/components/project/project-filters";
import { getPublishedProjects } from "@/data/projects";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="content-grid py-14 sm:py-20">
      <SectionHeading eyebrow="Explorar proyectos" title="Proyectos disponibles">
        Encuentra la estancia que resuene contigo. Puedes filtrar por tipo,
        fechas, dificultad y alojamiento antes de solicitar plaza desde el
        detalle.
      </SectionHeading>
      <div className="mt-10">
        <ProjectFilters projects={projects} />
      </div>
    </div>
  );
}

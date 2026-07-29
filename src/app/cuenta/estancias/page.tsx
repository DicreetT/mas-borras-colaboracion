import { StateBlock } from "@/components/ui/state-block";
import { getCurrentStays } from "@/data/account";
import { getPublishedProjects } from "@/data/projects";

export default async function StaysPage() {
  const [stays, projects] = await Promise.all([
    getCurrentStays(),
    getPublishedProjects(),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mis estancias</h1>
      {stays.length > 0 ? (
        <div className="grid gap-4">
          {stays.map((stay) => {
            const project = projects.find((item) => item.id === stay.projectId);

            return (
              <article key={stay.id} className="rounded-[8px] border border-line bg-surface p-5">
                <h2 className="text-xl font-semibold">
                  {project?.title ?? "Proyecto"}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {stay.arrivalDate} a {stay.departureDate}
                </p>
                <p className="mt-4 text-sm font-medium text-olive-dark">
                  Estado simulado: próxima estancia
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <StateBlock type="empty" title="Aún no hay estancias aceptadas">
          Cuando una solicitud sea aceptada y confirmada, aparecerá en esta
          sección junto con sus instrucciones.
        </StateBlock>
      )}
    </div>
  );
}

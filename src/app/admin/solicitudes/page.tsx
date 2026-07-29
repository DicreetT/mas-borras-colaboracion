import { Badge } from "@/components/ui/badge";
import { getAdminApplications, getAdminProfiles } from "@/data/admin";
import { getAdminProjects } from "@/data/projects";
import { applicationStatusLabels } from "@/domain/collaboration/labels";

export default async function AdminApplicationsPage() {
  const [applications, projects, profiles] = await Promise.all([
    getAdminApplications(),
    getAdminProjects(),
    getAdminProfiles(),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Solicitudes</h1>
      <div className="grid gap-4">
        {applications.map((application) => {
          const project = projects.find((item) => item.id === application.projectId);
          const profile = profiles.find((item) => item.id === application.profileId);

          return (
            <article key={application.id} className="rounded-[8px] border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {project?.title ?? "Proyecto"}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {profile?.firstName ?? "Participante"}{" "}
                    {profile?.lastName ?? ""} · {profile?.email ?? "Sin correo"}
                  </p>
                </div>
                <Badge tone="clay">
                  {applicationStatusLabels[application.status]}
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist">
                  Aceptar
                </button>
                <button type="button" className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist">
                  Lista de espera
                </button>
                <button type="button" className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist">
                  Pedir información
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

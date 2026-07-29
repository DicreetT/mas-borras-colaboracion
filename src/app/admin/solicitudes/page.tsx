import { Badge } from "@/components/ui/badge";
import { getAdminApplications, getAdminProfiles } from "@/data/admin";
import { getAdminProjects } from "@/data/projects";
import { applicationStatusLabels } from "@/domain/collaboration/labels";
import { formatMoney } from "@/domain/collaboration/pricing";

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
                    {profile?.firstName ?? "Participante"}{" "}
                    {profile?.lastName ?? ""}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {project?.title ?? "Proyecto"} ·{" "}
                    {project?.dates[0]?.label ?? "Fechas por confirmar"}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {profile?.email ?? "Sin correo"}
                  </p>
                </div>
                <Badge tone="clay">
                  {applicationStatusLabels[application.status]}
                </Badge>
              </div>
              <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="font-semibold">Motivación</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {application.motivation ??
                      "Todavía no hay respuesta registrada."}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Experiencia</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {profile?.experience ?? "Sin experiencia indicada."}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Preferencias alimentarias</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {profile?.dietaryPreferences || "No indicado."}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Accesibilidad</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {profile?.accessibilityNeeds || "No indicado."}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Estimación</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {formatMoney(application.estimatedAmountCents)} ·{" "}
                    {application.nights} noches · {application.menuDays} días de
                    comida
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Notas internas</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {application.internalNotes ??
                      "Sin notas internas por ahora."}
                  </dd>
                </div>
              </dl>
              {application.notes ? (
                <div className="mt-4 rounded-[8px] bg-mist p-4 text-sm leading-6 text-olive-dark">
                  {application.notes}
                </div>
              ) : null}
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

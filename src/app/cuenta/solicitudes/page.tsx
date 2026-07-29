import { Badge } from "@/components/ui/badge";
import { getCurrentApplications } from "@/data/account";
import { getPublishedProjects } from "@/data/projects";
import { applicationStatusLabels } from "@/domain/collaboration/labels";
import { formatMoney } from "@/domain/collaboration/pricing";

export default async function ApplicationsPage() {
  const [applications, projects] = await Promise.all([
    getCurrentApplications(),
    getPublishedProjects(),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mis solicitudes</h1>
      <div className="grid gap-4">
        {applications.map((application) => {
          const project = projects.find((item) => item.id === application.projectId);

          return (
            <article key={application.id} className="rounded-[8px] border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {project?.title ?? "Proyecto"}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Enviada el {application.submittedAt}
                  </p>
                </div>
                <Badge tone="green">
                  {applicationStatusLabels[application.status]}
                </Badge>
              </div>
              <p className="mt-4 text-sm text-muted">
                Estimación: {formatMoney(application.estimatedAmountCents)}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

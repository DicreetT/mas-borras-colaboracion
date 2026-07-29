import { AlertCircle } from "lucide-react";
import { getAdminSummary } from "@/data/admin";

export default async function AdminHomePage() {
  const adminSummary = await getAdminSummary();
  const metrics = [
    ["Proyectos publicados", adminSummary.publishedProjects],
    ["Proyectos próximos", adminSummary.upcomingProjects],
    ["Solicitudes pendientes", adminSummary.pendingApplications],
    ["Plazas ocupadas", adminSummary.occupiedPlaces],
    ["Lista de espera", adminSummary.waitlistedApplications],
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          Resumen
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">
          Panel operativo
        </h1>
      </div>
      <section className="grid gap-4 md:grid-cols-5">
        {metrics.map(([label, value]) => (
          <div key={String(label)} className="rounded-[8px] border border-line bg-surface p-4">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-muted">{label}</p>
          </div>
        ))}
      </section>
      <section className="rounded-[8px] border border-line bg-surface p-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <AlertCircle className="h-5 w-5 text-terracotta" aria-hidden />
          Avisos recientes
        </h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
          {adminSummary.recentAlerts.map((alert) => (
            <li key={alert}>{alert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import { CalendarDays } from "lucide-react";
import { MonthlyCalendar } from "@/components/admin/monthly-calendar";
import { getAdminProjects } from "@/data/projects";

export default async function CalendarPage() {
  const projects = await getAdminProjects();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Calendario</h1>
      <MonthlyCalendar projects={projects} />
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.id} className="flex gap-4 rounded-[8px] border border-line bg-surface p-5">
            <CalendarDays className="h-5 w-5 text-olive" aria-hidden />
            <div>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-muted">{project.dates[0]?.label}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

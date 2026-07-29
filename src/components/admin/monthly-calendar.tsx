"use client";

import { CalendarDays, LogIn, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { programTypeLabels } from "@/domain/collaboration/labels";
import type { Project } from "@/domain/collaboration/types";

type CalendarFilter = "projects" | "arrivals" | "departures";

const filters: { id: CalendarFilter; label: string }[] = [
  { id: "projects", label: "Proyectos" },
  { id: "arrivals", label: "Llegadas" },
  { id: "departures", label: "Salidas" },
];

export function MonthlyCalendar({ projects }: { projects: Project[] }) {
  const firstDate =
    projects
      .flatMap((project) => project.dates)
      .find((date) => date.startDate)?.startDate ?? new Date().toISOString();
  const initialDate = new Date(`${firstDate}T12:00:00`);
  const [cursor, setCursor] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [activeFilters, setActiveFilters] = useState<CalendarFilter[]>([
    "projects",
    "arrivals",
    "departures",
  ]);
  const days = useMemo(() => buildMonth(cursor), [cursor]);
  const events = useMemo(
    () => buildEvents(projects, activeFilters),
    [activeFilters, projects],
  );
  const monthFormatter = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  });

  function toggleFilter(filter: CalendarFilter) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  function moveMonth(offset: number) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  return (
    <section className="grid gap-5 rounded-[8px] border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
            Vista mensual
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold capitalize">
            {monthFormatter.format(cursor)}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-mist"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <label
            key={filter.id}
            className="flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2 text-sm font-medium"
          >
            <input
              type="checkbox"
              checked={activeFilters.includes(filter.id)}
              onChange={() => toggleFilter(filter.id)}
              className="h-4 w-4 accent-olive"
            />
            {filter.label}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[8px] border border-line bg-line">
        {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
          <div key={day} className="bg-surface-soft p-2 text-center text-xs font-semibold text-muted">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.date === day.key);

          return (
            <div
              key={day.key}
              className={`min-h-28 bg-background p-2 ${
                day.inMonth ? "" : "text-muted opacity-45"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{day.day}</span>
                {dayEvents.length > 0 ? (
                  <span className="rounded-full bg-olive px-2 py-0.5 text-xs font-semibold text-white">
                    {dayEvents.length}
                  </span>
                ) : null}
              </div>
              <div className="mt-2 grid gap-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-[6px] border px-2 py-1 text-xs leading-4 ${event.tone}`}
                  >
                    <span className="flex items-center gap-1 font-semibold">
                      {event.icon}
                      {event.label}
                    </span>
                    <span className="block truncate">{event.projectTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="green">{programTypeLabels.community_legacy}</Badge>
        <Badge tone="clay">{programTypeLabels.specialized_maintenance}</Badge>
      </div>
    </section>
  );
}

function buildMonth(cursor: Date) {
  const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const firstWeekday = (start.getDay() + 6) % 7;
  const gridStart = new Date(start);
  gridStart.setDate(start.getDate() - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      key: date.toISOString().slice(0, 10),
      day: date.getDate(),
      inMonth: date.getMonth() === cursor.getMonth(),
    };
  });
}

function buildEvents(projects: Project[], activeFilters: CalendarFilter[]) {
  return projects.flatMap((project) => {
    const tone =
      project.type === "community_legacy"
        ? "border-sage bg-mist text-olive-dark"
        : "border-clay bg-[#f7e5d4] text-terracotta";

    return project.dates.flatMap((date) => {
      const items = [];

      if (activeFilters.includes("projects") && date.startDate) {
        items.push({
          id: `${project.id}-project-${date.id}`,
          date: date.startDate,
          label: "Proyecto",
          projectTitle: project.title,
          tone,
          icon: <CalendarDays className="h-3 w-3" aria-hidden="true" />,
        });
      }

      if (activeFilters.includes("arrivals") && date.startDate) {
        items.push({
          id: `${project.id}-arrival-${date.id}`,
          date: date.startDate,
          label: "Llegada",
          projectTitle: `${project.occupiedPlaces}/${project.capacity} plazas`,
          tone,
          icon: <LogIn className="h-3 w-3" aria-hidden="true" />,
        });
      }

      if (activeFilters.includes("departures") && date.endDate) {
        items.push({
          id: `${project.id}-departure-${date.id}`,
          date: date.endDate,
          label: "Salida",
          projectTitle: project.title,
          tone,
          icon: <LogOut className="h-3 w-3" aria-hidden="true" />,
        });
      }

      return items;
    });
  });
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  projectFormSchema,
  type ProjectFormValues,
} from "@/domain/collaboration/schemas";
import type { Project } from "@/domain/collaboration/types";

const defaultValues: ProjectFormValues = {
  title: "",
  type: "community_legacy",
  summary: "",
  difficulty: "light",
  capacity: 6,
  startDate: "",
  endDate: "",
  collaborationHoursPerDay: 4,
  lodgingIncluded: true,
  optionalMenu: true,
  menuPricePerDay: 24,
  sharedRoomPricePerNight: 0,
  privateRoomPricePerNight: 16,
  breakfastPricePerDay: 8,
  breakfastDinnerPricePerDay: 19,
  fullBoardPricePerDay: 24,
  conditions: "La solicitud requiere revisión del equipo antes de confirmar plaza.",
};

export function ProjectForm({ project }: { project?: Project }) {
  const [saved, setSaved] = useState(false);
  const initialValues: ProjectFormValues = project
    ? {
        title: project.title,
        type: project.type,
        summary: project.summary,
        difficulty: project.difficulty,
        capacity: project.capacity,
        startDate: project.dates[0]?.startDate ?? "",
        endDate: project.dates[0]?.endDate ?? "",
        collaborationHoursPerDay:
          project.modalities[0]?.collaborationHoursPerDay ?? 0,
        lodgingIncluded: project.modalities[0]?.lodgingIncluded ?? false,
        optionalMenu: project.modalities[0]?.optionalMenu ?? false,
        menuPricePerDay:
          (project.modalities[0]?.menuPricePerDayCents ?? 0) / 100,
        sharedRoomPricePerNight:
          (project.modalities[0]?.roomOptions.find(
            (option) => option.roomType === "shared",
          )?.pricePerNightCents ?? 0) / 100,
        privateRoomPricePerNight:
          (project.modalities[0]?.roomOptions.find(
            (option) => option.roomType === "private",
          )?.pricePerNightCents ?? 0) / 100,
        breakfastPricePerDay:
          (project.modalities[0]?.mealOptions.find(
            (option) => option.planType === "breakfast",
          )?.pricePerDayCents ?? 0) / 100,
        breakfastDinnerPricePerDay:
          (project.modalities[0]?.mealOptions.find(
            (option) => option.planType === "breakfast_dinner",
          )?.pricePerDayCents ?? 0) / 100,
        fullBoardPricePerDay:
          (project.modalities[0]?.mealOptions.find(
            (option) => option.planType === "full_board",
          )?.pricePerDayCents ?? 0) / 100,
        conditions: project.modalities[0]?.conditions ?? defaultValues.conditions,
      }
    : defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit() {
    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 rounded-[8px] border border-line bg-surface p-5"
    >
      {saved ? (
        <div
          role="status"
          className="rounded-[8px] border border-sage bg-mist p-4 text-sm font-medium text-olive-dark"
        >
          Cambios validados en la demo. En Fase 2 se guardarán en Supabase.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" error={errors.title?.message}>
          <input
            {...register("title")}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </Field>
        <Field label="Tipo de programa" error={errors.type?.message}>
          <select
            {...register("type")}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          >
            <option value="community_legacy">Comunidad y legado</option>
            <option value="specialized_maintenance">
              Cuidado y mantenimiento especializado
            </option>
          </select>
        </Field>
      </div>

      <Field label="Descripción breve" error={errors.summary?.message}>
        <textarea
          {...register("summary")}
          rows={4}
          className="rounded-[8px] border border-line bg-background px-3 py-2"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Dificultad" error={errors.difficulty?.message}>
          <select
            {...register("difficulty")}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          >
            <option value="light">Ligera</option>
            <option value="moderate">Moderada</option>
            <option value="project_based">Según proyecto</option>
          </select>
        </Field>
        <Field label="Cupo" error={errors.capacity?.message}>
          <input
            type="number"
            {...register("capacity", { valueAsNumber: true })}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </Field>
        <Field
          label="Horas de colaboración al día"
          error={errors.collaborationHoursPerDay?.message}
        >
          <input
            type="number"
            step="0.5"
            {...register("collaborationHoursPerDay", { valueAsNumber: true })}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Fecha de inicio" error={errors.startDate?.message}>
          <input
            type="date"
            {...register("startDate")}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </Field>
        <Field label="Fecha de fin" error={errors.endDate?.message}>
          <input
            type="date"
            {...register("endDate")}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </Field>
      </div>

      <section className="grid gap-4 rounded-[8px] border border-line bg-background p-4">
        <div>
          <h2 className="text-lg font-semibold">Modalidad base</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            En esta demo se edita una modalidad principal. La siguiente fase
            podrá añadir, duplicar o ordenar varias modalidades por proyecto.
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium">
          <input type="checkbox" {...register("lodgingIncluded")} className="h-5 w-5 accent-olive" />
          Alojamiento incluido
        </label>
        <label className="flex items-center gap-3 text-sm font-medium">
          <input type="checkbox" {...register("optionalMenu")} className="h-5 w-5 accent-olive" />
          Menú opcional disponible
        </label>
        <Field label="Precio del menú por día" error={errors.menuPricePerDay?.message}>
          <input
            type="number"
            step="1"
            {...register("menuPricePerDay", { valueAsNumber: true })}
            className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
          />
        </Field>
      </section>

      <section className="grid gap-4 rounded-[8px] border border-line bg-background p-4">
        <div>
          <h2 className="text-lg font-semibold">Habitaciones</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Define suplementos por noche. Si el alojamiento compartido está
            incluido, deja su precio en 0.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Habitación compartida · suplemento por noche"
            error={errors.sharedRoomPricePerNight?.message}
          >
            <input
              type="number"
              step="1"
              {...register("sharedRoomPricePerNight", { valueAsNumber: true })}
              className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
            />
          </Field>
          <Field
            label="Habitación privada · suplemento por noche"
            error={errors.privateRoomPricePerNight?.message}
          >
            <input
              type="number"
              step="1"
              {...register("privateRoomPricePerNight", { valueAsNumber: true })}
              className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
            />
          </Field>
        </div>
      </section>

      <section className="grid gap-4 rounded-[8px] border border-line bg-background p-4">
        <div>
          <h2 className="text-lg font-semibold">Comidas disponibles</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Estos importes alimentan la calculadora: sin comidas, desayuno,
            desayuno y cena, o menú completo.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Desayuno · precio por día"
            error={errors.breakfastPricePerDay?.message}
          >
            <input
              type="number"
              step="1"
              {...register("breakfastPricePerDay", { valueAsNumber: true })}
              className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
            />
          </Field>
          <Field
            label="Desayuno y cena · precio por día"
            error={errors.breakfastDinnerPricePerDay?.message}
          >
            <input
              type="number"
              step="1"
              {...register("breakfastDinnerPricePerDay", {
                valueAsNumber: true,
              })}
              className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
            />
          </Field>
          <Field
            label="Menú completo · precio por día"
            error={errors.fullBoardPricePerDay?.message}
          >
            <input
              type="number"
              step="1"
              {...register("fullBoardPricePerDay", { valueAsNumber: true })}
              className="min-h-11 rounded-[8px] border border-line bg-surface px-3"
            />
          </Field>
        </div>
      </section>

      <Field label="Condiciones particulares" error={errors.conditions?.message}>
        <textarea
          {...register("conditions")}
          rows={4}
          className="rounded-[8px] border border-line bg-background px-3 py-2"
        />
      </Field>

      <button
        type="submit"
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-olive bg-olive px-5 text-sm font-semibold text-white hover:bg-olive-dark"
      >
        <Save className="h-4 w-4" aria-hidden="true" />
        Guardar borrador simulado
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
      {error ? <span className="text-sm text-terracotta">{error}</span> : null}
    </label>
  );
}

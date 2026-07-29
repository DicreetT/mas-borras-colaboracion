"use client";

import { Calculator, CheckCircle2, Clock, Home, Utensils } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  formatMoney,
  estimateStayAmount,
  getNights,
} from "@/domain/collaboration/pricing";
import { mealPlanLabels, roomTypeLabels } from "@/domain/collaboration/labels";
import type { Project } from "@/domain/collaboration/types";

export function ModalityCalculator({ project }: { project: Project }) {
  const firstModality = project.modalities[0];
  const [selectedModalityId, setSelectedModalityId] = useState(firstModality?.id);
  const selectedModality =
    project.modalities.find((modality) => modality.id === selectedModalityId) ??
    firstModality;
  const defaultNights = getNights(
    project.dates[0]?.startDate,
    project.dates[0]?.endDate,
  );
  const [nights, setNights] = useState(defaultNights);
  const [mealDays, setMealDays] = useState(defaultNights);
  const [roomOptionId, setRoomOptionId] = useState<string | undefined>(
    firstModality?.defaultRoomOptionId ?? firstModality?.roomOptions[0]?.id,
  );
  const [mealOptionId, setMealOptionId] = useState<string | undefined>(
    firstModality?.defaultMealOptionId ?? firstModality?.mealOptions[0]?.id,
  );
  const [workOptionId, setWorkOptionId] = useState<string | undefined>(
    firstModality?.defaultWorkOptionId ?? firstModality?.workOptions[0]?.id,
  );
  const [dietaryChoice, setDietaryChoice] = useState<"vegetarian" | "omnivore">(
    "vegetarian",
  );

  const selectedRoom =
    selectedModality.roomOptions.find((option) => option.id === roomOptionId) ??
    selectedModality.roomOptions[0];
  const selectedMeal =
    selectedModality.mealOptions.find((option) => option.id === mealOptionId) ??
    selectedModality.mealOptions[0];
  const selectedWork =
    selectedModality.workOptions.find((option) => option.id === workOptionId) ??
    selectedModality.workOptions[0];

  const estimate = useMemo(() => {
    if (!selectedModality) {
      return null;
    }

    return estimateStayAmount({
      modality: selectedModality,
      nights,
      mealDays,
      roomOptionId,
      mealOptionId,
    });
  }, [mealDays, mealOptionId, nights, roomOptionId, selectedModality]);

  if (!selectedModality) {
    return null;
  }

  const basePerNight = selectedModality.pricePerNightCents ?? null;
  const lodgingSubtotal =
    basePerNight === null
      ? null
      : nights * (basePerNight + (selectedRoom?.pricePerNightCents ?? 0));
  const mealSubtotal = mealDays * (selectedMeal?.pricePerDayCents ?? 0);

  function selectModality(modalityId: string) {
    const nextModality = project.modalities.find(
      (modality) => modality.id === modalityId,
    );

    setSelectedModalityId(modalityId);
    setRoomOptionId(
      nextModality?.defaultRoomOptionId ?? nextModality?.roomOptions[0]?.id,
    );
    setMealOptionId(
      nextModality?.defaultMealOptionId ?? nextModality?.mealOptions[0]?.id,
    );
    setWorkOptionId(
      nextModality?.defaultWorkOptionId ?? nextModality?.workOptions[0]?.id,
    );
  }

  return (
    <section
      aria-labelledby="modalidad-title"
      className="rounded-[8px] border border-line bg-surface p-5 soft-shadow"
    >
      <div className="flex items-start gap-3">
        <Calculator className="mt-1 h-5 w-5 text-terracotta" aria-hidden="true" />
        <div>
          <h2 id="modalidad-title" className="font-serif text-3xl font-semibold">
            Modalidad e importe estimado
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Esta estimación no supone reserva, pago ni confirmación de plaza.
          </p>
        </div>
      </div>

      <fieldset className="mt-6 grid gap-3">
        <legend className="text-sm font-semibold">Elige una modalidad</legend>
        {project.modalities.map((modality) => (
          <label
            key={modality.id}
            className={`grid cursor-pointer gap-3 rounded-[8px] border p-4 transition ${
              selectedModality.id === modality.id
                ? "border-olive bg-mist"
                : "border-line bg-background hover:border-olive"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="modality"
                value={modality.id}
                checked={selectedModality.id === modality.id}
                onChange={(event) => selectModality(event.target.value)}
                className="mt-1 h-5 w-5 accent-olive"
              />
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{modality.name}</span>
                  {modality.isFlexibleBuilder ? (
                    <Badge tone="clay">Configurable</Badge>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted">
                  {modality.description}
                </span>
              </span>
            </span>
            <span className="flex flex-wrap gap-2 pl-8">
              <Badge tone={modality.lodgingIncluded ? "green" : "neutral"}>
                {modality.lodgingIncluded
                  ? "Alojamiento incluido"
                  : `${formatMoney(modality.pricePerNightCents)} / noche`}
              </Badge>
              <Badge tone="mist">
                {modality.roomOptions.length} opción
                {modality.roomOptions.length === 1 ? "" : "es"} de habitación
              </Badge>
              <Badge tone="mist">
                {modality.mealOptions.length} opción
                {modality.mealOptions.length === 1 ? "" : "es"} de comida
              </Badge>
              {modality.collaborationHoursPerDay !== null ? (
                <Badge tone="clay">
                  {modality.collaborationHoursPerDay} h diarias
                </Badge>
              ) : null}
            </span>
          </label>
        ))}
      </fieldset>

      {!selectedModality.isCustomAgreement ? (
        <div className="mt-6 grid gap-5">
          <OptionGroup
            title="Habitación"
            icon={<Home className="h-4 w-4" aria-hidden="true" />}
          >
            {selectedModality.roomOptions.map((option) => (
              <ChoiceCard
                key={option.id}
                name="room-option"
                checked={selectedRoom?.id === option.id}
                onChange={() => setRoomOptionId(option.id)}
                title={option.name}
                description={`${roomTypeLabels[option.roomType]}. ${option.description}`}
                price={
                  option.pricePerNightCents === 0
                    ? option.included
                      ? "Incluido"
                      : "+0 € / noche"
                    : `+${formatMoney(option.pricePerNightCents)} / noche`
                }
              />
            ))}
          </OptionGroup>

          <OptionGroup
            title="Comidas"
            icon={<Utensils className="h-4 w-4" aria-hidden="true" />}
          >
            {selectedModality.mealOptions.map((option) => (
              <ChoiceCard
                key={option.id}
                name="meal-option"
                checked={selectedMeal?.id === option.id}
                onChange={() => setMealOptionId(option.id)}
                title={option.name}
                description={`${mealPlanLabels[option.planType]}. ${option.description}`}
                price={
                  option.pricePerDayCents === 0
                    ? "Sin coste"
                    : `${formatMoney(option.pricePerDayCents)} / día`
                }
              />
            ))}
          </OptionGroup>

          {selectedMeal && selectedMeal.pricePerDayCents > 0 ? (
            <OptionGroup
              title="Preferencia de menú"
              icon={<Utensils className="h-4 w-4" aria-hidden="true" />}
            >
              <ChoiceCard
                name="dietary-choice"
                checked={dietaryChoice === "vegetarian"}
                onChange={() => setDietaryChoice("vegetarian")}
                title="Vegetariano"
                description="Menú sin carne ni pescado. Las alergias o necesidades concretas se revisarán en la solicitud."
                price="Mismo precio"
              />
              <ChoiceCard
                name="dietary-choice"
                checked={dietaryChoice === "omnivore"}
                onChange={() => setDietaryChoice("omnivore")}
                title="Omnívoro"
                description="Menú general de la casa, sujeto a disponibilidad y organización de la estancia."
                price="Mismo precio"
              />
            </OptionGroup>
          ) : null}

          <OptionGroup
            title="Ritmo de colaboración"
            icon={<Clock className="h-4 w-4" aria-hidden="true" />}
          >
            {selectedModality.workOptions.map((option) => (
              <ChoiceCard
                key={option.id}
                name="work-option"
                checked={selectedWork?.id === option.id}
                onChange={() => setWorkOptionId(option.id)}
                title={option.label}
                description={option.description}
                price="No cambia el importe"
              />
            ))}
          </OptionGroup>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Número de noches
          <input
            type="number"
            min="1"
            max="30"
            value={nights}
            onChange={(event) => setNights(Number(event.target.value))}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            disabled={selectedModality.isCustomAgreement}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Días con comidas seleccionadas
          <input
            type="number"
            min="0"
            max="30"
            value={mealDays}
            onChange={(event) => setMealDays(Number(event.target.value))}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            disabled={
              selectedModality.isCustomAgreement ||
              !selectedMeal ||
              selectedMeal.pricePerDayCents === 0
            }
          />
        </label>
      </div>

      <div className="mt-6 rounded-[8px] border border-line bg-background p-4">
        <p className="text-sm font-semibold text-muted">Importe estimado</p>
        <p className="mt-1 font-serif text-4xl font-semibold">
          {formatMoney(estimate)}
        </p>
        {!selectedModality.isCustomAgreement ? (
          <dl className="mt-4 grid gap-2 border-t border-line pt-4 text-sm text-muted">
            <div className="flex justify-between gap-4">
              <dt>
                Estancia y habitación · {nights} noche
                {nights === 1 ? "" : "s"}
              </dt>
              <dd className="font-semibold text-foreground">
                {formatMoney(lodgingSubtotal)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>
                Comidas · {selectedMeal?.name ?? "Sin comidas"} · {mealDays} día
                {mealDays === 1 ? "" : "s"}
              </dt>
              <dd className="font-semibold text-foreground">
                {formatMoney(mealSubtotal)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Colaboración</dt>
              <dd className="font-semibold text-foreground">
                {selectedWork?.label ?? "Por acordar"}
              </dd>
            </div>
            {selectedMeal && selectedMeal.pricePerDayCents > 0 ? (
              <div className="flex justify-between gap-4">
                <dt>Preferencia</dt>
                <dd className="font-semibold text-foreground">
                  {dietaryChoice === "vegetarian" ? "Vegetariano" : "Omnívoro"}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-muted">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden />
          {selectedModality.conditions}
        </p>
      </div>
    </section>
  );
}

function OptionGroup({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </legend>
      <div className="grid gap-3">{children}</div>
    </fieldset>
  );
}

function ChoiceCard({
  name,
  checked,
  onChange,
  title,
  description,
  price,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
  price: string;
}) {
  return (
    <label
      className={`grid cursor-pointer gap-2 rounded-[8px] border p-3 transition ${
        checked ? "border-olive bg-mist" : "border-line bg-background hover:border-olive"
      }`}
    >
      <span className="flex items-start gap-3">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-1 h-5 w-5 accent-olive"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold">{title}</span>
            <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-olive-dark">
              {price}
            </span>
          </span>
          <span className="mt-1 block text-sm leading-6 text-muted">
            {description}
          </span>
        </span>
      </span>
    </label>
  );
}

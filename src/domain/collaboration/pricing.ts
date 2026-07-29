import type { ProjectModality } from "./types";

export function formatMoney(cents: number | null): string {
  if (cents === null) {
    return "Condiciones acordadas individualmente";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function estimateStayAmount({
  modality,
  nights,
  mealDays,
  roomOptionId,
  mealOptionId,
}: {
  modality: ProjectModality;
  nights: number;
  mealDays: number;
  roomOptionId?: string;
  mealOptionId?: string;
}): number | null {
  if (modality.isCustomAgreement || modality.pricePerNightCents === null) {
    return null;
  }

  const selectedRoom =
    modality.roomOptions.find((option) => option.id === roomOptionId) ??
    modality.roomOptions.find(
      (option) => option.id === modality.defaultRoomOptionId,
    );
  const selectedMeal =
    modality.mealOptions.find((option) => option.id === mealOptionId) ??
    modality.mealOptions.find(
      (option) => option.id === modality.defaultMealOptionId,
    );
  const safeNights = Math.max(0, nights);
  const lodging =
    safeNights *
    (modality.pricePerNightCents + (selectedRoom?.pricePerNightCents ?? 0));
  const meals = Math.max(0, mealDays) * (selectedMeal?.pricePerDayCents ?? 0);

  return lodging + meals;
}

export function getNights(startDate?: string, endDate?: string): number {
  if (!startDate || !endDate) {
    return 4;
  }

  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  const diff = end.getTime() - start.getTime();

  return Math.max(1, Math.round(diff / 86_400_000));
}

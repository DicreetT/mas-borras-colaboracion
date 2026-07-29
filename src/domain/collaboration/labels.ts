import type {
  ApplicationStatus,
  Difficulty,
  MealPlanType,
  ProgramType,
  RoomType,
} from "./types";

export const programTypeLabels: Record<ProgramType, string> = {
  community_legacy: "Comunidad y legado",
  specialized_maintenance: "Cuidado y mantenimiento especializado",
};

export const difficultyLabels: Record<Difficulty, string> = {
  light: "Ligera",
  moderate: "Moderada",
  project_based: "Según proyecto",
};

export const roomTypeLabels: Record<RoomType, string> = {
  private: "Habitación privada",
  shared: "Habitación compartida",
  either: "Privada o compartida",
  to_agree: "Por acordar",
};

export const mealPlanLabels: Record<MealPlanType, string> = {
  none: "Sin comidas",
  breakfast: "Desayuno",
  breakfast_dinner: "Desayuno y cena",
  full_board: "Desayuno, comida y cena",
  self_catered: "Autogestionado",
  to_agree: "Por acordar",
};

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  draft: "Borrador",
  submitted: "Enviada",
  under_review: "En revisión",
  information_requested: "Información solicitada",
  waitlisted: "Lista de espera",
  accepted: "Aceptada",
  confirmed: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
  completed: "Completada",
};

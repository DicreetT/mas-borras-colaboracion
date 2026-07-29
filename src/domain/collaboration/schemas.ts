import { z } from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(4, "Añade un título más descriptivo."),
  type: z.enum(["community_legacy", "specialized_maintenance"]),
  summary: z.string().min(20, "Describe el propósito del proyecto."),
  heroImageUrl: z
    .string()
    .url("Usa una URL válida o sube una imagen desde tu equipo.")
    .optional()
    .or(z.literal("")),
  imageAlt: z.string().min(8, "Describe brevemente la imagen de portada."),
  purpose: z.string().optional(),
  coordinatorMessage: z.string().optional(),
  tasksText: z.string().optional(),
  difficulty: z.enum(["light", "moderate", "project_based"]),
  capacity: z.number().int().min(1).max(30),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  collaborationHoursPerDay: z.number().min(0).max(8),
  lodgingIncluded: z.boolean(),
  optionalMenu: z.boolean(),
  menuPricePerDay: z.number().min(0).max(120),
  sharedRoomPricePerNight: z.number().min(0).max(300),
  privateRoomPricePerNight: z.number().min(0).max(300),
  breakfastPricePerDay: z.number().min(0).max(80),
  lunchPricePerDay: z.number().min(0).max(100),
  dinnerPricePerDay: z.number().min(0).max(100),
  coffeeCornerPricePerDay: z.number().min(0).max(80),
  breakfastDinnerPricePerDay: z.number().min(0).max(120),
  fullBoardPricePerDay: z.number().min(0).max(160),
  vegetarianMenuAvailable: z.boolean(),
  omnivoreMenuAvailable: z.boolean(),
  conditions: z.string().min(10, "Incluye condiciones particulares."),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

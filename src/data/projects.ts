import { mockProjects } from "@/data/mock";
import type {
  MealPlanType,
  Project,
  ProjectModality,
  RoomType,
} from "@/domain/collaboration/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type DbProjectWithRelations = {
  id: string;
  slug: string;
  title: string;
  type: Project["type"];
  status: Project["status"];
  summary: string;
  description: string;
  difficulty: Project["difficulty"];
  capacity: number;
  occupied_places: number;
  location: string;
  hero_image: string | null;
  image_alt: string | null;
  requirements: string[];
  includes: string[];
  published_at: string | null;
  project_dates?: DbProjectDate[];
  project_modalities?: DbProjectModality[];
};

type DbProjectDate = {
  id: string;
  project_id: string;
  label: string;
  start_date: string | null;
  end_date: string | null;
  is_flexible: boolean;
  sort_order: number;
};

type DbProjectModality = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  price_per_night_cents: number | null;
  lodging_included: boolean;
  meals_included: boolean;
  optional_menu: boolean;
  menu_price_per_day_cents: number | null;
  collaboration_hours_per_day: number | null;
  room_type: RoomType;
  deposit_required: boolean;
  deposit_amount_cents: number | null;
  conditions: string;
  is_custom_agreement: boolean;
  is_flexible_builder: boolean;
  sort_order: number;
  project_modality_room_options?: DbRoomOption[];
  project_modality_meal_options?: DbMealOption[];
  project_modality_work_options?: DbWorkOption[];
};

type DbRoomOption = {
  id: string;
  name: string;
  room_type: RoomType;
  description: string;
  price_per_night_cents: number;
  included: boolean;
  is_default: boolean;
  sort_order: number;
};

type DbMealOption = {
  id: string;
  name: string;
  plan_type: MealPlanType;
  description: string;
  included_meals: string[];
  price_per_day_cents: number;
  included: boolean;
  is_default: boolean;
  sort_order: number;
};

type DbWorkOption = {
  id: string;
  label: string;
  hours_per_day: number;
  description: string;
  is_default: boolean;
  sort_order: number;
};

const projectSelect = `
  *,
  project_dates (*),
  project_modalities (
    *,
    project_modality_room_options (*),
    project_modality_meal_options (*),
    project_modality_work_options (*)
  )
`;

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockProjects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading projects from Supabase", error);
    return mockProjects;
  }

  return (data as unknown as DbProjectWithRelations[]).map(mapProject);
}

export async function getAdminProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockProjects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading admin projects from Supabase", error);
    return mockProjects;
  }

  return (data as unknown as DbProjectWithRelations[]).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockProjects.find((project) => project.slug === slug);
  }

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error loading project from Supabase", error);
    return mockProjects.find((project) => project.slug === slug);
  }

  return mapProject(data as unknown as DbProjectWithRelations);
}

function mapProject(project: DbProjectWithRelations): Project {
  const dates = [...(project.project_dates ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const modalities = [...(project.project_modalities ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    type: project.type,
    status: project.status,
    summary: project.summary,
    description: project.description,
    difficulty: project.difficulty,
    capacity: project.capacity,
    occupiedPlaces: project.occupied_places,
    location: project.location,
    heroImage: project.hero_image ?? "",
    imageAlt: project.image_alt ?? project.title,
    requirements: project.requirements,
    includes: project.includes,
    publishedAt: project.published_at ?? undefined,
    dates: dates.map((date) => ({
      id: date.id,
      projectId: date.project_id,
      label: date.label,
      startDate: date.start_date ?? undefined,
      endDate: date.end_date ?? undefined,
      isFlexible: date.is_flexible,
    })),
    modalities: modalities.map(mapModality),
  };
}

function mapModality(modality: DbProjectModality): ProjectModality {
  const roomOptions = [...(modality.project_modality_room_options ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const mealOptions = [...(modality.project_modality_meal_options ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const workOptions = [...(modality.project_modality_work_options ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return {
    id: modality.id,
    projectId: modality.project_id,
    name: modality.name,
    description: modality.description,
    pricePerNightCents: modality.price_per_night_cents,
    lodgingIncluded: modality.lodging_included,
    mealsIncluded: modality.meals_included,
    optionalMenu: modality.optional_menu,
    menuPricePerDayCents: modality.menu_price_per_day_cents,
    collaborationHoursPerDay: modality.collaboration_hours_per_day,
    roomType: modality.room_type,
    depositRequired: modality.deposit_required,
    depositAmountCents: modality.deposit_amount_cents,
    conditions: modality.conditions,
    isCustomAgreement: modality.is_custom_agreement,
    isFlexibleBuilder: modality.is_flexible_builder,
    roomOptions: roomOptions.map((option) => ({
      id: option.id,
      name: option.name,
      roomType: option.room_type,
      description: option.description,
      pricePerNightCents: option.price_per_night_cents,
      included: option.included,
    })),
    defaultRoomOptionId: roomOptions.find((option) => option.is_default)?.id,
    mealOptions: mealOptions.map((option) => ({
      id: option.id,
      name: option.name,
      planType: option.plan_type,
      description: option.description,
      includedMeals: option.included_meals,
      pricePerDayCents: option.price_per_day_cents,
      included: option.included,
    })),
    defaultMealOptionId: mealOptions.find((option) => option.is_default)?.id,
    workOptions: workOptions.map((option) => ({
      id: option.id,
      label: option.label,
      hoursPerDay: option.hours_per_day,
      description: option.description,
    })),
    defaultWorkOptionId: workOptions.find((option) => option.is_default)?.id,
  };
}

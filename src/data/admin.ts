import { adminSummary, mockApplications, mockProfiles } from "@/data/mock";
import type { AdminSummary, Application, Profile } from "@/domain/collaboration/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminSummary(): Promise<AdminSummary> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return adminSummary;
  }

  const [
    publishedProjects,
    upcomingProjects,
    pendingApplications,
    occupiedPlaces,
    waitlistedApplications,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("project_dates").select("id", { count: "exact", head: true }).gte("start_date", new Date().toISOString().slice(0, 10)),
    supabase.from("applications").select("id", { count: "exact", head: true }).in("status", ["submitted", "under_review", "information_requested"]),
    supabase.from("applications").select("id", { count: "exact", head: true }).in("status", ["accepted", "confirmed"]),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "waitlisted"),
  ]);

  return {
    publishedProjects: publishedProjects.count ?? 0,
    upcomingProjects: upcomingProjects.count ?? 0,
    pendingApplications: pendingApplications.count ?? 0,
    occupiedPlaces: occupiedPlaces.count ?? 0,
    waitlistedApplications: waitlistedApplications.count ?? 0,
    recentAlerts: [
      "Revisa las solicitudes pendientes antes de confirmar plazas.",
      "Las colaboraciones especializadas deben validarse individualmente.",
    ],
  };
}

export async function getAdminApplications(): Promise<Application[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockApplications;
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading admin applications from Supabase", error);
    return [];
  }

  return data.map((application) => ({
    id: application.id,
    projectId: application.project_id,
    modalityId: application.modality_id,
    profileId: application.profile_id,
    status: application.status,
    submittedAt: application.submitted_at ?? undefined,
    estimatedAmountCents: application.estimated_amount_cents,
    nights: application.nights,
    menuDays: application.meal_days,
    motivation: application.motivation ?? undefined,
    notes: application.notes ?? undefined,
    internalNotes: application.internal_notes ?? undefined,
  }));
}

export async function getAdminProfiles(): Promise<Profile[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockProfiles;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading admin profiles from Supabase", error);
    return [];
  }

  return data.map((profile) => ({
    id: profile.id,
    role: profile.role,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    phone: profile.phone ?? undefined,
    locality: profile.locality ?? undefined,
    country: profile.country ?? undefined,
    languages: profile.languages,
    profession: profile.profession ?? undefined,
    skills: [],
    experience: profile.experience ?? undefined,
    priorRelationship: profile.prior_relationship ?? undefined,
    accessibilityNeeds: profile.accessibility_needs ?? undefined,
    dietaryPreferences: profile.dietary_preferences ?? undefined,
    emergencyContact: profile.emergency_contact ?? undefined,
  }));
}

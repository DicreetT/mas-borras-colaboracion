import { mockApplications, mockMessages, mockProfiles, mockStays } from "@/data/mock";
import type {
  Application,
  Message,
  Profile,
  Stay,
} from "@/domain/collaboration/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile(): Promise<Profile> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockProfiles[0];
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return mockProfiles[0];
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    console.error("Error loading profile from Supabase", error);
    return {
      ...mockProfiles[0],
      id: user.id,
      email: user.email ?? mockProfiles[0].email,
    };
  }

  const { data: skills } = await supabase
    .from("profile_skills")
    .select("skill")
    .eq("profile_id", user.id)
    .order("skill");

  return {
    id: data.id,
    role: data.role,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone ?? undefined,
    locality: data.locality ?? undefined,
    country: data.country ?? undefined,
    languages: data.languages,
    profession: data.profession ?? undefined,
    skills: skills?.map((row) => row.skill) ?? [],
    experience: data.experience ?? undefined,
    priorRelationship: data.prior_relationship ?? undefined,
    accessibilityNeeds: data.accessibility_needs ?? undefined,
    dietaryPreferences: data.dietary_preferences ?? undefined,
    emergencyContact: data.emergency_contact ?? undefined,
  };
}

export async function getCurrentApplications(): Promise<Application[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockApplications;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading applications from Supabase", error);
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
    notes: application.notes ?? undefined,
  }));
}

export async function getCurrentStays(): Promise<Stay[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockStays;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("stays")
    .select("*")
    .eq("profile_id", user.id)
    .order("arrival_date", { ascending: true });

  if (error || !data) {
    console.error("Error loading stays from Supabase", error);
    return [];
  }

  return data.map((stay) => ({
    id: stay.id,
    profileId: stay.profile_id,
    projectId: stay.project_id,
    applicationId: stay.application_id,
    status: stay.status,
    arrivalDate: stay.arrival_date,
    departureDate: stay.departure_date,
  }));
}

export async function getCurrentMessages(): Promise<Message[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockMessages;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("recipient_profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading messages from Supabase", error);
    return [];
  }

  return data.map((message) => ({
    id: message.id,
    profileId: message.recipient_profile_id,
    projectId: message.project_id ?? undefined,
    subject: message.subject,
    body: message.body,
    createdAt: message.created_at,
    read: message.read,
  }));
}

export async function isCurrentUserAdmin() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return true;
  }

  const { data, error } = await supabase.rpc("is_admin");

  if (error) {
    console.error("Error checking admin role", error);
    return false;
  }

  return data;
}

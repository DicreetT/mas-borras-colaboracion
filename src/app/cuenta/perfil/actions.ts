"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getList(formData: FormData, key: string) {
  return getString(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function updateProfileAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/cuenta/perfil?saved=demo");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/acceso?next=/cuenta/perfil");
  }

  await supabase
    .from("profiles")
    .update({
      first_name: getString(formData, "first_name"),
      last_name: getString(formData, "last_name"),
      email: getString(formData, "email") || user.email || "",
      phone: getString(formData, "phone") || null,
      locality: getString(formData, "locality") || null,
      country: getString(formData, "country") || null,
      languages: getList(formData, "languages"),
      profession: getString(formData, "profession") || null,
      experience: getString(formData, "experience") || null,
      prior_relationship: getString(formData, "prior_relationship") || null,
      accessibility_needs: getString(formData, "accessibility_needs") || null,
      dietary_preferences: getString(formData, "dietary_preferences") || null,
      emergency_contact: getString(formData, "emergency_contact") || null,
    })
    .eq("id", user.id);

  const skills = getList(formData, "skills");
  await supabase.from("profile_skills").delete().eq("profile_id", user.id);

  if (skills.length > 0) {
    await supabase.from("profile_skills").insert(
      skills.map((skill) => ({
        profile_id: user.id,
        skill,
      })),
    );
  }

  revalidatePath("/cuenta/perfil");
  redirect("/cuenta/perfil?saved=1");
}

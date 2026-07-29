"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = getString(formData, "next") || "/cuenta";
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/acceso?error=config");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/acceso?error=${encodeURIComponent(error.message)}`);
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const firstName = getString(formData, "first_name");
  const lastName = getString(formData, "last_name");
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/crear-cuenta?error=config");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    redirect(`/crear-cuenta?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/cuenta/perfil?created=1");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}

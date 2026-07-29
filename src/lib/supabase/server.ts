import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { getSupabaseServerEnv } from "./env";

export async function createSupabaseServerClient() {
  const env = getSupabaseServerEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always set cookies; proxy.ts handles refresh.
        }
      },
    },
  });
}

export function getServiceRoleKeyForServerOnly(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { getSupabaseBrowserEnv } from "./env";

export function createSupabaseBrowserClient() {
  const env = getSupabaseBrowserEnv();

  if (!env) {
    return null;
  }

  return createBrowserClient<Database>(env.url, env.key);
}

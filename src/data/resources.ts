import { mockResources } from "@/data/mock";
import type { Resource } from "@/domain/collaboration/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getVisibleResources(): Promise<Resource[]> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockResources;
  }

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error loading resources from Supabase", error);
    return [];
  }

  return data.map((resource) => ({
    id: resource.id,
    projectId: resource.project_id ?? undefined,
    title: resource.title,
    description: resource.description,
    type: resource.type,
    url: resource.url ?? undefined,
  }));
}

import { getVisibleResources } from "@/data/resources";

export default async function AdminResourcesPage() {
  const resources = await getVisibleResources();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Recursos</h1>
      <div className="grid gap-4">
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-[8px] border border-line bg-surface p-5">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p className="mt-2 text-sm text-muted">{resource.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

import { getVisibleResources } from "@/data/resources";

export default async function ResourcesPage() {
  const resources = await getVisibleResources();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Recursos</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-[8px] border border-line bg-surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
              {resource.type}
            </p>
            <h2 className="mt-2 text-xl font-semibold">{resource.title}</h2>
            <p className="mt-3 leading-7 text-muted">{resource.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

import { ProjectForm } from "@/components/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          Nuevo proyecto
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">
          Crear proyecto
        </h1>
      </div>
      <ProjectForm />
    </div>
  );
}

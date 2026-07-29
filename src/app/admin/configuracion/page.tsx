import { notificationTemplates } from "@/data/mock";

const settingBlocks = [
  {
    title: "Tipos de documentos requeridos",
    body: "Define qué puede pedirse según el tipo de proyecto: presentación personal, experiencia profesional, fotos de trabajos previos o documentos específicos de estancia.",
  },
  {
    title: "Textos legales y condiciones",
    body: "Guarda textos base de convivencia, condiciones de solicitud, tratamiento de datos y avisos importantes para reutilizarlos en proyectos.",
  },
  {
    title: "Precios base",
    body: "Sirven como valores sugeridos al crear proyectos. No reemplazan los precios de cada proyecto: cada modalidad puede ajustarlos después.",
  },
  {
    title: "Opciones de comida",
    body: "Catálogo base de desayunos, comida, cena, coffee corner, menú vegetariano y menú omnívoro. Cada proyecto decide qué opciones activa.",
  },
];

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Configuración</h1>
      <section className="rounded-[8px] border border-line bg-surface p-5">
        <h2 className="text-xl font-semibold">Roles previstos</h2>
        <p className="mt-3 leading-7 text-muted">
          participant, admin y owner. Owner administra roles y configuración
          general; admin gestiona proyectos, solicitudes, mensajes y operación.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {settingBlocks.map((block) => (
          <article
            key={block.title}
            className="rounded-[8px] border border-line bg-surface p-5"
          >
            <h2 className="text-xl font-semibold">{block.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{block.body}</p>
          </article>
        ))}
      </section>
      <section className="rounded-[8px] border border-line bg-surface p-5">
        <h2 className="text-xl font-semibold">Plantillas de notificación</h2>
        <div className="mt-4 grid gap-3">
          {notificationTemplates.map((template) => (
            <div key={template.id} className="rounded-[8px] border border-line bg-background p-4">
              <p className="font-semibold">{template.subject}</p>
              <p className="mt-2 text-sm text-muted">{template.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

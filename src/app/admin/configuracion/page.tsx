import { notificationTemplates } from "@/data/mock";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Configuración</h1>
      <section className="rounded-[8px] border border-line bg-surface p-5">
        <h2 className="text-xl font-semibold">Roles previstos</h2>
        <p className="mt-3 leading-7 text-muted">
          participant, admin y owner. La administración de roles se reservará
          para owner cuando exista autenticación real.
        </p>
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

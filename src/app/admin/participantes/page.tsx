import { FileText, MessageSquare, Paperclip } from "lucide-react";
import type { ReactNode } from "react";
import { getAdminProfiles } from "@/data/admin";

export default async function ParticipantsPage() {
  const profiles = await getAdminProfiles();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Participantes</h1>
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <article
            key={profile.id}
            className="grid gap-5 rounded-[8px] border border-line bg-surface p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
                  Tarjeta de presentación
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {profile.email}
                  {profile.locality ? ` · ${profile.locality}` : ""}
                  {profile.country ? `, ${profile.country}` : ""}
                </p>
              </div>
              <a
                href="/admin/mensajes"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-olive bg-olive px-4 text-sm font-semibold text-white hover:bg-olive-dark"
              >
                <MessageSquare className="h-4 w-4" aria-hidden />
                Enviar mensaje
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoBlock title="Experiencia">
                {profile.experience || "Sin experiencia indicada todavía."}
              </InfoBlock>
              <InfoBlock title="Habilidades">
                {profile.skills.length > 0
                  ? profile.skills.join(", ")
                  : "Sin habilidades registradas."}
              </InfoBlock>
              <InfoBlock title="Cuidados">
                {profile.dietaryPreferences || "Sin preferencias alimentarias."}
              </InfoBlock>
            </div>

            <section className="rounded-[8px] border border-line bg-background p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <Paperclip className="h-4 w-4 text-olive" aria-hidden />
                Documentación adjunta
              </h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {[
                  "Presentación personal.pdf",
                  "Fotos de trabajos previos.zip",
                ].map((file) => (
                  <div
                    key={file}
                    className="flex items-center justify-between gap-3 rounded-[8px] border border-line bg-surface p-3"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-terracotta" aria-hidden />
                      {file}
                    </span>
                    <span className="text-xs text-muted">Demo</span>
                  </div>
                ))}
              </div>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-line bg-background p-4">
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
      <p className="mt-2 text-sm leading-6">{children}</p>
    </div>
  );
}

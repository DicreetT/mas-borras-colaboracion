import { CalendarDays, Inbox, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  getCurrentApplications,
  getCurrentMessages,
  getCurrentProfile,
  getCurrentStays,
} from "@/data/account";

export default async function AccountHomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, profile, applications, messages, stays] = await Promise.all([
    searchParams,
    getCurrentProfile(),
    getCurrentApplications(),
    getCurrentMessages(),
    getCurrentStays(),
  ]);

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          Mi camino en Mas Borràs
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold">
          Bienvenida de nuevo, {profile.firstName}.
        </h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Aquí puedes seguir tus solicitudes y preparar tus próximas estancias en
          Mas Borràs. Tu perfil guarda lo esencial para no repetirlo cada vez que
          una nueva colaboración te llame.
        </p>
      </div>
      {error === "admin" ? (
        <p className="rounded-[8px] border border-terracotta bg-[#f7e5d4] p-3 text-sm text-terracotta">
          Tu cuenta no tiene permisos de administración.
        </p>
      ) : null}

      <section aria-label="Resumen de tu participación" className="grid gap-4 md:grid-cols-3">
        <Metric icon={Inbox} label="Solicitudes" value={applications.length} />
        <Metric icon={CalendarDays} label="Estancias" value={stays.length} />
        <Metric icon={MessageSquare} label="Mensajes sin leer" value={messages.filter((message) => !message.read).length} />
      </section>

      <section className="rounded-[8px] border border-line bg-surface p-5">
        <h2 className="font-serif text-3xl font-semibold">Próximo paso</h2>
        <p className="mt-3 leading-7 text-muted">
          Revisa cómo va tu participación o completa con calma los datos que
          faltan en tu perfil.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white" href="/cuenta/solicitudes">
            Ver solicitudes
          </Link>
          <Link className="rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold" href="/cuenta/perfil">
            Completar perfil
          </Link>
        </div>
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[8px] border border-line bg-surface p-5">
      <Icon className="h-5 w-5 text-olive" aria-hidden />
      <p className="mt-4 text-3xl font-semibold">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

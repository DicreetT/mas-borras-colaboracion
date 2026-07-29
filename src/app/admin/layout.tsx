import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/(public)/auth/actions";
import { AreaNav, type AreaNavItem } from "@/components/layout/area-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser, isCurrentUserAdmin } from "@/data/account";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const adminItems = [
  { href: "/admin", label: "Resumen", icon: "folder" },
  { href: "/admin/proyectos", label: "Proyectos", icon: "file" },
  { href: "/admin/solicitudes", label: "Solicitudes", icon: "inbox" },
  { href: "/admin/participantes", label: "Participantes", icon: "users" },
  { href: "/admin/calendario", label: "Calendario", icon: "calendar" },
  { href: "/admin/mensajes", label: "Mensajes", icon: "message" },
  { href: "/admin/recursos", label: "Recursos", icon: "file" },
  { href: "/admin/configuracion", label: "Configuración", icon: "settings" },
] satisfies AreaNavItem[];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUser();

  if (supabase && !user) {
    redirect("/acceso?next=/admin");
  }

  if (supabase && user && !(await isCurrentUserAdmin())) {
    redirect("/cuenta?error=admin");
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[17rem_1fr]">
        <AreaNav title="Administración" items={adminItems} />
        <div className="grid gap-4">
          {supabase && user ? (
            <form action={signOutAction} className="flex justify-end">
              <button
                type="submit"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold hover:bg-mist"
              >
                Salir
              </button>
            </form>
          ) : null}
          {children}
        </div>
      </main>
    </>
  );
}

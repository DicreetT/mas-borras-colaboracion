import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/(public)/auth/actions";
import { AreaNav, type AreaNavItem } from "@/components/layout/area-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/data/account";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const participantItems = [
  { href: "/cuenta", label: "Inicio", icon: "home" },
  { href: "/proyectos", label: "Explorar proyectos", icon: "compass" },
  { href: "/cuenta/solicitudes", label: "Mis solicitudes", icon: "inbox" },
  { href: "/cuenta/estancias", label: "Mis estancias", icon: "home" },
  { href: "/cuenta/mensajes", label: "Mensajes", icon: "message" },
  { href: "/cuenta/recursos", label: "Recursos", icon: "book" },
  { href: "/cuenta/perfil", label: "Mi perfil", icon: "user" },
] satisfies AreaNavItem[];

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUser();

  if (supabase && !user) {
    redirect("/acceso?next=/cuenta");
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[17rem_1fr]">
        <AreaNav title="Área participante" items={participantItems} />
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

import Link from "next/link";
import { SectionHeading } from "@/components/layout/section-heading";
import { signInAction } from "../auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="content-grid py-14 sm:py-20">
      <SectionHeading eyebrow="Acceso" title="Entrar en tu cuenta">
        Accede para mantener tu perfil permanente y consultar tus solicitudes.
      </SectionHeading>
      <form
        action={signInAction}
        className="mt-10 grid max-w-xl gap-5 rounded-[8px] border border-line bg-surface p-6"
      >
        <input type="hidden" name="next" value={next ?? "/cuenta"} />
        {error ? (
          <p className="rounded-[8px] border border-terracotta bg-[#f7e5d4] p-3 text-sm text-terracotta">
            {error === "config"
              ? "Faltan variables de entorno de Supabase."
              : error}
          </p>
        ) : null}
        <label className="grid gap-2 text-sm font-medium">
          Correo electrónico
          <input
            name="email"
            type="email"
            required
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            placeholder="nombre@correo.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Contraseña
          <input
            name="password"
            type="password"
            required
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-olive bg-olive px-5 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          Entrar
        </button>
        <p className="text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link href="/crear-cuenta" className="font-semibold underline">
            Crear cuenta
          </Link>
        </p>
      </form>
    </div>
  );
}

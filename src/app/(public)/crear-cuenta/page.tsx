import Link from "next/link";
import { SectionHeading } from "@/components/layout/section-heading";
import { signUpAction } from "../auth/actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="content-grid py-14 sm:py-20">
      <SectionHeading eyebrow="Crear cuenta" title="Tu perfil permanente">
        La cuenta permite reutilizar datos en futuras solicitudes.
      </SectionHeading>
      <form
        action={signUpAction}
        className="mt-10 grid max-w-2xl gap-5 rounded-[8px] border border-line bg-surface p-6"
      >
        {error ? (
          <p className="rounded-[8px] border border-terracotta bg-[#f7e5d4] p-3 text-sm text-terracotta">
            {error === "config"
              ? "Faltan variables de entorno de Supabase."
              : error}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Nombre
            <input
              name="first_name"
              required
              className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Apellidos
            <input
              name="last_name"
              required
              className="min-h-11 rounded-[8px] border border-line bg-background px-3"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Correo electrónico
          <input
            name="email"
            type="email"
            required
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Contraseña
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="min-h-11 rounded-[8px] border border-line bg-background px-3"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-olive bg-olive px-5 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          Crear cuenta
        </button>
        <p className="text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href="/acceso" className="font-semibold underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}

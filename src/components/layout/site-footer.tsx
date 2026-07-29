import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-semibold text-foreground">
            Programa de Colaboración · El Mas de Borràs
          </p>
          <p className="mt-3 max-w-md leading-6">
            Estancias pequeñas para cuidar el lugar, compartir tiempo y
            mantener vivo su legado.
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Secciones</p>
          <div className="mt-3 grid gap-2">
            <Link href="/programa">El programa</Link>
            <Link href="/proyectos">Explorar proyectos</Link>
            <Link href="/cuenta">Área participante</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

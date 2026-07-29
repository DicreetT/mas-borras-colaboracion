import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-foreground">
            Programa de Colaboración · El Mas de Borràs
          </p>
          <p className="mt-3 max-w-md leading-6">
            Demo de Fase 1 con datos mock. Preparada para evolucionar hacia
            perfiles, solicitudes, mensajes y recursos persistentes.
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
        <div>
          <p className="font-semibold text-foreground">Nota</p>
          <p className="mt-3 leading-6">
            No hay pagos, reservas ni correos reales en esta fase.
          </p>
        </div>
      </div>
    </footer>
  );
}

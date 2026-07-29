import Link from "next/link";
import { StateBlock } from "@/components/ui/state-block";

export default function NotFound() {
  return (
    <main className="content-grid flex-1 py-16">
      <div className="grid gap-4">
        <StateBlock type="empty" title="Página no encontrada">
          El recurso solicitado no existe en esta demo.
        </StateBlock>
        <Link
          href="/proyectos"
          className="mx-auto rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold hover:bg-mist"
        >
          Volver a proyectos
        </Link>
      </div>
    </main>
  );
}

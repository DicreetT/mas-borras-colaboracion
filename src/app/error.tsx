"use client";

import { StateBlock } from "@/components/ui/state-block";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="content-grid flex-1 py-16">
      <div className="grid gap-4">
        <StateBlock type="error" title="No se ha podido cargar la página">
          Ha ocurrido un error en la demo. Puedes intentarlo de nuevo.
        </StateBlock>
        <button
          type="button"
          onClick={reset}
          className="mx-auto rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold hover:bg-mist"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}

import { StateBlock } from "@/components/ui/state-block";

export default function Loading() {
  return (
    <main className="content-grid flex-1 py-16">
      <StateBlock type="loading" title="Cargando">
        Preparando la información de la estancia.
      </StateBlock>
    </main>
  );
}

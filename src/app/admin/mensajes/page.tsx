import { StateBlock } from "@/components/ui/state-block";

export default function AdminMessagesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mensajes</h1>
      <StateBlock type="empty" title="No hay bandeja administrativa todavía">
        La Fase 1 deja preparada la sección. En fases posteriores se podrán
        enviar instrucciones y mensajes vinculados a solicitudes o estancias.
      </StateBlock>
    </div>
  );
}

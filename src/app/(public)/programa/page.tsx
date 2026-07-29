import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";

const principles = [
  "Las plazas se solicitan y se revisan; no son reservas automáticas.",
  "Los proyectos especializados requieren experiencia declarada y acuerdo específico.",
  "El perfil del participante se conserva para reutilizar datos en futuras solicitudes.",
  "Las condiciones económicas se muestran como estimación cuando corresponde.",
];

export default function ProgramPage() {
  return (
    <div className="content-grid py-14 sm:py-20">
      <SectionHeading eyebrow="El programa" title="Una colaboración pequeña, clara y acompañada.">
        El Mas de Borràs podrá publicar proyectos con fechas, cupos,
        modalidades y requisitos. Cada solicitud se revisa desde el cuidado del
        lugar y de las personas que vienen.
      </SectionHeading>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-[8px] border border-line bg-surface p-6">
          <h2 className="font-serif text-3xl font-semibold">
            Comunidad y legado
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Actividades ligeras, culturales o comunitarias: huerto, jardín,
            archivo, biblioteca, transcripción, digitalización, apoyo en
            encuentros y semanas de cuidado compartido.
          </p>
        </div>
        <div className="rounded-[8px] border border-line bg-surface p-6">
          <h2 className="font-serif text-3xl font-semibold">
            Cuidado especializado
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Colaboraciones de carpintería, fontanería, pintura, restauración,
            albañilería o mantenimiento exterior. Siempre con revisión
            individual y condiciones acordadas.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[8px] border border-line bg-surface-soft p-6">
        <h2 className="font-serif text-3xl font-semibold">Criterios base</h2>
        <ul className="mt-6 grid gap-4">
          {principles.map((principle) => (
            <li key={principle} className="flex gap-3 leading-7">
              <CheckCircle2
                className="mt-1 h-5 w-5 shrink-0 text-olive"
                aria-hidden="true"
              />
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

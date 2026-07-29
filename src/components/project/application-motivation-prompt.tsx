"use client";

import { useId, useState } from "react";

export function ApplicationMotivationPrompt() {
  const inputId = useId();
  const [motivation, setMotivation] = useState("");

  return (
    <section className="rounded-[8px] border border-line bg-surface p-5">
      <label htmlFor={inputId} className="grid gap-2">
        <span className="font-serif text-2xl font-semibold">
          ¿Qué te ha llevado a querer participar en esta estancia?
        </span>
        <span className="text-sm leading-6 text-muted">
          No buscamos una respuesta perfecta. Solo queremos conocerte un poco
          mejor.
        </span>
      </label>
      <textarea
        id={inputId}
        value={motivation}
        onChange={(event) => setMotivation(event.target.value)}
        rows={5}
        placeholder="Puedes escribirlo ahora y revisarlo antes de enviar la solicitud."
        className="mt-4 w-full rounded-[8px] border border-line bg-background px-3 py-2 text-sm leading-6 outline-none focus:border-olive focus:ring-2 focus:ring-olive/25"
      />
      <p className="mt-3 text-xs leading-5 text-muted">
        En esta demo se guarda solo mientras permaneces en la página. Al activar
        la solicitud real se almacenará como parte de tu solicitud.
      </p>
    </section>
  );
}

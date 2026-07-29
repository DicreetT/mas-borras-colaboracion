import { getCurrentProfile } from "@/data/account";
import { updateProfileAction } from "./actions";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; saved?: string }>;
}) {
  const [{ created, saved }, profile] = await Promise.all([
    searchParams,
    getCurrentProfile(),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mi perfil</h1>
      {created ? (
        <p className="rounded-[8px] border border-sage bg-mist p-3 text-sm text-olive-dark">
          Cuenta creada. Si tu proyecto exige confirmación por correo, revisa tu
          bandeja antes de volver a entrar.
        </p>
      ) : null}
      {saved ? (
        <p className="rounded-[8px] border border-sage bg-mist p-3 text-sm text-olive-dark">
          Perfil guardado.
        </p>
      ) : null}
      <form
        action={updateProfileAction}
        className="grid gap-5 rounded-[8px] border border-line bg-surface p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nombre" name="first_name" defaultValue={profile.firstName} />
          <Field label="Apellidos" name="last_name" defaultValue={profile.lastName} />
          <Field label="Correo" name="email" type="email" defaultValue={profile.email} />
          <Field label="Teléfono" name="phone" defaultValue={profile.phone} />
          <Field label="Localidad" name="locality" defaultValue={profile.locality} />
          <Field label="País" name="country" defaultValue={profile.country} />
          <Field
            label="Idiomas"
            name="languages"
            defaultValue={profile.languages.join(", ")}
          />
          <Field label="Profesión" name="profession" defaultValue={profile.profession} />
          <Field
            label="Habilidades"
            name="skills"
            defaultValue={profile.skills.join(", ")}
          />
          <Field
            label="Contacto de emergencia"
            name="emergency_contact"
            defaultValue={profile.emergencyContact}
          />
        </div>
        <TextArea
          label="Experiencia"
          name="experience"
          defaultValue={profile.experience}
        />
        <TextArea
          label="Relación previa con El Mas de Borràs"
          name="prior_relationship"
          defaultValue={profile.priorRelationship}
        />
        <TextArea
          label="Necesidades de accesibilidad"
          name="accessibility_needs"
          defaultValue={profile.accessibilityNeeds}
        />
        <TextArea
          label="Preferencias alimentarias"
          name="dietary_preferences"
          defaultValue={profile.dietaryPreferences}
        />
        <button
          type="submit"
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-full border border-olive bg-olive px-5 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          Guardar perfil
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        className="min-h-11 rounded-[8px] border border-line bg-background px-3"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        name={name}
        rows={3}
        defaultValue={defaultValue ?? ""}
        className="rounded-[8px] border border-line bg-background px-3 py-2"
      />
    </label>
  );
}

import { getAdminProfiles } from "@/data/admin";

export default async function ParticipantsPage() {
  const profiles = await getAdminProfiles();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Participantes</h1>
      <div className="rounded-[8px] border border-line bg-surface p-5">
        {profiles.map((profile) => (
          <div key={profile.id}>
            <h2 className="text-xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {profile.email} · {profile.locality}, {profile.country}
            </p>
            <p className="mt-4 leading-7 text-muted">{profile.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

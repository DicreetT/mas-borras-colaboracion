alter table public.projects
  add column if not exists purpose text,
  add column if not exists coordinator_message text,
  add column if not exists gallery_images jsonb not null default '[]'::jsonb,
  add column if not exists confirmed_participants integer check (confirmed_participants is null or confirmed_participants >= 0),
  add column if not exists past_participants integer check (past_participants is null or past_participants >= 0),
  add column if not exists last_edition_label text,
  add column if not exists tasks text[] not null default '{}';

alter table public.applications
  add column if not exists motivation text,
  add column if not exists internal_notes text;

comment on column public.projects.purpose is
  'Narrative text explaining why the collaboration stay exists.';
comment on column public.projects.coordinator_message is
  'Optional welcome note written by the person accompanying the stay.';
comment on column public.projects.gallery_images is
  'JSON array of gallery images: id, src, alt and optional caption. Replace with Storage-backed records if needed later.';
comment on column public.projects.tasks is
  'Concrete tasks expected during the collaboration stay.';
comment on column public.applications.motivation is
  'Participant answer to: what has led you to want to join this stay?';
comment on column public.applications.internal_notes is
  'Private administrative notes for application review.';

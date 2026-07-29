create extension if not exists pgcrypto;

create type public.app_role as enum ('participant', 'admin', 'owner');
create type public.program_type as enum ('community_legacy', 'specialized_maintenance');
create type public.difficulty as enum ('light', 'moderate', 'project_based');
create type public.project_status as enum ('draft', 'published', 'closed', 'archived');
create type public.application_status as enum (
  'draft',
  'submitted',
  'under_review',
  'information_requested',
  'waitlisted',
  'accepted',
  'confirmed',
  'rejected',
  'cancelled',
  'completed'
);
create type public.room_type as enum ('private', 'shared', 'either', 'to_agree');
create type public.meal_plan_type as enum (
  'none',
  'breakfast',
  'breakfast_dinner',
  'full_board',
  'self_catered',
  'to_agree'
);
create type public.stay_status as enum ('upcoming', 'active', 'completed', 'cancelled');
create type public.resource_type as enum ('guide', 'document', 'link', 'instruction');
create type public.resource_visibility as enum (
  'public',
  'authenticated',
  'project_participants',
  'admins'
);
create type public.notification_channel as enum ('email', 'in_app');
create type public.notification_event as enum (
  'application_submitted',
  'application_status_changed',
  'information_requested'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'participant',
  first_name text not null default '',
  last_name text not null default '',
  email text not null,
  phone text,
  locality text,
  country text,
  languages text[] not null default '{}',
  profession text,
  experience text,
  prior_relationship text,
  accessibility_needs text,
  dietary_preferences text,
  emergency_contact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role public.app_role not null check (role in ('admin', 'owner')),
  granted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  skill text not null,
  created_at timestamptz not null default now(),
  unique (profile_id, skill)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type public.program_type not null,
  status public.project_status not null default 'draft',
  summary text not null,
  description text not null,
  difficulty public.difficulty not null,
  capacity integer not null check (capacity > 0),
  occupied_places integer not null default 0 check (occupied_places >= 0),
  location text not null default '',
  hero_image text,
  image_alt text,
  requirements text[] not null default '{}',
  includes text[] not null default '{}',
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (occupied_places <= capacity)
);

create table public.project_dates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  start_date date,
  end_date date,
  is_flexible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (is_flexible or (start_date is not null and end_date is not null)),
  check (start_date is null or end_date is null or end_date >= start_date)
);

create table public.project_modalities (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  description text not null,
  price_per_night_cents integer check (price_per_night_cents is null or price_per_night_cents >= 0),
  lodging_included boolean not null default false,
  meals_included boolean not null default false,
  optional_menu boolean not null default false,
  menu_price_per_day_cents integer check (menu_price_per_day_cents is null or menu_price_per_day_cents >= 0),
  collaboration_hours_per_day numeric(4, 2) check (collaboration_hours_per_day is null or collaboration_hours_per_day >= 0),
  room_type public.room_type not null default 'either',
  deposit_required boolean not null default false,
  deposit_amount_cents integer check (deposit_amount_cents is null or deposit_amount_cents >= 0),
  conditions text not null default '',
  is_custom_agreement boolean not null default false,
  is_flexible_builder boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_modality_room_options (
  id uuid primary key default gen_random_uuid(),
  modality_id uuid not null references public.project_modalities(id) on delete cascade,
  name text not null,
  room_type public.room_type not null,
  description text not null default '',
  price_per_night_cents integer not null default 0 check (price_per_night_cents >= 0),
  included boolean not null default false,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_modality_meal_options (
  id uuid primary key default gen_random_uuid(),
  modality_id uuid not null references public.project_modalities(id) on delete cascade,
  name text not null,
  plan_type public.meal_plan_type not null,
  description text not null default '',
  included_meals text[] not null default '{}',
  price_per_day_cents integer not null default 0 check (price_per_day_cents >= 0),
  included boolean not null default false,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_modality_work_options (
  id uuid primary key default gen_random_uuid(),
  modality_id uuid not null references public.project_modalities(id) on delete cascade,
  label text not null,
  hours_per_day numeric(4, 2) not null default 0 check (hours_per_day >= 0),
  description text not null default '',
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  modality_id uuid not null references public.project_modalities(id) on delete restrict,
  selected_room_option_id uuid references public.project_modality_room_options(id) on delete set null,
  selected_meal_option_id uuid references public.project_modality_meal_options(id) on delete set null,
  selected_work_option_id uuid references public.project_modality_work_options(id) on delete set null,
  status public.application_status not null default 'draft',
  estimated_amount_cents integer check (estimated_amount_cents is null or estimated_amount_cents >= 0),
  nights integer not null default 0 check (nights >= 0),
  meal_days integer not null default 0 check (meal_days >= 0),
  notes text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.application_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  question_key text not null,
  question_label text not null,
  answer text,
  answer_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, question_key)
);

create table public.stays (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  status public.stay_status not null default 'upcoming',
  arrival_date date not null,
  departure_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (departure_date >= arrival_date)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_profile_id uuid references public.profiles(id) on delete set null,
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  application_id uuid references public.applications(id) on delete set null,
  subject text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text not null default '',
  type public.resource_type not null default 'guide',
  visibility public.resource_visibility not null default 'project_participants',
  url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  application_id uuid references public.applications(id) on delete set null,
  subject text not null,
  body text not null,
  channel public.notification_channel not null default 'in_app',
  event public.notification_event,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.notification_templates (
  id uuid primary key default gen_random_uuid(),
  event public.notification_event not null,
  channel public.notification_channel not null,
  subject text not null,
  body text not null,
  editable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event, channel)
);

create index profiles_email_idx on public.profiles(email);
create index projects_status_idx on public.projects(status);
create index project_dates_project_id_idx on public.project_dates(project_id);
create index project_modalities_project_id_idx on public.project_modalities(project_id);
create index room_options_modality_id_idx on public.project_modality_room_options(modality_id);
create index meal_options_modality_id_idx on public.project_modality_meal_options(modality_id);
create index work_options_modality_id_idx on public.project_modality_work_options(modality_id);
create index applications_profile_id_idx on public.applications(profile_id);
create index applications_project_id_idx on public.applications(project_id);
create index applications_status_idx on public.applications(status);
create index application_answers_application_id_idx on public.application_answers(application_id);
create index stays_profile_id_idx on public.stays(profile_id);
create index stays_project_id_idx on public.stays(project_id);
create index messages_recipient_profile_id_idx on public.messages(recipient_profile_id);
create index resources_project_id_idx on public.resources(project_id);
create index notifications_recipient_profile_id_idx on public.notifications(recipient_profile_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select ar.role from public.admin_roles ar where ar.user_id = auth.uid()),
    (select p.role from public.profiles p where p.id = auth.uid()),
    'participant'::public.app_role
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('admin', 'owner');
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'owner';
$$;

create or replace function public.can_view_project(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin()
    or exists (
      select 1
      from public.projects p
      where p.id = target_project_id
        and p.status = 'published'
    );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        first_name = case when public.profiles.first_name = '' then excluded.first_name else public.profiles.first_name end,
        last_name = case when public.profiles.last_name = '' then excluded.last_name else public.profiles.last_name end,
        updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();
create trigger admin_roles_touch_updated_at before update on public.admin_roles
for each row execute function public.touch_updated_at();
create trigger projects_touch_updated_at before update on public.projects
for each row execute function public.touch_updated_at();
create trigger project_dates_touch_updated_at before update on public.project_dates
for each row execute function public.touch_updated_at();
create trigger project_modalities_touch_updated_at before update on public.project_modalities
for each row execute function public.touch_updated_at();
create trigger room_options_touch_updated_at before update on public.project_modality_room_options
for each row execute function public.touch_updated_at();
create trigger meal_options_touch_updated_at before update on public.project_modality_meal_options
for each row execute function public.touch_updated_at();
create trigger work_options_touch_updated_at before update on public.project_modality_work_options
for each row execute function public.touch_updated_at();
create trigger applications_touch_updated_at before update on public.applications
for each row execute function public.touch_updated_at();
create trigger application_answers_touch_updated_at before update on public.application_answers
for each row execute function public.touch_updated_at();
create trigger stays_touch_updated_at before update on public.stays
for each row execute function public.touch_updated_at();
create trigger messages_touch_updated_at before update on public.messages
for each row execute function public.touch_updated_at();
create trigger resources_touch_updated_at before update on public.resources
for each row execute function public.touch_updated_at();
create trigger notification_templates_touch_updated_at before update on public.notification_templates
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.admin_roles enable row level security;
alter table public.profile_skills enable row level security;
alter table public.projects enable row level security;
alter table public.project_dates enable row level security;
alter table public.project_modalities enable row level security;
alter table public.project_modality_room_options enable row level security;
alter table public.project_modality_meal_options enable row level security;
alter table public.project_modality_work_options enable row level security;
alter table public.applications enable row level security;
alter table public.application_answers enable row level security;
alter table public.stays enable row level security;
alter table public.messages enable row level security;
alter table public.resources enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_templates enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "profiles_insert_own"
on public.profiles for insert
with check (id = auth.uid());

create policy "profiles_update_own_or_admin"
on public.profiles for update
using (id = auth.uid() or public.is_admin())
with check (
  id = auth.uid()
  or public.is_admin()
);

create policy "admin_roles_owner_select"
on public.admin_roles for select
using (public.is_owner());

create policy "admin_roles_owner_insert"
on public.admin_roles for insert
with check (public.is_owner() and role in ('admin', 'owner'));

create policy "admin_roles_owner_update"
on public.admin_roles for update
using (public.is_owner())
with check (public.is_owner() and role in ('admin', 'owner'));

create policy "admin_roles_owner_delete"
on public.admin_roles for delete
using (public.is_owner());

create policy "profile_skills_select_own_or_admin"
on public.profile_skills for select
using (profile_id = auth.uid() or public.is_admin());

create policy "profile_skills_insert_own"
on public.profile_skills for insert
with check (profile_id = auth.uid());

create policy "profile_skills_update_own"
on public.profile_skills for update
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "profile_skills_delete_own"
on public.profile_skills for delete
using (profile_id = auth.uid());

create policy "projects_select_published_or_admin"
on public.projects for select
using (status = 'published' or public.is_admin());

create policy "projects_admin_insert"
on public.projects for insert
with check (public.is_admin());

create policy "projects_admin_update"
on public.projects for update
using (public.is_admin())
with check (public.is_admin());

create policy "projects_admin_delete"
on public.projects for delete
using (public.is_admin());

create policy "project_dates_select_visible_project"
on public.project_dates for select
using (public.can_view_project(project_id));

create policy "project_dates_admin_all"
on public.project_dates for all
using (public.is_admin())
with check (public.is_admin());

create policy "project_modalities_select_visible_project"
on public.project_modalities for select
using (public.can_view_project(project_id));

create policy "project_modalities_admin_all"
on public.project_modalities for all
using (public.is_admin())
with check (public.is_admin());

create policy "room_options_select_visible_project"
on public.project_modality_room_options for select
using (
  exists (
    select 1
    from public.project_modalities pm
    where pm.id = modality_id
      and public.can_view_project(pm.project_id)
  )
);

create policy "room_options_admin_all"
on public.project_modality_room_options for all
using (public.is_admin())
with check (public.is_admin());

create policy "meal_options_select_visible_project"
on public.project_modality_meal_options for select
using (
  exists (
    select 1
    from public.project_modalities pm
    where pm.id = modality_id
      and public.can_view_project(pm.project_id)
  )
);

create policy "meal_options_admin_all"
on public.project_modality_meal_options for all
using (public.is_admin())
with check (public.is_admin());

create policy "work_options_select_visible_project"
on public.project_modality_work_options for select
using (
  exists (
    select 1
    from public.project_modalities pm
    where pm.id = modality_id
      and public.can_view_project(pm.project_id)
  )
);

create policy "work_options_admin_all"
on public.project_modality_work_options for all
using (public.is_admin())
with check (public.is_admin());

create policy "applications_select_own_or_admin"
on public.applications for select
using (profile_id = auth.uid() or public.is_admin());

create policy "applications_insert_own"
on public.applications for insert
with check (
  profile_id = auth.uid()
  and status in ('draft', 'submitted')
);

create policy "applications_update_own_editable"
on public.applications for update
using (
  profile_id = auth.uid()
  and status in ('draft', 'information_requested')
)
with check (
  profile_id = auth.uid()
  and status in ('draft', 'submitted', 'information_requested')
);

create policy "applications_admin_update"
on public.applications for update
using (public.is_admin())
with check (public.is_admin());

create policy "applications_admin_delete"
on public.applications for delete
using (public.is_admin());

create policy "application_answers_select_own_or_admin"
on public.application_answers for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.applications a
    where a.id = application_id
      and a.profile_id = auth.uid()
  )
);

create policy "application_answers_insert_own_editable"
on public.application_answers for insert
with check (
  exists (
    select 1
    from public.applications a
    where a.id = application_id
      and a.profile_id = auth.uid()
      and a.status in ('draft', 'information_requested')
  )
);

create policy "application_answers_update_own_editable_or_admin"
on public.application_answers for update
using (
  public.is_admin()
  or exists (
    select 1
    from public.applications a
    where a.id = application_id
      and a.profile_id = auth.uid()
      and a.status in ('draft', 'information_requested')
  )
)
with check (
  public.is_admin()
  or exists (
    select 1
    from public.applications a
    where a.id = application_id
      and a.profile_id = auth.uid()
      and a.status in ('draft', 'information_requested')
  )
);

create policy "application_answers_admin_delete"
on public.application_answers for delete
using (public.is_admin());

create policy "stays_select_own_or_admin"
on public.stays for select
using (profile_id = auth.uid() or public.is_admin());

create policy "stays_admin_all"
on public.stays for all
using (public.is_admin())
with check (public.is_admin());

create policy "messages_select_related_or_admin"
on public.messages for select
using (
  recipient_profile_id = auth.uid()
  or sender_profile_id = auth.uid()
  or public.is_admin()
);

create policy "messages_insert_admin"
on public.messages for insert
with check (public.is_admin());

create policy "messages_update_recipient_or_admin"
on public.messages for update
using (recipient_profile_id = auth.uid() or public.is_admin())
with check (recipient_profile_id = auth.uid() or public.is_admin());

create policy "messages_admin_delete"
on public.messages for delete
using (public.is_admin());

create policy "resources_select_public"
on public.resources for select
using (visibility = 'public');

create policy "resources_select_authenticated"
on public.resources for select
to authenticated
using (visibility = 'authenticated');

create policy "resources_select_project_participants"
on public.resources for select
to authenticated
using (
  visibility = 'project_participants'
  and (
    public.is_admin()
    or exists (
      select 1
      from public.applications a
      where a.project_id = resources.project_id
        and a.profile_id = auth.uid()
        and a.status in ('accepted', 'confirmed', 'completed')
    )
    or exists (
      select 1
      from public.stays s
      where s.project_id = resources.project_id
        and s.profile_id = auth.uid()
        and s.status <> 'cancelled'
    )
  )
);

create policy "resources_select_admins"
on public.resources for select
using (visibility = 'admins' and public.is_admin());

create policy "resources_admin_all"
on public.resources for all
using (public.is_admin())
with check (public.is_admin());

create policy "notifications_select_own_or_admin"
on public.notifications for select
using (recipient_profile_id = auth.uid() or public.is_admin());

create policy "notifications_insert_admin"
on public.notifications for insert
with check (public.is_admin());

create policy "notifications_update_own_or_admin"
on public.notifications for update
using (recipient_profile_id = auth.uid() or public.is_admin())
with check (recipient_profile_id = auth.uid() or public.is_admin());

create policy "notifications_admin_delete"
on public.notifications for delete
using (public.is_admin());

create policy "notification_templates_admin_select"
on public.notification_templates for select
using (public.is_admin());

create policy "notification_templates_owner_all"
on public.notification_templates for all
using (public.is_owner())
with check (public.is_owner());

grant usage on schema public to anon, authenticated;
grant select on public.projects to anon, authenticated;
grant select on public.project_dates to anon, authenticated;
grant select on public.project_modalities to anon, authenticated;
grant select on public.project_modality_room_options to anon, authenticated;
grant select on public.project_modality_meal_options to anon, authenticated;
grant select on public.project_modality_work_options to anon, authenticated;
grant select on public.resources to anon, authenticated;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage on all sequences in schema public to authenticated;

insert into public.projects (
  id, slug, title, type, status, summary, description, difficulty, capacity,
  occupied_places, location, hero_image, image_alt, requirements, includes,
  published_at
) values
(
  '00000000-0000-4000-8000-000000000101',
  'archivo-vivo-ensenanzas',
  'Archivo vivo de las enseñanzas',
  'community_legacy',
  'published',
  'Estancia tranquila para ordenar, transcribir y clasificar materiales vinculados al legado de las enseñanzas.',
  'Un proyecto pensado para antiguos alumnos y colaboradores que deseen cuidar el archivo vivo de El Mas de Borràs. El trabajo se centra en audios, textos, documentos y materiales que necesitan escucha, criterio y constancia.',
  'light',
  6,
  3,
  'Masía y sala de archivo',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80',
  'Mesa de madera con libros y cuadernos en una estancia serena',
  array[
    'Relación previa con las enseñanzas o sensibilidad hacia su contexto.',
    'Cuidado en el tratamiento de materiales personales y de archivo.',
    'Capacidad de trabajo silencioso y atención sostenida.'
  ],
  array[
    'Acompañamiento inicial del equipo.',
    'Espacio de trabajo compartido.',
    'Acceso a instrucciones del archivo durante la estancia.'
  ],
  '2026-07-20 10:00:00+00'
),
(
  '00000000-0000-4000-8000-000000000102',
  'semana-comunitaria-cuidado-jardin',
  'Semana comunitaria de cuidado del jardín',
  'community_legacy',
  'published',
  'Una semana de trabajo comunitario para cuidar caminos, jardín y zonas exteriores con ritmo pausado.',
  'Durante varios días se alternan tareas de jardín, pequeñas labores de cuidado del entorno y momentos compartidos. La propuesta está orientada a personas que quieran colaborar con presencia, sencillez y respeto por el lugar.',
  'moderate',
  6,
  4,
  'Jardín, caminos y exteriores',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80',
  'Manos trabajando con plantas en un jardín',
  array[
    'Disposición para tareas exteriores ligeras o moderadas.',
    'Ropa cómoda y calzado adecuado.',
    'Respeto por los ritmos del grupo y del entorno natural.'
  ],
  array[
    'Organización diaria de tareas.',
    'Herramientas básicas.',
    'Alojamiento incluido según disponibilidad.'
  ],
  '2026-07-22 10:00:00+00'
),
(
  '00000000-0000-4000-8000-000000000103',
  'colaboracion-especializada-carpinteria',
  'Colaboración especializada en carpintería',
  'specialized_maintenance',
  'published',
  'Colaboración revisada individualmente para personas con experiencia real en carpintería y restauración.',
  'Proyecto sujeto a conversación previa, revisión de experiencia y acuerdo específico. No es una plaza automática: el equipo definirá tareas, tiempos, alojamiento y condiciones según necesidades reales del Mas.',
  'project_based',
  2,
  0,
  'Taller y zonas de mantenimiento',
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=80',
  'Herramientas de carpintería sobre una mesa de trabajo',
  array[
    'Experiencia demostrable en carpintería, restauración o mantenimiento.',
    'Descripción clara de trabajos previos y disponibilidad.',
    'Acuerdo específico antes de confirmar la estancia.'
  ],
  array[
    'Revisión individual por el equipo.',
    'Definición de tareas antes de la llegada.',
    'Condiciones adaptadas al proyecto concreto.'
  ],
  '2026-07-25 10:00:00+00'
);

insert into public.project_dates (
  id, project_id, label, start_date, end_date, is_flexible, sort_order
) values
('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', '12 a 17 de octubre', '2026-10-12', '2026-10-17', false, 1),
('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000102', '3 a 7 de noviembre', '2026-11-03', '2026-11-07', false, 1),
('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000103', 'Por acordar', null, null, true, 1);

insert into public.project_modalities (
  id, project_id, name, description, price_per_night_cents, lodging_included,
  meals_included, optional_menu, menu_price_per_day_cents,
  collaboration_hours_per_day, room_type, deposit_required,
  deposit_amount_cents, conditions, is_custom_agreement, is_flexible_builder,
  sort_order
) values
(
  '00000000-0000-4000-8000-000000000301',
  '00000000-0000-4000-8000-000000000101',
  'Archivo intensivo',
  'Alojamiento incluido y seis horas diarias de colaboración, repartidas entre mañana y tarde.',
  0, true, false, true, 2400, 6, 'shared', false, null,
  'El alojamiento compartido está incluido. La habitación privada y las comidas se suman solo si se seleccionan.',
  false, false, 1
),
(
  '00000000-0000-4000-8000-000000000302',
  '00000000-0000-4000-8000-000000000101',
  'Archivo y práctica',
  'Estancia con tarifa reducida, práctica personal y dos horas diarias de colaboración.',
  1800, false, false, true, 2400, 2, 'either', false, null,
  'La tarifa de alojamiento es reducida y no constituye reserva confirmada hasta aceptación expresa.',
  false, false, 2
),
(
  '00000000-0000-4000-8000-000000000303',
  '00000000-0000-4000-8000-000000000101',
  'Arma tu modalidad',
  'Configura habitación, comidas y ritmo de colaboración para que el equipo revise el encaje.',
  1200, false, false, true, 2400, 4, 'either', false, null,
  'Es una propuesta orientativa: el equipo revisará disponibilidad, habitación, comidas y ritmo antes de confirmar.',
  false, true, 3
),
(
  '00000000-0000-4000-8000-000000000304',
  '00000000-0000-4000-8000-000000000102',
  'Colaboración completa',
  'Alojamiento incluido, menú opcional y cuatro horas diarias de cuidado del jardín.',
  0, true, false, true, 2400, 4, 'shared', false, null,
  'La participación se confirma tras revisar el encaje con las tareas previstas.',
  false, false, 1
),
(
  '00000000-0000-4000-8000-000000000305',
  '00000000-0000-4000-8000-000000000103',
  'Acuerdo especializado',
  'Condiciones sujetas a revisión de experiencia, necesidades del proyecto y acuerdo individual.',
  null, false, false, false, null, null, 'to_agree', false, null,
  'No se publica precio. La estancia solo avanza tras conversación y acuerdo explícito.',
  true, false, 1
);

insert into public.project_modality_room_options (
  id, modality_id, name, room_type, description, price_per_night_cents,
  included, is_default, sort_order
) values
('00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000301', 'Habitación compartida', 'shared', 'Opción base para estancias comunitarias, sujeta a disponibilidad y composición del grupo.', 0, true, true, 1),
('00000000-0000-4000-8000-000000000402', '00000000-0000-4000-8000-000000000301', 'Habitación privada', 'private', 'Más intimidad durante la estancia, con suplemento por noche y confirmación según disponibilidad.', 1600, false, false, 2),
('00000000-0000-4000-8000-000000000403', '00000000-0000-4000-8000-000000000302', 'Habitación compartida', 'shared', 'Tarifa reducida para habitación compartida durante la estancia.', 0, true, true, 1),
('00000000-0000-4000-8000-000000000404', '00000000-0000-4000-8000-000000000302', 'Habitación privada', 'private', 'Habitación privada con suplemento sobre la tarifa reducida.', 1600, false, false, 2),
('00000000-0000-4000-8000-000000000405', '00000000-0000-4000-8000-000000000303', 'Habitación compartida', 'shared', 'Alojamiento compartido con tarifa base por noche para modalidad a medida.', 0, true, true, 1),
('00000000-0000-4000-8000-000000000406', '00000000-0000-4000-8000-000000000303', 'Habitación privada', 'private', 'Habitación privada con suplemento por noche, según disponibilidad.', 1800, false, false, 2),
('00000000-0000-4000-8000-000000000407', '00000000-0000-4000-8000-000000000304', 'Habitación compartida', 'shared', 'Opción base para estancias comunitarias, sujeta a disponibilidad y composición del grupo.', 0, true, true, 1),
('00000000-0000-4000-8000-000000000408', '00000000-0000-4000-8000-000000000304', 'Habitación privada', 'private', 'Más intimidad durante la estancia, con suplemento por noche y confirmación según disponibilidad.', 1600, false, false, 2),
('00000000-0000-4000-8000-000000000409', '00000000-0000-4000-8000-000000000305', 'Por acordar', 'to_agree', 'El alojamiento se define junto con las condiciones.', 0, false, true, 1);

insert into public.project_modality_meal_options (
  id, modality_id, name, plan_type, description, included_meals,
  price_per_day_cents, included, is_default, sort_order
)
select gen_random_uuid(), modality_id, name, plan_type, description, included_meals, price_per_day_cents, included, is_default, sort_order
from (
  values
  ('00000000-0000-4000-8000-000000000301'::uuid, 'Sin comidas', 'none'::public.meal_plan_type, 'La persona organiza sus comidas. Se mantienen las indicaciones generales de uso de espacios.', '{}'::text[], 0, false, true, 1),
  ('00000000-0000-4000-8000-000000000301'::uuid, 'Desayunos', 'breakfast'::public.meal_plan_type, 'Desayuno sencillo de la casa para empezar el día antes del bloque de colaboración.', array['Desayuno'], 800, false, false, 2),
  ('00000000-0000-4000-8000-000000000301'::uuid, 'Desayuno y cena', 'breakfast_dinner'::public.meal_plan_type, 'Desayuno y cena compartida. La comida del mediodía queda autogestionada.', array['Desayuno', 'Cena'], 1900, false, false, 3),
  ('00000000-0000-4000-8000-000000000301'::uuid, 'Menú completo', 'full_board'::public.meal_plan_type, 'Desayuno, comida y cena con menú del día. Las preferencias alimentarias se revisan en la solicitud.', array['Desayuno', 'Comida', 'Cena'], 2400, false, false, 4),
  ('00000000-0000-4000-8000-000000000302'::uuid, 'Sin comidas', 'none'::public.meal_plan_type, 'La persona organiza sus comidas. Se mantienen las indicaciones generales de uso de espacios.', '{}'::text[], 0, false, true, 1),
  ('00000000-0000-4000-8000-000000000302'::uuid, 'Desayunos', 'breakfast'::public.meal_plan_type, 'Desayuno sencillo de la casa para empezar el día antes del bloque de colaboración.', array['Desayuno'], 800, false, false, 2),
  ('00000000-0000-4000-8000-000000000302'::uuid, 'Desayuno y cena', 'breakfast_dinner'::public.meal_plan_type, 'Desayuno y cena compartida. La comida del mediodía queda autogestionada.', array['Desayuno', 'Cena'], 1900, false, false, 3),
  ('00000000-0000-4000-8000-000000000302'::uuid, 'Menú completo', 'full_board'::public.meal_plan_type, 'Desayuno, comida y cena con menú del día. Las preferencias alimentarias se revisan en la solicitud.', array['Desayuno', 'Comida', 'Cena'], 2400, false, false, 4),
  ('00000000-0000-4000-8000-000000000303'::uuid, 'Sin comidas', 'none'::public.meal_plan_type, 'La persona organiza sus comidas. Se mantienen las indicaciones generales de uso de espacios.', '{}'::text[], 0, false, false, 1),
  ('00000000-0000-4000-8000-000000000303'::uuid, 'Desayunos', 'breakfast'::public.meal_plan_type, 'Desayuno sencillo de la casa para empezar el día antes del bloque de colaboración.', array['Desayuno'], 800, false, true, 2),
  ('00000000-0000-4000-8000-000000000303'::uuid, 'Desayuno y cena', 'breakfast_dinner'::public.meal_plan_type, 'Desayuno y cena compartida. La comida del mediodía queda autogestionada.', array['Desayuno', 'Cena'], 1900, false, false, 3),
  ('00000000-0000-4000-8000-000000000303'::uuid, 'Menú completo', 'full_board'::public.meal_plan_type, 'Desayuno, comida y cena con menú del día. Las preferencias alimentarias se revisan en la solicitud.', array['Desayuno', 'Comida', 'Cena'], 2400, false, false, 4),
  ('00000000-0000-4000-8000-000000000304'::uuid, 'Sin comidas', 'none'::public.meal_plan_type, 'La persona organiza sus comidas. Se mantienen las indicaciones generales de uso de espacios.', '{}'::text[], 0, false, true, 1),
  ('00000000-0000-4000-8000-000000000304'::uuid, 'Desayunos', 'breakfast'::public.meal_plan_type, 'Desayuno sencillo de la casa para empezar el día antes del bloque de colaboración.', array['Desayuno'], 800, false, false, 2),
  ('00000000-0000-4000-8000-000000000304'::uuid, 'Desayuno y cena', 'breakfast_dinner'::public.meal_plan_type, 'Desayuno y cena compartida. La comida del mediodía queda autogestionada.', array['Desayuno', 'Cena'], 1900, false, false, 3),
  ('00000000-0000-4000-8000-000000000304'::uuid, 'Menú completo', 'full_board'::public.meal_plan_type, 'Desayuno, comida y cena con menú del día. Las preferencias alimentarias se revisan en la solicitud.', array['Desayuno', 'Comida', 'Cena'], 2400, false, false, 4),
  ('00000000-0000-4000-8000-000000000305'::uuid, 'Por acordar', 'to_agree'::public.meal_plan_type, 'Las comidas se acuerdan según fechas y necesidades.', '{}'::text[], 0, false, true, 1)
) as meal_seed(modality_id, name, plan_type, description, included_meals, price_per_day_cents, included, is_default, sort_order);

insert into public.project_modality_work_options (
  id, modality_id, label, hours_per_day, description, is_default, sort_order
) values
('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000301', '6 h diarias', 6, 'Tres horas por la mañana y tres por la tarde.', true, 1),
('00000000-0000-4000-8000-000000000502', '00000000-0000-4000-8000-000000000301', '5 h diarias', 5, 'Ritmo intensivo algo más ligero, sujeto a revisión.', false, 2),
('00000000-0000-4000-8000-000000000503', '00000000-0000-4000-8000-000000000302', '2 h diarias', 2, 'Bloque breve de colaboración y más tiempo para práctica personal.', true, 1),
('00000000-0000-4000-8000-000000000504', '00000000-0000-4000-8000-000000000302', '3 h diarias', 3, 'Una colaboración algo más presente sin llegar a intensiva.', false, 2),
('00000000-0000-4000-8000-000000000505', '00000000-0000-4000-8000-000000000303', '2 h diarias', 2, 'Colaboración ligera compatible con práctica personal.', false, 1),
('00000000-0000-4000-8000-000000000506', '00000000-0000-4000-8000-000000000303', '4 h diarias', 4, 'Ritmo equilibrado entre colaboración y descanso.', true, 2),
('00000000-0000-4000-8000-000000000507', '00000000-0000-4000-8000-000000000303', '5 h diarias', 5, 'Ritmo más comprometido, sujeto a revisión.', false, 3),
('00000000-0000-4000-8000-000000000508', '00000000-0000-4000-8000-000000000304', '4 h diarias', 4, 'Bloque de mañana con tareas exteriores y cierre suave.', true, 1),
('00000000-0000-4000-8000-000000000509', '00000000-0000-4000-8000-000000000304', '3 h diarias', 3, 'Ritmo moderado para personas que necesiten más pausa.', false, 2),
('00000000-0000-4000-8000-000000000510', '00000000-0000-4000-8000-000000000305', 'Por acordar', 0, 'El ritmo se define según el oficio, la tarea y la disponibilidad.', true, 1);

insert into public.resources (
  id, project_id, title, description, type, visibility
) values
('00000000-0000-4000-8000-000000000601', null, 'Guía de llegada', 'Indicaciones básicas para preparar la llegada al Mas.', 'guide', 'authenticated'),
('00000000-0000-4000-8000-000000000602', '00000000-0000-4000-8000-000000000101', 'Criterios de clasificación del archivo', 'Documento pendiente de sustituir por instrucciones reales.', 'instruction', 'project_participants');

insert into public.notification_templates (
  id, event, channel, subject, body, editable
) values
('00000000-0000-4000-8000-000000000701', 'application_submitted', 'email', 'Nueva solicitud recibida', 'Plantilla futura para avisar al equipo cuando llegue una solicitud.', true),
('00000000-0000-4000-8000-000000000702', 'application_status_changed', 'email', 'Actualización de tu solicitud', 'Plantilla futura para avisar al participante cuando cambie el estado.', true);

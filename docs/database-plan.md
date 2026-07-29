# Database Plan

Fase 2 añade Supabase Auth, clientes SSR/browser, migración SQL inicial,
políticas RLS y lectura con fallback a mocks cuando no hay variables de
entorno locales.

## Entidades previstas

- `profiles`
- `projects`
- `project_modalities`
- `project_modality_room_options`
- `project_modality_meal_options`
- `project_modality_work_options`
- `project_dates`
- `applications`
- `stays`
- `messages`
- `resources`
- `profile_skills`
- `application_answers`
- `notifications`
- `admin_roles`

## Supabase

Variables previstas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

La service role key debe usarse solo en servidor y nunca exponerse al navegador. Los futuros clientes vivirán en `src/lib/supabase/browser.ts` y `src/lib/supabase/server.ts`.

## RLS futuro

- `participant` podrá leer proyectos publicados, su propio perfil, sus solicitudes, sus estancias, sus mensajes y sus recursos asociados.
- `participant` podrá crear solicitudes propias y actualizar únicamente borradores o información solicitada.
- `admin` podrá gestionar proyectos, modalidades, fechas, solicitudes, participantes operativos, mensajes y recursos.
- `owner` heredará permisos de admin y podrá gestionar roles, configuración y plantillas.
- Las solicitudes especializadas deberán quedar en revisión y no confirmar plaza sin acción administrativa.
- Las solicitudes deberán guardar la modalidad elegida y sus opciones seleccionadas: habitación, régimen de comidas, días de comida y ritmo de colaboración.
- Los mensajes y recursos deberán filtrar por destinatario, proyecto o estancia confirmada.

## Estados

Las solicitudes soportarán:

`draft`, `submitted`, `under_review`, `information_requested`, `waitlisted`, `accepted`, `confirmed`, `rejected`, `cancelled`, `completed`.

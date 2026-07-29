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

## Campos narrativos añadidos

La mejora de contenido prepara estos campos opcionales para mantener
compatibilidad con registros antiguos:

- `projects.purpose`: por qué existe la estancia.
- `projects.coordinator_message`: nota breve de quien acompaña el proyecto.
- `projects.gallery_images`: lista JSON de 1 a 6 imágenes con `id`, `src`,
  `alt` y `caption` opcional. En una fase posterior puede normalizarse o
  vincularse a Supabase Storage.
- `projects.tasks`: tareas concretas previstas para la estancia.
- `projects.confirmed_participants`: participantes confirmados mostrados con
  tono informativo, no comercial.
- `projects.past_participants`: personas que ya participaron anteriormente.
- `projects.last_edition_label`: etiqueta humana de última edición.
- `applications.motivation`: respuesta opcional del participante a “¿Qué te ha
  llevado a querer participar en esta estancia?”.
- `applications.internal_notes`: notas privadas del equipo administrador.

La migración preparada es
`supabase/migrations/20260729212000_project_story_and_application_motivation.sql`.
No requiere claves nuevas y no debe ejecutarse sin revisar primero el entorno
de Supabase.

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
- Las solicitudes podrán guardar una motivación personal opcional visible para
  administración y para la persona antes de enviar.
- Los mensajes y recursos deberán filtrar por destinatario, proyecto o estancia confirmada.

## Estados

Las solicitudes soportarán:

`draft`, `submitted`, `under_review`, `information_requested`, `waitlisted`, `accepted`, `confirmed`, `rejected`, `cancelled`, `completed`.

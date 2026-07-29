# Programa de Colaboración · El Mas de Borràs

Demo navegable de Fase 1 para una plataforma de colaboración con proyectos,
fechas, cupos, modalidades, solicitudes y áreas simuladas de participante y
administración.

## Estado de esta fase

- App Next.js App Router con TypeScript estricto y Tailwind CSS.
- Datos mock centralizados en `src/data/mock.ts`.
- Tipos de dominio en `src/domain/collaboration`.
- Validación con Zod y formulario admin con React Hook Form.
- Preparación para Supabase en `src/lib/supabase`.
- Supabase Auth y clientes SSR/browser preparados.
- Migración SQL inicial con tablas, seeds y políticas RLS en `supabase/migrations`.
- Abstracciones de notificaciones en `src/lib/notifications`.
- Manifest básico para futura PWA.

No hay pagos reales, reservas confirmadas, envío de correos ni base de datos en
esta fase.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run lint
npm run typecheck
npm run build
```

## Variables de entorno

Copiar `.env.example` a `.env.local` cuando se conecte Supabase o un proveedor
de correo. No incluir claves reales en el repositorio.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
EMAIL_PROVIDER_API_KEY=
EMAIL_FROM_ADDRESS=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` es preferente. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
se mantiene como compatibilidad con el plan inicial. La service role key de
Supabase debe permanecer siempre en servidor.

## Supabase local

```bash
supabase start
supabase db reset
```

La migración inicial crea el esquema, RLS y los tres proyectos de ejemplo.

## Rutas principales

- `/`: inicio público.
- `/programa`: explicación del programa.
- `/proyectos`: listado con filtros.
- `/proyectos/[slug]`: detalle, modalidad y calculadora estimada.
- `/acceso` y `/crear-cuenta`: pantallas visuales.
- `/cuenta`: área simulada del participante.
- `/admin`: área simulada de administración.

## Documentación

El plan de base de datos y RLS futuro está en `docs/database-plan.md`.

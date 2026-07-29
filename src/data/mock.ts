import type {
  AdminSummary,
  Application,
  Message,
  NotificationTemplate,
  Profile,
  Project,
  Resource,
  Stay,
} from "@/domain/collaboration/types";

const archiveMealOptions = [
  {
    id: "meal-none",
    name: "Sin comidas",
    planType: "none" as const,
    description:
      "La persona organiza sus comidas. Se mantienen las indicaciones generales de uso de espacios.",
    includedMeals: [],
    pricePerDayCents: 0,
    included: false,
  },
  {
    id: "meal-breakfast",
    name: "Desayunos",
    planType: "breakfast" as const,
    description:
      "Desayuno sencillo de la casa para empezar el día antes del bloque de colaboración.",
    includedMeals: ["Desayuno"],
    pricePerDayCents: 800,
    included: false,
  },
  {
    id: "meal-breakfast-dinner",
    name: "Desayuno y cena",
    planType: "breakfast_dinner" as const,
    description:
      "Desayuno y cena compartida. La comida del mediodía queda autogestionada.",
    includedMeals: ["Desayuno", "Cena"],
    pricePerDayCents: 1900,
    included: false,
  },
  {
    id: "meal-full-board",
    name: "Menú completo",
    planType: "full_board" as const,
    description:
      "Desayuno, comida y cena con menú del día. Las preferencias alimentarias se revisan en la solicitud.",
    includedMeals: ["Desayuno", "Comida", "Cena"],
    pricePerDayCents: 2400,
    included: false,
  },
];

const sharedOrPrivateRoomOptions = [
  {
    id: "room-shared",
    name: "Habitación compartida",
    roomType: "shared" as const,
    description:
      "Opción base para estancias comunitarias, sujeta a disponibilidad y composición del grupo.",
    pricePerNightCents: 0,
    included: true,
  },
  {
    id: "room-private",
    name: "Habitación privada",
    roomType: "private" as const,
    description:
      "Más intimidad durante la estancia, con suplemento por noche y confirmación según disponibilidad.",
    pricePerNightCents: 1600,
    included: false,
  },
];

export const mockProjects: Project[] = [
  {
    id: "project-archivo-vivo",
    slug: "archivo-vivo-ensenanzas",
    title: "Archivo vivo de las enseñanzas",
    type: "community_legacy",
    status: "published",
    summary:
      "Estancia tranquila para ordenar, transcribir y clasificar materiales vinculados al legado de las enseñanzas.",
    description:
      "Un proyecto pensado para antiguos alumnos y colaboradores que deseen cuidar el archivo vivo de El Mas de Borràs. El trabajo se centra en audios, textos, documentos y materiales que necesitan escucha, criterio y constancia.",
    purpose:
      "Durante décadas se grabaron encuentros, conversaciones y enseñanzas compartidas en Mas Borràs. Esta estancia nace para escuchar, transcribir, ordenar y preservar ese archivo, de modo que futuras generaciones puedan seguir accediendo a él con respeto.",
    coordinatorMessage:
      "Buscamos personas pacientes, cuidadosas y capaces de trabajar con atención. No es necesario tener experiencia profesional, pero sí respeto por el material y constancia.",
    difficulty: "light",
    capacity: 6,
    occupiedPlaces: 3,
    location: "Masía y sala de archivo",
    heroImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mesa de madera con libros y cuadernos en una estancia serena",
    gallery: [
      {
        id: "gallery-archivo-1",
        src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
        alt: "Libros y cuadernos sobre una mesa de trabajo tranquila",
        caption: "Materiales que esperan escucha, orden y cuidado.",
      },
      {
        id: "gallery-archivo-2",
        src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
        alt: "Espacio de trabajo con ordenador y cuadernos",
        caption: "Trabajo silencioso de transcripción y clasificación.",
      },
    ],
    communityStats: {
      confirmedParticipants: 3,
      pastParticipants: 12,
      lastEditionLabel: "mayo de 2026",
    },
    tasks: [
      "Escuchar y revisar audios seleccionados.",
      "Transcribir fragmentos y organizar textos por tema.",
      "Clasificar materiales con criterios comunes del archivo.",
    ],
    requirements: [
      "Relación previa con las enseñanzas o sensibilidad hacia su contexto.",
      "Cuidado en el tratamiento de materiales personales y de archivo.",
      "Capacidad de trabajo silencioso y atención sostenida.",
    ],
    includes: [
      "Acompañamiento inicial del equipo.",
      "Espacio de trabajo compartido.",
      "Acceso a instrucciones del archivo durante la estancia.",
    ],
    dates: [
      {
        id: "date-archivo-octubre",
        projectId: "project-archivo-vivo",
        label: "12 a 17 de octubre",
        startDate: "2026-10-12",
        endDate: "2026-10-17",
        isFlexible: false,
      },
    ],
    modalities: [
      {
        id: "mod-archivo-intensivo",
        projectId: "project-archivo-vivo",
        name: "Archivo intensivo",
        description:
          "Alojamiento incluido y seis horas diarias de colaboración, repartidas entre mañana y tarde.",
        pricePerNightCents: 0,
        lodgingIncluded: true,
        mealsIncluded: false,
        optionalMenu: true,
        menuPricePerDayCents: 2400,
        collaborationHoursPerDay: 6,
        roomType: "shared",
        depositRequired: false,
        depositAmountCents: null,
        conditions:
          "El alojamiento compartido está incluido. La habitación privada y las comidas se suman solo si se seleccionan.",
        roomOptions: sharedOrPrivateRoomOptions,
        defaultRoomOptionId: "room-shared",
        mealOptions: archiveMealOptions,
        defaultMealOptionId: "meal-none",
        workOptions: [
          {
            id: "work-archive-6h",
            label: "6 h diarias",
            hoursPerDay: 6,
            description: "Tres horas por la mañana y tres por la tarde.",
          },
          {
            id: "work-archive-5h",
            label: "5 h diarias",
            hoursPerDay: 5,
            description: "Ritmo intensivo algo más ligero, sujeto a revisión.",
          },
        ],
        defaultWorkOptionId: "work-archive-6h",
      },
      {
        id: "mod-archivo-practica",
        projectId: "project-archivo-vivo",
        name: "Archivo y práctica",
        description:
          "Estancia con tarifa reducida, práctica personal y dos horas diarias de colaboración.",
        pricePerNightCents: 1800,
        lodgingIncluded: false,
        mealsIncluded: false,
        optionalMenu: true,
        menuPricePerDayCents: 2400,
        collaborationHoursPerDay: 2,
        roomType: "either",
        depositRequired: false,
        depositAmountCents: null,
        conditions:
          "La tarifa de alojamiento es reducida y no constituye reserva confirmada hasta aceptación expresa.",
        roomOptions: [
          {
            id: "room-shared-reduced",
            name: "Habitación compartida",
            roomType: "shared",
            description:
              "Tarifa reducida para habitación compartida durante la estancia.",
            pricePerNightCents: 0,
            included: true,
          },
          {
            id: "room-private-reduced",
            name: "Habitación privada",
            roomType: "private",
            description:
              "Habitación privada con suplemento sobre la tarifa reducida.",
            pricePerNightCents: 1600,
            included: false,
          },
        ],
        defaultRoomOptionId: "room-shared-reduced",
        mealOptions: archiveMealOptions,
        defaultMealOptionId: "meal-none",
        workOptions: [
          {
            id: "work-practice-2h",
            label: "2 h diarias",
            hoursPerDay: 2,
            description:
              "Bloque breve de colaboración y más tiempo para práctica personal.",
          },
          {
            id: "work-practice-3h",
            label: "3 h diarias",
            hoursPerDay: 3,
            description: "Una colaboración algo más presente sin llegar a intensiva.",
          },
        ],
        defaultWorkOptionId: "work-practice-2h",
      },
      {
        id: "mod-archivo-a-medida",
        projectId: "project-archivo-vivo",
        name: "Arma tu modalidad",
        description:
          "Configura habitación, comidas y ritmo de colaboración para que el equipo revise el encaje.",
        pricePerNightCents: 1200,
        lodgingIncluded: false,
        mealsIncluded: false,
        optionalMenu: true,
        menuPricePerDayCents: 2400,
        collaborationHoursPerDay: 4,
        roomType: "either",
        depositRequired: false,
        depositAmountCents: null,
        conditions:
          "Es una propuesta orientativa: el equipo revisará disponibilidad, habitación, comidas y ritmo antes de confirmar.",
        isFlexibleBuilder: true,
        roomOptions: [
          {
            id: "room-builder-shared",
            name: "Habitación compartida",
            roomType: "shared",
            description:
              "Alojamiento compartido con tarifa base por noche para modalidad a medida.",
            pricePerNightCents: 0,
            included: true,
          },
          {
            id: "room-builder-private",
            name: "Habitación privada",
            roomType: "private",
            description:
              "Habitación privada con suplemento por noche, según disponibilidad.",
            pricePerNightCents: 1800,
            included: false,
          },
        ],
        defaultRoomOptionId: "room-builder-shared",
        mealOptions: archiveMealOptions,
        defaultMealOptionId: "meal-breakfast",
        workOptions: [
          {
            id: "work-builder-2h",
            label: "2 h diarias",
            hoursPerDay: 2,
            description: "Colaboración ligera compatible con práctica personal.",
          },
          {
            id: "work-builder-4h",
            label: "4 h diarias",
            hoursPerDay: 4,
            description: "Ritmo equilibrado entre colaboración y descanso.",
          },
          {
            id: "work-builder-5h",
            label: "5 h diarias",
            hoursPerDay: 5,
            description: "Ritmo más comprometido, sujeto a revisión.",
          },
        ],
        defaultWorkOptionId: "work-builder-4h",
      },
    ],
    publishedAt: "2026-07-20",
  },
  {
    id: "project-jardin",
    slug: "semana-comunitaria-cuidado-jardin",
    title: "Semana comunitaria de cuidado del jardín",
    type: "community_legacy",
    status: "published",
    summary:
      "Una semana de trabajo comunitario para cuidar caminos, jardín y zonas exteriores con ritmo pausado.",
    description:
      "Durante varios días se alternan tareas de jardín, pequeñas labores de cuidado del entorno y momentos compartidos. La propuesta está orientada a personas que quieran colaborar con presencia, sencillez y respeto por el lugar.",
    purpose:
      "El jardín acompaña la vida cotidiana de Mas Borràs. Cada temporada necesita cuidados distintos para seguir siendo un espacio de descanso, encuentro y contemplación.",
    coordinatorMessage:
      "Trabajaremos en un grupo pequeño y alternaremos las tareas del jardín con momentos compartidos y tiempo libre.",
    difficulty: "moderate",
    capacity: 6,
    occupiedPlaces: 4,
    location: "Jardín, caminos y exteriores",
    heroImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Manos trabajando con plantas en un jardín",
    gallery: [
      {
        id: "gallery-jardin-1",
        src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
        alt: "Manos cuidando plantas en tierra",
        caption: "Cuidado estacional del jardín y de los exteriores.",
      },
      {
        id: "gallery-jardin-2",
        src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80",
        alt: "Sendero de jardín rodeado de vegetación",
        caption: "Caminos y zonas de pausa para mantener vivos.",
      },
    ],
    communityStats: {
      confirmedParticipants: 4,
      pastParticipants: 18,
      lastEditionLabel: "primavera de 2026",
    },
    tasks: [
      "Cuidar caminos, plantas y zonas exteriores.",
      "Preparar pequeñas mejoras del jardín según la temporada.",
      "Ordenar herramientas y cerrar cada jornada con el grupo.",
    ],
    requirements: [
      "Disposición para tareas exteriores ligeras o moderadas.",
      "Ropa cómoda y calzado adecuado.",
      "Respeto por los ritmos del grupo y del entorno natural.",
    ],
    includes: [
      "Organización diaria de tareas.",
      "Herramientas básicas.",
      "Alojamiento incluido según disponibilidad.",
    ],
    dates: [
      {
        id: "date-jardin-noviembre",
        projectId: "project-jardin",
        label: "3 a 7 de noviembre",
        startDate: "2026-11-03",
        endDate: "2026-11-07",
        isFlexible: false,
      },
    ],
    modalities: [
      {
        id: "mod-jardin-completa",
        projectId: "project-jardin",
        name: "Colaboración completa",
        description:
          "Alojamiento incluido, menú opcional y cuatro horas diarias de cuidado del jardín.",
        pricePerNightCents: 0,
        lodgingIncluded: true,
        mealsIncluded: false,
        optionalMenu: true,
        menuPricePerDayCents: 2400,
        collaborationHoursPerDay: 4,
        roomType: "shared",
        depositRequired: false,
        depositAmountCents: null,
        conditions:
          "La participación se confirma tras revisar el encaje con las tareas previstas.",
        roomOptions: sharedOrPrivateRoomOptions,
        defaultRoomOptionId: "room-shared",
        mealOptions: archiveMealOptions,
        defaultMealOptionId: "meal-none",
        workOptions: [
          {
            id: "work-garden-4h",
            label: "4 h diarias",
            hoursPerDay: 4,
            description: "Bloque de mañana con tareas exteriores y cierre suave.",
          },
          {
            id: "work-garden-3h",
            label: "3 h diarias",
            hoursPerDay: 3,
            description: "Ritmo moderado para personas que necesiten más pausa.",
          },
        ],
        defaultWorkOptionId: "work-garden-4h",
      },
    ],
    publishedAt: "2026-07-22",
  },
  {
    id: "project-carpinteria",
    slug: "colaboracion-especializada-carpinteria",
    title: "Restauración de elementos de madera",
    type: "specialized_maintenance",
    status: "published",
    summary:
      "Colaboración revisada individualmente para personas con experiencia real en carpintería y restauración.",
    description:
      "Proyecto sujeto a conversación previa, revisión de experiencia y acuerdo específico. No es una plaza automática: el equipo definirá tareas, tiempos, alojamiento y condiciones según necesidades reales del Mas.",
    purpose:
      "Algunas puertas, ventanas y muebles forman parte de la historia material del lugar. Esta estancia busca restaurarlos sin borrar las huellas que los años han dejado en ellos.",
    coordinatorMessage:
      "Este proyecto requiere experiencia en carpintería, restauración o trabajos similares. Antes de confirmar la participación tendremos una conversación breve.",
    difficulty: "project_based",
    capacity: 2,
    occupiedPlaces: 0,
    location: "Taller y zonas de mantenimiento",
    heroImage:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Herramientas de carpintería sobre una mesa de trabajo",
    gallery: [
      {
        id: "gallery-carpinteria-1",
        src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
        alt: "Herramientas de carpintería sobre una mesa",
        caption: "Intervenciones pequeñas, cuidadosas y revisadas.",
      },
      {
        id: "gallery-carpinteria-2",
        src: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1200&q=80",
        alt: "Detalle de madera trabajada en taller",
        caption: "Restaurar sin borrar la memoria del material.",
      },
    ],
    communityStats: {
      confirmedParticipants: 0,
      pastParticipants: 5,
      lastEditionLabel: "invierno de 2025",
    },
    tasks: [
      "Revisar elementos de madera que necesitan intervención.",
      "Restaurar puertas, ventanas o muebles según prioridad.",
      "Acordar materiales, tiempos y alcance antes de confirmar.",
    ],
    requirements: [
      "Experiencia demostrable en carpintería, restauración o mantenimiento.",
      "Descripción clara de trabajos previos y disponibilidad.",
      "Acuerdo específico antes de confirmar la estancia.",
    ],
    includes: [
      "Revisión individual por el equipo.",
      "Definición de tareas antes de la llegada.",
      "Condiciones adaptadas al proyecto concreto.",
    ],
    dates: [
      {
        id: "date-carpinteria-flexible",
        projectId: "project-carpinteria",
        label: "Por acordar",
        isFlexible: true,
      },
    ],
    modalities: [
      {
        id: "mod-carpinteria-acuerdo",
        projectId: "project-carpinteria",
        name: "Acuerdo especializado",
        description:
          "Condiciones sujetas a revisión de experiencia, necesidades del proyecto y acuerdo individual.",
        pricePerNightCents: null,
        lodgingIncluded: false,
        mealsIncluded: false,
        optionalMenu: false,
        menuPricePerDayCents: null,
        collaborationHoursPerDay: null,
        roomType: "to_agree",
        depositRequired: false,
        depositAmountCents: null,
        conditions:
          "No se publica precio. La estancia solo avanza tras conversación y acuerdo explícito.",
        isCustomAgreement: true,
        roomOptions: [
          {
            id: "room-to-agree",
            name: "Por acordar",
            roomType: "to_agree",
            description: "El alojamiento se define junto con las condiciones.",
            pricePerNightCents: 0,
            included: false,
          },
        ],
        defaultRoomOptionId: "room-to-agree",
        mealOptions: [
          {
            id: "meal-to-agree",
            name: "Por acordar",
            planType: "to_agree",
            description: "Las comidas se acuerdan según fechas y necesidades.",
            includedMeals: [],
            pricePerDayCents: 0,
            included: false,
          },
        ],
        defaultMealOptionId: "meal-to-agree",
        workOptions: [
          {
            id: "work-to-agree",
            label: "Por acordar",
            hoursPerDay: 0,
            description:
              "El ritmo se define según el oficio, la tarea y la disponibilidad.",
          },
        ],
        defaultWorkOptionId: "work-to-agree",
      },
    ],
    publishedAt: "2026-07-25",
  },
];

export const mockProfiles: Profile[] = [
  {
    id: "profile-ana",
    role: "participant",
    firstName: "Ana",
    lastName: "Soler",
    email: "ana@example.com",
    phone: "+34 600 000 000",
    locality: "Valencia",
    country: "España",
    languages: ["Español", "Valenciano", "Inglés"],
    profession: "Documentalista",
    skills: ["archivo", "transcripción", "biblioteca"],
    experience:
      "He colaborado en pequeñas bibliotecas comunitarias y archivos orales.",
    priorRelationship: "Antigua alumna y asistente a retiros.",
    accessibilityNeeds: "",
    dietaryPreferences: "Vegetariana",
    emergencyContact: "Luis Soler, +34 611 000 000",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app-archivo-ana",
    projectId: "project-archivo-vivo",
    modalityId: "mod-archivo-practica",
    profileId: "profile-ana",
    status: "under_review",
    submittedAt: "2026-07-28",
    estimatedAmountCents: 21000,
    nights: 5,
    menuDays: 5,
    motivation:
      "Quiero volver al Mas desde un lugar tranquilo y aportar algo concreto al cuidado de las enseñanzas que recibí allí.",
    notes: "Interés especial en transcripción de audios.",
    internalNotes: "Puede ayudar con criterios de clasificación y revisión de textos.",
  },
  {
    id: "app-jardin-ana",
    projectId: "project-jardin",
    modalityId: "mod-jardin-completa",
    profileId: "profile-ana",
    status: "waitlisted",
    submittedAt: "2026-07-24",
    estimatedAmountCents: 9600,
    nights: 4,
    menuDays: 4,
    motivation:
      "Me apetece colaborar al aire libre y compartir unos días de trabajo sencillo con otras personas.",
    internalNotes: "Revisar disponibilidad de habitación compartida.",
  },
];

export const mockStays: Stay[] = [
  {
    id: "stay-archivo-ana",
    projectId: "project-archivo-vivo",
    profileId: "profile-ana",
    applicationId: "app-archivo-ana",
    status: "upcoming",
    arrivalDate: "2026-10-12",
    departureDate: "2026-10-17",
  },
];

export const mockMessages: Message[] = [
  {
    id: "message-1",
    profileId: "profile-ana",
    projectId: "project-archivo-vivo",
    subject: "Solicitud recibida",
    body: "Hemos recibido tu solicitud. La revisaremos con cuidado y te avisaremos si necesitamos algún detalle más.",
    createdAt: "2026-07-28",
    read: false,
  },
  {
    id: "message-2",
    profileId: "profile-ana",
    subject: "Antes de venir",
    body: "En esta fase los mensajes son demostrativos. Más adelante podrán vincularse a instrucciones reales de estancia.",
    createdAt: "2026-07-26",
    read: true,
  },
];

export const mockResources: Resource[] = [
  {
    id: "resource-arrival",
    title: "Guía de llegada",
    description: "Indicaciones básicas para preparar la llegada al Mas.",
    type: "guide",
  },
  {
    id: "resource-archive",
    projectId: "project-archivo-vivo",
    title: "Criterios de clasificación del archivo",
    description: "Documento pendiente de sustituir por instrucciones reales.",
    type: "instruction",
  },
];

export const notificationTemplates: NotificationTemplate[] = [
  {
    id: "tpl-application-submitted-admin",
    event: "application_submitted",
    channel: "email",
    subject: "Nueva solicitud recibida",
    body: "Plantilla futura para avisar al equipo cuando llegue una solicitud.",
    editable: true,
  },
  {
    id: "tpl-status-change-participant",
    event: "application_status_changed",
    channel: "email",
    subject: "Actualización de tu solicitud",
    body: "Plantilla futura para avisar al participante cuando cambie el estado.",
    editable: true,
  },
];

export const adminSummary: AdminSummary = {
  publishedProjects: 3,
  upcomingProjects: 2,
  pendingApplications: 5,
  occupiedPlaces: 7,
  waitlistedApplications: 2,
  recentAlerts: [
    "Una solicitud de carpintería requiere revisión individual.",
    "Quedan 2 plazas visibles para Archivo vivo de las enseñanzas.",
    "Hay recursos pendientes de asociar a la semana de jardín.",
  ],
};

export function getProjectBySlug(slug: string): Project | undefined {
  return mockProjects.find((project) => project.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((project) => project.id === id);
}

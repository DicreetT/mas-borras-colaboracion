import type { Conversation } from "@/components/admin/conversation-inbox";

export const adminConversations: Conversation[] = [
  {
    id: "conversation-archivo-ana",
    subject: "Dudas sobre Archivo vivo",
    participant: "Ana Soler",
    project: "Archivo vivo de las enseñanzas",
    unread: 1,
    status: "En revisión",
    messages: [
      {
        id: "message-a1",
        author: "Ana Soler",
        role: "participant",
        body: "Puedo colaborar especialmente con transcripción de audios. También puedo ayudar a clasificar textos si hace falta.",
        createdAt: "29 jul",
      },
      {
        id: "message-a2",
        author: "Equipo",
        role: "admin",
        body: "@Marta, ¿puedes revisar si esta solicitud encaja con el bloque de archivo intensivo?",
        createdAt: "29 jul",
      },
    ],
  },
  {
    id: "conversation-jardin",
    subject: "Información adicional jardín",
    participant: "Luis Romero",
    project: "Semana comunitaria de cuidado del jardín",
    unread: 0,
    status: "Información solicitada",
    messages: [
      {
        id: "message-j1",
        author: "Equipo",
        role: "admin",
        body: "Gracias por tu solicitud. ¿Podrías contarnos si tienes experiencia previa en tareas exteriores?",
        createdAt: "28 jul",
      },
      {
        id: "message-j2",
        author: "Luis Romero",
        role: "participant",
        body: "Sí, he cuidado un huerto familiar y puedo trabajar por las mañanas sin problema.",
        createdAt: "29 jul",
      },
    ],
  },
];

export const participantConversations: Conversation[] = [
  {
    id: "participant-archivo",
    subject: "Solicitud recibida",
    participant: "Equipo de El Mas de Borràs",
    project: "Archivo vivo de las enseñanzas",
    unread: 1,
    status: "En revisión",
    messages: [
      {
        id: "participant-message-1",
        author: "Equipo",
        role: "admin",
        body: "Hemos recibido tu solicitud. La revisaremos con cuidado y te avisaremos si necesitamos algún detalle más.",
        createdAt: "29 jul",
      },
      {
        id: "participant-message-2",
        author: "Tú",
        role: "participant",
        body: "Gracias. Me interesa especialmente colaborar en la parte de audios.",
        createdAt: "29 jul",
      },
    ],
  },
];

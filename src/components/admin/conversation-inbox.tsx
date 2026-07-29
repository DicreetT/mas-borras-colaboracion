"use client";

import { AtSign, MessageSquare, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

export interface ConversationMessage {
  id: string;
  author: string;
  role: "admin" | "participant" | "system";
  body: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  subject: string;
  participant: string;
  project: string;
  unread: number;
  status: string;
  messages: ConversationMessage[];
}

export function ConversationInbox({
  conversations,
  viewer = "admin",
}: {
  conversations: Conversation[];
  viewer?: "admin" | "participant";
}) {
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const activeConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === activeId) ??
      conversations[0],
    [activeId, conversations],
  );

  if (!activeConversation) {
    return (
      <div className="rounded-[8px] border border-dashed border-line bg-surface p-6 text-center">
        <MessageSquare className="mx-auto h-6 w-6 text-terracotta" aria-hidden />
        <p className="mt-3 font-semibold">No hay conversaciones todavía</p>
      </div>
    );
  }

  return (
    <section className="grid overflow-hidden rounded-[8px] border border-line bg-surface md:grid-cols-[18rem_1fr]">
      <aside className="border-b border-line bg-surface-soft md:border-b-0 md:border-r">
        <div className="border-b border-line p-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5 text-olive" aria-hidden />
            Conversaciones
          </h2>
        </div>
        <div className="grid">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setActiveId(conversation.id)}
              className={`grid gap-1 border-b border-line p-4 text-left transition hover:bg-mist ${
                activeConversation.id === conversation.id ? "bg-mist" : ""
              }`}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-semibold">{conversation.participant}</span>
                {conversation.unread > 0 ? (
                  <span className="rounded-full bg-terracotta px-2 py-0.5 text-xs font-semibold text-white">
                    {conversation.unread}
                  </span>
                ) : null}
              </span>
              <span className="text-sm text-muted">{conversation.subject}</span>
              <span className="truncate text-xs text-muted">{conversation.project}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="grid min-h-[34rem] grid-rows-[auto_1fr_auto]">
        <header className="border-b border-line p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">{activeConversation.subject}</h2>
              <p className="mt-1 text-sm text-muted">
                {activeConversation.participant} · {activeConversation.project}
              </p>
            </div>
            <Badge tone="green">{activeConversation.status}</Badge>
          </div>
        </header>

        <div className="grid content-start gap-4 p-5">
          {activeConversation.messages.map((message) => (
            <article
              key={message.id}
              className={`max-w-2xl rounded-[8px] border border-line p-4 ${
                message.role === viewer
                  ? "justify-self-end bg-mist"
                  : "justify-self-start bg-background"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">{message.author}</p>
                <time className="text-xs text-muted">{message.createdAt}</time>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{message.body}</p>
            </article>
          ))}
        </div>

        <form className="border-t border-line bg-background p-5">
          <label className="grid gap-2 text-sm font-medium">
            Responder
            <textarea
              rows={4}
              className="rounded-[8px] border border-line bg-surface px-3 py-2"
              placeholder={
                viewer === "admin"
                  ? "Escribe un mensaje. Usa @nombre para mencionar a otro admin."
                  : "Escribe tu respuesta al equipo."
              }
            />
          </label>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {viewer === "admin" ? (
              <p className="flex items-center gap-2 text-sm text-muted">
                <AtSign className="h-4 w-4" aria-hidden />
                Menciones preparadas para conversaciones internas entre admins.
              </p>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-olive bg-olive px-5 text-sm font-semibold text-white hover:bg-olive-dark"
            >
              <Send className="h-4 w-4" aria-hidden />
              Enviar demo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

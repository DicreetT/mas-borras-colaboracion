import { getCurrentMessages } from "@/data/account";

export default async function MessagesPage() {
  const messages = await getCurrentMessages();

  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mensajes</h1>
      <div className="grid gap-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-[8px] border border-line bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{message.subject}</h2>
              <span className="text-sm text-muted">{message.createdAt}</span>
            </div>
            <p className="mt-3 leading-7 text-muted">{message.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

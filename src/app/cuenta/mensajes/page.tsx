import { ConversationInbox } from "@/components/admin/conversation-inbox";
import { participantConversations } from "@/data/conversations";

export default async function MessagesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mensajes</h1>
      <ConversationInbox
        conversations={participantConversations}
        viewer="participant"
      />
    </div>
  );
}

import { ConversationInbox } from "@/components/admin/conversation-inbox";
import { adminConversations } from "@/data/conversations";

export default function AdminMessagesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="font-serif text-4xl font-semibold">Mensajes</h1>
      <ConversationInbox conversations={adminConversations} />
    </div>
  );
}

import { useParams } from "next/navigation";
import { MessageType } from "@/types/message";

export function Message({ message }: { message: MessageType }) {
  const { contactId } = useParams();
  const isMyMessage = message.senderId !== Number(contactId) ? true : false;

  return (
    <div
      className={`flex items-end gap-2 ${isMyMessage && "flex-row-reverse"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm wrap-break-word ${
          isMyMessage
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

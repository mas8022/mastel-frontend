import { ContextMenuItem } from "@/components/ui/context-menu";
import { useSocket } from "@/hooks/useSocket";
import { MessageType } from "@/types/message";
import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";

const DeleteMessageBtn = ({ messageId }: { messageId: MessageType["id"] }) => {
  const { contactId } = useParams();
  
  const socket = useSocket("chat");

  const deleteMessage = () => {
    socket.emit("delete-message", { contactId, messageId });
  };

  return (
    <ContextMenuItem
      onSelect={deleteMessage}
      className={
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all text-red-400 focus:text-red-400 focus:bg-red-500/10"
      }
    >
      <span
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-lg
        bg-red-500/10 text-red-400
          group-focus:scale-95
          transition
        `}
      >
        <Trash2 />
      </span>
      Delete
    </ContextMenuItem>
  );
};

export default DeleteMessageBtn;

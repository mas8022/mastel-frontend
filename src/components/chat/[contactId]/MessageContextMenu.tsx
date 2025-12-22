import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { MessageType } from "@/types/message";
import { Reply, Pencil } from "lucide-react";
import DeleteMessageBtn from "./DeleteMessageBtn";

const MessageContextMenu = ({
  isMyMessage,
  message,
}: {
  isMyMessage: boolean;
  message: MessageType;
}) => {
  return (
    <ContextMenuContent
      className="
          min-w-[180px]
          rounded-2xl
          border border-white/10
          bg-zinc-900/80
          backdrop-blur-2xl
          shadow-2xl
          p-1
          animate-in
          fade-in
          zoom-in-95
          data-[state=open]:duration-200
        "
    >
      {isMyMessage && <DeleteMessageBtn messageId={message.id}/>}

      {isMyMessage && <MenuItem icon={<Pencil />} label="Edit" />}

      <MenuItem icon={<Reply />} label="Reply" />
    </ContextMenuContent>
  );
};

export default MessageContextMenu;

function MenuItem({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <ContextMenuItem
      className={`
        group
        flex items-center gap-3
        rounded-xl
        px-3 py-2.5
        text-sm
        transition-all
        ${
          danger
            ? "text-red-400 focus:text-red-400 focus:bg-red-500/10"
            : "text-zinc-100 focus:bg-white/10"
        }
      `}
    >
      <span
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-lg
          ${danger ? "bg-red-500/10 text-red-400" : "bg-white/10 text-zinc-200"}
          group-focus:scale-95
          transition
        `}
      >
        {icon}
      </span>
      {label}
    </ContextMenuItem>
  );
}

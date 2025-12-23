"use client";
import { useParams } from "next/navigation";
import { MessageType } from "@/types/message";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MessageContextMenu from "./MessageContextMenu";
import { useState } from "react";
import EditModal from "./EditModal";

export function Message({ message }: { message: MessageType }) {
  const { contactId } = useParams();
  const isMyMessage = message.senderId !== Number(contactId);
  const [editModalActive, setEditModelActive] = useState<boolean>(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={`relative flex items-end gap-2 select-none ${
            isMyMessage ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`
              max-w-[75%]
              rounded-2xl px-4 py-2 text-sm
              shadow-sm
              wrap-break-word
              transition-all
              active:scale-[0.98]
              ${
                isMyMessage
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }
            `}
          >
            {message.text}
          </div>
        </div>
      </ContextMenuTrigger>
      <EditModal
        editModalActive={editModalActive}
        setEditModelActive={setEditModelActive}
        message={message}
      />

      <MessageContextMenu
        isMyMessage={isMyMessage}
        message={message}
        setEditModelActive={setEditModelActive}
      />
    </ContextMenu>
  );
}

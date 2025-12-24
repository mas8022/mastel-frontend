"use client";

import { useParams } from "next/navigation";
import { MessageType } from "@/types/message";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MessageContextMenu from "./MessageContextMenu";
import { useState } from "react";
import EditModal from "./EditModal";

type Props = {
  message: MessageType;
  setRefrenceMessage: (value: MessageType) => void;
};

export function Message({ message, setRefrenceMessage }: Props) {
  const { contactId } = useParams();
  const isMyMessage = message.senderId !== Number(contactId);
  const [editModalActive, setEditModelActive] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`
              max-w-[72%]
              rounded-2xl
              shadow-[0_1px_2px_rgba(0,0,0,0.08)]
              text-sm
              overflow-hidden
              ${
                isMyMessage
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }
            `}
          >
            {/* Reply preview (clean Telegram-like) */}
            {message.replyTo && (
              <div
                className={`
                  px-3 py-1.5 text-xs
                  border-l-2
                  truncate
                  ${
                    isMyMessage
                      ? "border-primary-foreground/40 text-primary-foreground/70"
                      : "border-primary text-muted-foreground"
                  }
                `}
              >
                {message.replyTo.text}
              </div>
            )}

            {/* Message text */}
            <div className="px-4 py-2 wrap-break-word leading-relaxed">
              {message.text}
            </div>
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
        setRefrenceMessage={setRefrenceMessage}
      />
    </ContextMenu>
  );
}

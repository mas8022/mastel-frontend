"use client";

import { useParams } from "next/navigation";
import { MessageType } from "@/types/message";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import MessageContextMenu from "./MessageContextMenu";
import { useState } from "react";
import EditModal from "./EditModal";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { VoicePlayer } from "./VoicePlayer";

type Props = {
  message: MessageType;
  setRefrenceMessage: (value: MessageType) => void;
};

export function Message({ message, setRefrenceMessage }: Props) {
  const { contactId } = useParams();
  const isMyMessage = message.senderId !== Number(contactId);
  const [editModalActive, setEditModelActive] = useState(false);

  const renderMessageContent = () => {
    switch (message.type) {
      case "TEXT":
        return <div className="px-4 py-2 wrap-break-word">{message.text}</div>;

      case "IMAGE":
        return message.fileUrl ? (
          <CardContent className="p-0">
            <Image
              width={200}
              height={200}
              src={message.fileUrl}
              alt="image message"
              className="object-cover w-full h-auto"
            />
          </CardContent>
        ) : null;

      case "VIDEO":
        return message.fileUrl ? (
          <Card className="overflow-hidden rounded-xl max-w-[300px]">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <video
                  src={message.fileUrl}
                  controls
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </CardContent>
          </Card>
        ) : null;

      case "VOICE":
        return message.fileUrl ? (
          <VoicePlayer src={message.fileUrl} duration={message.duration!} />
        ) : null;

      case "FILE":
        return message.fileUrl ? (
          <Card className="overflow-hidden rounded-xl max-w-[300px] p-3 flex items-center justify-between">
            <span className="truncate">{message.fileKey}</span>
            <a
              href={message.fileUrl}
              target="_blank"
              className="inline-flex items-center px-3 py-1.5 rounded-md border border-input text-sm font-medium shadow-sm hover:bg-muted/50"
            >
              Download
            </a>
          </Card>
        ) : null;

      default:
        return <div>Unsupported message type</div>;
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={`flex ${
            isMyMessage ? "justify-end" : "justify-start"
          } mb-2`}
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
                {message.replyTo.text ?? "Media message"}
              </div>
            )}

            {renderMessageContent()}
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

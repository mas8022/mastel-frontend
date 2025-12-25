"use client";
import { useState } from "react";
import { Paperclip, SendHorizonal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { MessageType } from "@/types/message";

type PropsType = {
  referenceMessage: MessageType | any;
  setRefrenceMessage: (value: MessageType | any) => void;
};

export function MessageInput({
  referenceMessage,
  setRefrenceMessage,
}: PropsType) {
  const [message, setMessage] = useState("");

  const { contactId } = useParams();
  const socket = useSocket("chat");

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      message,
      contactId,
      replyToId: referenceMessage?.id ?? null,
    });

    setMessage("");
    setRefrenceMessage(null);
  };

  return (
    <div className=" p-3 border-t bg-background/80 backdrop-blur rounded-xl flex flex-col gap-2">
      {/* Reply box (Telegram style) */}
      {referenceMessage && (
        <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-muted border-l-4 border-primary">
          <div className="text-sm">
            <p className="text-xs text-muted-foreground">Replying to message</p>
            <p className="line-clamp-2">{referenceMessage.text}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setRefrenceMessage(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-xl bg-muted"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <Button size="icon" variant="ghost">
          <Paperclip className="h-5 w-5" />
        </Button>

        <Button size="icon" onClick={sendMessage} disabled={!message.trim()}>
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

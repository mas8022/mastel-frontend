"use client";

import { useState } from "react";
import { Paperclip, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export function MessageInput() {
  const [message, setMessage] = useState("");

  const { contactId } = useParams();

  const socket = useSocket("chat");

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", { message, contactId });
    setMessage("");
  };

  return (
    <div className="sticky bottom-0 z-10 p-3 border-t bg-background/80 backdrop-blur rounded-xl flex items-center gap-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        rows={1}
        className="flex-1 resize-none rounded-xl bg-muted"
        onKeyDown={(e) => e.code === "Enter" && sendMessage()}
      />
      <Button size="icon" variant="ghost">
        <Paperclip className="h-5 w-5" />
      </Button>

      <Button size="icon" onClick={sendMessage} disabled={!message.trim()}>
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
}

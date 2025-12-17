"use client";
import { ChatHeader } from "@/components/chat/[contactId]/ChatHeader";
import { MessageInput } from "@/components/chat/[contactId]/message-input";
import { MessageList } from "@/components/chat/[contactId]/message-list";
import { chats } from "@/lib/data";

const page = () => {
  const chat = chats[0];

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <ChatHeader user={chat!} />

      <MessageList/>

      <MessageInput />
    </div>
  );
};

export default page;

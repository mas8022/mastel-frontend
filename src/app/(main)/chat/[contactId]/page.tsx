"use client";
import { ChatHeader } from "@/components/chat/[contactId]/ChatHeader";
import { MessageInput } from "@/components/chat/[contactId]/message-input";
import { MessageList } from "@/components/chat/[contactId]/message-list";
const page = () => {

  return (
    <div className="min-h-screen h-full w-full flex flex-col">
      <ChatHeader />

      <MessageList/>

      <MessageInput />
    </div>
  );
};

export default page;

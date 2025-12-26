"use client";
import { ChatHeader } from "@/components/chat/[contactId]/ChatHeader";
import { MessageInput } from "@/components/chat/[contactId]/message-input";
import { MessageList } from "@/components/chat/[contactId]/message-list";
import { MessageType } from "@/types/message";
import { useState } from "react";

const page = () => {
  const [refrenceMessage, setRefrenceMessage] = useState<MessageType>();


  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <ChatHeader />
      <MessageList setRefrenceMessage={setRefrenceMessage}/>
      <MessageInput
        referenceMessage={refrenceMessage}
        setRefrenceMessage={setRefrenceMessage}
      />
    </div>
  );
};

export default page;

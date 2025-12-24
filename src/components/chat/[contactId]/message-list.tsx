"use client";
import { MessageType } from "@/types/message";
import Empty from "./Empty";
import { Message } from "./message";
import useGetMessages from "@/hooks/useGetMessages";

export function MessageList({
  setRefrenceMessage,
}: {
  setRefrenceMessage: (value: MessageType) => void;
}) {
  const { messages } = useGetMessages();

  return (
    <div className="flex-1 overflow-y-auto py-6 px-4">
      {messages?.length ? (
        <div className="space-y-6">
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              setRefrenceMessage={setRefrenceMessage}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

"use client";
import { MessageType } from "@/types/message";
import Empty from "./Empty";
import { Message } from "./message";
import useGetMessages from "@/hooks/useGetMessages";
import useChatRoomAutoScroll from "@/hooks/useChatRoomAutoScroll";

export function MessageList({
  setRefrenceMessage,
}: {
  setRefrenceMessage: (value: MessageType) => void;
}) {
  const { messages } = useGetMessages();

  const { endChatRef } = useChatRoomAutoScroll(messages);

  return (
    <div className="flex-1 overflow-y-auto py-6 px-4 hidden-scrollbar">
      {messages?.length ? (
        <>
          <div className="space-y-6">
            {messages.map((message: MessageType) => (
              <Message
                key={message.id}
                message={message}
                setRefrenceMessage={setRefrenceMessage}
              />
            ))}
          </div>
          <div ref={endChatRef} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
}

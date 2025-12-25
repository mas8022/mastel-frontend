import { MessageType } from "@/types/message";
import { useEffect, useRef } from "react";

const useChatRoomAutoScroll = (messages: MessageType[]) => {
  const endChatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endChatRef.current) return;

    const parent = endChatRef.current.parentElement;
    if (!parent) return;

    parent.scrollTo({
      top: parent.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return { endChatRef };
};

export default useChatRoomAutoScroll;

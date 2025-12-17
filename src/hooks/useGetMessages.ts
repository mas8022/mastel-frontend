import { useSocket } from "@/hooks/useSocket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useGetMessages = () => {
  const [messages, setMessages] = useState([]);

  const socket = useSocket("chat");

  const { contactId } = useParams();

  useEffect(() => {
    if (!socket || !contactId) return;

    socket.emit("get-messages", { contactId });

    socket.on("get-messages", (data: any) => {
      setMessages(data);
    });

    return () => {
      socket.off("get-messages");
    };
  }, [socket, contactId]);

  return { messages };
};

export default useGetMessages;

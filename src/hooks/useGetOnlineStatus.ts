import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

const useGetOnlineStatus = () => {
  const { contactId } = useParams();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const socket = useSocket("chat");

  useEffect(() => {
    if (!socket || !contactId) return;

    const handler = (data: any) => {
      if (data.userId == contactId) {
        setIsOnline(data.isOnline);
      }
    };

    socket.on("get-online-status", handler);
    socket.emit("get-online-status-contact", contactId);
    socket.on("get-online-status-contact", handler);

    return () => {
      socket.off("get-online-status", handler);
      socket.off("get-online-status-contact", handler);
    };
  }, [socket, contactId]);

  console.log(isOnline);

  return { isOnline };
};

export default useGetOnlineStatus;

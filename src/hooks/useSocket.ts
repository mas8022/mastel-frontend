"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (nameSpace: any): Socket => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${nameSpace}`,
      {
        withCredentials: true,
      }
    );

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket!;
};

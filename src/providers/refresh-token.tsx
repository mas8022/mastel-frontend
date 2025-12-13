"use client";
import Fetch from "@/fetchers/Fetch";
import { ResType } from "@/types/response";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const RefreshTokenProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const [isAccess, setIsAccess] = useState<boolean>(false);

  useEffect(() => {
    const refreshToken = async () => {
      const res: ResType = await Fetch.get("/auth/refresh");

      if (res.status > 201) return router.replace("/auth");

      setIsAccess(true);
    };

    refreshToken();
  }, []);

  return <>{isAccess || path === "/auth" ? children : null}</>;
};

export default RefreshTokenProvider;

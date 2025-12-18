import SecretFetch from "@/fetchers/SecretFetch";
import { ResType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-me"],
    queryFn: async () => {
      const res: ResType = await SecretFetch.get("/users/me");
      if (res.status > 201) return;
      return res.data;
    },
  });

  return { data, isPending };
};

export default useGetMe;

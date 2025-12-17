import Fetch from "@/fetchers/Fetch";
import { ResType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "./useDebounce";
import { UserType } from "@/types/user";

const useFindUsers = () => {
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search);

  const { data, isPending } = useQuery<UserType[]>({
    queryKey: ["find-users", debounceSearch],
    enabled: !!debounceSearch,
    queryFn: async () => {
      const res: ResType = await Fetch.get(
        `/users/find-users/${debounceSearch}`
      );

      return res.data ?? [];
    },
  });

  return {
    search,
    setSearch,
    data,
    isPending,
  };
};

export default useFindUsers;

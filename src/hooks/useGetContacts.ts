import SecretFetch from "@/fetchers/SecretFetch";
import { ContactType } from "@/types/contact";
import { ResType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const useGetContacts = () => {
  const { data, isPending } = useQuery<ContactType[]>({
    queryKey: ["get-contacts"],
    queryFn: async () => {
      const res: ResType = await SecretFetch.get("/users/contacts");

      if (res.status > 201) return;

      return res.data;
    },
  });

  return { data, isPending };
};

export default useGetContacts;

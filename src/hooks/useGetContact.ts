import Fetch from "@/fetchers/Fetch";
import { ContactType } from "@/types/contact";
import { ResType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useGetContact = () => {
  const { contactId } = useParams();

  const { data, isPending } = useQuery<ContactType>({
    queryKey: ["get-contact", contactId],
    queryFn: async () => {
      const res: ResType = await Fetch.get(`/users/contact/${contactId}`);

      if (res.status > 201) return;

      return res.data;
    },
  });

  return { data, isPending };
};

export default useGetContact;

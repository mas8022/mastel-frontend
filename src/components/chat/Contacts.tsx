"use client";
import ChatCard from "@/components/chat/chat-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetContacts from "@/hooks/useGetContacts";
import Loader from "../shared/Loader";
import Empty from "./Empty";

const Contacts = () => {
  const { data: contacts, isPending } = useGetContacts();

  if (isPending) return <Loader />;

  return (
    <ScrollArea className="flex-1">
      <div className="grid gap-1">
        {contacts?.length ? (
          contacts.map((contact: any) => (
            <ChatCard key={contact.id} contact={contact} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </ScrollArea>
  );
};

export default Contacts;

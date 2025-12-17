import Contacts from "@/components/chat/Contacts";
import Header from "@/components/chat/header";
import Search from "@/components/chat/search";

export default function ChatPage() {
  return (
    <div
      className="w-full min-h-screen
        flex flex-col gap-2 h-full
      "
    >
      <Header />
      <Search />
      <Contacts />
    </div>
  );
}

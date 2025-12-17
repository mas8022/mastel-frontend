import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { ContactType } from "@/types/contact";

const ChatCard = ({ contact }: { contact: ContactType }) => {
  return (
    <Link href={`/chat/${contact.id}`}>
      <div
        className="
                  flex items-center gap-3
                  rounded-xl py-2 px-2
                  transition-all
                  hover:bg-violet-500/15
                  hover:shadow-md hover:shadow-purple-900/30
                "
      >
        <UserAvatar user={contact} />

        <div className="flex-1 truncate">
          <div className="font-semibold text-white">{contact.username}</div>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;

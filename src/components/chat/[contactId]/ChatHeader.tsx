import { Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../user-avatar";
import useGetContact from "@/hooks/useGetContact";
import { MoonLoader } from "react-spinners";
import OnlineStatusBox from "./OnlineStatusBox";

export function ChatHeader() {
  const { data: contact, isPending } = useGetContact();

  if (isPending) return <MoonLoader size={18} />;

  return (
    <div className="flex items-center justify-between border-b px-4 py-3 bg-background/80 backdrop-blur z-10 rounded-xl">
      <div className="flex items-center gap-3">
        <UserAvatar user={contact} />
        <div>
          <div className="text-sm font-semibold">{contact?.username}</div>
          <OnlineStatusBox />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Video className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

import { MessageCircle } from "lucide-react";

const Logo = () => {
  return (
    <div className="mb-8 flex justify-center">
      <div className={"flex items-center gap-2 text-primary"}>
        <MessageCircle className={"stroke-current h-8 w-8"} strokeWidth={2.5} />
        <h1 className={"font-bold tracking-tighter text-foreground"}>Violet</h1>
      </div>
    </div>
  );
};

export default Logo;

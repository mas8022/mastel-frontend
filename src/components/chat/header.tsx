import { Button } from "../ui/button";
import Logo from "../shared/logo";
import Profile from "./Profile";

const Header = () => {
  return (
    <div
      className="
          flex items-center justify-between
        "
    >
      <Logo />

      <Button
        variant="ghost"
        size="icon"
        className="
            h-9 w-9
            text-violet-300
            hover:bg-violet-500/20
            hover:text-white
          "
      >
        <Profile/>
      </Button>
    </div>
  );
};

export default Header;

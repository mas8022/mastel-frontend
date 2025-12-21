import useGetOnlineStatus from "@/hooks/useGetOnlineStatus";

const OnlineStatusBox = () => {
  const { isOnline } = useGetOnlineStatus();

  return (
    <div className="text-xs text-muted-foreground">
      {isOnline ? "online" : "offline"}
    </div>
  );
};

export default OnlineStatusBox;

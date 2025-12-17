import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <PuffLoader size={80} color="#7c3aed" speedMultiplier={1.5} />
      <div className="mt-4 text-muted-foreground font-medium text-lg">
        در حال بارگذاری...
      </div>
    </div>
  );
};

export default Loader;

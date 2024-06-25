import "@/styles/index.css";
import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderCircle className="loader text-primary" size={80} />
    </div>
  );
};

export default Loader;

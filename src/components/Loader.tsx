import "../styles/index.css";
import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div data-testid="loader-container" className="flex justify-center items-center h-screen">
      <LoaderCircle className="loader text-primary" size={80} />
    </div>
  );
};

export default Loader;

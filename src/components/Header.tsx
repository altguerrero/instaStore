import { useOrderStore } from "@/hooks";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { MapPinned } from "lucide-react";
import { ChangeLocationDialog } from "./";

const Header = () => {
  const { order } = useOrderStore();

  return (
    <header className="bg-white shadow-md z-10 py-4 px-6 flex justify-between items-center">
      <Logo size="2xl" />

      <div className="flex items-center gap-4">
        <ChangeLocationDialog>
          <Button>
            <MapPinned className="mr-2 h-4 w-4" /> Location
          </Button>
        </ChangeLocationDialog>
        <div className="flex flex-col">
          <h3 className="text-md font-bold">#Order ID:</h3>
          <p className="text-sm font-semibold">{order?.order_id}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

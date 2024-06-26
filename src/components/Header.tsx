import { useOrderStore } from "@/hooks";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { EllipsisVertical, ListFilter, MapPinned } from "lucide-react";
import { ChangeLocationDialog, FilterStoresDialog } from "./";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const Header = () => {
  const { order } = useOrderStore();

  const OrderInfo = ({ isMobile = false }) => (
    <div className={`flex flex-col ${isMobile ? "text-xs" : "text-sm"}`}>
      <h3 className={`${isMobile ? "text-sm" : "text-md"} font-bold`}>
        #Order ID:
      </h3>
      <p className="font-semibold">{order?.order_id}</p>
    </div>
  );

  const DialogButtons = () => (
    <>
      <FilterStoresDialog>
        <Button variant="secondary">
          <ListFilter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </FilterStoresDialog>
      <ChangeLocationDialog>
        <Button>
          <MapPinned className="mr-2 h-4 w-4" /> Location
        </Button>
      </ChangeLocationDialog>
    </>
  );

  return (
    <header className="bg-white shadow-md z-10 py-2 sm:py-4 px-6 flex justify-between items-center">
      <Logo size="2xl" />
      <div className="flex items-center gap-4 max-sm:hidden">
        <DialogButtons />
        <OrderInfo />
      </div>
      <div className="flex items-center gap-4 sm:hidden">
        <OrderInfo isMobile />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white rounded-lg w-40 p-4 flex flex-col gap-4">
            <DialogButtons />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;

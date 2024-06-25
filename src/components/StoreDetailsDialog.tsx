import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface StoreDetailsDialogProps {
  children: React.ReactNode;
  store: Store;
  direction: google.maps.DirectionsResult | null;
  onGetRoute: (direction: google.maps.DirectionsResult) => void;
}

const StoreDetailsDialog = ({
  children,
  store,
  direction,
  onGetRoute,
}: StoreDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <span>{store.storeName}</span>
            <Badge
              className={cn("bg-gray-400", { "bg-green-500": store.isOpen })}
            >
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <div>
              <Label>Delivery Time:</Label>
              <p>{direction?.routes[0].legs[0].duration?.text || "N/A"}</p>
            </div>
            <div>
              <Label>Distance: </Label>
              <p>{direction?.routes[0].legs[0].distance?.text || "N/A"}</p>
            </div>
            <div>
              <Label>Address</Label>
              <p>{direction?.routes[0].legs[0].end_address || "N/A"}</p>
            </div>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => direction && onGetRoute(direction)}>
                Get Route
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailsDialog;

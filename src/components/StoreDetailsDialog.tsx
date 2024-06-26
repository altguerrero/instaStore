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
import { Skeleton } from "./ui/skeleton";
import { Store } from "@/types";

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
  const isLoading = !direction;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <span>{store.storeName}</span>
            <Badge
              className={cn("bg-gray-400 hover:bg-gray-400", {
                "bg-green-500 hover:bg-green-500": store.isOpen,
              })}
            >
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-left space-y-4 pt-4">
            <div>
              <Label>Delivery Time:</Label>
              {isLoading ? (
                <Skeleton className="h-4 w-24 mt-2" />
              ) : (
                <p className="mt-2">
                  {direction.routes[0].legs[0].duration?.text || "N/A"}
                </p>
              )}
            </div>
            <div>
              <Label>Distance:</Label>
              {isLoading ? (
                <Skeleton className="h-4 w-24 mt-2" />
              ) : (
                <p className="mt-2">
                  {direction.routes[0].legs[0].distance?.text || "N/A"}
                </p>
              )}
            </div>
            <div>
              <Label>Store Address:</Label>
              {isLoading ? (
                <Skeleton className="h-4 w-24 mt-2" />
              ) : (
                <p className="mt-2">
                  {direction.routes[0].legs[0].end_address || "N/A"}
                </p>
              )}
            </div>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="mt-8"
                onClick={() => direction && onGetRoute(direction)}
              >
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

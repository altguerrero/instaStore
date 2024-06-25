import { useOrderStore, useStoreByOrder } from "@/hooks";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronUp } from "lucide-react";

const Store = () => {
  const { order } = useOrderStore();
  const { stores, generateStores } = useStoreByOrder();
  const [openStoreId, setOpenStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (order.lat && order.lng) generateStores(order.lat, order.lng, 25);
  }, [order.lat, order.lng, generateStores]);

  const toggleCollapse = (storeId: string) => {
    setOpenStoreId((prev) => (prev === storeId ? null : storeId));
  };

  return (
    <ScrollArea className="h-full w-full">
      {stores.map((store) => (
        <Card key={store.storeId} className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{store.storeName}</CardTitle>
            <CardDescription>
              <Badge
                className={cn("bg-gray-400", {
                  "bg-green-500": !!store.isOpen,
                })}
              >
                {store.isOpen ? "Open" : "Closed"}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2 bg-gray-50">
            <Collapsible
              open={openStoreId === store.storeId}
              onOpenChange={() => toggleCollapse(store.storeId)}
            >
              <CollapsibleTrigger className="text-blue-400 font-semibold w-full flex gap-2 items-center">
                Store details
                <ChevronUp
                  className={cn("w-5 h-5 transition-transform", {
                    "rotate-180": openStoreId === store.storeId,
                  })}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-1 mt-2">
                  <div>
                    <span className="font-bold">Delivery Time:</span> 10 min
                  </div>
                  <div>
                    <span>Distance:</span> 2.8 km
                  </div>
                  <div>
                    <span>Address:</span> Bogota, Colombia
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};

export default Store;

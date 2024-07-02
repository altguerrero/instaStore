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
import { Skeleton } from "./ui/skeleton";
import { useStoreDirections } from "@/hooks";

const StoreList = () => {
  const {
    filteredStores,
    loading,
    openStoreId,
    handleToggleCollapse,
    getStoreDirections,
  } = useStoreDirections();

  return (
    <ScrollArea className="h-full w-full">
      {filteredStores.map((store) => {
        const direction = getStoreDirections(store.storeId);
        const isLoading = loading === store.storeId;
        return (
          <Card key={store.storeId} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{store.storeName}</CardTitle>
              <CardDescription>
                <Badge
                  className={cn("bg-gray-400 hover:bg-gray-400", {
                    "bg-green-500 hover:bg-green-500": !!store.isOpen,
                  })}
                >
                  {store.isOpen ? "Open" : "Closed"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2 bg-gray-50">
              <Collapsible
                open={openStoreId === store.storeId}
                onOpenChange={() => handleToggleCollapse(store)}
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
                    <div
                      className={cn("", {
                        "flex items-center gap-2": isLoading,
                      })}
                    >
                      <span className="font-bold">Delivery Time:</span>{" "}
                      {isLoading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        direction?.routes[0].legs[0].duration?.text
                      )}
                    </div>
                    <div
                      className={cn("", {
                        "flex items-center gap-2": isLoading,
                      })}
                    >
                      <span>Distance:</span>{" "}
                      {isLoading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        direction?.routes[0].legs[0].distance?.text
                      )}
                    </div>
                    <div
                      className={cn("", {
                        "flex items-center gap-2": isLoading,
                      })}
                    >
                      <span>Store Address:</span>{" "}
                      {isLoading ? (
                        <Skeleton className="h-4 w-28" />
                      ) : (
                        direction?.routes[0].legs[0].end_address
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        );
      })}
    </ScrollArea>
  );
};

export default StoreList;

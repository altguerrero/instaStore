import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/utils";
import { useOrderStore } from "@/hooks";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SearchPlaces from "./SearchPlaces";

const formSchema = orderSchema();

interface ChangeLocationDialogProps {
  children: React.ReactNode;
}

const ChangeLocationDialog = ({ children }: ChangeLocationDialogProps) => {
  const { order, setOrder } = useOrderStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: order,
  });

  const onChangeOrderSubmit = async (data: z.infer<typeof formSchema>) => {
    setOrder(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change location</DialogTitle>
          <DialogDescription>
            Use the search engine to find a new location for your order.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onChangeOrderSubmit)}
          className="space-y-4"
        >
          <div>
            <SearchPlaces register={form.register} setValue={form.setValue} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save Location</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeLocationDialog;

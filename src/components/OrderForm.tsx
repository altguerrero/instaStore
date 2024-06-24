import { useOrderStore } from "@/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchPlaces } from "./";

const formSchema = orderSchema();

const OrderForm = () => {
  const { order, setOrder } = useOrderStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: order,
  });

  const onOrderSubmit = async (data: z.infer<typeof formSchema>) => {
    setOrder(data);
    navigate("/stores");
  };

  return (
    <div className="w-[320px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onOrderSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="order_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ORD-12345" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={() => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <SearchPlaces
                    register={form.register}
                    setValue={form.setValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lat"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lng"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex w-full">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;

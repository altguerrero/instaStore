import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSchema } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useStoreByOrder } from "@/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = filterSchema;

interface FilterStoresDialogProps {
  children: React.ReactNode;
}

const FilterStoresDialog = ({ children }: FilterStoresDialogProps) => {
  const { setFilters, filters } = useStoreByOrder();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: filters,
  });

  const onFilterSubmit = async (data: z.infer<typeof formSchema>) => {
    setFilters(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Stores</DialogTitle>
          <DialogDescription>
            Select the criteria to filter the stores. Click apply when finished.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFilterSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="isOpen"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    id="isOpen"
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                  <FormLabel
                    htmlFor="isOpen"
                    className="text-sm font-medium text-gray-700"
                    style={{ margin: "0 .5rem" }}
                  >
                    Show only open stores
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2km">2 km</SelectItem>
                        <SelectItem value="4km">4 km</SelectItem>
                        <SelectItem value="6km">6 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="flex w-full">
                Apply Filters
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterStoresDialog;

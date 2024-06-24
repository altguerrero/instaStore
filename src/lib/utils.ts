import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const orderSchema = () =>
  z.object({
    order_id: z
      .string()
      .min(5, { message: "Order ID must be at least 5 characters long." })
      .max(10, { message: "Order ID must be at most 10 characters long." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long." })
      .max(1000, { message: "Address must be at most 100 characters long." }),
    lat: z.number(),
    lng: z.number(),
  });

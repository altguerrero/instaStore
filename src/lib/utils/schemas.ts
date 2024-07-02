import { z } from "zod";

/**
 * Esquema de validación para la orden.
 * @returns {z.ZodObject} - El esquema de validación para la orden.
 */
export const orderSchema = z.object({
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

/**
 * Esquema de validación para los filtros.
 * @type {z.ZodObject}
 */
export const filterSchema = z.object({
  isOpen: z.boolean().optional(),
  distance: z.enum(["2km", "4km", "6km"]).optional(),
});

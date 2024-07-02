import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de forma condicional usando `clsx` y `tailwind-merge`.
 * @param {...ClassValue[]} inputs - Las clases a combinar.
 * @returns {string} - La cadena de clases combinadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

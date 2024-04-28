import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price: number): string {
  const formattedPrice = price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  return formattedPrice;
}
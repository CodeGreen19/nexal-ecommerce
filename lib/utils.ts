import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function waitInSecond(milliSeconds?: number) {
  return new Promise((res) => setTimeout(res, milliSeconds || 1000));
}

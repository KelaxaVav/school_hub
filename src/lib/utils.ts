import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const customFetch = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const token = localStorage.getItem("token");
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    options.headers = { ...options.headers, "Content-Type": "application/json" };
    return fetch(`${NEXT_PUBLIC_API_URL}${url}`, { ...options, headers: { Authorization: `Bearer ${token}`, ...options.headers } });
  };


  


  
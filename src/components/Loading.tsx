"use client";

import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

export default function Loading() {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  if (isLoading) {
    return (
      <div
        className="loading fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  } else {
    return null;
  }
}

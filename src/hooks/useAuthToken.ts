"use client"
import { useSession } from "next-auth/react";

const useAuthToken = (): string | null => {
    const session = useSession();

  if (typeof window !== "undefined") {
    return (session?.data?.user as { token?: string })?.token || null;
  }

  return null;
};

export default useAuthToken;
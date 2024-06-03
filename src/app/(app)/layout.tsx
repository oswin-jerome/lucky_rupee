"use client";
import { account } from "@/utils/appWrite";
import { Button } from "@radix-ui/themes";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    getUser();
  }, []);
  const router = useRouter();
  const getUser = async () => {
    try {
      const user = await account.get();
      if (!user) {
        router.push("/auth/login");
      }
    } catch (e) {
      router.push("/auth/login");
    }
  };
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

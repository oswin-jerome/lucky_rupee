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
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

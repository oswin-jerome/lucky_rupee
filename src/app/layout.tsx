import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucky Rupee",
  description: "Find Your Lucky Number in Rupees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

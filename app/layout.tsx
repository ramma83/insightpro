import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PS Tool - Professional Services Platform",
  description: "Enterprise security health check and professional services platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gradient-subtle antialiased`}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
    </html>
  );
}
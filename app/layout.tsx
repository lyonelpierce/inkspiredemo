import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ImageModalProvider } from "@/components/ImageModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inkspire.ai | AI Tattoo Generator",
  description: "AI Tattoo Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        <ImageModalProvider />
        {children}
      </body>
    </html>
  );
}

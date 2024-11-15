import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Londrina_Solid } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const londrinaSolid = Londrina_Solid({
  subsets: ["latin"],
  weight: ["100", "300", "400", "900"],
  variable: "--font-londrina-solid",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(londrinaSolid.className, "max-h-screen antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { Urbanist } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${urbanist.className} antialiased min-h-screen h-full`}
    >
    {/*<time dateTime="2016-10-25" suppressHydrationWarning/>*/}
    {children}
    <Toaster position={'top-right'}/>
    </body>
    </html>
  );
}

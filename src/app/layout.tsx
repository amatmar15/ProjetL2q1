import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "../Providers/cart-provider";

const roboto_flex = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoPower Drive",
  description: "EcoPower Drive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn("relative h-full antialiased", roboto_flex.className)}>
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: "#000000" },
            elements: {
              formButtonPrimary:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              socialButtonsBlockButton:
                "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
              socialButtonsBlockButtonText: "font-semibold",
              formButtonReset:
                "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
              membersPageInviteButton:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              card: "bg-[#fafafa]",
            },
          }}
        >

          <CartProvider>
            <main className="relative flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow flex-1">
                {children}
              </div>
              <Footer />
            </main>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}


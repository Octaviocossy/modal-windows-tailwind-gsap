import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ModalLayout } from "./modal_layout";
import Link from "next/link";

import "../globals.css";
import { Suspense } from "react";
import { Center } from "@/ui";

interface IProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="flex justify-center p-8 absolute w-full font-semibold border-b">
            <ul className="flex space-x-6">
              <li>
                <Link href="/">🏡 Home</Link>
              </li>
              <li>
                <Link href="/operators">👷‍♂️ Operators</Link>
              </li>
              <li>
                <Link href="/products">📦 Products</Link>
              </li>
            </ul>
          </header>
          <ModalLayout>
            <Suspense
              fallback={
                <Center>
                  <p>Loading...</p>
                </Center>
              }
            >
              {children}
            </Suspense>
          </ModalLayout>
        </Providers>
      </body>
    </html>
  );
}

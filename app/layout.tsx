import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import SupbaseProvider from "./context/SupbaseProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterviewMate⚡",
  description: "An AI Interview website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/e9aeed2e8b.js"></Script>
      <body className={inter.className}>
        <SupbaseProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SupbaseProvider>
      </body>
    </html>
  );
}

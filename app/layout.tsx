import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import SupabaseProvider from "../context/SupabaseProvider";
import { Analytics } from '@vercel/analytics/react';
import AppProvider from "../context/AppProvider";

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
      <body className={`${inter.className}`}>
        <SupabaseProvider>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
        </AppProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

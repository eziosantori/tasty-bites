import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./Providers/ReactQueryProvider";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tasty Bites",
    default: "Tasty Bites | Find Delicious Recipes",
  },
  description: "Search for recipes by ingredients or keywords and save your favorites for easy access.",
  keywords: ["recipes", "cooking", "food", "meal ideas", "recipe finder", "tasty recipes"],
  authors: [{ name: "Tasty Bites" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1">{children}</div>
              <div>Footer</div>
            </div>

        </ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A simple bank app",
  description: "A simple app that utalizes formik, postgreSQL, Next.JS to modify for submissions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
       
      <body className={inter.className + " bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 h-screen w-full animate-gradient-x"}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
          </ThemeProvider></body>
    </html>
  );
}

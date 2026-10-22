import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot Form Builder | Create Conversational Forms & Embed Anywhere",
  description:
    "Transform traditional forms into engaging conversational chat experiences. Embed widgets on any website, collect responses, and analyze submissions effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}

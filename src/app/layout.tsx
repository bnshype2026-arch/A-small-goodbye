import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import BGMPlayer from "@/components/BGMPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Small Goodbye",
  description: "Before I leave today, I left something for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <AmbientBackground />
        <BGMPlayer />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감",
  description: "나만의 포켓몬 도감",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="w-full h-14 bg-slate-700 flex justify-center items-center">
          <h1 className="font-bold text-white">나만의 포켓몬 도감</h1>
        </header>
        {children}
      </body>
    </html>
  );
}

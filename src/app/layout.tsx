import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <header className="w-full h-14 bg-slate-700 flex justify-between items-center px-20">
          <nav className="w-full flex justify-between items-center px-20">
            <Link href="/">
              <h1 className="font-bold text-white">나만의 포켓몬 도감</h1>
            </Link>
            <Link href="login">
              <button className="font-bold text-white">로그인</button>
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

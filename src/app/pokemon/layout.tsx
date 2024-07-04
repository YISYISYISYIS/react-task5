import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포켓몬 메타데이터 테스트22222",
  description: "나만의 포켓몬 도감22테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/themes.css";
import { Container, Header, Main, Footer } from "@ui-library";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import SessionRefresher from "@/components/session/SessionRefresh";
import { hasRefreshToken } from "@/utils/auth/hasRefreshToken";
import {
  getSubdomainInfo,
  getSubdomainThemeClass,
} from "@/utils/hooks/useSubdomain";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameCore",
  description: "게임 코어 - 개발 테스트 단계 입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const hasRefresh = await hasRefreshToken();
  const { subdomain } = await getSubdomainInfo();
  const themeClass = getSubdomainThemeClass(subdomain);

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${themeClass} antialiased themed-container`}
      >
        <Container>
          <SessionRefresher user={user} hasRefreshToken={hasRefresh} />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}

"use client";

import { Poppins } from "next/font/google";
import "./globals.scss";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/webp" href="/secil.webp" />
        <title>Serdar GÖLELİ ~ SECİL STORE Koleksiyon Yönetimi</title>
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

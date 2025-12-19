import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutContent from "./components/LayoutContent";
import { GoogleMapsProvider } from "./components/GoogleMapsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amthal - EV Intelligence System for Global EV Charger Location Analytics",
  description: "AI-powered planning platform for electric vehicle charging infrastructure globally",
  icons: {
    icon: '/branding/logo.svg',
  },
};

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
        <GoogleMapsProvider>
          <LayoutContent>{children}</LayoutContent>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}

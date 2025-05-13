import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./global.css";

const geistSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The First WhatsApp Hackathon | Apply",
  description:
    "Join the first in-person event focused on building on the most popular messaging platform. June 7th, 2025, Buenos Aires, Argentina.",
  keywords: [
    "hackathon",
    "WhatsApp",
    "API",
    "Argentina",
    "CABA",
    "developers",
    "prizes",
    "event",
    "2025",
    "team",
    "coding",
    "innovation",
    "messaging",
  ],
  authors: [{ name: "Hack The Chat Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "The First WhatsApp Hackathon | Apply",
    description:
    "Join the first in-person event for building on the most popular chat platform.",
    url: "https://www.hackthe.chat/",
    siteName: "The First WhatsApp Hackathon",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The First WhatsApp Hackathon | Apply",
    description:
    "Join the first in-person event focused on building on the most popular messaging platform. June 7th, 2025, Buenos Aires, Argentina.",
    images: ["/og-image.png"],
    creator: "@HackTheChat",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

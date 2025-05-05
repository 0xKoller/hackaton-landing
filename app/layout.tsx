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
  title: "WhatsApp AI Hackathon | Build AI Agents for 2+ Billion Users",
  description:
    "Join the WhatsApp AI Hackathon! Build AI agents using LLMs and WhatsApp's Business API. Form teams, win prizes, and reach 2+ billion users. June 7th, 2025, CABA.",
  keywords: [
    "hackathon",
    "AI",
    "WhatsApp",
    "LLM",
    "API",
    "Argentina",
    "CABA",
    "machine learning",
    "developers",
    "prizes",
    "event",
    "2025",
    "team",
    "coding",
    "innovation",
  ],
  authors: [{ name: "WhatsApp Hackathon Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "WhatsApp AI Hackathon | Build AI Agents for 2+ Billion Users",
    description:
      "Join the WhatsApp AI Hackathon! Build AI agents using LLMs and WhatsApp's Business API. Form teams, win prizes, and reach 2+ billion users. June 7th, 2025, CABA.",
    url: "https://www.hackthe.chat/",
    siteName: "WhatsApp AI Hackathon",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp AI Hackathon | Build AI Agents for 2+ Billion Users",
    description:
      "Join the WhatsApp AI Hackathon! Build AI agents using LLMs and WhatsApp's Business API. Form teams, win prizes, and reach 2+ billion users. June 7th, 2025, CABA.",
    images: ["/og-image.png"],
    creator: "@0xkoller",
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

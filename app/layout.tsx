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
  title: "The First WhatsApp Hackathon | Build for 3+ Billion Users",
  description:
    "Join the first WhatsApp Hackathon! An event focused on building innovative solutions for the WhatsApp platform. June 7th, 2025, Buenos Aires, Argentina.",
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
  authors: [{ name: "WhatsApp Hackathon Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "The First WhatsApp Hackathon | Build for the World's #1 Chat App",
    description:
      "Join the first ever WhatsApp Hackathon! Innovate on the WhatsApp platform and reach over 3 billion users. June 7th, 2025, Buenos Aires.",
    url: "https://www.hackthe.chat/",
    siteName: "The First WhatsApp Hackathon",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The First WhatsApp Hackathon | Innovate on WhatsApp",
    description:
      "Be part of the first WhatsApp Hackathon! Create solutions for 3+ billion users. June 7th, 2025, Buenos Aires.",
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

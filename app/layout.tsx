import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anthimewillmann.vercel.app"),
  title: {
    default: "Anthime Willmann — Portfolio",
    template: "%s | Anthime Willmann",
  },
  description:
    "Portfolio of Anthime Willmann, a Computer Science student at CAU Kiel.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Anthime Willmann",
    title: "Anthime Willmann — Portfolio",
    description:
      "Portfolio of Anthime Willmann, a Computer Science student at CAU Kiel.",
  },
  twitter: {
    card: "summary",
    title: "Anthime Willmann — Portfolio",
    description:
      "Portfolio of Anthime Willmann, a Computer Science student at CAU Kiel.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
      </html>
  );
}

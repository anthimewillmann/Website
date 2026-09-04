import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anthimewillmann.vercel.app"),
  applicationName: "Anthime Willmann",
  title: {
    default: "Anthime Willmann",
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
    title: "Anthime Willmann",
    description:
      "Portfolio of Anthime Willmann, a Computer Science student at CAU Kiel.",
  },
  twitter: {
    card: "summary",
    title: "Anthime Willmann",
    description:
      "Portfolio of Anthime Willmann, a Computer Science student at CAU Kiel.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "qDwsEsjVYuNUvGk9ahQBCqLFQN1-_M3q7m3_QL6FWeg",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={GeistSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Anthime Willmann",
              url: "https://anthimewillmann.vercel.app/",
            }),
          }}
        />
      </head>
      <body>{children}</body>
      </html>
  );
}

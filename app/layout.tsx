import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  weight: ['100', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devonshirerecruitment.com'),
  title: "Devonshire Recruiting & Consulting Partners | Hiring Made Simple.",
  description:
    "Devonshire is a leading recruitment and consulting firm headquartered in Boston, Massachusetts with a global placement footprint.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/wp-content/uploads/2022/06/cropped-devonshire-header-logo-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/wp-content/uploads/2022/06/devonshire-header-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Devonshire Recruiting & Consulting Partners | Hiring Made Simple.",
    description: "Devonshire is a leading recruitment and consulting firm headquartered in Boston, Massachusetts with a global placement footprint.",
    url: "https://devonshirerecruitment.com",
    siteName: "Devonshire Recruiting",
    images: [
      {
        url: "/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg",
        width: 1200,
        height: 630,
        alt: "Devonshire Recruiting - Professional Recruitment Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devonshire Recruiting & Consulting Partners | Hiring Made Simple.",
    description: "Devonshire is a leading recruitment and consulting firm headquartered in Boston, Massachusetts with a global placement footprint.",
    images: ["/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${lato.variable}`}>
      <body className={lato.className}>{children}</body>
    </html>
  );
}

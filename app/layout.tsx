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
  title: "Devonshire Recruiting & Consulting Partners | Hiring Made Simple.",
  description:
    "Devonshire is a leading recruitment and consulting firm headquartered in Boston, Massachusetts with a global placement footprint.",
  icons: {
    icon: "/wp-content/uploads/2022/06/cropped-devonshire-header-logo-32x32.png",
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

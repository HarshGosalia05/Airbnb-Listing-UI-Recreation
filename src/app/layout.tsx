import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cereal = localFont({
  src: "./fonts/AirbnbCerealVF.woff2",
  variable: "--font-cereal",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Serviced apartments for Rent in Candolim, Goa, India - Airbnb",
  description:
    "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Entire serviced apartment in Candolim, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cereal.variable}>
      <body>{children}</body>
    </html>
  );
}

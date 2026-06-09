import { Titan_One, Nunito } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const titanOne = Titan_One({
  weight: "400",
  variable: "--font-titan-one",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thorstore Art",
  description:
    "Prints, Stickers, Comic, Merchandise and more from Thoriso Mokhethi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titanOne.variable} ${nunito.variable}`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

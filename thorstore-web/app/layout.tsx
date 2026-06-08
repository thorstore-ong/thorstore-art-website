import { Titan_One, Nunito } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

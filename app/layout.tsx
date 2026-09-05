import type { Metadata } from "next";
import { Instrument_Serif, Lora } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gufa.Labs — Film Stock Portfolio",
  description: "A visual catalogue of film stocks and their character.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

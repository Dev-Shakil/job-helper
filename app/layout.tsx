import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost } from "next/font/google";
import "./globals.css";





const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobs Portal",
  description: "Modern job portal platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable}   font-jost antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Ben Yahmed | Functional Analyst & Product Builder",
  description:
    "Portfolio of Mohamed Ben Yahmed — Functional Analyst, System Analyst and Product Builder.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

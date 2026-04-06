import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signatur Generator – ERATEC-GERMANY GmbH",
  description: "Erstelle deine persönliche E-Mail-Signatur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

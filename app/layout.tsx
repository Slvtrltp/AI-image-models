import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Food Tools",
  description:
    "Analyze food images, identify ingredients, create food images, and chat with an AI food assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
      </body>
    </html>
  );
}

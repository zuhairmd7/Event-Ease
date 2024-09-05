//app\layout.tsx

import "./globals.css";
import { ReactNode } from 'react';
import AuthButton from "@/components/AuthButton";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import NavBar from "@/components/NavBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  /* title: "EventEase | Dashboard", */
  description: "My EventEase Project Dashboard",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (

    <html lang="en">
      <head>
        <title>EventEase</title>
      </head>
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>

  );
}

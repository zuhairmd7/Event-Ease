import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from 'next/link';
import { ReactNode } from 'react';
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import DeployButton from "../components/DeployButton";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"; 

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}; 

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
    const canInitSupabaseClient = () => {
      // This function is just for the interactive tutorial.
      // Feel free to remove it once you have Supabase connected.
      try {
        createClient();
        return true;
      } catch (e) {
        return false;
      }
    };
    
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en">
      <head>
        <title>EventEase</title>
      </head>
      <body>
        <div>
          <nav className="bg-gray-300 p-4 flex justify-around text-center items-center">
            <ul className="flex space-x-4">
              <li>
                <Link href="/event-details" className="text-black font-bold">Event Details</Link>
              </li>
              <li>
                <Link href="/registration" className="text-black font-bold">Registration</Link>
              </li>
              <li>
                <Link href="/protected" className="text-black font-bold">Admin Panel</Link>
              </li>
            </ul>
            <div className="text-white">
            {isSupabaseConnected && <AuthButton />}
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

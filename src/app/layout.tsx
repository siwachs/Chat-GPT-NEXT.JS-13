import React from "react";
import Login from "@/components/Login";
import SessionProvider from "@/components/SessionProvider";
import Sidebar from "@/components/SideBar";
import ClientProvider from "@/components/ClientProvider";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "ChatGPT",
  description: "Chat GPT Clone",
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {session ? (
            <div className="flex">
              <div className="bg-[#202123] max-w-[16rem] h-screen overflow-y-auto md:min-w-[16rem]">
                <Sidebar />
              </div>
              <ClientProvider />
              <div className="bg-[#343541] flex-1 h-screen overflow-y-auto">
                {children}
              </div>
            </div>
          ) : (
            <Login />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;

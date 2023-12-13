import React from "react";
import Sidebar from "../../components/SideBar";

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

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;

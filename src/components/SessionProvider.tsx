"use client";

import React from "react";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps): React.JSX.Element {
  return <Provider session={session}>{children}</Provider>;
}

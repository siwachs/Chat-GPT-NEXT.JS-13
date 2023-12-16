"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ClientProvider(): React.JSX.Element {
  return <Toaster position="top-right" />;
}

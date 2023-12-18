"use client";

import React from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";

const Login = (): React.JSX.Element => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        priority={true}
        src="/logo.png"
        alt="logo"
        sizes="100vw"
        width={300}
        height={300}
        quality={100}
        className="w-[300px] h-[300px] object-cover"
      />
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;

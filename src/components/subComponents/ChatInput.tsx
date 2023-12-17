"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { Message } from "../../../typings";

type ChatProps = {
  readonly chatId: string;
};

function ChatInput({ chatId }: ChatProps) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = prompt.trim();
    if (!input) return;
    const message: Message = {
      text: input,
      user: {
        _id: session.user.email!,
        name: session.user.name!,
        avatar:
          session.user.image! ||
          `https://ui-avatars.com/api/?name=${session.user.name}`,
      },
      createdAt: serverTimestamp(),
    };
    await addDoc(
      collection(db, "users", session.user.email!, "chats", chatId, "messages"),
      message
    );
    const notification = toast.loading("ChatGPT is loading...");

    await fetch("/api/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model: "davinci",
        session,
      }),
    }).then((res) => {
      toast.success("Loading Success!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          type="text"
          placeholder="Message ChatGPT..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div>{/* Model Selection */}</div>
    </div>
  );
}

export default ChatInput;

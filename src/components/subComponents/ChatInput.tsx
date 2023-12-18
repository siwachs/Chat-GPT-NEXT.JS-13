"use client";

import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

import { Message } from "../../../typings";

type ChatProps = {
  readonly chatId: string;
};

function ChatInput({ chatId }: ChatProps) {
  const { data: session } = useSession();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [prompt]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const input = prompt.trim();
    if (!input) return;
    setPrompt("");
    setLoading(true);
    const message: Message = {
      text: input,
      user: {
        _id: session.user.email,
        name: session.user.name,
        avatar:
          session.user.image ||
          `https://ui-avatars.com/api/?name=${session.user.name}`,
      },
      createdAt: serverTimestamp(),
    };

    await addDoc(
      collection(db, "users", session.user.email, "chats", chatId, "messages"),
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
        model: model,
        session,
      }),
    })
      .then((res) => {
        toast.success("Loading Success!", {
          id: notification,
        });
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <textarea
          ref={textareaRef}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Message ChatGPT..."
        />

        <button
          disabled={!prompt.trim()}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;

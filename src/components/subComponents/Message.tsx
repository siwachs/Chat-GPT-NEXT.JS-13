import React from "react";
import { Message } from "../../../typings";

type MessageProps = {
  message: Message;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div
      className={`py-5 text-white ${isChatGPT && "bg-[#434654] rounded-lg"}`}
    >
      <div className="flex space-x-5 max-w-2xl mx-auto">
        <img
          src={message.user.avatar}
          alt={message.user.name}
          className="h-8 w-8 rounded-full"
        />
        <p className="pt-1 text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;

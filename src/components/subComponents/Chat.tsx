import React from "react";

type ChatProps = {
  readonly chatId: string;
};

function Chat({ chatId }: ChatProps) {
  return <div className="flex-1">Chat</div>;
}

export default Chat;

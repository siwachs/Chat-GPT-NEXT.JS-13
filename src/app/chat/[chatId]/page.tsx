import React from "react";
import Chat from "@/components/subComponents/Chat";
import ChatInput from "@/components/subComponents/ChatInput";

function ChatPage(): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat />
      <ChatInput />
    </div>
  );
}

export default ChatPage;

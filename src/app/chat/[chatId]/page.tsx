import React from "react";
import Chat from "@/components/subComponents/Chat";
import ChatInput from "@/components/subComponents/ChatInput";

type ChatPageProps = {
  readonly params: {
    chatId: string;
  };
};

function ChatPage({ params: { chatId } }: ChatPageProps): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  );
}

export default ChatPage;

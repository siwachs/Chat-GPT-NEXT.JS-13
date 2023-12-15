import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";

import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

type ChatRowProps = {
  readonly id: string;
};

function ChatRow({ id }: ChatRowProps): React.JSX.Element {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [messages, loading, error] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="hidden md:inline-flex flex-1 truncate">
        {messages && messages.docs && messages.docs.length > 0
          ? messages.docs[messages.docs.length - 1].data().text || "New Chat"
          : "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
}

export default ChatRow;

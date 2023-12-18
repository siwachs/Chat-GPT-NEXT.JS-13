import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

const NewChat = (): React.JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = () => {
    addDoc(collection(db, "users", session.user.email, "chats"), {
      userId: session.user.email,
      createdAt: serverTimestamp(),
    })
      .then((doc) => {
        router.push(`/chat/${doc.id}`);
      })
      .catch((error) => {});
  };

  return (
    <div
      onKeyDown={(event) => {}}
      onClick={createNewChat}
      className="border-gray-700 border chatRow"
      tabIndex={0}
    >
      <PlusIcon className="h-4 w-4" />
      <p className="select-none">New Chat</p>
    </div>
  );
};

export default NewChat;

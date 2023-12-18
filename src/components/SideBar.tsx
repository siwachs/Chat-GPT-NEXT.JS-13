"use client";

import React from "react";
import NewChat from "./subComponents/NewChat";
import ChatRow from "./subComponents/ChatRow";
import ModelSelection from "./subComponents/ModelSelection";

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const Sidebar = (): React.JSX.Element => {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user.email, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <NewChat />
      <div className="hidden sm:inline">
        <ModelSelection />
      </div>

      <div className="flex-1 overflow-y-auto my-2">
        <div className="flex flex-col space-y-2">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}

          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <img
          onKeyDown={(event) => {}}
          onClick={() => signOut({ callbackUrl: "/" })}
          src={session.user.image}
          alt="profile"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          tabIndex={0}
        />
      )}
    </div>
  );
};

export default Sidebar;

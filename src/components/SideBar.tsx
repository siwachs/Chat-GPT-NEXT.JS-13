import React from "react";

import { PlusIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div>{/* Model selection */}</div>

          {/* Map through chat array */}
        </div>
      </div>
    </div>
  );
};

const NewChat = () => {
  return (
    <div className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
};

export default Sidebar;

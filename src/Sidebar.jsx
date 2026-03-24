import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Sidebar({setOpen}) {
  const [chats] = useState([
    "Chat 1",
    "Chat 2",
    "Chat 3",
    "Chat 4",
    "Chat 5",
    "Chat 6",
    "Chat 7nsdjkfjksfdnksdnfknsdkfnksnfjknsdkjfnkjsnfnssknfjksnfknskdjn",
    "Chat 8",
    "Chat 9",
    "Chat 10",
    "Chat 11",
    "Chat 12",
    "Chat 13",
    "Chat 14",
    "Chat 15",
  ]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white p-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <button className="font-bold cursor-pointer">
            Sigma<span className="text-red-700">GPT</span>
          </button>

          <button className="hover:bg-gray-700 p-1 rounded cursor-pointer hidden md:block">
            <FiEdit />
          </button>

          <button
            className="md:hidden hover:bg-gray-700 p-1 rounded"
            onClick={() => setOpen(false)}
          >
            <RxCross2 />
          </button>
        </div>

        <button className="flex gap-2 pt-3 items-center rounded cursor-pointer text-xs">
          <span>
            <FiEdit />
          </span>
          New Chat
        </button>
      </div>

      <h4 className="text-gray-400 text-xs mt-4">Your Chats</h4>
      <div className="flex-1 overflow-auto scrollbar-hide">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="p-1 flex group justify-between items-center rounded hover:bg-gray-700 cursor-pointer text-sm"
          >
            <span className="truncate w-[85%]">{chat}</span>
            <RiDeleteBin6Line className="hidden group-hover:block" />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-3 mt-3 text-center font-medium">
        <span className="font-bold">
          Sigma<span className="text-red-700">GPT</span>
        </span>
      </div>
    </div>
  );
}

export default Sidebar;

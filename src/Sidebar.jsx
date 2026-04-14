import { useContext, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MyContext } from "./MyContext";
import axios from "axios";
import { serverURL } from "./App";
import { v1 as uuidv1 } from "uuid";

function Sidebar({ setOpen }) {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  async function getAllThreads() {
    try {
      const res = await axios.get(`${serverURL}/thread`);
      const filteredData = res.data?.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  function handleNewChat() {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  async function changeThread(threadId) {
    setCurrThreadId(threadId);
    try {
      const res = await axios.get(`${serverURL}/thread/${threadId}`);
      setPrevChats(res.data);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(threadId) {
    const res = await axios.delete(`${serverURL}/thread/${threadId}`)
    setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))

    if(threadId === currThreadId) {
      handleNewChat()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white p-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <button className="font-bold cursor-pointer">
            Sigma<span className="text-red-700">GPT</span>
          </button>

          <button
            className="hover:bg-gray-700 p-1 rounded cursor-pointer hidden md:block"
            onClick={handleNewChat}
          >
            <FiEdit />
          </button>

          <button
            className="md:hidden hover:bg-gray-700 p-1 rounded"
            onClick={() => setOpen(false)}
          >
            <RxCross2 />
          </button>
        </div>

        <button
          className="flex gap-2 pt-3 items-center rounded cursor-pointer text-xs"
          onClick={handleNewChat}
        >
          <span>
            <FiEdit />
          </span>
          New Chat
        </button>
      </div>

      <h4 className="text-gray-400 text-xs mt-4">Your Chats</h4>
      <div className="flex-1 overflow-auto scrollbar-hide">
        {allThreads.map((thread) => (
          <div
            key={thread.threadId}
            className="p-1 flex group justify-between items-center rounded hover:bg-gray-700 cursor-pointer text-sm"
            onClick={(e) => changeThread(thread.threadId)}
          >
            <span className="truncate w-[85%]">{thread.title}</span>
            <RiDeleteBin6Line
              className="hidden group-hover:block hover:text-red-900"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(thread.threadId);
              }}
            />
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

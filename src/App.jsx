import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

// export const serverURL = "http://localhost:8080/api";
export const serverURL = "https://sigmagpt-backend-6si0.onrender.com/api";

function App() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // displaying the all messages in this array.
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  console.log(prevChats);

  return (
    <MyContext.Provider value={providerValues}>
      <div className="w-full flex h-screen">
        <div
          className={`bg-gray-900 h-screen fixed md:static z-50 
        w-[70%] md:w-[20%] transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <Sidebar setOpen={setOpen} />
        </div>

        <div className="w-full md:w-[80%] bg-gray-800">
          <ChatWindow setOpen={setOpen} />
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;

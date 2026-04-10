import { BsFillSendFill } from "react-icons/bs";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import Chat from "./Chat";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";
import { serverURL } from "./App";
import { ScaleLoader } from "react-spinners";

export default function ChatWindow({ setOpen }) {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);

  const [loader, setLoader] = useState(false);

  async function getReply() {
    setLoader(true);
    try {
      const result = await axios.post(`${serverURL}/chat`, {
        threadId: currThreadId,
        message: prompt,
      });
      console.log(result.data)
      setReply(result.data?.reply);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  }

  useEffect(() => {
    if (reply && prompt) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistent", content: reply },
      ]);
    }

    setPrompt("")
  }, [reply]);

  return (
    <div className="text-white w-full h-screen p-4 flex flex-col">
      <div className="flex items-center p-2 mb-1 font-semibold border-b border-gray-600">
        <BsLayoutSidebarReverse
          className="font-bold md:hidden me-3"
          onClick={() => setOpen(true)}
        />
        Sigma<span className="font-bold text-red-700">GPT</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col justify-between">
        <Chat />
        {loader && (
          <div className="flex justify-center items-center mb-4">
            <ScaleLoader color="#fff" />
          </div>
        )}

        <div className="w-full px-15 mt-2 flex flex-col justify-between">
          <div className="bg-gray-600 flex justify-between items-center w-full p-2 rounded-xl ps-3">
            <input
              type="text"
              className="w-[90%] border-none text-sm outline-0"
              placeholder="Ask anything."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
            />
            <button
              className="text-black p-2 bg-white rounded-full text-center cursor-pointer"
              onClick={getReply} disabled={loader}
            >
              <BsFillSendFill />
            </button>
          </div>
          <p className="text-xs text-center">SigmaGPT can make mistakes.</p>
        </div>
      </div>
    </div>
  );
}

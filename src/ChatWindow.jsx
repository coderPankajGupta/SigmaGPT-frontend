import { BsFillSendFill } from "react-icons/bs";
import { BsLayoutSidebarReverse } from "react-icons/bs";

function ChatWindow({ setOpen }) {
  return (
    <div className="text-white w-full h-screen p-4 flex flex-col justify-between">
      <div className="flex items-center p-2 mb-1 font-semibold border-b border-gray-600">
        <BsLayoutSidebarReverse
          className="font-bold md:hidden me-3"
          onClick={() => setOpen(true)}
        />
        Sigma<span className="font-bold text-red-700">GPT</span>
      </div>

      <div className="w-full px-15">
        <div className="bg-gray-600 flex justify-between items-center w-full p-2 rounded-xl ps-3">
          <input
            type="text"
            className="w-[90%] border-none text-sm outline-0"
            placeholder="Ask anything..."
          />
          <button className="text-black p-2 bg-white rounded-full text-center cursor-pointer">
            <BsFillSendFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;

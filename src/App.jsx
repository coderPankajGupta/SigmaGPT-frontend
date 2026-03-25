import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow.jsx";

function App() {
  const [open, setOpen] = useState(false);

  return (
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
  );
}

export default App;
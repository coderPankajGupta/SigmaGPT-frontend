import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, reply, prevChats, setPrevChats } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(" ");

    let idx = 0;
    const intervel = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) clearInterval(intervel);
    }, 40);
    return () => clearInterval(intervel);
  }, [reply, prevChats]);

  return (
    <div className="px-15 pb-10 flex-1 overflow-auto scrollbar-hide">
      {newChat && (
        <div className="flex h-full font-bold text-xl items-center justify-center">
          <h1>Start a new chat.</h1>
        </div>
      )}

      {prevChats?.messages?.slice(0, -1).map((chat, idx) => (
        <div className="flex flex-col w-full text-[14px]" key={idx}>
          {chat.role === "user" ? (
            <div className="w-full mb-2 flex justify-end">
              <p className="text-white bg-gray-500 px-3 py-2 rounded-xl max-w-[60%]">
                {chat.content}
              </p>
            </div>
          ) : (
            <div className="w-full">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
      {prevChats.length > 0 && latestReply !== null && (
        <div key={"typing"}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {latestReply}
          </ReactMarkdown>
        </div>
      )}

      {prevChats?.messages?.length > 0 && latestReply === null && (
        <div key={"non-typing"}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {prevChats.messages[prevChats.messages.length-1]?.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

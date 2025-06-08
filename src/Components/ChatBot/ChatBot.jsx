/*eslint-disable*/
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import chatbotAnimation from "../../assets/ChatBot/22A1aYEmDR.json";
import User from "../../assets/category/user.png";
import Chat from "../../assets/category/chat.png";
import { FaXmark } from "react-icons/fa6";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you?" },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg = { from: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      const userToken = localStorage.getItem("userToken");

      const { data } = await axios.post(
        "https://drugkit.runasp.net/api/Chat/start",
        JSON.stringify(userInput),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(data);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: (
            <>
              <div>{data.message || "🤖 (No message provided)"}</div>
              <div>{data.advice || "No advice available"}</div>
            </>
          ),
        },
      ]);
    } catch (err) {
      console.error("❌ Error from server:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `❌${err.response?.data || err.message}`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-end gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[var(--primary-color)] p-2 rounded-full shadow-lg hover:scale-105 hover:cursor-pointer transition duration-300"
      >
        <Lottie
          animationData={chatbotAnimation}
          loop={true}
          className="w-12 h-12"
        />
      </button>

      {open && (
        <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-4 w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button className="cursor-pointer" onClick={() => setOpen(false)}>
              <FaXmark className="text-white bg-red-500 rounded p-1 text-xl" />
            </button>
          </div>

          <div className="flex-1 overflow-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-1 ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "bot" && (
                  <img src={Chat} alt="bot" className="w-8 h-8 rounded-full" />
                )}

                <div
                  className={`text-sm px-4 py-2 rounded-2xl max-w-[80%] break-words ${
                    msg.from === "user"
                      ? "bg-[#ebebeb] text-black self-end rounded-br-none"
                      : "bg-[#0c1467] text-white self-start rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.from === "user" && (
                  <img src={User} alt="user" className="w-8 h-8 rounded-full" />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="text-sm italic text-gray-500 flex items-center">
                <img src={Chat} alt="bot" className="w-8 h-8 rounded-full" />
                Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="mt-2 flex">
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l px-2 py-1 text-sm outline-0"
            />
            <button
              onClick={sendMessage}
              className="bg-[var(--primary-color)] cursor-pointer text-white px-3 rounded-r text-sm "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

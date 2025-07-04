import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaComments } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage = { text: data.reply, sender: "bot", link: data.link };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
        onClick={toggleChat}
      >
        <FaComments size={24} />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border border-gray-300">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
            <h3 className="text-lg">CitizenAid Chat</h3>
            <FaTimes size={20} className="cursor-pointer" onClick={toggleChat} />
          </div>

          {/* Chat Messages */}
          <div className="h-60 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-gray-300 text-black self-start text-left"
                }`}
              >
                {msg.text}
                {msg.link && (
                  <a
                    href={msg.link}
                    className="text-blue-700 underline ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r-lg"
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

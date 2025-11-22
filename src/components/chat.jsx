import React, { useState, useRef } from "react";

export default function SatyaNurseryChat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks! We will get back shortly 🌱" }
      ]);
    }, 700);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: `Uploaded: ${file.name}` }
    ]);
  };

  const handleScan = () => {
    alert("Camera scanning feature coming soon!");
  };

  return (
    <div className="chat-container">

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <div className="send-icon" onClick={sendMessage}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
          </svg>
        </div>
      </div>

      <div className="chat-bottom-actions">
        <button onClick={handleScan}>Scan</button>

        <button onClick={() => fileInputRef.current.click()}>
          Upload
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <style>{`
        .chat-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #eef2ef;
        }

        .chat-bubble {
          max-width: 75%;
          padding: 10px 14px;
          margin-bottom: 10px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .chat-bubble.user {
          background: #478348ff;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 0;
        }

        .chat-bubble.bot {
          background: #e0e0e0;
          color: #333;
          margin-right: auto;
          border-bottom-left-radius: 0;
        }

        .chat-input-area {
          display: flex;
          align-items: center;
          padding: 10px;
          background: #fff;
          border-top: 1px solid #ddd;
        }

        .chat-input-area input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          font-size: 0.95rem;
        }

        .send-icon {
          margin-left: 10px;
          background: #1f6220ff;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s ease;
        }

        .send-icon:hover {
          transform: scale(1.12);
          background: #1f6220ff;
        }

        .chat-bottom-actions {
          padding: 12px;
          background: #fff;
          display: flex;
          justify-content: space-evenly;
          border-top: 1px solid #ddd;
        }

        .chat-bottom-actions button {
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          background: #1f6220ff;
          color: white;
        }

        .chat-bottom-actions button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

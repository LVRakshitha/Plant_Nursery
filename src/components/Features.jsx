import React, { useState } from "react";
import Chat from "./chat"; // ✅ import Chat component

export default function Features() {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="features" style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        id="chatbot"
        className="feature-btn"
        onClick={() => setShowChat(!showChat)} // toggle chat view
      >
        💬 Chatbot
      </button>

      <button id="voice" className="feature-btn">
        🎙️ Voice Assistant
      </button>

      {/* Conditionally render Chat component */}
      {showChat && <Chat />}

      <style>
        {`
          .feature-btn {
            margin: 20px;
            padding: 15px 30px;
            font-size: 1.2rem;
            border-radius: 10px;
            border: none;
            background-color: #4caf50;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .feature-btn:hover {
            background-color: #45a049;
            transform: scale(1.05);
          }
        `}
      </style>
    </section>
  );
}

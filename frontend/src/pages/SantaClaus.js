import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./SantaClaus.css";  
import santaIcon from "../images/santa-icon.webp";

const SantaClaus = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [transcriptionEnabled, setTranscriptionEnabled] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      // Add user message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);

      // Send the user input to the backend
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, transcription_enabled: transcriptionEnabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      console.log(data);
      const geminiResponse = data.response;
      var audioUrl = data.audio_url;

      // Add the chatbot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: geminiResponse, sender: "santa" },
      ]);

      // If audio is available, play it
      if (audioUrl) {
        console.log("Audio URL from Backend:", audioUrl); // Should print something like "/audio/response_audio.mp3"
        const fullAudioUrl = `http://127.0.0.1:5000${audioUrl}?t=${new Date().getTime()}`; // Fix
        console.log("Constructed Full Audio URL:", fullAudioUrl); // Should print "http://127.0.0.1:5000/audio/response_audio.mp3"
        const audio = new Audio(fullAudioUrl);
        audio.play();
        audioUrl = null;
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="bg-snow h-screen flex flex-col">
      <h1 className="text-4xl text-center font-bold mb-6 pt-4">
        🎅 Talk to Santa Claus! 🎄
      </h1>

      {/* Voice Toggle Button in the Top Right */}
      <div className="voice-toggle absolute top-4 right-4">
        <label className="voice-toggle-label">
          Enable Voice
        </label>
        <div
          className={`voice-toggle-switch ${transcriptionEnabled ? "active" : ""}`}
          onClick={() => {
            setTranscriptionEnabled(!transcriptionEnabled);
            console.log("Transcription Enabled:", !transcriptionEnabled);
          }}
          
        ></div>
      </div>

      {/* Chat Window */}
      <div className="chat-window flex-grow bg-gray-200 p-4 rounded-lg shadow-lg overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "user" ? "bg-green-300 text-black self-end" : "bg-red-400 text-white self-start"
            }`}
          >
            {msg.sender === "santa" && (
              <img
                src={santaIcon}
                alt="Santa"
                className="santa-icon"
              />
            )}
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="chat-input flex items-center gap-4 p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message to Santa..."
          className="flex-grow p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-red-500"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>

      {/* Voice Toggle */}
      <div className="flex justify-end items-center p-4 bg-white border-t border-gray-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={transcriptionEnabled}
            onChange={() => setTranscriptionEnabled(!transcriptionEnabled)}
            className="w-5 h-5"
          />
          Enable Voice Responses
        </label>
      </div>
    </div>
  );
};

export default SantaClaus;

import React, { useState } from "react";
import { useWebSocket } from "../hooks/useSocket";
import { motion } from "framer-motion";
import { TextEditor } from "../components/TextEditor";

const GetDocument: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const [content, setContent] = useState<string | null>(null);

  const { socket } = useWebSocket();

  const handleCreateRoom = async () => {
    if (!roomId) {
      alert("Please enter a Room ID");
      return;
    }

    socket?.send(
      JSON.stringify({
        type: "get_content",
        roomId,
      })
    );

    socket!.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === "documentFound") {
        setContent(message.content);
      } else {
        alert("Room not found");
      }
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateRoom();
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-4" 
    onKeyDown={handleKeyDown}
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
      >
        Retrieve Your Document
      </motion.h1>

      {/* Form Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="roomId"
            className="block text-sm font-semibold mb-2 text-gray-300"
          >
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your room's ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-purple-400 transition-all"
        >
          Submit
        </motion.button>
        <input
          type="submit"
          style={{ display: "none" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateRoom();
            }
          }}
        />
      </motion.div>

      {/* Display Content */}
      {content && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">
            Document Content
          </h2>
          {/* <TextEditor value={content} onChange={() => {}} /> */}
          <TextEditor value={content} onChange={() => {}} />
        </motion.div>
      )}
    </div>
  );
};

export default GetDocument;

import React, { useState } from "react";
import { useWebSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext";
import { Spinner } from "../hooks/Spinner";
import { motion } from "framer-motion";

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [usersName, setUserName] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  const navigate = useNavigate();
  const { socket, isConnected } = useWebSocket();
  const { setUsers } = useUserContext();

  const handleCreateRoom = async () => {
    if (!roomName || !usersName || !documentTitle) {
      alert("Please fill all fields!");
      return;
    }

    socket?.send(
      JSON.stringify({
        type: "create_room",
        roomName,
        usersName,
        documentTitle,
      })
    );

    socket!.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "roomJoined") {
        setUsers(message.users);
        navigate(`/room/${roomName}/${message.roomId}/${documentTitle}`);
      }
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleCreateRoom();
    }
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-4"
      onKeyDown={handleKeyPress}
      tabIndex={0} // Enables focus for keydown event
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
      >
        Create Your Room
      </motion.h1>

      {/* Form */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Room Name */}
        <div className="mb-4">
          <label htmlFor="roomName" className="block text-sm font-semibold mb-2">
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your room's name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        {/* Document Title */}
        <div className="mb-4">
          <label htmlFor="documentTitle" className="block text-sm font-semibold mb-2">
            Document Title
          </label>
          <input
            type="text"
            id="documentTitle"
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your document's title"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={usersName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Create Room Button */}
        <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Create Room
        </motion.button>
      </motion.div>

      {/* Connection Spinner */}
      {!isConnected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;

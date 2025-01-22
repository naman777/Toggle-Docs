import React, { useState } from "react";
import { useWebSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/UserContext";
import { Spinner } from "../hooks/Spinner";
import { motion } from "framer-motion";

const JoinRoom: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const [usersName, setUserName] = useState("");

  const navigate = useNavigate();
  const { socket, isConnected } = useWebSocket();
  const { setUsers } = useUserContext();

  const handleCreateRoom = async () => {
    if (!roomId || !usersName) {
      alert("Please fill all fields!");
      return;
    }

    socket?.send(
      JSON.stringify({
        type: "join_room",
        roomId,
        usersName,
      })
    );

    socket!.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === "roomJoined") {
        setUsers(message.users);
        navigate(`/room/${message.roomName}/${message.roomId}/${message.documentTitle}`);
      }
    };
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        Join a Room
      </motion.h1>

      {/* Form */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Room ID */}
        <div className="mb-4">
          <label htmlFor="roomId" className="block text-sm font-semibold mb-2">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Enter your room's ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
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
            className="w-full px-4 py-2 text-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
            value={usersName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Join Room Button */}
        <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-green-400 transition-all"
        >
          Join Room
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

export default JoinRoom;

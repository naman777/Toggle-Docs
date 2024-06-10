import React, { useState } from 'react';
import {  useWebSocket } from '../hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';


const JoinRoom: React.FC = () => {
    const [roomId, setRoomId] = useState('');
    const [usersName, setUserName] = useState('');
    
    
    const navigate = useNavigate();
    const socket = useWebSocket();

    const {setUsers} = useUserContext();

    const handleCreateRoom = async () => {
        socket?.send(JSON.stringify({
            type:"join_room",
            roomId:roomId,
            usersName:usersName
        }));

        socket!.onmessage  = (event) => {
            const message = JSON.parse(event.data)
            console.log(message);
            if (message.type === "roomJoined") {
                setUsers(message.users);
                navigate(`/room/${message.roomName}/${message.roomId}/${message.documentTitle}`);
            }
        }

    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
            <h1 className="text-3xl font-bold mb-2  text-white">Create your room</h1>
            <div className="bg-white p-16 rounded-lg shadow-lg ">
                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Room's Id</label>
                    <input
                        type="text"
                        id="roomName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your room's id"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="userName" className="block text-black font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="userName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        value={usersName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                    onClick={handleCreateRoom}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default JoinRoom;

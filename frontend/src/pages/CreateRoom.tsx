import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';
import { Spinner } from '../hooks/Spinner';

const CreateRoom: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const [usersName, setUserName] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');

    const navigate = useNavigate();
    const { socket, isConnected } = useWebSocket();

    const { setUsers } = useUserContext();

    const handleCreateRoom = async () => {
        socket?.send(JSON.stringify({
            type: 'create_room',
            roomName,
            usersName,
            documentTitle,
        }));

        socket!.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'roomJoined') {
                setUsers(message.users);
                navigate(`/room/${roomName}/${message.roomId}/${documentTitle}`);
            }
        };
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-2 text-white">Create your room</h1>
            <div className="bg-white p-16 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Room's Name</label>
                    <input
                        type="text"
                        id="roomName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your room's name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Doc's Title</label>
                    <input
                        type="text"
                        id="Docs"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your doc's title"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
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
                    Create Room
                </button>
            </div>

            {!isConnected && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spinner />
    </div>)}
        </div>
    );
};

export default CreateRoom;

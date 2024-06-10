import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useSocket';
import { TextEditor } from './Room';

const GetDocument: React.FC = () => {
    const [roomId, setRoomId] = useState('');
    const [content, setContent] = useState<string | null>(null);

    const socket = useWebSocket();

    const handleCreateRoom = async () => {
        socket?.send(JSON.stringify({
            type: "get_content",
            roomId: roomId,
        }));

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

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
            <h1 className="text-3xl font-bold mb-2 text-white">Create your room</h1>
            <div className="bg-white p-16 rounded-lg shadow-lg">
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

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                    onClick={handleCreateRoom}
                >
                    Submit
                </button>
            </div>

            
            {content && (
                <div className="mt-8 bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl h-full">
                    <TextEditor value={content} onChange={() => {}} />
                </div>
            )}
        </div>
    );
};

export default GetDocument;

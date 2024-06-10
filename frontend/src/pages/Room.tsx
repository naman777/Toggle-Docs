import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useSocket';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../components/SideBar';
import Topbar from '../components/Topbar';
import { useUserContext } from '../hooks/UserContext';

const Room: React.FC = () => {
    const { roomName, roomId, documentTitle } = useParams<{ roomName: string, roomId: string, documentTitle: string }>();
    const socket = useWebSocket();
    const [content, setContent] = useState('');
    const { users, setUsers } = useUserContext();

    useEffect(() => {
        if (socket) {
            socket.send(JSON.stringify({
                type: 'add_content',
                roomId,
                content: content
            }));

            const handleSocketMessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                if (message.type === 'documentSaved' && message.content !== content) {
                    setContent(message.content);
                }
                if (message.type === 'updateUsers') {
                    setUsers(message.users);
                }
                if (message.type === 'documentEdited' && message.content !== content) {
                    setContent(message.content);
                }
            };

            socket.onmessage = handleSocketMessage;

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };

            return () => {
                socket.onmessage = null;
                socket.onclose = null;
            };
        }
    }, [socket, roomId, setUsers, content]);


    

    return (
        <div className="h-screen flex flex-col">
            <div>
                <Topbar roomName={roomName!} docName={documentTitle!} content={content} />
            </div>
            <div className="flex flex-1">
                <div className="flex-1 bg-gray-100 p-4">
                    <ReactQuill theme="snow" value={content} onChange={(newContent) => setContent(newContent)} />
                </div>
                <div className="w-64 bg-gray-200 p-4">
                    <Sidebar usersName={users} />
                </div>
            </div>
        </div>
    );
};

export default Room;

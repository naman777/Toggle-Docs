import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useSocket';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../components/SideBar';
import Topbar from '../components/Topbar';
import { useUserContext } from '../hooks/UserContext';
import { useDebounce } from '../hooks/useDebounce';

const Room: React.FC = () => {
    const { roomName, roomId, documentTitle } = useParams<{ roomName: string, roomId: string, documentTitle: string }>();
    const {socket} = useWebSocket();
    const [content, setContent] = useState('');
    const debouncedContent = useDebounce(content, 300); // Adjust the delay as needed
    const { users, setUsers } = useUserContext();

    useEffect(() => {
        if (socket) {
            socket.send(JSON.stringify({
                type: 'add_content',
                roomId,
                content: debouncedContent
            }));
        }
    }, [socket, roomId, debouncedContent]);

    useEffect(() => {
        if (socket) {
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

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket, setUsers, content]);

    return (
        <div className="h-screen flex flex-col">
            <Topbar roomName={roomName!} docName={documentTitle!} content={content} />
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 bg-gray-100 p-4 overflow-hidden">
                    <TextEditor value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="w-64 bg-gray-200 p-4 overflow-auto">
                    <Sidebar usersName={users} />
                </div>
            </div>
        </div>
    );
};

export default Room;

export function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 border">
                <textarea
                    value={value}
                    onChange={onChange}
                    id="editor"
                    className="h-full w-full p-2 text-sm text-gray-800 bg-white border-0 focus:outline-none"
                    placeholder="Write your doc..."
                    required
                />
            </div>
        </div>
    );
}

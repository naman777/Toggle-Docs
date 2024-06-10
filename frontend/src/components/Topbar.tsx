import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useSocket';
import { useParams } from 'react-router-dom';

interface TopbarProps {
  roomName: string;
  docName: string;
  content: string;
}

const Topbar: React.FC<TopbarProps> = ({ roomName, docName, content }) => {
  const socket = useWebSocket();
  const { roomId } = useParams<{ roomId: string }>();
  const [showPopup, setShowPopup] = useState(false);

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId).then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
      }).catch(err => {
        console.error('Failed to copy room ID: ', err);
      });
    }
  };

  return (
    <div className='w-screen flex justify-around bg-slate-700 '>
      <div className='flex-1 w-16 ml-12 mt-2 text-white font-bold text-xl'>
        {roomName} room
      </div>
      <div className='flex-2 w-96 mr-80 mt-2 text-white font-bold text-xl'>
        {docName}
      </div>
      <div className='flex-3 w-32'>
        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={() => {
            socket?.send(JSON.stringify({
              type: "save_content",
              roomId,
              content
            }));
          }}
        >
          Save Docs
        </button>
      </div>
      <div className='flex-3 w-32'>
        <button
          className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800'
          onClick={handleCopyRoomId}
        >
          Copy Room ID
        </button>
      </div>
      {showPopup && (
        <div className='fixed top-0 right-0 mt-4 mr-4 p-2 bg-green-600 text-white rounded'>
          Room ID copied
        </div>
      )}
    </div>
  );
};

export default Topbar;


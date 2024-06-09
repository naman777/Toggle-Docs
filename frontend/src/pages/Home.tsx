import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-slate-700 min-h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Toggle-Docs</h1>
            <p className="text-lg text-center px-40 mt-8 mb-8">
            Toggle-Docs is a powerful collaborative document editing application designed to streamline teamwork and productivity. With Toggle-Docs, users can seamlessly create and join virtual rooms to collaborate on documents in real-time. Whether you're brainstorming ideas, drafting proposals, or editing reports, Toggle-Docs empowers teams to work together efficiently from anywhere in the world. Say goodbye to endless email threads and disjointed feedback loops – with Toggle-Docs, collaboration has never been easier. Start collaborating today and unlock the full potential of teamwork with Toggle-Docs!            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <button onClick={()=>{
                    navigate('/create-room');
                }} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-md text-white font-semibold">
                    Create Room
                </button>
                <button onClick={()=>{
                    navigate('/join-room');
                }} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-md text-white font-semibold">
                    Join Room
                </button>
                <button onClick={()=>{
                    navigate('/get-document');
                }}  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-md text-white font-semibold">
                    Get Document
                </button>
            </div>
        </div>
    );
};

export default Home;

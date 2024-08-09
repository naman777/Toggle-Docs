
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import { WebSocketProvider } from './hooks/useSocket'
import Room from './pages/Room'
import JoinRoom from './pages/JoinRoom'
import { UserProvider } from './hooks/UserContext'
import GetDocument from './pages/GetDocument'

function App() {
  

  return (
    <>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    <UserProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create-room" element={<CreateRoom/>} />
            <Route path="/join-room" element={<JoinRoom/>} />
            <Route path="/get-document" element={<GetDocument/>} />
            
            <Route path="/room/:roomName/:roomId/:documentTitle" element={<Room />} />
            
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
      </UserProvider>
    </>
  )
}

export default App

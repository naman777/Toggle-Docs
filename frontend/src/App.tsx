
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import { WebSocketProvider } from './hooks/useSocket'
import Room from './pages/Room'
import JoinRoom from './pages/JoinRoom'
import { UserProvider } from './hooks/UserContext'

function App() {
  

  return (
    <UserProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create-room" element={<CreateRoom/>} />
            <Route path="/join-room" element={<JoinRoom/>} />
            <Route path="/room/:roomName/:roomId/:documentTitle" element={<Room />} />
            
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
      </UserProvider>
  )
}

export default App

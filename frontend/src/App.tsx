
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-room" element={<CreateRoom/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

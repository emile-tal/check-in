import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Homepage } from './pages/Homepage/Homepage'
import { Singleplayer } from './pages/Singleplayer/Singleplayer'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/play' element={<Singleplayer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

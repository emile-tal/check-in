import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Homepage } from './pages/Homepage/Homepage'
import { Singleplayer } from './pages/Singleplayer/Singleplayer'

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/play' element={<Singleplayer />} />
        </Routes>
      </BrowserRouter>
    </DndProvider>
  )
}

export default App

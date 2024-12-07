import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'

import { FindMultiplayer } from './pages/FindMultiplayer/FindMultiplayer'
import { Game } from './Game'
import { GameMultiplayer } from './pages/GameMultiplayer/GameMultiplayer'
import { GameSingleplayer } from './pages/GameSingleplayer/GameSingleplayer'
import { Homepage } from './pages/Homepage/Homepage'
import { HostMultiplayer } from './pages/HostMultiplayer/HostMultiplayer'
import { LoadGamePage } from './pages/LoadGamePage/LoadGamePage'
import { Login } from './pages/Login/Login'
import { PlayMultiplayer } from './pages/PlayMultiplayer/PlayMultiplayer'
import { PlaySingleplayer } from './pages/PlaySingleplayer/PlaySingleplayer'
import { Stats } from './pages/Stats/Stats'
import axios from 'axios'

interface User {
  username: string
  id: number
}

const game = new Game

export const CurrentUserContext = createContext<User>({ username: '', id: 0 })
export const GameContext = createContext<Game>(game)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User>({ username: '', id: 0 })

  const baseUrl = import.meta.env.VITE_API_URL

  const fetchUser = async (jwtToken: string) => {
    try {
      const { data } = await axios.get(`${baseUrl}users`, { headers: { Authorization: `Bearer ${jwtToken}` } })
      const { username, id } = data
      setUser({ username, id })
    } catch (error) {
      setIsLoggedIn(false)
      console.error(error)
    }
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt_token')
    if (jwtToken) {
      fetchUser(jwtToken)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (jwtToken: string) => {
    setIsLoggedIn(true)
    fetchUser(jwtToken)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser({ username: '', id: 0 })
    localStorage.removeItem('jwt_token')
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={user}>
        <GameContext.Provider value={game}>
          <Routes>
            <Route path='/' element={<Login login={login} isLoggedIn={isLoggedIn} />} />
            <Route path='/home' element={<Homepage isLoggedIn={isLoggedIn} login={login} logout={logout} />} />
            <Route path='/play-singleplayer' element={<PlaySingleplayer />} />
            <Route path='/play-multiplayer' element={<PlayMultiplayer />} />
            <Route path='/singleplayer' element={<GameSingleplayer />} />
            <Route path='/multiplayer' element={<GameMultiplayer />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/saved' element={<LoadGamePage />} />
            <Route path='/find-game' element={<FindMultiplayer />} />
            <Route path='/host-game' element={<HostMultiplayer />} />
          </Routes>
        </GameContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App

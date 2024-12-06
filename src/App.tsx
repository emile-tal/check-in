import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { FindMultiplayer } from './pages/FindMultiplayer/FindMultiplayer'
import { Game } from './Game'
import { Homepage } from './pages/Homepage/Homepage'
import { LoadGamePage } from './pages/LoadGamePage/LoadGamePage'
import { Login } from './pages/Login/Login'
import { Play } from './pages/Play/Play'
import PlayGame from './pages/PlayGame/PlayGame'
import { Stats } from './pages/Stats/Stats'
import axios from 'axios'

interface User {
  username: string
  id: number
}

const game = new Game

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
      <Routes>
        <Route path='/' element={<Login login={login} isLoggedIn={isLoggedIn} />} />
        <Route path='/home' element={<Homepage game={game} user={user} isLoggedIn={isLoggedIn} login={login} logout={logout} />} />
        <Route path='/play' element={<Play game={game} isLoggedIn={isLoggedIn} user_id={user.id} />} />
        <Route path='/play-game' element={<PlayGame game={game} />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/saved' element={<LoadGamePage game={game} />} />
        <Route path='/find-game' element={<FindMultiplayer game={game} user_id={user.id} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

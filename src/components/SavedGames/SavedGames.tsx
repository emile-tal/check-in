import './SavedGames.scss'

import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function SavedGames() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    interface SavedGame {
        id: number
        name: string
        updated_at: string
        is_singleplayer: boolean
    }

    const [allGames, setAllGames] = useState<SavedGame[]>([])

    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchGames = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}games`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            const { games } = data
            setAllGames(games)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
            fetchGames(jwtToken)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const goToMenu = () => {
        navigate('/home')
    }

    return (
        <div className='saved-games'>
            {isLoggedIn ? (
                allGames ? (
                    <div className='saved-games__container'>
                        <div className='saved-games__header-container'>
                            <h2 className='saved-games__header'>Game</h2>
                            <h2 className='saved-games__header'>Last played</h2>
                            <h2 className='saved-games__header'>Type</h2>
                        </div>
                        {allGames.map((game) => (
                            <ul className='saved-games__row' key={game.id}>
                                <li className='saved-games__item'>{game.name}</li>
                                <li className='saved-games__item'>{game.updated_at}</li>
                                <li className='saved-games__item'>{game.is_singleplayer ? 'Singleplayer' : 'Multiplayer'}</li>
                            </ul>
                        ))}
                    </div>
                ) : (
                    <p className='saved-games__message'>No saved games</p>
                )
            ) : (
                <p className='saved-games__message'>You must be logged in to see saved games</p>
            )
            }
            <Button style='primary' text='BACK TO MENU' onClick={goToMenu} />
        </div >
    )
}
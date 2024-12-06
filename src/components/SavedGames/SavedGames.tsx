import './SavedGames.scss'

import { Game, Tile } from '../../Game'
import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Props {
    game: Game
}

export function SavedGames({ game }: Props) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [selectedGame, setSelectedGame] = useState<number>(0)

    interface SavedGame {
        id: number
        name: string
        updated_at: string
        is_singleplayer: boolean
    }

    interface LoadingGame {
        id: number
        draw_0: string
        draw_1: string
        draw_2: string
        is_singleplayer: boolean
    }

    const [allGames, setAllGames] = useState<SavedGame[]>([])

    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchGames = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}games`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            const games: SavedGame[] = data.games
            if (game.numberOfPlayers === 1) {
                setAllGames(games.filter((game) => game.is_singleplayer === true))
            } else {
                setAllGames(games.filter((game) => game.is_singleplayer !== true))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchGame = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}games/${selectedGame}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            return data.game
        } catch (error) {
            console.error(error)
        }
    }

    const fetchGameTiles = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}games/${selectedGame}/tiles`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            return data.tiles
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

    const loadSavedGame = async () => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (selectedGame > 0 && jwtToken) {
            const loadingGame: LoadingGame = await fetchGame(jwtToken)
            const loadingGameTiles: Tile[] = await fetchGameTiles(jwtToken)
            if (loadingGame.is_singleplayer) {
                const drawTiles = [loadingGame.draw_0, loadingGame.draw_1, loadingGame.draw_2]
                const tilesInPlay = loadingGameTiles.map(({ room, row, column }) => ({ room, row, column }))
                game.loadGame(tilesInPlay, drawTiles, loadingGame.id)
                navigate('/play')
            }
        }
    }

    const goToMenu = () => {
        navigate('/home')
    }

    const toggleSelectedGame = (game_id: number) => {
        if (game_id !== selectedGame) {
            setSelectedGame(game_id)
        } else {
            setSelectedGame(0)
        }
    }

    const formatDate = (date: string): Date => {
        return new Date(date)
    }

    return (
        <div className='saved-games'>
            {isLoggedIn ? (
                allGames ? (
                    <div className='saved-games__container'>
                        <div className='saved-games__header-container'>
                            <h2 className='saved-games__header--game'>Game</h2>
                            <h2 className='saved-games__header--date'>Last played</h2>
                            <h2 className='saved-games__header--type'>Type</h2>
                        </div>
                        {allGames.sort((a, b) => formatDate(b.updated_at).getTime() - formatDate(a.updated_at).getTime()).map((game) => (
                            <ul className={`saved-games__row ${selectedGame === game.id ? 'saved-games__row--selected' : ''}`} key={game.id} onClick={() => toggleSelectedGame(game.id)}>
                                <li className='saved-games__item--game'>{game.name}</li>
                                <li className='saved-games__item--date'>{formatDate(game.updated_at).toLocaleDateString()}</li>
                                <li className='saved-games__item--type'>{game.is_singleplayer ? 'Singleplayer' : 'Multiplayer'}</li>
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
            <Button style='primary' text='LOAD GAME' onClick={loadSavedGame} />
            <Button style='primary' text='BACK TO MENU' onClick={goToMenu} />
        </div >
    )
}
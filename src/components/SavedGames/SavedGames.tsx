import './SavedGames.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { GameContext } from '../../App'
import { Tile } from '../../Game'
import axios from 'axios'

interface Props {
    parentUrl: string
    isSingleplayer: boolean
}

export function SavedGames({ parentUrl, isSingleplayer }: Props) {
    const game = useContext(GameContext)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [selectedGame, setSelectedGame] = useState<number>(0)

    interface SavedGame {
        id: number
        name: string
        updated_at: string
        is_singleplayer: number
    }

    interface LoadingGame {
        id: number
        name: string
        draw_0: string
        draw_1: string
        draw_2: string
        is_singleplayer: number
    }

    const [allGames, setAllGames] = useState<SavedGame[]>([])

    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchGames = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/games`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            const games: SavedGame[] = data.games
            if (isSingleplayer) {
                setAllGames(games.filter((game) => game.is_singleplayer === 1))
            } else {
                setAllGames(games.filter((game) => game.is_singleplayer !== 1))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchGame = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/games/${selectedGame}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            return data.game
        } catch (error) {
            console.error(error)
        }
    }

    const fetchGameTiles = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/games/${selectedGame}/tiles`, { headers: { Authorization: `Bearer ${jwtToken}` } })
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
                game.loadGame(tilesInPlay, drawTiles, loadingGame.id, loadingGame.name)
                navigate('/singleplayer')
            }
        }
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
                            <h2 className='saved-games__header saved-games__header--game'>Game</h2>
                            <h2 className='saved-games__header saved-games__header--date'>Last played</h2>
                        </div>
                        {allGames.sort((a, b) => formatDate(b.updated_at).getTime() - formatDate(a.updated_at).getTime()).map((game) => (
                            <ul className={`saved-games__row ${selectedGame === game.id ? 'saved-games__row--selected' : ''}`} key={game.id} onClick={() => toggleSelectedGame(game.id)}>
                                <li className='saved-games__item saved-games__item--game'>{game.name}</li>
                                <li className='saved-games__item saved-games__item--date'>{formatDate(game.updated_at).toLocaleDateString()}</li>
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
            <Link to={parentUrl}><Button style='primary' text='BACK' /></Link>
        </div >
    )
}
import './FindPlayersDisplay.scss'

import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { Game } from '../../Game'
import axios from 'axios'
import { socket } from '../../socket'

interface Props {
    game: Game
    user_id: number
}

export function FindPlayersDisplay({ game, user_id }: Props) {
    const [isHostingGame, setIsHostingGame] = useState<boolean>(false)
    // const [selectedGame, setSelectedGame] = useState<number>(0)

    interface OpenMultiplayerGame {
        id: number
        name: string
    }

    interface newMultiplayerGame {
        name: number
        draw_0: string
        draw_1: string
        draw_2: string
        is_singleplayer: boolean
    }

    const [openGames, setOpenGames] = useState<OpenMultiplayerGame[]>([])

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchMultiplayerGames = async (jwtToken: string) => {
        const { data } = await axios.get(`${baseUrl}games/multi`, { headers: { Authorization: `Bearer ${jwtToken}` } })
        setOpenGames(data.games)
        console.log('fetched data', data.games)
    }

    const createMultiplayerGame = async (jwtToken: string, newMultiplayerGame: newMultiplayerGame) => {
        await axios.post(`${baseUrl}games`, newMultiplayerGame, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (game.user_id === user_id) {
            setIsHostingGame(true)
            if (jwtToken) {
                const gameName = Date.now()
                const gameObject = {
                    name: gameName,
                    draw_0: game.drawTiles[0],
                    draw_1: game.drawTiles[1],
                    draw_2: game.drawTiles[2],
                    is_singleplayer: false
                }
                createMultiplayerGame(jwtToken, gameObject)
                socket.emit('join room', gameName)
            }
        } else {
            if (jwtToken) {
                fetchMultiplayerGames(jwtToken)
            }
        }
    }, [])

    const startGame = () => {

    }

    return (
        <div className='find-players'>
            <h2 className='find-players__header'>{isHostingGame ? 'Waiting for players to join' : 'Select a game to join'}</h2>
            {isHostingGame ? ('test') : (
                openGames.map((game) => (
                    <div className='find-players__row'>
                        <span className='find-players__games'>{game.name}</span>
                    </div>
                ))
            )}
            <Button style={isHostingGame ? 'primary' : 'primary-unclickable'} text='START GAME' onClick={startGame} />
        </div>
    )
}
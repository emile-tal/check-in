import './FindPlayersDisplay.scss'

import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { Game } from '../../Game'
import axios from 'axios'
import { socket } from '../../socket'
import { useNavigate } from 'react-router-dom'

interface Props {
    game: Game
    isHostingGame: boolean
    userId: number
}

interface SelectedGame {
    name: string,
    id: number
}

export function FindPlayersDisplay({ game, isHostingGame, userId }: Props) {
    const [selectedGame, setSelectedGame] = useState<SelectedGame>({ name: '', id: 0 })
    const [canStartGame, setCanStartGame] = useState<boolean>(false)
    const navigate = useNavigate()

    interface OpenMultiplayerGame {
        id: number
        name: string
    }

    interface newMultiplayerGame {
        name: number
        draw_0: string
        draw_1: string
        draw_2: string
        is_singleplayer: number
    }

    const [openGames, setOpenGames] = useState<OpenMultiplayerGame[]>([])

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchMultiplayerGames = async (jwtToken: string) => {
        const { data } = await axios.get(`${baseUrl}multi`, { headers: { Authorization: `Bearer ${jwtToken}` } })
        const games: OpenMultiplayerGame[] = data.games
        const uniqueGames = games
        //TODO make games unique (eliminate doubles)

        setOpenGames(uniqueGames)
    }

    const createMultiplayerGame = async (jwtToken: string, newMultiplayerGame: newMultiplayerGame) => {
        const { data } = await axios.post(`${baseUrl}games`, newMultiplayerGame, { headers: { Authorization: `Bearer ${jwtToken}` } })
        const { game } = data
        socket.emit('join room', game.id)
        setSelectedGame({ name: game.name, id: game.id })
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (isHostingGame) {
            if (jwtToken) {
                const gameName = Date.now()
                const gameObject = {
                    name: gameName,
                    draw_0: game.drawTiles[0],
                    draw_1: game.drawTiles[1],
                    draw_2: game.drawTiles[2],
                    is_singleplayer: 0
                }
                createMultiplayerGame(jwtToken, gameObject)
            }
        } else {
            if (jwtToken) {
                fetchMultiplayerGames(jwtToken)
            }
        }
    }, [])

    const selectGame = (gameId: number, gameName: string) => {
        if (selectedGame.id === gameId) {
            setSelectedGame({ name: '', id: 0 })
        } else {
            setSelectedGame({ name: gameName, id: gameId })
        }
    }

    const joinRoom = () => {
        if (selectedGame.id > 0) {
            socket.emit('join room', selectedGame.id)
            game.joinGame(selectedGame.id)
            game.setPlayers(2)
        }
    }

    const startGame = () => {
        if (canStartGame) {
            socket.emit('start game', { roomName: selectedGame.id, drawTiles: game.drawTiles })
            console.log(userId)
            game.joinGame(selectedGame.id)
            game.setUser(userId)
            game.setPlayers(2)
            navigate('/multiplayer')
        }
    }

    socket.on("room size", (roomSize: number) => {
        if (roomSize > 1) {
            setCanStartGame(true)
        } else {
            setCanStartGame(false)
        }
    })

    socket.on('start', (drawTiles: string[]) => {
        game.setDrawTiles(drawTiles)
        navigate('/multiplayer')
    })

    return (
        <div className='find-players'>
            <h2 className='find-players__header'>{isHostingGame ? 'Waiting for players to join' : 'Select a game to join'}</h2>
            <div className='find-players__games-container'>
                {isHostingGame ? ('test') : (
                    //TODO set state for when user is waiting for game to start but user has already 'joined'
                    openGames.map((game) => (
                        <div className={`find-players__row ${selectedGame.id === game.id ? 'find-players__row--selected' : ''} `} key={game.id} onClick={() => selectGame(game.id, game.name)}  >
                            <span className='find-players__games'>{game.name}</span>
                        </div>
                    ))
                )}
            </div>
            <Button style='primary' text={isHostingGame ? 'START GAME' : 'JOIN GAME'} onClick={isHostingGame ? startGame : joinRoom} />
        </div>
    )
}
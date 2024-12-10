import './FindPlayersDisplay.scss'

import { CurrentUserContext, GameContext } from '../../App'
import { useContext, useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import axios from 'axios'
import { socket } from '../../socket'
import { useNavigate } from 'react-router-dom'

interface Props {
    isHostingGame: boolean
}

interface SelectedGame {
    name: string,
    id: number
}

export function FindPlayersDisplay({ isHostingGame }: Props) {
    const { id } = useContext(CurrentUserContext)
    const game = useContext(GameContext)
    const [selectedGame, setSelectedGame] = useState<SelectedGame>({ name: '', id: 0 })
    const [canStartGame, setCanStartGame] = useState<boolean>(false)
    const [joinedGame, setJoinedGame] = useState<boolean>(false)
    const [playersJoined, setPlayersJoined] = useState<number>(0)
    const navigate = useNavigate()

    interface OpenMultiplayerGame {
        id: number
        name: string
    }

    interface newMultiplayerGame {
        name: string
        draw_0: string
        draw_1: string
        draw_2: string
        is_singleplayer: number
    }

    const [openGames, setOpenGames] = useState<OpenMultiplayerGame[]>([])

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchMultiplayerGames = async (jwtToken: string) => {
        const { data } = await axios.get(`${baseUrl}/multi`, { headers: { Authorization: `Bearer ${jwtToken}` } })
        const games: OpenMultiplayerGame[] = data.games
        setOpenGames(games)
    }

    const createMultiplayerGame = async (jwtToken: string, newMultiplayerGame: newMultiplayerGame) => {
        const { data } = await axios.post(`${baseUrl}/games`, newMultiplayerGame, { headers: { Authorization: `Bearer ${jwtToken}` } })
        const { game } = data
        socket.emit('join room', game.id)
        setSelectedGame({ name: game.name, id: game.id })
    }

    const deleteMultiplayerGame = async (jwtToken: string) => {
        await axios.delete(`${baseUrl}/games/${selectedGame.id}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (isHostingGame) {
            if (jwtToken) {
                const gameName = game.name
                const gameObject = {
                    name: gameName,
                    draw_0: game.drawTiles[0],
                    draw_1: game.drawTiles[1],
                    draw_2: game.drawTiles[2],
                    is_singleplayer: 0
                }
                createMultiplayerGame(jwtToken, gameObject)
                game.setUser(id)
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
            game.restart()
            game.joinGame(selectedGame.id)
            game.setPlayers(2)
            setJoinedGame(true)
        }
    }

    const goBack = () => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (isHostingGame) {
            if (jwtToken) {
                deleteMultiplayerGame(jwtToken)
            }
        }
        navigate('/play-multiplayer')
    }

    const startGame = () => {
        if (canStartGame) {
            socket.emit('start game', { roomName: selectedGame.id, drawTiles: game.drawTiles })
            game.joinGame(selectedGame.id)
            game.setUser(id)
            game.setPlayers(2)
            navigate('/multiplayer')
        }
    }

    socket.on("room size", (roomSize: number) => {
        setPlayersJoined(roomSize)
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
                {isHostingGame ? (
                    <span className='find-players__text'>{`${playersJoined > 1 ? playersJoined - 1 : '0'} player${playersJoined === 2 ? ' has' : 's have'} joined`}</span>
                ) : (
                    joinedGame ? (
                        <span className='find-players__text'>Successfully joined! Waiting for host to start game</span>
                    ) : (
                        openGames.map((game) => (
                            <div className={`find-players__row ${selectedGame.id === game.id ? 'find-players__row--selected' : ''} `} key={game.id} onClick={() => selectGame(game.id, game.name)}  >
                                <span className='find-players__games'>{game.name}</span>
                            </div>
                        ))
                    ))}
            </div>
            <div className='find-players__buttons'>
                <Button style={isHostingGame ? canStartGame ? 'primary' : 'primary-unclickable' : joinedGame ? 'primary-unclickable' : 'primary'} text={isHostingGame ? 'START GAME' : 'JOIN GAME'} onClick={isHostingGame ? startGame : joinRoom} />
                <Button style='primary' text='BACK' onClick={goBack} />
            </div>
        </div>
    )
}
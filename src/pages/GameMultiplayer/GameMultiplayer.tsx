import "./GameMultiplayer.scss"

import { useEffect, useState } from "react"

import { Game } from "../../Game"
import { GameContainer } from "../../components/GameContainer/GameContainer"
import { GameHeader } from "../../components/GameHeader/GameHeader"
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import Modal from 'react-modal'
import { SettingsModal } from "../../components/SettingsModal/SettingsModal"
import axios from "axios"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"

interface Props {
    game: Game
    userId: number
}

const GameMultiplayer = observer(function GameMultiplayer({ game, userId }: Props) {
    const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState<boolean>(false)
    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const navigate = useNavigate()

    Modal.setAppElement('#root')

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchStats = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}stats`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const updateStats = async (jwtToken: string) => {
        try {
            const { games_played_single, games_played_multi, total_points, max_score } = await fetchStats(jwtToken)
            const updatedStats = {
                games_played_single,
                games_played_multi: games_played_multi + 1,
                total_points: total_points + game.totalPoints,
                max_score: max_score < game.totalPoints ? game.totalPoints : max_score
            }
            await axios.put(`${baseUrl}stats`, updatedStats, { headers: { Authorization: `Bearer ${jwtToken}` } })
        } catch (error) {
            console.error(error)
        }
    }

    const gamePostPut = async (jwtToken: string) => {
        if (game.user_id === userId) {
            try {
                const { data } = await axios.get(`${baseUrl}games/${game.id}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
                if (data.game) {
                    const gameData = {
                        name: Date.now(),
                        draw_0: game.drawTiles[0],
                        draw_1: game.drawTiles[1],
                        draw_2: game.drawTiles[2],
                    }
                    await axios.put(`${baseUrl}games/${game.id}`, gameData, { headers: { Authorization: `Bearer ${jwtToken}` } })
                    await axios.put(`${baseUrl}games/${game.id}/tiles`, game.tilesInPlay, { headers: { Authorization: `Bearer ${jwtToken}` } })
                    navigate('/home')
                    game.restart()
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    if (error.response && error.response.status === 404) {
                        const gameData = {
                            name: Date.now(),
                            draw_0: game.drawTiles[0],
                            draw_1: game.drawTiles[1],
                            draw_2: game.drawTiles[2],
                            is_singleplayer: true,
                        }
                        const { data } = await axios.post(`${baseUrl}games/`, gameData, { headers: { Authorization: `Bearer ${jwtToken}` } })
                        const game_id = data.game.id
                        await axios.put(`${baseUrl}games/${game_id}/tiles`, game.tilesInPlay, { headers: { Authorization: `Bearer ${jwtToken}` } })
                        navigate('/home')
                        game.restart()
                    } else {
                        console.error(error)
                    }
                } else {
                    console.error(error)
                }
            }
        }
    }

    const openSettingsModal = () => {
        setSettingsModalIsOpen(true)
    }

    const restartGame = () => {
        game.restart()
        closeSettingsModal()
    }

    const saveGame = () => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            gamePostPut(jwtToken)
        }
    }

    const closeGameOverModal = () => {
        setGameOverModalIsOpen(false)
        restartGame()
    }

    const closeSettingsModal = () => {
        setSettingsModalIsOpen(false)
    }

    useEffect(() => {
        if (game.turnsLeft === 0) {
            setGameOverModalIsOpen(true)
            const jwtToken = localStorage.getItem('jwt_token')
            if (jwtToken) {
                updateStats(jwtToken)
            }
        }
    }, [game.turnsLeft])

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className="play-game">
            <GameHeader turnsLeft={game.turnsLeft} totalPoints={game.totalPoints} openSettingsModal={openSettingsModal} />
            <GameContainer game={game} userId={userId} />
            <Modal isOpen={gameOverModalIsOpen} className='play-game__modal' overlayClassName='play-game__modal-overlay'>
                <GameOverModal closeGameOverModal={closeGameOverModal} totalPoints={game.totalPoints} />
            </Modal>
            <Modal isOpen={settingsModalIsOpen} className='play-game__modal' overlayClassName='play-game__modal-overlay' onRequestClose={closeSettingsModal} >
                <SettingsModal restartGame={restartGame} saveGame={saveGame} closeSettingsModal={closeSettingsModal} isLoggedIn={isLoggedIn} />
            </Modal>
        </div>
    )
})

export default GameMultiplayer
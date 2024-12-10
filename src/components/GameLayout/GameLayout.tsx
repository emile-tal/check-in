import "./GameLayout.scss"

import { useContext, useEffect, useState } from "react"

import { GameContainer } from "../../components/GameContainer/GameContainer"
import { GameContext } from "../../App"
import { GameHeader } from "../../components/GameHeader/GameHeader"
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import { HelpModal } from "../HelpModal/HelpModal"
import Modal from 'react-modal'
import { SettingsModal } from "../../components/SettingsModal/SettingsModal"
import axios from "axios"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"

interface Props {
    isSingleplayer: boolean
}

const GameLayout = observer(function GameLayout({ isSingleplayer }: Props) {
    const game = useContext(GameContext)
    const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState<boolean>(false)
    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false)
    const [helpModalIsOpen, setHelpModalIsOpen] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [opponentPoints, setOpponentPoints] = useState<number>(0)
    const [opponentTurnsLeft, setOpponentTurnsLeft] = useState<number>(20)

    const navigate = useNavigate()

    Modal.setAppElement('#root')

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchStats = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/stats`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const updateStats = async (jwtToken: string) => {
        try {
            const { games_played_single, games_played_multi, total_points, max_score } = await fetchStats(jwtToken)
            const updatedStats = {
                games_played_single: isSingleplayer ? games_played_single + 1 : games_played_single,
                games_played_multi: isSingleplayer ? games_played_multi : games_played_multi + 1,
                total_points: total_points + game.totalPoints,
                max_score: max_score < game.totalPoints ? game.totalPoints : max_score
            }
            await axios.put(`${baseUrl}/stats`, updatedStats, { headers: { Authorization: `Bearer ${jwtToken}` } })
        } catch (error) {
            console.error(error)
        }
    }

    const gamePostPut = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/games/${game.id}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            if (data.game) {
                const gameData = {
                    name: game.name,
                    draw_0: game.drawTiles[0],
                    draw_1: game.drawTiles[1],
                    draw_2: game.drawTiles[2],
                }
                await axios.put(`${baseUrl}/games/${game.id}`, gameData, { headers: { Authorization: `Bearer ${jwtToken}` } })
                await axios.put(`${baseUrl}/games/${game.id}/tiles`, game.tilesInPlay, { headers: { Authorization: `Bearer ${jwtToken}` } })
                navigate('/home')
                game.restart()
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    const gameData = {
                        name: game.name,
                        draw_0: game.drawTiles[0],
                        draw_1: game.drawTiles[1],
                        draw_2: game.drawTiles[2],
                        is_singleplayer: true,
                    }
                    const { data } = await axios.post(`${baseUrl}/games/`, gameData, { headers: { Authorization: `Bearer ${jwtToken}` } })
                    const game_id = data.game.id
                    await axios.put(`${baseUrl}/games/${game_id}/tiles`, game.tilesInPlay, { headers: { Authorization: `Bearer ${jwtToken}` } })
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

    const deleteSavedGame = async (jwtToken: string) => {
        await axios.delete(`${baseUrl}/games/${game.id}`, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    const openSettingsModal = () => {
        setSettingsModalIsOpen(true)
    }

    const openHelpModal = () => {
        setHelpModalIsOpen(true)
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
        game.restart()
        setGameOverModalIsOpen(false)
    }

    const closeSettingsModal = () => {
        setSettingsModalIsOpen(false)
    }

    const closeHelpModal = () => {
        setHelpModalIsOpen(false)
    }

    const updateOpponentDetails = (opponentPoints: number, opponentTurnsLeft: number) => {
        setOpponentPoints(opponentPoints)
        setOpponentTurnsLeft(opponentTurnsLeft)
    }

    const endGame = () => {
        setGameOverModalIsOpen(true)
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            updateStats(jwtToken)
            if (game.id !== 0) {
                deleteSavedGame(jwtToken)
            }
        }
    }

    useEffect(() => {
        if (isSingleplayer) {
            if (game.turnsLeft === 0) {
                endGame()
            }
        } else {
            if (game.turnsLeft === 0 && opponentTurnsLeft === 0) {
                endGame()
            }
        }
    }, [game.turnsLeft])

    useEffect(() => {
        if (game.turnsLeft === 0 && opponentTurnsLeft === 0) {
            endGame()
        }
    }, [opponentTurnsLeft])

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className="game-layout">
            <GameHeader turnsLeft={game.turnsLeft} totalPoints={game.totalPoints} openSettingsModal={openSettingsModal} openHelpModal={openHelpModal} isSingleplayer={isSingleplayer} opponentPoints={opponentPoints} />
            <GameContainer isSingleplayer={isSingleplayer} updateOpponentDetails={updateOpponentDetails} />
            <Modal isOpen={gameOverModalIsOpen} className='game-layout__modal' overlayClassName='game-layout__modal-overlay'>
                <GameOverModal closeGameOverModal={closeGameOverModal} totalPoints={game.totalPoints} isSingleplayer={isSingleplayer} opponentPoints={opponentPoints} />
            </Modal>
            <Modal isOpen={settingsModalIsOpen} className='game-layout__modal' overlayClassName='game-layout__modal-overlay' onRequestClose={closeSettingsModal} >
                <SettingsModal restartGame={restartGame} saveGame={saveGame} closeSettingsModal={closeSettingsModal} isLoggedIn={isLoggedIn} />
            </Modal>
            <Modal isOpen={helpModalIsOpen} className='game-layout__modal' overlayClassName='game-layout__modal-overlay' onRequestClose={closeHelpModal} >
                <HelpModal closeHelpModal={closeHelpModal} />
            </Modal>
        </div>
    )
})

export default GameLayout
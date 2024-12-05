import "./Singleplayer.scss"

import { useEffect, useState } from "react"

import { Game } from "../../Game"
import { GameContainer } from "../../components/GameContainer/GameContainer"
import { GameHeader } from "../../components/GameHeader/GameHeader"
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import Modal from 'react-modal'
import { SettingsModal } from "../../components/SettingsModal/SettingsModal"
import axios from "axios"
import { observer } from "mobx-react"

interface Props {
    game: Game
}

const SinglePlayer = observer(function Singleplayer({ game }: Props) {
    const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState<boolean>(false)
    const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false)

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
                games_played_single: games_played_single + 1,
                games_played_multi,
                total_points: total_points + game.totalPoints,
                max_score: max_score < game.totalPoints ? game.totalPoints : max_score
            }
            await axios.put(`${baseUrl}stats`, updatedStats, { headers: { Authorization: `Bearer ${jwtToken}` } })
        } catch (error) {
            console.error(error)
        }
    }

    const openSettingsModal = () => {
        setSettingsModalIsOpen(true)
    }

    const restartGame = () => {
        game.restart()
        closeSettingsModal()
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

    return (
        <div className="singleplayer">
            <GameHeader turnsLeft={game.turnsLeft} totalPoints={game.totalPoints} openSettingsModal={openSettingsModal} />
            <GameContainer game={game} />
            <Modal isOpen={gameOverModalIsOpen} className='singleplayer__modal' overlayClassName='singleplayer__modal-overlay'>
                <GameOverModal closeGameOverModal={closeGameOverModal} totalPoints={game.totalPoints} />
            </Modal>
            <Modal isOpen={settingsModalIsOpen} className='singleplayer__modal' overlayClassName='singleplayer__modal-overlay' onRequestClose={closeSettingsModal} >
                <SettingsModal restartGame={restartGame} closeSettingsModal={closeSettingsModal} />
            </Modal>
        </div>
    )
})

export default SinglePlayer
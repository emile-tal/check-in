import "./Singleplayer.scss"

import { useEffect, useState } from "react"

import { Game } from "../../components/Game/Game"
import { GameHeader } from "../../components/GameHeader/GameHeader"
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import Modal from 'react-modal'

export function Singleplayer() {
    const [turnsLeft, setTurnsLeft] = useState<number>(20)
    const [totalPoints, setTotalPoints] = useState<number>(0)
    const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState<boolean>(false)

    const updateTotalPoints = (points: number) => setTotalPoints(points)
    const updateTurnsLeft = () => setTurnsLeft(prev => prev - 1)

    Modal.setAppElement('#root')

    const closeGameOverModal = () => {
        setGameOverModalIsOpen(false)
    }

    useEffect(() => {
        if (turnsLeft === 0) {
            setGameOverModalIsOpen(true)
        }
    }, [turnsLeft])

    return (
        <div className="singleplayer">
            <GameHeader turnsLeft={turnsLeft} totalPoints={totalPoints} />
            <Game updateTotalPoints={updateTotalPoints} updateTurnsLeft={updateTurnsLeft} />
            <Modal isOpen={gameOverModalIsOpen} className='game-over-modal' overlayClassName='game-over-modal__overlay'>
                <GameOverModal closeGameOverModal={closeGameOverModal} totalPoints={totalPoints} />
            </Modal>
        </div>
    )
}
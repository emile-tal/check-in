import "./Singleplayer.scss"

import { useEffect, useState } from "react"

import { Game } from "../../Game"
import { GameContainer } from "../../components/GameContainer/GameContainer"
import { GameHeader } from "../../components/GameHeader/GameHeader"
import { GameOverModal } from "../../components/GameOverModal/GameOverModal"
import Modal from 'react-modal'
import { observer } from "mobx-react"

const game = new Game()

const SinglePlayer = observer(function Singleplayer() {
    const [gameOverModalIsOpen, setGameOverModalIsOpen] = useState<boolean>(false)

    Modal.setAppElement('#root')

    const closeGameOverModal = () => {
        setGameOverModalIsOpen(false)
    }

    useEffect(() => {
        if (game.turnsLeft === 0) {
            setGameOverModalIsOpen(true)
        }
    }, [game.turnsLeft])

    return (
        <div className="singleplayer">
            <GameHeader turnsLeft={game.turnsLeft} totalPoints={game.totalPoints} />
            <GameContainer game={game} />
            <Modal isOpen={gameOverModalIsOpen} className='game-over-modal' overlayClassName='game-over-modal__overlay'>
                <GameOverModal closeGameOverModal={closeGameOverModal} totalPoints={game.totalPoints} />
            </Modal>
        </div>
    )
})

export default SinglePlayer
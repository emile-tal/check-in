import './GameOverModal.scss'

import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'

interface Props {
    totalPoints: number
    closeGameOverModal: () => void
    isSingleplayer: boolean
    opponentPoints: number
}

export function GameOverModal({ totalPoints, closeGameOverModal, isSingleplayer, opponentPoints }: Props) {
    const handleRestart = () => {
        closeGameOverModal()
        window.location.reload()
    }

    return (
        <div className='game-over-modal'>
            {isSingleplayer ? (
                <p className='game-over-modal__points'>You scored a total of <span className='game-over-modal__emphasize game-over-modal__emphasize--green'>{totalPoints}</span> points!</p>
            ) : (
                <div className='game-over-modal__text-container'>
                    <p className='game-over-modal__points'>You {totalPoints >= opponentPoints ? (
                        <span className='game-over-modal__emphasize game-over-modal__emphasize--green'>WIN</span>
                    ) : (
                        <span className='game-over-modal__emphasize game-over-modal__emphasize--red'>LOSE</span>
                    )}</p>
                    <p className='game-over-modal__points'>Your score: {totalPoints}</p>
                    <p className='game-over-modal__points'>Opponent's score: {opponentPoints}</p>
                </div>
            )}
            <div className='game-over-modal__button-container'>
                <Link to={'/home'} className='game-over-modal__link' onClick={closeGameOverModal}><Button text='RETURN HOME' style='primary' /></Link>
                {isSingleplayer ? <Link to={'/singleplayer'} className='game-over-modal__link' onClick={handleRestart}><Button text='RESTART' style='primary' /></Link> : ''}
            </div>
        </div>
    )
}
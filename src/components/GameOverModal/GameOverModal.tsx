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
            <h2 className='game-over-modal__title'>GAME OVER</h2>
            {isSingleplayer ? (
                <p className='game-over-modal__points'>You scored a total of <strong>{totalPoints}</strong> points!</p>
            ) : (
                <p className='game-over-modal__points'>{totalPoints > opponentPoints ? 'You WIN!' : 'You LOSE!'}</p>
            )}
            <Link to={'/home'} className='game-over-modal__link' onClick={closeGameOverModal}><Button text='RETURN HOME' style='primary' /></Link>
            {isSingleplayer ? <Link to={'/singleplayer'} className='game-over-modal__link' onClick={handleRestart}><Button text='RESTART' style='primary' /></Link> : ''}
        </div>
    )
}
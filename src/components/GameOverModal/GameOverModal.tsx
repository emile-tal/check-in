import './GameOverModal.scss'

import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'

interface Props {
    totalPoints: number,
    closeGameOverModal: () => void
}

export function GameOverModal({ totalPoints, closeGameOverModal }: Props) {
    const handleRestart = () => {
        closeGameOverModal()
        window.location.reload()
    }

    return (
        <div className='game-over-modal__container'>
            <h2 className='game-over-modal__title'>GAME OVER</h2>
            <p className='game-over-modal__points'>You scored a total of <strong>{totalPoints}</strong> points!</p>
            <Link to={'/home'} className='game-over-modal__link' onClick={closeGameOverModal}><Button text='RETURN HOME' style='primary' /></Link>
            <Link to={'/play'} className='game-over-modal__link' onClick={handleRestart}><Button text='RESTART' style='primary' /></Link>
        </div>
    )
}
import './GameOverModal.scss'

import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'

interface Props {
    totalPoints: number,
    closeGameOverModal: () => void
}

export function GameOverModal({ totalPoints, closeGameOverModal }: Props) {
    return (
        <div className='game-over-modal__container'>
            <h2 className='game-over-modal__title'>GAME OVER</h2>
            <p className='game-over-modal__points'>You scored a total of <strong>{totalPoints}</strong> points!</p>
            <Link to={'/'} className='game-over-modal__link' onClick={closeGameOverModal}><Button text='RETURN HOME' /></Link>
        </div>
    )
}
import './SettingsModal.scss'

import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'

interface Props {
    restartGame: () => void
    closeSettingsModal: () => void
}

export function SettingsModal({ restartGame, closeSettingsModal }: Props) {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/home')
    }

    return (
        <div className='settings-modal'>
            <Button style='primary' text='SAVE' />
            <Button style='primary' text='RESTART' onClick={restartGame} />
            <Button style='primary' text='MAIN MENU' onClick={goToHome} />
            <Button style='primary' text='RETURN TO GAME' onClick={closeSettingsModal} />
        </div>
    )
}
import './SettingsModal.scss'

import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'

interface Props {
    restartGame: () => void
    saveGame: () => void
    closeSettingsModal: () => void
    isLoggedIn: boolean
}

export function SettingsModal({ restartGame, saveGame, closeSettingsModal, isLoggedIn }: Props) {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/home')
    }

    return (
        <div className='settings-modal'>
            <Button style={isLoggedIn ? 'primary' : 'primary-unclickable'} text='SAVE' onClick={saveGame} />
            <Button style='primary' text='RESTART' onClick={restartGame} />
            <Button style='primary' text='RETURN TO GAME' onClick={closeSettingsModal} />
            <Button style='primary' text='MAIN MENU' onClick={goToHome} />
        </div>
    )
}
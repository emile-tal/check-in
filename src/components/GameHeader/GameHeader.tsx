import './GameHeader.scss'

import { SettingsIcon } from '../SettingsIcon/SettingsIcon'

interface Props {
    totalPoints: number,
    turnsLeft: number
    openSettingsModal: () => void
}

export function GameHeader({ totalPoints, turnsLeft, openSettingsModal }: Props) {
    return (
        <header className='game-header'>
            <div className='game-header__stats-container'>
                <span className='game-header__stats'>{`Total points: ${totalPoints}`}</span>
                <span className='game-header__stats'>{`Turns left: ${turnsLeft}`}</span>
            </div>
            <SettingsIcon openSettingsModal={openSettingsModal} />
        </header>
    )
}
import './GameHeader.scss'

import { SettingsIcon } from '../SettingsIcon/SettingsIcon'

interface Props {
    totalPoints: number,
    turnsLeft: number
    openSettingsModal: () => void
    isSingleplayer: boolean
    opponentPoints: number
}

export function GameHeader({ totalPoints, turnsLeft, openSettingsModal, isSingleplayer, opponentPoints }: Props) {
    return (
        <header className='game-header'>
            <div className='game-header__stats-container'>
                <span className='game-header__stats'>{`Total points: ${totalPoints}`}</span>
                <span className='game-header__stats'>{`Turns left: ${turnsLeft}`}</span>
                {isSingleplayer ? '' : <span className='game-header__stats'>{`Opponent points: ${opponentPoints}`}</span>}
            </div>
            <SettingsIcon openSettingsModal={openSettingsModal} />
        </header>
    )
}
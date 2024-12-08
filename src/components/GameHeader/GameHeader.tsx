import './GameHeader.scss'

import { InfoIcon } from '../InfoIcon/InfoIcon'
import { SettingsIcon } from '../SettingsIcon/SettingsIcon'

interface Props {
    totalPoints: number,
    turnsLeft: number
    openSettingsModal: () => void
    openHelpModal: () => void
    isSingleplayer: boolean
    opponentPoints: number
}

export function GameHeader({ totalPoints, turnsLeft, openSettingsModal, openHelpModal, isSingleplayer, opponentPoints }: Props) {
    return (
        <header className='game-header'>
            <div className='game-header__container'>
                <div className={`game-header__stats-container ${isSingleplayer ? '' : 'game-header__stats-container--multiplayer'}`}>
                    <span className='game-header__stats'>{`Total points: ${totalPoints}`}</span>
                    <span className='game-header__stats'>{`Turns left: ${turnsLeft}`}</span>
                    {isSingleplayer ? '' : <span className='game-header__stats'>{`Opponent points: ${opponentPoints}`}</span>}
                </div>
                <div className='game-header__icon-container'>
                    <InfoIcon openHelpModal={openHelpModal} />
                    <SettingsIcon openSettingsModal={openSettingsModal} />
                </div>
            </div>
        </header>
    )
}
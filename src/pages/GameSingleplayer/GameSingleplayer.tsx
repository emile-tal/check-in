import './GameSingleplayer.scss'

import GameLayout from '../../components/GameLayout/GameLayout'

export function GameSingleplayer() {
    return (
        <GameLayout isSingleplayer={true} />
    )
}
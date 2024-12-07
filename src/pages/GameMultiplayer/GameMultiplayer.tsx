import './GameMultiplayer.scss'

import { Game } from '../../Game'
import GameLayout from '../../components/GameLayout/GameLayout'

interface Props {
    game: Game
}

export function GameMultiplayer({ game }: Props) {
    return (
        <GameLayout isSingleplayer={false} game={game} />
    )
}
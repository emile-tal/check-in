import './GameMultiplayer.scss'

import { Game } from '../../Game'
import GameLayout from '../../components/GameLayout/GameLayout'

interface Props {
    game: Game
    userId: number
}

export function GameMultiplayer({ game, userId }: Props) {
    return (
        <GameLayout isSingleplayer={false} game={game} userId={userId} />
    )
}
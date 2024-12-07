import './GameSingleplayer.scss'

import { Game } from '../../Game'
import GameLayout from '../../components/GameLayout/GameLayout'

interface Props {
    game: Game
    userId: number
}

export function GameSingleplayer({ game, userId }: Props) {
    return (
        <GameLayout isSingleplayer={true} game={game} userId={userId} />
    )
}
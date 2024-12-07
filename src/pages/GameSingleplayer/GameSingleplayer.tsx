import './GameSingleplayer.scss'

import { Game } from '../../Game'
import GameLayout from '../../components/GameLayout/GameLayout'

interface Props {
    game: Game
}

export function GameSingleplayer({ game }: Props) {
    return (
        <GameLayout isSingleplayer={true} game={game} />
    )
}
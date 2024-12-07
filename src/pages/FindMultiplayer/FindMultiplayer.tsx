import './FindMultiplayer.scss'

import { FindPlayersDisplay } from '../../components/FindPlayersDisplay/FindPlayerDisplay'
import { Game } from '../../Game'

interface Props {
    game: Game
    userId: number
}

export function FindMultiplayer({ game, userId }: Props) {
    return (
        <div className='find-multiplayer'>
            <FindPlayersDisplay game={game} isHostingGame={false} userId={userId} />
        </div>
    )
}
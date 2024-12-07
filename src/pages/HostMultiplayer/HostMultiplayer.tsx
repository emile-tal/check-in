import './HostMultiplayer.scss'

import { FindPlayersDisplay } from '../../components/FindPlayersDisplay/FindPlayerDisplay'
import { Game } from '../../Game'

interface Props {
    game: Game
    userId: number
}

export function HostMultiplayer({ game, userId }: Props) {
    return (
        <div className='find-multiplayer'>
            <FindPlayersDisplay game={game} isHostingGame={true} userId={userId} />
        </div>
    )
}
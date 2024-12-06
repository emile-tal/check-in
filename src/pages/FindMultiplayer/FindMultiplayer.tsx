import './FindMultiplayer.scss'

import { FindPlayersDisplay } from '../../components/FindPlayersDisplay/FindPlayerDisplay'
import { Game } from '../../Game'

interface Props {
    game: Game
    user_id: number
}

export function FindMultiplayer({ game, user_id }: Props) {
    return (
        <div className='find-multiplayer'>
            <FindPlayersDisplay game={game} user_id={user_id} />
        </div>
    )
}
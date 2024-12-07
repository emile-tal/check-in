import './FindMultiplayer.scss'

import { FindPlayersDisplay } from '../../components/FindPlayersDisplay/FindPlayerDisplay'

export function FindMultiplayer() {
    return (
        <div className='find-multiplayer'>
            <FindPlayersDisplay isHostingGame={false} />
        </div>
    )
}
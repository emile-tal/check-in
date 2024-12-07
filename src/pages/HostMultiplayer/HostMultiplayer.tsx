import './HostMultiplayer.scss'

import { FindPlayersDisplay } from '../../components/FindPlayersDisplay/FindPlayerDisplay'

export function HostMultiplayer() {
    return (
        <div className='find-multiplayer'>
            <FindPlayersDisplay isHostingGame={true} />
        </div>
    )
}
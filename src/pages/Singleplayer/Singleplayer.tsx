import './Singleplayer.scss'

import { Tile } from '../../components/Tile/Tile'
import ballroom from '../../assets/ballroom.png'
import bar from '../../assets/bar.png'
import golf from '../../assets/golf.png'
import kitchen from '../../assets/kitchen.png'
import lobby from '../../assets/lobby.png'
import pool from '../../assets/pool.png'
import restaurant from '../../assets/restaurant.png'

//import { useState } from 'react'

interface Tile {
    room: string,
    column: number[],
    row: number[]
}

const startTile: Tile = {
    room: lobby,
    column: [2, 3],
    row: [2, 3]
}

export function Singleplayer() {
    //  const [tilesInPlay, setTilesInPlay] = useState<Tile[]>([startTile])

    const rooms: string[] = [ballroom, bar, golf, kitchen, pool, restaurant]

    return (
        <div className='gameboard'>
            <div className='gameboard__draw'>
                <img src={rooms[0]} className='gameboard__draw-tile' />
                <img src={rooms[1]} className='gameboard__draw-tile' />
                <img src={rooms[2]} className='gameboard__draw-tile' />
            </div>
            <div className='gameboard__game'>
                <Tile room='playable' tileObject={{ room: 'playable', column: [2, 3], row: [1, 2] }} />
                <Tile room='playable' tileObject={{ room: 'playable', column: [1, 2], row: [2, 3] }} />
                <Tile room={lobby} tileObject={startTile} />
                <Tile room='playable' tileObject={{ room: 'playable', column: [3, 4], row: [2, 3] }} />
                <Tile room='playable' tileObject={{ room: 'playable', column: [2, 3], row: [3, 4] }} />
            </div>
        </div>
    )
}
import './GameTile.scss'

import ballroom from '../../assets/ballroom.png'
import bar from '../../assets/bar.png'
import golf from '../../assets/golf.png'
import kitchen from '../../assets/kitchen.png'
import lobby from '../../assets/lobby.png'
import pool from '../../assets/pool.png'
import restaurant from '../../assets/restaurant.png'

interface Tile {
    room: string,
    row: number,
    column: number
}

interface Props {
    tile: Tile,
    playTile?: (tileObject: Tile) => (void),
    drawTileSelected?: boolean
}

export function GameTile({ tile, playTile, drawTileSelected }: Props) {
    const rooms: { [key: string]: string } = { ballroom: ballroom, bar: bar, golf: golf, kitchen: kitchen, pool: pool, restaurant: restaurant, lobby: lobby }

    const handleClick = () => {
        if (playTile) {
            playTile(tile)
        }
    }

    return (
        <div
            className={`tile ${tile.room === 'playable' ? 'tile__playable' : ''} ${tile.room === 'playable' && drawTileSelected ? 'tile__playable--visible' : ''}`}
            onClick={() => handleClick()}
            style={{ gridRow: `${tile.row}`, gridColumn: `${tile.column}` }}
        >
            {tile.room !== 'playable' ? <img src={rooms[tile.room]} alt={`${tile.room} tile`} className='tile__image' /> : null}
        </div>
    )
}
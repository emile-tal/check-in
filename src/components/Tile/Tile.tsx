import './Tile.scss'

import { useDrop } from 'react-dnd'

interface Tile {
    room: string,
    row: number,
    column: number
}

interface Props {
    room: string,
    tileObject: Tile,
    handleClick?: (tileObject: Tile) => (void),
    drawTileSelected?: boolean
}

export function Tile({ room, tileObject, handleClick, drawTileSelected }: Props) {
    // const [{ isOver }, tileDropRef] = useDrop({
    //     accept: 'tile',
    //     drop: () => playTile,
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver(),
    //     }),
    // });

    return (
        <div
            className={`tile ${room === 'playable' ? 'tile__playable' : ''} ${room === 'playable' && drawTileSelected ? 'tile__playable--visible' : ''}`}
            onClick={() => handleClick ? handleClick(tileObject) : null}
            style={{ gridRow: `${tileObject.row}`, gridColumn: `${tileObject.column}` }}
        // ref={tileDropRef}
        >
            {room !== 'playable' ? <img src={room} alt={`${room} tile`} className='tile__image' /> : null}
        </div>
    )
}
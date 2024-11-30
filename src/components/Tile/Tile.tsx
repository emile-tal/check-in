import './Tile.scss'

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

    return (
        <div className={`tile ${room === 'playable' ? 'tile__playable' : ''} ${room === 'playable' && drawTileSelected ? 'tile__playable--visible' : ''}`} onClick={() => handleClick ? handleClick(tileObject) : null}

            style={{
                gridRow: `${tileObject.row}`,
                gridColumn: `${tileObject.column}`
            }}>

            {room !== 'playable' ? <img src={room} alt={`${room} tile`} className='tile__image' /> : null}
        </div>
    )
}
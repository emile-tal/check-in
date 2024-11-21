import './Tile.scss'

interface Tile {
    room: string,
    row: number,
    column: number
}

interface Props {
    room: string,
    tileObject: Tile,
    handleClick?: (tileObject: Tile) => (void)
}

export function Tile({ room, tileObject, handleClick }: Props) {

    return (
        <div className={`tile ${room === 'playable' ? 'tile__playable' : ''}`} onClick={() => handleClick(tileObject)}

            style={{
                gridRow: `${tileObject.row}`,
                gridColumn: `${tileObject.column}`
            }}>

            {room !== 'playable' ? <img src={room} alt={`${room} tile`} className='tile__image' /> : null}
        </div>
    )
}
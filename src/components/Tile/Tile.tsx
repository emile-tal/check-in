import './Tile.scss'

interface Tile {
    room: string,
    column: number,
    row: number
}

interface Props {
    room: string
    tileObject: Tile
}

export function Tile({ room, tileObject }: Props) {

    return (
        <div className={`tile ${room === 'playable' ? 'tile__playable' : ''}`}

            style={{
                gridColumn: `${tileObject.column}`,
                gridRow: `${tileObject.row}`
            }}>

            {room !== 'playable' ? <img src={room} alt={`${room} tile`} className='tile__image' /> : null}
        </div>
    )
}
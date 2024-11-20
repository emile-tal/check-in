import './Tile.scss'

interface Tile {
    room: string,
    column: number[],
    row: number[]
}

interface Props {
    room: string
    tileObject: Tile
}

export function Tile({ room, tileObject }: Props) {

    return (
        <div className={`tile ${room === 'playable' ? 'tile__playable' : ''}`}

            style={{
                gridArea: `${tileObject.row[0]} / ${tileObject.column[0]} / ${tileObject.row[1]} / ${tileObject.column[1]}`
            }}>

            {room !== 'playable' ? <img src={room} alt={`${room} tile`} className='tile__image' /> : null}
        </div>
    )
}
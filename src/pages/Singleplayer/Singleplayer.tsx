import './Singleplayer.scss'

import { Tile } from '../../components/Tile/Tile'
import ballroom from '../../assets/ballroom.png'
import bar from '../../assets/bar.png'
import golf from '../../assets/golf.png'
import kitchen from '../../assets/kitchen.png'
import lobby from '../../assets/lobby.png'
import pool from '../../assets/pool.png'
import restaurant from '../../assets/restaurant.png'
import { useState } from 'react'

interface Tile {
    room: string,
    row: number,
    column: number
}

const startTile: Tile = {
    room: lobby,
    row: 2,
    column: 2
}

const rooms: string[] = [ballroom, bar, golf, kitchen, pool, restaurant]

export function Singleplayer() {
    const [tilesInPlay, setTilesInPlay] = useState<Tile[]>([startTile])

    interface Obj {
        [key: number]: number[]
    }

    const findPlayableTileSpots = (): [number, number][] => {
        const playableTileSpots: [number, number][] = []

        const rowObject: Obj = {}
        const allRows: number[] = []
        const columnObject: Obj = {}
        const allColumns: number[] = []

        tilesInPlay.forEach((tile) => {
            if (rowObject[tile.row]) {
                rowObject[tile.row].push(tile.column)
            } else {
                rowObject[tile.row] = [tile.column]
                allRows.push(tile.row)
            }
            if (columnObject[tile.column]) {
                columnObject[tile.column].push(tile.row)
            } else {
                columnObject[tile.column] = [tile.row]
                allColumns.push(tile.column)
            }
        })

        tilesInPlay.forEach((tile) => {
            if (!rowObject[tile.row - 1] || !rowObject[tile.row - 1].includes(tile.column)) {
                playableTileSpots.push([tile.row - 1, tile.column])
            }
            if (!rowObject[tile.row + 1] || !rowObject[tile.row + 1].includes(tile.column)) {
                playableTileSpots.push([tile.row + 1, tile.column])
            }
            if (!columnObject[tile.column - 1] || !columnObject[tile.column - 1].includes(tile.row)) {
                playableTileSpots.push([tile.row, tile.column - 1])
            }
            if (!columnObject[tile.column + 1] || !columnObject[tile.column + 1].includes(tile.row)) {
                playableTileSpots.push([tile.row, tile.column + 1])
            }
        })
        return playableTileSpots
    }

    return (
        <div className='gameboard'>
            <div className='gameboard__draw'>
                <img src={rooms[0]} className='gameboard__draw-tile' />
                <img src={rooms[1]} className='gameboard__draw-tile' />
                <img src={rooms[2]} className='gameboard__draw-tile' />
            </div>
            <div className='gameboard__game'>
                {tilesInPlay && findPlayableTileSpots().map((coordinates, index) => (
                    <Tile key={index} room='playable' tileObject={{ room: 'playable', row: coordinates[0], column: coordinates[1] }} />
                ))}
                {tilesInPlay.map((tile, index) => (
                    <Tile key={index} room={tile.room} tileObject={tile} />
                ))}
            </div>
        </div>
    )
}
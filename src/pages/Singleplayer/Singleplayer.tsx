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
    const [drawTileSelected, setDrawTileSelected] = useState<boolean>(false)
    const [selectedDrawTile, setSelectedDrawTile] = useState<[string, number]>(['', -1])
    const [gridSize, setGridSize] = useState<[number, number]>([3, 3])
    const [takeFromDeck, setTakeFromDeck] = useState<boolean>(false)

    const generateRandomRoom = (): string => {
        const randomIndex: number = Math.round(Math.random() * 5)
        return rooms[randomIndex]
    }

    const [drawTiles, setDrawTiles] = useState<string[]>([generateRandomRoom(), generateRandomRoom(), generateRandomRoom()])

    interface CoordinateTracker {
        [key: number]: number[]
    }

    const findPlayableTileSpots = (): [number, number][] => {
        const playableTileSpots: [number, number][] = []

        const rowTracker: CoordinateTracker = {}
        const allRows: number[] = []
        const columnTracker: CoordinateTracker = {}
        const allColumns: number[] = []

        tilesInPlay.forEach((tile) => {
            if (rowTracker[tile.row]) {
                rowTracker[tile.row].push(tile.column)
            } else {
                rowTracker[tile.row] = [tile.column]
                allRows.push(tile.row)
            }
            if (columnTracker[tile.column]) {
                columnTracker[tile.column].push(tile.row)
            } else {
                columnTracker[tile.column] = [tile.row]
                allColumns.push(tile.column)
            }
        })

        tilesInPlay.forEach((tile) => {
            if (!rowTracker[tile.row - 1] || !rowTracker[tile.row - 1].includes(tile.column)) {
                playableTileSpots.push([tile.row - 1, tile.column])
            }
            if (!rowTracker[tile.row + 1] || !rowTracker[tile.row + 1].includes(tile.column)) {
                playableTileSpots.push([tile.row + 1, tile.column])
            }
            if (!columnTracker[tile.column - 1] || !columnTracker[tile.column - 1].includes(tile.row)) {
                playableTileSpots.push([tile.row, tile.column - 1])
            }
            if (!columnTracker[tile.column + 1] || !columnTracker[tile.column + 1].includes(tile.row)) {
                playableTileSpots.push([tile.row, tile.column + 1])
            }
        })
        return playableTileSpots
    }

    const selectDrawTile = (tile: string, index: number) => {
        setDrawTileSelected(true)
        setSelectedDrawTile([tile, index])
    }

    const drawFromDeck = () => {
        setDrawTileSelected(true)
        setTakeFromDeck(true)
        setSelectedDrawTile([generateRandomRoom(), -1])
    }

    const playTile = (tileObject: Tile) => {
        if (drawTileSelected) {
            const newTileInPlay: Tile = {
                room: selectedDrawTile[0],
                row: tileObject.row,
                column: tileObject.column
            }

            const rowsInPlay: number[] = tilesInPlay.map((tile) => tile.row).sort((a, b) => a - b)
            const columnsInPlay: number[] = tilesInPlay.map((tile) => tile.column).sort((a, b) => a - b)

            const minRow: number = rowsInPlay[0]
            const maxRow: number = rowsInPlay[rowsInPlay.length - 1]
            const minColumn: number = columnsInPlay[0]
            const maxColumn: number = columnsInPlay[columnsInPlay.length - 1]

            const allTilesInPlay: Tile[] = [...tilesInPlay, newTileInPlay]
            let gridRows: number = gridSize[0]
            let gridColumns: number = gridSize[1]

            if (newTileInPlay.row < minRow) {
                allTilesInPlay.forEach(tile => {
                    tile.row++
                })
                gridRows++
            } else if (newTileInPlay.row > maxRow) {
                gridRows++
            } else if (newTileInPlay.column < minColumn) {
                allTilesInPlay.forEach(tile => {
                    tile.column++
                })
                gridColumns++
            } else if (newTileInPlay.column > maxColumn) {
                gridColumns++
            }

            setGridSize([gridRows, gridColumns])
            setTilesInPlay(allTilesInPlay)
            const currentDrawTiles = drawTiles
            if (selectedDrawTile[1] !== -1) {
                currentDrawTiles[selectedDrawTile[1]] = generateRandomRoom()
                setDrawTiles(currentDrawTiles)
            } else {
                setTakeFromDeck(false)
            }
        }
    }

    return (
        <div className='gameboard'>
            <div className='gameboard__draw'>
                <div className='gameboard__draw-pile' onClick={drawFromDeck}>
                    {takeFromDeck && <img src={selectedDrawTile[0]} className='gameboard__draw-pile-card' />}
                </div>
                {drawTiles.map((drawTile, index) => (
                    <img src={drawTile} className='gameboard__draw-tile' key={index} onClick={() => selectDrawTile(drawTile, index)} />
                ))}
            </div>
            <div className='gameboard__game'
                style={{
                    gridTemplateColumns: `repeat(${gridSize[1]}, 10rem)`,
                    gridTemplateRows: `repeat(${gridSize[0]}, 10rem)`,
                }}>
                {tilesInPlay && findPlayableTileSpots().map((coordinates, index) => (
                    <Tile key={index} room='playable' tileObject={{ room: 'playable', row: coordinates[0], column: coordinates[1] }} handleClick={playTile} />
                ))}
                {tilesInPlay.map((tile, index) => (
                    <Tile key={index} room={tile.room} tileObject={tile} />
                ))}
            </div>
        </div>
    )
}
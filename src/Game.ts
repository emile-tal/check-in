import { computed, makeAutoObservable } from "mobx"

class Tile {
    room: string
    row: number
    column: number

    constructor(room: string, row: number, column: number) {
        makeAutoObservable(this)
        this.room = room
        this.row = row
        this.column = column
    }
}

const startTile = new Tile('lobby', 2, 2)
const rooms: string[] = ['ballroom', 'bar', 'golf', 'kitchen', 'pool', 'restaurant']
const generateRandomRoom = (): string => {
    const randomIndex: number = Math.floor(Math.random() * 6)
    return rooms[randomIndex]
}

class Game {
    tilesInPlay: Tile[]
    turnsLeft: number
    gridSize: [number, number]
    drawTiles: string[]
    selectedDrawTile: [string, number]
    drawTileSelected: boolean


    constructor() {
        makeAutoObservable(this, {
            totalPoints: computed,
            playableTileSpots: computed
        })
        this.tilesInPlay = [startTile]
        this.turnsLeft = 20
        this.gridSize = [3, 3]
        this.drawTiles = [generateRandomRoom(), generateRandomRoom(), generateRandomRoom()]
        this.selectedDrawTile = ['', -1]
        this.drawTileSelected = false
    }

    get totalPoints() {
        return this.calculatePoints()
    }

    get playableTileSpots() {
        return this.findPlayableTileSpots()
    }

    calculatePoints() {
        let points: number = 0
        const lobbyTiles = this.tilesInPlay.filter((tile) => tile.room === 'lobby')
        lobbyTiles.forEach((lobbyTile) => {
            const tilesAdjacentToLobby: { [key: string]: number } = {}
            this.tilesInPlay.forEach((tile) => {
                if ((tile.column === lobbyTile.column && (tile.row === lobbyTile.row + 1 || tile.row === lobbyTile.row - 1)) || (tile.row === lobbyTile.row && (tile.column === lobbyTile.column + 1 || tile.column === lobbyTile.column - 1))) {
                    if (tilesAdjacentToLobby[tile.room]) {
                        tilesAdjacentToLobby[tile.room]++
                    } else {
                        tilesAdjacentToLobby[tile.room] = 1
                    }
                }
            })
            for (const room in tilesAdjacentToLobby) {
                if (room !== 'lobby') {
                    points += tilesAdjacentToLobby[room] ** 2
                }
            }
        })
        return points
    }

    findPlayableTileSpots(): [number, number][] {
        const playableTileSpots: [number, number][] = []
        const rowTracker: { [key: number]: number[] } = {}
        const columnTracker: { [key: number]: number[] } = {}
        this.tilesInPlay.forEach((tile) => {
            if (rowTracker[tile.row]) {
                rowTracker[tile.row].push(tile.column)
            } else {
                rowTracker[tile.row] = [tile.column]
            }
            if (columnTracker[tile.column]) {
                columnTracker[tile.column].push(tile.row)
            } else {
                columnTracker[tile.column] = [tile.row]
            }
        })
        this.tilesInPlay.forEach((tile) => {
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

    playTile(tile: Tile) {
        const newTileInPlay: Tile = {
            room: this.selectedDrawTile[0],
            row: tile.row,
            column: tile.column
        }

        const rowsInPlay: number[] = this.tilesInPlay.map((tile) => tile.row).sort((a, b) => a - b)
        const columnsInPlay: number[] = this.tilesInPlay.map((tile) => tile.column).sort((a, b) => a - b)

        const minRow: number = rowsInPlay[0]
        const maxRow: number = rowsInPlay[rowsInPlay.length - 1]
        const minColumn: number = columnsInPlay[0]
        const maxColumn: number = columnsInPlay[columnsInPlay.length - 1]

        //Do I need to create this variable below or can I just use the data directly?
        const allTilesInPlay: Tile[] = [...this.tilesInPlay, newTileInPlay]
        let gridRows: number = this.gridSize[0]
        let gridColumns: number = this.gridSize[1]

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

        this.gridSize = [gridRows, gridColumns]
        this.tilesInPlay = allTilesInPlay
        this.turnsLeft -= 1

        this.drawTiles[this.selectedDrawTile[1]] = generateRandomRoom()
    }
}

export { Tile, Game }

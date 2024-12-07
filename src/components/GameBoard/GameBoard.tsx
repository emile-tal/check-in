import './GameBoard.scss'

import { Tile, startTile } from '../../Game'
import { useEffect, useState } from 'react'

import { Game } from '../../Game'
import { GameTile } from '../GameTile/GameTile'
import { observer } from 'mobx-react'
import { socket } from '../../socket'

interface Props {
    game: Game
    isMobile: boolean
    userId?: number
}

const GameBoard = observer(function GameBoard({ game, isMobile, userId }: Props) {
    console.log(game)
    const [opponentTilesInPlay, setOpponentTilesInPlay] = useState<Tile[]>([startTile])
    const [opponentGridSize, setOpponentGridSize] = useState<[number, number]>([3, 3])
    const [isUserTurn, setIsUserTurn] = useState<boolean>(false)

    useEffect(() => {
        if (game.user_id === userId) {
            setIsUserTurn(true)
        }
    }, [])

    socket.on('opponent played', (tilesInPlay, drawTiles, gridSize) => {
        game.setDrawTiles(drawTiles)
        setOpponentTilesInPlay(tilesInPlay)
        setOpponentGridSize(gridSize)
        setIsUserTurn(true)
    })

    const playTurn = (tile: Tile) => {
        if (isUserTurn) {
            game.playTile(tile)
            setIsUserTurn(false)
            setTimeout(() => socket.emit('played', game.id, game.tilesInPlay, game.drawTiles, game.gridSize), 1000)
        }
    }

    return (
        <div className='gameboard'>
            <h3>{isUserTurn ? 'YOUR TURN' : 'OPPONENTS TURN'}</h3>
            <div className='gameboard__game'
                style={{
                    gridTemplateColumns: `repeat(${game.gridSize[1]}, ${isMobile ? '5rem' : '7.5rem'})`,
                    gridTemplateRows: `repeat(${game.gridSize[0]}, ${isMobile ? '5rem' : '7.5rem'})`,
                }}
            >
                {game.tilesInPlay && game.playableTileSpots.map((coordinates, index) => (
                    <GameTile
                        key={index}
                        tile={{ room: 'playable', row: coordinates[0], column: coordinates[1] }}
                        drawTileSelected={game.drawTileSelected}
                        playTurn={playTurn}
                    />
                ))}
                {game.tilesInPlay.map((tile, index) => (
                    <GameTile key={index} tile={tile} />
                ))}
            </div>
            {game.numberOfPlayers > 1 ? (
                <div className='gameboard__game'
                    style={{
                        gridTemplateColumns: `repeat(${opponentGridSize[1]}, ${isMobile ? '5rem' : '7.5rem'})`,
                        gridTemplateRows: `repeat(${opponentGridSize[0]}, ${isMobile ? '5rem' : '7.5rem'})`,
                    }}
                >
                    {opponentTilesInPlay.map((tile, index) => (
                        <GameTile key={index} tile={tile} />
                    ))}
                </div>
            ) : ''}
        </div>
    )
})

export default GameBoard
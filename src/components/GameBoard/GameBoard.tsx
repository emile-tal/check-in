import './GameBoard.scss'

import { Game } from '../../Game'
import { GameTile } from '../GameTile/GameTile'
import { Tile } from '../../Game'
import { observer } from 'mobx-react'

interface Props {
    game: Game
    isMobile: boolean
    playTurn: (tile: Tile) => void
}

const GameBoard = observer(function GameBoard({ game, isMobile, playTurn }: Props) {

    return (
        <div className='gameboard'>
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
        </div>
    )
})

export default GameBoard
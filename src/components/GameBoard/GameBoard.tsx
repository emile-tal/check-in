import './GameBoard.scss'

import { Game } from '../../Game'
import { GameTile } from '../GameTile/GameTile'
import { Tile } from '../../Game'
import { observer } from 'mobx-react'

interface Props {
    game: Game
    isMobile: boolean
    playTurn: (tile: Tile) => void
    isUserTurn: boolean
}

const GameBoard = observer(function GameBoard({ game, isMobile, playTurn, isUserTurn }: Props) {

    return (
        <div className={`gameboard ${isUserTurn ? 'gameboard--selected' : ''}`}>
            <div className='gameboard__game'
                style={{
                    gridTemplateColumns: `repeat(${game.gridSize[1]}, ${isMobile ? '5rem' : '6rem'})`,
                    gridTemplateRows: `repeat(${game.gridSize[0]}, ${isMobile ? '5rem' : '6rem'})`,
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
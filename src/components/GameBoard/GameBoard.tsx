import './GameBoard.scss'

import { GameContext } from '../../App'
import { GameTile } from '../GameTile/GameTile'
import { Tile } from '../../Game'
import { observer } from 'mobx-react'
import { useContext } from 'react'

interface Props {
    isMobile: boolean
    playTurn: (tile: Tile) => void
    isUserTurn: boolean
    isSingleplayer: boolean
}

const GameBoard = observer(function GameBoard({ isMobile, playTurn, isUserTurn, isSingleplayer }: Props) {
    const game = useContext(GameContext)

    return (
        <div className={`gameboard ${isUserTurn && !isSingleplayer ? 'gameboard--turn' : ''}`}>
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
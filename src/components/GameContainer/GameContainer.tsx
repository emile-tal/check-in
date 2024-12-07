import './GameContainer.scss'

import { Game, Tile, startTile } from '../../Game'
import { useEffect, useState } from 'react'

import Draw from '../Draw/Draw'
import GameBoard from '../GameBoard/GameBoard'
import { GameTile } from '../GameTile/GameTile'
import { socket } from '../../socket'

interface Props {
    game: Game
    isSingleplayer: boolean
    userId?: number
    updateOpponentDetails: (opponentPoints: number, opponentTurns: number) => void
}

export function GameContainer({ game, userId, isSingleplayer, updateOpponentDetails }: Props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [opponentTilesInPlay, setOpponentTilesInPlay] = useState<Tile[]>([startTile])
    const [opponentGridSize, setOpponentGridSize] = useState<[number, number]>([3, 3])
    const [isUserTurn, setIsUserTurn] = useState<boolean>(true)

    useEffect(() => {
        if (!isSingleplayer) {
            if (game.user_id !== userId) {
                setIsUserTurn(false)
            }
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    socket.on('opponent played', (tilesInPlay, drawTiles, gridSize, opponentPoints, opponentTurns) => {
        game.setDrawTiles(drawTiles)
        setOpponentTilesInPlay(tilesInPlay)
        setOpponentGridSize(gridSize)
        setIsUserTurn(true)
        updateOpponentDetails(opponentPoints, opponentTurns)
    })

    const playTurn = (tile: Tile) => {
        if (isUserTurn) {
            game.playTile(tile)
            if (!isSingleplayer) {
                setIsUserTurn(false)
            }
            setTimeout(() => socket.emit('played', game.id, game.tilesInPlay, game.drawTiles, game.gridSize, game.totalPoints, game.turnsLeft), 1000)
        }
    }

    return (
        <div className='game'>
            <Draw game={game} isMobile={isMobile} isUserTurn={isUserTurn} />
            <div className='game__container'>
                {isSingleplayer ? '' : <h3>{isUserTurn ? 'YOUR TURN' : 'OPPONENTS TURN'}</h3>}
                <div className='game__all-games'>
                    <GameBoard game={game} isMobile={isMobile} playTurn={playTurn} />
                    {isSingleplayer ? '' : (
                        <div className='game__opponent'>
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
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
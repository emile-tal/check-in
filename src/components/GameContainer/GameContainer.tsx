import './GameContainer.scss'

import { CurrentUserContext, GameContext } from '../../App'
import { Tile, startTile } from '../../Game'
import { useContext, useEffect, useState } from 'react'

import Draw from '../Draw/Draw'
import GameBoard from '../GameBoard/GameBoard'
import { GameTile } from '../GameTile/GameTile'
import { socket } from '../../socket'

interface Props {
    isSingleplayer: boolean
    updateOpponentDetails: (opponentPoints: number, opponentTurns: number) => void
}

export function GameContainer({ isSingleplayer, updateOpponentDetails }: Props) {
    const { id } = useContext(CurrentUserContext)
    const game = useContext(GameContext)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [opponentTilesInPlay, setOpponentTilesInPlay] = useState<Tile[]>([startTile])
    const [opponentGridSize, setOpponentGridSize] = useState<[number, number]>([3, 3])
    const [isUserTurn, setIsUserTurn] = useState<boolean>(true)

    useEffect(() => {
        if (!isSingleplayer) {
            if (game.user_id !== id) {
                setIsUserTurn(false)
                console.log(game.user_id)
                console.log(id)
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
        <div className={`game ${isSingleplayer ? '' : 'game--multiplayer'}`}>
            <Draw isMobile={isMobile} isUserTurn={isUserTurn} />
            <div className='game__container'>
                <div className='game__board-header'>
                    {isSingleplayer ? '' : <h3>YOU</h3>}
                    {isSingleplayer ? '' : <h3>{isUserTurn ? 'YOUR TURN' : 'THEIR TURN'}</h3>}
                </div>
                <div className='game__all-games'>
                    <GameBoard isMobile={isMobile} playTurn={playTurn} isUserTurn={isUserTurn} isSingleplayer={isSingleplayer} />
                    {isSingleplayer ? '' : (
                        <div className='game__opponent-container'>
                            <h3>OPPONENT</h3>
                            <div className={`game__opponent ${isUserTurn ? '' : 'game__opponent--turn'}`}>
                                <div className='gameboard__game'
                                    style={{
                                        gridTemplateColumns: `repeat(${opponentGridSize[1]}, ${isMobile ? '5rem' : '6rem'})`,
                                        gridTemplateRows: `repeat(${opponentGridSize[0]}, ${isMobile ? '5rem' : '6rem'})`,
                                    }}
                                >
                                    {opponentTilesInPlay.map((tile, index) => (
                                        <GameTile key={index} tile={tile} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
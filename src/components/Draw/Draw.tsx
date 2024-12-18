import './Draw.scss'

import { motion, useAnimate } from 'motion/react'
import { useContext, useEffect, useRef } from 'react'

import { GameContext } from '../../App'
import ballroom from '../../assets/ballroom.png'
import bar from '../../assets/bar.png'
import deck from '../../assets/draw-pile.png'
import golf from '../../assets/golf.png'
import kitchen from '../../assets/kitchen.png'
import lobby from '../../assets/lobby.png'
import { observer } from 'mobx-react'
import pool from '../../assets/pool.png'
import restaurant from '../../assets/restaurant.png'

interface Props {
    isMobile: boolean
    isUserTurn: boolean
}

const Draw = observer(function Draw({ isMobile, isUserTurn }: Props) {
    const game = useContext(GameContext)
    const [drawCardTarget, animateDrawCard] = useAnimate()
    const [drawnCardTarget, animateDrawnCard] = useAnimate()
    const openCardRefs = useRef<[React.RefObject<HTMLElement>, any][]>([])

    const rooms: { [key: string]: string } = { ballroom: ballroom, bar: bar, golf: golf, kitchen: kitchen, pool: pool, restaurant: restaurant }

    const drawCardAnimation = async () => {
        await animateDrawnCard(drawnCardTarget.current, { scaleX: 0 }, { duration: 0 })
        if (isMobile) {
            await animateDrawCard(drawCardTarget.current, { x: '5.5rem' }, { duration: 0.25 })
        } else {
            await animateDrawCard(drawCardTarget.current, { y: '7rem' }, { duration: 0.25 })
        }
        await animateDrawCard(drawCardTarget.current, { scaleX: 0 }, { duration: 0.1 })
        await animateDrawnCard(drawnCardTarget.current, { scaleX: 1 }, { duration: 0.1 })
        await animateDrawnCard(drawnCardTarget.current, { scale: isMobile ? 1.1 : 1.2 })
    }

    const openCardAnimation = async (index: number) => {
        const [openTileTarget, animateOpenTile] = openCardRefs.current[index]
        let xOffset = (index) * 5.5
        let yOffset = 6.5
        if (!isMobile) {
            xOffset = 0
            yOffset = (index + 2) * 7
        }
        await animateOpenTile(openTileTarget.current, { scaleX: 0 }, { duration: 0 })
        await animateDrawCard(drawCardTarget.current, { x: `${xOffset}rem`, y: `${yOffset}rem` }, { duration: 0.25 })
        await animateDrawCard(drawCardTarget.current, { scaleX: 0 }, { duration: 0.1 })
        await animateOpenTile(openTileTarget.current, { scaleX: 1 }, { duration: 0.1 })
        game.nextTurn()
    }

    const selectDrawTile = (tile: string, index: number) => {
        if (!game.deckTileSelected && isUserTurn) {
            if (game.selectedDrawTile[0] === tile && (tile === 'lobby' || game.selectedDrawTile[1] === index)) {
                game.deselectDrawTile()
            } else {
                game.selectDrawTile(tile, index)
            }
        }
    }

    const drawFromDeck = () => {
        if (!game.drawTileSelected && isUserTurn) {
            game.drawFromDeck()
            setTimeout(drawCardAnimation, 0.1)
        }
    }

    useEffect(() => {
        if (game.selectedDrawTile[1] !== -1) {
            openCardAnimation(game.selectedDrawTile[1])
        } else {
            game.nextTurn()
        }
    }, [game.turnsLeft])

    return (
        <div className='draw'>
            <div className='draw__deck-container'>
                <img src={deck} className='draw__draw-pile' onClick={drawFromDeck} />
                {game.drawTileSelected && <img src={deck} className='draw__draw-card' ref={drawCardTarget} />}
                {game.deckTileSelected && <img src={rooms[game.selectedDrawTile[0]]} className='draw__draw-pile-card' ref={drawnCardTarget} />}
                <motion.img
                    src={lobby}
                    className={`draw__lobby-draw ${game.selectedDrawTile[0] === 'lobby' ? 'draw__lobby-draw--selected' : ''}`}
                    onClick={() => selectDrawTile('lobby', -1)} animate={{ scale: game.selectedDrawTile[0] === 'lobby' ? (isMobile ? 1.1 : 1.2) : 1 }}
                    whileTap={{ scale: 0.95 }}
                />
            </div>
            <div className='draw__draw'>
                {game.drawTiles.map((drawTile, index) => {
                    const [openTileTarget, animateOpenTile] = useAnimate()
                    openCardRefs.current[index] = [openTileTarget, animateOpenTile]
                    return (
                        < motion.img
                            key={index}
                            ref={openTileTarget}
                            src={rooms[drawTile]}
                            className={`draw__draw-tile ${game.selectedDrawTile[1] === index ? 'draw__draw-tile--selected' : ''}`}
                            onClick={() => selectDrawTile(drawTile, index)}
                            animate={{ scale: game.selectedDrawTile[1] === index ? (isMobile ? 1.1 : 1.2) : 1 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    )
                })}

            </div>
        </div>
    )
})

export default Draw
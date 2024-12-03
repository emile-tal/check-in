import './GameContainer.scss'

import { useEffect, useState } from 'react'

import Draw from '../Draw/Draw'
import { Game } from '../../Game'
import GameBoard from '../GameBoard/GameBoard'

interface Props {
    game: Game
}

export function GameContainer({ game }: Props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='game'>
            <Draw game={game} isMobile={isMobile} />
            <GameBoard game={game} isMobile={isMobile} />
        </div>

    )
}
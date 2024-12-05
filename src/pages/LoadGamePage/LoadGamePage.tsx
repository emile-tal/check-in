import "./LoadGamePage.scss"

import { Game } from "../../Game"
import { SavedGames } from "../../components/SavedGames/SavedGames"

interface Props {
    game: Game
}

export function LoadGamePage({ game }: Props) {
    return (
        <div className="load-game-page">
            <SavedGames game={game} />
        </div>
    )
}
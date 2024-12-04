import "./LoadGamePage.scss"

import { SavedGames } from "../../components/SavedGames/SavedGames"

export function LoadGamePage() {
    return (
        <div className="load-game-page">
            <SavedGames />
        </div>
    )
}
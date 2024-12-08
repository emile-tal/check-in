import "./LoadGamePage.scss"

import { SavedGames } from "../../components/SavedGames/SavedGames"
import { useLocation } from "react-router-dom"

export function LoadGamePage() {
    const parentUrl: string = useLocation().state.parent
    const isSingleplayer: boolean = useLocation().state.isSingleplayer

    return (
        <div className="load-game-page">
            <SavedGames parentUrl={parentUrl} isSingleplayer={isSingleplayer} />
        </div>
    )
}
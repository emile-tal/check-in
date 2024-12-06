import "./Play.scss"

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { Button } from "../../components/Button/Button"
import { Game } from "../../Game"

interface Props {
    game: Game
    isLoggedIn: boolean
    user_id: number
}

export function Play({ game, isLoggedIn, user_id }: Props) {
    const [isMultiplayer, setIsMultiplayer] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (game.numberOfPlayers > 1) {
            setIsMultiplayer(true)
        }
    }, [])

    const newMultiplayerGame = () => {
        game.setUser(user_id)
        navigate('/find-game')
    }

    const newSingleplayerGame = () => {
        navigate('/play-game')
    }

    const goToSavedGames = () => {
        navigate('/saved')
    }

    return (
        <div className='play'>
            <div className='play__button-container'>
                <Button style='primary' text='NEW GAME' onClick={isMultiplayer ? newMultiplayerGame : newSingleplayerGame} />
                {isMultiplayer ? <Button style='primary' text='FIND GAME' onClick={() => navigate('/find-game')} /> : ''}
                <Button style={isLoggedIn ? 'primary' : 'primary-unclickable'} text='LOAD GAME' onClick={goToSavedGames} />
                <Link to='/home' className='play__link'><Button style='primary' text='BACK TO MENU' /></Link>
            </div>
        </div>
    )
}
import "./PlaySingleplayer.scss"

import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import { Button } from "../../components/Button/Button"
import { GameContext } from "../../App"
import { NameGameInput } from "../../components/NameGameInput/NameGameInput"

export function PlaySingleplayer() {
    const game = useContext(GameContext)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isNaming, setIsNaming] = useState<boolean>(false)
    const [gameName, setGameName] = useState<string>('')
    const [invalidGameName, setInvalidGameName] = useState<boolean>(false)
    const navigate = useNavigate()

    const chooseName = () => {
        setIsNaming(true)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameName(event.target.value)
    }

    const goToGame = (event: React.FormEvent) => {
        event.preventDefault()
        setInvalidGameName(false)
        if (gameName.trim() === '') {
            setInvalidGameName(true)
        } else {
            game.restart()
            game.setName(gameName)
            navigate('/singleplayer')
        }
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className='play-singleplayer'>
            <div className='play-singleplayer__button-container'>
                <div className="play-singleplayer__play-container">
                    {isNaming ? (
                        <NameGameInput goToGame={goToGame} invalidGameName={invalidGameName} gameName={gameName} handleNameChange={handleNameChange} />
                    ) : (
                        <Button style='primary' text='NEW GAME' onClick={chooseName} />
                    )}
                </div>
                <Link to='/saved' className='play-singleplayer__link play-singlepl'><Button style={isLoggedIn ? 'primary' : 'primary-unclickable'} text='LOAD GAME' /></Link>
                <Link to='/home' className='play-singleplayer__link'><Button style='primary' text='BACK' /></Link>
            </div>
        </div>
    )
}
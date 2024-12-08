import "./PlayMultiplayer.scss"

import { useEffect, useState } from "react"

import { Button } from "../../components/Button/Button"
import { Link } from "react-router-dom"

export function PlayMultiplayer() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className='play-multiplayer'>
            <div className='play-multiplayer__button-container'>
                <Link to='/host-game' className='play-multiplayer__link'><Button style='primary' text='NEW GAME' /></Link>
                <Link to='/find-game' className="play-multiplayer__link"><Button style='primary' text='FIND GAME' /></Link>
                <Link to='/saved' className="play-multiplayer__link"><Button style={isLoggedIn ? 'primary' : 'primary-unclickable'} text='LOAD GAME' /></Link>
                <Link to='/home' className='play-multiplayer__link'><Button style='primary' text='BACK' /></Link>
            </div>
        </div>
    )
}
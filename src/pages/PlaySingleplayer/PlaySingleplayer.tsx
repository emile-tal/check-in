import "./PlaySingleplayer.scss"

import { useEffect, useState } from "react"

import { Button } from "../../components/Button/Button"
import { Link } from "react-router-dom"

export function PlaySingleplayer() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className='play-singleplayer'>
            <div className='play-singleplayer__button-container'>
                <Link to='/play-game' className="play-singleplayer__link"><Button style='primary' text='NEW GAME' /></Link>
                <Link to='/saved' className='play-singleplayer__link'><Button style={isLoggedIn ? 'primary' : 'primary-unclickable'} text='LOAD GAME' /></Link>
                <Link to='/home' className='play-singleplayer__link'><Button style='primary' text='BACK TO MENU' /></Link>
            </div>
        </div>
    )
}
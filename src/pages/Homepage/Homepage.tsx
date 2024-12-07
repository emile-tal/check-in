import './Homepage.scss'

import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { Game } from '../../Game'
import { useEffect } from 'react'

interface Props {
    game: Game
    user: { username: string, id: number }
    isLoggedIn: boolean
    login: (jwtToken: string) => void
    logout: () => void
}

export function Homepage({ user, isLoggedIn, login, logout }: Props) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            const jwtToken = localStorage.getItem('jwt_token')
            if (jwtToken) {
                login(jwtToken)
            }
        }
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const goToLogin = () => {
        navigate('/')
    }

    return (
        <div className='home'>
            <h1 className='home__logo'>{`Welcome ${isLoggedIn ? user.username : 'Guest'}`}</h1>
            <div className='home__button-container'>
                <Link to='/play-singleplayer' className='home__link'><Button text='SINGLEPLAYER' style='primary' /></Link>
                <Link to='/play-multiplayer' className='home__link'><Button text='MULTIPLAYER' style={isLoggedIn ? 'primary' : 'primary-unclickable'} /></Link>
                <Link to='/stats' className='home__link'><Button text='STATS' style={isLoggedIn ? 'primary' : 'primary-unclickable'} /></Link>
                <Button text={isLoggedIn ? 'LOG OUT' : "LOG IN"} style='primary' onClick={isLoggedIn ? handleLogout : goToLogin} />
            </div>
        </div>
    )
}
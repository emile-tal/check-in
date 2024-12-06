import './Homepage.scss'

import { Button } from '../../components/Button/Button'
import { Game } from '../../Game'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    game: Game
    user: { username: string, id: number }
    isLoggedIn: boolean
    login: (jwtToken: string) => void
    logout: () => void
}

export function Homepage({ game, user, isLoggedIn, login, logout }: Props) {
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

    const goToStats = () => {
        navigate('/stats')
    }

    const goToLogin = () => {
        navigate('/')
    }

    const goToSingleplayer = () => {
        game.setPlayers(1)
        navigate('/play')
    }

    const goToMultiplayer = () => {
        game.setPlayers(2)
        navigate('/play')
    }

    return (
        <div className='home'>
            <h1 className='home__logo'>{`Welcome ${isLoggedIn ? user.username : 'Guest'}`}</h1>
            <div className='home__button-container'>
                <Button text='SINGLEPLAYER' style='primary' onClick={goToSingleplayer} />
                <Button text='MULTIPLAYER' style={isLoggedIn ? 'primary' : 'primary-unclickable'} onClick={goToMultiplayer} />
                <Button text='STATS' style={isLoggedIn ? 'primary' : 'primary-unclickable'} onClick={goToStats} />
                <Button text={isLoggedIn ? 'LOG OUT' : "LOG IN"} style='primary' onClick={isLoggedIn ? handleLogout : goToLogin} />
            </div>
        </div>
    )
}
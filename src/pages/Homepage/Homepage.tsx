import './Homepage.scss'

import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { useEffect } from 'react'

interface Props {
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

    return (
        <div className='home'>
            <h1 className='home__logo'>{`Welcome ${isLoggedIn ? user.username : 'Guest'}`}</h1>
            <div className='home__button-container'>
                <Link to={'/play'} className='home__link'><Button text='SINGLEPLAYER' style='primary' /></Link>
                <Button text='LOAD GAME' style='primary' />
                <Button text='STATS' style='primary' />
                <Button text='LOG OUT' style='primary' onClick={handleLogout} />
            </div>
        </div>
    )
}
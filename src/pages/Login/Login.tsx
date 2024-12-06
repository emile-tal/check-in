import './Login.scss'

import { LoginForm } from '../../components/LoginForm/LoginForm'
import { Navigate } from 'react-router-dom'

interface Props {
    login: (jwtToken: string) => void
    isLoggedIn: boolean
}

export function Login({ login, isLoggedIn }: Props) {

    if (isLoggedIn) {
        return <Navigate to='/home' />
    }

    return (
        <div className='login'>
            {isLoggedIn ? (
                <span>LOADING...</span>
            ) : (
                <LoginForm login={login} />
            )
            }
        </div>
    )
}
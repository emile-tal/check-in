import './Login.scss'

import { LoginForm } from '../../components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom'

interface Props {
    login: (jwtToken: string) => void
    isLoggedIn: boolean
}

export function Login({ login, isLoggedIn }: Props) {
    const navigate = useNavigate()

    if (isLoggedIn) {
        navigate('/home')
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
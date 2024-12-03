import './LoginForm.scss'

import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function LoginForm() {
    const [newUser, setNewUser] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emptyFields, setEmptyFields] = useState<string[]>([])
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    interface User {
        username: string
        password: string
        email?: string
    }

    const handleSubmit = () => {
        setEmptyFields([])
        setInvalidEmail(false)
        let userData: User = {
            username: username,
            password: password,
        }
        if (!userData.username) {
            setEmptyFields([...emptyFields, 'username'])
        }
        if (!userData.password) {
            setEmptyFields([...emptyFields, 'password'])
        }
        if (newUser) {
            userData = { ...userData, email: email }
            if (!userData.email) {
                setEmptyFields([...emptyFields, 'email'])
            }
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setInvalidEmail(true)
        }
    }

    return (
        <div className='login-form'>
            <div className='login-form__user-button-container'>
                <button
                    className={`login-form__user-button login-form__user-button--current ${newUser ? '' : 'login-form__user-button--selected'}`}
                    onClick={() => setNewUser(false)}
                >Current User</button>
                <button
                    className={`login-form__user-button login-form__user-button--register ${newUser ? 'login-form__user-button--selected' : ''}`}
                    onClick={() => setNewUser(true)}
                >New User</button>
            </div>
            <form className='login-form__form' >
                <label className='login-form__label' htmlFor='username' >Username: </label>
                <input
                    className={`login-form__input ${emptyFields.includes('username') ? 'login-form__input--invalid' : ''}`}
                    name='username'
                    type='text'
                    value={username}
                    onChange={handleUsernameChange}
                />
                {newUser && <label className='login-form__label' htmlFor='email'>Email: </label>}
                {newUser && <input
                    className={`login-form__input ${emptyFields.includes('email') || invalidEmail ? 'login-form__input--invalid' : ''}`}
                    name='email'
                    type='text'
                    value={email}
                    onChange={handleEmailChange}
                />}
                <label className='login-form__label' htmlFor='password'>Password: </label>
                <input
                    className={`login-form__input ${emptyFields.includes('password') ? 'login-form__input--invalid' : ''}`}
                    name='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button text={newUser ? 'Register' : 'Login'} style='login' onClick={handleSubmit} />
            </form>
            <div className='login-form__guest-button-container'>
                <Link to='/home' className='login-form__button-link'><Button text='Continue as Guest' style='login' /></Link>
            </div>
        </div>
    )
}
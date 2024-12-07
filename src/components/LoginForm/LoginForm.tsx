import './LoginForm.scss'

import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../Button/Button'
import axios from 'axios'
import { useState } from 'react'

interface Props {
    login: (jwtToken: string) => void
}

export function LoginForm({ login }: Props) {
    const [newUser, setNewUser] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emptyFields, setEmptyFields] = useState<string[]>([])
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)

    const navigate = useNavigate()

    interface User {
        username: string
        password: string
        email?: string
    }

    const baseUrl = import.meta.env.VITE_API_URL

    const registerUser = async (userDetails: User) => {
        try {
            const { data } = await axios.post(`${baseUrl}users/register`, userDetails)
            const { token } = data
            if (token) {
                login(token)
                localStorage.setItem('jwt_token', token)
                navigate('/home')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const loginUser = async (userDetails: User) => {
        try {
            const { data } = await axios.post(`${baseUrl}users/login`, userDetails)
            const { token } = data
            if (token) {
                login(token)
                localStorage.setItem('jwt_token', token)
                navigate('/home')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = () => {
        const emptyFieldTracker: string[] = []
        setInvalidEmail(false)
        let userData: User = {
            username: username,
            password: password,
        }
        if (!userData.username) {
            emptyFieldTracker.push('username')
        }
        if (!userData.password) {
            emptyFieldTracker.push('password')
        }
        if (newUser) {
            userData = { ...userData, email: email }
            if (!userData.email) {
                emptyFieldTracker.push('email')
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(email)) {
                setInvalidEmail(false)
            } else {
                setInvalidEmail(true)
            }
        }
        setEmptyFields(emptyFieldTracker)
        if (emptyFieldTracker.length === 0 && !invalidEmail) {
            if (newUser) {
                registerUser(userData)
            } else {
                loginUser(userData)
            }
        }
    }

    const handleLogin = () => {
        setNewUser(false)
        setInvalidEmail(false)
        setEmptyFields([])
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleRegister = () => {
        setNewUser(true)
        setInvalidEmail(false)
        setEmptyFields([])
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='login-form'>
            <div className='login-form__user-button-container'>
                <button
                    className={`login-form__user-button login-form__user-button--current ${newUser ? '' : 'login-form__user-button--selected'}`}
                    onClick={handleLogin}
                >Current User</button>
                <button
                    className={`login-form__user-button login-form__user-button--register ${newUser ? 'login-form__user-button--selected' : ''}`}
                    onClick={handleRegister}
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
                {emptyFields.includes('username') && <span className='login-form__error'>This field is required</span>}
                {newUser && <label className='login-form__label' htmlFor='email'>Email: </label>}
                {newUser && <input
                    className={`login-form__input ${emptyFields.includes('email') || invalidEmail ? 'login-form__input--invalid' : ''}`}
                    name='email'
                    type='text'
                    value={email}
                    onChange={handleEmailChange}
                />}
                {(emptyFields.includes('email') || invalidEmail) && newUser && <span className='login-form__error'>{emptyFields.includes('email') ? 'This field is required' : 'Please enter a valid email address'}</span>}
                <label className='login-form__label' htmlFor='password'>Password: </label>
                <input
                    className={`login-form__input ${emptyFields.includes('password') ? 'login-form__input--invalid' : ''}`}
                    name='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                {emptyFields.includes('password') && <span className='login-form__error'>This field is required</span>}
                <Button text={newUser ? 'Register' : 'Login'} style='login' onClick={handleSubmit} />
            </form>
            <div className='login-form__guest-button-container'>
                <Link to='/home' className='login-form__button-link'><Button text='Continue as Guest' style='login' /></Link>
            </div>
        </div>
    )
}
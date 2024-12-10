import './LoginForm.scss'

import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../Button/Button'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { useState } from 'react'

interface Props {
    login: (jwtToken: string) => void
}

interface ErrorTracker {
    error: boolean
    type: string
}

const blankErrorTracker = { error: false, type: '' }

export function LoginForm({ login }: Props) {
    const [newUser, setNewUser] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<ErrorTracker>(blankErrorTracker)
    const [passwordError, setPasswordError] = useState<ErrorTracker>(blankErrorTracker)
    const [userError, setUserError] = useState<ErrorTracker>(blankErrorTracker)

    const navigate = useNavigate()

    interface User {
        username: string
        password: string
        email?: string
    }

    const baseUrl = import.meta.env.VITE_API_URL

    const registerUser = async (userDetails: User) => {
        try {
            const { data } = await axios.post(`${baseUrl}/users/register`, userDetails)
            const { token } = data
            if (token) {
                login(token)
                localStorage.setItem('jwt_token', token)
                navigate('/home')
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    setUserError({ error: true, type: 'Username exists already' })
                } else {
                    console.error(error)
                }
            } else {
                console.error(error)
            }
        }
    }

    const loginUser = async (userDetails: User) => {
        try {
            const { data } = await axios.post(`${baseUrl}/users/login`, userDetails)
            const { token } = data
            if (token) {
                login(token)
                localStorage.setItem('jwt_token', token)
                navigate('/home')
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    setUserError({ error: true, type: 'Incorrect username or password' })
                    setPasswordError({ error: true, type: 'Incorrect username or password' })
                    setUsername('')
                    setPassword('')
                } else {
                    console.error(error)
                }
            } else {
                console.error(error)
            }
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

    const validateForm = (userData: User) => {
        let isFormValid = true
        setUserError(blankErrorTracker)
        setEmailError(blankErrorTracker)
        setPasswordError(blankErrorTracker)
        if (userData.username.trim() === '') {
            setUserError({ error: true, type: 'This field is required' })
            isFormValid = false
        }
        if (userData.password.trim() === '') {
            setPasswordError({ error: true, type: 'This field is required' })
            isFormValid = false
        } else if (userData.password.length < 8) {
            setPasswordError({ error: true, type: 'Password must have at least 8 characters' })
            isFormValid = false
        }
        if (newUser) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!userData.email) {
                setEmailError({ error: true, type: 'This field is required' })
                isFormValid = false
            } else if (!emailPattern.test(email)) {
                setEmailError({ error: true, type: "Please enter a valid email address" })
                isFormValid = false
            }
        }
        return isFormValid
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        let userData: User = {
            username: username,
            password: password,
        }
        if (newUser) {
            userData = { ...userData, email: email }
        }
        const formValid = validateForm(userData)
        if (formValid) {
            if (newUser) {
                registerUser(userData)
            } else {
                loginUser(userData)
            }
        }
    }

    const handleLogin = () => {
        setNewUser(false)
        setUserError(blankErrorTracker)
        setEmailError(blankErrorTracker)
        setPasswordError(blankErrorTracker)
        setUsername('')
        setEmail('')
        setPassword('')
    }

    const handleRegister = () => {
        setNewUser(true)
        setUserError(blankErrorTracker)
        setEmailError(blankErrorTracker)
        setPasswordError(blankErrorTracker)
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='login-form'>
            <img className='login-form__logo' alt='Check-in logo' src={logo} />
            <div className='login-form__user-button-container'>
                <button
                    className={`login-form__user-button ${newUser ? '' : 'login-form__user-button--selected'}`}
                    onClick={handleLogin}
                >Current User</button>
                <button
                    className={`login-form__user-button ${newUser ? 'login-form__user-button--selected' : ''}`}
                    onClick={handleRegister}
                >New User</button>
            </div>
            <div className='login-form__form-container'>
                <form className='login-form__form' onSubmit={handleSubmit}>
                    <label className='login-form__label' htmlFor='username' >Username: </label>
                    <input
                        className={`login-form__input ${userError.error ? 'login-form__input--invalid' : ''}`}
                        name='username'
                        type='text'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {userError.error && <span className='login-form__error'>{userError.type}</span>}
                    {newUser && <label className='login-form__label' htmlFor='email'>Email: </label>}
                    {newUser && <input
                        className={`login-form__input ${emailError.error ? 'login-form__input--invalid' : ''}`}
                        name='email'
                        type='text'
                        value={email}
                        onChange={handleEmailChange}
                    />}
                    {emailError.error && newUser && <span className='login-form__error'>{emailError.type}</span>}
                    <label className='login-form__label' htmlFor='password'>Password: </label>
                    <input
                        className={`login-form__input ${passwordError.error ? 'login-form__input--invalid' : ''}`}
                        name='password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError.error && <span className='login-form__error'>{passwordError.type}</span>}
                    <div className='login-form__form-button'>
                        <Button text={newUser ? 'Register' : 'Login'} style='login' />
                    </div>
                </form>
                <Link to='/home' className='login-form__button-link'><Button text='Continue as Guest' style='login' /></Link>
            </div>
        </div>
    )
}
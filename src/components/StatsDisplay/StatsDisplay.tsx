import './StatsDisplay.scss'

import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function StatsDisplay() {
    const [singleplayerGames, setSingleplayerGames] = useState<number>(0)
    const [multiplayerGames, setMultiplayerGames] = useState<number>(0)
    const [totalPoints, setTotalPoints] = useState<number>(0)
    const [maxScore, setMaxScore] = useState<number>(0)

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchStats = async (jwtToken: string) => {
        try {
            const { data } = await axios.get(`${baseUrl}/stats`, { headers: { Authorization: `Bearer ${jwtToken}` } })
            const { games_played_single, games_played_multi, total_points, max_score } = data
            setSingleplayerGames(games_played_single)
            setMultiplayerGames(games_played_multi)
            setTotalPoints(total_points)
            setMaxScore(max_score)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token')
        if (jwtToken) {
            fetchStats(jwtToken)
        }
    }, [])

    return (
        <div className='stats-display'>
            <div className='stats-display__row'>
                <span className='stats-display__text'>Singleplayer games played</span>
                <span className='stats-display__text'>{singleplayerGames}</span>
            </div>
            <div className='stats-display__row'>
                <span className='stats-display__text'>Multiplayer games played</span>
                <span className='stats-display__text'>{multiplayerGames}</span>
            </div>
            <div className='stats-display__row'>
                <span className='stats-display__text'>Total points scored</span>
                <span className='stats-display__text'>{totalPoints}</span>
            </div>
            <div className='stats-display__row'>
                <span className='stats-display__text'>Max score</span>
                <span className='stats-display__text'>{maxScore}</span>
            </div>
            <Link to={'/home'} className='stats-display__link'><Button style='primary' text='BACK' /></Link>
        </div>
    )
}

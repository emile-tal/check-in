import './Homepage.scss'

import { Link } from 'react-router-dom'
import { StartButton } from '../../components/StartButton/StartButton'

export function Homepage() {
    return (
        <div className='home'>
            <h1 className='home__logo'>LOGO</h1>
            <div className='home__button-container'>
                <Link to={'/play'} className='home__link'><StartButton text='SINGLEPLAYER' /></Link>
                <StartButton text='LOAD GAME' />
                <StartButton text='STATS' />
            </div>
        </div>
    )
}
import './Homepage.scss'

import { Button } from '../../components/Button/Button'
import { Link } from 'react-router-dom'

export function Homepage() {
    return (
        <div className='home'>
            <h1 className='home__logo'>LOGO</h1>
            <div className='home__button-container'>
                <Link to={'/play'} className='home__link'><Button text='SINGLEPLAYER' /></Link>
                <Button text='LOAD GAME' />
                <Button text='STATS' />
            </div>
        </div>
    )
}
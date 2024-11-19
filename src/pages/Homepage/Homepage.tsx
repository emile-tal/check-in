import './Homepage.scss'

import { StartButton } from '../../components/StartButton/StartButton'

export function Homepage() {
    return (
        <div className='home'>
            <h1 className='home__logo'>LOGO</h1>
            <div className='home__button-container'>
                <StartButton text='SINGLEPLAYER' />
                <StartButton text='LOAD GAME' />
                <StartButton text='STATS' />
            </div>
        </div>
    )
}
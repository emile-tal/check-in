import './HelpModal.scss'

import { Button } from '../Button/Button'
import ballroom from '../../assets/ballroom.png'
import bar from '../../assets/bar.png'
import golf from '../../assets/golf.png'
import kitchen from '../../assets/kitchen.png'
import lobby from '../../assets/lobby.png'
import pool from '../../assets/pool.png'
import restaurant from '../../assets/restaurant.png'

interface Props {
    closeHelpModal: () => void
}

const rooms = [ballroom, bar, golf, kitchen, pool, restaurant, lobby]
const roomStrings = ['Ballroom', 'Bar', 'Golf', 'Kitchen', 'Pool', 'Restaurant', 'Lobby']

export function HelpModal({ closeHelpModal }: Props) {
    return (
        <div className='help-modal'>
            <h2 className='help-modal__header'>How to play</h2>
            <p className='help-modal__text'>
                Each turn, you will place a room tile adjacent to your placed tiles as you build up your hotel empire. There are 7 types of room tiles you can place:
            </p>
            <div className='help-modal__tiles'>
                {rooms.map((room, index) => (
                    <div className='help-modal__room-container' key={index}>
                        <img className='help-modal__room-image' src={room} alt={`${room} tile`} />
                        <span className='help-modal__room-label'>{roomStrings[index]}</span>
                    </div>
                ))}
            </div>
            <p className='help-modal__text'>
                You score points based on how many of the same room tiles you place around <strong>each lobby tile.</strong> Each turn, you can either choose to draw one of the three face-up tiles, draw an unknown tile from the deck, or draw a lobby tile. Once you have drawn a tile, you can place it anywhere on the board adjacent to any of your placed tiles. The points you score are calculated based on the following:
            </p>
            <div className='help-modal__points-container'>
                <p className='help-modal__points'>1 tile adjacent to lobby: 1 point</p>
                <p className='help-modal__points'>2 identical tiles adjacent to lobby: 4 point</p>
                <p className='help-modal__points'>3 identical tiles adjacent to lobby: 9 point</p>
                <p className='help-modal__points'>4 identical tiles adjacent to lobby: 16 point</p>
            </div>
            <p className='help-modal__text'>The game ends after 20 turns. Good luck!</p>
            <Button style='primary' text='BACK TO GAME' onClick={closeHelpModal} />
        </div>
    )
}
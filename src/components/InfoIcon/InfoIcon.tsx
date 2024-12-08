import './InfoIcon.scss'

interface Props {
    openHelpModal: () => void
}

export function InfoIcon({ openHelpModal }: Props) {
    return (
        <svg className='info-icon' enableBackground="new 0 0 50 50" id="Layer_1" version="1.1" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" onClick={openHelpModal}>
            <circle cx="25" cy="25" fill="none" r="24" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <rect fill="none" />
            <g>
                <path d="M23.533,30.407v-1.47c0-1.436,0.322-2.188,1.075-3.229l2.404-3.3c1.254-1.721,1.684-2.546,1.684-3.766   c0-2.044-1.434-3.335-3.479-3.335c-2.008,0-3.299,1.219-3.729,3.407c-0.036,0.215-0.179,0.323-0.395,0.287l-2.259-0.395   c-0.216-0.036-0.323-0.179-0.288-0.395c0.539-3.443,3.014-5.703,6.744-5.703c3.872,0,6.49,2.546,6.49,6.097   c0,1.722-0.608,2.977-1.828,4.663l-2.403,3.3c-0.717,0.968-0.933,1.47-0.933,2.689v1.147c0,0.215-0.143,0.358-0.358,0.358h-2.367   C23.676,30.766,23.533,30.622,23.533,30.407z M23.354,33.851c0-0.215,0.143-0.358,0.359-0.358h2.726   c0.215,0,0.358,0.144,0.358,0.358v3.084c0,0.216-0.144,0.358-0.358,0.358h-2.726c-0.217,0-0.359-0.143-0.359-0.358V33.851z" />
            </g>
        </svg>
    )
}
import './StartButton.scss'

interface Props {
    text: string
}

export function StartButton({ text }: Props) {
    return (
        <button className='start-button'>{text}</button>
    )
}
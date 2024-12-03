import './Button.scss'

interface Props {
    text: string
    style: string
    onClick?: () => void
}

export function Button({ text, style, onClick }: Props) {
    return (
        <button className={`button button--${style}`} onClick={() => onClick ? onClick() : null} type='button' >{text}</button>
    )
}
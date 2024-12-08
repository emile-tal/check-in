import './NameGameInput.scss'

interface Props {
    goToGame: (event: React.FormEvent) => void
    invalidGameName: boolean
    gameName: string
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function NameGameInput({ goToGame, invalidGameName, gameName, handleNameChange }: Props) {
    return (
        <form className="name-game-input" onSubmit={goToGame} >
            <input
                className={`name-game-input__input ${invalidGameName ? 'name-game-input__input--error' : ''}`}
                value={gameName}
                onChange={handleNameChange}
                placeholder="Enter game name"
            />
            <button className="name-game-input__go">GO</button>
        </form>
    )
}
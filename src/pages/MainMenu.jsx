import { Link } from 'react-router-dom'

export default function MainMenu() {
    return (
        <div className="universal-border pacman-font">
            <h1>Rock Paper Scissors Dash</h1>
            <Link to="/CharacterScreen"><button className="main-menu-button pacman-font">Single Player</button></Link>
            <Link to="/"><button className="main-menu-button pacman-font">Multiplayer</button></Link>
            <Link to="/"><button className="main-menu-button pacman-font">Leaderboard</button></Link>
        </div>
    )
}
// this will become the new about
import githubLogo from './assets/github-logo.webp'
import Paul from './assets/Paul.png'
import GH from './assets/github-circle.svg'
import LI from './assets/linkedin.svg'
import RPSD from './assets/rpsd-logo.png'
import DP from './assets/document.svg'
import { Link } from 'react-router-dom'


export default function About() {
    return (
        <div className='about'>
            <h1>Rock {`->`} Paper {`->`} Scissor {`->`} Dash</h1>

            <div>
                <section>
                    <h2>About Our Team</h2>
                    <p>We are three Computer Science students full of dreams and inspiration. <strong>Paul Constanza</strong> and <strong>Pierce Mott</strong> are pursuing a Bachelor of Science in Computer Science, while <strong>Joanna Romero</strong> is working toward a Bachelor of Arts in Computer Science. We took this class with Dr. Scott Lambert at Rhode Island College. Paul and Joanna are graduating in May 2025, while Pierce has one more semester to go.</p>

                    <p>Initially, it was just Joanna and Paul with the idea of creating a website, but Paul suggested developing a video game instead—one inspired by the iconic <em>Pac-Man</em> and the classic hand game <em>Rock, Paper, Scissors</em>. While looking for an additional team member, Pierce joined the project.</p>

                    <p>At the time, Paul was learning Python and experimenting with if-statements based on the Rock-Paper-Scissors hierarchy. That sparked the idea: "Wouldn't it be cool to see them battle it out in a 3D fighting game?"</p>

                    <p>Joanna was in charge of designing the levels and successfully created 25 of them, frequently seeking Paul's input. She also worked on the timer and score system, though she ran into major issues with the scoring—Paul stepped in to help resolve them. Joanna also created the HTML pages for the <strong>How to Play</strong> and <strong>About Us</strong> sections. She initially assisted with the tunnel system, which was later replaced by a more advanced function written by Pierce.</p>

                    <p>Paul handled the database, pellet system, collision detection, login functionality, main menu, scoring system, and CI/CD pipeline.</p>
                    <p>Pierce designed the sprites,  and implementation of animation of tunnel mechanics, general mechanics and fixing, implementation of character select screen</p>

                    <p>We are incredibly grateful for the opportunity to work on this project, and we're excited for others to experience and enjoy our game.</p>
                </section>
            </div>

            <h2>Connect with us</h2>

            {/* Paul's links */}
            <div className="universal-border creators">
                <div className='creator'>
                    <img src={Paul} alt='Pic of Paul' id='paul' />
                    <div className='creator-links'>
                        <a href="https://github.com/paulcostanza" target="_blank"><img src={GH} /></a>
                        <a href="https://www.linkedin.com/in/paul-costanza/" target="_blank"><img src={LI} /></a>
                    </div>
                </div>
            </div>

            {/* Rock Paper Sissors Dash links */}
            <div className="universal-border creators">
                <div className='creator'>
                    <img src={RPSD} alt='rpsd logo' id='rpsd-logo' />
                    <div className='creator-links'>
                        <a href='https://github.com/paulcostanza/CSCI401--Rock-Paper-Scissors-Dash' target="_blank"><img src={GH} /></a>
                        <Link to="/technical-design"><img src={DP} /></Link>
                    </div>
                </div>
            </div>

            <Link to="/" className='pacman-font back-to-main-link'>Back to previous page</Link>
        </div>
    )
}


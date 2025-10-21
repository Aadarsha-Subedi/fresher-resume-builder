//CORE REACT IMPORTS
import type { JSX } from 'react';

//THIRD PARTY IMPORTS
import { NavLink } from 'react-router-dom';

//ASSETS AND STYLES
import logoIcon from '../assets/logo.png';
import '../styles/Header.css';

export default function Header(): JSX.Element {

    return (
        <header className='header'>
            <nav className="header__container">
                <NavLink to='/'>
                    <img src={logoIcon} alt="The logo." width={32} />
                </NavLink>
                <NavLink to='/'>
                <h1 className='header__heading'>Fresher Resume Builder</h1>
                </NavLink>
            </nav>
        </header>
    )

}
//CORE REACT IMPORTS
import type { JSX } from 'react';

//THIRD PARTY IMPORTS
import { NavLink } from 'react-router-dom';

//ASSETS AND STYLES
import pointIcon from '../assets/point.svg';
import checkIcon from '../assets/check.png';
import '../styles/Home.css';

export default function Home(): JSX.Element {

    return (
        <main className="main">
            <div className="hero">
                <h1 className='hero__heading'>Create Your First Professional Resume in Minutes.</h1>
                <h1 className='hero__heading'>Land Your Dream Job with a Perfect Resume.</h1>
                <p className='hero__subheading'>Step-by-step guidance to build a standout resume. No experience needed.</p>
            </div>
            <div className="problems__cta">
                <div className="problems__cta--container">
                    <p className="problems__cta--paragraph"><img className='problems__cta--icon' src={pointIcon} alt="A point icon." width={14} />Struggling to create your first resume?</p>
                </div>
                <div className="problems__cta--container">
                    <p className="problems__cta--paragraph"><img className='problems__cta--icon' src={pointIcon} alt="A point icon." width={14} />Don't know what to include or how to format?</p>
                </div>
                <NavLink to='/build'><button className='problems__cta--button'>Create my resume now</button></NavLink>
            </div>
            <div className="features__cta">
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Beginner Friendly: </strong>Step-by-step guidance</p>
                </div>
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Professional Template: </strong>ATS-friendly design</p>
                </div>
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Quick Setup: </strong>Create in under 10 minutes</p>
                </div>
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Free to use: </strong>No hidden charges</p>
                </div>
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Instant Download: </strong>PDF format ready to send</p>
                </div>
                <div className="features__cta--container">
                    <p className="features__cta--paragraph"><img className='features__cta--icon' src={checkIcon} alt="A point icon." width={14} /><strong>Fresher-focused: </strong>Optimized for entry-level jobs</p>
                </div>
                <NavLink to='/build'><button className='features__cta--button'>Get started for free</button></NavLink>
            </div>
        </main>
    )

}
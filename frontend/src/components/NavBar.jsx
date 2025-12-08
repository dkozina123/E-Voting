import React from 'react';
import { Link } from 'react-router';
import '../assets/styles/NavBar.css';

const Navbar = () => {
    return (

        <nav className="navbar">
            <div className="navbar-left">
                <a href="#">
                    E-Voting
                </a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <Link to="/">Početna</Link>
                    </li>
                    <li>
                        <Link to="/vote">Glasaj</Link>
                    </li>
                    <li>
                        <Link to="/result">Rezultati</Link>
                    </li>
                    <li>
                        <Link to="/contact">Kontakt</Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;
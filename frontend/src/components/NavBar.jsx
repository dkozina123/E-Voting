import React from 'react';
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
                        <a href="#">Početna</a>
                    </li>
                    <li>
                        <a href="#">Glasaj</a>
                    </li>
                    <li>
                        <a href="#">Rezultati</a>
                    </li>
                    <li>
                        <a href="#">Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;
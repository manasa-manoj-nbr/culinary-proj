import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="navbar-title">Culinary Management</div>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/homepage">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/" >Logout</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;

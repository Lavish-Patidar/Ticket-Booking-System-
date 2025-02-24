import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handelClick = () => {
        if (isOpen) {
            setIsOpen(!isOpen);
        }

    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    Travel Booking
                </Link>
                <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className={`navbar-links ${isOpen ? 'active' : ''}`} onClick={handelClick}>
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>
                    <Link to="/book" className="navbar-link">
                        Ticket Book
                    </Link>
                    <Link to="/view" className="navbar-link">
                        View Ticket
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

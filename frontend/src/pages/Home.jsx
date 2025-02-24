import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Travel Booking</h1>
            <p>Book your travel tickets with ease and convenience.</p>
            <div className="home-buttons">
                <a href="/book" className="home-button">
                    Book Now
                </a>
                <a href="/view" className="home-button home-button-outline">
                    View Bookings
                </a>
            </div>
        </div>
    );
};

export default Home;

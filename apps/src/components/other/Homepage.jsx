import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../css/Homepage.css'; // Import CSS for styling

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <header className="header">
        <h1 className="tagline">Welcome to [Restaurant Name]</h1>
        <p className="description">Experience the best culinary delights!</p>
      </header>
      <section className="services">
        <h2>Our Services</h2>
        <ul>
            <li><Link to="/table-reservation">Table Reservation</Link></li>
            <li><Link to="/food-delivery">Food Delivery</Link></li>
            <li><Link to="/catering-service">Catering Service</Link></li>
            <li><Link to="/event-hall-booking">Event Hall Booking</Link></li>
        </ul>
      </section>
      <section className="menu">
        <h2>Menu</h2>
        <div className="dropdown">
          <button className="dropbtn">Select Menu</button>
          <div className="dropdown-content">
            <a href="/">Starters</a>
            <a href="/">Main Course</a>
            <a href="/">Desserts</a>
            <a href="/">Beverages</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Homepage.css'; // Import CSS for styling
import Navbar from './Navbar'

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
            <Link to="/menu/starters">Starters</Link>
            <Link to="/menu/main-course">Main Course</Link>
            <Link to="/menu/desserts">Desserts</Link>
            <Link to="/menu/beverages">Beverages</Link>
          </div>
        </div>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>We are committed to providing an unforgettable culinary experience, from intimate dinners to large events.</p>
      </section>
      <footer className="footer">
        <p>© {new Date().getFullYear()} [Restaurant Name]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../other/Navbar';

function TableReservation() {
  const [tables, setTables] = useState([]); // Store available tables from the backend
  const [reservation, setReservation] = useState({
    date: '', 
    time: '',
    tableID: '',
    spclReq: '',
    number: '',
  });

  useEffect(() => {
    // Fetch available tables from the backend API
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tables/');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/reservations/', reservation);
      console.log('Booking successful:', response.data);
      alert('Reservation successful!');
      
      // Reset form fields after successful submission
      setReservation({
        date: '',
        time: '',
        tableID: '',
        spclReq: '',
        number: '',
      });
    } catch (error) {
      console.error('Error making reservation:', error.response?.data || error.message);
      alert('There was an error making the reservation. Please try again.');
    }
  };

  return (
    <div>
        <Navbar />
      <h1 style={{ textAlign: 'center', color: '#333' }}>Table Reservation</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input 
          type="date" 
          name="date" 
          value={reservation.date}
          onChange={handleChange} 
          placeholder="Reservation Date" 
          style={inputStyle}
          required 
        />
        <input
          type="time"
          name="time"
          value={reservation.time}
          onChange={handleChange}
          placeholder="Reservation Time"
          style={inputStyle}
          required
        />
        <select
          name="tableID"
          value={reservation.tableID}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table.TableID} value={table.TableID}>
              Table {table.TableID} - {table.Location} ({table.Capacity} seats)
            </option>
          ))}
        </select>
        <input
          type="number"
          name="number"
          value={reservation.number}
          onChange={handleChange}
          placeholder="Number of People"
          style={inputStyle}
          min="1"
          max="10"
          required
        />
        <textarea
          name="spclReq"
          value={reservation.spclReq}
          onChange={handleChange}
          placeholder="Special Requests (Optional)"
          style={{ ...inputStyle, height: '80px' }}
        />
        <button type="submit" style={buttonStyle}>Reserve</button>
      </form>
    </div>
  );
}

// Styles for form and inputs
const formStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '400px',
  margin: '20px auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default TableReservation;

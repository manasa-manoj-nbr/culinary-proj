
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Tablereservation.css'; 
import Navbar from '../other/Navbar'

function TableReservation() {
  const [tables, setTables] = useState([]); 
  const [reservation, setReservation] = useState({
    date: '', 
    time: '',
    table: '',  
    special_requests: '',
    number_of_people: '',
  });
  const [error, setError] = useState(''); // State to hold error messages

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tables/');
        console.log('API Response:', response.data);

        if (response.data && response.data.length > 0) {
          setTables(response.data);
        } else {
          throw new Error("No tables returned from API");
        }
      } catch (error) {
        console.error('Error fetching tables from API, using dummy data:', error);
      }
    };
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...reservation,
      table: parseInt(reservation.table),
      number_of_people: parseInt(reservation.number_of_people)
    };

    try {
      const response = await axios.post('http://localhost:8000/api/reservations/', payload);
      console.log('Booking successful:', response.data);
      alert('Reservation successful!');
      setError(''); // Clear any previous error messages

      setReservation({
        date: '', 
        time: '',
        table: '',
        special_requests: '',
        number_of_people: '',
      });
    } catch (error) {
      console.error('Error making reservation:', error.response?.data || error.message);
      setError(error.response?.data?.non_field_errors?.[0] || 'There was an error making the reservation. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1 >Table Reservation</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="error-message">{error}</div>} {/* Display error messages */}
        <input 
          type="date" 
          name="date" 
          value={reservation.date}
          onChange={handleChange} 
          placeholder="Reservation Date" 
          className="input-field"
          required 
        />
        <input
          type="time"
          name="time"
          value={reservation.time}
          onChange={handleChange}
          placeholder="Reservation Time"
          className="input-field"
          required
        />
        <select
          name="table"
          value={reservation.table}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              Table {table.id} - {table.location} ({table.capacity} seats)
            </option>
          ))}
        </select>
        <input
          type="number"
          name="number_of_people"
          value={reservation.number_of_people}
          onChange={handleChange}
          placeholder="Number of People"
          className="input-field"
          min="1"
          max="10"
          required
        />
        <textarea
          name="special_requests"
          value={reservation.special_requests}
          onChange={handleChange}
          placeholder="Special Requests (Optional)"
          className="input-field textarea-field"
        />
        <button type="submit" className="button-submit">Reserve</button>
      </form>
    </div>
  );
}

export default TableReservation;

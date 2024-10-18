import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Cateringservice.css"; // Import the CSS file
import Navbar from "../other/Navbar";

function Cateringservice() {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState({
    event: "",
    customer_name: "",
    contact_info: "",
    date: "",
    time: "",
    number_of_people: "",
    menu_items: [],
    special_requests: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalCost, setTotalCost] = useState(0); // Add totalCost state

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/menu-items/"
        );
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  //   const handleMenuChange = (e) => {
  //     // Get the selected menu item IDs from the select input
  //     const selectedItems = Array.from(e.target.selectedOptions, option => option.value);

  //     // Calculate the total cost based on the selected IDs
  //     const total = menuItems.reduce((sum, item) => {
  //       // Check if the item's ID is in the selectedItems array
  //       if (selectedItems.includes(String(item.id))) {
  //         return sum + parseFloat(item.price); // Add the price of the selected item
  //       }
  //       return sum; // Otherwise, return the current sum
  //     }, 0);

  //     // Update the order state with the selected menu item IDs and the total cost
  //     console.log('Total Cost:', totalCost);

  //     setOrder({ ...order, menu_items: selectedItems });
  //     setTotalCost(total); // Update total cost
  //   };

  const handleMenuChange = (e) => {
    // Convert the selected menu item IDs to numbers
    const selectedItems = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );

    // Calculate the total cost based on the selected IDs
    const total = menuItems.reduce((sum, item) => {
      if (selectedItems.includes(item.id)) {
        // IDs are numbers, no need for String conversion
        return sum + parseFloat(item.price);
      }
      return sum;
    }, 0);

    setOrder({ ...order, menu_items: selectedItems });
    setTotalCost(total); // Update total cost
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...order,
      status: "pending", // Default status
      total_cost: totalCost,
    };

    console.log("Order Data:", orderData);

    // Ensure at least one menu item is selected
    if (order.menu_items.length === 0) {
      setError("Please select at least one menu item.");
      return;
    }

    try {
      console.log("Order Data:", orderData);
      const response = await axios.post(
        "http://localhost:8000/api/catering-orders/",
        orderData
      );
      console.log("API Response:", response.data);
      setSuccessMessage("Catering order submitted successfully!");
      setError(""); // Clear any previous error messages

      // Reset form fields after submission
      setOrder({
        event: "",
        customer_name: "",
        contact_info: "",
        date: "",
        time: "",
        number_of_people: "",
        menu_items: [], // Reset menu items
        special_requests: "",
      });
      setTotalCost(0); // Reset total cost after submission
    } catch (error) {
      console.error(
        "Error submitting order:",
        error.response?.data || error.message
      );
      setError("There was an error submitting the order. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "#333" }}>Catering Service</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="event"
          value={order.event}
          onChange={handleChange}
          placeholder="Event Type (e.g., Wedding, Party)"
          className="input-field"
          required
        />
        <input
          type="text"
          name="customer_name"
          value={order.customer_name}
          onChange={handleChange}
          placeholder="Your Name"
          className="input-field"
          required
        />
        <input
          type="text"
          name="contact_info"
          value={order.contact_info}
          onChange={handleChange}
          placeholder="Contact Info (Phone/Email)"
          className="input-field"
          required
        />
        <input
          type="date"
          name="date"
          value={order.date}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="time"
          name="time"
          value={order.time}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="number_of_people"
          value={order.number_of_people}
          onChange={handleChange}
          placeholder="Number of People"
          className="input-field"
          min="1"
          required
        />
        <select
          name="menu_items"
          onChange={handleMenuChange}
          multiple
          className="input-field"
          required
        >
          <option value="">Select Menu Items</option>
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
        <textarea
          name="special_requests"
          value={order.special_requests}
          onChange={handleChange}
          placeholder="Special Requests (Optional)"
          className="input-field textarea-field"
        />
        <button type="submit" className="button-submit">
          Submit Order
        </button>
      </form>
      <div className="total-cost">Total Cost: ${totalCost.toFixed(2)}</div>{" "}
      {/* Display total cost */}
    </div>
  );
}

export default Cateringservice;

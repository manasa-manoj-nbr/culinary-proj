
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/other/LoginSignup';
import Homepage from './components/other/Homepage'; 
import Tablereservation from './components/events/Tablereservation'; 
import Fooddelivery from './components/events/Fooddelivery';
import Eventmanagement from './components/events/Eventmanagement';
import Catering from './components/events/Cateringservice';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/table-reservation" element={<Tablereservation />} />
        <Route path="/food-delivery" element={<Fooddelivery />} />
        <Route path="/catering-service" element={<Catering />} />
        <Route path="/event-hall-booking" element={<Eventmanagement />} />
      </Routes>
    </Router>
  );
}

export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/other/LoginSignup';
import Homepage from './components/other/Homepage'; 
import Tablereservation from './components/events/Tablereservation'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/homepage" element={<Homepage />} /> {/* Use Homepage */}
        <Route path="/table-reservation" element={<Tablereservation />} /> {/* Use tablereservation */}
        <Route path="/homepage" element={<Homepage />} /> {/* Use Homepage */}
        <Route path="/homepage" element={<Homepage />} /> {/* Use Homepage */}
        <Route path="/homepage" element={<Homepage />} /> {/* Use Homepage */}
      </Routes>
    </Router>
  );
}

export default App;


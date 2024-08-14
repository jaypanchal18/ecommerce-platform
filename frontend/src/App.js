import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import SellerDashboard from './components/SellerDashboard';
import ProductListing from './components/ProductListing';



function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/addproduct" element={<ProductListing />} />
        
      </Routes>
    </Router>
  );
}

export default App;

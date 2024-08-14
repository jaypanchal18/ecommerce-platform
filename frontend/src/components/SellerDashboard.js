import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const SellerDashboard = () => {
  return (
    <div>
      <Navbar userName="Seller Name" onLogout={() => localStorage.removeItem('token')} />
      <Container>
        <h1>Seller Dashboard</h1>
        {/* Seller-specific content */}
      </Container>
    </div>
  );
};

export default SellerDashboard;

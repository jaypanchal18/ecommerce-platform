import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const BuyerDashboard = () => {
  return (
    <div>
      <Navbar userName="Buyer Name" onLogout={() => localStorage.removeItem('token')} />
      <Container>
        <h1>Buyer Dashboard</h1>
        {/* Buyer-specific content */}
      </Container>
    </div>
  );
};

export default BuyerDashboard;

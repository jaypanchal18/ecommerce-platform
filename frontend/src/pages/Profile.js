// components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user profile and addresses
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get('http://localhost:8000/api/users/profile/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(profileResponse.data);

        const addressResponse = await axios.get('http://localhost:8000/api/users/addresses/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAddresses(addressResponse.data);
      } catch (error) {
        setMessage('Failed to fetch profile data.');
      }
    };
    fetchData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/api/users/profile/', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setErrors(error.response.data);
      setMessage('Failed to update profile.');
    }
  };

  const handleAddAddress = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/addresses/', { address: newAddress }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewAddress('');
      setMessage('Address added successfully!');
      // Fetch updated addresses
      const addressResponse = await axios.get('http://localhost:8000/api/users/addresses/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAddresses(addressResponse.data);
    } catch (error) {
      setMessage('Failed to add address.');
    }
  };

  return (
    <Container>
      <Navbar />
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <form onSubmit={handleProfileUpdate}>
        <TextField
          label="Username"
          value={user.username || ''}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Mobile Number"
          value={user.mobile || ''}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">Update Profile</Button>
      </form>
      <Typography variant="h5" gutterBottom>Manage Addresses</Typography>
      <TextField
        label="New Address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleAddAddress} variant="contained" color="primary">Add Address</Button>
      <div>
        {addresses.map(address => (
          <div key={address.id}>
            <Typography>{address.address}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Profile;

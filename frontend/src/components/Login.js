import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../static/Auth.css'; // Assuming you will use a separate CSS file for Login

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            
            // Fetch user profile to determine the role
            const profileResponse = await axios.get('http://localhost:8000/api/profile/', {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });

            const userRole = profileResponse.data.role;

            // Redirect based on user role
            if (userRole === 'buyer') {
                navigate('/buyer-dashboard');
            } else if (userRole === 'seller') {
                navigate('/seller-dashboard');
            } else {
                setMessage('Invalid role');
            }
        } catch (error) {
            setMessage('Login failed.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className="login-container">
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ color: 'black' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: '#fff' }
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: '#fff' }
                                }}
                                InputProps={{
                                    style: { color: '#fff' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        {message && (
                            <Grid item xs={12}>
                                <Typography color="error" align="center" style={{ marginTop: '20px' }}>
                                    {message}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </form>
                <Typography align="center" style={{ marginTop: '20px' }}>
                    Don't have an account?{' '}
                    <Link href="/" variant="body2" style={{ color: '#3f51b5' }}>
                        Register
                    </Link>
                </Typography>
            </div>
        </Container>
    );
};

export default Login;

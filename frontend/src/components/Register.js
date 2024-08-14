import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../static/Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState(''); // Start with an empty role
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
                email,
                mobile,
                role
            });
            setMessage('Registration successful!');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                setMessage('Registration failed.');
            } else {
                setMessage('An error occurred.');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className="register-container">
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Register
                </Typography>
                
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Select Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label="Select Role"
                    >
                        <MenuItem value="buyer">Buyer</MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>
                    </Select>
                </FormControl>

                {/* Conditionally render the registration form based on role selection */}
                {role && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Mobile Number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.mobile}
                                    helperText={errors.mobile}
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
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Register as {role.charAt(0).toUpperCase() + role.slice(1)}
                                </Button>
                            </Grid>
                            {message && (
                                <Grid item xs={12}>
                                    <Typography color={errors ? 'error' : 'success'} align="center" style={{ marginTop: '20px' }}>
                                        {message}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                )}

                <Typography align="center" style={{ marginTop: '20px', color: 'black' }}>
                    Already have an account?{' '}
                    <Link href="/login" variant="body2" style={{ color: '#3f51b5' }}>
                        Login
                    </Link>
                </Typography>
            </div>
        </Container>
    );
};

export default Register;

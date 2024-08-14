// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:8000/api/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Product added successfully!');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                setMessage('Failed to add product.');
            } else {
                setMessage('An error occurred.');
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4">Add Product</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextField label="Price" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
                <TextField label="Category" fullWidth value={category} onChange={(e) => setCategory(e.target.value)} />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <Button type="submit" variant="contained" color="primary">Add Product</Button>
                {message && <Typography color={errors ? 'error' : 'success'}>{message}</Typography>}
            </form>
        </Container>
    );
};

export default AddProduct;

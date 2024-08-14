// src/components/SellerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Fetch seller's products
        axios.get('http://localhost:8000/api/products/seller-products/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:8000/api/products/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            // Refresh products
            const response = await axios.get('http://localhost:8000/api/products/seller-products/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Seller Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Category ID"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="h5" style={{ marginTop: '20px' }}>Your Products</Typography>
            {products.map(product => (
                <div key={product.id}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography>${product.price}</Typography>
                </div>
            ))}
        </Container>
    );
};

export default SellerDashboard;

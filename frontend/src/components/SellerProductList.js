import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', image: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/products/', newProduct, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Product added successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Failed to add product.');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Seller Dashboard</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" label="Name" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="description" label="Description" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="price" label="Price" type="number" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="category" label="Category" onChange={handleChange} fullWidth margin="normal" />
                <TextField name="image" label="Image URL" onChange={handleChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Add Product</Button>
                {message && <Typography>{message}</Typography>}
            </form>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {products.map(product => (
                    <Grid item xs={12} md={4} key={product.id}>
                        <Card>
                            <CardMedia component="img" image={product.image} alt={product.name} />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>${product.price}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SellerDashboard;

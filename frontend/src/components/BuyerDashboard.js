import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const BuyerDashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = (productId) => {
        // Add product to cart logic
        console.log(`Product ${productId} added to cart`);
    };

    return (
        <Container>
            <Typography variant="h4">Buyer Dashboard</Typography>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {products.map(product => (
                    <Grid item xs={12} md={4} key={product.id}>
                        <Card>
                            <CardMedia component="img" image={product.image} alt={product.name} />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>${product.price}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BuyerDashboard;

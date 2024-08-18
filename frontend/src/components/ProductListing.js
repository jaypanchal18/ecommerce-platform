import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Product Listing
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h6">Categories</Typography>
                    <Button onClick={() => setSelectedCategory('')}>All</Button>
                    {categories.map(category => (
                        <Button key={category.id} onClick={() => setSelectedCategory(category.id)}>
                            {category.name}
                        </Button>
                    ))}
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        {filteredProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`http://localhost:8000${product.image}`}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body2">{product.description}</Typography>
                                        <Typography variant="body1">${product.price}</Typography>
                                    </CardContent>
                                    <Button>Add to Cart</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductListing;

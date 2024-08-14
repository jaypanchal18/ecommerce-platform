import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function SellerDashboard() {
  // State for product form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Changed to handle file
  const [editingProductId, setEditingProductId] = useState(null);
  const [productErrors, setProductErrors] = useState({});

  // State for the product list
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', severity: '' });

  // Fetch products from the server
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/products/products/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle product submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductErrors({});
    setNotification({ message: '', severity: '' });

    let validationErrors = {};
    if (!name) validationErrors.name = 'Product name is required';
    if (!price) validationErrors.price = 'Price is required';
    if (!category) validationErrors.category = 'Category is required';

    if (Object.keys(validationErrors).length > 0) {
      setProductErrors(validationErrors);
      return;
    }

    const data = { name, description, price, category };
    const token = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      if (editingProductId) {
        await axios.put(`http://localhost:8000/api/products/products/${editingProductId}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setNotification({ message: 'Product updated successfully', severity: 'success' });
        setEditingProductId(null);
      } else {
        await axios.post('http://localhost:8000/api/products/products/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setNotification({ message: 'Product added successfully', severity: 'success' });
      }

      // Clear the form fields
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null); // Clear the image
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
      setNotification({ message: 'Error submitting product', severity: 'error' });
    }
  };

  // Handle edit and delete actions
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setImage(null); // Keep this as null to avoid using old image
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setNotification({ message: 'No token found', severity: 'error' });
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/products/products/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ message: 'Product deleted successfully', severity: 'success' });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setNotification({ message: 'Error deleting product', severity: 'error' });
    }
  };

  

  return (
    <Container maxWidth="lg" className="product-container">
      <Typography variant="h4" align="center" gutterBottom>
        Seller Dashboard - Product Management
      </Typography>

      <Box className="form-container">
        <Typography variant="h6" gutterBottom>
          {editingProductId ? 'Edit Product' : 'Add Product'}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleProductSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={!!productErrors.name}
                helperText={productErrors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                error={!!productErrors.price}
                helperText={productErrors.price}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                error={!!productErrors.category}
                helperText={productErrors.category}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingProductId ? 'Update Product' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.image && (
                        <img
                          src={`http://localhost:8000${product.image}`}
                          alt={product.name}
                          style={{ width: '100px', height: '100px' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditProduct(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Snackbar
        open={notification.message !== ''}
        autoHideDuration={6000}
        onClose={() => setNotification({ message: '', severity: '' })}
      >
        <Alert onClose={() => setNotification({ message: '', severity: '' })} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SellerDashboard;

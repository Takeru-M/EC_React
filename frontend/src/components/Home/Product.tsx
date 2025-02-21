import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from '@mui/material';
import { Product } from '../../redux/products/type';

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating.rate} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating.count})
            </Typography>
          </Box>
          {/* <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
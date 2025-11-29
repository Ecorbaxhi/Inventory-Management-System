import React from 'react';
import { Autocomplete, TextField, Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Product } from '../../types';

interface ProductSelectorProps {
    products: Product[];
    selectedProduct: Product | null;
    onProductSelect: (product: Product | null) => void;
    onAddNewProduct: () => void;
    loading?: boolean;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
    products,
    selectedProduct,
    onProductSelect,
    onAddNewProduct,
    loading = false,
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Autocomplete
                fullWidth
                options={products}
                getOptionLabel={(option) => `${option.name} (${option.unit}) - ${option.category}`}
                value={selectedProduct}
                onChange={(_, newValue) => onProductSelect(newValue)}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Products"
                        placeholder="Type to search..."
                        variant="outlined"
                    />
                )}
                sx={{ flexGrow: 1 }}
            />
            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={onAddNewProduct}
                sx={{ height: 56, whiteSpace: 'nowrap' }}
            >
                Add New Product
            </Button>
        </Box>
    );
};

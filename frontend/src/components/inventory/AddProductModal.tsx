import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box,
    CircularProgress,
} from '@mui/material';
import { Product } from '../../types';

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (product: Omit<Product, 'id' | 'isActive'>) => Promise<void>;
}

const CATEGORIES = [
    'Vegetables',
    'Meats',
    'Seafood',
    'Dairy',
    'Grains',
    'Oils',
    'Condiments',
    'Herbs',
    'Sauces',
    'Beverages',
];

const UNITS = ['kg', 'liters', 'pieces', 'bottles', 'bunches'];

export const AddProductModal: React.FC<AddProductModalProps> = ({
    open,
    onClose,
    onAdd,
}) => {
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('kg');
    const [category, setCategory] = useState('Vegetables');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onAdd({ name, unit, category });
            // Reset form
            setName('');
            setUnit('kg');
            setCategory('Vegetables');
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setName('');
            setUnit('kg');
            setCategory('Vegetables');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Product</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        select
                        label="Unit Type"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    >
                        {UNITS.map((u) => (
                            <MenuItem key={u} value={u}>
                                {u}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {CATEGORIES.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !name.trim()}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Product'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { OrderItem } from '../../types';
import { EmptyState } from '../common/EmptyState';

interface OrderTableProps {
    items: OrderItem[];
    onQuantityChange: (index: number, quantity: number) => void;
    onRemoveItem: (index: number) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
    items,
    onQuantityChange,
    onRemoveItem,
}) => {
    if (items.length === 0) {
        return (
            <EmptyState
                icon={ShoppingCart}
                title="No items in order"
                description="Start by selecting products from the dropdown above"
            />
        );
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Product</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Unit</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Quantity</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:hover': { backgroundColor: 'action.hover' },
                                transition: 'background-color 0.2s',
                            }}
                        >
                            <TableCell>
                                <Typography variant="body1" fontWeight={500}>
                                    {item.productName}
                                </Typography>
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => onQuantityChange(index, Number(e.target.value))}
                                    inputProps={{ min: 1, step: 1 }}
                                    size="small"
                                    sx={{ width: 100 }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="error"
                                    onClick={() => onRemoveItem(index)}
                                    aria-label="remove item"
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ p: 2, backgroundColor: 'background.paper', textAlign: 'right' }}>
                <Typography variant="h6" color="text.primary">
                    Total Items: {items.length}
                </Typography>
            </Box>
        </TableContainer>
    );
};

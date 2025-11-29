import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    Box,
    Typography,
    Chip,
} from '@mui/material';
import { Edit, Archive, Save, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Product } from '../../types';
import { inventoryService } from '../../services/inventoryService';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { LoadingSkeleton } from '../common/LoadingSkeleton';

export const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
    const [productToArchive, setProductToArchive] = useState<string | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await inventoryService.getProducts();
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setEditForm(product);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSaveEdit = async () => {
        if (!editingId || !editForm.name?.trim()) {
            toast.error('Product name is required');
            return;
        }

        try {
            await inventoryService.updateProduct(editingId, editForm);
            setProducts(products.map(p => p.id === editingId ? { ...p, ...editForm } : p));
            toast.success('Product updated successfully');
            handleCancelEdit();
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    const handleArchiveClick = (productId: string) => {
        setProductToArchive(productId);
        setArchiveDialogOpen(true);
    };

    const handleArchiveConfirm = async () => {
        if (!productToArchive) return;

        try {
            await inventoryService.archiveProduct(productToArchive);
            setProducts(products.filter(p => p.id !== productToArchive));
            toast.success('Product archived successfully');
        } catch (error) {
            toast.error('Failed to archive product');
        } finally {
            setArchiveDialogOpen(false);
            setProductToArchive(null);
        }
    };

    if (loading) {
        return <LoadingSkeleton variant="table" count={5} />;
    }

    return (
        <>
            <Paper elevation={2}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight={600}>
                        Product Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Edit or archive products in your inventory
                    </Typography>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Product Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Unit</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                                >
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <TextField
                                                size="small"
                                                value={editForm.name || ''}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                fullWidth
                                            />
                                        ) : (
                                            <Typography fontWeight={500}>{product.name}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <TextField
                                                size="small"
                                                value={editForm.unit || ''}
                                                onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                                                sx={{ width: 100 }}
                                            />
                                        ) : (
                                            product.unit
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === product.id ? (
                                            <TextField
                                                size="small"
                                                value={editForm.category || ''}
                                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                sx={{ width: 150 }}
                                            />
                                        ) : (
                                            product.category
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.isActive ? 'Active' : 'Archived'}
                                            color={product.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {editingId === product.id ? (
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <IconButton color="primary" onClick={handleSaveEdit} size="small">
                                                    <Save />
                                                </IconButton>
                                                <IconButton onClick={handleCancelEdit} size="small">
                                                    <Cancel />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(product)}
                                                    size="small"
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleArchiveClick(product.id)}
                                                    size="small"
                                                >
                                                    <Archive />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <ConfirmDialog
                open={archiveDialogOpen}
                title="Archive Product"
                message="Are you sure you want to archive this product? It will no longer appear in the product list."
                onConfirm={handleArchiveConfirm}
                onCancel={() => {
                    setArchiveDialogOpen(false);
                    setProductToArchive(null);
                }}
                confirmText="Archive"
                confirmColor="error"
            />
        </>
    );
};

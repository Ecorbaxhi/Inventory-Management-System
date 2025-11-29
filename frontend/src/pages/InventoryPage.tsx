import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Product, OrderItem } from '../types';
import { inventoryService } from '../services/inventoryService';
import { ProductSelector } from '../components/inventory/ProductSelector';
import { OrderTable } from '../components/inventory/OrderTable';
import { AddProductModal } from '../components/inventory/AddProductModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { saveDraftOrder, getDraftOrder, removeDraftOrder } from '../utils/localStorage';

export const InventoryPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    // Load products and draft order on mount
    useEffect(() => {
        loadProducts();
        loadDraftOrder();
    }, []);

    // Save draft order whenever it changes
    useEffect(() => {
        if (orderItems.length > 0) {
            saveDraftOrder(orderItems);
        }
    }, [orderItems]);

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

    const loadDraftOrder = () => {
        const draft = getDraftOrder();
        if (draft && Array.isArray(draft)) {
            setOrderItems(draft);
            toast.info('Draft order restored');
        }
    };

    const handleProductSelect = (product: Product | null) => {
        if (product) {
            // Check if product already in order
            const exists = orderItems.find(item => item.productId === product.id);
            if (exists) {
                toast.warning('Product already in order');
                return;
            }

            // Add to order with default quantity
            const newItem: OrderItem = {
                productId: product.id,
                productName: product.name,
                quantity: 1,
                unit: product.unit,
            };

            setOrderItems([...orderItems, newItem]);
            setSelectedProduct(null);
            toast.success(`${product.name} added to order`);
        }
    };

    const handleQuantityChange = (index: number, quantity: number) => {
        if (quantity < 1) return;

        const updated = [...orderItems];
        updated[index].quantity = quantity;
        setOrderItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        const updated = orderItems.filter((_, i) => i !== index);
        setOrderItems(updated);
        toast.info('Item removed from order');
    };

    const handleAddProduct = async (product: Omit<Product, 'id' | 'isActive'>) => {
        try {
            const newProduct = await inventoryService.addProduct(product);
            setProducts([...products, newProduct]);
            toast.success(`${newProduct.name} added to product list`);
        } catch (error) {
            toast.error('Failed to add product');
        }
    };

    const handleSubmitOrder = async () => {
        setConfirmDialogOpen(false);
        setSubmitting(true);

        try {
            await inventoryService.createOrder(orderItems);
            toast.success('Order submitted successfully!');
            setOrderItems([]);
            removeDraftOrder();
        } catch (error) {
            toast.error('Failed to submit order');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <LoadingSkeleton variant="table" count={5} />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                    Weekly Inventory Order
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Select products and quantities for this week's order
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <ProductSelector
                        products={products}
                        selectedProduct={selectedProduct}
                        onProductSelect={handleProductSelect}
                        onAddNewProduct={() => setAddProductModalOpen(true)}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <OrderTable
                        items={orderItems}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOrderItems([]);
                            removeDraftOrder();
                            toast.info('Order cleared');
                        }}
                        disabled={orderItems.length === 0 || submitting}
                    >
                        Clear Order
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                        onClick={() => setConfirmDialogOpen(true)}
                        disabled={orderItems.length === 0 || submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Order'}
                    </Button>
                </Box>
            </Paper>

            <AddProductModal
                open={addProductModalOpen}
                onClose={() => setAddProductModalOpen(false)}
                onAdd={handleAddProduct}
            />

            <ConfirmDialog
                open={confirmDialogOpen}
                title="Confirm Order Submission"
                message={`Are you sure you want to submit this order with ${orderItems.length} items? This action cannot be undone.`}
                onConfirm={handleSubmitOrder}
                onCancel={() => setConfirmDialogOpen(false)}
                confirmText="Submit Order"
                confirmColor="primary"
            />
        </Container>
    );
};

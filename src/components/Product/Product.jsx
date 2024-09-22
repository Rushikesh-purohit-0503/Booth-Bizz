import React, { useState, useEffect } from 'react';

import AddProductPopup from './popup/AddProductPopup';
import DeleteProductPopup from './popup/DeleteProductPopup';
import EditProductPopup from './popup/EditProductPopup';
import Left from '../ExpenseTracker/Left'; 
import RightProduct from './RightProduct'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Product() {
    const [products, setProducts] = useState([
        { name: 'Product 1', price: 100, quantity: 10 },
        { name: 'Product 2', price: 200, quantity: 20 },
    ]);
    const reduxProduct = useSelector(state => state.product);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate()
    const authStatus = useSelector((state) => (state.auth.status))
    useEffect(() => {
        if (!authStatus) {
            navigate('/signin')
        }
    }, [authStatus, navigate])
    // Save products to localStorage whenever the products state changes
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
    // Retrieve products from localStorage on component mount
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);



    const handleAddProduct = (data) => {
        const newProducts = [...products, data];
        setProducts(newProducts);
        setIsPopupOpen(false);  // Close the Add Product popup
    };

    const handleEditProduct = (data) => {
        const updatedProducts = products.map((product) =>
            product.name === editingProduct.name ? data : product
        );
        setProducts(updatedProducts);
        setIsEditPopupOpen(false);  // Close the Edit Product popup
        setEditingProduct(null);
    };

    const handleDeleteProduct = () => {
        const updatedProducts = products.filter((product) => product !== productToDelete);
        setProducts(updatedProducts);
        setIsDeletePopupOpen(false);  // Close the Delete Product popup
        setProductToDelete(null);
    };

    const openEditPopup = (product) => {
        setEditingProduct(product);
        setIsEditPopupOpen(true);
    };

    const openDeletePopup = (product) => {
        setProductToDelete(product);
        setIsDeletePopupOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-pink-50 p-6">
            <Left onStallClick={() => navigate('/stall-details')} onProductClick={() => navigate('/product')} onClickExpensetaker={() => (navigate('/expense-tracker'))} />
            <RightProduct
                products={products}
                onAddProduct={() => setIsPopupOpen(true)}
                onEditProduct={openEditPopup}
                onDeleteProduct={openDeletePopup}
                onStartPOS={() => (navigate('/pos'))}
            />
            {/* Popups */}
            {isPopupOpen && (
                <AddProductPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={handleAddProduct}
                />
            )}
            {isEditPopupOpen && (
                <EditProductPopup
                    isOpen={isEditPopupOpen}
                    onClose={() => setIsEditPopupOpen(false)}
                    onSubmit={handleEditProduct}
                    existingData={editingProduct}
                />
            )}
            {isDeletePopupOpen && (
                <DeleteProductPopup
                    isOpen={isDeletePopupOpen}
                    onClose={() => setIsDeletePopupOpen(false)}
                    onConfirm={handleDeleteProduct}
                />
            )}
        </div>
    );
}

export default Product;

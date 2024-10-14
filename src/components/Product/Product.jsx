import React, { useState, useEffect } from 'react';

import AddProductPopup from './popup/AddProductPopup';
import DeleteProductPopup from './popup/DeleteProductPopup';
import EditProductPopup from './popup/EditProductPopup';
import Left from '../ExpenseTracker/Left'; 
import RightProduct from './RightProduct'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts as reduxsetProducts,addProduct,editProduct,deleteProduct } from '../../store/productSlice';
function Product() {
    const [products, setProducts] = useState([
        { name: 'Product 1', price: 100, quantity: 10 },
        { name: 'Product 2', price: 200, quantity: 20 },
    ]);
    const dispatch = useDispatch()
    const reduxProducts = useSelector(state => state.product);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate()
    const authStatus = useSelector((state) => (state.auth.status))
    const stall = useSelector((state)=>state.stall)
    useEffect(() => {
        if (!authStatus) {
            navigate('/signin')
        }
    }, [authStatus, navigate])




    // Save products to localStorage whenever the products state changes
 


    // Retrieve products from localStorage on component mount
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            dispatch(reduxsetProducts(JSON.parse(storedProducts)))
        }
    }, [dispatch]);
        
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(reduxProducts));
    }, [reduxProducts]);


    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    const handleAddProduct = (data) => {
        const newProducts = [...products, data];
        dispatch(addProduct(data))
        setProducts(newProducts);
        setIsPopupOpen(false);  // Close the Add Product popup
    };

    const handleEditProduct = (data) => {
        const updatedProducts = products.map((product) =>
            product.name === editingProduct.name ? data : product
        );
        dispatch(editProduct(data))
        setProducts(updatedProducts);
        setIsEditPopupOpen(false);  // Close the Edit Product popup
        setEditingProduct(null);
    };

    const handleDeleteProduct = () => {
        const updatedProducts = products.filter((product) => product !== productToDelete);
        dispatch(deleteProduct(productToDelete))
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

    const totalAmount = products.reduce((total, product) => (total + Number(product.price)), 0);
    
    return (
        <div className="flex min-h-screen bg-pink-50 p-6">
            <Left stallName={stall.stall.name} onStallClick={() => navigate('/stall-details')} onClickSalesAnalysis={()=>(navigate('/sales-analysis'))} onProductClick={() => navigate('/product')} onClickExpensetaker={() => (navigate('/expense-tracker'))} />
            <RightProduct
                products={products}
                onAddProduct={() => setIsPopupOpen(true)}
                onEditProduct={openEditPopup}
                onDeleteProduct={openDeletePopup}
                onStartPOS={() => (navigate('/pos'))}
                totalAmount={totalAmount}
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

import React, { useState, useEffect, useMemo } from 'react';
import AddProductPopup from './popup/AddProductPopup';
import DeleteProductPopup from './popup/DeleteProductPopup';
import EditProductPopup from './popup/EditProductPopup';
import Left from '../ExpenseTracker/Left'; 
import RightProduct from './RightProduct'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts as reduxsetProducts, addProduct, editProduct, deleteProduct } from '../../store/productSlice';
import StallManagement from '../../firebase/Backend/stallManagement'; // Import StallManagement

function Product() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const reduxProducts = useSelector(state => state.product);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => (state.auth.status));
    const stall = useSelector((state) => state.stall.clickedStall);
    const user = useSelector((state) => state.auth.userData);

    const stallManagement =useMemo(()=> new StallManagement({uid:user.uid}),[user.uid]) // Ensure to pass the user

    useEffect(() => {
        if (!authStatus) {
            navigate('/signin');
        }
    }, [authStatus, navigate]);

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await stallManagement.getProducts(stall.id);
                setProducts(fetchedProducts);
                dispatch(reduxsetProducts(fetchedProducts)); // Update Redux state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [dispatch, stallManagement, stall.id]);

    // Sync Redux state with localStorage
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(reduxProducts));
    }, [reduxProducts]);

    const handleAddProduct = async (data) => {
        try {
            await stallManagement.addProduct(stall.id, data);
            dispatch(addProduct(data));
            setProducts([...products, data]);
            setIsPopupOpen(false);  // Close the Add Product popup
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleEditProduct = async (data) => {
        try {
            const productId = editingProduct.id; // Get the ID of the editing product
            await stallManagement.updateProduct(stall.id, productId, data);
            dispatch(editProduct(data));
            const updatedProducts = products.map((product) =>
                product.name === editingProduct.name ? data : product
            );
            setProducts(updatedProducts);
            setIsEditPopupOpen(false);  // Close the Edit Product popup
            setEditingProduct(null);
        } catch (error) {
            console.error("Error editing product:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const productId = productToDelete.id; // Get the ID of the product to delete
            await stallManagement.deleteProduct(stall.id, productId);
            dispatch(deleteProduct(productToDelete));
            const updatedProducts = products.filter((product) => product !== productToDelete);
            setProducts(updatedProducts);
            setIsDeletePopupOpen(false);  // Close the Delete Product popup
            setProductToDelete(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
            <Left 
                stallName={stall.stallName} 
                onStallClick={() => navigate('/stall-details')} 
                onClickSalesAnalysis={() => navigate('/sales-analysis')} 
                onProductClick={() => navigate('/product')} 
                onClickExpensetaker={() => (navigate('/expense-tracker'))} 
            />
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

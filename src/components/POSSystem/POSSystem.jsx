import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Left from '../ExpenseTracker/Left';
import RightPOS from './RightPOS';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProductQuantity } from '../../store/productSlice';
function POSSystem() {





  const navigate = useNavigate()
  const authStatus = useSelector((state) => (state.auth.status))
  const stall = useSelector((state) => (state.stall))

  const [customerName, setCustomerName] = useState("")
  const reduxProducts = useSelector((state) => state.product)
  


  
  const dispatch = useDispatch()
  useEffect(() => {
    if (!authStatus) {
      navigate('/signin')
    }
  }, [authStatus, navigate])

  useEffect(() => {
    reduxProducts.forEach(product => {
      dispatch(updateProductQuantity({ name: product.name, quantity: 0 }));
    });
  }, [dispatch]);
  const handleConfirmSale = () => {

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Create a unique transaction ID based on the current timestamp

    // Save the Sale Data For Sale-Analysis
    const saleData = {
      transactionId, // Assign the unique transactionId to the entire sale
      customerName,
      products: reduxProducts.map(product => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        sales: product.price * product.quantity,
      }))
    };

    // Save the saleData to allSalesData in localStorage
    let allSalesData = JSON.parse(localStorage.getItem('allSalesData')) || [];
    allSalesData.push(saleData);
    localStorage.setItem('allSalesData', JSON.stringify(allSalesData));

    // Resetting the reduxProduct quantity to 0
    reduxProducts.forEach(product => {
      dispatch(updateProductQuantity({ name: product.name, quantity: 0 }));
     setCustomerName("")
    });
  };


  // Effect to store customer name in local storage
  useEffect(() => {
    localStorage.setItem('customerName', customerName);
  }, [customerName]);



  const handleOnchange = (e) => {
    setCustomerName(e.target.value)
  }

  const incrementQuantity = (product) => {
    dispatch(updateProductQuantity({ name: product.name, quantity: Number(product.quantity) + 1 }));
  };

  const decrementQuantity = (product) => {
    dispatch(updateProductQuantity({ name: product.name, quantity: product.quantity - 1 }));
  };
  
  const totalAmount = reduxProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 ">
      <Left stallName={stall.name} onStallClick={() => (navigate('/stall-details'))} onClickSalesAnalysis={() => (navigate('/sales-analysis'))} onClickExpensetaker={() => (navigate('/expense-tracker'))} onProductClick={() => (navigate('/product'))} />
      <RightPOS
      
        products={reduxProducts}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalAmount={totalAmount}
        onConfirmSale={handleConfirmSale}
        onChange={handleOnchange}
        customerName={customerName}
      />
    </div>
  );
}

export default POSSystem;

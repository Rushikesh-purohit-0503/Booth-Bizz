import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../ExpenseTracker/Left'; 
import RightPOS from './RightPOS';
import { useSelector } from 'react-redux';

function POSSystem() {


 

  const [products, setProducts] = useState([
    { name: 'Product 1', price: 100, quantity: 0 },
    { name: 'Product 2', price: 200, quantity: 0},
  ]);
  const navigate=useNavigate()
  const authStatus=useSelector((state)=>(state.auth.status))
  const[customerName,setCustomerName]=useState("")


  useEffect(()=>{
    if (!authStatus){
        navigate('/signin')
    }
},[authStatus,navigate])


    const handleOnchange = (e)=>{
        setCustomerName(e.target.value)
    }
  
  const incrementQuantity = (product) => {
    const updatedProducts = products.map(p =>
      p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
    );
    setProducts(updatedProducts);
  };

  const decrementQuantity = (product) => {
    const updatedProducts = products.map(p =>
      p.name === product.name && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
    );
    setProducts(updatedProducts);
  };

  const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 ">
      <Left onStallClick={()=>(navigate('/stall-details'))} onClickSalesAnalysis={()=>(navigate('/sales-analysis'))} onClickExpensetaker={()=>(navigate('/expense-tracker'))} onProductClick={()=>(navigate('/product'))} />
      <RightPOS
        products={products}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalAmount={totalAmount}
        onConfirmSale={() => alert("It's Sold")}
        onChange={handleOnchange}
        customerName={customerName}
      />
    </div>
  );
}

export default POSSystem;

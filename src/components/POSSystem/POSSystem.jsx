import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Left from '../ExpenseTracker/Left';
import RightPOS from './RightPOS';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProductQuantity } from '../../store/productSlice';
import Modal from 'react-modal';

function POSSystem() {

  const navigate = useNavigate()
  const authStatus = useSelector((state) => (state.auth.status))
  const stall = useSelector((state) => (state.stall.clickedStall))

  const reduxProducts = useSelector((state) => state.product)
  const [customerName, setCustomerName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)



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

    const hasIncrementedProduct = reduxProducts.some(product => product.quantity > 0);

    if (!customerName || !hasIncrementedProduct) {
      alert("Please enter a customer name and increment the quantity of at least one product before checking out.");
      return;
    }
    setIsModalOpen(true);
  };

  const confirmSale = () => {

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
    setCustomerName("")
    setIsModalOpen(false)
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
    if (product.quantity > 0) {
      dispatch(updateProductQuantity({ name: product.name, quantity: product.quantity - 1 }));
    }
  };

  const totalAmount = reduxProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 ">
      <Left
        stallName={stall.stallName}
        onStallClick={() => (navigate('/stall-details'))}
        onClickSalesAnalysis={() => (navigate('/sales-analysis'))}
        onClickExpensetaker={() => (navigate('/expense-tracker'))}
        onProductClick={() => (navigate('/product'))}
      />


      <RightPOS

        products={reduxProducts}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalAmount={totalAmount}
        onConfirmSale={handleConfirmSale}
        onChange={handleOnchange}
        customerName={customerName}
      />

      <Modal

        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Confirm Sale'
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('root')}>

        <h2 className="text-xl font-bold mb-4">Confirm Sale</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Customer Name: {customerName}</h3>
          <h3 className="font-semibold">Total Amount: &#8377; {totalAmount}</h3>
          <ul>
            {reduxProducts.map((product, index) => (
              <li key={index}>
                {product.name} - Quantity: {product.quantity} - Amount: &#8377; {product.price * product.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-300 text-black py-2 px-4 rounded hover:bg-red-400 transition duration-300 mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-300 text-black py-2 px-4 rounded hover:bg-green-400 transition duration-300"
            onClick={confirmSale}
          >
            Confirm
          </button>
        </div>

      </Modal>
      <style jsx>{`
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    z-index: 1000;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    z-index: 999;
  }
`}</style>

    </div>
  );
}

export default POSSystem;

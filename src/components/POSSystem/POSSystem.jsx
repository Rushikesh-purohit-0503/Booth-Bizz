import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Left from '../ExpenseTracker/Left';
import RightPOS from './RightPOS';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, updateProductQuantity } from '../../store/productSlice';
import Modal from 'react-modal';
import StallManagement from '../../firebase/Backend/stallManagement';
import '../../styles/Pospopup.css';

function POSSystem() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => (state.auth.status));
  const stall = useSelector((state) => (state.stall.clickedStall));
  const reduxProducts = useSelector((state) => state.product);
  const [customerName, setCustomerName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const stallManagement = useMemo(() => new StallManagement({ uid: user.uid }), [user.uid]);

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
        dispatch(setProducts(fetchedProducts)); // Set products in the Redux store
        fetchedProducts.forEach(product => {
          dispatch(updateProductQuantity({ name: product.name, quantity: 0 })); // Initialize quantities
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch, stallManagement, stall.id]);

  const handleConfirmSale = () => {
    const hasIncrementedProduct = reduxProducts.some(product => product.quantity > 0);
    if (!customerName || !hasIncrementedProduct) {
      alert("Please enter a customer name or increment the quantity of at least one product before checking out.");
      return;
    }
    setIsModalOpen(true);
  };

  const totalAmount = reduxProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  const confirmSale = async () => {
  
    const saleData = {
      customerName,
      totalAmount,
      products: reduxProducts.map(product => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        sales: product.price * product.quantity,
      })),
    };
  
    try {
      // Only proceed if customerName and at least one product quantity is valid
      if (!customerName || reduxProducts.every(product => product.quantity === 0)) {
        alert("Please enter a valid customer name and ensure at least one product has been selected.");
        return; // Prevent sale confirmation
      }
  
      // Check stock availability before adding to POS
      for (const product of reduxProducts) {
        const originalProduct = await stallManagement.getProducts(stall.id).then(products => products.find(p => p.name === product.name));
        const stockUpdate = originalProduct.quantity - product.quantity;
  
        if (stockUpdate < 0) {
          alert(`${product.name} is out of stock!`);
          return; // Prevent proceeding with sale
        }
      }
  
      // Proceed to add the sale data if all checks are passed
      await stallManagement.addPOS(stall.id, saleData); // Save the sale data
  
      // Update the backend stock after checkout
      for (const product of reduxProducts) {
        const originalProduct = await stallManagement.getProducts(stall.id).then(products => products.find(p => p.name === product.name));
        const stockUpdate = originalProduct.quantity - product.quantity;
  
        // Update product quantity in the backend using originalProduct.id
        await stallManagement.updateProduct(stall.id, originalProduct.id, { quantity: stockUpdate });
      }
  
      // Resetting the reduxProduct quantity to 0
      reduxProducts.forEach(product => {
        dispatch(updateProductQuantity({ name: product.name, quantity: 0 }));
      });
      setCustomerName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving sale data:", error);
    }
  };
  

  useEffect(() => {
    localStorage.setItem('customerName', customerName);
  }, [customerName]);

  const handleOnChange = (e) => {
    setCustomerName(e.target.value);
  };

  const incrementQuantity = async (product) => {
    const originalProduct = await stallManagement.getProducts(stall.id).then(products => products.find(p => p.name === product.name));
    
    if (originalProduct.quantity > 0) {
      const updatedQuantity = product.quantity + 1;
      dispatch(updateProductQuantity({ name: product.name, quantity: updatedQuantity }));
    } else {
      alert(`${product.name} is out of stock!`);
    }
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      dispatch(updateProductQuantity({ name: product.name, quantity: updatedQuantity }));
    }
  };

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
        onConfirmSale={handleConfirmSale}
        onChange={handleOnChange}
        customerName={customerName}
        totalAmount={totalAmount}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Confirm Sale'
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('root')}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Sale</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Customer Name: {customerName}</h3>
          <h3 className="font-semibold">Total Amount: &#8377; {reduxProducts.reduce((total, product) => total + (product.price * product.quantity), 0)}</h3>
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
    </div>
  );
}

export default POSSystem;

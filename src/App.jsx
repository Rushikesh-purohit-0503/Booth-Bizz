import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { login, logout } from './store/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from './firebase/conf'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/AuthLayouts/Signin';
import { setProducts } from './store/productSlice'
import { useLocation } from 'react-router-dom';
import SignUp from './components/AuthLayouts/Signup';
import HomePage from './components/HomePage';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker'
import Dashboard from './components/Dashboard/Dashboard'
import { setStallName } from './store/stallnameSlice'
import EventPage from './components/Event/EventPage'
import Product from './components/Product/Product'
import POSSystem from './components/POSSystem/POSSystem'
import SalesAnalysis from './components/SalesAnalysis/SalesAnalysis'
import StallDetails from './components/Dashboard/stall-details/StallDetails'
import ContactUs from './components/Contact/ContactUs'



function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);
//set userData
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(login({ userData: { uid, email, userName: displayName } }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);
//set stall
  useEffect(() => {
    const storedStall = localStorage.getItem('stall');
    if (storedStall) {
      dispatch(setStallName(JSON.parse(storedStall)));
    }
  }, [dispatch]);

// set products
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts))); // Set products in Redux state
    }
  }, [dispatch]);




  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }


  return (
    <div>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stall-details" element={<StallDetails />} />
        <Route path="/events" element={<EventPage />} />
        <Route path='/product' element={<Product />} />
        <Route path='/pos' element={<POSSystem />} />
        <Route path='/sales-analysis' element={<SalesAnalysis />} />
        <Route path='/contact-us' element={<ContactUs/>}/>
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}



function App() {


  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

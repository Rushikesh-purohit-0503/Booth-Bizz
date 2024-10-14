import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { auth } from './firebase/conf'; // Replace with Appwrite service if needed
import { onAuthStateChanged } from 'firebase/auth';
import Header  from './components/Header/Header'; // Assuming you grouped components like this
import SignIn from './components/AuthLayouts/Signin';
import SignUp from './components/AuthLayouts/Signup';
import HomePage from './components/HomePage';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
import Dashboard from './components/Dashboard/Dashboard';
import EventPage from './components/Event/EventPage';
import Product from './components/Product/Product';
import POSSystem from './components/POSSystem/POSSystem';
import SalesAnalysis from './components/SalesAnalysis/SalesAnalysis';
import StallDetails from './components/Dashboard/stall-details/StallDetails';
import ContactUs from './components/Contact/ContactUs';
import EventDetail from './components/Event/EventDetails';
import AllStallsAnalysis from './components/OverallAnalysis/AllStallAnalysis';
import { setProducts } from './store/productSlice';

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  // Handle Authentication State
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

  // Load Products from Local Storage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts)));
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>; // Placeholder loading screen

  return (
    <div className="min-h-screen flex flex-col "> 
      {!isAuthPage && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* {!isAuthPage && <Footer />} */}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="expense-tracker" element={<ExpenseTracker />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stall-details" element={<StallDetails />} />
        <Route path="events" element={<EventPage />} />
        <Route path="product" element={<Product />} />
        <Route path="pos" element={<POSSystem />} />
        <Route path="sales-analysis" element={<SalesAnalysis />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="event-detail/:id" element={<EventDetail />} />
        <Route path="overall-stalls-analysis" element={<AllStallsAnalysis />} />
      </Route>
    </Routes>
  </Router>
);

export default App;

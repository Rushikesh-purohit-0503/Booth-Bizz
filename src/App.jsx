import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { login, logout } from './store/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from './firebase/conf'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import authservice from './firebase/Authentication'
import { useLocation } from 'react-router-dom';
import SignUp from './components/Signup';
import HomePage from './components/HomePage';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker'
import Dashboard from './components/Dashboard/Dashboard'
import AnalysisPage from './components/Dashboard/AnalysisPage'


function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(login({ userData: { uid, email } }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
        <Route path="/analysis-page" element={<AnalysisPage/>} />
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

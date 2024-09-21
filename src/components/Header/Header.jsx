import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import userImage from '../../assets/user-circle.svg';
import logoutImg from '../../assets/logout-icon.svg';
import { logout } from '../../store/authSlice';
import authservice from '../../firebase/Authentication';


function Header() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const handleLogout = async() => {
    try {
      await authservice.logout().then(() => {
        dispatch(logout());
      })

      navigate('/');
    } catch (error) {
      console.error("Error SignOut", error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="px-4 py-3 flex justify-between shadow-sm items-center">
        <Link to="/" className="text-2xl font-bold text-black no-underline">BoothBiz</Link>

        <ul className="flex space-x-10">
          <li key="home"><Link to="/" className="text-xl text-gray-600 hover:text-gray-950">Home</Link></li>
          <li key="Events"><Link to="#" className="text-xl text-gray-600 hover:text-gray-900">Events</Link></li>
          {authStatus ? (
            <li key=""><Link to="#" className="text-xl text-gray-600 hover:text-gray-900">Dashboard</Link></li>
          ) : (
            <li><Link to="#" className="text-xl text-gray-600 hover:text-gray-900">Service</Link></li>
          )}
          <li><Link to="#" className="text-xl text-gray-600 hover:text-gray-900">Contact Us</Link></li>
        </ul>

        {authStatus ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
              {userData?.email || "User"}
              <img src={userImage} alt="User" className="w-10 h-8 ml-2" />
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <Link to="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>Account Details</Link>
                <button onClick={handleLogout} className="w-full text-left flex gap-3 py-2 px-4 text-gray-700 hover:bg-gray-100">
                  Logout <img src={logoutImg} alt="Logout" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/signin" className="px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-slate-200">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
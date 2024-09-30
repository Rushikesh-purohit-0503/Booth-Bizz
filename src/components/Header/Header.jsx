import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import logoutImg from '../../assets/logout-icon.svg';
import { logout } from '../../store/authSlice';
import authservice from '../../firebase/Authentication';
import { UserIcon } from 'lucide-react';

function Header() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);
  const handleLogout = async () => {
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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="px-4 py-3 flex justify-between shadow-sm items-center">
        <Link to="/" className="text-2xl font-bold text-black no-underline">BoothBiz</Link>

        <ul className="flex space-x-10">
          <li key="home"><Link to="/" className="text-xl text-gray-600 hover:text-gray-950">Home</Link></li>
          <li key="Events"><Link to="/events" className="text-xl text-gray-600 hover:text-gray-900">Events</Link></li>
          {authStatus ? (
            <li ><Link to="/dashboard" className="text-xl text-gray-600 hover:text-gray-900">Dashboard</Link></li>
          ) :(" ")}
          <li><Link to="/contact-us" className="text-xl text-gray-600 hover:text-gray-900">Contact Us</Link></li>
        </ul>

        {authStatus ? (
          <div className="relative">
            <button  onClick={toggleDropdown} className="flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
              
              <div className="flex items-center gap-5 w-40 text-gray-700 px-4 py-2 rounded-lg border-2 border-red-200  min-w-[180px] max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap" >
                <UserIcon size={20} className="text-red-400" />
                {userData?.userName || "User"}
              </div>
              
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef}  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                {/* <Link to="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>Account Details</Link> */}
                <button onClick={handleLogout} className="w-full text-left flex gap-3 py-2 px-4 text-gray-700 hover:bg-gray-100">
                  Logout <img className='items-end' src={logoutImg} alt="Logout" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/signin" className="px-4 py-2 text-black border border-black rounded hover:bg-slate-200">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 text-black bg-red-300 rounded hover:bg-red-400">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
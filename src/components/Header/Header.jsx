import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from 'lucide-react';
import logoutImg from '../../assets/logout-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import authservice from '../../firebase/Authentication';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await authservice.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">BoothBiz</Link>

        <ul className="flex space-x-10">
          <li><Link to="/" className="text-xl text-gray-600 hover:text-gray-950">Home</Link></li>
          <li><Link to="/events" className="text-xl text-gray-600 hover:text-gray-950">Events</Link></li>
          {authStatus ? (
            <li><Link to="/dashboard" className="text-xl text-gray-600 hover:text-gray-950">Dashboard</Link></li>
          ) : (
            <>
              
              <li>
                <button 
                  onClick={() => scrollToSection('#service')}
                  className="text-xl text-gray-600 hover:text-gray-950"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="text-xl text-gray-600 hover:text-gray-950"
                >
                  Contact Us
                </button>
              </li>
            </>
          )}
        </ul>

        {authStatus ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center px-4 py-2">
              <div className="flex items-center gap-5 border-2 border-red-300 rounded-lg px-4 py-2">
                <UserIcon className='text-red-300' size={20} />
                {userData?.userName || "User"}
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute flex right-0 mt-2 w-36 mr-4 bg-white hover:bg-gray-100 shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 "
                >
                  Logout 
                </button>
                  <div className='w-full text-left py-2 px-4  '><img src={logoutImg} alt="Logout" /></div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/signin" className="px-4 py-2 border rounded">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 bg-red-300 rounded">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

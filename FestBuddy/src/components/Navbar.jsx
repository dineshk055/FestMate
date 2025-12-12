import React, { useContext, useState } from 'react';
import { BsBellFill, BsList, BsX } from 'react-icons/bs';
import { FaHandsHelping, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.js';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/Eventspage", label: "Events" },
    { href: "/Helperlist", label: "Helpers List" }


  ];

  const userLogout = () => {
    setUser(null)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaHandsHelping className='text-4xl bg-linear-to-br from-blue-800 to-violet-950 text-white p-2 w-12 h-12 rounded-lg' />
            <Link to='/'>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-blue-800 to-violet-950 text-transparent bg-clip-text">
                  FestMate
                </h1>
                <h2 className='text-black/60 text-sm'>like your friendly partner during events</h2>
              </div>
            </Link>
            <Link to='/'>
              <div className="sm:hidden">
                <h1 className="text-xl font-extrabold bg-linear-to-r from-blue-800 to-violet-950 text-transparent bg-clip-text">
                  FestMate
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group relative text-gray-700 hover:text-violet-900 font-medium py-2 transition-colors duration-300"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-900 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </div>



          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex space-x-4 items-center">
            <button className="relative p-2 text-gray-700 hover:text-violet-900 transition-colors duration-300">
              <BsBellFill className='text-xl' />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {!user && <div className="hidden lg:flex space-x-4 items-center">
              <Link
                to="/SignIn"
                className="px-4 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-100 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-6 py-2 bg-linear-to-br from-blue-800 to-violet-950 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Link>

            </div>}



            <div className='border-3 border-transparent rounded-full  hover:border-gray-600 duration-600'>
              {user && <div className='bg-black/10 p-2 px-5 rounded-full  cursor-pointer'><span className='flex items-center  text-gray-700 font-sans'><FaUser className='mx-2' />{user}</span></div>
              }
            </div>

            {user &&
              <div className='px-6 py-2 bg-linear-to-br from-blue-800 to-violet-950 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-300 hover:scale-105'>
                <button onClick={userLogout}>Logout</button>
              </div>}

          </div>



          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button className="relative p-2 text-gray-700 hover:text-violet-900 transition-colors duration-300">
              <BsBellFill className='text-xl' />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-violet-900 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <BsX className="text-2xl" />
              ) : (
                <BsList className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          } overflow-hidden border-t border-gray-200`}>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-violet-900 font-medium py-2 transition-colors duration-300 border-b border-gray-100 last:border-b-0"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4">
              {!user  && <div className='flex flex-col space-y-3 pt-4'><Link
                to="/SignIn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-center text-gray-700 hover:text-blue-900 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300 border border-gray-200"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-center bg-linear-to-br from-blue-800 to-violet-950 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-300"
              >
                Sign Up
              </Link>
              </div> }
              {user &&
              <div className='px-6 py-2 text-center cursor-pointer w-full bg-linear-to-br from-blue-800 to-violet-950 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-300 hover:scale-105'
              onClick={userLogout}>
                <button >Logout</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
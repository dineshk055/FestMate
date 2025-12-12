// components/Footer.jsx
import React from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-800  to-violet-950 text-white rounded-lg flex items-center justify-center">
                <i className="fas fa-hands-helping text-white text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">FestMate</span>
                <span className="text-xs text-gray-400 -mt-1">STAFFING SOLUTIONS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting festival organizers with volunteers and catering staff to ensure every event is properly staffed and successful.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center bg-linear-to-br from-blue-800  to-violet-950 text-white  transition-colors">
                <i ><FaFacebookF className='hover:-translate-1 duration-300 text-2xl' /></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center bg-linear-to-br from-blue-800  to-violet-950 text-white transition-colors">
                <i ><FaWhatsapp className='hover:-translate-1 duration-300 text-2xl'  /></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center   transition-colors bg-linear-to-br from-blue-800  to-violet-950 text-white">
                <i  ><BsInstagram   className='hover:-translate-1 duration-300 text-2xl'/></i>
              </a>
              
            </div>
          </div>
          
          
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative pb-2">
              Contact Us
              <div className="absolute bottom-0 left-0 w-10 h-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-purple-500"></i>
                <span>21,Gandhi Complex, KK Nagar, Chennai-600 026</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone text-purple-500"></i>
                <span>+91 9500851314</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-purple-500"></i>
                <span>info@festmate.com</span>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 FestMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
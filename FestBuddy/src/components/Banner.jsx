import { useState } from 'react';
import bannerimage from '../images/banner.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className='relative w-full min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden'>
                {/* Abstract background shapes */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-20 -left-20 w-80 h-80 bg-linear-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-slow'></div>
                    <div className='absolute top-1/4 right-1/4 w-60 h-60 bg-linear-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-float'></div>
                    <div className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-linear-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-slower'></div>
                    
                    {/* Geometric patterns */}
                    <div className='absolute top-10 right-20 w-32 h-32 border-4 border-orange-400/10 rounded-lg rotate-45'></div>
                    <div className='absolute bottom-20 left-10 w-24 h-24 border-4 border-purple-400/10 rounded-full'></div>
                    <div className='absolute top-1/2 right-10 w-16 h-16 border-2 border-blue-400/10 rotate-12'></div>
                </div>

                {/* Main content container */}
                <div className='relative z-10 container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-20'>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16'>
                        
                        {/* Text Content - Enhanced */}
                        <div className='w-full lg:w-1/2 space-y-6 md:space-y-8 animate-slide-up'>
                            {/* Badge */}
                            <div className='inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200 shadow-sm'>
                                <span className='w-2 h-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-full animate-pulse'></span>
                                <span className='text-sm font-semibold text-purple-700'>Festival Staffing Platform</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight'>
                                <span className='bg-linear-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient'>
                                    Connect
                                </span>
                                <br />
                                <span className='text-gray-800'>
                                    Festival Magic{' '}
                                    <span className='relative inline-block'>
                                        <span className='relative z-10'>with</span>
                                        <span className='absolute -bottom-1 left-0 w-full h-3 bg-yellow-300/30 -rotate-1'></span>
                                    </span>
                                </span>
                                <br />
                                <span className='text-gray-800'>
                                    Perfect{' '}
                                    <span className='relative'>
                                        <span className='relative z-10'>Helpers</span>
                                        <svg className='absolute -bottom-2 left-0 w-full h-3 text-blue-400/30' viewBox="0 0 100 10">
                                            <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </span>
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className='text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl'>
                                Where festival organizers meet passionate volunteers. Streamline your event staffing 
                                with our platform designed for seamless connections and unforgettable experiences.
                            </p>

                            {/* Stats */}
                            <div className='flex flex-wrap gap-6 py-4'>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>500+</div>
                                    <div className='text-sm text-gray-500'>Events Staffed</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>2K+</div>
                                    <div className='text-sm text-gray-500'>Happy Helpers</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent'>98%</div>
                                    <div className='text-sm text-gray-500'>Satisfaction Rate</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                                <Link to='' onClick={handleRegisterClick}>
                                    <button 
                                        className='group relative overflow-hidden px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer min-w-[200px]'
                                        onMouseEnter={() => setHoveredButton('register')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        <span className='relative z-10 flex items-center justify-center gap-2'>
                                            Get Started
                                            <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                            </svg>
                                        </span>
                                        <div className='absolute inset-0 bg-linear-to-r from-purple-700 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
                                    </button>
                                </Link>
                                
                                <Link to="/explore">
                                    <button className='px-8 py-4 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold text-lg hover:bg-purple-50 transition-all duration-300 hover:-translate-y-1 cursor-pointer min-w-[200px]'>
                                        Browse Events
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Content - Enhanced */}
                        <div className='w-full lg:w-1/2 relative animate-slide-up delay-100'>
                            <div className='relative'>
                                {/* Main Image Container */}
                                <div className='relative rounded-3xl overflow-hidden shadow-2xl group'>
                                    <img 
                                        src={bannerimage} 
                                        alt="Festival celebration with organizers and volunteers" 
                                        className='w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700'
                                    />
                                    <div className='absolute inset-0 bg-linear-to-t from-purple-900/20 via-transparent to-transparent'></div>
                                    <div className='absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10 mix-blend-overlay'></div>
                                </div>

                                {/* Floating Elements */}
                                <div className='absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 shadow-xl flex items-center justify-center animate-float'>
                                    <span className='text-white font-bold text-sm text-center px-2'>Live Events</span>
                                </div>
                                
                                <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full shadow-xl flex items-center justify-center animate-float-slower'>
                                    <div className='text-center text-white'>
                                        <div className='text-2xl font-bold'>24/7</div>
                                        <div className='text-xs'>Support</div>
                                    </div>
                                </div>

                                {/* Image Badge */}
                                <div className='absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-linear-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center'>
                                            <span className='text-white font-bold'>✓</span>
                                        </div>
                                        <div>
                                            <div className='font-bold text-gray-800'>Verified Helpers</div>
                                            <div className='text-sm text-gray-600'>Background checked</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative bottom wave */}
                <div className='absolute bottom-0 left-0 right-0'>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className='w-full h-auto'>
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                              fill="rgba(255,255,255,0.8)" />
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                              fill="rgba(255,255,255,1)" />
                    </svg>
                </div>
            </div>

            {/* Enhanced Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closePopup}
                    ></div>
                    
                    {/* Modal */}
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-up">
                        {/* Modal Header */}
                        <div className="relative p-8 text-center bg-linear-to-r from-purple-600 via-pink-600 to-orange-500">
                            <button 
                                onClick={closePopup}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-white mb-2">Join Our Community</h3>
                            <p className="text-white/90">Choose how you want to be part of amazing festivals</p>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-8">
                            <div className="space-y-4">
                                {/* Organizer Option */}
                                <Link to="/Hostregister" onClick={closePopup}>
                                    <div className="group relative overflow-hidden rounded-xl border-2 border-purple-200 hover:border-purple-500 bg-linear-to-r from-purple-50 to-pink-50 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-gray-800">Organizer</h4>
                                                <p className="text-gray-600 text-sm mt-1">Find reliable staff for your events</p>
                                            </div>
                                            <svg className="w-5 h-5 text-purple-500 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    </div>
                                </Link>
                                
                                {/* Helper Option */}
                                <Link to="/HelperRegister" onClick={closePopup}>
                                    <div className="group relative overflow-hidden rounded-xl border-2 border-blue-200 hover:border-blue-500 bg-linear-to-r from-blue-50 to-cyan-50 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9.75L21 8.25m-4.5 0L21 8.25m0 0l-4.5 4.5M21 8.25h-9"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-gray-800">Helper</h4>
                                                <p className="text-gray-600 text-sm mt-1">Offer your skills at exciting events</p>
                                            </div>
                                            <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    </div>
                                </Link>
                            </div>
                            
                            {/* Close Button */}
                            <button 
                                onClick={closePopup}
                                className="w-full mt-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                            >
                                Explore First
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Banner;
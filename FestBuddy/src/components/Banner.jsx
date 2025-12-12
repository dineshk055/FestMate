import { useState } from 'react';
import bannerimage from '../images/banner.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        
    };

    return (
        <>
            <div className='flex flex-col lg:flex-row justify-center items-center p-4 md:p-6 w-full min-h-screen lg:h-140 bg-blue-50 relative overflow-hidden'>
                {/* Background gradient effects */}
                <div className='absolute top-0 left-0 w-60 h-60 md:w-80 md:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
                <div className='absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000'></div>
                <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-60 md:w-80 md:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500'></div>
                
                {/* Text Content */}
                <div className='mx-4 md:mx-8 lg:mx-15 w-full lg:w-1/2 h-auto lg:h-100 relative z-10 order-2 lg:order-1 text-center lg:text-left'>
                    <h1 className='text-transparent bg-clip-text bg-linear-to-br from-blue-900 to-blue-600 font-bold text-4xl md:text-5xl lg:text-6xl m-2 md:m-4 drop-shadow-lg'>
                        Connecting Festival <br className='hidden md:block'/> organizers with <br className='hidden md:block'/> amazing Helpers
                    </h1>
                    <h2 className='text-black/50 m-2 md:m-4 font-sans drop-shadow-sm text-sm md:text-base lg:text-lg'>
                        Find reliable volunteers and catering staff for your events, or <br className='hidden md:block' />
                        offer your skills when you're available. Our platform makes <br className='hidden md:block' />
                        festival staffing simple, efficient, and enjoyable.
                    </h2>
                    <div className='flex sm:flex-row justify-center lg:justify-start items-center gap-4 md:gap-6'>
                        <Link to='' onClick={handleRegisterClick}>
                            <button className='mx-2 my-2 md:mx-6 md:my-6 bg-linear-to-br from-blue-600 to-blue-900 rounded-full px-6 py-3 md:px-8 md:py-2 text-white font-semibold hover:-translate-y-1.5 duration-500 cursor-pointer shadow-lg hover:shadow-blue-500/30 transition-all text-sm md:text-base w-full sm:w-auto'>
                                Register
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image Content */}
                <div className='mx-4 md:mx-8 lg:mx-20 w-full lg:w-1/2 relative z-10 order-1 lg:order-2 mb-8 lg:mb-0'>
                    <div className='relative flex justify-center lg:justify-end'>
                        <img 
                            src={bannerimage} 
                            alt="banner_image" 
                            className='w-full max-w-md md:max-w-lg lg:w-150 lg:h-70 rounded-2xl shadow-2xl object-cover' 
                        />
                        {/* Image overlay gradient */}
                        <div className='absolute inset-0 bg-linear-to-r from-blue-500/10 to-pink-500/10 rounded-2xl mix-blend-overlay'></div>
                    </div>
                </div>
            </div>

            {/* Popup Notification */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-95 hover:scale-100">
                        {/* Popup Header */}
                        <div className="bg-linear-to-r from-blue-900 via-blue-700 to-blue-800 rounded-t-2xl p-6 text-center">
                            <h3 className="text-2xl font-bold text-white">Choose Your Role</h3>
                            <p className="text-blue-100 mt-2">How would you like to register?</p>
                        </div>
                        
                        {/* Popup Content */}
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {/* Organizer Button */}
                                <Link to="/Hostregister">
                                <button 
                                    onClick={closePopup}
                                    className="bg-linear-to-br from-blue-600 to-blue-900 text-white font-semibold py-4 px-6 rounded-xl hover:-translate-y-1 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex-1 text-center cursor-pointer"
                                >
                                    <div className="text-sm opacity-90 mt-1">I need help for my event</div>
                                </button>
                                </Link>
                                
                                {/* Helper Button */}
                                <Link to='/HelperRegister'>
                                <button 
                                    onClick={closePopup}
                                    className="bg-linear-to-br from-pink-600 to-pink-900 text-white font-semibold py-4 px-6 rounded-xl hover:-translate-y-1 transform transition-all duration-300 shadow-lg hover:shadow-pink-500/30 flex-1 text-center cursor-pointer"
                                >
                                    <div className="text-sm opacity-90 mt-1">I want to help at events</div>
                                </button>
                                </Link>
                            </div>
                            
                            {/* Close Button */}
                            <button 
                                onClick={closePopup}
                                className="w-full mt-6 py-3 text-gray-600 font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Banner;
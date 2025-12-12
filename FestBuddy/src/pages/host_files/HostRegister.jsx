import { useState } from 'react';
import { Link } from 'react-router-dom';

const HostRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        event: '',
        location: '',
        membersNeeded: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Registration Successful! We will contact you soon.');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-8 px-4">
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="fixed top-0 right-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="fixed bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link to="/" className="inline-block mb-6">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold transition-all duration-300">
                            ← Back to Home
                        </button>
                    </Link>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 mb-4">
                        Host Registration
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Register your event and find amazing helpers to make it unforgettable
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Form Section */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Event Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Name *
                                </label>
                                <input
                                    type="text"
                                    name="event"
                                    value={formData.event}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="e.g., Music Festival, Food Fair"
                                />
                            </div>

                            {/* Location Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter venue or city"
                                />
                            </div>

                            {/* Members Needed Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Helpers Needed *
                                </label>
                                <select
                                    name="membersNeeded"
                                    value={formData.membersNeeded}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                                >
                                    <option value="">Select number of helpers</option>
                                    <option value="1-5">1-5 helpers</option>
                                    <option value="6-10">6-10 helpers</option>
                                    <option value="11-20">11-20 helpers</option>
                                    <option value="21-50">21-50 helpers</option>
                                    <option value="50+">50+ helpers</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Register as Host 🎪
                            </button>
                        </form>

                        
                    </div>

                    {/* Illustration Section */}
                    <div className="text-center lg:text-left">
                        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                            <div className="mb-6">
                                <div className="text-6xl mb-4">🎪</div>
                                <h3 className="text-2xl font-bold mb-2">Why Register as Host?</h3>
                                <p className="text-blue-100">Find reliable helpers for your amazing events</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">✓</div>
                                    <span>Access to verified volunteers</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">✓</div>
                                    <span>Quick and easy hiring process</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">✓</div>
                                    <span>24/7 customer support</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">✓</div>
                                    <span>Secure payment system</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostRegister;
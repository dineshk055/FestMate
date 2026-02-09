import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storedatas = await axios.post("https://festmate-d1xu.onrender.com/api/auth/register", formData);
            console.log(storedatas);
            toast.success(storedatas.data.msg);
            navigate("/SignIn");
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || 'Registration failed');
        }

        // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 relative overflow-hidden">
            {/* Background Text Pattern - Darker */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-blue-300 text-6xl font-bold opacity-30 rotate-12">CREATE</div>
                <div className="absolute top-1/3 right-10 text-blue-400 text-5xl font-bold opacity-25 -rotate-12">JOIN</div>
                <div className="absolute bottom-20 left-1/4 text-blue-300 text-4xl font-bold opacity-35 rotate-6">SIGN UP</div>
                <div className="absolute bottom-40 right-1/4 text-blue-400 text-5xl font-bold opacity-30 -rotate-6">START</div>
                <div className="absolute top-1/2 left-1/3 text-blue-300 text-3xl font-bold opacity-25">ACCOUNT</div>
                <div className="absolute top-3/4 right-1/3 text-blue-400 text-4xl font-bold opacity-30 rotate-3">REGISTER</div>
                <div className="absolute top-1/4 left-1/2 text-blue-500 text-4xl font-bold opacity-20 -rotate-45">WELCOME</div>
                <div className="absolute bottom-1/3 right-1/2 text-blue-500 text-5xl font-bold opacity-25 rotate-45">GROW</div>
            </div>

            {/* Floating Background Elements - Enhanced */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-300 rounded-full opacity-15 blur-xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400 rounded-full opacity-15 blur-xl"></div>
            <div className="absolute top-1/2 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-10 blur-lg"></div>
            <div className="absolute bottom-10 right-20 w-16 h-16 bg-indigo-500 rounded-full opacity-10 blur-lg"></div>
            <div className="absolute top-20 right-1/4 w-12 h-12 bg-blue-500 rounded-full opacity-8 blur-md"></div>

            {/* Enhanced Form Container */}
            <div className="max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl overflow-hidden hover:scale-95 duration-500 relative z-10 backdrop-blur-md border border-white/20">
                {/* Enhanced Header with better gradient */}
                <div className="bg-linear-to-r from-blue-800 via-blue-900 to-blue-950 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-transparent"></div>
                    <h2 className="text-4xl font-bold text-white mb-3 relative z-10">Create Your Account</h2>
                    <p className="text-blue-200 text-lg relative z-10">Join us and start your journey</p>
                    {/* Header decoration */}
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
                </div>

                <div className="p-8 bg-linear-to-r from-white to-blue-50/30">
                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Enhanced Full Name Field */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Full Name</label>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                    placeholder="Enter your full name"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Email Field */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Email Address</label>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                    placeholder="Enter your email address"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Phone and Date of Birth in one row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Enhanced Phone Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                        placeholder="Phone number"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Date of Birth Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Date of Birth</label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Password and Confirm Password in one row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Enhanced Password Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Password</label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                        placeholder="Create password"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Confirm Password Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="relative w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 focus:border-blue-400 transition duration-300 bg-white/80 shadow-sm hover:shadow-md"
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Terms and Conditions */}
                        <div className="flex items-center group cursor-pointer pt-2">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 transition duration-200 cursor-pointer"
                                    required
                                />
                            </div>
                            <label className="ml-3 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition duration-200 cursor-pointer">
                                I agree to the <a href="#" className="text-blue-600 hover:text-blue-800 font-bold transition duration-200 hover:underline underline-offset-2">terms and conditions</a>
                            </label>
                        </div>

                        {/* Enhanced Submit Button */}
                        <button
                            type="submit"
                            className="w-full group relative bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        </button>
                    </form>

                    

                    

                    {/* Enhanced Sign In Link */}
                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-gray-700 text-sm font-medium">
                            Already have an account?{' '}
                            <Link to="/SignIn" className="text-blue-600 hover:text-blue-800 font-bold transition duration-200 hover:underline underline-offset-2">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
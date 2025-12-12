import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, CheckCircle, XCircle, Briefcase, MapPin, Star } from 'lucide-react';
import bg from '../../images/helperbg.webp'

const HelperRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        profession: '',
        location: '',
        experience: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'password') {
            checkPasswordCriteria(value);
        }
    };

    const checkPasswordCriteria = (password) => {
        setPasswordCriteria({
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.profession) newErrors.profession = 'Profession is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (!Object.values(passwordCriteria).every(criteria => criteria)) newErrors.password = 'Password requirements not met';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Registration successful:', formData);
            alert('Registration successful!');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                profession: '',
                location: '',
                experience: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            });
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const PasswordCriteria = () => (
        <div className="mt-2 space-y-1">
            <div className="grid grid-cols-2 gap-1 text-xs">
                <div className={`flex items-center ${passwordCriteria.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordCriteria.minLength ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    <span className="ml-1">8+ characters</span>
                </div>
                <div className={`flex items-center ${passwordCriteria.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordCriteria.hasUpperCase ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    <span className="ml-1">Uppercase</span>
                </div>
                <div className={`flex items-center ${passwordCriteria.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordCriteria.hasLowerCase ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    <span className="ml-1">Lowercase</span>
                </div>
                <div className={`flex items-center ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordCriteria.hasNumber ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    <span className="ml-1">Number</span>
                </div>
            </div>
        </div>
    );

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40"></div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side */}
                    <div className=" text-white space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Star className="h-6 w-6 text-white" fill="currentColor" />
                            </div>
                            <h1 className="text-2xl font-bold">HelperPro</h1>
                        </div>
                        
                        <h2 className="text-4xl font-bold leading-tight">
                            Start Your Professional 
                            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {' '}Journey
                            </span>
                        </h2>
                        
                        <p className="text-lg text-white/90 leading-relaxed">
                            Join thousands of professionals already helping others and building their careers on our platform.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={14} className="text-white" />
                                </div>
                                <span className="text-white/90">Connect with clients worldwide</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={14} className="text-white" />
                                </div>
                                <span className="text-white/90">Secure payment system</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle size={14} className="text-white" />
                                </div>
                                <span className="text-white/90">Build your professional profile</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h3>
                            <p className="text-gray-600">Join our community of professionals</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>}
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Email address"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                                                errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Profession and Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profession
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                                                errors.profession ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Your profession"
                                        />
                                    </div>
                                    {errors.profession && <p className="text-red-500 text-xs mt-2">{errors.profession}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                                                errors.location ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Your location"
                                        />
                                    </div>
                                    {errors.location && <p className="text-red-500 text-xs mt-2">{errors.location}</p>}
                                </div>
                            </div>

                            {/* Date of Birth and Experience */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 ${
                                                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-2">{errors.dateOfBirth}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience
                                    </label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900"
                                    >
                                        <option value="">Select experience</option>
                                        <option value="0-1">0-1 years</option>
                                        <option value="1-3">1-3 years</option>
                                        <option value="3-5">3-5 years</option>
                                        <option value="5+">5+ years</option>
                                    </select>
                                </div>
                            </div>
                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-3 bg-blue-50 rounded-xl p-4 border border-blue-200">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                                />
                                <label className="text-sm text-gray-700">
                                    I agree to the{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full  bg-linear-to-br from-blue-800 to-violet-950 text-white py-4 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Professional Account'
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-4">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                                        Sign in here
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelperRegister;
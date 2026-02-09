import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const SignInPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

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
      const signindata = await axios.post("https://festmate-d1xu.onrender.com/api/auth/signin", formData);
      toast.success('Welcome Back !' + " " + signindata.data.datas.fullName);
      setUser(signindata.data.datas.fullName);
      console.log(signindata);
      navigate("/")
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }

    // Reset form
    setFormData({
      email: '',
      password: '',
      rememberMe: false
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Background Text Pattern - Darker */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-blue-300 text-6xl font-bold opacity-30 rotate-12">WELCOME</div>
        <div className="absolute top-1/3 right-10 text-blue-400 text-5xl font-bold opacity-25 -rotate-12">SECURE</div>
        <div className="absolute bottom-20 left-1/4 text-blue-300 text-4xl font-bold opacity-35 rotate-6">LOGIN</div>
        <div className="absolute bottom-40 right-1/4 text-blue-400 text-5xl font-bold opacity-30 -rotate-6">ACCESS</div>
        <div className="absolute top-1/2 left-1/3 text-blue-300 text-3xl font-bold opacity-25">ACCOUNT</div>
        <div className="absolute top-3/4 right-1/3 text-blue-400 text-4xl font-bold opacity-30 rotate-3">SIGN IN</div>
        <div className="absolute top-1/4 left-1/2 text-blue-500 text-4xl font-bold opacity-20 -rotate-45">VERIFIED</div>
        <div className="absolute bottom-1/3 right-1/2 text-blue-500 text-5xl font-bold opacity-25 rotate-45">SAFE</div>
      </div>

      {/* Floating Background Elements - Enhanced */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-300 rounded-full opacity-15 blur-xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400 rounded-full opacity-15 blur-xl"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-10 blur-lg"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-indigo-500 rounded-full opacity-10 blur-lg"></div>
      <div className="absolute top-20 right-1/4 w-12 h-12 bg-blue-500 rounded-full opacity-8 blur-md"></div>

      {/* Enhanced Form Container */}
      <div className="max-w-md w-full bg-white/90 rounded-3xl shadow-2xl overflow-hidden hover:scale-95 duration-500 relative z-10 backdrop-blur-md border border-white/20">
        {/* Enhanced Header with better gradient */}
        <div className="bg-linear-to-r from-blue-800 via-blue-900 to-blue-950 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-transparent"></div>
          <h2 className="text-4xl font-bold text-white mb-3 relative z-10">Welcome Back</h2>
          <p className="text-blue-200 text-lg relative z-10">Sign in to continue your journey</p>
          {/* Header decoration */}
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
        </div>

        <div className="p-8 bg-linear-to-r from-white to-blue-50/30">
          <form onSubmit={handleSubmit} className="space-y-7">
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
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center group cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500/50 transition duration-200 cursor-pointer"
                  />
                </div>
                <label className="ml-3 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition duration-200 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition duration-200 hover:underline underline-offset-2">
                Forgot password?
              </a>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              className="w-full group relative bg-linear-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </button>
          </form>

          

         

          {/* Enhanced Sign Up Link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-700 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/SignUp" className="text-blue-600 hover:text-blue-800 font-bold transition duration-200 hover:underline underline-offset-2">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
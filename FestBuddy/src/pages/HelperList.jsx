import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const HelperList = () => {
  const [showForm, setShowForm] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [newHelper, setNewHelper] = useState({
    name: "",
    location: "",
    contact: ""
  });

  useEffect(() => {
    const fetchHelperDatas = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/auth/helperDetails");
        setHelpers(response.data.getHelper);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error fetching data: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchHelperDatas();
  }, [msg]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelper(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChat = (helper) => {
    if (!user) {
      toast.error("Please login to start chatting");
      return;
    }
    setSelectedHelper(helper);
    setChat(true);
    // Initialize with a welcome message
    setMessages([
      {
        text: `Hello! I'm ${helper.name}. How can I help you with your festival preparations?`,
        sender: "helper",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const closeChat = () => {
    setChat(false);
    setSelectedHelper(null);
    setMessages([]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Simulate helper response after 1 second
    setTimeout(() => {
      const responses = [
        "I'd be happy to help with that!",
        "That's a great question. Let me assist you.",
        "I have experience with that. What specifically do you need?",
        "I can definitely help you with festival preparations!",
        "Thanks for reaching out! How can I make your festival better?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const helperMessage = {
        text: randomResponse,
        sender: "helper",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, helperMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clickEvent = () => {
    if (!user) {
      toast.error("Login is Required")
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post("http://localhost:3000/api/auth/helperRegister", newHelper);
      toast.success(response.data.msg);
      setMsg(response.data.msg)
      
      setNewHelper({
        name: "",
        location: "",
        contact: ""
      });
      setShowForm(false);
      
      const updatedResponse = await axios.get("http://localhost:3000/api/auth/helperDetails");
      setHelpers(updatedResponse.data);
      
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Registration failed: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Festival Helpers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Connect with trusted helpers available during the festival season. 
            Find assistance or offer your help to make celebrations memorable.
          </p>
          <button
            onClick={clickEvent}
            className="bg-linear-to-r from-green-900 to-emerald-800 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Register as a Helper</span>
            </div>
          </button>
        </div>

        {/* Helper Registration Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Register as Helper</h2>
                <p className="text-gray-600 mt-1">Join our community of festival helpers</p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newHelper.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newHelper.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    placeholder="Enter your location"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
                  <input
                    type="text"
                    name="contact"
                    value={newHelper.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    placeholder="Phone or email"
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 bg-linear-to-r from-green-950 to-emerald-900 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 ${
                      submitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
                    }`}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </div>
                    ) : (
                      'Register as Helper'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {chat && selectedHelper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-500 to-purple-600 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {selectedHelper.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{selectedHelper.name}</h3>
                      <p className="text-blue-100 text-sm">Online</p>
                    </div>
                  </div>
                  <button
                    onClick={closeChat}
                    className="text-white hover:text-blue-200 transition duration-200 p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center space-x-3">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">Loading helpers...</span>
            </div>
          </div>
        )}

        {/* Helpers List */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-6 px-8 py-6 bg-linear-to-r from-gray-50 to-gray-75 border-b border-gray-200">
              <div className="col-span-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">Helper</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</div>
              <div className="col-span-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact</div>
              <div className="col-span-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</div>
            </div>

            {/* Helpers List */}
            <div className="divide-y divide-gray-100">
              {helpers && helpers.length > 0 ? (
                helpers.map((helper) => (
                  <div 
                    key={helper._id || helper.id} 
                    className="grid grid-cols-12 gap-6 px-8 py-6 items-center hover:bg-gray-50 transition-all duration-200 group"
                  >
                    {/* Helper Name & Image */}
                    <div className="col-span-3 flex items-center space-x-4">
                      <div className="relative">
                        {helper.image ? (
                          <img 
                            src={helper.image} 
                            alt={helper.name}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-12 h-12 rounded-xl bg-linear-to-r from-purple-100 to-blue-100 flex items-center justify-center shadow-sm ${helper.image ? 'hidden' : 'flex'}`}
                        >
                          <span className="text-lg font-semibold text-purple-600">
                            {helper.name ? helper.name.charAt(0).toUpperCase() : 'H'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          {helper.name || 'Unknown Helper'}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          helper.available !== false 
                            ? 'bg-green-400 animate-pulse' 
                            : 'bg-red-400'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          helper.available !== false ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {helper.available !== false ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-3 flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate font-medium">{helper.location || 'Location not specified'}</span>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate font-medium">{helper.contact || 'Contact not provided'}</span>
                    </div>

                    {/* Action */}
                    <div className="col-span-2">
                      <button
                        onClick={() => handleChat(helper)}
                        disabled={helper.available === false}
                        className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          helper.available !== false
                            ? 'bg-linear-to-r from-blue-950 to-purple-950 hover:from-blue-900 hover:to-purple-900 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {helper.available !== false ? 'Start Chat' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Empty State
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-linear-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Helpers Yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to register and help others during the festival!</p>
                    <button
                      onClick={clickEvent}
                      className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Become First Helper
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelperList;
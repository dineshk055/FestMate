import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import { 
  Search, Filter, MessageCircle, Phone, MapPin, 
  Star, Clock, Users, Shield, ChevronRight,
  Plus, X, Mail, Calendar, CheckCircle
} from 'lucide-react';

const HelperList = () => {
  const [showForm, setShowForm] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [filteredHelpers, setFilteredHelpers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availability, setAvailability] = useState("all");

  // Sample skills for filtering
  const skills = [
    "Logistics", "Catering", "Security", "Setup", 
    "Cleanup", "Customer Service", "First Aid", "Technical Support"
  ];

  const [newHelper, setNewHelper] = useState({
    name: "",
    location: "",
    contact: "",
    skills: [],
    experience: "",
    availability: "full-time"
  });

  useEffect(() => {
    fetchHelperDatas();
  }, [msg]);

  useEffect(() => {
    filterHelpers();
  }, [searchTerm, selectedSkills, availability, helpers]);

  const fetchHelperDatas = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://festmate-d1xu.onrender.com/api/auth/helperDetails");
      setHelpers(response.data.getHelper || []);
      setFilteredHelpers(response.data.getHelper || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching helpers");
    } finally {
      setLoading(false);
    }
  };

  const filterHelpers = () => {
    let filtered = helpers.filter(helper => {
      const matchesSearch = 
        helper.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        helper.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        helper.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        helper.contact?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => helper.skills?.includes(skill));

      const matchesAvailability = 
        availability === "all" || 
        helper.availability === availability;

      return matchesSearch && matchesSkills && matchesAvailability;
    });
    setFilteredHelpers(filtered);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHelper(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!newHelper.skills.includes(skill)) {
      setNewHelper(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setNewHelper(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleChat = (helper) => {
    if (!user) {
      toast.error("Please login to start chatting");
      return;
    }
    setSelectedHelper(helper);
    setChat(true);
    setMessages([
      {
        text: `Hello! I'm ${helper.name}. I'm available to help with your festival needs!`,
        sender: "helper",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const closeChat = () => {
    setChat(false);
    setSelectedHelper(null);
    setMessages([]);
    setInput("");
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

    setTimeout(() => {
      const responses = [
        "I'd be happy to help with that! When do you need assistance?",
        "Perfect! I have experience with festival setups. What's your timeline?",
        "I can definitely help with that. Do you have any specific requirements?",
        "Thanks for reaching out! I'm available on those dates. What's next?",
        "Great! Let me know the venue details and I'll prepare accordingly."
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
      toast.error("Please login to register as a helper");
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post("https://festmate-d1xu.onrender.com/api/auth/helperRegister", newHelper);
      toast.success(response.data.msg);
      setMsg(response.data.msg);
      
      // Reset form
      setNewHelper({
        name: "",
        location: "",
        contact: "",
        skills: [],
        experience: "",
        availability: "full-time"
      });
      setShowForm(false);
      
      // Refresh helper list
      await fetchHelperDatas();
      
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Registration failed: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  const getExperienceColor = (exp) => {
    if (exp >= 3) return "bg-green-100 text-green-800";
    if (exp >= 1) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getAvailabilityColor = (status) => {
    switch(status) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'weekends': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      </div>

      {/* Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Festival Helpers Network
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with verified festival helpers. Find reliable support for your events or 
            join our community to offer your skills.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {helpers.length}
              </div>
              <div className="text-sm text-gray-500">Total Helpers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {helpers.filter(h => h.availability === 'full-time').length}
              </div>
              <div className="text-sm text-gray-500">Full-time Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                4.8
              </div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-gray-500">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, location, skills, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative group">
                <Filter className="w-5 h-5 text-gray-600" />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="all">All</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="weekends">Weekends Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={clickEvent}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                Add Helper
              </button>
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Skills:</label>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedSkills.includes(skill)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Helpers Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
          </div>
        ) : (
          <>
            {filteredHelpers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHelpers.map((helper, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                  >
                    {/* Helper Header */}
                    <div className="relative">
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getAvailabilityColor(helper.availability)}`}>
                          {helper.availability?.replace('-', ' ') || 'Available'}
                        </div>
                      </div>
                      
                      {/* Avatar & Name */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                              {helper.name?.charAt(0)?.toUpperCase() || 'H'}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border-4 border-white flex items-center justify-center">
                              <Shield className="w-5 h-5 text-green-500" fill="currentColor" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{helper.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 text-sm">{helper.location}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-sm text-gray-500 ml-1">4.8</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="px-6 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {(helper.skills || []).slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                        {(helper.skills || []).length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{(helper.skills || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact & Experience */}
                    <div className="px-6 pb-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{helper.contact}</span>
                      </div>
                      {helper.experience && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(helper.experience)}`}>
                            {helper.experience} {helper.experience === 1 ? 'year' : 'years'} experience
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="p-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleChat(helper)}
                        className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Start Conversation
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Helpers Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search filters or be the first to register!</p>
                <button 
                  onClick={clickEvent}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Become First Helper
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Helper Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Join as a Helper</h2>
                  <p className="text-white/90 mt-1">Share your skills and help amazing festivals</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newHelper.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={newHelper.location}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={newHelper.experience}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Contact Info *</label>
                    <input
                      type="text"
                      name="contact"
                      value={newHelper.contact}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Availability</label>
                    <select
                      name="availability"
                      value={newHelper.availability}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="weekends">Weekends Only</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills Selection */}
              <div className="mt-6 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillAdd(skill)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        newHelper.skills.includes(skill)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {newHelper.skills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Selected Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {newHelper.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-2">
                          {skill}
                          <button type="button" onClick={() => handleSkillRemove(skill)} className="hover:text-blue-900">
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Registering...' : 'Join as Helper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chat && selectedHelper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeChat}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-scale-up">
            {/* Chat Header */}
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {selectedHelper.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{selectedHelper.name}</h3>
                    <p className="text-blue-100 text-sm">Festival Helper • Online</p>
                  </div>
                </div>
                <button onClick={closeChat} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelperList;
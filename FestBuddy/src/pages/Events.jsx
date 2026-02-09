import React, { useContext, useState, useEffect } from 'react';
import { Plus, X, MapPin, Calendar, Clock, Users, Phone, Search, Filter, Heart, Share2, Star, Eye } from 'lucide-react';
import axios from "axios";
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const EventsList = () => {
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        hostName: "",
        date: "",
        time: "",
        location: "",
        address: "",
        hostNumber: "",
        helpersNeeded: "",
        eventType: "other"
    });
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [msg, setMsg] = useState("");
    const { user } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [likedEvents, setLikedEvents] = useState({});
    const [showMap, setShowMap] = useState(false);

    // Event type filters
    const eventTypes = [
        { id: "all", name: "All Events", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
        { id: "music", name: "Music", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { id: "conference", name: "Conference", color: "bg-gradient-to-r from-blue-600 to-indigo-600" },
        { id: "wedding", name: "Wedding", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
        { id: "food", name: "Food", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
        { id: "corporate", name: "Corporate", color: "bg-gradient-to-r from-gray-600 to-gray-800" },
        { id: "other", name: "Other", color: "bg-gradient-to-r from-green-500 to-emerald-500" }
    ];

    useEffect(() => {
        fetchEvents();
    }, [msg]);

    useEffect(() => {
        filterEvents();
    }, [searchTerm, selectedType, events]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://festmate-d1xu.onrender.com/api/auth/getEventDetails");
            setEvents(response.data.getEvent);
            setFilteredEvents(response.data.getEvent);
        } catch (error) {
            toast.error("Error fetching events", error);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        let filtered = events.filter(event => {
            const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.hostName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === "all" || event.eventType === selectedType;
            return matchesSearch && matchesType;
        });
        setFilteredEvents(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        if (diffDays < 7) return `${diffDays} days left`;
        
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getEventTypeStyle = (type) => {
        const styles = {
            music: 'from-purple-500 to-pink-500',
            conference: 'from-blue-600 to-indigo-600',
            wedding: 'from-pink-500 to-rose-500',
            food: 'from-orange-500 to-yellow-500',
            corporate: 'from-gray-600 to-gray-800',
            other: 'from-green-500 to-emerald-500'
        };
        return styles[type] || styles.other;
    };

    const getTimeStatus = (dateString, timeString) => {
        const eventDateTime = new Date(`${dateString}T${timeString}`);
        const now = new Date();
        const diffHours = (eventDateTime - now) / (1000 * 60 * 60);
        
        if (diffHours < 0) return { text: "Past Event", color: "bg-gray-100 text-gray-600" };
        if (diffHours < 24) return { text: "Starting Soon", color: "bg-red-100 text-red-600" };
        if (diffHours < 72) return { text: "Upcoming", color: "bg-yellow-100 text-yellow-600" };
        return { text: "Future Event", color: "bg-blue-100 text-blue-600" };
    };

    const onclickEvent = () => {
        if (!user) {
            toast.error("Please login to create an event");
        } else {
            setShowForm(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://festmate-d1xu.onrender.com/api/auth/eventDetails", newEvent);
            toast.success(response.data.msg || "Event created successfully!");
            setMsg(response.data.msg);
            resetForm();
        } catch (error) {
            toast.error("Error creating event");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setNewEvent({
            eventName: "",
            hostName: "",
            date: "",
            time: "",
            location: "",
            address: "",
            hostNumber: "",
            helpersNeeded: "",
            eventType: "other"
        });
        setShowForm(false);
    };

    const toggleLike = (eventId) => {
        setLikedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-4">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
            </div>

            {/* Header Section */}
            <div className="relative max-w-7xl mx-auto mb-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-gradient">
                        Discover Amazing Events
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find and join incredible events near you or create your own to connect with amazing helpers
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {events.length}
                            </div>
                            <div className="text-sm text-gray-500">Total Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {events.filter(e => new Date(e.date) > new Date()).length}
                            </div>
                            <div className="text-sm text-gray-500">Upcoming</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {events.reduce((sum, e) => sum + parseInt(e.helpersNeeded || 0), 0)}
                            </div>
                            <div className="text-sm text-gray-500">Helpers Needed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                24/7
                            </div>
                            <div className="text-sm text-gray-500">Support</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search events by name, location, or host..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <Filter size={20} className="text-gray-500 shrink-0" />
                            {eventTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                                        selectedType === type.id 
                                            ? `${type.color} text-white shadow-lg` 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={onclickEvent}
                            className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            Create Event
                            <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="relative max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {filteredEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredEvents.map((event, index) => {
                                    const timeStatus = getTimeStatus(event.date, event.time);
                                    return (
                                        <div 
                                            key={index}
                                            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                            onMouseEnter={() => setHoveredCard(index)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            {/* Event Type Badge */}
                                            <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-linear-to-r ${getEventTypeStyle(event.eventType)} shadow-lg`}>
                                                {event.eventType.toUpperCase()}
                                            </div>

                                            {/* Time Status Badge */}
                                            <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${timeStatus.color}`}>
                                                {timeStatus.text}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className={`absolute top-16 right-4 z-10 flex flex-col gap-2 transition-all duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                                                <button 
                                                    onClick={() => toggleLike(index)}
                                                    className={`p-2 rounded-full backdrop-blur-sm ${likedEvents[index] ? 'bg-pink-500/20 text-pink-600' : 'bg-white/80 text-gray-600 hover:text-pink-600'}`}
                                                >
                                                    <Heart size={18} fill={likedEvents[index] ? "currentColor" : "none"} />
                                                </button>
                                                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600">
                                                    <Share2 size={18} />
                                                </button>
                                                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-green-600">
                                                    <Eye size={18} />
                                                </button>
                                            </div>

                                            {/* Event Image/Placeholder */}
                                            <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                                                <div className="absolute bottom-4 left-4">
                                                    <h3 className="text-xl font-bold text-white">{event.eventName}</h3>
                                                    <p className="text-white/90 text-sm">{event.location}</p>
                                                </div>
                                            </div>

                                            {/* Event Details */}
                                            <div className="p-6">
                                                {/* Host Info */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                                        {event.hostName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{event.hostName}</p>
                                                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                            <Star size={12} fill="currentColor" />
                                                            <span>4.8 • Verified Host</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Event Info Grid */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={16} className="text-blue-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Date</p>
                                                            <p className="font-medium">{formatDate(event.date)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={16} className="text-purple-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Time</p>
                                                            <p className="font-medium">{formatTime(event.time)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users size={16} className="text-green-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Helpers Needed</p>
                                                            <p className="font-medium">{event.helpersNeeded || 'Flexible'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone size={16} className="text-orange-500" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">Contact</p>
                                                            <p className="font-medium">{event.hostNumber || 'Available'}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                {event.address && (
                                                    <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin size={16} className="text-blue-600 mt-0.5" />
                                                            <p className="text-sm text-gray-700">{event.address}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="flex gap-3">
                                                    <button className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                                                        Join Event
                                                    </button>
                                                    <button className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                                                        Details
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Hover Gradient Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                    <Calendar size={64} className="text-blue-500/50" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Events Found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search or create the first event!</p>
                                <button 
                                    onClick={onclickEvent}
                                    className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Create First Event
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Create Event Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={resetForm}
                    ></div>
                    
                    {/* Modal */}
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-purple-600 p-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Create New Event</h2>
                                    <p className="text-white/90 mt-1">Fill in the details to create your event</p>
                                </div>
                                <button 
                                    onClick={resetForm}
                                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <X size={24} className="text-white" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Event Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="eventName"
                                            value={newEvent.eventName}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            placeholder="Enter event name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Host Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="hostName"
                                            value={newEvent.hostName}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            placeholder="Your name or organization"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Date & Time
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="date"
                                                name="date"
                                                value={newEvent.date}
                                                onChange={handleInputChange}
                                                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            />
                                            <input
                                                type="time"
                                                name="time"
                                                value={newEvent.time}
                                                onChange={handleInputChange}
                                                className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Location Details
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={newEvent.location}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            placeholder="Venue name or area"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="hostNumber"
                                            value={newEvent.hostNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                            placeholder="Phone number for inquiries"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Helpers Needed
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="helpersNeeded"
                                                value={newEvent.helpersNeeded}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                                                placeholder="Number of helpers required"
                                                min="1"
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <Users size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Event Type
                                        </label>
                                        <select
                                            name="eventType"
                                            value={newEvent.eventType}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300 appearance-none"
                                        >
                                            {eventTypes.slice(1).map(type => (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address Field */}
                            <div className="mt-6 space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Complete Address
                                </label>
                                <textarea
                                    name="address"
                                    value={newEvent.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300 resize-none"
                                    placeholder="Full address for the event venue"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsList;
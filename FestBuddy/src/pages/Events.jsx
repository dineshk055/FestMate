import React, { useContext, useState } from 'react';
import { Plus, X, MapPin, Calendar, Clock, Users, Phone } from 'lucide-react';
import axios from "axios"
import { useEffect } from 'react';
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
    const [helpersCount,setHelpersCount]=useState(0);
    const [helpers,setHelpers]=useState("");
    const[msg,setMsg]=useState("");
    const{user}=useContext(UserContext);

    useEffect(()=>{
         const fetchData = async()=>{
            try {
                const gettedDatas= await axios.get("http://localhost:3000/api/auth/getEventDetails");
                setEvents(gettedDatas.data.getEvent)
                console.log(events)                 
            } catch (error) {
                toast.error("error on fetching data",error)
            }
         };
         fetchData();

    },[msg])

    
    const [showForm, setShowForm] = useState(false);
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
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

     const onclickEvent =()=>{
        if(!user){
            toast.error("Login is Required");
        } else {
            setShowForm(true);
        }
        

     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventDatas = await axios.post("http://localhost:3000/api/auth/eventDetails", newEvent)
            toast.success(eventDatas.data.msg)
            setMsg(eventDatas.data.msg)

            //for fetch helper detas by location

            const locationHelpers = await axios.get("http://localhost:3000/api/auth/getHelperByLocation",
                {
                    params: {location}
                }
            );

             console.log(locationHelpers);
             

            setHelpersCount(locationHelpers.data.count);
            setHelpers(locationHelpers.data.helpers)
            

        } catch (error) {
            // Handle error
        }
        resetForm();
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

    const getEventTypeColor = (type) => {
        const colors = {
            music: 'bg-purple-100 text-purple-800',
            conference: 'bg-blue-100 text-blue-800',
            wedding: 'bg-pink-100 text-pink-800',
            food: 'bg-orange-100 text-orange-800',
            corporate: 'bg-gray-100 text-gray-800',
            other: 'bg-green-100 text-green-800'
        };
        return colors[type] || colors.other;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                        <p className="text-gray-600 mt-2">Discover and join amazing events in your community</p>
                    </div>
                    <button 
                        onClick={onclickEvent}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Plus size={20} />
                        Add Event
                    </button>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl   overflow-hidden  hover:scale-105 duration-500">
                            <div className="p-6">
                                {/* Event Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 truncate">{event.eventName}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventTypeColor(event.eventType)}`}>
                                        {event.eventType}
                                    </span>
                                    <span>
                                        {helpersCount}
                                    </span>
                                </div>
                                
                                {/* Host Info */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Users size={16} className="text-gray-500" />
                                    <span className="text-gray-700 font-medium">{event.hostName}</span>
                                </div>

                                {/* Event Details */}
                                <div className="space-y-3">
                                    {/* Date and Time */}
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock size={16} />
                                        <span>{formatTime(event.time)}</span>
                                    </div>
                                    
                                    {/* Location */}
                                    <div className="flex items-start gap-2 text-gray-600">
                                        <MapPin size={16} className="mt-0.5" />
                                        <div>
                                            <p className="font-medium">{event.location}</p>
                                            {event.address && (
                                                <p className="text-sm text-gray-500 mt-1">{event.address}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Host Contact */}
                                    {event.hostNumber && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone size={16} />
                                            <span>{event.hostNumber}</span>
                                        </div>
                                    )}

                                    {/* Helpers Needed */}
                                    {event.helpersNeeded && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users size={16} />
                                            <span>{event.helpersNeeded} helpers needed</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                                    Join Event
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Calendar size={64} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
                        <p className="text-gray-500">Be the first to create an event!</p>
                    </div>
                )}
            </div>

            {/* Add Event Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-gray-800">Create New Event</h2>
                            <button 
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Column 1 */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Event Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="eventName"
                                            value={newEvent.eventName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Host Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="hostName"
                                            value={newEvent.hostName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={newEvent.date}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={newEvent.time}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={newEvent.location}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Host Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="hostNumber"
                                            value={newEvent.hostNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Helpers Needed
                                        </label>
                                        <input
                                            type="number"
                                            name="helpersNeeded"
                                            value={newEvent.helpersNeeded}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Event Type
                                        </label>
                                        <select
                                            name="eventType"
                                            value={newEvent.eventType}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="music">Music</option>
                                            <option value="conference">Conference</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="food">Food</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Address Field */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={newEvent.address}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
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
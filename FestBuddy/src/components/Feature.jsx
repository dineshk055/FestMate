// components/Features.jsx
import React from 'react';

const Feature = () => {
  const features = [
    {
      icon: 'fa-user-clock',
      title: 'Register Availability',
      description: 'Helpers and catering staff register their available time slots when they\'re free to work at festivals.',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      icon: 'fa-calendar-plus',
      title: 'Post Events',
      description: 'Festival organizers post their event details and specify how many helpers they need.',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      icon: 'fa-handshake',
      title: 'Automatic Matching',
      description: 'Our system automatically matches available helpers with events and suggests the best candidates.',
      gradient: 'from-blue-400 to-cyan-400'
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Streamline Your Festival Staffing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with reliable helpers and catering staff through our intelligent matching platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-linear-to-r ${feature.gradient} rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              
              <div className="relative bg-white rounded-3xl border border-gray-100 hover:border-transparent transition-all duration-300 p-8 h-full shadow-sm hover:shadow-2xl group-hover:scale-105">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700">{index + 1}</span>
                </div>
                
                {/* Icon container */}
                <div className={`w-20 h-20 bg-linear-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <i className={`fas ${feature.icon} text-white text-3xl`}></i>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-linear-to-r ${feature.gradient} rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
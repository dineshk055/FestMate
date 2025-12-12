// pages/About.js - Enhanced Version
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: '🎪',
      title: 'Intelligent Festival Matching',
      description: 'Our advanced algorithm analyzes multiple factors including location preferences, skill compatibility, availability windows, and past event ratings to create perfect matches between helpers and festivals.',
      details: [
        'Location-based matching within preferred radius',
        'Skill-to-requirement compatibility scoring',
        'Availability synchronization across time zones',
        'Historical performance and rating consideration'
      ]
    },
    {
      icon: '⏰',
      title: 'Smart Time Management',
      description: 'Helpers can set flexible availability patterns while hosts specify exact event timelines. Our system intelligently matches these schedules with buffer times and travel considerations.',
      details: [
        'Recurring availability patterns (weekly/monthly)',
        'Flexible shift scheduling with overlapping coverage',
        'Travel time calculation between events',
        'Real-time schedule conflict detection'
      ]
    },
    {
      icon: '🤝',
      title: 'Direct Connection Platform',
      description: 'Facilitate seamless communication between hosts and helpers with built-in messaging, video calls, and document sharing to ensure perfect event preparation and execution.',
      details: [
        'Secure in-app messaging with read receipts',
        'Video call integration for interviews',
        'Document sharing for contracts and guidelines',
        'Group chats for team coordination'
      ]
    },
    {
      icon: '⭐',
      title: 'Comprehensive Rating System',
      description: 'Build trusted reputations through our multi-dimensional rating system that evaluates reliability, skill proficiency, teamwork, and communication for both helpers and hosts.',
      details: [
        'Multi-category rating (punctuality, skills, attitude)',
        'Verified reviews with photo evidence',
        'Response rate and communication metrics',
        'Achievement badges and certifications'
      ]
    },
    {
      icon: '💰',
      title: 'Secure Payment Processing',
      description: 'Handle all financial transactions securely with automated payments, escrow services, and transparent fee structures that protect both helpers and event organizers.',
      details: [
        'Escrow payment protection',
        'Automated payroll processing',
        'Transparent fee breakdown',
        'Multiple payment method support'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile-First Experience',
      description: 'Access all platform features on-the-go with our responsive design and dedicated mobile app for real-time updates, push notifications, and quick responses.',
      details: [
        'Progressive Web App (PWA) functionality',
        'Offline capability for critical information',
        'Push notifications for urgent updates',
        'Mobile-optimized scheduling interface'
      ]
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Active Helpers', sublabel: 'Across 50+ cities' },
    { number: '450+', label: 'Successful Events', sublabel: 'With 98% completion rate' },
    { number: '4.8/5', label: 'Average Rating', sublabel: 'Based on 3,200+ reviews' },
    { number: '15min', label: 'Average Match Time', sublabel: 'From posting to connection' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former event manager with 8+ years in festival organization. Passionate about creating better experiences for both helpers and hosts.',
      expertise: ['Event Management', 'Operations', 'Community Building'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      bio: 'Tech entrepreneur with background in AI and matching algorithms. Built three successful marketplace platforms.',
      expertise: ['AI/ML', 'Platform Architecture', 'Scalability'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Community',
      bio: 'Community manager with experience building engaged user bases for sharing economy platforms.',
      expertise: ['User Engagement', 'Support Systems', 'Trust & Safety'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const milestones = [
    { year: '2022', event: 'Platform Launch', description: 'Started with 50 helpers and 10 festival partners in our pilot city' },
    { year: '2023', event: 'Series A Funding', description: 'Raised $4M to expand to 10 new cities and enhance our matching technology' },
    { year: '2024', event: 'National Expansion', description: 'Currently operating in 25 cities with plans to reach 50 by year-end' },
    { year: '2025', event: 'Global Vision', description: 'Planning international expansion with focus on European and Asian markets' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-linear-to-br from-purple-900 via-blue-800 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <span className="text-yellow-300">✨</span>
              <span className="font-semibold">Trusted by 450+ Events Worldwide</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
              About FestMate
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing festival staffing by creating meaningful connections between passionate helpers
              and incredible events. Our platform ensures every festival has the support it needs while providing
              unforgettable experiences for our community.
            </p>

          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section className="py-20 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="text-purple-600 font-semibold text-lg mb-2 block">Our Story</span>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Building Better Festival Experiences</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  FestMate was born from a simple idea — to make festival organizing easier and more connected.

                  After facing struggles in finding reliable helpers for major events, we realized the need for a platform that connects passionate volunteers with organizers who truly value them.

                  Our mission is to bring people together — those who love to serve, and those who need support to make their festivals shine.

                  With FestMate, event organizers can easily find trusted members, while helpers get exciting opportunities to be part of unforgettable celebrations.

                  Whether it's catering, stage setup, or crowd management — FestMate bridges the gap between skill and opportunity.

                  Together, we're not just managing events — we're building a community of festival changemakers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600 text-sm">
                    To create the world's most trusted platform for event staffing, where every helper finds
                    meaningful work and every event receives exceptional support.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-3xl mb-3">❤️</div>
                  <h3 className="font-bold text-gray-900 mb-2">Our Values</h3>
                  <p className="text-gray-600 text-sm">
                    Community-first approach, transparency in all operations, and commitment to creating
                    win-win situations for everyone involved.
                  </p>
                </div>
              </div>

              <div className="bg-linear-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                <h4 className="font-bold text-purple-900 mb-3">Why Choose FestMate?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Advanced matching technology for perfect placements
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Comprehensive support and dispute resolution
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Secure payment processing with escrow protection
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Festival Team Collaboration"
                  className="rounded-2xl shadow-2xl transform rotate-2"
                />
                <img
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Festival Celebration"
                  className="rounded-2xl shadow-2xl transform -rotate-2 mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">98% Success Rate</div>
                    <div className="text-sm text-gray-600">Event completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg mb-2 block">Platform Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Create Perfect Matches</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform handles every aspect of festival staffing, from initial matching
              to post-event feedback and payments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}


      {/* Team Section */}


      {/* Timeline Section */}


      {/* Enhanced CTA Section */}
      <section className="py-20 bg-linear-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Join Our Growing Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're looking for help or want to be part of amazing events, FestivalHelper
            provides the tools and support you need for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
            <Link
              to="/SignUp"
              className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <span>🌟</span>
              <span>Register Now</span>
            </Link>
          </div>
          <p className="mt-6 text-purple-200">
            Join 2,500+ helpers and 450+ events already on our platform
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
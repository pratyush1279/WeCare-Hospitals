import React, { useState } from 'react';
import { 
  Heart, Calendar, Award, Star, ArrowRight, Check, Activity, Shield, Users, 
  Clock, ShieldCheck, HeartPulse, Stethoscope, ChevronRight, MessageSquare 
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, REVIEWS, FAQS } from '../data/hospitalData';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function HomeSection({ setCurrentTab, openBookingModal }: HomeSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const stats = [
    { value: '18+', label: 'Years of Service', icon: Award, color: 'text-teal-600 bg-teal-50' },
    { value: '45+', label: 'Specialist Doctors', icon: Stethoscope, color: 'text-blue-600 bg-blue-50' },
    { value: '15k+', label: 'Patients Treated', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
    { value: '99.2%', label: 'Satisfaction Rate', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' }
  ];

  const highlights = [
    {
      title: '24/7 Emergency Care',
      desc: 'Round-the-clock emergency responses led by board-certified trauma physicians.',
      icon: Clock,
      color: 'border-rose-100 bg-rose-50/30 text-rose-600'
    },
    {
      title: 'Expert Specialists',
      desc: 'Our physicians are pioneers in their medical fields, bringing Mayo Clinic and Harvard experiences.',
      icon: Users,
      color: 'border-teal-100 bg-teal-50/30 text-teal-600'
    },
    {
      title: 'Advanced Medical Tech',
      desc: 'State-of-the-art robotic-assisted surgery, 3D neuroimaging, and modern labs.',
      icon: Shield,
      color: 'border-blue-100 bg-blue-50/30 text-blue-600'
    }
  ];

  return (
    <div id="home-section" className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section id="hero-banner" className="relative bg-gradient-to-br from-teal-50/60 via-slate-50 to-blue-50/40 pt-8 pb-16 sm:pb-24">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-800 shadow-sm animate-fade-in">
                <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0" />
                <span>Ranked #1 Healthcare Provider for Patient Care Quality</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Your Health is Our <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-700">
                  Absolute Priority
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                At WeCare Hospitals, we blend world-class medical innovation with genuine human empathy. Our highly specialized physicians provide personalized clinical therapies for complete recovery.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-book-btn"
                  onClick={openBookingModal}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-teal-600/10 hover:shadow-teal-600/25 transition-all duration-200 flex items-center justify-center space-x-2 hover:-translate-y-0.5"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Free Consultation</span>
                </button>
                <button
                  id="hero-departments-btn"
                  onClick={() => setCurrentTab('departments')}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-2xl border border-slate-200 shadow-sm transition-all duration-200 flex items-center justify-center space-x-1.5"
                >
                  <span>Explore Departments</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Trust Badge Icons */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">JCI</p>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Accredited</p>
                </div>
                <div className="text-center lg:text-left border-x border-slate-200 px-4">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">99.4%</p>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Patient Success</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">24/7</p>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Emergency Response</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Graphic Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Backdrop Frame */}
                <div className="absolute -inset-4 rounded-3xl bg-teal-100/40 blur-2xl -z-10" />
                
                {/* Modern Visual Card mimicking high-end medical portal */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex items-center space-x-2.5">
                      <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">OPD Live Queue Status</span>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">All wings active</span>
                  </div>

                  {/* Highlights mini panel */}
                  <div className="space-y-4">
                    <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100/50 flex items-center space-x-4">
                      <div className="p-3 bg-teal-600 text-white rounded-xl">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-teal-800 uppercase tracking-wider font-mono">Cardiology Department</p>
                        <p className="text-sm font-semibold text-slate-800">Dr. Evelyn Vance is online</p>
                        <p className="text-xs text-slate-500">Next available slot: Today, 01:30 PM</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-teal-400 shrink-0" />
                    </div>

                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-center space-x-4">
                      <div className="p-3 bg-blue-600 text-white rounded-xl">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider font-mono">Pediatric Center</p>
                        <p className="text-sm font-semibold text-slate-800">Dr. Maria Delgado is online</p>
                        <p className="text-xs text-slate-500">All slots full for today • Try tomorrow</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-blue-400 shrink-0" />
                    </div>
                  </div>

                  {/* Booking Trigger Widget */}
                  <div className="bg-slate-50/80 p-4 rounded-2xl text-center border border-slate-100">
                    <p className="text-xs text-slate-600 font-medium mb-3">Skip long patient queues. Book your specialist slot instantly.</p>
                    <button 
                      onClick={openBookingModal}
                      className="w-full bg-slate-900 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-md shadow-slate-900/10 hover:shadow-teal-600/15"
                    >
                      Instant Booking Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Medical Metrics / Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center space-y-2 group"
            >
              <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-105`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Clinical Highlights Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Why WeCare Hospitals</h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Pioneering Health with Empathy</p>
            <p className="text-sm sm:text-base text-slate-600">
              We understand that visiting a hospital can be overwhelming. We strive to provide a supportive, stress-free clinical ecosystem that heals body and spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div 
                key={highlight.title} 
                className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col space-y-4"
              >
                <div className={`p-3 rounded-xl border w-fit ${highlight.color}`}>
                  <highlight.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{highlight.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{highlight.desc}</p>
                <div className="pt-2 border-t border-slate-50 flex items-center text-xs font-semibold text-teal-600">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our Departments</h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">World-Class Specialized Care</p>
            <p className="text-sm sm:text-base text-slate-600">
              Our clinical wings are organized into highly focused medical departments, each led by renowned senior specialist physicians.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentTab('departments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center shrink-0 border border-teal-100 hover:border-teal-200 bg-teal-50/50 px-4 py-2.5 rounded-xl transition-all"
          >
            <span>View All 6 Departments</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEPARTMENTS.slice(0, 3).map((dept) => {
            const docCount = DOCTORS.filter(d => d.departmentId === dept.id).length;
            return (
              <div 
                key={dept.id} 
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Card Top */}
                <div className="space-y-4">
                  <div className="bg-teal-50 text-teal-600 p-3.5 rounded-2xl w-fit group-hover:scale-105 transition-transform">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">{docCount} Specialists Active</span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mt-0.5">{dept.name}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{dept.description}</p>
                </div>

                {/* Card Bottom / Interactive highlights */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={() => {
                      setCurrentTab('departments');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm font-semibold text-slate-800 hover:text-teal-600 transition-colors flex items-center"
                  >
                    <span>Read Department Guides</span>
                    <ChevronRight className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Patient Reviews Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Patient Success</h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Empathy That Saved Lives</p>
            <p className="text-sm sm:text-base text-slate-600">
              Read transparent reports and reviews written by patients who entrusted their medical care to WeCare Specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 fill-current ${i < Math.floor(review.rating) ? 'text-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100/60">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{review.patientName}</p>
                    <p className="text-xs text-slate-400">{review.date}</p>
                  </div>
                  {review.doctorName && (
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
                      Consulted: {review.doctorName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Frequently Asked</h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Patient Support Desk</p>
          <p className="text-sm text-slate-500">
            Find direct guidelines regarding scheduling, documentation, insurance partnerships, and billing processes.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white border rounded-2xl transition-all duration-200 ${
                  isOpen ? 'border-teal-300 shadow-md shadow-teal-600/5' : 'border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                  <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-teal-600' : ''}`}>
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-50 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

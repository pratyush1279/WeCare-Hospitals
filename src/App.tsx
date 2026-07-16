import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import DoctorsSection from './components/DoctorsSection';
import AppointmentSection from './components/AppointmentSection';
import { useAuth } from './components/AuthContext';
import { Phone, Clock, ShieldCheck } from 'lucide-react';

export default function App() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string>('');
  const [preselectedDeptId, setPreselectedDeptId] = useState<string>('');
  const [appointmentSubView, setAppointmentSubView] = useState<'book' | 'history'>('book');

  // Trigger when selecting a doctor specifically from sections
  const handleBookDoctorDirect = (doctorId: string, departmentId: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedDeptId(departmentId);
    setAppointmentSubView('book');
    setCurrentTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger general booking modal/tab
  const handleOpenGeneralBooking = () => {
    setPreselectedDoctorId('');
    setPreselectedDeptId('');
    setAppointmentSubView('book');
    setCurrentTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear selections once processed
  const handleClearPreselections = () => {
    setPreselectedDoctorId('');
    setPreselectedDeptId('');
  };

  // Quick action from header tab or buttons
  const handleTabChange = (tabId: string) => {
    if (tabId === 'appointments') {
      setAppointmentSubView('book');
    }
    setCurrentTab(tabId);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-teal-500/10 selection:text-teal-900">
      {/* 1. Top Urgent Clinical Alert Strip */}
      <div id="emergency-bar" className="bg-slate-900 text-slate-100 py-2.5 px-4 text-center border-b border-slate-800 text-xs font-medium z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
          <span className="flex items-center text-rose-400 font-bold tracking-wide uppercase">
            <span className="h-2 w-2 bg-rose-500 rounded-full mr-2 animate-ping" />
            24/7 Emergency Wing
          </span>
          <span className="text-slate-300">
            Urgent cardiac or neurological trauma? Call: <strong className="text-white">+1 (800) 555-CARE</strong>
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-teal-400 font-semibold flex items-center">
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Joint Commission International Standard Certified
          </span>
        </div>
      </div>

      {/* 2. Primary Navigation Header */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={handleTabChange} 
        openBookingModal={handleOpenGeneralBooking} 
      />

      {/* 3. Main Clinical Portal Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {currentTab === 'home' && (
          <HomeSection 
            setCurrentTab={handleTabChange} 
            openBookingModal={handleOpenGeneralBooking} 
          />
        )}

        {currentTab === 'about' && (
          <AboutSection />
        )}

        {currentTab === 'departments' && (
          <DepartmentsSection 
            onBookDoctor={handleBookDoctorDirect} 
            selectedDeptId={preselectedDeptId}
          />
        )}

        {currentTab === 'doctors' && (
          <DoctorsSection 
            onBookDoctor={handleBookDoctorDirect} 
          />
        )}

        {currentTab === 'appointments' && (
          <AppointmentSection 
            preselectedDoctorId={preselectedDoctorId}
            preselectedDeptId={preselectedDeptId}
            clearPreselections={handleClearPreselections}
            activeView={appointmentSubView}
          />
        )}
      </main>

      {/* 4. Global Footer block */}
      <Footer setCurrentTab={handleTabChange} />
    </div>
  );
}

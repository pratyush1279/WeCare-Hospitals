import React, { useState } from 'react';
import { Menu, X, Calendar, Activity, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from './AuthContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openBookingModal: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, openBookingModal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const isAdmin = false;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'appointments', label: 'My Appointments' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
    } catch (e) {
      console.error('Error signing out:', e);
    }
  };

  return (
    <header id="hospital-header" className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div 
            id="nav-logo" 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md shadow-teal-600/10 transition-transform group-hover:scale-105">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center">
                We<span className="text-teal-600">Care</span>
              </span>
              <span className="text-[10px] text-slate-500 block font-mono -mt-1 tracking-wider uppercase">
                Hospitals
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button & User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-2xl">
                <div className={`h-8 w-8 ${isAdmin ? 'bg-slate-900' : 'bg-teal-600'} text-white rounded-xl flex items-center justify-center font-bold text-xs uppercase`}>
                  {isAdmin ? 'AD' : (userProfile?.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U')}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {isAdmin ? 'Clinical Admin' : (userProfile?.name || user.email)}
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono leading-none">
                    {isAdmin ? 'CLINIC ADMIN' : 'PATIENT ACCOUNT'}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('appointments')}
                className="text-teal-600 hover:text-teal-700 text-sm font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5"
              >
                <UserCheck className="h-4 w-4" />
                <span>Patient Portal</span>
              </button>
            )}

            <button
              id="header-book-btn"
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-teal-600/15 hover:shadow-teal-600/25 transition-all duration-200 flex items-center space-x-2 hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-book-btn-mini"
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg shadow-md"
              title="Book Appointment"
            >
              <Calendar className="h-5 w-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-b border-slate-100 bg-white shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {user && (
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`h-9 w-9 ${isAdmin ? 'bg-slate-900' : 'bg-teal-600'} text-white rounded-xl flex items-center justify-center font-bold text-sm uppercase`}>
                    {isAdmin ? 'AD' : (userProfile?.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      {isAdmin ? 'Clinical Admin' : (userProfile?.name || user.email)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {isAdmin ? 'CLINIC ADMIN' : 'PATIENT PORTAL'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-xl transition-colors flex items-center space-x-1.5 text-xs font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  currentTab === item.id
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && <div className="h-1.5 w-1.5 bg-teal-600 rounded-full" />}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100">
              <button
                id="mobile-drawer-book-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-3.5 rounded-xl font-semibold shadow-md flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Appointment Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

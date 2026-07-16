import React from 'react';
import { Activity, Phone, Mail, MapPin, Clock, Heart, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'About WeCare', tab: 'about' },
    { label: 'Medical Departments', tab: 'departments' },
    { label: 'Our Specialists', tab: 'doctors' },
    { label: 'My Appointments', tab: 'appointments' }
  ];

  const departments = [
    { label: 'Cardiology', tab: 'departments' },
    { label: 'Neurology', tab: 'departments' },
    { label: 'Pediatrics', tab: 'departments' },
    { label: 'Orthopedics', tab: 'departments' },
    { label: 'Oncology', tab: 'departments' }
  ];

  const handleLinkClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="wecare-footer" className="bg-slate-900 text-slate-300">
      {/* Top Banner: Emergency helpline */}
      <div className="border-b border-slate-800 bg-teal-950/60 text-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <span className="p-2 bg-red-500/20 text-red-400 rounded-full animate-pulse">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-teal-300 uppercase tracking-wider font-semibold font-mono">24/7 Emergency Medical Helpline</p>
              <p className="text-lg font-bold text-white">+1 (800) 555-CARE / +1 (800) 911-0000</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-teal-200">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              <span>JCI Accredited Hospital</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-teal-400" />
              <span>Ranked #1 Regional Care</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  We<span className="text-teal-400">Care</span>
                </span>
                <span className="text-[10px] text-slate-400 block font-mono -mt-1 tracking-wider uppercase">
                  Hospitals
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              WeCare Hospitals provides world-class diagnostic, therapeutic, and surgical medical healthcare. Guided by empathy, advanced technology, and patient-first specialists.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-start space-x-2.5 text-sm">
                <MapPin className="h-4.5 w-4.5 text-teal-400 shrink-0 mt-0.5" />
                <span>100 Healthcare Parkway, Medical Plaza, Metro City</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm">
                <Mail className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                <span>contact@wecarehospitals.com</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 tracking-wide uppercase font-mono text-teal-400">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.tab)}
                    className="hover:text-teal-400 transition-colors flex items-center group text-left w-full"
                  >
                    <span className="h-1 w-0 bg-teal-400 rounded-full mr-0 group-hover:w-1.5 group-hover:mr-2 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Specialties */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 tracking-wide uppercase font-mono text-teal-400">Our Specialties</h3>
            <ul className="space-y-3 text-sm">
              {departments.map((dept) => (
                <li key={dept.label}>
                  <button
                    onClick={() => handleLinkClick(dept.tab)}
                    className="hover:text-teal-400 transition-colors flex items-center group text-left w-full"
                  >
                    <span className="h-1 w-0 bg-teal-400 rounded-full mr-0 group-hover:w-1.5 group-hover:mr-2 transition-all" />
                    <span>{dept.label} Center</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours & Newsletter */}
          <div className="space-y-5">
            <div>
              <h3 className="text-white font-semibold text-base mb-4 tracking-wide uppercase font-mono text-teal-400">OPD & Visiting Hours</h3>
              <div className="space-y-2 text-sm text-slate-400 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal-500" />
                    <span>Weekdays</span>
                  </span>
                  <span className="text-white font-medium">08:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal-500" />
                    <span>Saturdays</span>
                  </span>
                  <span className="text-white font-medium">09:00 AM - 05:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-teal-400">
                  <span>Emergency Wing</span>
                  <span className="font-bold">24 Hours / 7 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} WeCare Hospitals Group. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

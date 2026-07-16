import React, { useState } from 'react';
import { 
  Heart, Brain, Baby, Bone, ShieldAlert, Sparkles, Check, ChevronRight, 
  User, Star, CalendarDays, ArrowRight, ShieldCheck, Stethoscope 
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { Department, Doctor } from '../types';

interface DepartmentsSectionProps {
  onBookDoctor: (doctorId: string, departmentId: string) => void;
  selectedDeptId?: string;
}

export default function DepartmentsSection({ onBookDoctor, selectedDeptId }: DepartmentsSectionProps) {
  const [activeDeptId, setActiveDeptId] = useState<string>(selectedDeptId || DEPARTMENTS[0].id);

  const activeDept = DEPARTMENTS.find(d => d.id === activeDeptId) || DEPARTMENTS[0];
  const deptDoctors = DOCTORS.filter(doc => doc.departmentId === activeDept.id);

  // Helper to map department icons to Lucide components
  const renderDeptIcon = (iconName: string, className: string = "h-6 w-6") => {
    switch (iconName) {
      case 'Heart': return <Heart className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Bone': return <Bone className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Stethoscope className={className} />;
    }
  };

  return (
    <div id="departments-section" className="space-y-12">
      {/* 1. Introductory Title */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our Specialties</h1>
        <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Comprehensive Clinical Departments
        </p>
        <p className="text-sm sm:text-base text-slate-600">
          WeCare Hospitals is categorized into six highly optimized specialized branches. Explore our clinical services, medical diagnostics, and leading specialist doctors.
        </p>
      </section>

      {/* 2. Interactive Navigation Panel & Main Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Vertical Quick Tabs */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono px-3 mb-3">Select Medical Department</p>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {DEPARTMENTS.map((dept) => {
              const isActive = dept.id === activeDeptId;
              const docCount = DOCTORS.filter(d => d.departmentId === dept.id).length;
              return (
                <button
                  key={dept.id}
                  id={`dept-tab-${dept.id}`}
                  onClick={() => setActiveDeptId(dept.id)}
                  className={`flex flex-col lg:flex-row items-center lg:items-center text-center lg:text-left p-4 rounded-2xl border transition-all ${
                    isActive 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/15 scale-[1.02] z-10' 
                      : 'bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mr-0 lg:mr-4 mb-2 lg:mb-0 shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-600'}`}>
                    {renderDeptIcon(dept.icon, "h-5 w-5")}
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm tracking-tight">{dept.shortName}</p>
                    <p className={`text-[10px] uppercase font-mono ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                      {docCount} Specialists
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Dynamic Content Display */}
        <div id="dept-details-card" className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10 animate-fade-in">
          {/* Title and Narrative */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-teal-600">
              <div className="bg-teal-50 p-3 rounded-2xl">
                {renderDeptIcon(activeDept.icon, "h-7 w-7")}
              </div>
              <span className="text-xs uppercase font-bold tracking-wider font-mono bg-teal-50 px-3 py-1 rounded-full">Active wing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{activeDept.name}</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{activeDept.longDescription}</p>
          </div>

          {/* Featured Services & Conditions treated */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider font-mono text-teal-600">Featured Services</h3>
              <ul className="space-y-3">
                {activeDept.featuredServices.map((service, i) => (
                  <li key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <span className="p-1 bg-teal-50 text-teal-600 rounded-full mr-3 shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider font-mono text-teal-600">Common Conditions Treated</h3>
              <ul className="space-y-3">
                {activeDept.conditionsTreated.map((condition, i) => (
                  <li key={i} className="flex items-center text-xs sm:text-sm text-slate-700">
                    <span className="h-1.5 w-1.5 bg-cyan-500 rounded-full mr-3.5 shrink-0" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specialist Doctors assigned in department */}
          <div className="pt-8 border-t border-slate-50 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Department Specialists</h3>
                <p className="text-xs text-slate-400">Schedule directly with our accredited department staff.</p>
              </div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {deptDoctors.length} doctors found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {deptDoctors.map((doc) => (
                <div 
                  key={doc.id} 
                  id={`doc-card-${doc.id}`}
                  className="bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Doctor Info */}
                    <div className="flex items-start space-x-3.5">
                      <div className="h-12 w-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg uppercase shrink-0">
                        {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-teal-600 transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-teal-600 font-semibold">{doc.role}</p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase mt-0.5">{doc.education}</p>
                      </div>
                    </div>

                    {/* Meta stats */}
                    <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1.5 border-t border-slate-100">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1" />
                        <span className="font-bold text-slate-700">{doc.rating}</span>
                        <span className="text-slate-400 ml-0.5">({doc.reviewsCount})</span>
                      </div>
                      <div>
                        <span>Exp: <strong className="text-slate-700">{doc.experience} Years</strong></span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase font-mono text-slate-400">OPD Days</p>
                      <p className="text-xs font-bold text-slate-700">{doc.availability.days.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => onBookDoctor(doc.id, activeDept.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-md shadow-teal-600/10"
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>Book Doctor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

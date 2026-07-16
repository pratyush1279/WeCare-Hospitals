import React, { useState, useMemo } from 'react';
import { 
  Search, Star, CalendarDays, Filter, RefreshCw, X, Stethoscope, 
  ChevronRight, Languages, Award, Clock 
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onBookDoctor: (doctorId: string, departmentId: string) => void;
}

export default function DoctorsSection({ onBookDoctor }: DoctorsSectionProps) {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [minExperience, setMinExperience] = useState(10); // Minimum 10 years experience as default bounds

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedGender('all');
    setMinExperience(10);
  };

  // Filter logic
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search term
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        doc.languages.some(l => l.toLowerCase().includes(searchTerm.toLowerCase()));

      // Department
      const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;

      // Gender
      const matchesGender = selectedGender === 'all' || doc.gender === selectedGender;

      // Experience
      const matchesExperience = doc.experience >= minExperience;

      return matchesSearch && matchesDept && matchesGender && matchesExperience;
    });
  }, [searchTerm, selectedDept, selectedGender, minExperience]);

  return (
    <div id="doctors-section" className="space-y-8">
      {/* 1. Header Narrative */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our Specialists</h1>
        <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Consult With Board-Certified Doctors
        </p>
        <p className="text-sm sm:text-base text-slate-600">
          WeCare specialists are pioneers in medicine, leading academic and clinical research at international levels. Match with a physician according to your health conditions.
        </p>
      </section>

      {/* 2. Search & Filter Bar widget */}
      <section className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              id="doctor-search-input"
              placeholder="Search by name, specialist title, languages or bio details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Department Select */}
          <div className="md:col-span-3">
            <select
              id="dept-filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 rounded-2xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.shortName} Wing</option>
              ))}
            </select>
          </div>

          {/* Gender Select */}
          <div className="md:col-span-3">
            <select
              id="gender-filter-select"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 rounded-2xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="male">Male Doctors</option>
              <option value="female">Female Doctors</option>
            </select>
          </div>
        </div>

        {/* Bottom filter details */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-slate-50 gap-4">
          {/* Experience slider */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 shrink-0 font-mono uppercase">Min Experience:</span>
            <input
              type="range"
              id="experience-slider"
              min="10"
              max="22"
              value={minExperience}
              onChange={(e) => setMinExperience(parseInt(e.target.value))}
              className="w-full sm:w-40 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md font-mono">{minExperience}+ Years</span>
          </div>

          {/* Controls indicators / Reset */}
          <div className="flex items-center space-x-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-slate-400 font-medium">
              Showing <strong>{filteredDoctors.length}</strong> of <strong>{DOCTORS.length}</strong> experts
            </span>
            <button
              onClick={handleResetFilters}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center space-x-1 border border-teal-100 hover:border-teal-200 bg-teal-50/40 px-3 py-1.5 rounded-xl transition-all"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Doctors Display Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDoctors.map((doc) => {
            const dept = DEPARTMENTS.find(d => d.id === doc.departmentId);
            return (
              <div 
                key={doc.id} 
                id={`doctor-card-${doc.id}`}
                className="bg-white border border-slate-100 hover:border-teal-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-600/10 group-hover:bg-teal-600 transition-colors" />

                <div className="space-y-4">
                  {/* Department Tag */}
                  <span className="inline-block text-[9px] uppercase font-bold tracking-widest font-mono text-teal-700 bg-teal-50 border border-teal-100/50 px-2.5 py-1 rounded-lg">
                    {dept?.shortName || doc.departmentId}
                  </span>

                  {/* Doctor Info Block */}
                  <div className="flex items-start space-x-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center font-bold text-xl uppercase shrink-0 shadow-sm">
                      {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors tracking-tight text-sm sm:text-base leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-teal-600 font-semibold">{doc.role}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{doc.education}</p>
                    </div>
                  </div>

                  {/* Rating block */}
                  <div className="flex items-center space-x-4 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1" />
                      <span className="font-bold text-slate-700">{doc.rating}</span>
                      <span className="text-slate-400 ml-0.5">({doc.reviewsCount} reviews)</span>
                    </div>
                    <div className="h-3.5 w-px bg-slate-200" />
                    <div className="flex items-center">
                      <Award className="h-3.5 w-3.5 text-teal-500 mr-1" />
                      <span className="text-slate-600 font-medium">{doc.experience} Yrs Experience</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {doc.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer/Action area */}
                <div className="mt-6 pt-5 border-t border-slate-100/80 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                  <div>
                    <div className="flex items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                      <Clock className="h-3 w-3 text-teal-500 mr-1" />
                      <span>Availability</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-tight mt-0.5">{doc.availability.hours}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{doc.availability.days.join(', ')}</p>
                  </div>
                  <button
                    id={`book-doc-btn-${doc.id}`}
                    onClick={() => onBookDoctor(doc.id, doc.departmentId)}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-600/15"
                  >
                    <CalendarDays className="h-4 w-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state filter fallback */
        <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 max-w-lg mx-auto space-y-4">
          <div className="bg-slate-100 text-slate-400 p-4 rounded-full w-fit mx-auto">
            <Search className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Specialists Found</h3>
            <p className="text-sm text-slate-500 px-6">
              No medical specialists matches your current search filters. Try resetting the filters or easing the minimum experience parameter.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
}

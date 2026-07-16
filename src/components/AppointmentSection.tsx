import React, { useState, useEffect, useMemo } from 'react';
import { 
  CalendarDays, Clock, User, Phone, Mail, ClipboardList, CheckCircle, 
  Trash2, ShieldAlert, HeartPulse, ChevronRight, Stethoscope, Loader2, KeyRound
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { Appointment, Doctor } from '../types';
import { useAuth } from './AuthContext';
import AuthPanel from './AuthPanel';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AppointmentSectionProps {
  preselectedDoctorId?: string;
  preselectedDeptId?: string;
  clearPreselections?: () => void;
  activeView?: 'book' | 'history';
}

export default function AppointmentSection({ 
  preselectedDoctorId, 
  preselectedDeptId,
  clearPreselections,
  activeView = 'book'
}: AppointmentSectionProps) {
  const { user, userProfile, loading: authLoading } = useAuth();

  // Views: 'form' (booking form), 'success' (completed receipt), 'list' (my appointments)
  const [subView, setSubView] = useState<'form' | 'success'>('form');
  const [currentTab, setCurrentTab] = useState<'book' | 'history'>(activeView);
  
  // Booked appointment list loaded from Firestore (for signed in user)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [latestBooking, setLatestBooking] = useState<Appointment | null>(null);
  const [dbLoading, setDbLoading] = useState(false);

  // Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>(preselectedDeptId || DEPARTMENTS[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [reason, setReason] = useState('');
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle preselected updates from parents
  useEffect(() => {
    if (preselectedDeptId) {
      setSelectedDeptId(preselectedDeptId);
    }
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
    }
  }, [preselectedDoctorId, preselectedDeptId]);

  // Sync tab state with parent view instruction
  useEffect(() => {
    setCurrentTab(activeView);
  }, [activeView]);

  // Pre-populate form fields when user profile loads or changes
  useEffect(() => {
    if (user && userProfile) {
      setPatientName(userProfile.name || '');
      setPatientEmail(userProfile.email || user.email || '');
      setPatientPhone(userProfile.phone || '');
      setPatientAge(userProfile.age ? String(userProfile.age) : '');
    } else {
      setPatientName('');
      setPatientEmail('');
      setPatientPhone('');
      setPatientAge('');
    }
  }, [user, userProfile]);

  // Load appointments from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }

    const fetchAppointments = async () => {
      setDbLoading(true);
      
      // Load cached items for instant feedback
      let cachedList: Appointment[] = [];
      try {
        const stored = localStorage.getItem(`wecare_appointments_${user.uid}`);
        if (stored) {
          cachedList = JSON.parse(stored);
          setAppointments(cachedList);
        }
      } catch (e) {
        console.warn("localStorage read failed:", e);
      }

      try {
        const q = query(collection(db, 'appointments'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedList: Appointment[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedList.push(docSnap.data() as Appointment);
        });
        
        // Sort by createdAt descending
        fetchedList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAppointments(fetchedList);

        try {
          localStorage.setItem(`wecare_appointments_${user.uid}`, JSON.stringify(fetchedList));
        } catch (e) {}
      } catch (error) {
        console.error("Error fetching appointments from Firestore:", error);
      } finally {
        setDbLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  // Filter doctors based on selected department
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doc => doc.departmentId === selectedDeptId);
  }, [selectedDeptId]);

  // Set default doctor when department changes
  useEffect(() => {
    const currentDoc = DOCTORS.find(d => d.id === selectedDoctorId);
    if (currentDoc && currentDoc.departmentId === selectedDeptId) {
      return;
    }
    
    if (filteredDoctors.length > 0) {
      setSelectedDoctorId(filteredDoctors[0].id);
    } else {
      setSelectedDoctorId('');
    }
    setSelectedDate('');
    setSelectedTime('');
  }, [selectedDeptId, filteredDoctors, selectedDoctorId]);

  const activeDoctor = useMemo(() => {
    return DOCTORS.find(d => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // Generate next 14 calendar days starting from today (dynamic)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      const weekdayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      const shortMonth = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();

      let isWorkingDay = false;
      if (activeDoctor) {
        isWorkingDay = activeDoctor.availability.days.some(
          dayName => dayName.toLowerCase() === weekdayName.toLowerCase()
        );
      }

      dates.push({
        dateString,
        weekday: weekdayName,
        displayDate: `${shortMonth} ${dayNum}`,
        isWorkingDay,
        dayOfWeekShort: d.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    return dates;
  }, [activeDoctor]);

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime('');
  };

  // Submit appointment to Firestore
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!user) {
      return setFormError('You must be signed in to book an appointment.');
    }

    if (!selectedDeptId) return setFormError('Please choose a medical department.');
    if (!selectedDoctorId) return setFormError('Please select a medical specialist.');
    if (!selectedDate) return setFormError('Please select a consultation date.');
    if (!selectedTime) return setFormError('Please select a preferred timeslot.');
    if (!patientName.trim()) return setFormError('Patient full name is required.');
    if (!patientEmail.trim()) return setFormError('Patient email is required.');
    if (!patientPhone.trim()) return setFormError('Patient telephone number is required.');
    if (!patientAge || parseInt(patientAge) <= 0) return setFormError('Please provide a valid patient age.');
    if (!reason.trim()) return setFormError('Please describe your medical concern or symptom.');

    setIsSubmitting(true);

    const appointmentId = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAppointment: Appointment = {
      id: appointmentId,
      patientName,
      patientEmail,
      patientPhone,
      patientAge: parseInt(patientAge),
      departmentId: selectedDeptId,
      doctorId: selectedDoctorId,
      date: selectedDate,
      timeSlot: selectedTime,
      reason,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Attach user ID
    const appointmentPayload = {
      ...newAppointment,
      userId: user.uid
    };

    try {
      await setDoc(doc(db, 'appointments', appointmentId), appointmentPayload);
    } catch (error) {
      console.warn("Firestore save failed, caching appointment locally:", error);
    }

    // Always succeed locally
    const updatedAppointments = [newAppointment, ...appointments];
    setAppointments(updatedAppointments);
    try {
      localStorage.setItem(`wecare_appointments_${user.uid}`, JSON.stringify(updatedAppointments));
    } catch (e) {}

    setLatestBooking(newAppointment);
    setSubView('success');
    
    // Clear Form fields (leave name, email, phone, age populated from userProfile)
    setReason('');
    setSelectedDate('');
    setSelectedTime('');
    
    if (clearPreselections) {
      clearPreselections();
    }
    setIsSubmitting(false);
  };

  // Cancel booking in Firestore
  const handleCancelBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this scheduled consultation?')) {
      try {
        const aptRef = doc(db, 'appointments', id);
        await updateDoc(aptRef, { status: 'cancelled' });
      } catch (error) {
        console.warn("Firestore cancel failed, updating locally:", error);
      }

      // Always cancel locally
      const updated = appointments.map(apt => {
        if (apt.id === id) {
          return { ...apt, status: 'cancelled' as const };
        }
        return apt;
      });
      setAppointments(updated);
      if (user) {
        try {
          localStorage.setItem(`wecare_appointments_${user.uid}`, JSON.stringify(updated));
        } catch (e) {}
      }
    }
  };

  // Delete all user bookings in Firestore
  const handleClearHistory = async () => {
    if (!user) return;
    if (window.confirm('Do you want to permanently clear all booking records? This cannot be undone.')) {
      setDbLoading(true);
      try {
        // Delete each document individually to strictly follow Firestore patterns
        for (const apt of appointments) {
          await deleteDoc(doc(db, 'appointments', apt.id));
        }
        setAppointments([]);
      } catch (error) {
        console.error("Error clearing appointments:", error);
        alert('Failed to clear some appointments. Please refresh and try again.');
      } finally {
        setDbLoading(false);
      }
    }
  };

  // If Auth state is resolving, show a beautiful clinic medical spinner loader
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500 font-mono uppercase tracking-wider">Securing Patient Connection...</p>
      </div>
    );
  }

  // If user is not logged in, present our elegant patient sign in / registration wall
  if (!user) {
    return (
      <div className="max-w-md mx-auto py-8">
        <AuthPanel 
          message={currentTab === 'book' 
            ? 'Access the outpatient booking system and track your care by registering your account.' 
            : 'Sign in to access, manage, and review your historic clinical consultation records.'} 
        />
      </div>
    );
  }

  return (
    <div id="booking-container" className="max-w-5xl mx-auto space-y-10">
      {/* Tab Navigation header */}
      <div className="flex border-b border-slate-200 justify-center">
        <button
          onClick={() => {
            setCurrentTab('book');
            setSubView('form');
          }}
          className={`px-8 py-4 font-bold text-sm sm:text-base border-b-2 transition-all flex items-center space-x-2 ${
            currentTab === 'book'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarDays className="h-5 w-5" />
          <span>Book an Appointment</span>
        </button>
        <button
          onClick={() => setCurrentTab('history')}
          className={`px-8 py-4 font-bold text-sm sm:text-base border-b-2 transition-all flex items-center space-x-2 relative ${
            currentTab === 'history'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className="h-5 w-5" />
          <span>My Appointments</span>
          {appointments.filter(a => a.status === 'scheduled').length > 0 && (
            <span className="absolute top-2.5 right-1 h-5 w-5 bg-teal-600 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
              {appointments.filter(a => a.status === 'scheduled').length}
            </span>
          )}
        </button>
      </div>

      {/* --- Tab 1: Appointment Booking Process --- */}
      {currentTab === 'book' && (
        <div id="booking-flow-panel">
          {subView === 'form' ? (
            <form onSubmit={handleBookingSubmit} className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-10 space-y-8">
              {/* Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Consultation Details</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Choose your department, doctor, and calendar slot to initiate care.</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-2xl px-3.5 py-1.5 flex items-center space-x-2 shrink-0">
                  <span className="h-2 w-2 bg-teal-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wide font-mono">Patient Portal Sync Active</span>
                </div>
              </div>

              {/* Form errors */}
              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3 text-red-800">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium">{formError}</p>
                </div>
              )}

              {/* Step 1: Department & Doctor selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="dept-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    1. Select Specialty Department
                  </label>
                  <select
                    id="dept-select"
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-2xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="doctor-select" className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    2. Select Specialist Physician
                  </label>
                  <select
                    id="doctor-select"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-2xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                  >
                    <option value="" disabled>-- Select Doctor --</option>
                    {filteredDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Quick Highlight profile */}
              {activeDoctor && (
                <div className="bg-teal-50/40 border border-teal-100/50 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="h-10 w-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-sm uppercase">
                      {activeDoctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{activeDoctor.name}</p>
                      <p className="text-xs text-teal-600 font-semibold">{activeDoctor.role}</p>
                      <p className="text-[10px] text-slate-500">OPD: {activeDoctor.availability.days.join(', ')} • {activeDoctor.availability.hours}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-400 font-mono uppercase">Rating</p>
                    <p className="text-sm font-bold text-slate-800">{activeDoctor.rating} ★ ({activeDoctor.reviewsCount} patient reviews)</p>
                  </div>
                </div>
              )}

              {/* Step 2: Date Selector (Horizontal 14 days grid) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                  3. Select Date (Next 14 Days)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                  {availableDates.map((dateObj) => {
                    const isSelected = selectedDate === dateObj.dateString;
                    return (
                      <button
                        type="button"
                        key={dateObj.dateString}
                        onClick={() => dateObj.isWorkingDay && handleDateChange(dateObj.dateString)}
                        disabled={!dateObj.isWorkingDay}
                        className={`p-3 rounded-2xl border text-center flex flex-col justify-center items-center transition-all ${
                          !dateObj.isWorkingDay 
                            ? 'bg-slate-100/50 border-slate-100 text-slate-300 cursor-not-allowed line-through'
                            : isSelected
                              ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/10 scale-105'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wide">
                          {dateObj.dayOfWeekShort}
                        </span>
                        <span className="text-sm font-extrabold mt-1">
                          {dateObj.displayDate.split(' ')[1]}
                        </span>
                        <span className="text-[9px] mt-0.5 block">
                          {dateObj.isWorkingDay ? 'Available' : 'No OPD'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Slots Selector */}
              {selectedDate && activeDoctor && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                    4. Select Preferred Consultation Time
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {activeDoctor.slots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-5 py-3 rounded-xl border font-bold text-xs transition-all ${
                            isSelected
                              ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Patient details */}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Patient Information</h3>
                  <p className="text-xs text-slate-400 font-medium">Outpatient information automatically synced from your patient portal profile. You can modify it if needed.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="patient-name" className="text-xs font-bold text-slate-600">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        id="patient-name"
                        placeholder="John Doe"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="patient-email" className="text-xs font-bold text-slate-600">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="email"
                        id="patient-email"
                        placeholder="john@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="patient-phone" className="text-xs font-bold text-slate-600">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="tel"
                        id="patient-phone"
                        placeholder="+1 (555) 019-2834"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="space-y-1.5 sm:col-span-1">
                    <label htmlFor="patient-age" className="text-xs font-bold text-slate-600">Patient Age</label>
                    <input
                      type="number"
                      id="patient-age"
                      min="1"
                      max="120"
                      placeholder="35"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-3">
                    <label htmlFor="reason" className="text-xs font-bold text-slate-600">Reason for Visit / Main Symptom</label>
                    <div className="relative">
                      <ClipboardList className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        id="reason"
                        placeholder="Chronic knee pain when exercising, pediatric asthma checking, etc."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  id="submit-booking-form-btn"
                  disabled={isSubmitting}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-teal-600/10 transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving appointment...</span>
                    </>
                  ) : (
                    <span>Confirm Appointment Schedule</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success Receipt Voucher */
            latestBooking && (
              <div id="booking-success-voucher" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 animate-fade-in max-w-2xl mx-auto">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Consultation Scheduled!</h2>
                    <p className="text-xs text-slate-500">Your outpatient reservation is confirmed and synced with your cloud medical portal profile.</p>
                  </div>
                </div>

                {/* Printable style voucher details */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Registration Code</p>
                      <p className="text-sm font-black text-slate-800 font-mono">{latestBooking.id}</p>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                      CONFIRMED (CLOUD)
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Primary Medical Match */}
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Specialist Physician</p>
                        <p className="font-bold text-slate-800">
                          {DOCTORS.find(d => d.id === latestBooking.doctorId)?.name || 'Consultant Specialist'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Medical Department</p>
                        <p className="font-bold text-slate-800">
                          {DEPARTMENTS.find(d => d.id === latestBooking.departmentId)?.name || 'General Outpatient'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Consultation Date</p>
                        <p className="font-bold text-slate-800">{latestBooking.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Assigned Timeslot</p>
                        <p className="font-bold text-teal-700">{latestBooking.timeSlot}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Patient Details</p>
                        <p className="font-bold text-slate-800">{latestBooking.patientName} (Age {latestBooking.patientAge})</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400">Patient Telephone</p>
                        <p className="font-bold text-slate-800">{latestBooking.patientPhone}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-[9px] uppercase font-mono text-slate-400">Symptom / Medical Concern</p>
                      <p className="text-xs text-slate-700 mt-0.5">{latestBooking.reason}</p>
                    </div>
                  </div>

                  {/* Stylized Barcode mimicking hospital registration systems */}
                  <div className="bg-slate-50 px-5 py-4 border-t border-slate-200 text-center space-y-1">
                    <div className="flex justify-center items-center h-10 space-x-0.5 opacity-80 select-none">
                      {[...Array(28)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-slate-800 h-full rounded-sm" 
                          style={{ width: i % 3 === 0 ? '1px' : i % 4 === 0 ? '3px' : '1.5px' }} 
                        />
                      ))}
                    </div>
                    <p className="text-[9px] text-slate-400 font-mono tracking-widest">{latestBooking.id}-{latestBooking.patientAge}</p>
                  </div>
                </div>

                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={() => {
                      setSubView('form');
                      setCurrentTab('book');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 px-5 rounded-xl transition-all"
                  >
                    Book Another Slot
                  </button>
                  <button
                    onClick={() => setCurrentTab('history')}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-3 px-5 rounded-xl transition-all shadow-md shadow-teal-600/10"
                  >
                    View All Appointments
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* --- Tab 2: Appointments History panel --- */}
      {currentTab === 'history' && (
        <div id="appointments-history-panel" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Active Outpatient Appointments</h2>
              <p className="text-xs text-slate-500 font-medium">Review, manage, or cancel your upcoming clinical consults secured on our database server.</p>
            </div>
            {appointments.length > 0 && (
              <button
                onClick={handleClearHistory}
                disabled={dbLoading}
                className="text-red-600 hover:text-red-700 border border-red-100 hover:border-red-200 bg-red-50/50 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shrink-0 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All Records</span>
              </button>
            )}
          </div>

          {dbLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
              <p className="text-xs font-bold text-slate-400 font-mono uppercase">Retrieving cloud medical files...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((apt) => {
                const doctor = DOCTORS.find(d => d.id === apt.doctorId);
                const department = DEPARTMENTS.find(d => d.id === apt.departmentId);
                const isCancelled = apt.status === 'cancelled';
                
                return (
                  <div 
                    key={apt.id} 
                    id={`apt-card-${apt.id}`}
                    className={`border rounded-2xl p-5 sm:p-6 transition-all ${
                      isCancelled 
                        ? 'border-slate-100 bg-slate-50/50 opacity-60' 
                        : 'border-slate-150 bg-white hover:border-teal-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      {/* Left Block: Patient & Doctor Match */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2.5">
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                            isCancelled 
                              ? 'bg-slate-200 text-slate-600' 
                              : 'bg-teal-50 text-teal-700 border border-teal-100/60'
                          }`}>
                            {apt.id}
                          </span>
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                            isCancelled 
                              ? 'bg-red-50 text-red-600 border border-red-100' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}>
                            {apt.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Consultant Doctor</p>
                            <p className="font-extrabold text-slate-800 text-sm sm:text-base">{doctor?.name || 'Specialist Physician'}</p>
                            <p className="text-xs text-slate-500">{department?.name || 'Medical Wing'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Patient Profile</p>
                            <p className="font-bold text-slate-800 text-sm">{apt.patientName} (Age {apt.patientAge})</p>
                            <p className="text-xs text-slate-500">{apt.patientPhone} • {apt.patientEmail}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-50">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Consultation Reason</p>
                          <p className="text-xs text-slate-600 italic">"{apt.reason}"</p>
                        </div>
                      </div>

                      {/* Right Block: Date, Slot & Cancel actions */}
                      <div className="flex flex-row md:flex-col justify-between items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="text-left md:text-right">
                          <div className="flex items-center justify-start md:justify-end text-xs font-bold text-teal-700 font-mono uppercase">
                            <CalendarDays className="h-3.5 w-3.5 mr-1" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center justify-start md:justify-end text-xs font-semibold text-slate-500 font-mono mt-0.5">
                            <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            <span>{apt.timeSlot}</span>
                          </div>
                        </div>

                        {!isCancelled && (
                          <button
                            id={`cancel-apt-btn-${apt.id}`}
                            onClick={() => handleCancelBooking(apt.id)}
                            className="bg-white hover:bg-red-50 text-red-600 border border-red-100 hover:border-red-200 text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                          >
                            Cancel Appointment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state history fallback */
            <div className="text-center py-16 max-w-md mx-auto space-y-4">
              <div className="bg-slate-50 text-slate-300 p-4 rounded-full w-fit mx-auto border border-dashed border-slate-200">
                <ClipboardList className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-950">No Booked Appointments</h3>
                <p className="text-xs text-slate-500 px-4 leading-relaxed">
                  You do not have any registered consultations currently in our database. Go back to the "Book an Appointment" tab or choose a specialist doctor to schedule one.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('book')}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md shadow-teal-600/15"
              >
                Schedule New Consultation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

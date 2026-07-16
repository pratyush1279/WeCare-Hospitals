export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  experience: number; // in years
  rating: number;
  reviewsCount: number;
  education: string;
  languages: string[];
  bio: string;
  availability: {
    days: string[]; // e.g., ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    hours: string; // e.g., "09:00 AM - 04:00 PM"
  };
  slots: string[]; // e.g., ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"]
  gender: 'male' | 'female';
  specialties: string[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: string; // Name of Lucide icon
  description: string;
  longDescription: string;
  featuredServices: string[];
  conditionsTreated: string[];
  headDoctorId: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: number;
  departmentId: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  doctorName?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

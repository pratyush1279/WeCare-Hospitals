import { Doctor, Department, Review, FAQ } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Vascular Medicine',
    shortName: 'Cardiology',
    icon: 'Heart',
    description: 'State-of-the-art diagnostic and therapeutic care for cardiac and cardiovascular disorders.',
    longDescription: 'Our Cardiology Center is equipped with cutting-edge technology and staffed by internationally recognized experts. We provide comprehensive services ranging from preventive cardiac checks, non-invasive imaging, to complex interventional cardiology and electrophysiology procedures.',
    featuredServices: [
      'Comprehensive Cardiac Screening',
      'Echocardiography & Stress Testing',
      'Coronary Angioplasty & Stenting',
      'Heart Rhythm Management (Electrophysiology)',
      'Cardiac Rehabilitation Programs'
    ],
    conditionsTreated: [
      'Coronary Artery Disease',
      'Heart Failure & Cardiomyopathy',
      'Arrhythmias (Irregular Heartbeat)',
      'Hypertension & Vascular Diseases',
      'Valvular Heart Diseases'
    ],
    headDoctorId: 'doc-cardio-1'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    shortName: 'Neurology',
    icon: 'Brain',
    description: 'Expert diagnostics and surgical excellence for neurological conditions of the brain and spine.',
    longDescription: 'The Neurology and Neurosurgery Department provides comprehensive care for patients with conditions affecting the central and peripheral nervous system. Our stroke unit offers rapid, round-the-clock intervention, and our surgical team is recognized for minimal-access spine and brain procedures.',
    featuredServices: [
      'Advanced MRI & CT Neuroimaging',
      'Stroke Response & Critical Care Unit',
      'Microsurgical Brain and Spine Surgery',
      'Sleep Studies & Epilepsy Monitoring',
      'Neuromuscular Disease Diagnostics'
    ],
    conditionsTreated: [
      'Acute Ischemic Stroke',
      'Epilepsy & Seizure Disorders',
      'Parkinson\'s Disease & Movement Disorders',
      'Multiple Sclerosis',
      'Chronic Migraines & Tension Headaches'
    ],
    headDoctorId: 'doc-neuro-1'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatal Care',
    shortName: 'Pediatrics',
    icon: 'Baby',
    description: 'Compassionate, child-centric medical and preventive care for infants, children, and teens.',
    longDescription: 'We believe children need specialized, gentle care. Our Pediatrics Department covers all stages of development, offering comprehensive checkups, pediatric critical care, vaccinations, and subspecialties like pediatric cardiology and pediatric endocrinology.',
    featuredServices: [
      'Well-Child Developmental Assessment',
      'Comprehensive Childhood Immunization',
      'Level III Neonatal Intensive Care Unit (NICU)',
      'Pediatric Emergency Medicine',
      'Childhood Nutrition & Allergy Counseling'
    ],
    conditionsTreated: [
      'Childhood Infections & Asthma',
      'Congenital Anomalies & Growth Issues',
      'Developmental Delays & ADHD',
      'Pediatric Allergies',
      'Premature Birth & Neonatal Complications'
    ],
    headDoctorId: 'doc-peds-1'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Replacement',
    shortName: 'Orthopedics',
    icon: 'Bone',
    description: 'Comprehensive joint care, sports medicine, and advanced orthopedic trauma management.',
    longDescription: 'Our Orthopedics Department is a premier center for bone, muscle, and joint conditions. From specialized sports medicine clinics restoring mobility to advanced robotic-assisted total hip and knee replacements, our goal is to get you back to your active lifestyle safely.',
    featuredServices: [
      'Robotic-Assisted Joint Replacements',
      'Arthroscopic Sports Medicine Surgery',
      'Complex Orthopedic Trauma Care',
      'Spine Fusion & Corrective Surgeries',
      'Physiotherapy & Physical Rehabilitation'
    ],
    conditionsTreated: [
      'Osteoarthritis & Joint Degeneration',
      'Sports Injuries (ACL, Meniscus Tears)',
      'Bone Fractures & Dislocations',
      'Spinal Disc Herniations',
      'Rheumatoid Arthritis'
    ],
    headDoctorId: 'doc-ortho-1'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Care (Oncology)',
    shortName: 'Oncology',
    icon: 'ShieldAlert',
    description: 'Multidisciplinary oncology team delivering personalized chemotherapy, radiation, and surgical therapies.',
    longDescription: 'We fight cancer using a personalized approach that integrates medical oncology, surgical oncology, and radiation therapy. Our multidisciplinary tumor boards ensure every patient benefits from a collective team of experts crafting a tailored recovery pathway.',
    featuredServices: [
      'Targeted Immunotherapy & Chemotherapy',
      'Stereotactic Radiotherapy (LINAC)',
      'Minimally Invasive Cancer Surgery',
      'Pain Management & Palliative Care',
      'Genetic Counseling & Screening Programs'
    ],
    conditionsTreated: [
      'Breast & Gynecological Cancers',
      'Lung & Thoracic Cancers',
      'Gastrointestinal & Colon Cancers',
      'Prostate & Urological Tumors',
      'Leukemia & Lymphomas'
    ],
    headDoctorId: 'doc-onco-1'
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    shortName: 'Dermatology',
    icon: 'Sparkles',
    description: 'Expert care for medical skin disorders and state-of-the-art aesthetic skin rejuvenation.',
    longDescription: 'The Dermatology Department offers holistic care for all issues of the skin, hair, and nails. Combining expert pathology diagnostics for skin cancers with modern cosmetic lasers, we help patients achieve healthy, confident skin.',
    featuredServices: [
      'Advanced Skin Cancer Screening & Biopsy',
      'Psoriasis & Eczema Laser Therapy',
      'Aesthetic Laser Rejuvenation & Scar Removal',
      'Acne & Pigmentation Treatment Programs',
      'Hair Loss & Alopecia Therapies'
    ],
    conditionsTreated: [
      'Psoriasis, Eczema & Dermatitis',
      'Severe Acne & Rosacea',
      'Skin Melano-tumors & Skin Cancer',
      'Hair Thinning & Alopecia',
      'Fungal & Bacterial Skin Infections'
    ],
    headDoctorId: 'doc-derm-1'
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology
  {
    id: 'doc-cardio-1',
    name: 'Dr. Evelyn Vance',
    role: 'Chief Interventional Cardiologist',
    departmentId: 'cardiology',
    experience: 18,
    rating: 4.9,
    reviewsCount: 312,
    education: 'MD, FACC - Harvard Medical School',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Vance has performed over 3,000 successful coronary angioplasties. Her research focuses on minimally invasive heart therapies and cardiac stent tech development.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      hours: '09:00 AM - 03:00 PM'
    },
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM'],
    gender: 'female',
    specialties: ['Coronary Angioplasty', 'Transcatheter Valve Therapy', 'Preventive Cardiology']
  },
  {
    id: 'doc-cardio-2',
    name: 'Dr. Marcus Thorne',
    role: 'Senior Cardiac Electrophysiologist',
    departmentId: 'cardiology',
    experience: 14,
    rating: 4.8,
    reviewsCount: 194,
    education: 'MD, Ph.D. - Johns Hopkins University School of Medicine',
    languages: ['English', 'German'],
    bio: 'Dr. Thorne is a leading specialist in cardiac arrhythmias and pacemaker integrations. He is passionate about customizing cardiac therapies to fit active patient lifestyles.',
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday'],
      hours: '10:00 AM - 04:00 PM'
    },
    slots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
    gender: 'male',
    specialties: ['Heart Rhythm Disorders', 'Pacemaker & ICD Implants', 'Cardiac Mapping']
  },
  {
    id: 'doc-cardio-3',
    name: 'Dr. Sarah Al-Jamil',
    role: 'Pediatric Cardiologist',
    departmentId: 'cardiology',
    experience: 11,
    rating: 4.9,
    reviewsCount: 145,
    education: 'MD - University of Michigan Medical School',
    languages: ['English', 'Arabic', 'French'],
    bio: 'Dr. Al-Jamil specializes in diagnosing and treating congenital heart disease from fetal life through adolescence. She is known for her gentle, reassuring patient care.',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '09:00 AM - 12:30 PM'
    },
    slots: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '12:00 PM'],
    gender: 'female',
    specialties: ['Congenital Heart Defects', 'Fetal Echocardiography', 'Pediatric Heart Care']
  },

  // Neurology
  {
    id: 'doc-neuro-1',
    name: 'Dr. Adrian Sterling',
    role: 'Head of Neurology & Spine Specialist',
    departmentId: 'neurology',
    experience: 22,
    rating: 4.9,
    reviewsCount: 420,
    education: 'MD - Oxford University / Residency at Mayo Clinic',
    languages: ['English'],
    bio: 'A veteran in neuromuscular research, Dr. Sterling has pioneered multi-disciplinary programs for stroke rehabilitation and neuro-oncology diagnostics.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday'],
      hours: '09:00 AM - 04:00 PM'
    },
    slots: ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    gender: 'male',
    specialties: ['Spinal Disorders', 'Stroke Management', 'Multiple Sclerosis']
  },
  {
    id: 'doc-neuro-2',
    name: 'Dr. Kenji Takahashi',
    role: 'Consultant Neurosurgeon',
    departmentId: 'neurology',
    experience: 15,
    rating: 4.7,
    reviewsCount: 206,
    education: 'MD, Ph.D. - University of Tokyo School of Medicine',
    languages: ['English', 'Japanese'],
    bio: 'Dr. Takahashi specializes in keyhole neurosurgery for brain tumors and stereotactic radiosurgery. He leads our advanced neuro-microscopy team.',
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      hours: '11:00 AM - 05:00 PM'
    },
    slots: ['11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
    gender: 'male',
    specialties: ['Minimally Invasive Neurosurgery', 'Brain Tumor Resection', 'Trigeminal Neuralgia']
  },

  // Pediatrics
  {
    id: 'doc-peds-1',
    name: 'Dr. Maria Delgado',
    role: 'Chief of Pediatric Medicine',
    departmentId: 'pediatrics',
    experience: 16,
    rating: 5.0,
    reviewsCount: 518,
    education: 'MD, FAAP - Stanford University School of Medicine',
    languages: ['English', 'Spanish', 'Portuguese'],
    bio: 'Dr. Delgado is a beloved pediatrician committed to early developmental screening and children\'s immunology. She acts as a state advisor for public infant health initiatives.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      hours: '08:30 AM - 02:30 PM'
    },
    slots: ['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:00 PM'],
    gender: 'female',
    specialties: ['Early Child Development', 'Pediatric Asthma', 'Immunology & Vaccines']
  },
  {
    id: 'doc-peds-2',
    name: 'Dr. Julian Pierce',
    role: 'Consultant Neonatologist',
    departmentId: 'pediatrics',
    experience: 12,
    rating: 4.9,
    reviewsCount: 224,
    education: 'MD - Perelman School of Medicine, University of Pennsylvania',
    languages: ['English'],
    bio: 'Dr. Pierce manages our Level III NICU, ensuring premature infants and high-risk neonates receive meticulous, evidence-based supportive care.',
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday'],
      hours: '09:00 AM - 04:00 PM'
    },
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '03:30 PM'],
    gender: 'male',
    specialties: ['Neonatal Resuscitation', 'High-Risk Infant Management', 'Prematurity Care']
  },

  // Orthopedics
  {
    id: 'doc-ortho-1',
    name: 'Dr. Thomas Albright',
    role: 'Chief Orthopedic Surgeon',
    departmentId: 'orthopedics',
    experience: 20,
    rating: 4.8,
    reviewsCount: 380,
    education: 'MD - Columbia University College of Physicians and Surgeons',
    languages: ['English'],
    bio: 'Dr. Albright is highly sought-after for complex joint replacements and correction of post-traumatic limb deformities. He utilizes AI-navigated robotic joint tech.',
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday'],
      hours: '09:00 AM - 03:30 PM'
    },
    slots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
    gender: 'male',
    specialties: ['Hip & Knee Replacement', 'Robotic Joint Arthroplasty', 'Fracture Care']
  },
  {
    id: 'doc-ortho-2',
    name: 'Dr. Fiona Gallagher',
    role: 'Sports Medicine Specialist',
    departmentId: 'orthopedics',
    experience: 13,
    rating: 4.9,
    reviewsCount: 295,
    education: 'MD - University of Washington School of Medicine',
    languages: ['English', 'Gaeilge'],
    bio: 'Dr. Gallagher has served as team physician for professional athletes. She specializes in arthroscopic knee and shoulder stabilization to return patients to active play.',
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      hours: '08:30 AM - 04:00 PM'
    },
    slots: ['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '01:30 PM', '02:30 PM', '03:30 PM'],
    gender: 'female',
    specialties: ['ACL & Meniscus Reconstruction', 'Rotator Cuff Repair', 'Joint Injections']
  },

  // Oncology
  {
    id: 'doc-onco-1',
    name: 'Dr. Robert Lin',
    role: 'Senior Medical Oncologist',
    departmentId: 'oncology',
    experience: 19,
    rating: 4.9,
    reviewsCount: 340,
    education: 'MD - Yale School of Medicine / Fellowship at Memorial Sloan Kettering',
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Lin designs personalized immunotherapy protocols. He is the lead researcher at our campus clinical trials hub, targeting custom gene-directed cancer responses.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday'],
      hours: '09:00 AM - 04:00 PM'
    },
    slots: ['09:00 AM', '10:15 AM', '11:30 AM', '01:30 PM', '02:45 PM'],
    gender: 'male',
    specialties: ['Precision Immunotherapy', 'Breast Cancer Care', 'Lung Cancer Oncology']
  },
  {
    id: 'doc-onco-2',
    name: 'Dr. Sophia Carter',
    role: 'Surgical Oncologist & Breast Specialist',
    departmentId: 'oncology',
    experience: 14,
    rating: 4.9,
    reviewsCount: 258,
    education: 'MD - Duke University School of Medicine',
    languages: ['English', 'French'],
    bio: 'Dr. Carter specializes in breast-conserving oncology surgery and oncoplastic techniques. Her focus is maximizing tumor removal while optimizing aesthetic results.',
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday'],
      hours: '09:30 AM - 03:00 PM'
    },
    slots: ['09:30 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:00 PM'],
    gender: 'female',
    specialties: ['Mastectomy & Lumpectomy', 'Oncoplastic Reconstruction', 'Lymph Node Biopsy']
  },

  // Dermatology
  {
    id: 'doc-derm-1',
    name: 'Dr. Clara Thorne',
    role: 'Chief Dermatologist & Dermatopathologist',
    departmentId: 'dermatology',
    experience: 15,
    rating: 4.8,
    reviewsCount: 460,
    education: 'MD - UCSF School of Medicine',
    languages: ['English', 'German'],
    bio: 'Dr. Thorne is double-certified in medical dermatology and microscopic pathology. She provides complete care from severe eczema management to critical skin cancer diagnoses.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      hours: '09:00 AM - 03:30 PM'
    },
    slots: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '01:30 PM', '02:15 PM', '03:00 PM'],
    gender: 'female',
    specialties: ['Melanoma Screenings', 'Psoriasis Biologics', 'Contact Dermatitis']
  },
  {
    id: 'doc-derm-2',
    name: 'Dr. Sameer Patel',
    role: 'Cosmetic Dermatologist',
    departmentId: 'dermatology',
    experience: 10,
    rating: 4.7,
    reviewsCount: 238,
    education: 'MD - Boston University School of Medicine',
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Dr. Patel focuses on fractional lasers, chemical resurfacing, and advanced corrective injectables. He specializes in treating scars and hyperpigmentation in skin of color.',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Friday'],
      hours: '10:00 AM - 05:00 PM'
    },
    slots: ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
    gender: 'male',
    specialties: ['Laser Skin Resurfacing', 'Pigmentation Treatments', 'Acne Scar Correction']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    patientName: 'Sarah Jenkins',
    rating: 5,
    comment: 'The level of care I received under Dr. Evelyn Vance was outstanding. She was incredibly thorough, answered every question patiently, and made me feel absolutely safe before my angioplasty.',
    date: 'June 12, 2026',
    doctorName: 'Dr. Evelyn Vance'
  },
  {
    id: 'rev-2',
    patientName: 'David Miller',
    rating: 5,
    comment: 'We brought our infant to Dr. Delgado and were amazed by her warmth and care. The pediatric wing at WeCare is bright, highly welcoming, and immediately calms anxious little ones.',
    date: 'May 28, 2026',
    doctorName: 'Dr. Maria Delgado'
  },
  {
    id: 'rev-3',
    patientName: 'Michael Chang',
    rating: 5,
    comment: 'Thanks to Dr. Albright and his physical rehab recommendations, my knee replacement went smoothly and I am back to hiking and light tennis within six months. Truly a world-class facility.',
    date: 'April 14, 2026',
    doctorName: 'Dr. Thomas Albright'
  },
  {
    id: 'rev-4',
    patientName: 'Elena Rostova',
    rating: 4.8,
    comment: 'Super clean environments, extremely polite nursing staff, and clear booking schedules. The process was stress-free and very transparent. Highly recommend.',
    date: 'July 02, 2026'
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'How do I schedule an appointment online?',
    answer: 'Simply navigate to our "Appointment" tab or click "Book Appointment" in the header. Select your desired medical department, choose an available specialist, select a date, and find a convenient timeslot. Fill in your patient details and hit confirm!'
  },
  {
    question: 'Are walk-ins accepted or do I need an appointment?',
    answer: 'While we encourage scheduling online for non-emergency consultations to reduce waiting times, our general practitioners and primary clinics do accept walk-in patients during clinic hours. For life-threatening emergencies, our Emergency department is open 24/7.'
  },
  {
    question: 'What insurances do WeCare Hospitals accept?',
    answer: 'We accept most major national and international health insurance providers. Before your appointment, we recommend contacting our billing helpdesk or check with your insurance company to confirm coverage details, co-pays, and pre-authorization requirements.'
  },
  {
    question: 'What documents should I bring to my first appointment?',
    answer: 'For your first consultation, please bring a government-issued photo ID, your health insurance card, and any relevant past medical history, referral letters, lists of current medications, or recent imaging scans (X-rays, MRIs) and lab results.'
  },
  {
    question: 'Can I cancel or reschedule my scheduled appointment?',
    answer: 'Yes, you can easily view, reschedule, or cancel your appointments. Go to the "Booking History" section within our Appointment page to manage your current reservations, or contact our support team at least 24 hours prior to your slot.'
  }
];
